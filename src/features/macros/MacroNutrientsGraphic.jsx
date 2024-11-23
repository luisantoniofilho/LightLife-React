import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { calcMacros } from "./calcMacros";
import { calcMenMetabolicBasalRate } from "./calcMetabolicBasalRate";
import {
  updateRestDayMacros,
  updateTrainingDayMacros,
} from "../user/userSlice";

function MacroNutrientsGraphic() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get user data from Redux store
  const {
    physicalData: { age, weight, height },
    physicalActivityLevel,
    gender,
    goal,
  } = useSelector((state) => ({
    physicalData: state.user.physicalData,
    physicalActivityLevel: state.user.physicalActivityLevel,
    gender: state.user.gender,
    goal: state.user.goal,
  }));

  // Calculate Basal Metabolic Rate (MBR)
  const MBR = calcMenMetabolicBasalRate(weight, height, age, gender);

  /////////////////////
  // MACROS FOR TRAINING DAYS
  /////////////////////

  // Calculate Total Energy Expenditure (TEE)
  const TEE = MBR * physicalActivityLevel;

  // Calculate macros
  const trainingDaysMacros = calcMacros(TEE, weight, goal);

  // Total grams of macros
  const trainingDaysTotalGrams =
    trainingDaysMacros.carbs +
    trainingDaysMacros.protein +
    trainingDaysMacros.fat;

  dispatch(
    updateTrainingDayMacros({
      carbs: trainingDaysMacros.carbs,
      protein: trainingDaysMacros.protein,
      fat: trainingDaysMacros.fat,
    }),
  );

  /////////////////////
  // MACROS FOR REST DAYS
  /////////////////////

  // Calculate TEE for rest days (fixed activity factor of 1.4)
  const restDayTEE = MBR * 1.4;
  // Calculate rest day macros based on the same goal
  const restDayMacros = calcMacros(restDayTEE, weight, goal);
  // Total grams of macros
  const restDaysTotalGrams =
    restDayMacros.protein + restDayMacros.carbs + restDayMacros.fat;

  dispatch(
    updateRestDayMacros({
      carbs: restDayMacros.carbs,
      protein: restDayMacros.protein,
      fat: restDayMacros.fat,
    }),
  );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="my-6 text-3xl font-bold text-green-600 md:my-8 md:text-4xl">
        Seus Macronutrientes
      </h1>

      {/* Macronutrients display for TRAINING DAYS */}
      <div className="w-4/5 min-w-40 rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-gray-700">
          Dias de treino
        </h2>

        {/* Carbohydrates */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-blue-600">Carboidratos</h2>
          <div className="h-4 w-full rounded-full bg-gray-200">
            <div
              className="h-4 rounded-full bg-blue-500"
              style={{
                width: `${
                  (trainingDaysMacros.carbs / trainingDaysTotalGrams) * 100
                }%`,
              }}
            ></div>
          </div>
          <p className="mt-1 text-sm text-gray-600 md:text-base">
            {trainingDaysMacros.carbs}g
          </p>
        </div>

        {/* Protein */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-green-600">Proteínas</h2>
          <div className="h-4 w-full rounded-full bg-gray-200">
            <div
              className="h-4 rounded-full bg-green-500"
              style={{
                width: `${
                  (trainingDaysMacros.protein / trainingDaysTotalGrams) * 100
                }%`,
              }}
            ></div>
          </div>
          <p className="mt-1 text-sm text-gray-600 md:text-base">
            {trainingDaysMacros.protein}g
          </p>
        </div>

        {/* Fats */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-yellow-600">Gorduras</h2>
          <div className="h-4 w-full rounded-full bg-gray-200">
            <div
              className="h-4 rounded-full bg-yellow-500"
              style={{
                width: `${
                  (trainingDaysMacros.fat / trainingDaysTotalGrams) * 100
                }%`,
              }}
            ></div>
          </div>
          <p className="mt-1 text-sm text-gray-600 md:text-base">
            {trainingDaysMacros.fat}g
          </p>
        </div>

        {/* Total calories display */}
        <div className="mt-6 flex items-center justify-between border-t pt-4">
          <span className="text-xl font-bold text-green-600">
            Total de Calorias:
          </span>
          <span className="text-xl font-bold">
            {trainingDaysMacros.protein * 4 +
              trainingDaysMacros.carbs * 4 +
              trainingDaysMacros.fat * 9}{" "}
            kcal
          </span>
        </div>
      </div>

      {/* Macronutrients display for REST DAYS */}
      <div className="mt-6 w-4/5 min-w-40 rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-gray-700">
          Dias de descanso
        </h2>

        {/* Carbohydrates */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-blue-600">Carboidratos</h3>
          <div className="h-4 w-full rounded-full bg-gray-200">
            <div
              className="h-4 rounded-full bg-blue-500"
              style={{
                width: `${(restDayMacros.carbs / restDaysTotalGrams) * 100}%`,
              }}
            ></div>
          </div>
          <p className="mt-1 text-sm text-gray-600 md:text-base">
            {restDayMacros.carbs}g
          </p>
        </div>

        {/* Protein */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-green-600">Proteínas</h3>
          <div className="h-4 w-full rounded-full bg-gray-200">
            <div
              className="h-4 rounded-full bg-green-500"
              style={{
                width: `${(restDayMacros.protein / restDaysTotalGrams) * 100}%`,
              }}
            ></div>
          </div>
          <p className="mt-1 text-sm text-gray-600 md:text-base">
            {restDayMacros.protein}g
          </p>
        </div>

        {/* Fats */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-yellow-600">Gorduras</h3>
          <div className="h-4 w-full rounded-full bg-gray-200">
            <div
              className="h-4 rounded-full bg-yellow-500"
              style={{
                width: `${(restDayMacros.fat / restDaysTotalGrams) * 100}%`,
              }}
            ></div>
          </div>
          <p className="mt-1 text-sm text-gray-600 md:text-base">
            {restDayMacros.fat}g
          </p>
        </div>

        {/* Total calories display for rest day */}
        <div className="mt-6 flex items-center justify-between border-t pt-4">
          <span className="text-xl font-bold text-green-600">
            Total de Calorias:
          </span>
          <span className="text-xl font-bold">
            {restDayMacros.protein * 4 +
              restDayMacros.carbs * 4 +
              restDayMacros.fat * 9}
            kcal
          </span>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-2">
        <h3 className="my-2 text-center md:text-lg">Dicas</h3>
        <p className="text-center text-sm text-gray-600 md:text-base">
          - Realizar pelo menos 30 minutos de exercícios aeróbicos nos dias de
          descanso.
        </p>
        {/* Tip about protein distribution and cardio recommendation */}
        <p className="mb-2 text-center text-sm text-gray-600 md:text-base">
          - Recomendavel distribuir os macronutrientes em pelo menos 4 refeições
          ao longo do dia.
        </p>
      </div>

      {/* Button to register new data */}
      <button
        className="my-2 rounded-full bg-green-600 px-6 py-2 text-white transition duration-300 hover:bg-green-700 md:text-xl"
        onClick={() => navigate("/form")}
      >
        Registrar Novos Dados
      </button>

      {/* Button to see recommendded meals */}
      <button
        className="mb-6 mt-2 rounded-full bg-green-600 px-6 py-2 text-white transition duration-300 hover:bg-green-700 md:text-xl"
        onClick={() =>
          navigate("/meals", {
            state: { trainingDaysMacros, restDayMacros }, // Passing the macros
          })
        }
      >
        Ver refeições sugeridas
      </button>
    </div>
  );
}

export default MacroNutrientsGraphic;
