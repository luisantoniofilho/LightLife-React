import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "./userSlice";

function LoginUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLogged = useSelector((state) => state.user.isLogged);

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) return;

    dispatch(loginUser({ email, password }));

    navigate("/form");
  }

  return !isLogged ? (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center bg-white p-8 rounded-lg shadow-md w-full min-w-1"
      >
        <h1 className="text-2xl font-bold text-green-600 mb-4">Login</h1>
        <input
          className="w-full p-2 mb-3 border border-green-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full p-2 mb-3 border border-green-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300"
        >
          Login
        </button>
        <button
          className="text-green-600 mt-4 hover:underline"
          onClick={() => navigate("/register")}
        >
          Registrar-se?
        </button>
      </form>
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white p-8">
      <h1 className="text-2xl font-bold text-green-600 mb-4">
        Você está logado!
      </h1>
      <button
        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300 mb-4"
        onClick={() => navigate("/form")}
      >
        Ir para formulário
      </button>
      <button
        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300"
        onClick={() => navigate("/macros")}
      >
        Ir para os macronutrientes
      </button>
    </div>
  );
}

export default LoginUser;
