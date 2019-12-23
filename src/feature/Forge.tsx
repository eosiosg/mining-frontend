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
import Rules from "./rules";
import RecentTrades from './RecentTrade'
import { Sticky } from "componentDecorator/stickyComponent";
import scatterEos from "transaction/ScatterService";
import { ReactComponent as Inicon } from '../static/svg/current_in_bos.svg';
import { ReactComponent as BenefitSVG } from '../static/svg/benefit3.svg';
import { Slider } from "antd";

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
  let eosRewardBosRatio = forgePageInfo.forgeInfo.estimatedRewardPerNewBos ?
    parseInt(forgePageInfo.forgeInfo.estimatedRewardPerNewBos,10) : 0;
  // campagin end time
  const endTime = forgePageInfo.forgeInfo ? forgePageInfo.forgeInfo.endTimestamp : 0;
  let serverTime = forgePageInfo.forgeInfo ? forgePageInfo.forgeInfo.serverTimestamp : Date.now();
  const bosInForge = typeof forgePageInfo.myBosInForge !== "undefined" ? 
    parseInt(forgePageInfo.myBosInForge.split(" ")[0],10) : 0;
  const availableBos = forgePageInfo.accountInfo ? 
    parseInt(forgePageInfo.accountInfo.availableBosOutside.split(" ")[0],10) : 0;
  /**
   * hooks
   */
  const [bosCount, setBosCount] = useState<number>(0);
  let { path, url } = useRouteMatch();
  const [timer, setTimer] = useState<number[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const timerRef = useRef(timer);
  const [sliderValue, setSliderValue] = useState(0)

  timerRef.current = timer;

  /**
   * user effects
   */
  useEffect(() => {
    if (!userName) return;
    setIsFetching(true)
    poolCtrl.getForgePageUsingGET(userName)
    .then(res => {
      props.dispatch(setForgePageInfo(res));
      setIsFetching(false)
    });
  }, [props.userName]);

  
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

  useEffect(() => {
    setBosCount(availableBos)
  },[availableBos])
  // user action handler
  const handleBosAmount = (value : string | number) => {
    if (availableBos <= 0) {
      alert('没有可用BOS')
      return -1
    }
    if (typeof value == "string") {
      value = value !== "" ? parseInt(value, 10) : 0;
      if (isNaN(value)) return
    }
    setBosCount(value)
    setSliderValue(Math.floor(value/availableBos * 100))
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
      handleBosAmount(-1)
      return
    }
    setSliderValue(value)
    setBosCount(Math.floor((value/100)*availableBos))
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
            矿机收益：<span>{`(兑换比: ${(10000*eosRewardBosRatio).toFixed(2)}EOS/10000BOS)`}</span>
          </p>
            <p className={styles.estimateReward} style={{marginTop: '5px'}}>
              熔币池总额: <span style={{marginRight: "5px"}}>{!isFetching && forgePageInfo.forgeInfo!.totalEos} </span>
              <span>{!isFetching && forgePageInfo.forgeInfo!.totalBos} </span>
            </p>
          </div>
          <div className={styles.minerReward}>
            <div className={styles.content}>
              <div className={styles.block}>
              <Inicon />
                <p>
                  <span>当前投入</span><br/>
                  <span>{`${bosInForge.toFixed(2)} BOS`}</span>
                </p>
              </div>
              <div className={styles.sep}></div>
              <div className={styles.block}>
              <BenefitSVG />
                <p>
                  <span>预计收益</span><br/>
                  <span>+{`${(bosInForge * eosRewardBosRatio).toFixed(2)} EOS`}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <TextInput
          prefix={<InputPrefix />}
          value={bosCount}
          onchange={handleBosAmount}
          fontSize={12}
          placeholder="输入BOS数量"
        />
        <div className={styles.balance}>
          余额：<span>{!isFetching && `${availableBos} BOS`}</span>
        </div>
        {/*todo: slider here*/}
        <Slider 
          value={sliderValue}
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
          <>{`*预计收益${eosRewardBosRatio * bosCount}EOS`}</>}
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
          <RecentTrades />
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