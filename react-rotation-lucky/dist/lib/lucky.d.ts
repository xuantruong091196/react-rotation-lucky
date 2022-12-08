import '../utils/polyfill';
import { ConfigType, UserConfigType, ImgItemType, ImgType } from '../types/index';
import { WatchOptType } from '../observer/watcher';
export default class Lucky {
    protected readonly config: ConfigType;
    protected readonly ctx: CanvasRenderingContext2D;
    protected htmlFontSize: number;
    protected rAF: Function;
    protected boxWidth: number;
    protected boxHeight: number;
    protected data: {
        width: string | number;
        height: string | number;
    };
    /**
     *
     * @param config
     */
    constructor(config: string | HTMLDivElement | UserConfigType, data: {
        width: string | number;
        height: string | number;
    });
    protected resize(): void;
    protected initLucky(): void;
    protected handleClick(_e: MouseEvent): void;
    protected setHTMLFontSize(): void;
    clearCanvas(): void;
    protected setDpr(): void;
    private resetWidthAndHeight;
    protected zoomCanvas(): void;
    private initWindowFunction;
    isWeb(): boolean;
    /**
     * @param src
     * @param info
     */
    protected loadImg(src: string, info: ImgItemType, resolveName?: string): Promise<ImgType>;
    /**
     * @param imgObj
     * @param rectInfo
     */
    protected drawImage(ctx: CanvasRenderingContext2D, imgObj: ImgType, ...rectInfo: any): void;
    /**
     * @param imgObj
     * @param imgInfo
     * @param maxWidth
     * @param maxHeight
     * @return
     */
    protected computedWidthAndHeight(imgObj: ImgType, imgInfo: ImgItemType, maxWidth: number, maxHeight: number): [number, number];
    /**
     * @param { string } value
     * @param { number } denominator
     * @return { number }
     */
    protected changeUnits(value: string, denominator?: number): number;
    /**
     * @param length
     * @param maxLength
     * @return
     */
    protected getLength(length: string | number | undefined, maxLength?: number): number;
    /**
     * @param width
     * @param col
     */
    protected getOffsetX(width: number, maxWidth?: number): number;
    protected getOffscreenCanvas(width: number, height: number): {
        _offscreenCanvas: HTMLCanvasElement;
        _ctx: CanvasRenderingContext2D;
    } | void;
    /**
     * @param data
     * @param key
     * @param value
     */
    $set(data: object, key: string | number, value: any): void;
    /**
   
     * @param data
     * @param key
     * @param callback
     */
    protected $computed(data: object, key: string, callback: Function): void;
    /**
     * create user watcher
     * @param expr
     * @param handler
     * @param watchOpt
     * @return
     */
    protected $watch(expr: string | Function, handler: Function | WatchOptType, watchOpt?: WatchOptType): Function;
}
