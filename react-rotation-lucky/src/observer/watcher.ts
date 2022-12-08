import Lucky from '../lib/lucky'
import Dep from './dep'
import { parsePath, traverse } from './utils'

export interface WatchOptType {
  handler?: () => Function
  immediate?: boolean
  deep?: boolean
}

let uid = 0
export default class Watcher {
  id: number
  $lucky: Lucky
  expr: string | Function
  cb: Function
  deep: boolean
  getter: Function
  value: any

  /**
   * @param {*} $lucky 
   * @param {*} expr 
   * @param {*} cb 
   */
  constructor ($lucky: Lucky, expr: string | Function, cb: Function, options: WatchOptType = {}) {
    this.id = uid++
    this.$lucky = $lucky
    this.expr = expr
    this.deep = !!options.deep
    if (typeof expr === 'function') {
      this.getter = expr
    } else {
      this.getter = parsePath(expr)
    }
    this.cb = cb
    this.value = this.get()
  }


  get () {
    Dep.target = this
    const value = this.getter.call(this.$lucky, this.$lucky)
    
    if (this.deep) {
      traverse(value)
    }
    Dep.target = null
    return value
  }

  update () {
    const newVal = this.get()
    const oldVal = this.value
    this.value = newVal
    this.cb.call(this.$lucky, newVal, oldVal)
  }
}