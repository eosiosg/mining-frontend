// 熔币
// 倒计时那玩意

import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { AppState } from "../store/configureStore";
import { ThunkDispatch } from "redux-thunk";
import { AppAction } from "../typings/feature";
import { bindActionCreators } from "redux";
import { setForgeInfo, setForgePageInfo } from "../actions/pool/effects";
import { poolCtrl } from '../api/backendAPI';
import { getUserInfo } from "../actions/account/effects";
import { ForgeInfo, ForgePage } from "../typings/api";
import { timeDiff } from "../util/time";
import _ from 'lodash';
import { Switch, Route, useRouteMatch } from "react-router-dom";
import ContentWrapper from "components/blockContent";
import styles from '../styles/homepage.module.scss'
import TextInput from "components/inputElement";
import NavBar from "components/navLink";
import Rules from "./rules";
import RecentTrades from './RecentTrade'
import { Sticky } from "componentDecorator/stickyComponent";

interface ForgePageProps {

}

type Props = ForgePageProps & LinkDispatchProps & LinkStateProps;

const ForgePageContainer: React.FC<Props> = (props) => {
  const { 
    forgePageInfo,
    userName
  } = props;
  const [bosCount, setBosCount] = useState<number | string>("");
  let { path, url } = useRouteMatch();
  const [timer, setTimer] = useState<number[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const timerRef = useRef(timer);
  timerRef.current = timer;

  useEffect(() => {
    if (!userName) return;
    setIsFetching(true)
    poolCtrl.getForgePageUsingGET(userName)
    .then(res => {
      props.dispatch(setForgePageInfo(res));
      setIsFetching(false)
    });
  }, [props.userName]);

  const endTime = forgePageInfo.forgeInfo ? forgePageInfo.forgeInfo.endTimestamp : 0;
  useEffect(() => {
    let intervalId: number | undefined;
    
    if (endTime) {
      setTimer(timeDiff(new Date().valueOf(), endTime))
      intervalId = window.setInterval(() => 
        setTimer(timeDiff(new Date().valueOf(), endTime)), 1000);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    }
  }, [endTime]);
  const handleBosAmount = (value : string | number) => {
    if (typeof value == "string") {
      value = value !== "" ? parseInt(value, 10) : 0;
      if (isNaN(value)) return
    }
    setBosCount(value)
  }
  return (
    <div>
      <ContentWrapper>
        <div className={styles.campaign}>
          <div className={styles.timerBlock}>
            {timer.some(number => number> -1) &&
              <div className={styles.timer}>
                <p className={styles.title}>距离本轮结束</p>
                <p>{timer[0]}天</p>
                <p>{`${timer[1]}:${timer[2]}:${timer[3]}`}</p>
              </div>}
          </div>
          
          <div className={styles.poolInfo}>
            <p>熔币池总额</p>
            <div className={styles.poolBalance}>
              <span>{!isFetching && forgePageInfo.forgeInfo!.totalEos} </span>
              <span>{!isFetching && forgePageInfo.forgeInfo!.totalBos} </span>
            </div>
            <p className={styles.estimateReward}>预计本轮收益 +{forgePageInfo.estimatedEos}</p>
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
          当前已投入：
          <span>{!isFetching && forgePageInfo.myBosInForge}，</span>
          <span>{!isFetching && forgePageInfo.accountInfo!.bosBalance}</span>
        </div>
        {/*todo: slider here*/}
        <div className={styles.btnWrapper}>
          <button onClick={() => alert('挖')}>立刻投入</button>
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