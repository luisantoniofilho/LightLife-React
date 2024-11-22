import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "./userSlice";
import { useDispatch } from "react-redux";

function CreateUser() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();

    if (!username || !email || !password) return;
    dispatch(createUser({ username, email, password }));
    navigate("/login");
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md w-full"
      >
        <h1 className="text-2xl font-bold text-green-600 mb-4">Registro</h1>
        <input
          className="w-full p-2 mb-3 border border-green-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          type="text"
          placeholder="Nome"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
          Registrar-se
        </button>
        <button
          className="text-green-600 mt-4 hover:underline"
          onClick={() => navigate("/login")}
        >
          Login?
        </button>
      </form>
    </div>
  );
}

export default CreateUser;
