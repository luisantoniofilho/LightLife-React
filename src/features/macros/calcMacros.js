export function calcMacros(TEE, weight, goal) {
  /*    Guide
    1g of carb = 4kcal
    1g of protein = 4kcal
    1g of fat = 9kcal
  */

  let kcals, carbs, protein, fat;

  // Fat = 1g per kg in all goals
  fat = weight;

  // Gain muscle
  if (goal === "gain") {
    //400kcal superavit
    kcals = TEE + 400;

    // 2g per kg
    protein = weight * 2;
  }

  // Lose fat
  if (goal === "lose") {
    // Deficit based on the current weight
    kcals = TEE - (weight < 100 ? 1000 : 1500);

    // 2.2g per kg
    protein = weight * 2.2;
  }

  // Mantain weight
  if (goal === "mantain") {
    // Mantain weight
    kcals = TEE;

    // 2g per kg
    protein = weight * 2;
  }

  const totalKcalFatAndProtein = fat * 9 + protein * 4;

  // remain calories
  carbs = Math.round((kcals - totalKcalFatAndProtein) / 4);

  return { carbs, protein, fat };
}
