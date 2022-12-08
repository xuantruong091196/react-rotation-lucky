import Lucky from '../lib/lucky';
export interface WatchOptType {
    handler?: () => Function;
    immediate?: boolean;
    deep?: boolean;
}
export default class Watcher {
    id: number;
    $lucky: Lucky;
    expr: string | Function;
    cb: Function;
    deep: boolean;
    getter: Function;
    value: any;
    /**
     * @param {*} $lucky
     * @param {*} expr
     * @param {*} cb
     */
    constructor($lucky: Lucky, expr: string | Function, cb: Function, options?: WatchOptType);
    get(): any;
    update(): void;
}
