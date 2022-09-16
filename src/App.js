import { useEffect, useState, useContext } from "react";
import Form from "./components/Form";
import Login from "./Login";
import { Context } from "./Context";

function App() {
  const { user, todoList } = useContext(Context);

  return (
    <div className="App">
      {user ? (
        <div>
          <Form /> {todoList}
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
