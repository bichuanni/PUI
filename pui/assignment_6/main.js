// $(document).ready(()=>{
//     console.log("rady");

// })

var preFrostingChoice;
var preQuantityChoice;
var preMethodChoice;

function frostingChoice(item) {
    if (typeof preFrostingChoice !== 'undefined'){
        preFrostingChoice.style.backgroundColor = "white";
    }

    item.style.backgroundColor = "lightgray";
    preFrostingChoice = item;
}

function quantityChoice(item) {
    if (typeof preQuantityChoice !== 'undefined'){
        preQuantityChoice.style.backgroundColor = "white";
    }

    item.style.backgroundColor = "lightgray";
    preQuantityChoice = item;
}

function methodChoice(item) {
    if (typeof preMethodChoice !== 'undefined'){
        preMethodChoice.style.backgroundColor = "white";
    }

    item.style.backgroundColor = "lightgray";
    preMethodChoice = item;
}