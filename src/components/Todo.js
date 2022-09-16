function Todo(props) {
  return (
    <div
      key="key"
      className={`todo__card ${props.isCompleted ? "completed" : "incomplete"}`}
    >
      <p>{props.content}</p>
      <p>{props.isCompleted ? "true" : "false"}</p>
    </div>
  );
}

export default Todo;
