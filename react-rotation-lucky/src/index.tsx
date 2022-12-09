import React from 'react'
import LuckyWheel from './lib/wheel'
import LuckyWheelConfig, {
  BlockType,
  PrizeType,
  ButtonType,
  DefaultStyleType,
  DefaultConfigType
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
  defaultConfig?: DefaultConfigType
  defaultStyle?: DefaultStyleType
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
