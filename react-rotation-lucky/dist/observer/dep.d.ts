import Watcher from './watcher';
export default class Dep {
    static target: Watcher | null;
    private subs;
    constructor();
    /**
     * @param {*} sub
     */
    addSub(sub: Watcher): void;
    notify(): void;
}
