import React, { useState, useRef } from 'react';
import styles from 'styles/topup/topup.module.scss'
import ContentWrapper from 'components/blockContent';
import TextInput from 'components/inputElement';
import { StateType } from 'pages/topupPage';
import classnames from 'classnames'
import config from '../config/config'
import * as QRCode from 'qrcode.react'
import bosLogo from '../static/BOSCore.png';
import {connect} from 'react-redux'
import scatterEos from 'transaction/ScatterService';
import { accountCtrl, poolCtrl } from 'api/backendAPI';
import { setForgePageInfo } from 'actions/pool/effects';
import { setUserInfo } from 'actions/account/effects';
import { AppState } from 'store/configureStore';
import { AccountInfo, ForgePage } from 'typings/api';
import { AppAction } from 'typings/feature';
import { ThunkDispatch } from 'redux-thunk';
import { HtmlAttributes } from 'csstype';
import AnchorLink from 'antd/lib/anchor/AnchorLink';
// type TypePlatform = typeof platformType;
// type PlatFormkeys = keyof TypePlatform | string;
// bosibc.io:deadlock2bos@eos
// wallet
const staticScanProtocalPocket = () => ({
  protocol: 'ScanProtocol', 
  action: 'transfer',
  address: config.contract,  // 转账目标地址
  contract: config.eostoken_contract,  // 可选，可以指定token，也可以由钱包扫码后自行选择转帐token，需要与字段symbol、precision保持匹配 
  symbol: 'EOS',  // 可选，可以指定token，也可以由钱包扫码后自行选择转帐token，需要与字段contract、precision保持匹配
  precision: 4,  // 可选，可以指定token，也可以由钱包扫码后自行选择转帐token，需要与字段contract、symbol保持匹配
  blockchain: 'EOS', // BTC, ETH, EOS, BOS, MEET.ONE 
  amount: '0', // 可选  真实转账数量
  memo: '', // 可选 备注信息
  chainid: config.bostestnet_chainid // 可选 
})
// exchange

const staticScanProtocalExchange = (user) => ({
  protocol: 'ScanProtocol', 
  action: 'transfer',
  address: 'bosibc.io',  
  contract: config.eostoken_contract,
  symbol: 'EOS', 
  precision: 4, 
  blockchain: 'EOS', 
  amount: '0', 
  memo: `${config.contract}@eos ${user}`, 
  chainid: config.bostestnet_chainid 
});

const EosTopup: React.FC<{
  transactionInfo: StateType,
  onchange: (value: string | number) => void
} & LinkStateProps & LinkDispatchProps> = (props) => {
  const handleTopUp = () => {
    scatterEos.transfereos(
      props.userName, 
      config.contract, 
      `${(+props.transactionInfo.amountEos).toFixed(4)} EOS`,
      ''
    ).then(res => {
      if (res) {
        props.onchange(0)
        accountCtrl.getAccountInfoUsingGET(  props.userName,  {})
        .then(res => props.dispatch(setUserInfo(res)));
        poolCtrl.getForgePageUsingGET(  props.userName )
          .then(res => {
            props.dispatch(setForgePageInfo(res));
          });
      }
    })
  }
  const [shown, setShown] = useState(false)
  const handleSelection = (value: string | number) => () => {
    setShown(false);
    props.onchange(value);
  }
  const scanProtocal =  staticScanProtocalPocket();
  const clickCopy = (textContent) => () => {
    const input = document.createElement('input');
      input.setAttribute('readonly', 'readonly');
      input.setAttribute('value', textContent);
      document.body.appendChild(input);
    input.setSelectionRange(0, 9999);
    if (document.execCommand('copy')) {
      document.execCommand('copy');
    }
      document.body.removeChild(input);
      alert('copied')
  }
  const downloadRef = useRef<HTMLAnchorElement>(null);
  const downloadImg = ()=>{
    const canvas: any = document.querySelector(`canvas`);
    downloadRef.current.href = canvas.toDataURL();
    
  }

  

  
  return (
    <div>
    <ContentWrapper>
      <div style={{height: `${20/37.5}rem`}}></div>
      <div className={styles.eosBar}>
        <div className={styles.infoBar}>
          <p>BOS主网充值EOS代币</p>
        </div>
      </div>
      <div className={styles.hintTips}>
        当前账户仍可充值EOS: 
      </div>
      <div className={styles.depositWrapper}>
      <TextInput
        value={props.transactionInfo.amountEos}
        placeholder="输入充值数量"
        onchange={props.onchange}
        fontSize={14}
        prefix={null}
      />     
      <div className={styles.btnWrapper}>
        <button onClick={handleTopUp}>充值</button>
      </div>   
      </div>
      <div className={styles.eosBar}>
        <div className={styles.infoBar}>
          <p>EOS主网充值EOS代币</p>
        </div>
        </div>
      {/* <TextInput
        value={platformType[props.transactionInfo.platform]}
        onchange={props.onchange}
        fontSize={14}
        prefix={<Selection shown={shown} onClick={() => setShown(!shown)}/>}
        disabled={true}
      /> */}
      {/* <div className={styles.selectionWrapper}>
        <span className={classnames(styles.selection,styles.hide, {[styles.shown]: shown})}>
        {Object.keys(platformType).map((platform: PlatFormkeys) => 
          <div key={platform} onClick={handleSelection(platform)}>{platformType[platform]}</div>)
        }
        </span>
      </div> */}
      <div className={styles.midImage}>
        <div className={styles.imgContainer}>
          <QRCode 
            value={JSON.stringify(scanProtocal)}
            size={128}
            bgColor={"#ffffff"}
            fgColor={"#000000"}
            level={"L"}
            includeMargin={true}
            renderAs={"canvas"}
            imageSettings={{
              src: bosLogo,
              x: null,
              y: null,
              height: 24,
              width: 24,
              excavate: true,
            }}
          />
        </div>
        <div className={styles.imgCaption}>
          <a ref={downloadRef} onClick={() => downloadImg()} download = 'qrcodeEOS.png'><span style={{color:"rgba(82,248,235,1)"}} >点击保存图片</span></a>
          <p>请用EOS钱包打开扫描</p>
        </div>
      </div>
      </ContentWrapper>
      <div style={{height: `${18/37.5}rem`}}></div>
      <div className={styles.itemInfo}>
        <div className={styles.info}>
          <p>充值地址</p>
          <span>{config.contract}</span>
        </div>
        <span className={styles.action} onClick={clickCopy(config.contract)}>复制</span>
      </div>
      <div className={styles.itemInfo}>
        <div className={styles.info}>
          <p>备注</p>
          <span>this is a remark</span>
        </div>
        <span className={styles.action} onClick={clickCopy('this is a remark')}>复制</span>
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

interface LinkStateProps {
  userName?: string;
  accountInfo?: AccountInfo,
  forgePageInfo?: ForgePage
}
const mapStateToProps = (state: AppState): LinkStateProps => ({
  userName: state.accountInfo.accountName,
})
interface LinkDispatchProps {
  dispatch: (action: AppAction) => void;
}
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any,AppAction>): LinkDispatchProps => ({
  dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(EosTopup);

// const Selection: React.SFC<{shown: boolean, onClick: () => void}> = (props) => {
//   return (
//     <div>
//       <span style={{paddingRight: '15px'}} onClick={props.onClick}>切换</span>
//     </div>
//   )
// }