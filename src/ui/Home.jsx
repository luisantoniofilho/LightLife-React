import { useNavigate } from "react-router-dom";
import foodBackground from "../assets/food-background.avif";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${foodBackground})`,
      }}
    >
      {/* Overlay escuro para melhorar a leitura do texto */}
      <div className="absolute inset-0 bg-black opacity-80"></div>

      {/* Conteúdo principal */}
      <div className="relative z-10 text-center text-white p-6">
        <h1 className="text-4xl font-bold mb-4">LightLife</h1>
        <p className="text-xl mb-6">
          Alcance seus objetivos com dietas personalizadas baseadas nos seus
          macronutrientes.
        </p>
        <p className="text-lg mb-6">
          Nosso site oferece as ferramentas para calcular sua necessidade
          nutricional e ajudá-lo a atingir suas metas de forma prática e
          eficiente.
        </p>
        <p className="text-lg mb-6">
          O cálculo dos macronutrientes é ideal para quem treina e busca
          otimizar sua performance e resultados.
        </p>
        <button
          className="bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700 transition duration-300"
          onClick={() => navigate("/register")}
        >
          Registrar-se
        </button>
      </div>
    </div>
  );
}

export default Home;
