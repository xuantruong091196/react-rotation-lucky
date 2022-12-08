interface SpeedType {
    easeIn: (...arr: number[]) => number;
    easeOut: (...arr: number[]) => number;
}
export declare const quad: SpeedType;
export declare const cubic: SpeedType;
export declare const quart: SpeedType;
export declare const quint: SpeedType;
export declare const sine: SpeedType;
export declare const expo: SpeedType;
export declare const circ: SpeedType;
export {};
