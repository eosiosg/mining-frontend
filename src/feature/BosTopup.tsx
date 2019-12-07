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
        prefix={<div>aaa</div>}
   
      />
  
      </ContentWrapper>
      </div>
  )
}

export default BosTopup;