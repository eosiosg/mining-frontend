import React, { useState, useEffect } from 'react';
import styles from 'styles/topup/topup.module.scss'
import ContentWrapper from 'components/blockContent';
import TextInput from 'components/inputElement';
import classnames from 'classnames'
import {connect} from 'react-redux'
import { AppState } from 'store/configureStore';
import scatterEos from 'transaction/ScatterService';
import { AccountInfo } from 'typings/api';
import { accountCtrl, poolCtrl } from 'api/backendAPI';
import { setUserInfo } from 'actions/account/effects';
import { ThunkDispatch } from 'redux-thunk';
import { AppAction } from 'typings/feature';
import { setForgePageInfo } from 'actions/pool/effects';

export const CoinType: {
  [key: string]: string;
} = {
  "1": "EOS",
  "2": "BOS"
}

const Retrieval: React.FC<LinkStateProps & LinkDispatchProps> = (props) => {
  const [shown, setShown] = useState(false)

  // user tage [option]
  const [tag, setTag] = useState('');
  const handleTagChange = (value: string) => setTag(value);

  // coin amount
  const [amountCoin, setAmountCoin] = useState("");
  const handleCoinAmountChange = (value: string) => {
      const reg = /^([0-9]*)(\.?)(\d{0,4})$/
      if (!value.match(reg)) return
      
      let newValue = value.replace(reg, "$1$2$3")
      setAmountCoin(newValue)
  }
  const handleSelectAll = () => {
    if (coinType == "1") {
      setAmountCoin(props.accountInfo.eosBalance.split(" ")[0])
    } else if (coinType ==="2") {
      setAmountCoin(props.accountInfo.bosBalance.split(" ")[0])
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
    let amount = amountCoin == "" ? 0 : parseFloat(amountCoin)
    scatterEos.withdraw(props.userName, `${amount.toFixed(4)} ${CoinType[coinType]}`, CoinType[coinType])
    .then(res => {
      if (res) {
        setAmountCoin("")
        setTimeout(() => {
          accountCtrl.getAccountInfoUsingGET(props.accountInfo.accountName, {})
          .then(res => props.dispatch(setUserInfo(res)));
          poolCtrl.getForgePageUsingGET(props.accountInfo.accountName)
          .then(res => {
            props.dispatch(setForgePageInfo(res));
          });
        }, 5000)
        
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
        prefix={<Selection 
                  shown={shown} 
                  display={CoinType[coinType]}  
                  onClick={() => setShown(!shown)}
                  onSelectAll={handleSelectAll}
                />}
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
  accountInfo?: AccountInfo;
}
interface LinkDispatchProps {
  dispatch: (action: AppAction) => void;
}

const mapStateToProps = (state: AppState): LinkStateProps => ({
  userName: state.accountInfo.accountName,
  accountInfo: state.accountInfo
});
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any,AppAction>): LinkDispatchProps => ({
  dispatch: dispatch
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Retrieval);


const Selection: React.SFC<{
  shown: boolean, 
  onClick: () => void, 
  display: string,
  onSelectAll: () => void
} > = (props) => {
  const haldleAllBtn = (event: React.MouseEvent) => {
    event.preventDefault();
    props.onSelectAll()
  }
  return (
    <div style={{display: "flex", alignItems: "center"}}>
      <span style={{paddingRight: '5px'}} onClick={props.onClick}>{props.display}</span>|<span onClick={haldleAllBtn} style={{padding: '0 5px'}}>全部</span>
    </div>
  )
}