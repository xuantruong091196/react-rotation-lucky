export declare type FontItemType = {
    text: string;
    top?: string | number;
    left?: string | number;
    fontColor?: string;
    fontSize?: string;
    fontStyle?: string;
    fontWeight?: string;
    lineHeight?: string;
};
export declare type FontExtendType = {
    wordWrap?: boolean;
    lengthLimit?: string | number;
    lineClamp?: number;
};
export declare type ImgType = HTMLImageElement | HTMLCanvasElement;
export declare type ImgItemType = {
    src: string;
    top?: string | number;
    left?: string | number;
    width?: string;
    height?: string;
    formatter?: (img: ImgType) => ImgType;
    $resolve?: Function;
    $reject?: Function;
};
export declare type BorderRadiusType = string | number;
export declare type BackgroundType = string;
export declare type ShadowType = string;
export declare type ConfigType = {
    nodeType?: number;
    flag: 'WEB' | 'MP-WX' | 'UNI-H5' | 'UNI-MP' | 'TARO-H5' | 'TARO-MP';
    el?: string;
    divElement?: HTMLDivElement;
    canvasElement?: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    dpr: number;
    handleCssUnit?: (num: number, unit: string) => number;
    rAF?: Function;
    setTimeout: Function;
    setInterval: Function;
    clearTimeout: Function;
    clearInterval: Function;
    beforeCreate?: Function;
    beforeResize?: Function;
    afterResize?: Function;
    beforeInit?: Function;
    afterInit?: Function;
    beforeDraw?: Function;
    afterDraw?: Function;
    afterStart?: Function;
};
export declare type UserConfigType = Partial<ConfigType>;
export declare type UniImageType = {
    path: string;
    width: number;
    height: number;
};
export declare type Tuple<T, Len extends number, Res extends T[] = []> = Res['length'] extends Len ? Res : Tuple<T, Len, [...Res, T]>;
