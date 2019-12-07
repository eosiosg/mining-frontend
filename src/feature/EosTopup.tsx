import React from 'react';
import styles from 'styles/topup/topup.module.scss'
import ContentWrapper from 'components/blockContent';
import TextInput from 'components/inputElement';
import { StateType, platformType } from 'pages/topupPage';
const EosTopup: React.FC<{
  transactionInfo: StateType,
  onchange: (value: string | number) => void
}> = (props) => {
  return (
    <div>
    <ContentWrapper>
      <div style={{height: `${20/37.5}rem`}}></div>
      <div className={styles.hintTips}>选择操作平台</div>
      <TextInput
        value={platformType[props.transactionInfo.platform]}
        onchange={props.onchange}
        fontSize={14}
        prefix={<div>aaa</div>}
        disabled={true}
      />
      <div className={styles.midImage}>
        <div className={styles.imgContainer}>
          <img src={'qrCode'} alt="qrcode"/>
        </div>
        <div className={styles.imgCaption}>点击保存图片</div>
      </div>
      </ContentWrapper>
      <div style={{height: `${18/37.5}rem`}}></div>
      <div className={styles.itemInfo}>
        <div className={styles.info}>
          <p>充值地址</p>
          <span>topup@address</span>
        </div>
        <span className={styles.action}>复制</span>
      </div>
      <div className={styles.itemInfo}>
        <div className={styles.info}>
          <p>备注</p>
          <span>this is a remark</span>
        </div>
        <span className={styles.action}>复制</span>
      </div>
      <div style={{height: `${18/37.5}rem`}}></div>
      <div className={styles.blockHeader}>
        <span>温馨提醒</span>
      </div>
      <div className={styles.introduction}>
        *请勿向上诉地址充值任何非EOS资产，否则将将无法找回。 <br/><br/>
        *您充值至上述地址后需要等待3～5分钟，交易达到不可逆状态方可提币。<br/><br/> 
        *最小充值金额：10 EOS 小于最小金额将无法找回。 <br/><br/>
        *您的充值地址不会经常改变，如果需要更改，我们会及时发布公告。 <br/><br/>
        *请务必确认安全，防止信息被篡改或泄漏。
      </div>
      </div>
  )
}

export default EosTopup;