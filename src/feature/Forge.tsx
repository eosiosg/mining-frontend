// 熔币
// 倒计时那玩意

import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { AppState } from "../store/configureStore";
import { ThunkDispatch } from "redux-thunk";
import { AppAction } from "../typings/feature";
import { bindActionCreators } from "redux";
import { setForgePageInfo } from "../actions/pool/effects";
import { poolCtrl } from '../api/backendAPI';
import { getUserInfo } from "../actions/account/effects";
import { ForgeInfo, ForgePage } from "../typings/api";
import { timeDiff } from "../util/time";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import ContentWrapper from "components/blockContent";
import styles from '../styles/homepage.module.scss'
import TextInput from "components/inputElement";
import NavBar from "components/navLink";
import Rules from "./ForgeRules";
import MineRecentTrades from './RecentTrade'
import ForgeRecentTrades from './ForgeRecentTrade'
import { Sticky } from "componentDecorator/stickyComponent";
import scatterEos from "transaction/ScatterService";
import { ReactComponent as Inicon } from '../static/svg/current_in_bos.svg';
import { ReactComponent as BenefitSVG } from '../static/svg/benefit3.svg';
import { Slider } from "antd";
import _ from 'lodash';
interface ForgePageProps {

}

type Props = ForgePageProps & LinkDispatchProps & LinkStateProps;

const ForgePageContainer: React.FC<Props> = (props) => {
  const { 
    forgePageInfo,
    userName
  } = props;

  /**
   * props parsing
   */
  // eos bos reward ratio
  // campagin end time
  const endTime = forgePageInfo.forgeInfo ? forgePageInfo.forgeInfo.endTimestamp : 0;
  let serverTime = forgePageInfo.forgeInfo ? forgePageInfo.forgeInfo.serverTimestamp : Date.now();
  const [forgeInfo, setForgeInfo] = useState({
    myBosInForge: "",
    bosBalance: "",
    eosBosRatio: "",
    availableBos: 0,
    totalBos: 0,
    totalEos: 0
  })
  useEffect(() => {
    if (_.isEmpty(forgePageInfo)) return
    const myBosInForge = forgePageInfo.myBosInForge
    const bosBalance = forgePageInfo.accountInfo.bosBalance

    const eosBosRatio = forgePageInfo.forgeInfo.estimatedRewardPer10KBos
    const totalBos = parseFloat(forgePageInfo.forgeInfo.totalBos.split(" ")[0])
    const totalEos = parseFloat(forgePageInfo.forgeInfo.totalEos.split(" ")[0])
    const availableBos = parseFloat(bosBalance.split(" ")[0])
    setForgeInfo({myBosInForge, bosBalance, eosBosRatio, availableBos, totalBos, totalEos})
  }, [forgePageInfo])
  /**
   * hooks
   */
  const [bosCountStr, setBosCountStr] = useState<string>("");
  const bosCount = parseFloat(bosCountStr)
  let { path, url } = useRouteMatch();
  const [timer, setTimer] = useState<number[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const timerRef = useRef(timer);
  const [sliderValue, setSliderValue] = useState(0)

  timerRef.current = timer;

  /**
   * user effects
   */
  // useEffect(() => {
  //   if (!props.userName) return;
  //   setIsFetching(true)
  //   poolCtrl.getForgePageUsingGET(props.userName)
  //   .then(res => {
  //     props.dispatch(setForgePageInfo(res));
  //     setIsFetching(false)
  //   });
  // }, [props.userName]);

  
  useEffect(() => {
    let intervalId: number | undefined;
    
    if (endTime) {
      setTimer(timeDiff(serverTime, endTime))
      intervalId = window.setInterval(() => 
        setTimer(timeDiff((serverTime += 1000), endTime)), 1000);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    }
  }, [endTime]);

  // user action handler
  const {
    myBosInForge,
    bosBalance,
    eosBosRatio,
    availableBos,
    totalBos,
    totalEos
  } = forgeInfo;
  const handleBosAmount = (value : string) => {
    const reg = /^([0-9]*)(\.?)(\d{0,4})$/
    if (!value.match(reg)) return
    let newValue = value.replace(reg, "$1$2$3")
    setBosCountStr(newValue)
    setSliderValue(Math.floor(parseFloat(newValue)/availableBos * 100))
  }
  const handleForge = () => {
    if (bosCount <=0 ) {
      alert("请输入有效的BOS数额")
      return
    }
    scatterEos.meltbos(props.userName, `${bosCount.toFixed(4)} BOS`)
    .then(res => {
      if (res) {
        poolCtrl.getForgePageUsingGET(userName)
        .then(res => {
          props.dispatch(setForgePageInfo(res));
        });
      }
    })
  }
  const handleSliderChange = (value: number) => {
    if (availableBos <= 0) {
      handleBosAmount("-1")
      return
    }
    setSliderValue(value)
    setBosCountStr((((value/100)*availableBos).toFixed(4)))
  }
  return (
    <div>
      <ContentWrapper>
        <div className={styles.campaign}>
          <div className={styles.timerBlock}>
            {timer.some(number => number> -1) &&
              <div className={styles.timer}>
                <p className={styles.title}>距离本轮结束</p>
                <p style={{color: '#52FFEA'}}>{timer[0]}天</p>
                <p style={{color: '#52FFEA'}}>{`${timer[1]}:${timer[2]}:${timer[3]}`}</p>
              </div>}
          </div>
          
          <div className={styles.poolInfo}>
          <p style={{
            color: '#FFC74F', 
            fontSize:`${(10/37.5).toFixed(8)}rem`,
            fontWeight: 'normal',
            marginBottom: '5px'
          }} className={styles.minerPrice}>
            <span>{`兑换比: ${eosBosRatio}EOS/10000BOS`}</span>
          </p>
            <p className={styles.estimateReward} style={{marginTop: '5px'}}>
              熔币池总额: <span style={{marginRight: "5px"}}>{`${totalEos.toFixed(4)} EOS`} </span>
              <span>{`${totalBos.toFixed(4)} BOS`} </span>
            </p>
          </div>
          <div className={styles.minerReward}>
            <div className={styles.content}>
              <div className={styles.block}>
              <Inicon />
                <p>
                  <span>当前投入</span><br/>
                  {/* <span>{`${bosInForge.toFixed(2)} BOS`}</span> */}
                  <span>{myBosInForge}</span>
                </p>
              </div>
              <div className={styles.sep}></div>
              <div className={styles.block}>
              <BenefitSVG />
                <p>
                  <span>预计收益</span><br/>
                  {/* <span>+{`${(bosInForge * eosRewardBosRatio).toFixed(2)} EOS`}</span> */}
                  <span>{`+${forgePageInfo.estimatedEos}`}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <TextInput
          prefix={<InputPrefix />}
          value={bosCountStr}
          onchange={handleBosAmount}
          fontSize={12}
          placeholder="输入BOS数量"
        />
        <div className={styles.balance}>
          余额：<span>{bosBalance}</span>
        </div>
        {/*todo: slider here*/}
        <Slider 
          value={sliderValue}
          disabled={!(availableBos > 0)}
          marks={{
            0: '0%',
            25: '25%',
            50: '50%',
            75: '75%',
            100: '100%'
          }}
          onChange={handleSliderChange}
        />
        <span 
          style={{
            height: `${(12/37.5).toFixed(8)}rem`, 
            display: "inline-block",
            whiteSpace: "nowrap"
            }} 
          className={styles.estimate}
        >
         {bosCount > 0 && 
          <>{`*预计收益${(Math.floor(bosCount / (bosCount + totalBos) * totalEos * 10000)/10000).toFixed(4)}EOS`}</>}
        </span>
        <div className={styles.btnWrapper}>
          <button onClick={handleForge}>立刻投入</button>
        </div>

        <div className={styles.warnning}>
          <div>
            <span>*预计到期收益只是估计值，不作为最终收益标准。</span><br/>
            <span>*投入熔池里的BOS不可找回，请谨慎投入。</span>
          </div>
        </div>
        
      </ContentWrapper>
      <Sticky sides={{top: 0}}>
      <div className={styles.info}>
        <NavBar 
          noBottomBorder={true}
          routes={[
            {
              url: url,
              exact: true,
              display: "规则"
            },
            {
              url: `${url}/recenttrade`,
              exact: true,
              display: "最近交易"
            }
          ]}
          gap={5}
        />
      </div>
      </Sticky>
   
      <Switch>
        <Route exact path={`${path}`}>
          <div style={{
            marginTop: `${(13/37.5).toFixed(8)}rem`
          }}>
          <ContentWrapper>
            <Rules />
          </ContentWrapper>
          </div>
        </Route>
        <Route path={`${path}/recenttrade`}>
          <ForgeRecentTrades />
        </Route>
      </Switch>
    </div>
  );
}

interface LinkStateProps {
  userName?: string;
  forgeInfo: ForgeInfo;
  forgePageInfo: ForgePage;

}

interface LinkDispatchProps {
  getUserInfo: () => void;
  dispatch: (action: AppAction) => void
}
const mapStateToProps = (state: AppState, props: ForgePageProps): LinkStateProps => ({
  userName: state.accountInfo.accountName,
  forgeInfo: state.forge.forgeInfo,
  forgePageInfo: state.forge.forgePageInfo

});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any,AppAction>, props: ForgePageProps): LinkDispatchProps => ({
  getUserInfo: bindActionCreators(getUserInfo, dispatch),
  dispatch: dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgePageContainer);

const InputPrefix: React.FC<{}> = (props) => <span style={{padding: '8px'}}>BOS</span>