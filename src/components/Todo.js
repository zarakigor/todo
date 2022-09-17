import { useContext } from "react";
import { Context } from "../Context";

function Todo(props) {
  const { handleEdit, handleDelete } = useContext(Context);
  return (
    // nanoid hem id hem de key olacak yeni todolar için
    // eskileri için key id olacak
    <div
      key="key"
      className={`todo__card ${props.isCompleted ? "completed" : "incomplete"}`}
    >
      <p>{props.content}</p>
      <button onClick={() => handleEdit(props.id)}>Edit</button>
      <button onClick={() => handleDelete(props.id)}>Delete</button>
    </div>
  );
}

export default Todo;
