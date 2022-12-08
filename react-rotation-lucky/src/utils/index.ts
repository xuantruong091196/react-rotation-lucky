/**
 * @param { unknown } param 
 * @param { ...string } types 
 * @return { boolean } 
 */
export const isExpectType = (param: unknown, ...types: string[]): boolean => {
  return types.some(
    (type) =>
      Object.prototype.toString.call(param).slice(8, -1).toLowerCase() === type
  )
}

export const get = (data: object, strKeys: string) => {
  const keys = strKeys.split('.')
  for (let key of keys) {
    const res = data[key]
    if (!isExpectType(res, 'object', 'array')) return res
    data = res
  }
  return data
}

export const has = (data: object, key: string | number): boolean => {
  return Object.prototype.hasOwnProperty.call(data, key)
}

/**
 * clear \n
 * @param { string } str
 * @return { string }
 */
export const removeEnter = (str: string): string => {
  return [].filter.call(str, (s: any) => s !== '\n').join('')
}

/** 
 * @param num
 */
export const getNumber = (num: unknown): number => {
  if (num === null) return 0
  if (typeof num === 'object') return NaN
  if (typeof num === 'number') return num
  if (typeof num === 'string') {
    if (num[num.length - 1] === '%') {
      return Number(num.slice(0, -1)) / 100
    }
    return Number(num)
  }
  return NaN
}

/**
 * 
 * @param color
 */
export const hasBackground = (color: string | undefined | null): boolean => {
  if (typeof color !== 'string') return false
  color = color.toLocaleLowerCase().trim()
  if (color === 'transparent') return false
  if (/^rgba/.test(color)) {
    const alpha = /([^\s,]+)\)$/.exec(color)
    if (getNumber(alpha) === 0) return false
  }
  return true
}

/**
 * @return { object } block
 */
export const computePadding = (
  block: { padding?: string },
  getLength: Function
): [number, number, number, number] => {
  let padding = block.padding?.split(' ').map((n) => getLength(n)) || [0],
    paddingTop = 0,
    paddingBottom = 0,
    paddingLeft = 0,
    paddingRight = 0
  switch (padding.length) {
    case 1:
      paddingTop = paddingBottom = paddingLeft = paddingRight = padding[0]
      break
    case 2:
      paddingTop = paddingBottom = padding[0]
      paddingLeft = paddingRight = padding[1]
      break
    case 3:
      paddingTop = padding[0]
      paddingLeft = paddingRight = padding[1]
      paddingBottom = padding[2]
      break
    default:
      paddingTop = padding[0]
      paddingBottom = padding[1]
      paddingLeft = padding[2]
      paddingRight = padding[3]
  }

  const res = { paddingTop, paddingBottom, paddingLeft, paddingRight }
  for (let key in res) {
    
    res[key] =
      has(block, key) && isExpectType(block[key], 'string', 'number')
        ? getLength(block[key])
        : res[key]
  }
  return [paddingTop, paddingBottom, paddingLeft, paddingRight]
}

/**

 * @param fn 
 * @param wait
 * @returns
 */
export const throttle = (fn: Function, wait = 300) => {
  let timeId = null as any
  return function (this: any, ...args: any[]) {
    if (timeId) return
    timeId = setTimeout(() => {
      fn.apply(this, args)
      clearTimeout(timeId)
      timeId = null
    }, wait)
  }
}

/**

 * @param { Array<number | undefined> } rangeArr 
 * @returns { number } 
 */
export const computeRange = (rangeArr: Array<number | undefined>): number => {
  const ascendingArr: number[] = []
  const sum = rangeArr
    .map((num) => Number(num))
    .reduce((prev, curr) => {
      if (curr > 0) {
        
        const res = prev + curr
        ascendingArr.push(res)
        return res
      } else {
      
        ascendingArr.push(NaN)
        return prev
      }
    }, 0)
  const random = Math.random() * sum
  return ascendingArr.findIndex((num) => random <= num)
}

/**

 * @param text
 * @param maxWidth
 * @returns
 */
export const splitText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  getWidth: (lines: string[]) => number,
  lineClamp: number = Infinity
): string[] => {
  if (lineClamp <= 0) lineClamp = Infinity
  let str = ''
  const lines = []
  const EndWidth = ctx.measureText('...').width
  for (let i = 0; i < text.length; i++) {
    str += text[i]
    let currWidth = ctx.measureText(str).width
    const maxWidth = getWidth(lines)
   
    if (lineClamp === lines.length + 1) currWidth += EndWidth
  
    if (maxWidth < 0) return lines
    
    if (currWidth > maxWidth) {
      lines.push(str.slice(0, -1))
      str = text[i]
    }
    if (lineClamp === lines.length) {
      lines[lines.length - 1] += '...'
      return lines
    }
  }
  if (str) lines.push(str)
  if (!lines.length) lines.push(text)
  return lines
}

export const getSortedArrayByIndex = <T>(arr: T[], order: number[]): T[] => {
  const map: { [key: number]: T } = {},
    res = []
  for (let i = 0; i < arr.length; i++) {
    map[i] = arr[i]
  }
  for (let i = 0; i < order.length; i++) {
    const curr = map[order[i]]
    if (curr) res[i] = curr
  }
  return res
}
