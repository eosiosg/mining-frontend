import React from 'react';
import ContentWrapper from 'components/blockContent';
import styles from 'styles/topup/topup.module.scss'
import TextInput from 'components/inputElement';
import { StateType } from 'pages/topupPage';
const BosTopup: React.FC<{
  transactionInfo: StateType,
  onchange: (value: string | number) => void
}> = (props) => {
  return (
    <div>
    <ContentWrapper>
      <div style={{height: `${20/37.5}rem`}}></div>
      <div className={styles.hintTips}>
        充值数量
        <span className={styles.extraAction}>
          <span>BOS</span>|<span>全部</span> 
        </span>  
      </div>
      <TextInput
        value={props.transactionInfo.amountBos}
        placeholder="最小充值数量10"
        onchange={props.onchange}
        fontSize={14}
        prefix={null}
      />
      <div className={styles.bosRemain}>{`当前账户可用 3000.0000 BOS`}</div>
      <div className={styles.btnWrapper}>
        <button onClick={() => alert('挖')}>立刻挖矿</button>
      </div>
  
      </ContentWrapper>
      </div>
  )
}

export default BosTopup;