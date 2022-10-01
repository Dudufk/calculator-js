const main = document.querySelector("main");
const root = document.querySelector(":root");
const input = document.querySelector("#input");
const resultInput = document.querySelector("#result");
const switchThemeBtn = document.getElementById("switchTheme");

const allowedKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "(", ")", ".", "+", "-", "*", "/", "%", " "];

// Adiciona os numeros ao input pelos botoes na pagina
document.querySelectorAll(".charkey").forEach((charKeyBtn) => {
  charKeyBtn.addEventListener("click", () => {
    const value = charKeyBtn.dataset.value;
    input.value += value;
  });
});

// Adiciona os numeros ao input pelo click no teclado
window.addEventListener("keydown", (ev) => {
  ev.preventDefault();
  if (allowedKeys.includes(ev.key)) {
    input.value += ev.key;
    return;
  }
  if (ev.key === "Backspace") {
    input.value = input.value.slice(0, -1);
  }
  if (ev.key === "Enter") {
    calculate();
  }
});

// Limpa o input
document.querySelector("#clear").addEventListener("click", () => {
  input.value = "";
  input.focus();
});

// Calcula o input quando pressionado o Igual ( = )
document.querySelector("#equal").addEventListener("click", calculate);

function calculate() {
  resultInput.value = "ERROR";
  resultInput.classList.add("error");
  const result = eval(input.value);
  resultInput.value = result;
  resultInput.classList.remove("error");
  input.value = "";
}

// Copia o resultado para a area de transferencia
document.querySelector("#copyToClipboard").addEventListener("click", (ev) => {
  const button = ev.currentTarget;
  navigator.clipboard.writeText(resultInput.value);
  button.innerText = "Copied";
  button.classList.add("success");
  setTimeout(() => {
    button.innerText = "Copy";
    button.classList.remove("success");
  }, 2000);
});

// Theme Switcher
const prefersColorScheme = window.matchMedia("(prefers-color-scheme: dark)");

// Altera o tema
function changeTheme(ev) {
  if (ev.matches) {
    root.style.setProperty("--bg-color", "#212529");
    root.style.setProperty("--border-color", "#666");
    root.style.setProperty("--font-color", "#f1f5f9");
    root.style.setProperty("--primary-color", "#619ae6");
    main.dataset.theme = "dark";
    switchThemeBtn.removeAttribute("checked");
  } else {
    root.style.setProperty("--bg-color", "#f1f5f9");
    root.style.setProperty("--border-color", "#aaa");
    root.style.setProperty("--font-color", "#212529");
    root.style.setProperty("--primary-color", "#1371eb");
    main.dataset.theme = "light";
    switchThemeBtn.setAttribute("checked", "");
  }
}

// Escuta a mudança de tema no sistema
prefersColorScheme.addEventListener("change", changeTheme);

// Altera o tema conforme o tema do usuário
changeTheme(prefersColorScheme);

// Altera o tema pelo clique no botão
switchThemeBtn.addEventListener("click", () => {
  if (main.dataset.theme === "dark") {
    root.style.setProperty("--bg-color", "#f1f5f9");
    root.style.setProperty("--border-color", "#aaa");
    root.style.setProperty("--font-color", "#212529");
    root.style.setProperty("--primary-color", "#1371eb");
    main.dataset.theme = "light";
  } else {
    root.style.setProperty("--bg-color", "#212529");
    root.style.setProperty("--border-color", "#666");
    root.style.setProperty("--font-color", "#f1f5f9");
    root.style.setProperty("--primary-color", "#619ae6");
    main.dataset.theme = "dark";
  }
});
