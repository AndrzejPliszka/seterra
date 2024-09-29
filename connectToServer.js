let sentMap = false;
function sendMapToServer() {
    if(sentMap) {return}
    let url = "https://heathered-cherry-replace.glitch.me/send_map"
    let data = {
        "name": document.getElementById("nameInput").value,
        "svg": document.getElementById("svgCode").value,
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    };

    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            document.getElementById("gameMapDiv").innerHTML = "<p style='color:green;margin: 100px 0'>Data uploaded you can, close this now</p>";
            console.log(document.getElementById("gameMapLabel"))
            document.getElementById("gameMapLabel")?.remove();
            document.getElementById("nameInput")?.remove();
            document.getElementById("svgCode")?.remove();
            gameEnded = true;
            sentMap = true;
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            document.getElementById("gameMapDiv").innerHTML = "<p style='color:red;'>There was an error, try again and (if that doesn't work) contact website admin</p>";

            console.error('Error:', error);
        });
}
function downloadMap(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    let url = `https://heathered-cherry-replace.glitch.me/send_map?id=${id}`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    };

    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            document.getElementById("svgCode").innerHTML = data.svg;
            document.getElementById("name").innerHTML = data.name;
            console.log(document.getElementById("svgCode").children)
            makeSVGImage();
            console.log('Downloaded current map:', data);
        })
        .catch(error => {
            document.getElementById("gameMapDiv").innerHTML = "<p style='color:red;'>There was an error, try again and (if that doesn't work) contact website admin</p>";
            console.error('Error:', error);
        });
}
window.addEventListener("load", downloadNewestMaps.bind(null, null))
function downloadNewestMaps(searchedString){
    console.log(searchedString)
    let url
    if(searchedString){
        url = `https://heathered-cherry-replace.glitch.me/send_newest_maps?search=${searchedString}`;
    }
    else{
        url = `https://heathered-cherry-replace.glitch.me/send_newest_maps`;
    }

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Downloaded newest maps:', data);
            DisplayMapsOnSide(data);
        })
        .catch(error => {
            document.getElementById("gameMapDiv").innerHTML = "<p style='color:red;'>There was an error, try again and (if that doesn't work) contact website admin</p>";
            console.error('Error:', error);
        });
}
function DisplayMapsOnSide(listOfMaps){
    console.log(listOfMaps);
    let sideMapDiv = document.getElementById("sideMaps");
    sideMapDiv.innerHTML = "";
    for(let i = 0; i < listOfMaps.length; i++){
        sideMapDiv.innerHTML += `
        <hr><a href="game.html?id=${listOfMaps[i].id}"><div class="sideMap">
            <h4>${listOfMaps[i].name}</h4>
            ${listOfMaps[i].svg}
        </div></a>
        `;
    }
}