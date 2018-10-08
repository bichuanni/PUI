var picts = ["ferret0.jpg", "ferret1.jpg", "ferret2.jpg", "ferret3.jpg"];
var names = ["Steve", "Finn", "Jack", "Luna", "Meme"];
var ages = [1, 2, 2.5, 4, 6, 8];

// https://stackoverflow.com/questions/4550505/getting-a-random-value-from-a-javascript-array
var randp = picts[Math.floor(Math.random() * picts.length)];
var randn = names[Math.floor(Math.random() * names.length)];
var randa = ages[Math.floor(Math.random() * ages.length)];

function Animal(pic, name, age){
    this.pic = pic;
    this.name = name;
    this.age = age;
}

$(document).ready(()=>{
    console.log("rady");

    var animal = new Animal(randp, randn, randa);
    console.log(animal);

    $("#animal-img").attr("src", animal.pic);
    $("#animal-name").html(animal.name);
    $("#animal-age").html(animal.age + "-year old");
})