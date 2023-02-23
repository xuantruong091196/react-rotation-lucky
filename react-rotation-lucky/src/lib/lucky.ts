import '../utils/polyfill'
import { has, isExpectType, throttle } from '../utils/index'
import {
  ConfigType,
  UserConfigType,
  ImgItemType,
  ImgType
} from '../types/index'
import { defineReactive } from '../observer'
import Watcher, { WatchOptType } from '../observer/watcher'

export default class Lucky {
  protected readonly config: ConfigType
  protected readonly ctx: CanvasRenderingContext2D
  protected htmlFontSize: number = 16
  protected rAF: Function = function () {}
  protected boxWidth: number = 0
  protected boxHeight: number = 0
  protected data: {
    width: string | number
    height: string | number
  }

  /**
   *
   * @param config
   */
  constructor(
    config: string | HTMLDivElement | UserConfigType,
    data: {
      width: string | number
      height: string | number
    }
  ) {
    if (typeof config === 'string') config = { el: config } as UserConfigType
    else if (config.nodeType === 1)
      config = { el: '', divElement: config } as UserConfigType
    config = config as UserConfigType
    this.config = config as ConfigType
    this.data = data

    if (!config.flag) config.flag = 'WEB'
    if (config.el)
      config.divElement = document.querySelector(config.el) as HTMLDivElement

    if (config.divElement) {
      config.canvasElement = document.createElement('canvas')
      config.divElement.appendChild(config.canvasElement)
    }
    if (config.canvasElement) {
      config.ctx = config.canvasElement.getContext('2d')!
      config.canvasElement.setAttribute('package', `react-rotation-lucky-v1.1`)
      config.canvasElement.addEventListener('click', (e) => this.handleClick(e))
    }
    this.ctx = config.ctx as CanvasRenderingContext2D
    this.initWindowFunction()
    if (!this.config.ctx) {
      console.error('CanvasContext2D')
    }
    if (window && typeof window.addEventListener === 'function') {
      window.addEventListener(
        'resize',
        throttle(() => this.resize(), 300)
      )
    }
    if (window && typeof window.MutationObserver === 'function') {
      new window.MutationObserver(() => {
        this.resize()
      }).observe(document.documentElement, { attributes: true })
    }
  }

  protected resize(): void {
    this.config.beforeResize?.()

    this.setHTMLFontSize()

    this.setDpr()

    this.resetWidthAndHeight()
    this.zoomCanvas()
  }

  protected initLucky() {
    this.resize()
    if (!this.boxWidth || !this.boxHeight) {
      return console.error('This is not a valid')
    }
  }

  protected handleClick(_e: MouseEvent): void {}

  protected setHTMLFontSize(): void {
    if (!window) return
    this.htmlFontSize = +window
      .getComputedStyle(document.documentElement)
      .fontSize.slice(0, -2)
  }

  public clearCanvas(): void {
    const [width, height] = [this.boxWidth, this.boxHeight]
    this.ctx.clearRect(-width, -height, width * 2, height * 2)
  }

  protected setDpr(): void {
    const { config } = this
    if (config.dpr) {
    } else if (window) {
      window['dpr'] = config.dpr = window.devicePixelRatio || 1
    } else if (!config.dpr) {
      console.error(config, 'Error to set dpr')
    }
  }

  private resetWidthAndHeight(): void {
    const { config, data } = this

    let boxWidth = 0,
      boxHeight = 0
    if (config.divElement) {
      boxWidth = config.divElement.offsetWidth
      boxHeight = config.divElement.offsetHeight
    }
    this.boxWidth = this.getLength(data.width || config['width']) || boxWidth
    this.boxHeight =
      this.getLength(data.height || config['height']) || boxHeight
    if (config.divElement) {
      config.divElement.style.overflow = 'hidden'
      config.divElement.style.width = this.boxWidth + 'px'
      config.divElement.style.height = this.boxHeight + 'px'
    }
  }

  protected zoomCanvas(): void {
    const { config, ctx } = this
    const { canvasElement, dpr } = config
    const [width, height] = [this.boxWidth * dpr, this.boxHeight * dpr]
    if (!canvasElement) return
    canvasElement.width = width
    canvasElement.height = height
    canvasElement.style.width = `${width}px`
    canvasElement.style.height = `${height}px`
    canvasElement.style['transform-origin'] = 'left top'
    canvasElement.style.transform = `scale(${1 / dpr})`
    ctx.scale(dpr, dpr)
  }

  private initWindowFunction(): void {
    const { config } = this
    if (window) {
      this.rAF =
        window.requestAnimationFrame ||
        window['webkitRequestAnimationFrame'] ||
        window['mozRequestAnimationFrame'] ||
        function (callback: Function) {
          window.setTimeout(callback, 1000 / 60)
        }
      config.setTimeout = window.setTimeout
      config.setInterval = window.setInterval
      config.clearTimeout = window.clearTimeout
      config.clearInterval = window.clearInterval
      return
    }
    if (config.rAF) {
      this.rAF = config.rAF
    } else if (config.setTimeout) {
      const timeout = config.setTimeout
      this.rAF = (callback: Function): number => timeout(callback, 16.7)
    } else {
      this.rAF = (callback: Function): number => setTimeout(callback, 16.7)
    }
  }

  public isWeb() {
    return ['WEB', 'UNI-H5', 'TARO-H5'].includes(this.config.flag)
  }

  /**
   * @param src
   * @param info
   */
  protected loadImg(
    src: string,
    info: ImgItemType,
    resolveName = '$resolve'
  ): Promise<ImgType> {
    return new Promise((resolve, reject) => {
      if (!src) reject(`=> '${info.src}' don't exist`)
      if (this.config.flag === 'WEB') {
        let imgObj = new Image()
        imgObj['crossorigin'] = 'anonymous'
        imgObj.onload = () => resolve(imgObj)
        imgObj.onerror = () => reject(`=> '${info.src}' don't exist`)
        imgObj.src = src
      } else {
        info[resolveName] = resolve
        info['$reject'] = reject
        return
      }
    })
  }

  /**
   * @param imgObj
   * @param rectInfo
   */
  protected drawImage(
    ctx: CanvasRenderingContext2D,
    imgObj: ImgType,
    ...rectInfo: any
  ): void {
    let drawImg
    const { flag, dpr } = this.config
    if (['WEB', 'MP-WX'].includes(flag)) {
      drawImg = imgObj
      drawImg.className=""
    } else if (['UNI-H5', 'UNI-MP', 'TARO-H5', 'TARO-MP'].includes(flag)) {
      type OldImageType = ImgType & { path: CanvasImageSource }
      drawImg = (imgObj as OldImageType).path
    } else {
      return console.error('create flag, Pls check to the params!')
    }
    const miniProgramOffCtx = (drawImg['canvas'] || drawImg).getContext?.('2d')
    if (miniProgramOffCtx && !this.isWeb()) {
      rectInfo = rectInfo.map((val: any) => val! * dpr)
      const temp = miniProgramOffCtx.getImageData(...rectInfo.slice(0, 4))
      ctx.putImageData(temp, ...(rectInfo.slice(1, 6) as [number, 2]))
    } else {
      if (rectInfo.length === 8) {
        rectInfo = rectInfo.map((val: any, index: number) =>
          index < 4 ? val! * dpr : val
        )
      }
      try {
        ctx.drawImage(drawImg, ...((rectInfo as unknown) as [number, 8]))
      } catch (err) {}
    }
  }

  /**
   * @param imgObj
   * @param imgInfo
   * @param maxWidth
   * @param maxHeight
   * @return
   */
  protected computedWidthAndHeight(
    imgObj: ImgType,
    imgInfo: ImgItemType,
    maxWidth: number,
    maxHeight: number
  ): [number, number] {
    if (!imgInfo.width && !imgInfo.height) {
      return [imgObj.width, imgObj.height]
    } else if (imgInfo.width && !imgInfo.height) {
      let trueWidth = this.getLength(imgInfo.width, maxWidth)
      return [trueWidth, imgObj.height * (trueWidth / imgObj.width)]
    } else if (!imgInfo.width && imgInfo.height) {
      let trueHeight = this.getLength(imgInfo.height, maxHeight)

      return [imgObj.width * (trueHeight / imgObj.height), trueHeight]
    }

    return [
      this.getLength(imgInfo.width, maxWidth),
      this.getLength(imgInfo.height, maxHeight)
    ]
  }

  /**
   * @param { string } value
   * @param { number } denominator
   * @return { number }
   */
  protected changeUnits(value: string, denominator = 1): number {
    const { config } = this
    return Number(
      value.replace(/^([-]*[0-9.]*)([a-z%]*)$/, (_val, num, unit) => {
        const handleCssUnit = {
          '%': (n: number) => n * (denominator / 100),
          px: (n: number) => n * 1,
          rem: (n: number) => n * this.htmlFontSize,
          vw: (n: number) => (n / 100) * window.innerWidth
        }[unit]
        if (handleCssUnit) return handleCssUnit(num)
        const otherHandleCssUnit = config.handleCssUnit || config['unitFunc']
        return otherHandleCssUnit ? otherHandleCssUnit(num, unit) : num
      })
    )
  }

  /**
   * @param length
   * @param maxLength
   * @return
   */
  protected getLength(
    length: string | number | undefined,
    maxLength?: number
  ): number {
    if (isExpectType(length, 'number')) return length as number
    if (isExpectType(length, 'string'))
      return this.changeUnits(length as string, maxLength)
    return 0
  }

  /**
   * @param width
   * @param col
   */
  protected getOffsetX(width: number, maxWidth: number = 0): number {
    return (maxWidth - width) / 2
  }

  protected getOffscreenCanvas(
    width: number,
    height: number
  ): {
    _offscreenCanvas: HTMLCanvasElement
    _ctx: CanvasRenderingContext2D
  } | void {
    if (!has(this, '_offscreenCanvas')) {
      if (window && window.document && this.config.flag === 'WEB') {
        this['_offscreenCanvas'] = document.createElement('canvas')
      } else {
        this['_offscreenCanvas'] = this.config['offscreenCanvas']
      }
      if (!this['_offscreenCanvas'])
        return console.error(' Canvas do not support!')
    }
    const dpr = this.config.dpr
    const _offscreenCanvas = this['_offscreenCanvas'] as HTMLCanvasElement
    _offscreenCanvas.width = (width || 300) * dpr
    _offscreenCanvas.height = (height || 150) * dpr
    const _ctx = _offscreenCanvas.getContext('2d')!
    _ctx.clearRect(0, 0, width, height)
    _ctx.scale(dpr, dpr)
    _ctx['dpr'] = dpr
    return { _offscreenCanvas, _ctx }
  }

  /**
   * @param data
   * @param key
   * @param value
   */
  public $set(data: object, key: string | number, value: any) {
    if (!data || typeof data !== 'object') return
    defineReactive(data, key, value)
  }

  /**
 
   * @param data 
   * @param key 
   * @param callback 
   */
  protected $computed(data: object, key: string, callback: Function) {
    Object.defineProperty(data, key, {
      get: () => {
        return callback.call(this)
      }
    })
  }

  /**
   * create user watcher
   * @param expr
   * @param handler
   * @param watchOpt
   * @return
   */
  protected $watch(
    expr: string | Function,
    handler: Function | WatchOptType,
    watchOpt: WatchOptType = {}
  ): Function {
    if (typeof handler === 'object') {
      watchOpt = handler
      handler = watchOpt.handler!
    }
    // user watcher
    const watcher = new Watcher(this, expr, handler, watchOpt)
    if (watchOpt.immediate) {
      handler.call(this, watcher.value)
    }
    return function unWatchFn() {}
  }
}
