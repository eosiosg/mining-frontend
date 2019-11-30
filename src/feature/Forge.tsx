// 熔币
// 倒计时那玩意

import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { AppState } from "../store/configureStore";
import { ThunkDispatch } from "redux-thunk";
import { AppAction } from "../typings/feature";
import { bindActionCreators } from "redux";
import { setForgeInfo } from "../actions/pool/effects";
import { poolCtrl } from '../api/backendAPI';
import { getUserInfo } from "../actions/account/effects";
import { ForgeInfo } from "../typings/api";
import { timeDiff } from "../util/time";
import _ from 'lodash';
interface ForgePageProps {

}

type Props = ForgePageProps & LinkDispatchProps & LinkStateProps;

const ForgePage: React.FC<Props> = (props) => {
  const [timer, setTimer] = useState<number[]>([]);
  const timerRef = useRef(timer);
  timerRef.current = timer;
  useEffect(() => {
    if (!props.userName) return;
    poolCtrl.getForgeInfoUsingGET()
    .then(res => {
      props.dispatch(setForgeInfo(res));
    });
  }, [props.userName]);

  useEffect(() => {
    console.log('lala')
    if (!props.userName) return;
    let intervalId: number | undefined;
    if (props.forgeInfo.endTimestamp) {
      intervalId = window.setInterval(() => setTimer(timeDiff(new Date().valueOf(), props.forgeInfo.endTimestamp!)), 1000);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    }
  }, [props.userName, props.forgeInfo.endTimestamp]);
  
  const { forgeInfo } = props;
  return (
    <div>
      {JSON.stringify(forgeInfo)}
      <p>{timer.join('  ')}</p>
    </div>
  );
}

interface LinkStateProps {
  userName?: string;
  forgeInfo: ForgeInfo;
}

interface LinkDispatchProps {
  getUserInfo: () => void;
  dispatch: (action: AppAction) => void
}
const mapStateToProps = (state: AppState, props: ForgePageProps): LinkStateProps => ({
  userName: state.accountInfo.accountName,
  forgeInfo: state.forgeInfo

});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any,AppAction>, props: ForgePageProps): LinkDispatchProps => ({
  getUserInfo: bindActionCreators(getUserInfo, dispatch),
  dispatch: dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgePage);