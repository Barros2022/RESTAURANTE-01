document.querySelectorAll(".choices").forEach(container => {
  let options = [];

  if (container.dataset.type === "scale5") options = ["1","2","3","4","5"];
  if (container.dataset.type === "scale11") options = ["0","1","2","3","4","5","6","7","8","9","10"];
  if (container.dataset.type === "options") options = JSON.parse(container.dataset.options);

  options.forEach(opt => {
    const btn = document.createElement("div");
    btn.className = "choice";
    btn.textContent = opt;

    btn.onclick = () => {
      container.querySelectorAll(".choice").forEach(c => c.classList.remove("selected"));
      btn.classList.add("selected");
      container.dataset.value = opt;
    };
    container.appendChild(btn);
  });
});


document.querySelector("#feedback-form").onsubmit = async (e) => {
  e.preventDefault();

  const payload = {};
  document.querySelectorAll(".choices").forEach(c => {
    payload[c.dataset.name] = c.dataset.value || "";
  });
  payload.timestamp = new Date().toISOString();

  await fetch(window.API_URL, {
    method: "POST",
    body: JSON.stringify(payload)
  });

  document.querySelector("#form-section").classList.add("hidden");
  document.querySelector("#success-section").classList.remove("hidden");
};
