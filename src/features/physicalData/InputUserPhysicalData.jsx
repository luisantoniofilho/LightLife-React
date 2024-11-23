import { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePhysicalData } from "../user/userSlice";
import { useNavigate } from "react-router-dom";

function InputUserPhysicalData() {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [goal, setGoal] = useState("");
  const [physicalActivityLevel, setPhysicalActivityLevel] = useState(null);
  const [gender, setGender] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function clearFields() {
    setAge("");
    setHeight("");
    setWeight("");
    setGoal("");
    setPhysicalActivityLevel(null);
    setGender(""); // Reset gender
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !age ||
      !weight ||
      !height ||
      !goal ||
      physicalActivityLevel === null ||
      !gender
    )
      return;

    dispatch(
      updatePhysicalData({
        age,
        weight,
        height,
        goal,
        physicalActivityLevel,
        gender,
      }),
    );

    clearFields();
    navigate("/macros");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col items-center rounded-lg bg-white p-6 shadow-md lg:px-44"
      >
        <h1 className="mb-4 text-2xl font-bold text-green-600 sm:text-3xl lg:text-4xl">
          Suas informações corporais
        </h1>

        {/* Age input */}
        <div className="mb-4 flex w-full flex-col items-start">
          <label className="mb-2 text-xl font-semibold text-green-600 md:text-2xl">
            Idade:
          </label>
          <input
            className="mb-3 w-full rounded-md border border-green-600 p-2 focus:outline-none focus:ring-2 focus:ring-green-500 md:text-xl"
            type="number"
            placeholder="Digite sua idade"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
          />
        </div>

        {/* Weight input */}
        <div className="mb-4 flex w-full flex-col items-start">
          <label className="mb-2 text-xl font-semibold text-green-600 md:text-2xl">
            Peso (kg):
          </label>
          <input
            className="mb-3 w-full rounded-md border border-green-600 p-2 focus:outline-none focus:ring-2 focus:ring-green-500 md:text-xl"
            type="number"
            placeholder="Digite seu peso"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
          />
        </div>

        {/* Height input */}
        <div className="mb-4 flex w-full flex-col items-start">
          <label className="mb-2 text-xl font-semibold text-green-600 md:text-2xl">
            Altura (cm):
          </label>
          <input
            className="mb-3 w-full rounded-md border border-green-600 p-2 focus:outline-none focus:ring-2 focus:ring-green-500 md:text-xl"
            type="number"
            placeholder="Digite sua altura"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
          />
        </div>

        {/* Gender section */}
        <div className="mb-4 flex w-full flex-col items-start">
          <label className="mb-2 text-xl font-semibold text-green-600 md:text-2xl">
            Gênero:
          </label>
          <div className="flex space-x-4">
            <div className="flex items-center md:text-xl">
              <input
                className="mr-2"
                type="radio"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
              />
              <label className="text-green-600">Masculino</label>
            </div>

            <div className="flex items-center md:text-xl">
              <input
                className="mr-2"
                type="radio"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
              />
              <label className="text-green-600">Feminino</label>
            </div>
          </div>
        </div>

        {/* Goal section */}
        <div className="mb-4 flex w-full flex-col items-start">
          <label className="mb-2 text-xl font-semibold text-green-600 md:text-2xl">
            Objetivo:
          </label>
          <div className="flex flex-col space-y-2 md:text-xl">
            <div className="flex items-center">
              <input
                className="mr-2"
                type="radio"
                name="goal"
                value="gain"
                checked={goal === "gain"}
                onChange={(e) => setGoal(e.target.value)}
              />
              <label className="text-green-600">Ganhar massa muscular</label>
            </div>

            <div className="flex items-center">
              <input
                className="mr-2"
                type="radio"
                name="goal"
                value="lose"
                checked={goal === "lose"}
                onChange={(e) => setGoal(e.target.value)}
              />
              <label className="text-green-600">Perder gordura</label>
            </div>

            <div className="flex items-center">
              <input
                className="mr-2"
                type="radio"
                name="goal"
                value="maintain"
                checked={goal === "maintain"}
                onChange={(e) => setGoal(e.target.value)}
              />
              <label className="text-green-600">Manter peso</label>
            </div>
          </div>
        </div>

        {/* Physical activity section */}
        <div className="mb-4 flex w-full flex-col items-start">
          <label className="mb-2 text-xl font-semibold text-green-600 md:text-2xl">
            Nível de Atividade Física (sem contar o treino):
          </label>

          <div className="flex flex-col space-y-2 md:text-xl">
            <div className="flex items-center">
              <input
                className="mr-2"
                type="radio"
                name="activity"
                value="1.6"
                checked={physicalActivityLevel === 1.6}
                onChange={(e) =>
                  setPhysicalActivityLevel(Number(e.target.value))
                }
              />
              <label className="text-green-600">Sedentário</label>
            </div>

            <div className="flex items-center">
              <input
                className="mr-2"
                type="radio"
                name="activity"
                value="1.7"
                checked={physicalActivityLevel === 1.7}
                onChange={(e) =>
                  setPhysicalActivityLevel(Number(e.target.value))
                }
              />
              <label className="text-green-600">Atividade leve</label>
            </div>

            <div className="flex items-center">
              <input
                className="mr-2"
                type="radio"
                name="activity"
                value="1.8"
                checked={physicalActivityLevel === 1.8}
                onChange={(e) =>
                  setPhysicalActivityLevel(Number(e.target.value))
                }
              />
              <label className="text-green-600">Atividade moderada</label>
            </div>

            <div className="flex items-center">
              <input
                className="mr-2"
                type="radio"
                name="activity"
                value="1.9"
                checked={physicalActivityLevel === 1.9}
                onChange={(e) =>
                  setPhysicalActivityLevel(Number(e.target.value))
                }
              />
              <label className="text-green-600">Atividade intensa</label>
            </div>
          </div>
        </div>

        {/* Information about steps */}
        <div className="mb-6 flex w-full flex-col items-start">
          <label className="mb-2 font-semibold text-blue-600 md:text-xl">
            Informações para ajudar a identificar o nível de atividade física:
          </label>
          <p className="text-blue-500">- Sedentário: até 5k passos por dia</p>
          <p className="text-blue-500">
            - Atividade leve: entre 5k-7k passos por dia
          </p>
          <p className="text-blue-500">
            - Atividade moderada: entre 7k-10k passos por dia
          </p>
          <p className="text-blue-500">
            - Atividade intensa: mais de 10k passos por dia
          </p>
        </div>

        {/* Send button */}
        <button
          type="submit"
          className="w-full rounded-md bg-green-600 py-2 text-white transition duration-300 hover:bg-green-700 md:text-xl"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}

export default InputUserPhysicalData;
