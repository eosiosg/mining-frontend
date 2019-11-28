import React, { useEffect } from "react";
import { connect } from "react-redux";
import { startEditExpense, startRemoveExpense } from "../actions/expense/effects";
import { getUserInfo } from "../actions/user/effects";
import { Expense } from "../../types/Expense";
import { AppState } from "../store/configureStore";
import { ThunkDispatch } from "redux-thunk";
import { AppAction } from "../../types";
import { bindActionCreators } from "redux";

import { accountCtrl } from '../api/backendAPI/homepage';
import styles from './style.module.scss'
import { UserType } from "../../types/user";
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
    .then(res => console.log(res))
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
// export class HomePage extends React.Component<Props, HomePageState> {
//   onEdit = (expense: Expense) => {
//     this.props.startEditExpense(expense);
//   };
//   onRemove = (id: string) => {
//     this.props.startRemoveExpense(id);
//   };
//   componentDidMount() {
//     accountCtrl.getAccountInfoUsingGET('123123', {})
//     .then(res => console.log(res))
//     this.props.getUserInfo();
//   }
//   render() {
//     const { expenses } = this.props;
//     return (
//       <div>
//         <h1 className={styles.fontColor}>{this.props.title}</h1>
//         <div>
//           {expenses.map(expense => (
//             <div>
//               <p>{expense.description}</p>
//               <p>{expense.amount}</p>
//               <p>{expense.note}</p>
//               <button onClick={() => this.onRemove(expense.id)}>
//                 Remov1e Expense
//               </button>
//               <button onClick={() => this.onEdit(expense)}>Edit Expense</button>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }
// }

interface LinkStateProps {
  expenses:  Expense[];
  userName?: string;
}

interface LinkDispatchProps {
  startEditExpense: (expense: Expense) => void;
  startRemoveExpense: (id: string) => void;
  getUserInfo: () => void;
}
const mapStateToProps = (state: AppState, props: HomePageProps): LinkStateProps => ({
  expenses: state.expenses,
  userName: state.userInfo.name
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any,AppAction>, props: HomePageProps): LinkDispatchProps => ({
  startEditExpense: bindActionCreators(startEditExpense, dispatch),
  startRemoveExpense: bindActionCreators(startRemoveExpense, dispatch),
  getUserInfo: bindActionCreators(getUserInfo, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
