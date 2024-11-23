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
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      <h1 className="mb-6 text-3xl font-bold text-green-600 sm:mb-8 lg:text-4xl">
        Registro
      </h1>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex w-full flex-col items-center rounded-lg bg-white p-6 shadow-md sm:p-10 md:px-20 lg:px-60"
      >
        <input
          className="mb-3 w-full rounded-md border border-green-600 p-2 focus:outline-none focus:ring-2 focus:ring-green-500 sm:p-3"
          type="text"
          placeholder="Nome"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="mb-3 w-full rounded-md border border-green-600 p-2 focus:outline-none focus:ring-2 focus:ring-green-500 sm:p-3"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="mb-3 w-full rounded-md border border-green-600 p-2 focus:outline-none focus:ring-2 focus:ring-green-500 sm:p-3"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full rounded-md bg-green-600 py-2 text-white transition duration-300 hover:bg-green-700 sm:py-3 sm:text-xl"
        >
          Registrar-se
        </button>

        <button
          className="mt-4 text-green-600 hover:underline sm:text-xl"
          onClick={() => navigate("/login")}
        >
          Login?
        </button>
      </form>
    </div>
  );
}

export default CreateUser;
