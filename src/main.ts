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
    const extrudedInput = document.getElementById("extruded") as HTMLInputElement;
    const extruded = parseFloat(extrudedInput.value);
    const stepsInput = document.getElementById("current-steps") as HTMLInputElement;
    const currentSteps = parseFloat(stepsInput.value);
    const newValue = calibrateExtruder(currentSteps, extruded);
    const extrudedResult = document.getElementById("extruder-result");
    const pResult = document.createElement('p');
    pResult.innerHTML = `Your new configuration must be <strong>${newValue} steps/mm<strong>.`;
    extrudedResult?.append(pResult);
    extrudedResult?.scrollIntoView();
  });
}
