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
  }

  function handleIsCompleted(id) {
    fetch(`https://6314d833fc9dc45cb4f50497.mockapi.io/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isCompleted: !props.isCompleted,
      }),
    }).then((response) => {
      if (response.ok) {
        getData();
      } else if (!response.ok) {
        throw Error(response.statusText);
      }
    });
  }

  const viewTodo = (
    <div key="key" className={"todo__card "}>
      <div className={`${props.isCompleted ? "completed" : "incomplete"}`}>
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.isCompleted}
          onChange={() => handleIsCompleted(props.id)}
        ></input>
        <label htmlFor={props.id}>{props.content}</label>
      </div>
      <div className="btn__box">
        <button
          className="btn"
          onClick={() => {
            setIsEditing(true);
            setEditedContent(props.content);
          }}
        >
          Edit
        </button>
        <button className="btn" onClick={() => handleDelete(props.id)}>
          Delete
        </button>
      </div>
    </div>
  );

  const editTodo = (
    <div>
      <form onSubmit={handleUpdate} className="edit__box">
        <input
          id={props.id}
          type="text"
          value={editedContent || props.content}
          onChange={handleEdit}
        ></input>
        <div className="btn__box">
          <button className="btn">Save</button>
          <button
            className="btn"
            onClick={() => {
              setIsEditing(false);
              setEditedContent("");
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );

  return <div>{isEditing ? editTodo : viewTodo}</div>;
}

export default Todo;
