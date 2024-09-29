let allObjectIdentification = []
let startingCountriesCount = 0;
let elementsForDeletion = []
function makeSVGImage(){
    if(sentMap){return}
    allObjectIdentification = []
    elementsForDeletion = []
    let svgCodeDiv = document.getElementById("svgCode");
    let svgCode = svgCodeDiv.value;
    let svgImageDiv = document.getElementById("gameMapDiv");

    document.getElementById("gameMapLabel").style.display = "flex";
    document.getElementById("congratsMessage").style.display = "none";
    svgCodeDiv.style.display = "none";
    svgImageDiv.innerHTML = svgCode;

    let svgElement = svgImageDiv.children[0];
    if(!svgElement || svgElement.tagName !== "svg"){
        svgCodeDiv.style.display = "initial";
        svgImageDiv.innerHTML = "<p style='color:red;'>GIVEN TEXT IS NOT SVG FILE (check if there is no &lt?xml on beginning)</p>"
    }
    svgElement.setAttribute('style', 'width: 500px; height: auto;');

    for(let i = 0; i < svgElement.children.length; i++){
        if(svgElement.children[i].id){
            allObjectIdentification.push(svgElement.children[i].id);
            svgElement.children[i].classList.value = "";
            svgElement.children[i].classList.add("notGuessed");
            svgElement.children[i].addEventListener('click', (e) => {checkIfCountryIsCorrect(e.currentTarget);});
        }
        else if(svgElement.children[i].tagName === "defs"){
            elementsForDeletion.push(i)
        }
        else{
            svgElement.children[i].classList.value = "";
            svgElement.children[i].classList.add("unused");
        }
    }
    for(let i = 0; i < elementsForDeletion.length; i++){
        svgElement.removeChild(svgElement.children[i])
    }
    startingCountriesCount = allObjectIdentification.length;
    gameEnded = false;
    makeNewCountryToGuess();
    clearInterval(timerInterval);
    setupTimer();
    errors = 0;
    guessedCountries = 0;
    totalErrors = 0;
    document.getElementById("timer").innerHTML = `0:0`;
    updateGameLabel();
}