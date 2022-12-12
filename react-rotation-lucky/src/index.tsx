import React from 'react'
import LuckyWheel from './lib/wheel'
import LuckyWheelConfig, {
  BlockType,
  PrizeType,
  ButtonType,
  DefaultStyleType,
  DefaultConfigType
} from './types/wheel'
import api, { getAndUnZip } from './utils/contanst'

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
  urlApi?: string
  authToken?: string
}
interface IState {
  dataWheel: any
  listDataImage: any
}
export default class LuckyWheelComponent extends React.Component<
  TProps,
  IState
> {
  myLucky: React.RefObject<any>
  lucky: any
  constructor(props: any) {
    super(props)
    this.myLucky = React.createRef()
    this.lucky = undefined
    this.state = {
      dataWheel: {},
      listDataImage: []
    }
  }
  async handleGetWheelData() {
    try {
      const response = await api(
        { method: 'get', url: this.props.urlApi },
        'comma',
        this.props.authToken
      )
      if (response) {
        this.setState({ dataWheel: response?.data?.data?.lucky_circle_data })
        getAndUnZip(response?.data?.data?.lucky_circle_data?.file_zip as string)
          .then((results: any) => this.setState({ listDataImage: results }))
          .catch((_err) => {})
      }
    } catch (err) {}
  }
  componentDidMount() {
    if (this.lucky) {
      return
    }
    if (this?.props?.urlApi && this?.props?.authToken) {
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
    const prizes = this.state.dataWheel?.items?.map(
      (item: { color_bg: any; image: any; id: number }) => {
        return {
          background: item.color_bg,
          imgs: [
            {
              src:
                this.state.listDataImage?.length > 0 &&
                this.state?.listDataImage?.find((image: { name: string }) => {
                  return image?.name.split('.')[0] === item?.image
                })?.src,
              width: '40px',
              height: '40px',
              top: '10%',
              id: item?.id
            }
          ]
        }
      }
    )
    const buttons: ButtonType[] = [
      {
        radius: '40%',
        background: this.state.dataWheel?.turn_button?.background || '',
        fonts: [
          {
            fontSize: this.state.dataWheel?.turn_button?.font_size,
            fontWeight: this.state.dataWheel?.turn_button?.font_weight,
            fontColor: this.state.dataWheel?.turn_button?.color_text,
            text: this.state.dataWheel?.turn_button?.text
          }
        ]
      },
      { radius: '50px', background: '#d64737' },
      { radius: '45px', background: '#fff' },
      { radius: '41px', background: '#f6c66f', pointer: true },
      {
        radius: '35px',
        background: '#ffdea0',
        fonts: [
          {
            text: this.state.dataWheel?.turn_button?.text,
            fontSize: '18px',
            top: -15
          }
        ]
      }
    ]
    this.lucky = new LuckyWheel(
      {
        flag: 'WEB',
        divElement: this.myLucky.current
      },
      ({
        ...this.props,
        prizes: this?.props?.prizes || prizes,
        buttons: this.props?.buttons || buttons,
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
