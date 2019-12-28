import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setUserInfo, TypeAccountInfo } from "../actions/account/effects";
import { AppState } from "../store/configureStore";
import { ThunkDispatch } from "redux-thunk";
import { AppAction } from "../typings/feature";
import NavBar from '../components/navLink';
import { Slider } from 'antd';
import { 
  useRouteMatch,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import { accountCtrl, poolCtrl } from '../api/backendAPI';
import styles from '../styles/homepage.module.scss'
import ContentWrapper from "components/blockContent";
import TextInput from "components/inputElement";
import Rules from "./rules";
import RecentTrades from './RecentTrade'
import { ReactComponent as MineSVG } from '../static/svg/mine3.svg';
import { ReactComponent as BenefitSVG } from '../static/svg/benefit3.svg';
import { Sticky } from "componentDecorator/stickyComponent";
import scatterEos from '../transaction/ScatterService'
import { setPoolMinerInfo } from "actions/pool/effects";
import { PoolInfo } from "typings/api";

import {useScatter, useMineSlider} from '../hooks'
interface HomePageProps {
  id?: string;
  color?: string;
  title?: string;
}

type Props = HomePageProps & LinkDispatchProps & LinkStateProps;


const HomePage: React.FC<Props> = (props) => {
  let { path, url } = useRouteMatch();

  const {
    maxMiner,
    price,
    balance
  } = useMineSlider(
    props.poolInfo.price, 
    props.accountInfo,
    props.poolInfo.availableMinerCount
  );

  
  const [buyMinerCount, setBuyMinerCount] = useState<number>(0);
  const [isExceed,setIsExceed] = useState(false)
  const [sliderValue, setSliderValue] = useState(0)
  
  const {connected, accountName, error, isLoading} = useScatter()
  useEffect(() => {
    if (!connected && !isLoading) {
      if (process.env.NODE_ENV === "development") {
        props.dispatch(setUserInfo({accountName: "mytestalice1"}))
      }
      return;
    }
    !isLoading && props.dispatch(setUserInfo({accountName}))
  },[connected, accountName, isLoading])

  useEffect(() => {
    if (!props.userName) return;
    accountCtrl.getAccountInfoUsingGET(props.userName, {})
    .then(res => props.dispatch(setUserInfo(res)));
  }, [props.userName])
  useEffect(() => {
    poolCtrl.getPoolInfoUsingGET()
    .then(res=> props.dispatch(setPoolMinerInfo({...res, availableMinerCount: 50})))
  },[])

  const handleMinerAccount = (value : string | number) => {
    if (typeof value == "string") {
      value = value !== "" ? parseInt(value, 10) : 0;
      if (isNaN(value)) return
    }
    setBuyMinerCount(value)
    setSliderValue(Math.floor(value/maxMiner * 100))
  }
  const handleBuyMiner = () => {
    scatterEos.buyminer(props.userName, buyMinerCount, props.accountInfo!.query!.refer)
    .then(res => {
      if(res) {
        setBuyMinerCount(0)
        accountCtrl.getAccountInfoUsingGET(props.userName, {})
          .then(res => props.dispatch(setUserInfo(res)));
      }
    })
  }
  
  //还需充值
  let [topupBos, setTopupBos] = useState(0);
  let [topupEos, setTopupEos] = useState(0);
  useEffect(() => {
      if (!price) {
        setIsExceed(false)
        return
      }
      topupBos =  buyMinerCount * price[0] - balance[0];
      topupEos =  buyMinerCount * price[1] - balance[1];
      setIsExceed(topupBos> 0 || topupEos > 0)
      setTopupBos(topupBos)
      setTopupEos(topupEos)
  },[sliderValue, buyMinerCount])
  const handleSliderChange = (value: number) => {
    setSliderValue(value)
    setBuyMinerCount(Math.floor((value/100)*maxMiner))
  }
  return (
    <div>
      <ContentWrapper>
        <div className={styles.accountInfo}> 
          <div className={styles.banner}>
            <div className={styles.content}>
              <p style={{textAlign: "left", fontWeight: 'normal'}} className={styles.title}>矿池总额</p>
              <p className={styles.totleEos}>{props.poolInfo.totalEos}</p>
              <p className={styles.minerPrice}>矿机单价：<span>{props.poolInfo.price}</span></p>
              <p style={{color: '#FFC74F', fontSize:`${(14/37.5).toFixed(8)}rem`}} className={styles.minerPrice}>矿机收益：<span>{props.poolInfo.estimatedRewardPerMiner}</span></p>
            </div>
          </div>
          <div className={styles.minerReward}>
            <div className={styles.content}>
              <div className={styles.block}>
              <MineSVG />
                <p>
                  <span>矿机数量</span><br/>
                  <span>{props.accountInfo.minerCount}个</span>
                </p>
              </div>
              <div className={styles.sep}></div>
              <div className={styles.block}>
              <BenefitSVG />
                <p>
                  <span>昨日收益</span><br/>
                  <span>+{props.accountInfo.lastReward}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <TextInput
          prefix={<InputPrefix />}
          value={buyMinerCount}
          onchange={handleMinerAccount}
          fontSize={12}
          placeholder="输入购买矿机数量"
        />

        <div className={styles.balance}>
          {
            isExceed ?
            <div style={{color: '#FF4343'}}>余额不足！还需充值
              <span>{topupBos>0 ? `${topupBos.toFixed(4)} BOS` : ''}</span>
              <span>{topupEos>0 ? `& ${topupEos.toFixed(4)} EOS` : ''}</span>
              {topupBos > 0 ? 
                <Link to={{
                  pathname: "/topup/bos",
                  state: {
                    topupBos,
                    topupEos
                  }
                }}><span style={{color: '#52F8EB', textDecoration:'underline'}}>充值</span></Link> 
                : (topupEos>0 ? 
                  <Link to={{
                    pathname: "/topup/eos",
                    state: {
                      amountBos: topupBos,
                      platform: topupEos
                    }
                  }}><span style={{color: '#52F8EB', textDecoration:'underline'}}>充值</span></Link> : null)}
            </div>
            :
            <>账户余额：
              <span>{props.accountInfo.eosBalance}，</span>
              <span>{props.accountInfo.bosBalance}</span>
            </>
          }
          
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
          disabled={maxMiner<1}
        />
        <span 
          style={{
            height: `${(12/37.5).toFixed(8)}rem`, 
            display: "inline-block"
            }} 
          className={styles.estimate}
        >
         {buyMinerCount > 0 && <>*预计收益增加 {(parseFloat(props.poolInfo.estimatedRewardPerMiner.split(' ')[0]) * buyMinerCount).toFixed(4) + '个EOS'}</>}
        </span>
        <div className={styles.btnWrapper}>
          <button onClick={handleBuyMiner}>立刻挖矿</button>
        </div>

        <div className={styles.warnning}>
          <div>
            <span>*预计到期收益只是估计值，不作为最终收益标准。</span><br/>
            <span>*投资有风险。请谨慎购买。</span>
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
          <RecentTrades  />
        </Route>
        
      </Switch>
    </div>
  );
}

interface LinkStateProps {
  userName?: string;
  accountInfo: TypeAccountInfo;
  poolInfo: PoolInfo
}

interface LinkDispatchProps {
  dispatch: (action: AppAction) => void
}
const mapStateToProps = (state: AppState, props: HomePageProps): LinkStateProps => ({
  userName: state.accountInfo.accountName,
  accountInfo: state.accountInfo,
  poolInfo: state.poolInfo
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any,AppAction>, props: HomePageProps): LinkDispatchProps => ({
  dispatch: dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);

const InputPrefix: React.FC<{}> = (props) => <span style={{padding: '8px'}}>台</span>