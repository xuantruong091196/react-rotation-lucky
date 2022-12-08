/**
 * @param { unknown } param
 * @param { ...string } types
 * @return { boolean }
 */
export declare const isExpectType: (param: unknown, ...types: string[]) => boolean;
export declare const get: (data: object, strKeys: string) => any;
export declare const has: (data: object, key: string | number) => boolean;
/**
 * clear \n
 * @param { string } str
 * @return { string }
 */
export declare const removeEnter: (str: string) => string;
/**
 * @param num
 */
export declare const getNumber: (num: unknown) => number;
/**
 *
 * @param color
 */
export declare const hasBackground: (color: string | undefined | null) => boolean;
/**
 * @return { object } block
 */
export declare const computePadding: (block: {
    padding?: string;
}, getLength: Function) => [number, number, number, number];
/**

 * @param fn
 * @param wait
 * @returns
 */
export declare const throttle: (fn: Function, wait?: number) => (this: any, ...args: any[]) => void;
/**

 * @param { Array<number | undefined> } rangeArr
 * @returns { number }
 */
export declare const computeRange: (rangeArr: Array<number | undefined>) => number;
/**

 * @param text
 * @param maxWidth
 * @returns
 */
export declare const splitText: (ctx: CanvasRenderingContext2D, text: string, getWidth: (lines: string[]) => number, lineClamp?: number) => string[];
export declare const getSortedArrayByIndex: <T>(arr: T[], order: number[]) => T[];
