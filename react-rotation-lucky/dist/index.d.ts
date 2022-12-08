import React from 'react';
import { BlockType, PrizeType, ButtonType } from './types/wheel';
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
}
export default class LuckyWheelComponent extends React.Component<TProps> {
    myLucky: React.RefObject<any>;
    lucky: any;
    constructor(props: any);
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
