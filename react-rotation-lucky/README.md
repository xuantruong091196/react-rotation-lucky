# react-rotation-lucky

> React wheel for game in QSoft

[![NPM](https://img.shields.io/npm/v/react-rotation-lucky.svg)](https://www.npmjs.com/package/react-rotation-lucky) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-rotation-lucky
```

## Usage

```tsx
import React, { Component } from 'react'																														import LuckyWheel from 'react-rotation-lucky'
import 'react-rotation-lucky/dist/index.css'

class Example extends Component {
  const prizes = dataWheel?.items?.map((item) => {
    return {
      background: item.color_bg,
      imgs: [{ src: item?.image, width: '40px', height: '40px', top: '10%' }]
    }
  })
  const buttons: ButtonType[] = [
    {
      radius: '40%',
      background: dataWheel?.turn_button?.background || '',
      fonts: [
        {
          fontSize: dataWheel?.turn_button?.font_size,
          fontWeight: dataWheel?.turn_button?.font_weight,
          fontColor: dataWheel?.turn_button?.color_text,
          text: dataWheel?.turn_button?.text
        }
      ]
    },
    { radius: '50px', background: '#d64737' },
    { radius: '45px', background: '#fff' },
    { radius: '41px', background: '#f6c66f', pointer: true },
    {
      radius: '35px',
      background: '#ffdea0',
      fonts: [{ text: dataWheel?.turn_button?.text, fontSize: '18px', top: -18 }]
    }
  ]
  render() {
    return <LuckyWheel />
  }
}
```

## License

## Thuộc tính

`width:  string | number` chiều rộng thành phần Mặc định: 300px

`height: string | number` chiều cao thành phần Mặc định: 300px

## [#](https://100px.net/docs/wheel.html#%E8%83%8C%E6%99%AF-blocks)Blocks

`blocks?: Array<object>` khu vực nền

`  padding?: string | number` đệm Mặc định: 0

    `background?: string` màu nền Mặc định: màu trong suốt

`  imgs?: Array<object>` Hình nền

`     src: string` đường dẫn hình ảnh

`     top?: string | number` vị trí hình ảnh Mặc định: 0px

`     width?: string | number` Chiều rộng hình ảnh Mặc định: 0px

`     height?: string | number` chiều cao hình ảnh Mặc định: 0px

`     rotate?: boolean` Liệu hình nền có theo vòng xoay hay không Mặc định: sai

## [#](https://100px.net/docs/wheel.html#%E5%A5%96%E5%93%81-prizes) Prizes

`prizes?: Array<object>` danh sách giải thưởng

`   range?: number` Xác suất chiến thắng

`   background?: string` màu nền quạt Mặc định: màu trong suốt

`   fonts?: Array<object>` văn bản giải thưởng

`      text: string` nội dung văn bản

`      top?: string | number` vị trí văn bản Mặc định: 0px

`      fontColor?: string` màu phông chữ Mặc định: Đen #000

`      fontSize?: string | number` cỡ chữ Mặc định: 22px

`      fontStyle?: string` kiểu chữ Mặc định: sans-serif

`      fontWeight?: string | number` trọng lượng phông chữ Mặc định: 400

`      lineHeight?: string | number` chiều cao dòng chữ Mặc định: cỡ chữ

`      wordWrap?: boolean` Gói từ Mặc định: đúng trên

`      lengthLimit?: string | number` phạm vi chiều rộng bọc Mặc định: 90%

`      lineClamp?: number` tràn văn bản ẩn Mặc định: Vô cực

`   imgs?: Array<object>` giải thưởng hình ảnh

`      src: string` đường dẫn hình ảnh

`      top?: string | number` vị trí hình ảnh Mặc định: 0px

`      width?: string | number` Chiều rộng hình ảnh Mặc định: 0px

`      height?: string | number` chiều cao hình ảnh Mặc định: 0px

## [#](https://100px.net/docs/wheel.html#%E6%8A%BD%E5%A5%96%E6%8C%89%E9%92%AE-buttons)Buttons

`buttons?: Array<object>` nút xổ số

`   radius: string | number` bán kính nút Mặc định: 0px

`   pointer?: boolean` Có hiển thị con trỏ hay không Mặc định: sai

`   background?: string` màu nền của nút Mặc định: Đen #000

`   fonts?: Array<object>` văn bản giải thưởng

`      text: string` nội dung văn bản

`      top?: string | number` vị trí văn bản Mặc định: 0px

`      fontColor?: string` màu phông chữ Mặc định: Đen #000

`      fontSize?: string | number` cỡ chữ Mặc định: 22px

`      fontStyle?: string` kiểu chữ Mặc định: sans-serif

`      fontWeight?: string | number` trọng lượng phông chữ Mặc định: 400

`      lineHeight?: string | number` chiều cao dòng chữ Mặc định: cỡ chữ

`   imgs?: Array<object>` hình ảnh nút

`      src: string` đường dẫn hình ảnh

`      top?: string | number` vị trí hình ảnh Mặc định: 0px

`      width?: string | number` Chiều rộng hình ảnh Mặc định: 0px

`      height?: string | number` chiều cao hình ảnh Mặc định: 0px

## [#](https://100px.net/docs/wheel.html#%E9%BB%98%E8%AE%A4%E9%85%8D%E7%BD%AE-defaultconfig)defaultConfig

`default-config?: object` phân bổ mặc định

`    gutter?: string | number` khoảng cách Mặc định: 0px

`    stopRange?: number` Con trỏ ở phạm vi dừng trong khu vực hình quạt Mặc định: 0

`    offsetDegree?: number` Góc bù của bàn xoay Mặc định: 0 độ

`    speed?: number` Tốc độ quay cực đại Mặc định: 20

`    accelerationTime?: number` thời gian bắt đầu quay Mặc định: 2500 mili giây

`    decelerationTime?: number` thời gian dừng chậm Mặc định: 2500 mili giây

## [#](https://100px.net/docs/wheel.html#%E9%BB%98%E8%AE%A4%E6%A0%B7%E5%BC%8F-defaultstyle)defaultStyle

`default-style?: object` phong cách mặc định

`   background?: string` Màu nền khu vực giải thưởng Mặc định: màu trong suốt

`   fontColor?: string` màu phông chữ Mặc định: Đen #000

`   fontSize?: string | number` cỡ chữ Mặc định: 22px

`   fontStyle?: string` kiểu chữ Mặc định: sans-serif

`   fontWeight?: string | number` trọng lượng phông chữ Mặc định: 400

`   lineHeight?: string | number` chiều cao dòng chữ Mặc định: cỡ chữ

`   wordWrap?: boolean` Gói từ Mặc định: đúng trên

`   lengthLimit?: string | number` phạm vi chiều rộng bọc Mặc định: 90%

`   lineClamp?: number` tràn văn bản ẩn Mặc định: Vô cực

## [#](https://100px.net/docs/wheel.html#%E5%9B%9E%E8%B0%83%E5%87%BD%E6%95%B0-callback)Chức năng gọi lại - callback

`start?:(e) => void.  ` trước khi bốc thăm

`end?:(prize) => void.      ` sau khi vẽ

## [#](https://100px.net/docs/wheel.html#%E6%96%B9%E6%B3%95-methods)phương pháp - phương pháp

`init(): ` khởi tạo

`play(): ` bắt đầu xổ số

`stop(index: number):` chậm lại

MIT © [xuantruong09111996](https://github.com/xuantruong09111996)
