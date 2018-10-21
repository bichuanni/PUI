// $(document).ready(()=>{
//     console.log("rady");

// })

var preFrostingChoice;
var preQuantityChoice;
var preMethodChoice;
var frostingChosen = false;
var quantityChosen = false;
var methodChosen = false;

function frostingChoice(item) {
    frostingChosen = true;
    if (typeof preFrostingChoice !== 'undefined'){
        preFrostingChoice.style.backgroundColor = "white";
    }

    item.style.backgroundColor = "lightgray";
    preFrostingChoice = item;
}

function quantityChoice(item) {
    quantityChosen = true;
    if (typeof preQuantityChoice !== 'undefined'){
        preQuantityChoice.style.backgroundColor = "white";
    }

    item.style.backgroundColor = "lightgray";
    preQuantityChoice = item;
}

function methodChoice(item) {
    methodChosen = true;
    if (typeof preMethodChoice !== 'undefined'){
        preMethodChoice.style.backgroundColor = "white";
    }

    item.style.backgroundColor = "lightgray";
    preMethodChoice = item;
}

function toChart(item) {
    if (frostingChosen === true && quantityChosen === true && methodChosen === true) {
        cartAnimation(item);
    } else {alert("Please specify all options")}

}

function cartAnimation(item) {
// https://stackoverflow.com/questions/5677799/how-to-append-data-to-div-using-javascript
// https://stackoverflow.com/questions/7802744/adding-an-img-element-to-a-div-with-javascript
// https://www.w3schools.com/jsref/met_element_getattribute.asp
    var curpage = document.getElementById("page_content");
    var imgSrc = document.getElementById("cur-main").getAttribute("src");
    var imgAlt = document.getElementById("cur-main").getAttribute("alt");

    var popup = document.createElement("div");
    popup.className = "popup";

    var productImg = document.createElement("img");
    productImg.className = "popup";
    productImg.src = imgSrc;
    productImg.alt = imgAlt;

    popup.appendChild(productImg);
    popup.innerHTML += "Item Added to Cart";

    curpage.appendChild(popup);
}