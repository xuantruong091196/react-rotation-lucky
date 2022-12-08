export const getAngle = (deg: number): number => {
  return Math.PI / 180 * deg
}

/**
 * @param { number } deg 
 * @param { number } r 
 * @return { Array<number> }
 */
export const getArcPointerByDeg = (deg: number, r: number): [number, number] => {
  return [+(Math.cos(deg) * r).toFixed(8), +(Math.sin(deg) * r).toFixed(8)]
}

/**
 *
 * @param { number } x
 * @param { number } y 
 * @return { Array<number> } 
 */
export const getTangentByPointer = (x: number, y: number): Array<number> => {
  let k = - x / y
  let b = -k * x + y
  return [k, b]
}

export const fanShapedByArc = (
  ctx: CanvasRenderingContext2D,
  _minRadius: number,
  maxRadius: number,
  start: number,
  end: number,
  gutter: number,
): void => {
  ctx.beginPath()
  let maxGutter = getAngle(90 / Math.PI / maxRadius * gutter)
  let maxStart = start + maxGutter
  let maxEnd = end - maxGutter
  ctx.arc(0, 0, maxRadius, maxStart, maxEnd, false)
    ctx.lineTo(
      ...getArcPointerByDeg(
        (start + end) / 2,
        gutter / 2 / Math.abs(Math.sin((start - end) / 2))
      )
    )
  ctx.closePath()
}
export const roundRectByArc = (
  ctx: CanvasRenderingContext2D,
  ...[x, y, w, h, r]: number[]
) => {
  const min = Math.min(w, h), PI = Math.PI
  if (r > min / 2) r = min / 2
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.arc(x + w - r, y + r, r, -PI / 2, 0)
  ctx.lineTo(x + w, y + h - r)
  ctx.arc(x + w - r, y + h - r, r, 0, PI / 2)
  ctx.lineTo(x + r, y + h)
  ctx.arc(x + r, y + h - r, r, PI / 2, PI)
  ctx.lineTo(x, y + r)
  ctx.arc(x + r, y + r, r, PI, -PI / 2)
  ctx.closePath()
}

export const getLinearGradient = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  background: string
) => {
  const context = (/linear-gradient\((.+)\)/.exec(background) as Array<any>)[1]
    .split(',')
    .map((text: string) => text.trim()) 
  let deg = context.shift(), direction: [number, number, number, number] = [0, 0, 0, 0]

  if (deg.includes('deg')) {
    deg = deg.slice(0, -3) % 360

    const getLenOfTanDeg = (deg: number) => Math.tan(deg / 180 * Math.PI)
    if (deg >= 0 && deg < 45) direction = [x, y + h, x + w, y + h - w * getLenOfTanDeg(deg - 0)]
    else if (deg >= 45 && deg < 90) direction = [x, y + h, (x + w) - h * getLenOfTanDeg(deg - 45), y]
    else if (deg >= 90 && deg < 135) direction = [x + w, y + h, (x + w) - h * getLenOfTanDeg(deg - 90), y]
    else if (deg >= 135 && deg < 180) direction = [x + w, y + h, x, y + w * getLenOfTanDeg(deg - 135)]
    else if (deg >= 180 && deg < 225) direction = [x + w, y, x, y + w * getLenOfTanDeg(deg - 180)]
    else if (deg >= 225 && deg < 270) direction = [x + w, y, x + h * getLenOfTanDeg(deg - 225), y + h]
    else if (deg >= 270 && deg < 315) direction = [x, y, x + h * getLenOfTanDeg(deg - 270), y + h]
    else if (deg >= 315 && deg < 360) direction = [x, y, x + w, y + h - w * getLenOfTanDeg(deg - 315)]
  }
  else if (deg.includes('top')) direction = [x, y + h, x, y]
  else if (deg.includes('bottom')) direction = [x, y, x, y + h]
  else if (deg.includes('left')) direction = [x + w, y, x, y]
  else if (deg.includes('right')) direction = [x, y, x + w, y]

  const gradient = ctx.createLinearGradient(...(direction.map(n => n >> 0) as typeof direction))
  return context.reduce((gradient: any, item: any, index: any) => {
    const info = item.split(' ')
    if (info.length === 1) gradient.addColorStop(index, info[0])
    else if (info.length === 2) gradient.addColorStop(...info)
    return gradient
  }, gradient)
}
