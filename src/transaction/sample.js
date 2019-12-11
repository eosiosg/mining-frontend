import {chainId} from "../config";
import store from "../store";
import {UPDATE_SCATTER, UPDATE_USER_INFO, IS_CONNECTTING_SCATTER, MODIFY_GETTING_ACCOUNT_SGTATUS} from "../constants";
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
import axios from 'axios';
ScatterJS.plugins( new ScatterEOS() );

export const connectScatter = () => dispatch => {
  dispatch({
    type: IS_CONNECTTING_SCATTER,
    payload: true
  })

  dispatch({
    type: MODIFY_GETTING_ACCOUNT_SGTATUS,
    payload: 'CONNECTTING_SCATTER'
  })

  getConnection().then((connectedSuccess) => {
    if(connectedSuccess){
      const scatter = ScatterJS.scatter;
      dispatch({
        type: UPDATE_SCATTER,
        payload: scatter,
      })

      dispatch({
        type: MODIFY_GETTING_ACCOUNT_SGTATUS,
        payload: 'START_SELECT_ACCOUNT'
      })

      selectedIdentity(scatter).then((getIndentity) => {
        dispatch({
          type: IS_CONNECTTING_SCATTER,
          payload: false,
        })

        if(getIndentity){
          const accounts = scatter.identity.accounts;
          let name = scatter.identity.name;
          let eosAccount = '';
          let authority = '';

          try{
            if (accounts && accounts.length > 0) {
              name = scatter.identity.accounts[0].name;
              eosAccount = scatter.identity.accounts[0].name;
              authority = scatter.identity.accounts[0].authority;
            }
            const userInfo = Object.assign(scatter.identity, { name, eosAccount, authority });
            dispatch({
              type: UPDATE_USER_INFO,
              payload: userInfo,
            })


            dispatch({
              type: MODIFY_GETTING_ACCOUNT_SGTATUS,
              payload: 'SUCCESS'
            })

            if(process.env.PROJECT_ENV === 'eos_production'){
              let projectName = store.getState().projectName;
              axios.post(`https://api.findex.pro/update_account_active_info`, {
                'platform': projectName,
                'account': eosAccount
              }).catch(err => {})
            }

          }catch(err){
            console.log('ERR WHEN GET USER ACCOUNT', err);
          }
        } else {
          dispatch({
            type: MODIFY_GETTING_ACCOUNT_SGTATUS,
            payload: 'REFUSED'
          })
        }
      }).catch(err => {
        dispatch({
          type: IS_CONNECTTING_SCATTER,
          payload: false,
        })
      })

    } else {
      alert('Please make sure you have scatter installed and opened');
      dispatch({
        type: IS_CONNECTTING_SCATTER,
        payload: false
      })
      dispatch({
        type: MODIFY_GETTING_ACCOUNT_SGTATUS,
        payload: 'NO_CONNECTION'
      })
    }
  }).catch(err => {
    console.log('err when connecting: ', err);
  })

}

// getScatter connection
const getConnection = () => ScatterJS.scatter.connect("Findex").then((connected) => {
  // User does not have Scatter Desktop, Mobile or Classic installed.
  if(!connected) return false;
  window.ScatterJS = null;
  return true
}).catch((err) => {
  console.log('err when connect with scatter', err);
});

// get identity
const selectedIdentity = (scatter) => scatter.getIdentity({ accounts: [{ chainId: chainId, blockchain:'eos' }] }).then((res) => {
  return true
}).catch((error) => {
  console.log('error when select identity:', error);
});

export const forgetIdentity = () => {
  let scatter = store.getState().scatter;
  return scatter.forgetIdentity().then(() => true).catch(err => false)
}

export const switchAccount = () => dispatch => {
  forgetIdentity().then((hasForgoten) => {
    if(hasForgoten){
      dispatch(connectScatter());
    }
  })
}