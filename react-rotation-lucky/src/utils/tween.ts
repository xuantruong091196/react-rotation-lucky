interface SpeedType {
  easeIn: (...arr: number[]) => number
  easeOut: (...arr: number[]) => number
}

export const quad: SpeedType = {
  easeIn: function (t, b, c, d) {
    if (t >= d) t = d
    return c * (t /= d) * t + b
  },
  easeOut: function (t, b, c, d) {
    if (t >= d) t = d
    return -c * (t /= d) * (t - 2) + b
  }
}

export const cubic: SpeedType = {
  easeIn: function (t, b, c, d) {
    if (t >= d) t = d
    return c * (t /= d) * t * t + b
  },
  easeOut: function (t, b, c, d) {
    if (t >= d) t = d
    return c * ((t = t / d - 1) * t * t + 1) + b
  }
}

export const quart: SpeedType = {
  easeIn: function (t, b, c, d) {
    if (t >= d) t = d
    return c * (t /= d) * t * t * t + b
  },
  easeOut: function (t, b, c, d) {
    if (t >= d) t = d
    return -c * ((t = t / d - 1) * t * t * t - 1) + b
  }
}

export const quint: SpeedType = {
  easeIn: function (t, b, c, d) {
    if (t >= d) t = d
    return c * (t /= d) * t * t * t * t + b
  },
  easeOut: function (t, b, c, d) {
    if (t >= d) t = d
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b
  }
}

export const sine: SpeedType = {
  easeIn: function (t, b, c, d) {
    if (t >= d) t = d
    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b
  },
  easeOut: function (t, b, c, d) {
    if (t >= d) t = d
    return c * Math.sin(t / d * (Math.PI / 2)) + b
  }
}


export const expo: SpeedType = {
  easeIn: function (t, b, c, d) {
    if (t >= d) t = d
    return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b
  },
  easeOut: function (t, b, c, d) {
    if (t >= d) t = d
    return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b
  }
}

export const circ: SpeedType = {
  easeIn: function (t, b, c, d) {
    if (t >= d) t = d
    return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b
  },
  easeOut: function (t, b, c, d) {
    if (t >= d) t = d
    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b
  }
}