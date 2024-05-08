function calibrateExtruder(stepsmm: number, extruded: number): number {
  const actualLengthExtruded = 120 - extruded;
  const stepsTaken = stepsmm * 100;
  const result = stepsTaken/actualLengthExtruded;
  return Math.round(result * 100) / 100
}

window.onload = async function () {
  const extruderCalcForm = document.getElementById("extruder-calc");
  extruderCalcForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const errorHelper = document.getElementById("invalid-helper");
    errorHelper!.innerHTML = "";
    const extrudedInput = document.getElementById("extruded") as HTMLInputElement;
    const extruded = parseFloat(extrudedInput.value);
    if (isNaN(extruded)) {
      errorHelper!.innerHTML = "Extruded length must be a number"
      return;
    }
    const stepsInput = document.getElementById("current-steps") as HTMLInputElement;
    const currentSteps = parseFloat(stepsInput.value);
    if (isNaN(currentSteps) ) {
      errorHelper!.innerHTML = "Current steps/mm extruder configuration must be a number"
      return;
    }
    const newValue = calibrateExtruder(currentSteps, extruded);
    const extrudedResult = document.getElementById("extruder-result");
    extrudedResult!.innerHTML = "";
    const pResult = document.createElement('p');
    pResult.innerHTML = `Change your E steps/mm value to <strong>${newValue} steps/mm<strong>.`;
    extrudedResult?.append(pResult);
    extrudedResult?.scrollIntoView();
    extrudedInput!.value = "";
    stepsInput!.value = "";
  });
}
