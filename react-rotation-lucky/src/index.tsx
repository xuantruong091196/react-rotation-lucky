import * as React from 'react'
import styles from './styles.module.css'

interface Props {
  list: any
}

export const WheelComponent = ({ list }: Props) => {
  return <div className={styles.test}>Example Component: {list}</div>
}
