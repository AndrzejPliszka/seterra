let currentCountry = "";
let errors = 0;
let guessedCountries = 0;
let totalErrors = 0;
let intervalId;
let timerInterval;
let gameEnded = false;
function checkIfCountryIsCorrect(clickedElement){
    if(gameEnded) return;
    if(!allObjectIdentification.includes(clickedElement.id)) return;
    if(clickedElement.id === currentCountry){
        switch(errors){
            case 0:
                clickedElement.className.baseVal = "correct";
                guessedCountries += 1;
                break;
            case 1:
                clickedElement.className.baseVal = "wrong";
                guessedCountries += 1;
                break;
            case 2:
                clickedElement.className.baseVal = "veryWrong";
                guessedCountries += 1;
                break;
            default:
                clickedElement.className.baseVal = "extremelyWrong";
                guessedCountries += 1;
                break;
        }
        clearInterval(intervalId);
        errors = 0;
        allObjectIdentification.splice(allObjectIdentification.indexOf(clickedElement.id), 1);
        makeNewCountryToGuess();
        if(allObjectIdentification.length === 0){
            gameEnded = true;
            clearInterval(timerInterval);
            document.getElementById("currentCountryToGuess").innerHTML = "You won!!!";
            document.getElementById("congratsMessage").style.display = "block";
        }
    } else{
        if(errors === 2){
            flashWrongCountry()
        }
        totalErrors++;
        errors++;
    }
    updateGameLabel();
}

function setupTimer(){
    let minutes = 0;
    let seconds = 0;
    timerInterval = setInterval(() => {
        seconds += 1;
        if (seconds > 59) {
            seconds = 0;
            minutes += 1;
        }
        document.getElementById("timer").innerHTML = `${minutes}:${seconds}`;
    }, 1000)
}

function flashWrongCountry(){
    const element = document.getElementById(currentCountry);
    let isOriginalColor = true;
    intervalId = setInterval(() => {
        if (isOriginalColor) {
            element.classList.value = "";
            element.classList.add("extremelyWrong");
        } else {
            element.classList.value = "";
            element.classList.add("notGuessed");
        }
        isOriginalColor = !isOriginalColor;
    }, 500);
}

function makeNewCountryToGuess(){
    console.log(allObjectIdentification)
    const randomIndex = Math.floor(Math.random() * allObjectIdentification.length);
    currentCountry = allObjectIdentification[randomIndex];
    document.getElementById("currentCountryToGuess").innerHTML = currentCountry;
}

function updateGameLabel(){
    document.getElementById("countriesLeft").innerHTML = `${guessedCountries}/${startingCountriesCount}`;
    let accuracy = guessedCountries / (guessedCountries + totalErrors)
    document.getElementById("accuracy").innerHTML = `${Math.round(Number.isNaN(accuracy) ? 0 : accuracy * 100)}%`
}

function downloadSvgMap(){
    const baseMap = document.getElementById("gameMapDiv").innerHTML;
    console.log(baseMap)
    let mapToDownload = baseMap.replace("</svg>", `<defs><style>.correct{
            fill: lightgrey;
        }
        .wrong{
            fill: yellow;
        }
        .veryWrong{
            fill: orange;
        }
        .extremelyWrong{
            fill: red;
        }</style></defs></svg>`)

    const element = document.createElement('a');
    const file = new Blob([mapToDownload], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = 'map.svg';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}