import { FontItemType, ImgItemType, BackgroundType, FontExtendType } from './index';
export declare type PrizeFontType = FontItemType & FontExtendType;
export declare type ButtonFontType = FontItemType & {};
export declare type BlockImgType = ImgItemType & {
    rotate?: boolean;
};
export declare type PrizeImgType = ImgItemType & {};
export declare type ButtonImgType = ImgItemType & {};
export declare type BlockType = {
    padding?: string;
    background?: BackgroundType;
    imgs?: Array<BlockImgType>;
};
export declare type PrizeType = {
    range?: number;
    background?: BackgroundType;
    fonts?: Array<PrizeFontType>;
    imgs?: Array<PrizeImgType>;
};
export declare type ButtonType = {
    radius?: string;
    pointer?: boolean;
    background?: BackgroundType;
    fonts?: Array<ButtonFontType>;
    imgs?: Array<ButtonImgType>;
};
export declare type DefaultConfigType = {
    gutter?: string | number;
    offsetDegree?: number;
    speed?: number;
    speedFunction?: string;
    accelerationTime?: number;
    decelerationTime?: number;
    stopRange?: number;
};
export declare type DefaultStyleType = {
    background?: BackgroundType;
    fontColor?: PrizeFontType['fontColor'];
    fontSize?: PrizeFontType['fontSize'];
    fontStyle?: PrizeFontType['fontStyle'];
    fontWeight?: PrizeFontType['fontWeight'];
    lineHeight?: PrizeFontType['lineHeight'];
    wordWrap?: PrizeFontType['wordWrap'];
    lengthLimit?: PrizeFontType['lengthLimit'];
    lineClamp?: PrizeFontType['lineClamp'];
};
export declare type StartCallbackType = (e: MouseEvent) => void;
export declare type EndCallbackType = (prize: object) => void;
export default interface LuckyWheelConfig {
    width: string | number;
    height: string | number;
    blocks?: Array<BlockType>;
    prizes?: Array<PrizeType>;
    buttons?: Array<ButtonType>;
    defaultConfig?: DefaultConfigType;
    defaultStyle?: DefaultStyleType;
    start?: StartCallbackType;
    end?: EndCallbackType;
}
