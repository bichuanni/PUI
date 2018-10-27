var preFrostingChoice;
var preQuantityChoice;
var preMethodChoice;
var frostingChosen = false;
var quantityChosen = false;
var methodChosen = false;
var newPrice;
var totalPrice = 0;

// keep track of current frosting choice
function frostingChoice(item) {
    frostingChosen = true;
    if (typeof preFrostingChoice !== 'undefined'){
        preFrostingChoice.style.backgroundColor = "white";
    }

    item.style.backgroundColor = "lightgray";
    preFrostingChoice = item;

    checkPrice();
}

// keep track of current quantity choice
function quantityChoice(item) {
    quantityChosen = true;
    if (typeof preQuantityChoice !== 'undefined'){
        preQuantityChoice.style.backgroundColor = "white";
    }

    item.style.backgroundColor = "lightgray";
    preQuantityChoice = item;

    checkPrice();
}

// keep track of current delivery method choice
function methodChoice(item) {
    methodChosen = true;
    if (typeof preMethodChoice !== 'undefined'){
        preMethodChoice.style.backgroundColor = "white";
    }

    item.style.backgroundColor = "lightgray";
    preMethodChoice = item;

    checkPrice();
}

// calculate price based on all three specified options on item detail page
function checkPrice(){
    //update the new price based on users' current option choices
    if (frostingChosen === true && quantityChosen === true && methodChosen === true) {
        newPrice = preQuantityChoice.innerHTML * 3;
        var prePrice = document.getElementById("price");
        prePrice.innerHTML = ("Price: $ " + newPrice);
    }
}

function toChart(item) {
// https://www.w3schools.com/js/js_json_parse.asp
    var storedList = JSON.parse(localStorage.getItem("myCart"));
    if (storedList === null){
        storedList = [];
    } //edge case when there is noting in storage, initiate an array

    if (frostingChosen === true && quantityChosen === true && methodChosen === true) {
        popupAnimation(item, "cart");// play animation
        var rollType = document.getElementsByTagName("h1")[0].innerHTML;
        var imgSrc = document.getElementById("cur-main").getAttribute("src");
        var imgAlt = document.getElementById("cur-main").getAttribute("alt");
        var newItem = {type: rollType, frosting: preFrostingChoice.innerHTML, quantity: preQuantityChoice.innerHTML, method: preMethodChoice.innerHTML, src: imgSrc, alt: imgAlt, price: newPrice};
        storedList.push(newItem);
        localStorage.setItem("myCart", JSON.stringify(storedList));
        countUpdate();// update the cart icon with current number of items in cart
        console.log(localStorage.getItem("myCart"));
    } else {alert("Please specify all options")} // users not speficfying all options
}

function toWhishList(item, where) {
    var storedList = JSON.parse(localStorage.getItem("myWishList"));
    if (storedList === null){
        storedList = [];
    } //edge case when there is noting in storage, initiate an array

    if (frostingChosen === true && quantityChosen === true && methodChosen === true) {
        popupAnimation(item, "wishlist");// play animation
        var rollType = document.getElementsByTagName("h1")[0].innerHTML;
        var imgSrc = document.getElementById("cur-main").getAttribute("src");
        var imgAlt = document.getElementById("cur-main").getAttribute("alt");
        var newItem = {type: rollType, frosting: preFrostingChoice.innerHTML, quantity: preQuantityChoice.innerHTML, method: preMethodChoice.innerHTML, src: imgSrc, alt: imgAlt, price: newPrice};
        storedList.push(newItem);
        localStorage.setItem("myWishList", JSON.stringify(storedList));
        console.log(localStorage.getItem("myWishList"));
    } else {alert("Please specify all options")} // users not speficfying all options
}

// animation for successfully adding item to cart
function popupAnimation(item, where) {
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
    if (where === "cart") {
        popup.innerHTML += "Item Added to Cart";
    } else {
        popup.innerHTML += "Added to Wishlist";
    }

    curpage.appendChild(popup);
}

function checkoutPageUpdate(){
    countUpdate();
    getList();
}

//update the cart icon with current number of items in cart
function countUpdate() {
    var curpage = document.getElementById("container");
    var storedList = JSON.parse(localStorage.getItem("myCart"));

    var curNum = storedList.length;
    var count = document.createElement("div");
    count.id = "count";
    count.innerHTML = curNum;

    curpage.appendChild(count);
}

// retrive every info stored in the local storage about things that user want to purchase
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
            cartItem.id = i;

            var cartItemImg = document.createElement("img");
            cartItemImg.className = "cart-content";
            cartItemImg.src = storedList[i].src;
            cartItemImg.alt = storedList[i].alt;

            var cartItemTitle = document.createElement("h3");
            cartItemTitle.innerHTML = storedList[i].type;

            var cartItemFrosting = document.createElement("h2");
            cartItemFrosting.innerHTML = ("w/ " + storedList[i].frosting + " frosting");

            var cartItemMethod = document.createElement("h2");
            cartItemMethod.id = "method";
            cartItemMethod.innerHTML = storedList[i].method;

            var cartItemQuantity = document.createElement("h2");
            cartItemQuantity.id = "quantity";
            cartItemQuantity.innerHTML = storedList[i].quantity;

            var cartItemPrice = document.createElement("h2");
            cartItemPrice.id = "cart-price";
            cartItemPrice.innerHTML = "$ " + storedList[i].price;

            //add delete button with attached delete function
            // https://stackoverflow.com/questions/7066191/javascript-onclick-onsubmit-for-dynamically-created-button
            var deleteButton = document.createElement("button");
            deleteButton.className = "delete-item";
            deleteButton.onclick = function(){
                // this.parentNode.remove();
                var deleteIndex = this.parentNode.id;
                // console.log(deleteIndex);
                storedList.splice(deleteIndex, 1);
                localStorage.setItem("myCart", JSON.stringify(storedList));
                document.location.reload();
            };
            deleteButton.innerHTML = "X";

            cartItem.appendChild(cartItemImg);
            cartItem.appendChild(cartItemTitle);
            cartItem.appendChild(cartItemFrosting);
            cartItem.appendChild(cartItemMethod);
            cartItem.appendChild(cartItemQuantity);
            cartItem.appendChild(cartItemPrice);
            cartItem.appendChild(deleteButton);

            targetLocation.appendChild(cartItem);
        }

        // calculate new total price of items in the cart
        addTotalPrice(targetLocation);

    }
}

// calculate total price of items on the shopping cart page
function addTotalPrice(targetLocation){
    var storedList = JSON.parse(localStorage.getItem("myCart"));
    for (var i = 0; i < storedList.length; i++) {
        totalPrice += storedList[i].price;
    }

    var cartTotalPrice = document.createElement("h2");
    cartTotalPrice.className = "total-price";
    cartTotalPrice.innerHTML = ("Total: $" + totalPrice);
    targetLocation.appendChild(cartTotalPrice);

}