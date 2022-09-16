import React, { useState, useEffect, createContext } from "react";
import { nanoid } from "nanoid";
import Todo from "./components/Todo";

const Context = createContext();

function ContextProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [newTodo, setNewTodo] = useState("");
  const [datalar, setDatalar] = useState([]);

  useEffect(() => {
    fetch(`https://6314d833fc9dc45cb4f50497.mockapi.io/todos`)
      .then((res) => res.json())
      .then((data) => {
        //console.log(data)
        setDatalar(data);
      });
  }, []);

  const todoList = datalar.map((item) => (
    <Todo
      key={nanoid()}
      content={item.content}
      isCompleted={item.isCompleted}
      id={item.id}
    />
  ));

  function handleSubmit(event) {
    event.preventDefault();
    // fetch ile API a ekle
    // setNewTodo("") yazarak sıfırla
  }

  function handleChange(event) {
    // update için de bu kullanılabilir
    setNewTodo(event.target.value);
  }

  function handleLogin(event) {
    localStorage.setItem("user", JSON.stringify(event.target[0].value));
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
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
