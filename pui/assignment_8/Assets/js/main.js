
// window.addEventListener('scroll', function() {
//   document.getElementById('showScroll').innerHTML = pageYOffset + 'px';
// });

var curState = "collection";

var scrollUpAnim;
var scrollDownAnim;
var scrollLeftAnim;
var scrollRightAnim;
var darkenBackground;
var detailSlideRight;
var detailSlideUp;
var detailFadeIn;
var highlightFadeIn;
var removeDetail;
var removeRunway;
var runwayFade;
var linkExit;
var closeups = [false, false, false, false];

function countUpdate (){
  defineAnime();
  playRunwayAnime();

  document.getElementById('nav0').style.textDecoration = 'underline';
  // $('body').addClass('stop-scrolling');

}

// function enter(){
//   console.log("trigger");
//   var postionLogo = anime({
//     targets: 'h1',
//     // backgroundColor: '#1E2531',
//     // direction: 'reverse',
//     fontSize: '48px',
//      // scale: 0.5,
//     left: '3%',
//     bottom: 0,
//     duration: 1000,
//     autoplay: false
//   });
// }

function defineAnime(){
  defineAutoup();
  defineAutodown();

  darkenBackground = anime({
    targets: 'body',
    backgroundColor: '#1E2531',
    direction: 'reverse',
    duration: 1000,
    autoplay: false
  });

  detailSlideRight = anime({
    targets: '.subTitle',
    translateX: [-280, 0],
    easing: 'easeInOutExpo',
    direction: 'reverse',
    delay: 500,
    duration: 1500,
    autoplay: false
  });

  detailSlideUp = anime({
    targets: '.detail-content',
    translateY: [200, 0],
    opacity: [0, 1],
    easing: 'easeInOutExpo',
    direction: 'reverse',
    delay: 500,
    duration: 1000,
    autoplay: false
  });

  detailFadeIn = anime({
    targets: '#detailmain',
    opacity: [0, 1],
    direction: 'reverse',
    delay: 500,
    duration: 1500,
    autoplay: false
  });

  removeDetail = anime({
    targets: '.detail',
    delay: 1500,
    autoplay: false,
    complete: function(anim) {
      document.getElementById('detail').style.display = 'none';
    }
  });

  removeRunway = anime({
    targets: '.collection',
    delay: 500,
    autoplay: false,
    complete: function(anim) {
      document.getElementById('collection').style.display = 'none';
    }
  });

  runwayFade = anime({
    targets: '#collection',
    // translateX: [0, w],
    direction: 'reverse',
    opacity: 0,
    easing: 'linear',
    duration: 500,
    autoplay: false
  });

  linkExit = anime({
    targets: '#nav3',
    translateY: -50,
    opacity: 0,
    direction: 'reverse',
    delay: 500,
    duration: 1500,
    autoplay: false
  });

  highlightFadeIn = anime({
    targets: '#highlight',
    opacity: [0, 1],
    direction: 'reverse',
    delay: 300,
    duration: 3000,
    autoplay: false
  });
}

function changeVlidator (newState){
  if (curState == "collection"){
    if (newState == "detail"){
      runwayExit("hide");
      document.getElementById('detail').style.display = 'initial';
      playDetailAnime("show");
      // detailReverse();
    }
    if (newState == "highlight"){
      runwayExit("hide");
      document.getElementById('highlight').style.display = 'initial';

      highlightFadeIn.play();
      // playDetailAnime("show");
    }
    // $('body').removeClass('stop-scrolling');
  }

  if (curState = "detail"){
    if (newState == "collection"){
      playDetailAnime("hide");
      document.getElementById('collection').style.display = 'initial';
      runwayExit("show");
      playRunwayAnime();
      detailReverse();
    }
  }

  if (curState = "highlight"){
    if (newState == "collection"){
      document.getElementById('collection').style.display = 'initial';
      runwayExit("show");
      playRunwayAnime();
      highlightFadeIn.play();
    }
    if (newState == "detail"){
      // runwayExit("hide");
      document.getElementById('detail').style.display = 'initial';
      playDetailAnime("show");
      detailReverse();
    }
  }

  curState = newState;
  resetUnderline(curState);
  highlightFadeIn.reverse();
  runwayFade.reverse();
  // runwayReverse();

}

// see if the current state of the page has changed --> if transitions need to be made
function stateValidator(newState) {
  if (curState !== newState){
    changeVlidator(newState);
  }
}


function playRunwayAnime(){
  scrollUpAnim.play();
  scrollDownAnim.play();
}

function runwayExit(state){
  // scrollDownAnim.pause();
  // scrollUpAnim.pause();
  runwayFade.play();

  if (state == "hide") {
    removeRunway.restart();
  }
}

function defineAutoup(){
  var runtime = 35000;
  var maxscroll = document.getElementById('autoup').offsetHeight;
  var imgHeight = document.getElementById('identifier1').offsetHeight;
  var offset = maxscroll - imgHeight*1.5;
  // console.log(imgHeight);

  scrollUpAnim = anime({
    targets: '#autoup',
    translateY: [100, -offset],
    direction: 'alternate',
    easing: 'linear',
    loop: true,
    duration: runtime,
    autoplay: false
  });
}

function defineAutodown(){
  var runtime = 35000;
  var maxscroll = document.getElementById('autodown').offsetHeight;
  var imgHeight = document.getElementById('identifier2').offsetHeight;
  var offset = maxscroll - imgHeight*3/4;

  scrollDownAnim = anime({
    targets: '#autodown',
    translateY: [-offset, -300],
    direction: 'alternate',
    easing: 'linear',
    loop: true,
    duration: runtime,
    autoplay: false
  });
}

function detailReverse(){
  darkenBackground.reverse();
  detailSlideRight.reverse();
  detailSlideUp.reverse();
  detailFadeIn.reverse();
  linkExit.reverse();
}

function playDetailAnime(state){
  darkenBackground.play();
  detailSlideRight.play();
  detailSlideUp.play();
  detailFadeIn.play();
  linkExit.play();
  if (state == "hide") {
    removeDetail.restart();
  }
}

function zoom(id){
  var shrinked = false;

  for (var i = 0; i < 4; i++){
    var supposedId = "closeup" + i;
    if (closeups[i] === true){
      if (id === supposedId){
        defineShrink(id);
        closeups[i] = false;
        shrinked = true;
      }
    }
  }

  if (shrinked == false){
    for (var i = 0; i < 4; i++){
      var supposedId = "closeup" + i;
      if (id === supposedId){
        defineZoom(id, i);
        closeups[i] = true;
      }
    }
  }
}

function defineZoom(id, i){
  var target = "#" + id;

  if (i%2 == 0){
    var dir = 1;
  } else {var dir = -1};

  document.getElementById('overlay').style.display = 'initial';
  document.getElementById(id).style.zIndex = 1;


  var big = anime({
      targets: target,
      translateX: 200*dir,
      scale: 1.5,
      easing: 'easeInOutExpo',
      duration: 1000
    });

  var darken = anime({
      targets: "#overlay",
      opacity: 0.8,
      easing: 'easeInOutExpo',
      duration: 500
    });
}

function defineShrink(id){
  var target = "#" + id;

  var small = anime({
      targets: target,
      translateX: 0,
      zIndex: 0,
      scale: 1,
      easing: 'easeInOutExpo',
      duration: 1000
    });

  var lighten = anime({
      targets: "#overlay",
      opacity: 0,
      easing: 'easeInOutExpo',
      duration: 500,
      complete: function(anim) {
        document.getElementById('overlay').style.display = 'none';
      }
    });
}

function resetUnderline(curState){
  for (var i = 0; i < 3; i ++){
    document.getElementById('nav'+i).style.textDecoration = 'none';
  }

  if (curState == 'collection'){
    document.getElementById('nav0').style.textDecoration = 'underline';
  }
  if (curState == 'detail'){
    document.getElementById('nav1').style.textDecoration = 'underline';
  }
  if (curState == 'artists'){
    document.getElementById('nav2').style.textDecoration = 'underline';
  }
  if (curState == 'highlight'){
    document.getElementById('nav3').style.textDecoration = 'underline';
  }
}