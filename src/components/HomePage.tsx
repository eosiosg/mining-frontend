import React from "react";
import { connect } from "react-redux";
import { startEditExpense, startRemoveExpense } from "../actions/expense/effects";
import { Expense } from "../../types/Expense";
import { AppState } from "../store/configureStore";
import { ThunkDispatch } from "redux-thunk";
import { AppAction } from "../../types/actions";
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
export class HomePage extends React.Component<Props, HomePageState> {
  onEdit = (expense: Expense) => {
    this.props.startEditExpense(expense);
  };
  onRemove = (id: string) => {
    this.props.startRemoveExpense(id);
  };
  componentDidMount() {
    accountCtrl.getAccountInfoUsingGET('123123', {})
    .then(res => console.log(res))
  }
  render() {
    const { expenses } = this.props;
    return (
      <div>
        <h1 className={styles.fontColor}>{this.props.title}</h1>
        <div>
          {expenses.map(expense => (
            <div>
              <p>{expense.description}</p>
              <p>{expense.amount}</p>
              <p>{expense.note}</p>
              <button onClick={() => this.onRemove(expense.id)}>
                Remov1e Expense
              </button>
              <button onClick={() => this.onEdit(expense)}>Edit Expense</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

interface LinkStateProps {
  expenses:  Expense[];
}

interface LinkDispatchProps {
  startEditExpense: (expense: Expense) => void;
  startRemoveExpense: (id: string) => void;
}
const mapStateToProps = (state: AppState, props: HomePageProps): LinkStateProps => ({
  expenses: state.expenses
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any,AppAction>, props: HomePageProps): LinkDispatchProps => ({
  startEditExpense: bindActionCreators(startEditExpense, dispatch),
  startRemoveExpense: bindActionCreators(startRemoveExpense, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
