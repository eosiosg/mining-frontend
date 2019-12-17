import React, { useState, useEffect } from 'react';
import styles from 'styles/topup/topup.module.scss'
import ContentWrapper from 'components/blockContent';
import TextInput from 'components/inputElement';
import classnames from 'classnames'
import {connect} from 'react-redux'
import { AppState } from 'store/configureStore';
import scatterEos from 'transaction/ScatterService';

export const CoinType: {
  [key: string]: string;
} = {
  "1": "EOS",
  "2": "BOS"
}

const Retrieval: React.FC<LinkStateProps> = (props) => {
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
  const [address, setAddress] = useState('')
  useEffect(() => {
    if (props.userName) {
      setAddress(props.userName)
    }
  }, [props.userName])
  const handleWidraw = () => {
    // scatterEos.withdraw(props.userName, amountCoin, CoinType[coinType])
    scatterEos.withdraw(props.userName, `${amountCoin.toFixed(4)} ${CoinType[coinType]}`, CoinType[coinType])
    .then(res => {
      if (res) {
        setAmountCoin(0)
      }
    })
  }
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
        <button onClick={handleWidraw}>提币</button>
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

interface LinkStateProps {
  userName?: string;
}

const mapStateToProps = (state: AppState): LinkStateProps => ({
  userName: state.accountInfo.accountName,

});

export default connect(
  mapStateToProps,
  null
)(Retrieval);


const Selection: React.SFC<{shown: boolean, onClick: () => void, display: string}> = (props) => {
  return (
    <div style={{display: "flex", alignItems: "center"}}>
      <span style={{paddingRight: '5px'}} onClick={props.onClick}>{props.display}</span>|<span style={{padding: '0 5px'}}>全部</span>
    </div>
  )
}