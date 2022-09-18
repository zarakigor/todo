import { useState, useContext } from "react";
import { Context } from "../Context";

function Form() {
  const { newTodo, handleChange, handleSubmit } = useContext(Context);

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
