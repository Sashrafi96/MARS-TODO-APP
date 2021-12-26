import "./styles.css";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadTodoList } from "./store/todoActions";
export default function App() {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTodoList());
  }, [dispatch]);

  return (
    <div id="thediv" className="d-flex align-items-center flex-column">
      <div
        className="card border-dark border-3 m-2"
        style={{ maxWidth: "600px" }}
      >
        <div className=" card-header border-light">
          <Navbar />
          <AddTodo />
          <div className="form-text m-2 test-muted fs-4 fw-bold fst-italic text-decoration-underline text-success">
            List of To-Do's:
          </div>
        </div>
        <div className="container ">
          <TodoList />
        </div>
      </div>
    </div>
  );
}
