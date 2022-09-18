import { useState, useContext } from "react";
import { Context } from "../Context";

function Form() {
  const { user, newTodo, handleChange, handleSubmit } = useContext(Context);

  return (
    <div>
      <h1 className="title">What's up {user}!</h1>
      <form onSubmit={handleSubmit} className="form__box">
        <input
          type="text"
          placeholder="Enter todo here"
          onChange={handleChange}
          name="newTodo"
          value={newTodo}
        ></input>
        <button type="submit" className="btn ">
          Add Todo
        </button>
      </form>
    </div>
  );
}

export default Form;
