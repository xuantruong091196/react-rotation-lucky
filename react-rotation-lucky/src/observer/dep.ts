import Watcher from './watcher'

export default class Dep {
  static target: Watcher | null
  private subs: Array<Watcher>

  constructor () {
    this.subs = []
  }

  /**
   * @param {*} sub 
   */
  public addSub (sub: Watcher) {
    if (!this.subs.includes(sub)) {
      this.subs.push(sub)
    }
  }
  public notify () {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}