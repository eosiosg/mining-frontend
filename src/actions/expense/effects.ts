import uuid from "uuid";
import { Expense } from '../../../types/Expense';
import { AppAction } from '../../../types';
import { Dispatch } from "redux";
import { AppState } from "../../store/configureStore";
import * as ActionTyps from './constants';


// 4 hook up types to redux actions
export const addExpense = (expense: Expense): AppAction => ({
  type: ActionTyps.ADD_EXPENSE,
  expense
});

export const removeExpense = (id: string): AppAction => ({
  type: ActionTyps.REMOVE_EXPENSE,
  id
});

export const editExpense = (expense: Expense) : AppAction => ({
  type: ActionTyps.EDIT_EXPENSE,
  expense
});

export const setExpenses = (expenses: Expense[]): AppAction => ({
  type: ActionTyps.SET_EXPENSES,
  expenses
});

export const startAddExpense = (expenseData: Expense) => {
  return (dispatch: Dispatch<AppAction>, getState: () => AppState) => {
    const {
      description = "",
      note = "",
      amount = 0,
      createdAt = 0
    } = expenseData;
    const expense = { description, note, amount, createdAt };

    const id = uuid();

    dispatch(
      addExpense({
        id,
        ...expense
      })
    );
  };
};

export const startRemoveExpense = (id:string) => {
  return (dispatch: Dispatch<AppAction>, getState: () => AppState) => {
    dispatch(removeExpense(id));
  };
};

export const startEditExpense = (expense: Expense) => {
  return (dispatch: Dispatch<AppAction>, getState: ()=> AppState) => {
    dispatch(editExpense(expense));
  };
};

export const startSetExpenses = (expenses: Expense[]) => {
  //console.log(database);
  return (dispatch: Dispatch<AppAction>, getState: () => AppState) => {
    dispatch(setExpenses(expenses));
  };
};
