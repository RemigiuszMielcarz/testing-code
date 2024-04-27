const mieszkanie_form = document.querySelector("#wf-form-mieszkanie");
const mieszkanie_resultWrap = document.querySelector(
"#mieszkanie-result-component"
);
const mieszkanie_resultLoader = document.querySelector(
"#mieszkanie-result-loader"
);
const mieszkanie_resultText = document.querySelector("#mieszkanie-result-text");
const cta = document.querySelector("#cta");
const legal = document.querySelector("#text-legal");

// Add a submit event listener to the form
mieszkanie_form.addEventListener("submit", (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Show the div that will contain the response and scroll to it
    mieszkanie_form.style.display = "none";
    mieszkanie_resultWrap.style.display = "block";
    mieszkanie_resultLoader.style.display = "flex";
    mieszkanie_resultWrap.scrollIntoView({ behavior: "smooth" });

    // Get the values of the form fields
    const mieszkanie_miasto_id = document.getElementById(
    "mieszkanie-miasto-id"
    ).value;
    const mieszkanie_ulica_id = document.getElementById(
    "mieszkanie-ulica-id"
    ).value;
    const mieszkanie_metraz_id = document.getElementById(
    "mieszkanie-metraz-id"
    ).value;
    const mieszkanie_pokoje_id = document.getElementById(
    "mieszkanie-pokoje-id"
    ).value;
    const mieszkanie_pietro_id = document.getElementById(
    "mieszkanie-pietro-id"
    ).value;
    const mieszkanie_liczba_pieter_id = document.getElementById(
    "mieszkanie-liczba-pieter-id"
    ).value;
    const mieszkanie_rok_budowy_id = document.getElementById(
    "mieszkanie-rok-budowy-id"
    ).value;
    const mieszkanie_standard_id = document.getElementById(
    "mieszkanie-standard-id"
    ).value;
    const mieszkanie_postoj_id = document.getElementById(
    "mieszkanie-postoj-id"
    ).value;
    const mieszkanie_balkon_id = document.getElementById(
    "mieszkanie-balkon-id"
    ).value;
    const mieszkanie_piwnica_id = document.getElementById(
    "mieszkanie-piwnica-id"
    ).value;
    const mieszkanie_winda_id = document.getElementById(
    "mieszkanie-winda-id"
    ).value;

    // Create the prompt string using the form field values
    const prompt_mieszkanie = `Korzystając z dostarczonej bazy danych wyceń mieszkanie o podanych parametrach, a w odpowiedzi podaj samą kwotę, przy odpowiedzi do kwoty dodaj napis "zł" bez dodatkowego tekstu. Parametry mieszkania: Adres: ${mieszkanie_miasto_id}, ${mieszkanie_ulica_id}, Powierzchnia ${mieszkanie_metraz_id} metrów, liczba pokoi: ${mieszkanie_pokoje_id}, znajduje się na ${mieszkanie_pietro_id} piętrze, budynek ma ${mieszkanie_liczba_pieter_id} pięter. Rok budowy: ${mieszkanie_rok_budowy_id}, standard mieszkania: ${mieszkanie_standard_id}, miejsce postojowe: ${mieszkanie_postoj_id}, balkon: ${mieszkanie_balkon_id}, piwnica: ${mieszkanie_piwnica_id}, winda: ${mieszkanie_winda_id}`;

    // Make an API call to our Make cenario
    fetch("https://hook.eu2.make.com/q3u2ecfhwqoansibaxenwnvilut7jd9l", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
    prompt: prompt_mieszkanie,
    max_tokens: 64,
}),
})
    // Then get the API response object, covert it to text and display it
    .then((response) => response.text())
    .then((result) => {
    mieszkanie_resultText.value = result;
    mieszkanie_resultLoader.style.display = "none";
    cta.style.display = "flex";
    legal.style.display = "none";
});
});