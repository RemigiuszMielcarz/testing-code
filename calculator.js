function gatherFormDataAndCreatePrompt(form) {
    const formData = new FormData(form);
    const promptParts = [];
    let telephone = "";

    for (let [key, value] of formData) {
        if (key === "telefon") {
            telephone = value;
        } else {
            promptParts.push(`${key}: ${value}`);
        }
    }

    return {
        type: form.dataset.name,
        telephone: telephone,
        params: promptParts.join(', ')
    };
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

    const { type, telephone, params } = gatherFormDataAndCreatePrompt(form);

    fetch("https://hook.eu2.make.com/q3u2ecfhwqoansibaxenwnvilut7jd9l", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({type, telephone, params, max_tokens: 64}),
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
