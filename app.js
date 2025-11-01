let dados = {
    atendimento: null,
    espera: null,
    limpeza: null,
    experiencia: null,
    retorno: null,
    nps: null
};

// captura de cliques
document.querySelectorAll(".rating, .experience, .return, .nps-scale").forEach(group => {
    group.querySelectorAll("button").forEach(button => {

        button.addEventListener("click", () => {

            group.querySelectorAll("button").forEach(b => b.classList.remove("selected"));
            button.classList.add("selected");

            const field = group.getAttribute("data-field");
            dados[field] = button.innerText;
        });
    });
});

// envio do formulário
document.getElementById("feedbackForm").addEventListener("submit", async (event) => {
    event.preventDefault(); // evita refresh

    try {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        });

        alert("✅ Avaliação enviada!");
        document.getElementById("feedbackForm").reset();

    } catch (err) {
        alert("❌ Erro ao enviar os dados.");
    }
});
