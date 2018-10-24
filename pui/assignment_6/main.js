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
// https://www.w3schools.com/js/js_json_parse.asp
    var storedList = JSON.parse(localStorage.getItem("myCart"));
    if (storedList === null){
        storedList = [];
    } //edge case when there is noting in storage, initiate an array

    if (frostingChosen === true && quantityChosen === true && methodChosen === true) {
        cartAnimation(item);
        var rollType = document.getElementsByTagName("h1")[0].innerHTML;
        var imgSrc = document.getElementById("cur-main").getAttribute("src");
        var imgAlt = document.getElementById("cur-main").getAttribute("alt");
        var newItem = {type: rollType, frosting: preFrostingChoice.innerHTML, quantity: preQuantityChoice.innerHTML, method: preMethodChoice.innerHTML, src: imgSrc, alt: imgAlt};
        storedList.push(newItem);
        localStorage.setItem("myCart", JSON.stringify(storedList));
        console.log(localStorage.getItem("myCart"));
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

function getList() {
// https://www.w3schools.com/jsref/event_onload.asp
    var storedList = JSON.parse(localStorage.getItem("myCart"));
    console.log(storedList);
    if (storedList.length > 0 ) {
        document.getElementById("empty").remove();

        //add shopping cart items at the correct location on the current page
        for (var i = 0; i < storedList.length; i++) {
            var targetLocation = document.getElementById("item-list");
            var cartItem = document.createElement("div");
            cartItem.className = "cart-content";

            var cartItemImg = document.createElement("img");
            cartItemImg.className = "cart-content";
            cartItemImg.src = storedList[i].src;
            cartItemImg.alt = storedList[i].alt;

            var cartItemTitle = document.createElement("h3");
            cartItemTitle.innerHTML = storedList[i].type;

            var cartItemFrosting = document.createElement("h2");
            cartItemFrosting.innerHTML = ("w/ " + storedList[i].frosting + " frosting");

            cartItem.appendChild(cartItemImg);
            cartItem.appendChild(cartItemTitle);
            cartItem.appendChild(cartItemFrosting);
            // var emptyMessage = document.getElementById("empty");
            // console.log(emptyMessage);
            targetLocation.appendChild(cartItem);
        }

    }
}