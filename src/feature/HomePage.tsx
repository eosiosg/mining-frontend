import React, { useEffect } from "react";
import { connect } from "react-redux";
import { startEditExpense, startRemoveExpense } from "../actions/expense/effects";
import { getUserInfo, setUserInfo } from "../actions/user/effects";
import { Expense } from "../typings/featurre/Expense";
import { AppState } from "../store/configureStore";
import { ThunkDispatch } from "redux-thunk";
import { AppAction } from "../typings/featurre";
import { bindActionCreators } from "redux";

import { accountCtrl } from '../api/backendAPI/homepage';
import styles from './style.module.scss'

interface HomePageProps {
  id?: string;
  color?: string;
  title?: string;
}

interface HomePageState {}

type Props = HomePageProps & LinkDispatchProps & LinkStateProps;

const HomePage: React.FC<Props> = (props) => {
  const onEdit = (expense: Expense) => {
    props.startEditExpense(expense);
  };
  const onRemove = (id: string) => {
    props.startRemoveExpense(id);
  };
  useEffect(() => {
    if(!props.userName) {
      props.getUserInfo();
    }
    
  },[props.userName])
  useEffect(() => {
    if (!props.userName) return;
    accountCtrl.getAccountInfoUsingGET(props.userName, {})
    .then(res => props.dispatch(setUserInfo(res)));
  }, [props.userName])
  const { expenses } = props;
  return (
    <div>
      <h1 className={styles.fontColor}>{props.title}</h1>
      <div>
        {expenses.map(expense => (
          <div>
            <p>{expense.description}</p>
            <p>{expense.amount}</p>
            <p>{expense.note}</p>
            <button onClick={() => onRemove(expense.id)}>
              Remov1e Expense
            </button>
            <button onClick={() => onEdit(expense)}>Edit Expense</button>
          </div>
        ))}
      </div>
    </div>
  );
}

interface LinkStateProps {
  expenses:  Expense[];
  userName?: string;
}

interface LinkDispatchProps {
  startEditExpense: (expense: Expense) => void;
  startRemoveExpense: (id: string) => void;
  getUserInfo: () => void;
  dispatch: (action: AppAction) => void
}
const mapStateToProps = (state: AppState, props: HomePageProps): LinkStateProps => ({
  expenses: state.expenses,
  userName: state.accountInfo.accountName
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any,AppAction>, props: HomePageProps): LinkDispatchProps => ({
  startEditExpense: bindActionCreators(startEditExpense, dispatch),
  startRemoveExpense: bindActionCreators(startRemoveExpense, dispatch),
  getUserInfo: bindActionCreators(getUserInfo, dispatch),
  dispatch: dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
