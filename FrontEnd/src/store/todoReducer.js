export const reducerDisplayTodo = (state, todoList) => {
  const newState = { ...state, todoList: todoList };
  return newState;
};

// Function to handle Delete reducer
export const reducerDeleteTodo = (state, idToDelete) => {
  let newTodoList = state.todoList.filter((todo) => todo.id !== idToDelete);
  const newState = { ...state, todoList: newTodoList };
  return newState;
};

// Function to handle Add reducer
export const reducerAddTodo = (state, addTodo) => {
  let newList = [addTodo, ...state.todoList];
  const newState = { ...state, todoList: newList };
  return newState;
};

// Function to handle Edit reducer
export const reducerEditTodo = (state, editTodo) => {
  let newList = state.todoList.map((todo) => {
    if (todo.id === editTodo.id) {
      let newTodo = {
        ...todo,
        title: editTodo.title,
      };
      return newTodo;
    }
    return todo;
  });
  const newState = { ...state, todoList: newList };
  return newState;
};

// Function to handle Checked reducer
export const reducerCheckedTodo = (state, checkedTodo) => {
  let newList = state.todoList.map((todo) => {
    if (todo.id === checkedTodo.id) {
      checkedTodo = {
        ...todo,
        completed: checkedTodo.completed,
      };
      return checkedTodo;
    }
    return todo;
  });
  const newState = { ...state, todoList: newList };
  return newState;
};
