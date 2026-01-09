const stepsInput = document.getElementById("steps");
const workoutInput = document.getElementById("workout");
const caloriesInput = document.getElementById("calories");

const totalStepsEl = document.getElementById("totalSteps");
const totalCaloriesEl = document.getElementById("totalCalories");
const stepsBar = document.getElementById("stepsBar");
const caloriesBar = document.getElementById("caloriesBar");
const weeklyList = document.getElementById("weeklyList");

const STEP_GOAL = 10000;
const CALORIE_GOAL = 500;

function getData() {
  return JSON.parse(localStorage.getItem("fitnessData")) || [];
}

function saveData(data) {
  localStorage.setItem("fitnessData", JSON.stringify(data));
}

function addEntry() {
  const steps = Number(stepsInput.value);
  const workout = workoutInput.value;
  const calories = Number(caloriesInput.value);

  if (!steps && !calories && !workout) return;

  const entry = {
    date: new Date().toLocaleDateString(),
    steps,
    workout,
    calories
  };

  const data = getData();
  data.push(entry);
  saveData(data);

  stepsInput.value = "";
  workoutInput.value = "";
  caloriesInput.value = "";

  updateDashboard();
}

function updateDashboard() {
  const data = getData();
  const today = new Date().toLocaleDateString();

  const todayData = data.filter(d => d.date === today);

  const totalSteps = todayData.reduce((sum, d) => sum + d.steps, 0);
  const totalCalories = todayData.reduce((sum, d) => sum + d.calories, 0);

  totalStepsEl.textContent = totalSteps;
  totalCaloriesEl.textContent = totalCalories;

  stepsBar.style.width = Math.min((totalSteps / STEP_GOAL) * 100, 100) + "%";
  caloriesBar.style.width = Math.min((totalCalories / CALORIE_GOAL) * 100, 100) + "%";

  showWeeklySummary(data);
}

function showWeeklySummary(data) {
  weeklyList.innerHTML = "";
  const last7Days = data.slice(-7);

  last7Days.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = `${entry.date} - ${entry.workout || "Activity"} | ${entry.steps} steps | ${entry.calories} cal`;
    weeklyList.appendChild(li);
  });
}

// Load data on startup
updateDashboard();
