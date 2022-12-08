import Dep from './dep';
export default class Observer {
    value: any;
    dep: Dep;
    /**
     * @param value
     */
    constructor(value: any);
    walk(data: object | any[]): void;
}
/**

 * @param { Object | Array } data
 */
export declare function observe(data: any): Observer | void;
/**
 * setter / getter
 * @param {*} data
 * @param {*} key
 * @param {*} val
 */
export declare function defineReactive(data: any, key: string | number, val: any): void;
