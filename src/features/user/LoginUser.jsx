import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logIn } from "./user.thunks";
import toast from "react-hot-toast";
import { loginUser } from "./userSlice";

function LoginUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLogged = useSelector((state) => state.user.isLogged);

  async function onHandleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Preencha todos os campos");
      return;
    }

    try {
      const result = await dispatch(logIn({ email, password }));

      if (logIn.fulfilled.match(result)) {
        dispatch(loginUser());
        toast.success("Login realizado com sucesso!");
        navigate("/form");
      } else {
        toast.error(result.payload.slice(5));
      }
    } catch (error) {
      toast.error(`Erro inesperado: ${error}`);
    }
  }

  return !isLogged ? (
    // If IS NOT LOGGED
    <div className="flex min-h-screen items-center justify-center bg-white">
      <form
        onSubmit={onHandleSubmit}
        className="flex w-full flex-col items-center rounded-lg bg-white p-6 shadow-md sm:p-10 md:px-20 lg:px-60"
      >
        <h1 className="mb-6 text-3xl font-bold text-green-600 sm:mb-8 lg:text-4xl">
          Login
        </h1>
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
          Login
        </button>
        <button
          className="mt-4 text-green-600 hover:underline sm:text-xl"
          onClick={() => navigate("/register")}
        >
          Registrar-se?
        </button>
      </form>
    </div>
  ) : (
    // If IS LOGGED
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-8 lg:px-32">
      <h1 className="mb-8 text-4xl font-bold text-green-600 md:mb-20 md:text-5xl">
        Você já está logado!
      </h1>
      <button
        className="mb-4 w-full rounded-md bg-green-600 py-2 text-xl text-white transition duration-300 hover:bg-green-700 md:py-4 md:text-3xl"
        onClick={() => navigate("/form")}
      >
        Ir para o formulário
      </button>
      <button
        className="mb-4 w-full rounded-md bg-green-600 py-2 text-xl text-white transition duration-300 hover:bg-green-700 md:py-4 md:text-3xl"
        onClick={() => navigate("/macros")}
      >
        Ir para os macronutrientes
      </button>
      <button
        className="w-full rounded-md bg-green-600 py-2 text-xl text-white transition duration-300 hover:bg-green-700 md:py-4 md:text-3xl"
        onClick={() => navigate("/meals")}
      >
        Ir para as refeições sugeridas
      </button>
    </div>
  );
}

export default LoginUser;
