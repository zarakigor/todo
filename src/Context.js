import React, { useState, useEffect, createContext } from "react";
import Todo from "./components/Todo";

const Context = createContext();

function ContextProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [newTodo, setNewTodo] = useState("");
  const [todoData, setTodoData] = useState([]);
  const [editedContent, setEditedContent] = useState("");

  function getData() {
    fetch(`https://6314d833fc9dc45cb4f50497.mockapi.io/todos`)
      .then((res) => res.json())
      .then((data) => {
        setTodoData(data);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  const todoList = todoData.map((item) => (
    <Todo
      key={item.id}
      content={item.content}
      isCompleted={item.isCompleted}
      id={item.id}
    />
  ));

  function handleSubmit(event) {
    event.preventDefault();
    if (newTodo.trim().length > 2) {
      fetch("https://6314d833fc9dc45cb4f50497.mockapi.io/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: newTodo,
          isCompleted: false,
        }),
      })
        .then((response) => {
          if (response.ok) {
            getData();
          } else if (!response.ok) {
            throw Error(response.statusText);
          }
        })
        .then(setNewTodo(""));
    } else {
      alert("TODO must contain at least 3 characters");
    }
  }

  function handleDelete(id) {
    fetch(`https://6314d833fc9dc45cb4f50497.mockapi.io/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        getData();
      } else if (!response.ok) {
        throw Error(response.statusText);
      }
    });
  }

  function handleChange(event) {
    setNewTodo(event.target.value);
  }

  function handleLogin(event) {
    localStorage.setItem("user", JSON.stringify(event.target[0].value));
  }

  return (
    <Context.Provider
      value={{
        user,
        newTodo,
        getData,
        handleChange,
        handleSubmit,
        handleLogin,
        todoList,
        handleDelete,
        editedContent,
        setEditedContent,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
