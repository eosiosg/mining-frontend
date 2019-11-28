import { ExpenseActionTypes } from "../../types/Expense";
import { Expense } from "../../types/Expense";
// 5 hook types to reducers
const expensesReducerDefaultState: Expense[] = [
  {
    id: 'lalala',
    note: 'sfsdfsa',
    description: 'desc',
    amount: 23,
    createdAt: 23
  }
];

export default (
  state = expensesReducerDefaultState, 
  action: ExpenseActionTypes
  ): Expense[] => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.expense];
    case "REMOVE_EXPENSE":
      return state.filter(({ id }) => id !== action.id);
    case "EDIT_EXPENSE":
      return state.map(expense => {
        if (expense.id === action.expense.id) {
          return {
            ...expense,
            ...action.expense
          };
        } else {
          return expense;
        }
      });
    case "SET_EXPENSES":
      return action.expenses;
    default:
      return state;
  }
};
