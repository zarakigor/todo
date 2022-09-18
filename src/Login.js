import { useContext } from "react";
import { Context } from "./Context";

function Login() {
  const { handleLogin } = useContext(Context);

  return (
    <div className="login__box">
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Enter your name"
          name="username"
        ></input>
        <button type="submit" className="btn ">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
