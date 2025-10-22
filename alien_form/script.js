const form = document.getElementById('alien-form');
const planetName = document.getElementById('planet-name');
const antennaCount = document.getElementById('antenna-count');
const alienID = document.getElementById('alien-id');
const humanPhrase = document.getElementById('human-phrase');
const landingDate = document.getElementById('landing-date');
const successMessage = document.getElementById('success-message');

const errors = {
    planetName: document.getElementById("error-planet-name"),
    antennaCount: document.getElementById("error-antenna-count"),
    alienID: document.getElementById("error-alien-id"),
    humanPhrase: document.getElementById("error-human-phrase"),
    landingDate: document.getElementById("error-landing-date")
};

form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearMessages();

    const data = {
        planetName: planetName.value.trim(),
        antennaCount: Number(antennaCount.value),
        alienID: alienID.value.trim(),
        humanPhrase: humanPhrase.value.trim(),
        landingDate: landingDate.value
    };

    const validations = {
    planetName: validatePlanetName(data.planetName),
    antennaCount: validateAntennaCount(data.antennaCount),
    alienID: validateAlienID(data.alienID),
    humanPhrase: validateHumanPhrase(data.humanPhrase),
    landingDate: validateLandingDate(data.landingDate)
    };

    let isValid = true;

    for (let field in validations) {
    if (!validations[field]) {
        showError(field);
        isValid = false;
    }
    }

    if (isValid) {
    successMessage.textContent = "✅ Registration successfully!";
    form.reset(); // Clear form fields
    }
});

function clearMessages() {
    for (let key in errors) {
    errors[key].textContent = '';
    }
    successMessage.textContent = '';
}

function showError(field) {
    const messages = {
    planetName: "Planet name must contain at least one vowel and one digit.",
    antennaCount: "Antenna count must be an even number.",
    alienID: "Alien ID must match format like ZOR-XY_9999@UFO.",
    humanPhrase: "Phrase must include at least one emoji, punctuation, or symbol.",
    landingDate: "Landing date cannot be in the past."
    };

    errors[field].textContent = messages[field];
}

function validatePlanetName(name) {
    return /[^[aeiouAEIOU]]/.test(name) && /\d/.test(name);
}

function validateAntennaCount(count) {
    return Number.isInteger(count) && count % 2 === 0;
}

function validateAlienID(id) {
    const pattern = /^[A-Z]{3}-[A-Z]{2}_[0-9]{4}@UFO$/;
    return pattern.test(id);
}

function validateHumanPhrase(phrase) {
    return /[\p{Emoji_Presentation}\p{P}\p{S}]/u.test(phrase);
}

function validateLandingDate(dateStr) {
    const inputDate = new Date(dateStr);
    const today = new Date();
    return inputDate >= today;
}