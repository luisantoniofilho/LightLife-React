import { useNavigate } from "react-router-dom";
import foodBackground from "../assets/food-background.avif";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="relative flex min-h-screen items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${foodBackground})`,
      }}
    >
      {/* Dark overlay to improve read quality */}
      <div className="absolute inset-0 bg-black opacity-80"></div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col p-6 text-center text-white lg:px-60">
        <h1 className="mb-10 text-4xl font-bold md:mb-20 md:text-6xl">
          LightLife
        </h1>
        <p className="mb-6 text-xl md:text-2xl">
          Alcance seus objetivos com dietas personalizadas baseadas nos seus
          macronutrientes.
        </p>
        <p className="mb-6 text-lg md:text-2xl">
          Nosso site oferece as ferramentas para calcular sua necessidade
          nutricional e ajudá-lo a atingir suas metas de forma prática e
          eficiente.
        </p>
        <p className="mb-8 text-lg md:text-2xl">
          O cálculo dos macronutrientes é ideal para quem treina e busca
          otimizar sua performance e resultados.
        </p>

        <button
          className="mx-36 mb-4 rounded-full bg-green-600 px-4 py-3 text-center text-white transition duration-300 hover:bg-green-700 md:text-2xl"
          onClick={() => navigate("/register")}
        >
          Registrar-se
        </button>
        <button
          className="mx-36 rounded-full bg-green-600 px-4 py-3 text-center text-white transition duration-300 hover:bg-green-700 md:text-2xl"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Home;
