function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

readTextFile("data.json", function(text){
    var data = JSON.parse(text);
    initializeButtonsBars(data);
});


function initializeButtonsBars(data) {
    const buttons = document.querySelectorAll(".chart-pole");
    const prices = document.querySelector(".daily-expenses").getElementsByTagName("p");

    for (let index = 0; index < buttons.length; index++) {
        buttons[index].style.height = (data[index]['amount'] / 8) + "em" ;
        prices[index].innerHTML = "$" + data[index]['amount'];

        buttons[index].addEventListener("focusin", () => {
            prices[index].style.display = "block";
        }); 

        buttons[index].addEventListener("focusout", () => {
            prices[index].style.display = "none";
        }); 
    }
}