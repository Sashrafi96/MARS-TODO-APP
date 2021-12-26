import "../styles.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodoAction } from "../store/todoActions";

export default function TodoList({ addTodo }) {
  let dispatch = useDispatch();
  let [text, setText] = useState("");

  let addHandler = (event) => {
    event.preventDefault();
    if (!text) {
      alert("Please add a task");
      return;
    }
    //addTodo(text);
    dispatch(addTodoAction(text));
    setText("");
  };

  return (
    <div className="input-group">
      <input
        className="form-control border-dark border-3"
        type="text"
        placeholder="Enter your To-Do"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <button className="btn btn-success">
        <i
          onClick={(event) => addHandler(event)}
          className="bi bi-plus-square"
        ></i>
      </button>
    </div>
  );
}
