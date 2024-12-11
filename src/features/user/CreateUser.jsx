import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { signUp } from "./user.thunks"; // Thunk responsável pelo registro
import { createUser } from "./userSlice";

function CreateUser() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!username || !email || !password) {
      toast.error("Preencha todos os campos");
      return;
    }

    try {
      const result = await dispatch(signUp({ email, password }));
      console.log(result);

      if (signUp.fulfilled.match(result)) {
        // Creating user on Redux
        dispatch(createUser(username));
        toast.success("Conta criada com sucesso!");
        navigate("/login");
      } else {
        // Error message
        toast.error(result.payload.slice(5));
      }
    } catch (error) {
      toast.error(`Erro inesperado: ${error}`);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      <h1 className="mb-6 text-3xl font-bold text-green-600 sm:mb-8 lg:text-4xl">
        Registro
      </h1>
      <form
        onSubmit={handleSubmit}
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
          type="button"
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
