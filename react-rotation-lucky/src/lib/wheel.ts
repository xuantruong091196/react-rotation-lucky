import Lucky from './lucky'
import { UserConfigType, FontItemType } from '../types/index'
import LuckyWheelConfig, {
  BlockType,
  PrizeType,
  ButtonType,
  DefaultConfigType,
  DefaultStyleType,
  StartCallbackType,
  EndCallbackType
} from '../types/wheel'
import {
  removeEnter,
  hasBackground,
  computeRange,
  splitText,
  has
} from '../utils/index'
import { getAngle, fanShapedByArc } from '../utils/math'
import { quad } from '../utils/tween'

export default class LuckyWheel extends Lucky {
  private blocks: Array<BlockType> = []
  private prizes: Array<PrizeType> = []
  private buttons: Array<ButtonType> = []
  private defaultConfig: DefaultConfigType = {}
  private defaultStyle: DefaultStyleType = {}
  private _defaultConfig: Required<DefaultConfigType> = {} as Required<
    DefaultConfigType
  >
  private _defaultStyle: Required<DefaultStyleType> = {} as Required<
    DefaultStyleType
  >
  private startCallback?: StartCallbackType
  private endCallback?: EndCallbackType
  private Radius = 0
  private prizeRadius = 0
  private prizeDeg = 0
  private prizeAng = 0
  private rotateDeg = 0
  private maxBtnRadius = 0
  private startTime = 0
  private endTime = 0
  private stopDeg = 0
  private endDeg = 0
  private FPS = 16.6

  private step: 0 | 1 | 2 | 3 = 0

  private prizeFlag: number | undefined
  private ImageCache = new Map()
  static defaultProps: {
    width: string
    height: string
    prizes: never[]
    blocks: never[]
    buttons: never[]
    defaultStyle: {}
    defaultConfig: {}
  }

  /**
   * @param config
   * @param data
   */
  constructor(config: UserConfigType, data: LuckyWheelConfig) {
    super(config, {
      width: data.width,
      height: data.height
    })
    this.initData(data)
    this.initWatch()
    this.initComputed()
    config.beforeCreate?.call(this)
    this.init()
  }

  protected resize(): void {
    super.resize()
    this.Radius = Math.min(this.boxWidth, this.boxHeight) / 2
    this.ctx.translate(this.Radius, this.Radius)
    this.draw()
    this.config.afterResize?.()
  }

  protected initLucky(): void {
    this.Radius = 0
    this.prizeRadius = 0
    this.prizeDeg = 0
    this.prizeAng = 0
    this.rotateDeg = 0
    this.maxBtnRadius = 0
    this.startTime = 0
    this.endTime = 0
    this.stopDeg = 0
    this.endDeg = 0
    this.FPS = 16.6
    this.prizeFlag = -1
    this.step = 0
    super.initLucky()
  }

  private initData(data: LuckyWheelConfig): void {
    this.$set(this, 'width', data.width)
    this.$set(this, 'height', data.height)
    this.$set(this, 'blocks', data.blocks || [])
    this.$set(this, 'prizes', data.prizes || [])
    this.$set(this, 'buttons', data.buttons || [])
    this.$set(this, 'defaultConfig', data.defaultConfig || {})
    this.$set(this, 'defaultStyle', data.defaultStyle || {})
    this.$set(this, 'startCallback', data.start)
    this.$set(this, 'endCallback', data.end)
  }

  private initComputed() {
    this.$computed(this, '_defaultConfig', () => {
      const config = {
        gutter: '0px',
        offsetDegree: 0,
        speed: 20,
        speedFunction: 'quad',
        accelerationTime: 2500,
        decelerationTime: 2500,
        stopRange: 0,
        ...this.defaultConfig
      }
      return config
    })
    this.$computed(this, '_defaultStyle', () => {
      const style = {
        fontSize: '18px',
        fontColor: '#000',
        fontStyle: 'sans-serif',
        fontWeight: '400',
        background: 'rgba(0,0,0,0)',
        wordWrap: true,
        lengthLimit: '90%',
        ...this.defaultStyle
      }
      return style
    })
  }

  private initWatch() {
    this.$watch('width', (newVal: string | number) => {
      this.data.width = newVal
      this.resize()
    })
    this.$watch('height', (newVal: string | number) => {
      this.data.height = newVal
      this.resize()
    })
    // create blocks
    this.$watch(
      'blocks',
      (_newData: Array<BlockType>) => {
        this.initImageCache()
      },
      { deep: true }
    )
    // prizes
    this.$watch(
      'prizes',
      (_newData: Array<PrizeType>) => {
        this.initImageCache()
      },
      { deep: true }
    )
    //  buttons spinning
    this.$watch(
      'buttons',
      (_newData: Array<ButtonType>) => {
        this.initImageCache()
      },
      { deep: true }
    )
    this.$watch('defaultConfig', () => this.draw(), { deep: true })
    this.$watch('defaultStyle', () => this.draw(), { deep: true })
    this.$watch('startCallback', () => this.init())
    this.$watch('endCallback', () => this.init())
  }

  /**
   * init canvas
   */
  public async init(): Promise<void> {
    this.initLucky()
    const { config } = this
    config.beforeInit?.call(this)
    this.draw()
    this.draw()
    await this.initImageCache()

    config.afterInit?.call(this)
  }

  private initImageCache(): Promise<void> {
    return new Promise((resolve) => {
      const willUpdateImgs = {
        blocks: this.blocks.map((block) => block.imgs),
        prizes: this.prizes.map((prize) => prize.imgs),
        buttons: this.buttons.map((btn) => btn.imgs)
      }
      ;(<(keyof typeof willUpdateImgs)[]>Object.keys(willUpdateImgs)).forEach(
        (imgName) => {
          const willUpdate = willUpdateImgs[imgName]
          const allPromise: Promise<void>[] = []
          willUpdate &&
            willUpdate.forEach((imgs, cellIndex) => {
              imgs &&
                imgs.forEach((_imgInfo, imgIndex) => {
                  allPromise.push(
                    this.loadAndCacheImg(imgName, cellIndex, imgIndex)
                  )
                })
            })
          Promise.all(allPromise).then(() => {
            this.draw()
            resolve()
          })
        }
      )
    })
  }

  /**
   * canvas click handler
   * @param e
   */
  protected handleClick(e: MouseEvent): void {
    const { ctx } = this
    ctx.beginPath()
    ctx.arc(0, 0, this.maxBtnRadius, 0, Math.PI * 2, false)
    if (!ctx.isPointInPath(e.offsetX, e.offsetY)) return
    if (this.step !== 0) return
    this.startCallback?.(e)
  }

  /**
   * @param cellName
   * @param cellIndex
   * @param imgName
   * @param imgIndex
   */
  private async loadAndCacheImg(
    cellName: 'blocks' | 'prizes' | 'buttons',
    cellIndex: number,
    imgIndex: number
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const cell: BlockType | PrizeType | ButtonType = this[cellName][cellIndex]
      if (!cell || !cell.imgs) return
      const imgInfo = cell.imgs[imgIndex]
      if (!imgInfo) return
      this.loadImg(imgInfo.src, imgInfo)
        .then(async (currImg) => {
          if (typeof imgInfo.formatter === 'function') {
            currImg = await Promise.resolve(
              imgInfo.formatter.call(this, currImg)
            )
          }
          this.ImageCache.set(imgInfo['src'], currImg)
          resolve()
        })
        .catch((err) => {
          console.error(`${cellName}[${cellIndex}].imgs[${imgIndex}] ${err}`)
          reject()
        })
    })
  }

  private drawBlock(
    radius: number,
    block: BlockType,
    _blockIndex: number
  ): void {
    const { ctx } = this
    if (hasBackground(block.background)) {
      ctx.beginPath()
      ctx.fillStyle = block.background!
      ctx.arc(0, 0, radius, 0, Math.PI * 2, false)
      ctx.fill()
    }
    block.imgs &&
      block.imgs.forEach((imgInfo, _imgIndex) => {
        const blockImg = this.ImageCache.get(imgInfo.src)
        if (!blockImg) return
        const [trueWidth, trueHeight] = this.computedWidthAndHeight(
          blockImg,
          imgInfo,
          radius * 2,
          radius * 2
        )
        const [xAxis, yAxis] = [
          this.getOffsetX(trueWidth) + this.getLength(imgInfo.left, radius * 2),
          this.getLength(imgInfo.top, radius * 2) - radius
        ]
        ctx.save()
        imgInfo.rotate && ctx.rotate(getAngle(this.rotateDeg))
        this.drawImage(ctx, blockImg, xAxis, yAxis, trueWidth, trueHeight)
        ctx.restore()
      })
  }

  protected draw(): void {
    const { config, ctx, _defaultConfig, _defaultStyle } = this

    config.beforeDraw?.call(this, ctx)

    ctx.clearRect(-this.Radius, -this.Radius, this.Radius * 2, this.Radius * 2)

    this.prizeRadius = this.blocks.reduce((radius, block, blockIndex) => {
      this.drawBlock(radius, block, blockIndex)
      return (
        radius - this.getLength(block.padding && block.padding.split(' ')[0])
      )
    }, this.Radius)

    this.prizeDeg = 360 / this.prizes.length
    this.prizeAng = getAngle(this.prizeDeg)
    const shortSide = this.prizeRadius * Math.sin(this.prizeAng / 2) * 2

    let start = getAngle(
      this.rotateDeg - 90 + this.prizeDeg / 2 + _defaultConfig.offsetDegree
    )

    const getFontX = (font: FontItemType, line: string) => {
      return (
        this.getOffsetX(ctx.measureText(line).width) +
        this.getLength(font.left, shortSide)
      )
    }

    const getFontY = (
      font: FontItemType,
      height: number,
      lineIndex: number
    ) => {
      const lineHeight =
        font.lineHeight ||
        _defaultStyle.lineHeight ||
        font.fontSize ||
        _defaultStyle.fontSize
      return (
        this.getLength(font.top, height) +
        (lineIndex + 1) * this.getLength(lineHeight)
      )
    }
    ctx.save()

    this.prizes.forEach((prize, prizeIndex) => {
      let currMiddleDeg = start + prizeIndex * this.prizeAng

      let prizeHeight = this.prizeRadius - this.maxBtnRadius

      const background = prize.background || _defaultStyle.background
      if (hasBackground(background)) {
        ctx.fillStyle = background
        fanShapedByArc(
          ctx,
          this.maxBtnRadius,
          this.prizeRadius,
          currMiddleDeg - this.prizeAng / 2,
          currMiddleDeg + this.prizeAng / 2,
          this.getLength(_defaultConfig.gutter)
        )
        ctx.fill()
      }
      let x = Math.cos(currMiddleDeg) * this.prizeRadius
      let y = Math.sin(currMiddleDeg) * this.prizeRadius
      ctx.translate(x, y)
      ctx.rotate(currMiddleDeg + getAngle(90))
      prize.imgs &&
        prize.imgs.forEach((imgInfo, _imgIndex) => {
          const prizeImg = this.ImageCache.get(imgInfo.src)
          if (!prizeImg) return
          const [trueWidth, trueHeight] = this.computedWidthAndHeight(
            prizeImg,
            imgInfo,
            this.prizeAng * this.prizeRadius,
            prizeHeight
          )
          const [xAxis, yAxis] = [
            this.getOffsetX(trueWidth) +
              this.getLength(imgInfo.left, shortSide),
            this.getLength(imgInfo.top, prizeHeight)
          ]
          this.drawImage(ctx, prizeImg, xAxis, yAxis, trueWidth, trueHeight)
        })
      prize.fonts &&
        prize.fonts.forEach((font) => {
          const fontColor = font.fontColor || _defaultStyle.fontColor
          const fontWeight = font.fontWeight || _defaultStyle.fontWeight
          const fontSize = this.getLength(
            font.fontSize || _defaultStyle.fontSize
          )
          const fontStyle = font.fontStyle || _defaultStyle.fontStyle
          const wordWrap = has(font, 'wordWrap')
            ? font.wordWrap
            : _defaultStyle.wordWrap
          const lengthLimit = font.lengthLimit || _defaultStyle.lengthLimit
          const lineClamp = font.lineClamp || _defaultStyle.lineClamp
          ctx.fillStyle = fontColor
          ctx.font = `${fontWeight} ${fontSize >> 0}px ${fontStyle}`
          let lines = [],
            text = String(font.text)
          if (wordWrap) {
            lines = splitText(
              ctx,
              removeEnter(text),
              (lines) => {
                const adjacentSide =
                  this.prizeRadius - getFontY(font, prizeHeight, lines.length)
                const shortSide = adjacentSide * Math.tan(this.prizeAng / 2)
                let maxWidth =
                  shortSide * 2 - this.getLength(_defaultConfig.gutter)
                return this.getLength(lengthLimit, maxWidth)
              },
              lineClamp
            )
          } else {
            lines = text.split('\n')
          }
          lines
            .filter((line) => !!line)
            .forEach((line, lineIndex) => {
              ctx.fillText(
                line,
                getFontX(font, line),
                getFontY(font, prizeHeight, lineIndex)
              )
            })
        })
      ctx.rotate(getAngle(360) - currMiddleDeg - getAngle(90))
      ctx.translate(-x, -y)
    })
    ctx.restore()
    this.buttons.forEach((btn, _btnIndex) => {
      let radius = this.getLength(btn.radius, this.prizeRadius)
      this.maxBtnRadius = Math.max(this.maxBtnRadius, radius)
      if (hasBackground(btn.background)) {
        ctx.beginPath()
        ctx.fillStyle = btn.background as string
        ctx.arc(0, 0, radius, 0, Math.PI * 2, false)
        ctx.fill()
      }
      if (btn.pointer && hasBackground(btn.background)) {
        ctx.beginPath()
        ctx.fillStyle = btn.background as string
        ctx.moveTo(-radius, 0)
        ctx.lineTo(radius, 0)
        ctx.lineTo(0, -radius * 2)
        ctx.closePath()
        ctx.fill()
      }
      btn.imgs &&
        btn.imgs.forEach((imgInfo, _imgIndex) => {
          const btnImg = this.ImageCache.get(imgInfo.src)
          if (!btnImg) return
          const [trueWidth, trueHeight] = this.computedWidthAndHeight(
            btnImg,
            imgInfo,
            radius * 2,
            radius * 2
          )
          const [xAxis, yAxis] = [
            this.getOffsetX(trueWidth) + this.getLength(imgInfo.left, radius),
            this.getLength(imgInfo.top, radius)
          ]
          this.drawImage(ctx, btnImg, xAxis, yAxis, trueWidth, trueHeight)
        })
      btn.fonts &&
        btn.fonts.forEach((font) => {
          let fontColor = font.fontColor || _defaultStyle.fontColor
          let fontWeight = font.fontWeight || _defaultStyle.fontWeight
          let fontSize = this.getLength(font.fontSize || _defaultStyle.fontSize)
          let fontStyle = font.fontStyle || _defaultStyle.fontStyle
          ctx.fillStyle = fontColor
          // ctx.textAlign = font.textAlign as CanvasTextAlign
          ctx.font = `${fontWeight} ${fontSize >> 0}px ${fontStyle}`
          String(font.text)
            .split('\n')
            .forEach((line, lineIndex) => {
              ctx.fillText(
                line,
                getFontX(font, line),
                getFontY(font, radius, lineIndex)
              )
              ctx.textAlign = font.textAlign as CanvasTextAlign
            })
        })
    })
    config.afterDraw?.call(this, ctx)
  }

  private carveOnGunwaleOfAMovingBoat(): void {
    const { _defaultConfig, prizeFlag, prizeDeg, rotateDeg } = this
    this.endTime = Date.now()
    const stopDeg = (this.stopDeg = rotateDeg)
    const speed = _defaultConfig.speed
    const stopRange =
      (Math.random() * prizeDeg - prizeDeg / 2) *
      this.getLength(_defaultConfig.stopRange)
    let i = 0,
      prevSpeed = 0,
      prevDeg = 0
    while (++i) {
      const endDeg =
        360 * i -
        prizeFlag! * prizeDeg -
        rotateDeg -
        _defaultConfig.offsetDegree +
        stopRange -
        prizeDeg / 2
      let currSpeed =
        quad.easeOut(
          this.FPS,
          stopDeg,
          endDeg,
          _defaultConfig.decelerationTime
        ) - stopDeg
      if (currSpeed > speed) {
        this.endDeg = speed - prevSpeed > currSpeed - speed ? endDeg : prevDeg
        break
      }
      prevDeg = endDeg
      prevSpeed = currSpeed
    }
  }

  public play(): void {
    if (this.step !== 0) return

    this.startTime = Date.now()

    this.prizeFlag = void 0

    this.step = 1

    this.config.afterStart?.()

    this.run()
  }

  /**
   * @param index
   */
  public stop(index?: number): void {
    if (this.step === 0 || this.step === 3) return
    if (!index && index !== 0) {
      const rangeArr = this.prizes.map((item) => item.range)
      index = computeRange(rangeArr)
    }
    if (index < 0) {
      this.step = 0
      this.prizeFlag = -1
    } else {
      this.step = 2
      this.prizeFlag = index % this.prizes.length
    }
  }

  /**
   * @param num
   */
  private run(num: number = 0): void {
    const { rAF, step, prizeFlag, _defaultConfig } = this
    const { accelerationTime, decelerationTime, speed } = _defaultConfig

    if (step === 0) {
      this.endCallback?.(
        this.prizes.find((_prize, index) => index === prizeFlag) || {}
      )
      return
    }

    if (prizeFlag === -1) return

    if (step === 3 && !this.endDeg) this.carveOnGunwaleOfAMovingBoat()

    const startInterval = Date.now() - this.startTime
    const endInterval = Date.now() - this.endTime
    let rotateDeg = this.rotateDeg
    //
    if (step === 1 || startInterval < accelerationTime) {
      this.FPS = startInterval / num
      const currSpeed = quad.easeIn(startInterval, 0, speed, accelerationTime)

      if (currSpeed === speed) {
        this.step = 2
      }
      rotateDeg = rotateDeg + (currSpeed % 360)
    } else if (step === 2) {
      rotateDeg = rotateDeg + (speed % 360)

      if (prizeFlag !== void 0 && prizeFlag >= 0) {
        this.step = 3
        this.stopDeg = 0
        this.endDeg = 0
      }
    } else if (step === 3) {
      rotateDeg = quad.easeOut(
        endInterval,
        this.stopDeg,
        this.endDeg,
        decelerationTime
      )
      if (endInterval >= decelerationTime) {
        this.step = 0
      }
    } else {
      this.stop(-1)
    }
    this.rotateDeg = rotateDeg
    this.draw()
    rAF(this.run.bind(this, num + 1))
  }

  /**
   * @param x
   * @param y
   */
  protected conversionAxis(x: number, y: number): [number, number] {
    const { config } = this
    return [x / config.dpr - this.Radius, y / config.dpr - this.Radius]
  }
}
