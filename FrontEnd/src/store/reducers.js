import {
  reducerDisplayTodo,
  reducerDeleteTodo,
  reducerAddTodo,
  reducerEditTodo,
  reducerCheckedTodo,
} from "./todoReducer";

let todosList = [];
let initialState = {
  todoList: todosList,
  user: { id: 3889, name: "Safia" },
};

export function myReducer(state = initialState, action) {
  switch (action.type) {
    case "DISPLAY_TODO":
      return reducerDisplayTodo(state, action.payload);
    case "ADD_TODO":
      return reducerAddTodo(state, action.payload);
    case "DELETE_TODO":
      return reducerDeleteTodo(state, action.payload);
    case "EDIT_TODO":
      return reducerEditTodo(state, action.payload);
    case "CHECKED_TODO":
      return reducerCheckedTodo(state, action.payload);
    default:
      return state;
  }
}
