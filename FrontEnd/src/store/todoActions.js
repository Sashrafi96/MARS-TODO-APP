// LOAD TODOs
export const loadTodoList = () => {
  return (dispatch, getState) => {
    // reach out to api
    fetch(process.env.REACT_APP_API_HOST + "/todos/all")
      .then((response) => response.json())
      .then((todosList) => {
        dispatch({ type: "DISPLAY_TODO", payload: todosList });
      });
    console.log("use effect called in App component");
  };
};

// DELETE ACTION TODO
export const deleteTodoAction = (id) => {
  return (dispatch, getState) => {
    // reach out to api
    fetch(process.env.REACT_APP_API_HOST + "/todos/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        if (response.status === "success") {
          return dispatch({ type: "DELETE_TODO", payload: id });
        } else {
          console.log("API is failed to delete todo");
        }
      })
      .catch((e) => console.log("fetch error", e));
  };
};

// ADD ACTION TO DO
export const addTodoAction = (text) => {
  return (dispatch, getState) => {
    fetch(process.env.REACT_APP_API_HOST + "/todos/add", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: text, completed: false }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        if (response.status === "success") {
          return dispatch({
            type: "ADD_TODO",
            payload: { id: response.id, title: text, completed: false },
          });
        } else {
          console.log("API is failed to add  newtodo");
        }
      })
      .catch((e) => console.log("fetch error", e));
  };
};

// EDIT ACTION TO DO
export const editTodoAction = (id, text) => {
  return (dispatch, getState) => {
    // reach out to api
    fetch(process.env.REACT_APP_API_HOST + "/todos/update", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id, title: text }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        if (response.status === "success") {
          return dispatch({
            type: "EDIT_TODO",
            payload: { id: id, title: text },
          });
        } else {
          console.log("API is failed to edit todo");
        }
      })
      .catch((e) => console.log("fetch error", e));
  };
};

// CHECKED ACTION TO DO
export const checkedTodoAction = (id, status) => {
  return (dispatch, getState) => {
    // reach out to api
    fetch(process.env.REACT_APP_API_HOST + "/todos/complete", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id, completed: status }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        if (response.status === "success") {
          return dispatch({
            type: "CHECKED_TODO",
            payload: { id: id, completed: status },
          });
        } else {
          console.log("API is failed to change checked todo");
        }
      })
      .catch((e) => console.log("fetch error", e));
  };
};
