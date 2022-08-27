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
    const prices = document.querySelector(".daily-expenses").querySelectorAll(".pricing");
    const pricesFocus = document.querySelector(".daily-expenses").querySelectorAll(".focus");

    for (let index = 0; index < buttons.length; index++) {
        buttons[index].style.height = (data[index]['amount'] / 8) + "em" ;
        prices[index].innerHTML = "$" + data[index]['amount'];
        pricesFocus[index].innerHTML = "$" + data[index]['amount'];

        buttons[index].addEventListener("mouseover", () => {
            prices[index].style.display = "block";
        }); 

        buttons[index].addEventListener("mouseout", () => {
            prices[index].style.display = "none";
        }); 

        buttons[index].addEventListener("focusin", () => {
            pricesFocus[index].style.display = "block";
        }); 

        buttons[index].addEventListener("focusout", () => {
            pricesFocus[index].style.display = "none";
        }); 

    }
}