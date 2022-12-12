import React from 'react';
import { BlockType, PrizeType, ButtonType, DefaultStyleType, DefaultConfigType } from './types/wheel';
interface TProps {
    onSuccess?: Function;
    onError?: Function;
    onFinally?: Function;
    width: number;
    height: number;
    blocks?: Array<BlockType>;
    prizes?: Array<PrizeType>;
    buttons?: Array<ButtonType>;
    onStart: Function;
    onEnd: Function;
    defaultConfig?: DefaultConfigType;
    defaultStyle?: DefaultStyleType;
    urlApi?: string;
    authToken?: string;
}
interface IState {
    dataWheel: any;
    listDataImage: any;
}
export default class LuckyWheelComponent extends React.Component<TProps, IState> {
    myLucky: React.RefObject<any>;
    lucky: any;
    constructor(props: any);
    handleGetWheelData(): Promise<void>;
    componentDidMount(): void;
    componentDidUpdate(prevProps: {
        width: number;
        height: number;
        blocks?: Array<BlockType>;
        prizes?: Array<PrizeType>;
        buttons?: Array<ButtonType>;
    }): void;
    initLucky(): void;
    init(...rest: any[]): void;
    play(...rest: any[]): void;
    stop(...rest: any[]): void;
    render(): JSX.Element;
}
export {};
