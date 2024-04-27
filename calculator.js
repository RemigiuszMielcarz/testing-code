function gatherFormDataAndCreatePrompt(form) {
    const formData = new FormData(form);
    const promptParts = [];

    for (let [key, value] of formData) {
        promptParts.push(`${key}: ${value}`);
    }

    return `Korzystając z dostarczonej bazy danych wyceń ${form.dataset.name} o podanych parametrach, a w odpowiedzi podaj samą kwotę, przy odpowiedzi do kwoty dodaj napis "zł" bez dodatkowego tekstu. Na podstawie podanych parametrów ${form.dataset.name}: ${promptParts.join(', ')}`;
}

function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const resultComponent = form.closest(".tab_pane").querySelector(".form-result");
    const resultForm = resultComponent.querySelector(".form_result");
    const loader = resultForm.querySelector("div");
    const resultText = resultForm.querySelector(".form_input-result");
    const cta = document.querySelector("#cta");
    const legal = document.querySelector("#text-legal");

    resultComponent.style.display = "block";
    loader.style.display = "flex";
    form.style.display = "none";

    resultComponent.scrollIntoView({behavior: "smooth"});

    const prompt = gatherFormDataAndCreatePrompt(form);

    fetch("https://hook.eu2.make.com/q3u2ecfhwqoansibaxenwnvilut7jd9l", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({prompt, max_tokens: 64}),
    })
        .then(response => response.text())
        .then(result => {
            resultText.textContent = result;
            loader.style.display = "none";
            cta.style.display = "flex";
            legal.style.display = "none";
        });
}

document.querySelectorAll('.upper-form').forEach(function (form) {
    form.addEventListener('submit', handleFormSubmit);
});
