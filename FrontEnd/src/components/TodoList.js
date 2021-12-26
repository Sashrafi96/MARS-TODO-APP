import "../styles.css";
import ToDoItem from "./ToDoItem";
import { useSelector } from "react-redux";

export default function TodoList() {
  let globalTodoList = useSelector((store) => store.todoList);

  return (
    <div className="card m-1" style={{ backgroundColor: "#c2deab" }}>
      <div className="TodoList p-1">
        {globalTodoList.length > 0 &&
          globalTodoList.map((TodoItemLocal) => {
            return <ToDoItem key={TodoItemLocal.id} todo={TodoItemLocal} />;
          })}
        {globalTodoList.length === 0 && (
          <div className="fs-4 ">Yay!!! NO MORE TO-DOs...PLEASE ADD MORE</div>
        )}
      </div>
    </div>
  );
}
