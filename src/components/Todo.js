import { useState, useContext } from "react";
import { Context } from "../Context";

function Todo(props) {
  const { getData, editedContent, setEditedContent, handleDelete } =
    useContext(Context);
  const [isEditing, setIsEditing] = useState(false);

  function handleEdit(event) {
    setEditedContent(event.target.value);
  }

  function handleUpdate(event) {
    event.preventDefault();
    const todoId = event.target[0].id;
    if (editedContent.trim().length > 2) {
      fetch(`https://6314d833fc9dc45cb4f50497.mockapi.io/todos/${todoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: editedContent.trim(),
        }),
      }).then((response) => {
        if (response.ok) {
          getData();
          setIsEditing(false);
        } else if (!response.ok) {
          throw Error(response.statusText);
        }
      });
    }
    //console.log(id);
  }

  const viewTodo = (
    <div
      key="key"
      className={`todo__card ${props.isCompleted ? "completed" : "incomplete"}`}
    >
      <p>{props.content}</p>
      <button
        onClick={() => {
          setIsEditing(true);
          setEditedContent(props.content);
        }}
      >
        Edit
      </button>
      <button onClick={() => handleDelete(props.id)}>Delete</button>
    </div>
  );

  const editTodo = (
    <div>
      <p>editing...</p>
      <form onSubmit={handleUpdate}>
        <label htmlFor={props.id}> Edit for "{props.content}"</label>
        <input
          id={props.id}
          type="text"
          value={editedContent || props.content}
          onChange={handleEdit}
        ></input>
        <button>Save</button>
      </form>
      <button
        onClick={() => {
          setIsEditing(false);
          setEditedContent("");
        }}
      >
        Cancel
      </button>
    </div>
  );

  return <div>{isEditing ? editTodo : viewTodo}</div>;
}

export default Todo;
