import React, { useState, useEffect, createContext } from "react";
import { nanoid } from "nanoid";
import Todo from "./components/Todo";

const Context = createContext();

function ContextProvider({ children }) {
  const user = useState(JSON.parse(localStorage.getItem("user")));
  const [newTodo, setNewTodo] = useState("");
  const [datalar, setDatalar] = useState([]);

  function getData() {
    fetch(`https://6314d833fc9dc45cb4f50497.mockapi.io/todos`)
      .then((res) => res.json())
      .then((data) => {
        setDatalar(data);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  const todoList = datalar.map((item) => (
    <Todo
      key={item.id}
      content={item.content}
      isCompleted={item.isCompleted}
      id={item.id}
    />
  ));

  function handleSubmit(event) {
    event.preventDefault();
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
      .then(setNewTodo(""))
      .then(console.log(newTodo));
  }

  function handleDelete(id) {
    fetch(`https://6314d833fc9dc45cb4f50497.mockapi.io/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          //setDatalar(datalar.filter((todo) => id !== todo.id));
          getData();
        } else if (!response.ok) {
          throw Error(response.statusText);
        }
      })
      .then(console.log("sil"));
  }

  function handleChange(event) {
    // update için de bu kullanılabilir
    setNewTodo(event.target.value);
  }

  function handleLogin(event) {
    localStorage.setItem("user", JSON.stringify(event.target[0].value));
  }

  function handleEdit(id) {
    console.log(id);
  }

  console.log(datalar);
  return (
    <Context.Provider
      value={{
        user,
        newTodo,
        handleChange,
        handleSubmit,
        handleLogin,
        todoList,
        handleEdit,
        handleDelete,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
