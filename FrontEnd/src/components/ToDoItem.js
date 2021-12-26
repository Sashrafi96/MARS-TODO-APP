import "../styles.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteTodoAction,
  editTodoAction,
  checkedTodoAction,
} from "../store/todoActions";

export default function ToDoItem({ todo }) {
  let dispatch = useDispatch();
  let [editFlag, setEditFlag] = useState(false);
  let [updatedTitle, setUpdatedTitle] = useState(todo.title);
  let status = false;

  let checkHandler = (event) => {
    event.currentTarget.checked ? (status = true) : (status = false);
    dispatch(checkedTodoAction(todo.id, status));
  };

  let deleteHandler = (id) => {
    dispatch(deleteTodoAction(id));
  };

  let editHandler = () => {
    setEditFlag(true);
  };

  let saveHandler = () => {
    dispatch(editTodoAction(todo.id, updatedTitle));
    setEditFlag(false);
  };

  return (
    <div className="d-flex justify-content-between">
      <div className="d-flex align-items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={(event) => {
            checkHandler(event);
          }}
        />

        {editFlag ? (
          <input
            className="p-1 text-break fs-5"
            type="text"
            value={updatedTitle}
            onChange={(event) => {
              setUpdatedTitle(event.target.value);
            }}
          />
        ) : (
          <span className="p-2 fs-6">{todo.title}</span>
        )}
      </div>
      <div className="d-flex">
        <button className="btn">
          {editFlag ? (
            <i
              onClick={saveHandler}
              className="bi bi-save text-success fs-4"
            ></i>
          ) : (
            <i
              onClick={editHandler}
              className="bi bi-pencil-square text-success fs-4"
            ></i>
          )}
        </button>
        <button className="btn">
          <i
            onClick={() => deleteHandler(todo.id)}
            className="bi bi-trash text-danger fs-4"
          ></i>
        </button>
      </div>
    </div>
  );
}
