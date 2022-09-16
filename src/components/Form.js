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
      <p> {newTodo}</p>
    </div>
  );
}

export default Form;

// function Form(props) {
//   const [newTodo, setNewTodo] = useState("");
//   function handleSubmit(event) {
//     event.preventDefault();
//     // fetch ile API a ekle
//     // setNewTodo("") yazarak sıfırla
//   }

//   function handleChange(event) {
//     // update için de bu kullanılabilir
//     setNewTodo(event.target.value);
//   }

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Enter todo here"
//           onChange={handleChange}
//           name="newTodo"
//           value={newTodo}
//         ></input>
//         <button type="submit" className="btn ">
//           Add Todo
//         </button>
//       </form>
//       <p> {newTodo}</p>
//     </div>
//   );
// }
