/**
 * Default CSS definition for typescript,
 * will be overridden with file-specific definitions by rollup
 */
declare module '*.css' {
  const content: { [className: string]: string }
  export default content
}

interface SvgrComponent
  extends React.StatelessComponent<React.SVGAttributes<SVGElement>> {}

declare module '*.svg' {
  const svgUrl: string
  const svgComponent: SvgrComponent
  export default svgUrl
  export { svgComponent as ReactComponent }
}
export interface ListItemWheel {
  id: string
  color_bg: string
  image: string
  ordinal: string
}
export interface WheelData {
  background: string
  image_under: string
  image_upper: string
  image_arrow: string
  turn_button: {
    text: string
    background: string
    color_text: string
    font_family: string
    font_size: string
    font_weight: string
  }
  items: ListItemWheel[]
  id: number
  valid_from: number
  valid_to: number
  title: string
}
declare type FontItemType = {
  text: string
  top?: string | number
  left?: string | number
  fontColor?: string
  fontSize?: string
  fontStyle?: string
  fontWeight?: string
  lineHeight?: string
}
declare type FontExtendType = {
  wordWrap?: boolean
  lengthLimit?: string | number
  lineClamp?: number
}
declare type ImgType = HTMLImageElement | HTMLCanvasElement
declare type ImgItemType = {
  src: string
  top?: string | number
  left?: string | number
  width?: string
  height?: string
  formatter?: (img: ImgType) => ImgType
  $resolve?: Function
  $reject?: Function
}
declare type BorderRadiusType = string | number
declare type BackgroundType = string
declare type ShadowType = string
declare type ConfigType = {
  nodeType?: number
  flag: 'WEB' | 'MP-WX' | 'UNI-H5' | 'UNI-MP' | 'TARO-H5' | 'TARO-MP'
  el?: string
  divElement?: HTMLDivElement
  canvasElement?: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  dpr: number
  handleCssUnit?: (num: number, unit: string) => number
  rAF?: Function
  setTimeout: Function
  setInterval: Function
  clearTimeout: Function
  clearInterval: Function
  beforeCreate?: Function
  beforeResize?: Function
  afterResize?: Function
  beforeInit?: Function
  afterInit?: Function
  beforeDraw?: Function
  afterDraw?: Function
  afterStart?: Function
}
declare type UserConfigType = Partial<ConfigType>
declare type Tuple<
  T,
  Len extends number,
  Res extends T[] = []
> = Res['length'] extends Len ? Res : Tuple<T, Len, [...Res, T]>

interface WatchOptType {
  handler?: () => Function
  immediate?: boolean
  deep?: boolean
}

declare class Lucky {
  static version: string
  protected readonly version: string
  protected readonly config: ConfigType
  protected readonly ctx: CanvasRenderingContext2D
  protected htmlFontSize: number
  protected rAF: Function
  protected boxWidth: number
  protected boxHeight: number
  protected data: {
    width: string | number
    height: string | number
  }
  /**
   * @param config
   */
  constructor(
    config: string | HTMLDivElement | UserConfigType,
    data: {
      width: string | number
      height: string | number
    }
  )

  protected resize(): void
 
  protected initLucky(): void
 
  protected handleClick(e: MouseEvent): void

  protected setHTMLFontSize(): void
  clearCanvas(): void

  protected setDpr(): void

  private resetWidthAndHeight

  protected zoomCanvas(): void
 
  private initWindowFunction
  isWeb(): boolean
  /**
   * @param src
   * @param info 
   */
  protected loadImg(
    src: string,
    info: ImgItemType,
    resolveName?: string
  ): Promise<ImgType>
  /**

   * @param imgObj 
   * @param rectInfo
   */
  protected drawImage(
    ctx: CanvasRenderingContext2D,
    imgObj: ImgType,
    ...rectInfo: [...Tuple<number, 4>, ...Partial<Tuple<number, 4>>]
  ): void
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
  ): [number, number]
  /**
   * @param { string } value 
   * @param { number } denominator 
   * @return { number } 
   */
  protected changeUnits(value: string, denominator?: number): number
  /**

   * @param length 
   * @param maxLength 
   * @return 
   */
  protected getLength(
    length: string | number | undefined,
    maxLength?: number
  ): number
  /**
   * @param width
   * @param col
   */
  protected getOffsetX(width: number, maxWidth?: number): number
  protected getOffscreenCanvas(
    width: number,
    height: number
  ): {
    _offscreenCanvas: HTMLCanvasElement
    _ctx: CanvasRenderingContext2D
  } | void
  /**
   * @param data 
   * @param key 
   * @param value 
   */
  $set(data: object, key: string | number, value: any): void
  /**

   * @param data 
   * @param key 
   * @param callback 
   */
  protected $computed(data: object, key: string, callback: Function): void
  /**
   * create user watcher
   * @param expr 表达式
   * @param handler 
   * @param watchOpt 
   * @return 
*/
  protected $watch(
    expr: string | Function,
    handler: Function | WatchOptType,
    watchOpt?: WatchOptType
  ): Function
}

declare type PrizeFontType$2 = FontItemType & FontExtendType
declare type ButtonFontType$1 = FontItemType & {}
declare type BlockImgType$2 = ImgItemType & {
  rotate?: boolean
}
declare type PrizeImgType$2 = ImgItemType & {}
declare type ButtonImgType$1 = ImgItemType & {}
declare type BlockType$2 = {
  padding?: string
  background?: BackgroundType
  imgs?: Array<BlockImgType$2>
}
declare type PrizeType$2 = {
  range?: number
  background?: BackgroundType
  fonts?: Array<PrizeFontType$2>
  imgs?: Array<PrizeImgType$2>
}
declare type ButtonType$1 = {
  radius?: string
  pointer?: boolean
  background?: BackgroundType
  fonts?: Array<ButtonFontType$1>
  imgs?: Array<ButtonImgType$1>
}
declare type DefaultConfigType$2 = {
  gutter?: string | number
  offsetDegree?: number
  speed?: number
  speedFunction?: string
  accelerationTime?: number
  decelerationTime?: number
  stopRange?: number
}
declare type DefaultStyleType$2 = {
  background?: BackgroundType
  fontColor?: PrizeFontType$2['fontColor']
  fontSize?: PrizeFontType$2['fontSize']
  fontStyle?: PrizeFontType$2['fontStyle']
  fontWeight?: PrizeFontType$2['fontWeight']
  lineHeight?: PrizeFontType$2['lineHeight']
  wordWrap?: PrizeFontType$2['wordWrap']
  lengthLimit?: PrizeFontType$2['lengthLimit']
  lineClamp?: PrizeFontType$2['lineClamp']
}
declare type StartCallbackType$1 = (e: MouseEvent) => void
declare type EndCallbackType$2 = (prize: object) => void
interface LuckyWheelConfig {
  width: string | number
  height: string | number
  blocks?: Array<BlockType$2>
  prizes?: Array<PrizeType$2>
  buttons?: Array<ButtonType$1>
  defaultConfig?: DefaultConfigType$2
  defaultStyle?: DefaultStyleType$2
  start?: StartCallbackType$1
  end?: EndCallbackType$2
}

declare class LuckyWheel extends Lucky {
  private blocks
  private prizes
  private buttons
  private defaultConfig
  private defaultStyle
  private _defaultConfig
  private _defaultStyle
  private startCallback?
  private endCallback?
  private Radius
  private prizeRadius
  private prizeDeg
  private prizeAng
  private rotateDeg
  private maxBtnRadius
  private startTime
  private endTime
  private stopDeg
  private endDeg
  private FPS
  private step
  private prizeFlag
  private ImageCache
  /**

   * @param config 
   * @param data 
   */
  constructor(config: UserConfigType, data: LuckyWheelConfig)
  protected resize(): void
  protected initLucky(): void
  /**

   * @param data
   */
  private initData

  private initComputed

  private initWatch

  init(): Promise<void>
  private initImageCache
  /**
   * @param e 
   */
  protected handleClick(e: MouseEvent): void
  /**
   * @param cellName 
   * @param cellIndex 
   * @param imgName 
   * @param imgIndex 
   */
  private loadAndCacheImg
  private drawBlock

  protected draw(): void

  private carveOnGunwaleOfAMovingBoat

  play(): void
  /**
   * @param index 
   */
  stop(index?: number): void
  /**

   * @param num 
   */
  private run
  /**

   * @param x
   * @param y
   */
  protected conversionAxis(x: number, y: number): [number, number]
}

declare type PrizeFontType$1 = FontItemType & FontExtendType
declare type ButtonFontType = FontItemType & FontExtendType
declare type BlockImgType$1 = ImgItemType & {}
declare type PrizeImgType$1 = ImgItemType & {
  activeSrc?: string
}
declare type ButtonImgType = ImgItemType & {}
declare type BlockType$1 = {
  borderRadius?: BorderRadiusType
  background?: BackgroundType
  padding?: string
  paddingTop?: string | number
  paddingRight?: string | number
  paddingBottom?: string | number
  paddingLeft?: string | number
  imgs?: Array<BlockImgType$1>
}
declare type CellType<T, U> = {
  x: number
  y: number
  col?: number
  row?: number
  borderRadius?: BorderRadiusType
  background?: BackgroundType
  shadow?: ShadowType
  fonts?: Array<T>
  imgs?: Array<U>
}
declare type PrizeType$1 = CellType<PrizeFontType$1, PrizeImgType$1> & {
  range?: number
  disabled?: boolean
}
declare type ButtonType = CellType<ButtonFontType, ButtonImgType> & {
  callback?: Function
}
declare type DefaultConfigType$1 = {
  gutter?: number
  speed?: number
  accelerationTime?: number
  decelerationTime?: number
}
declare type DefaultStyleType$1 = {
  borderRadius?: BorderRadiusType
  background?: BackgroundType
  shadow?: ShadowType
  fontColor?: PrizeFontType$1['fontColor']
  fontSize?: PrizeFontType$1['fontSize']
  fontStyle?: PrizeFontType$1['fontStyle']
  fontWeight?: PrizeFontType$1['fontWeight']
  lineHeight?: PrizeFontType$1['lineHeight']
  wordWrap?: PrizeFontType$1['wordWrap']
  lengthLimit?: PrizeFontType$1['lengthLimit']
  lineClamp?: PrizeFontType$1['lineClamp']
}
declare type ActiveStyleType = {
  background?: BackgroundType
  shadow?: ShadowType
  fontColor?: PrizeFontType$1['fontColor']
  fontSize?: PrizeFontType$1['fontSize']
  fontStyle?: PrizeFontType$1['fontStyle']
  fontWeight?: PrizeFontType$1['fontWeight']
  lineHeight?: PrizeFontType$1['lineHeight']
}
declare type RowsType = number
declare type ColsType = number
declare type StartCallbackType = (e: MouseEvent, button?: ButtonType) => void
declare type EndCallbackType$1 = (prize: object) => void
interface LuckyGridConfig {
  width: string | number
  height: string | number
  rows?: RowsType
  cols?: ColsType
  blocks?: Array<BlockType$1>
  prizes?: Array<PrizeType$1>
  buttons?: Array<ButtonType>
  button?: ButtonType
  defaultConfig?: DefaultConfigType$1
  defaultStyle?: DefaultStyleType$1
  activeStyle?: ActiveStyleType
  start?: StartCallbackType
  end?: EndCallbackType$1
}

declare class LuckyGrid extends Lucky {
  private rows
  private cols
  private blocks
  private prizes
  private buttons
  private button?
  private defaultConfig
  private defaultStyle
  private activeStyle
  private _defaultConfig
  private _defaultStyle
  private _activeStyle
  private startCallback?
  private endCallback?
  private cellWidth
  private cellHeight
  private startTime
  private endTime
  private currIndex
  private stopIndex
  private endIndex
  private demo
  private timer
  private FPS
  private step
 
  private prizeFlag
  private cells
  private prizeArea
  private ImageCache

  constructor(config: UserConfigType, data: LuckyGridConfig)
  protected resize(): void
  protected initLucky(): void

  private initData
 
  private initComputed

  private initWatch
 
  init(): Promise<void>
  private initImageCache
  /**
   * @param e 
   */
  protected handleClick(e: MouseEvent): void
  /**
   * @param cellName 
   * @param cellIndex 
   * @param imgName 
   * @param imgIndex 
   */
  private loadAndCacheImg
 
  protected draw(): void
  /**
   
   * @param x
   * @param y
   * @param width
   * @param height
   * @param background
   * @param isActive
   */
  private handleBackground

  private carveOnGunwaleOfAMovingBoat

  play(): void
  /**
   * @param index 
   */
  stop(index?: number): void
  /**

   * @param num 
   */
  private run
  /**
  
   * @param { array } 
   * @return { array }
   */
  private getGeometricProperty
  /**
  
   * @param x
   * @param y
   */
  protected conversionAxis(x: number, y: number): [number, number]
}

declare type PrizeFontType = FontItemType & FontExtendType
declare type BlockImgType = ImgItemType & {}
declare type PrizeImgType = ImgItemType
declare type BlockType = {
  borderRadius?: BorderRadiusType
  background?: BackgroundType
  padding?: string
  paddingTop?: string | number
  paddingRight?: string | number
  paddingBottom?: string | number
  paddingLeft?: string | number
  imgs?: Array<BlockImgType>
}
declare type PrizeType = {
  borderRadius?: BorderRadiusType
  background?: BackgroundType
  fonts?: Array<PrizeFontType>
  imgs?: Array<PrizeImgType>
}
declare type SlotType = {
  order?: number[]
  speed?: number
  direction?: 1 | -1
}
declare type DefaultConfigType = {
  mode?: 'vertical' | 'horizontal'
  direction?: 1 | -1
  rowSpacing?: number
  colSpacing?: number
  speed?: number
  accelerationTime?: number
  decelerationTime?: number
}
declare type DefaultStyleType = {
  borderRadius?: BorderRadiusType
  background?: BackgroundType
  fontColor?: PrizeFontType['fontColor']
  fontSize?: PrizeFontType['fontSize']
  fontStyle?: PrizeFontType['fontStyle']
  fontWeight?: PrizeFontType['fontWeight']
  lineHeight?: PrizeFontType['lineHeight']
  wordWrap?: PrizeFontType['wordWrap']
  lengthLimit?: PrizeFontType['lengthLimit']
  lineClamp?: PrizeFontType['lineClamp']
}
declare type EndCallbackType = (prize: PrizeType | undefined) => void
interface SlotMachineConfig {
  width: string | number
  height: string | number
  blocks?: Array<BlockType>
  prizes?: Array<PrizeType>
  slots?: Array<SlotType>
  defaultConfig?: DefaultConfigType
  defaultStyle?: DefaultStyleType
  end?: EndCallbackType
}

declare class SlotMachine extends Lucky {
  private blocks
  private prizes
  private slots
  private defaultConfig
  private _defaultConfig
  private defaultStyle
  private _defaultStyle
  private endCallback
  private _offscreenCanvas?
  private cellWidth
  private cellHeight
  private cellAndSpacing
  private widthAndSpacing
  private heightAndSpacing
  private FPS
  private scroll
  private stopScroll
  private endScroll
  private startTime
  private endTime
  private step

  private prizeFlag
  private prizeArea?
  private ImageCache
  /**
   
   * @param config 
   * @param data 
   */
  constructor(config: UserConfigType, data: SlotMachineConfig)
  protected resize(): void
  protected initLucky(): void
  /**
   
   * @param data
   */
  private initData

  private initComputed

  private initWatch

  init(): Promise<void>
  private initImageCache
  /**
   * @param cellName 
   * @param cellIndex 
   * @param imgName 
   * @param imgIndex 
   */
  private loadAndCacheImg

  protected drawOffscreenCanvas(): void

  protected drawBlocks(): SlotMachine['prizeArea']
 
  protected draw(): void
 
  private carveOnGunwaleOfAMovingBoat

  play(): void
  stop(index: number | number[]): void
  /**
   * 
   * @param num 
   */
  private run
  private displacement
  private displacementWidthOrHeight
}

/**
 *
 * @param img 
 * @param radius 
 * @returns 
 */
declare const cutRound: (img: ImgType, radius: number) => ImgType
/**
 *
 * @param img 
 * @param opacity
 * @returns 
 */
declare const opacity: (img: ImgType, opacity: number) => ImgType

export { LuckyGrid, LuckyWheel, SlotMachine, cutRound, opacity }
