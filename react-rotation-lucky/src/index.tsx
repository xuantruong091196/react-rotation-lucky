import React from 'react'
import LuckyWheel from './lib/wheel'
import LuckyWheelConfig, {
  BlockType,
  PrizeType,
  ButtonType
} from './types/wheel'

interface TProps {
  onSuccess?: Function
  onError?: Function
  onFinally?: Function
  width: number
  height: number
  blocks?: Array<BlockType>
  prizes?: Array<PrizeType>
  buttons?: Array<ButtonType>
  onStart: Function
  onEnd: Function
}
export default class LuckyWheelComponent extends React.Component<TProps> {
  myLucky: React.RefObject<any>
  lucky: any
  constructor(props: any) {
    super(props)
    this.myLucky = React.createRef()
    this.lucky = undefined
  }
  componentDidMount() {
    if (this.lucky) {
      return
    }
    this.myLucky.current.setAttribute('package', `react-rotation-lucky@v1.1.0`)
    try {
      this.initLucky()
      this?.props?.onSuccess && this.props?.onSuccess()
    } catch (err) {
      this?.props?.onError && this?.props?.onError(err)
    } finally {
      this.props?.onFinally && this?.props?.onFinally()
    }
  }
  componentDidUpdate(prevProps: {
    width: number
    height: number
    blocks?: Array<BlockType>
    prizes?: Array<PrizeType>
    buttons?: Array<ButtonType>
  }) {
    if (!this.lucky) return
    if (this.props.width !== prevProps.width) {
      this.lucky.width = this.props.width
    }
    if (this.props.height !== prevProps.height) {
      this.lucky.height = this.props.height
    }
    if (this.props.blocks !== prevProps.blocks) {
      this.lucky.blocks = this.props.blocks
    }
    if (this.props.prizes !== prevProps.prizes) {
      this.lucky.prizes = this.props.prizes
    }
    if (this.props.buttons !== prevProps.buttons) {
      this.lucky.buttons = this.props.buttons
    }
  }
  initLucky() {
    this.lucky = new LuckyWheel(
      {
        flag: 'WEB',
        divElement: this.myLucky.current
      },
      ({
        ...this.props,
        start: (...rest: any) => {
          this.props.onStart && this.props.onStart(...rest)
        },
        end: (...rest: any) => {
          this.props.onEnd && this.props.onEnd(...rest)
        }
      } as unknown) as LuckyWheelConfig
    )
  }
  init(...rest: any[]) {
    this.lucky.init(...rest)
  }
  play(...rest: any[]) {
    this.lucky.play(...rest)
  }
  stop(...rest: any[]) {
    this.lucky.stop(...rest)
  }
  render() {
    return <div ref={this.myLucky}></div>
  }
}

LuckyWheel.defaultProps = {
  width: '',
  height: '',
  prizes: [],
  blocks: [],
  buttons: [],
  defaultStyle: {},
  defaultConfig: {}
}

// import { WheelData } from './typings'
// interface WheelProps {
//   wheelData: WheelData
//   // resultId: number
//   winningSegment: string
//   width: number
//   height: number
//   // call API start spinning
//   isSpin: boolean
//   onFinished: (value: any) => void
//   primaryColor?: string
//   contrastColor?: string
//   size?: number
//   upDuration?: number
//   downDuration?: number
//   fontFamily?: string
// }

// const WheelComponent = ({
//   wheelData,
//   winningSegment,
//   onFinished,
//   primaryColor = 'black',
//   contrastColor = 'white',
//   size = 180,
//   upDuration = 100,
//   downDuration = 1000,
//   fontFamily = 'proxima-nova',
//   width,
//   height,
//   isSpin
// }: WheelProps) => {
//   const segments = wheelData?.items?.map((item) => item?.image)
//   const segColors = wheelData?.items?.map((item) => item?.color_bg)
//   let currentSegment = ''
//   let isStarted = false
//   const [isFinished, setFinished] = React.useState(false)
//   let timerHandle = 0
//   const timerDelay = segments.length
//   let angleCurrent = 0
//   let angleDelta = 0
//   let canvasContext: CanvasRenderingContext2D
//   let maxSpeed = (Math.PI / segments?.length) as number
//   const upTime = segments.length * upDuration
//   const downTime = segments.length * downDuration
//   let spinStart = 0
//   let frames = 0
//   const centerX = width / 2
//   const centerY = height / 2
//   React.useEffect(() => {
//     wheelInit()
//     setTimeout(() => {
//       window.scrollTo(0, 1)
//     }, 0)
//   }, [])
//   const wheelInit = () => {
//     initCanvas()
//     wheelDraw()
//   }

//   const initCanvas = () => {
//     let canvas = document.getElementById('canvas') as HTMLCanvasElement
//     if (navigator.userAgent.indexOf('MSIE') !== -1) {
//       canvas = document.createElement('canvas') as HTMLCanvasElement
//       canvas.setAttribute('width', `${width}`)
//       canvas.setAttribute('height', `${height}`)
//       canvas.setAttribute('id', 'canvas')
//       var wheelElement = document.getElementById('wheel') as HTMLDivElement
//       wheelElement.appendChild(canvas)
//     }
//     canvas.addEventListener('click', isSpin ? spin : () => {}, false)
//     canvasContext = canvas.getContext('2d') as CanvasRenderingContext2D
//   }
//   const spin = () => {
//     isStarted = true
//     console.log('spin')

//     if (timerHandle === 0) {
//       spinStart = new Date().getTime()
//       maxSpeed = Math.PI / segments.length
//       frames = 0
//       timerHandle = (setInterval(onTimerTick, timerDelay) as unknown) as number
//     }
//   }
//   const onTimerTick = () => {
//     frames++
//     draw()
//     const duration = new Date().getTime() - spinStart
//     let progress = 0
//     let finished = false
//     if (duration < upTime) {
//       progress = duration / upTime
//       angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2)
//     } else {
//       if (winningSegment) {
//         if (currentSegment === winningSegment && frames > segments.length) {
//           progress = duration / upTime
//           angleDelta =
//             maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2)
//           progress = 1
//         } else {
//           progress = duration / downTime
//           angleDelta =
//             maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2)
//         }
//       } else {
//         progress = duration / downTime
//         angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2)
//       }
//       if (progress >= 1) finished = true
//     }

//     angleCurrent += angleDelta
//     while (angleCurrent >= Math.PI * 2) angleCurrent -= Math.PI * 2
//     if (finished) {
//       setFinished(true)
//       onFinished(currentSegment)
//       clearInterval(timerHandle)
//       timerHandle = 0
//       angleDelta = 0
//     }
//   }

//   const wheelDraw = () => {
//     clear()
//     drawWheel()
//     drawNeedle()
//   }

//   const draw = () => {
//     clear()
//     drawWheel()
//     drawNeedle()
//   }

//   const drawSegment = (key: number, lastAngle: number, angle: number) => {
//     const ctx = canvasContext as CanvasRenderingContext2D
//     const value = segments[key]
//     ctx.save()
//     ctx.beginPath()
//     ctx.moveTo(centerX, centerY)
//     ctx.arc(centerX, centerY, size, lastAngle, angle, false)
//     ctx.lineTo(centerX, centerY)
//     ctx.closePath()
//     ctx.fillStyle = segColors[key]
//     ctx.fill()
//     ctx.stroke()
//     ctx.save()
//     ctx.translate(centerX, centerY)
//     ctx.rotate((lastAngle + angle) / 2)
//     ctx.fillStyle = contrastColor
//     ctx.font = 'bold 1em ' + wheelData?.turn_button?.font_family || fontFamily
//     const image = new Image()
//     image.src = value
//     image.addEventListener('load', () => {
//       ctx.drawImage(image, 0, 0, size / 2 + 20, 0)
//     })
//     // ctx.fillText(value.substr(0, 21), size / 2 + 20, 0)
//     ctx.restore()
//   }

//   const drawWheel = () => {
//     const ctx = canvasContext
//     let lastAngle = angleCurrent
//     const len = segments.length
//     const PI2 = Math.PI * 2
//     ctx.lineWidth = 1
//     ctx.strokeStyle = primaryColor
//     ctx.textBaseline = 'middle'
//     ctx.textAlign = 'center'
//     ctx.font = '1em ' + wheelData?.turn_button?.font_family || fontFamily
//     for (let i = 1; i <= len; i++) {
//       const angle = PI2 * (i / len) + angleCurrent
//       drawSegment(i - 1, lastAngle, angle)
//       lastAngle = angle
//     }

//     // Draw a center circle
//     ctx.beginPath()
//     ctx.arc(centerX, centerY, 40, 0, PI2, false)
//     ctx.closePath()
//     ctx.fillStyle = primaryColor
//     ctx.lineWidth = 10
//     ctx.strokeStyle = contrastColor
//     ctx.fill()
//     ctx.font = 'bold 1em ' + wheelData?.turn_button?.font_family || fontFamily
//     ctx.fillStyle = contrastColor
//     ctx.textAlign = 'center'
//     ctx.fillText(wheelData?.turn_button?.text, centerX, centerY + 3)
//     ctx.stroke()

//     // Draw outer circle
//     ctx.beginPath()
//     ctx.arc(centerX, centerY, size, 0, PI2, false)
//     ctx.closePath()

//     ctx.lineWidth = 10
//     ctx.strokeStyle = primaryColor
//     ctx.stroke()
//   }

//   const drawNeedle = () => {
//     const ctx = canvasContext as CanvasRenderingContext2D
//     ctx.lineWidth = 1
//     ctx.strokeStyle = contrastColor
//     ctx.fillStyle = contrastColor
//     ctx.beginPath()
//     ctx.moveTo(centerX + 20, centerY - 50)
//     ctx.lineTo(centerX - 20, centerY - 50)
//     ctx.lineTo(centerX, centerY - 70)
//     ctx.closePath()
//     ctx.fill()
//     const change = angleCurrent + Math.PI / 2
//     let i =
//       segments.length -
//       Math.floor((change / (Math.PI * 2)) * segments.length) -
//       1
//     if (i < 0) i = i + segments.length
//     ctx.textAlign = 'center'
//     ctx.textBaseline = 'middle'
//     ctx.fillStyle = primaryColor
//     ctx.font = 'bold 1.5em ' + wheelData?.turn_button?.font_family || fontFamily
//     currentSegment = segments[i]
//     isStarted && ctx.fillText(currentSegment, centerX + 10, centerY + size + 50)
//   }
//   const clear = () => {
//     const ctx = canvasContext
//     ctx.clearRect(0, 0, width, height)
//   }
//   return (
//     <div id='wheel'>
//       <canvas
//         id='canvas'
//         width={width}
//         height={height}
//         style={{
//           pointerEvents: isFinished ? 'none' : 'auto'
//         }}
//         onClick={spin}
//       />
//     </div>
//   )
// }
// export default WheelComponent
