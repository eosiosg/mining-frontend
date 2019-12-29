import React from 'react';
import styles from '../styles/homepage.module.scss'
const Rules: React.SFC<{}> = (props) => {
  return (
    <div className={styles.rules}>
      熔币规则
      <br/>
      熔币池中 EOS 数量会随着用户购买矿机而增加，3天为一个周期, 等到周期结束后，熔币池中所有 EOS 会按照用户投入 BOS 比例进行分发。分发完毕后，开启下一周期。
      <br/>
      <br/>
    </div>
  )
}

export default Rules;