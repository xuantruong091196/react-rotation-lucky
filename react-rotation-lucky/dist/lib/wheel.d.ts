import Lucky from './lucky';
import { UserConfigType } from '../types/index';
import LuckyWheelConfig from '../types/wheel';
export default class LuckyWheel extends Lucky {
    private blocks;
    private prizes;
    private buttons;
    private defaultConfig;
    private defaultStyle;
    private _defaultConfig;
    private _defaultStyle;
    private startCallback?;
    private endCallback?;
    private Radius;
    private prizeRadius;
    private prizeDeg;
    private prizeAng;
    private rotateDeg;
    private maxBtnRadius;
    private startTime;
    private endTime;
    private stopDeg;
    private endDeg;
    private FPS;
    private step;
    private prizeFlag;
    private ImageCache;
    static defaultProps: {
        width: string;
        height: string;
        prizes: never[];
        blocks: never[];
        buttons: never[];
        defaultStyle: {};
        defaultConfig: {};
    };
    /**
     * @param config
     * @param data
     */
    constructor(config: UserConfigType, data: LuckyWheelConfig);
    protected resize(): void;
    protected initLucky(): void;
    private initData;
    private initComputed;
    private initWatch;
    /**
     * init canvas
     */
    init(): Promise<void>;
    private initImageCache;
    /**
     * canvas click handler
     * @param e
     */
    protected handleClick(e: MouseEvent): void;
    /**
     * @param cellName
     * @param cellIndex
     * @param imgName
     * @param imgIndex
     */
    private loadAndCacheImg;
    private drawBlock;
    protected draw(): void;
    private carveOnGunwaleOfAMovingBoat;
    play(): void;
    /**
     * @param index
     */
    stop(index?: number): void;
    /**
     * @param num
     */
    private run;
    /**
     * @param x
     * @param y
     */
    protected conversionAxis(x: number, y: number): [number, number];
}
