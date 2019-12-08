import React, { useState } from 'react';
import styles from 'styles/topup/topup.module.scss'
import ContentWrapper from 'components/blockContent';
import TextInput from 'components/inputElement';
import classnames from 'classnames'

export const CoinType: {
  [key: string]: string;
} = {
  "1": "EOS",
  "2": "BOS"
}

const Retrieval: React.FC<{}> = (props) => {
  const [shown, setShown] = useState(false)

  // user tage [option]
  const [tag, setTag] = useState('');
  const handleTagChange = (value: string) => setTag(value);

  // coin amount
  const [amountCoin, setAmountCoin] = useState(0);
  const handleCoinAmountChange = (value: string | number) => {
    if (typeof value === 'string') {
      value = value !== "" ? parseInt(value, 10) : 0;
      if (isNaN(value)) return
      setAmountCoin(value)
    }
  }

  // coin type
  const [coinType, setCoinType] = useState<keyof (typeof CoinType)>("1");
  const handleCoinType = (type: keyof (typeof CoinType)) => () => {
    setShown(false);
    setCoinType(type);
  }

  // address
  const [address, setAddress] = useState('lalala')

  return (
    <div>
    <ContentWrapper>
      <div style={{height: `${20/37.5}rem`}}></div>

      <div className={styles.hintTips}>提币地址</div>
      <div className={styles.address}>
        {address}
      </div>

      <div className={styles.hintTips}>标签</div>
      <TextInput
        value={tag}
        onchange={handleTagChange}
        fontSize={14}
        placeholder={"请输入标签（选填）"}
      />

      <div className={styles.hintTips}>提币数量</div>
      <TextInput
        value={amountCoin}
        onchange={handleCoinAmountChange}
        fontSize={14}
        prefix={<Selection shown={shown} display={CoinType[coinType]}  onClick={() => setShown(!shown)}/>}
      />
      <div className={styles.selectionWrapper}>
        <span className={classnames(styles.selection,styles.hide, {[styles.shown]: shown})}>
        {Object.keys(CoinType).map((type) => 
          <div key={type} onClick={handleCoinType(type)}>{CoinType[type]}</div>)
        }
        </span>
      </div>
      <div className={styles.btnWrapper}>
        <button onClick={() => alert('挖')}>提币</button>
      </div>
      </ContentWrapper>
      
      <div style={{height: `${18/37.5}rem`}}></div>
      <div className={styles.blockHeader}>
        <span>温馨提醒</span>
      </div>
      <div className={styles.introduction}>
        *请确认提币地址是否正确，不正确无法找回。<br/><br/>
        *请确认标签是否正确，不正确无法找回。<br/><br/> 
      </div>
      </div>
  )
}

export default Retrieval;

const Selection: React.SFC<{shown: boolean, onClick: () => void, display: string}> = (props) => {
  return (
    <div style={{display: "flex", alignItems: "center"}}>
      <span style={{paddingRight: '5px'}} onClick={props.onClick}>{props.display}</span>|<span style={{padding: '0 5px'}}>全部</span>
    </div>
  )
}