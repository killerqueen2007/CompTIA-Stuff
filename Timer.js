javascript:
const timerBox = document.createElement("div");
Object.assign(timerBox.style, {
  position: "fixed",
  bottom: "10px",
  right: "10px",
  background: "#222",
  color: "#fff",
  padding: "8px 12px",
  borderRadius: "6px",
  fontFamily: "sans-serif",
  fontSize: "16px",
  zIndex: "9999"
});
timerBox.textContent = "Timer: 1:20";
document.body.appendChild(timerBox);

let countdown;

function startCountdown() {
  let timeLeft = 80;
  clearInterval(countdown);

  function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerBox.textContent = `Timer: ${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  updateDisplay();
  countdown = setInterval(() => {
    timeLeft--;
    updateDisplay();
    if (timeLeft <= 0) {
      clearInterval(countdown);
      timerBox.textContent = "Time's up!";
    }
  }, 1000);
}

startCountdown();

(function() {
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  function onUrlChange() {
    startCountdown();
  }

  history.pushState = function(...args) {
    originalPushState.apply(this, args);
    onUrlChange();
  };

  history.replaceState = function(...args) {
    originalReplaceState.apply(this, args);
    onUrlChange();
  };

  window.addEventListener('popstate', onUrlChange);
})();

