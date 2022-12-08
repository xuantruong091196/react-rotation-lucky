import React from 'react'
import LuckyWheel from 'react-rotation-lucky'
import 'react-rotation-lucky/dist/index.css'
import { ButtonType } from '../../dist/types/wheel'
import { dataWheel } from './data'

const App = () => {
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
    }
  ]
  return (
    <div
      className='App'
      style={{
        background: `
    ${dataWheel?.background}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh'
      }}
    >
      <LuckyWheel
        width={400}
        height={400}
        blocks={[
          { padding: '20px', background: '#869cfa' },
          {
            padding: '20px',
            imgs: [
              {
                src: dataWheel?.image_arrow,
                width: '80px',
                rotate: true,
                top: '-20px'
              }
            ]
          }
        ]}
        onStart={() => {}}
        onEnd={() => {}}
        prizes={prizes}
        buttons={dataWheel && buttons}
      />
    </div>
  )
}

export default App
