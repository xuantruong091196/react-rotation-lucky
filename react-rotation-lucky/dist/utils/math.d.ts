export declare const getAngle: (deg: number) => number;
/**
 * @param { number } deg
 * @param { number } r
 * @return { Array<number> }
 */
export declare const getArcPointerByDeg: (deg: number, r: number) => [number, number];
/**
 *
 * @param { number } x
 * @param { number } y
 * @return { Array<number> }
 */
export declare const getTangentByPointer: (x: number, y: number) => Array<number>;
export declare const fanShapedByArc: (ctx: CanvasRenderingContext2D, _minRadius: number, maxRadius: number, start: number, end: number, gutter: number) => void;
export declare const roundRectByArc: (ctx: CanvasRenderingContext2D, ...[x, y, w, h, r]: number[]) => void;
export declare const getLinearGradient: (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, background: string) => any;
