
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

function countUpdate (){
  defineAnime();
  playRunwayAnime();

  document.getElementById('nav0').style.textDecoration = 'underline';
  // $('body').addClass('stop-scrolling');

}

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
    translateX: [-200, 0],
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
    // direction: 'reverse',
    delay: 300,
    duration: 3000,
    autoplay: false
  });
}

function stateValidator (newState){
  if (curState == "collection"){
    if (newState == "detail"){
      runwayExit("hide");
      document.getElementById('detail').style.display = 'block';
      playDetailAnime("show");
    }
    if (newState == "highlight"){
      runwayExit("hide");
      document.getElementById('highlight').style.display = 'initial';

      highlightFadeIn.play();
      // playDetailAnime("show");
    }
    // $('body').removeClass('stop-scrolling');
  }

  else if (curState = "detail"){
    if (newState == "collection"){

      playDetailAnime("hide");

      // document.getElementById('detail').style.display = 'none';
      document.getElementById('collection').style.display = 'initial';
      runwayExit("show");
      // defineAutoup();
      // defineAutodown();
      playRunwayAnime();
    }
  }

  curState = newState;
  resetUnderline(curState);
  runwayReverse();
  detailReverse();

}

function runwayReverse(){
  runwayFade.reverse();
  // autoup();
  // autodown();
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
  var offset = maxscroll - imgHeight;
  // console.log(imgHeight);

  scrollUpAnim = anime({
    targets: '#autoup',
    translateY: [0, -offset],
    easing: 'linear',
    duration: runtime,
    autoplay: false
  });
}

function defineAutodown(){
  var runtime = 35000;
  var maxscroll = document.getElementById('autodown').offsetHeight;
  var imgHeight = document.getElementById('identifier2').offsetHeight;
  var offset = maxscroll - imgHeight*3/4;
  // var newStirng = "translateY("+ (-offset).toString() +"px)";
  // document.getElementById('autodown').style.transform = newStirng;
  // console.log(newStirng)
  // console.log(document.getElementById('autodown').style)
  // console.log(document.getElementById('autodown').style.transform)
  // console.log(imgHeight);

  scrollDownAnim = anime({
    targets: '#autodown',
    translateY: [-offset, 0],
    easing: 'linear',
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

function resetUnderline(curState){
  for (var i = 0; i < 3; i ++){
    document.getElementById('nav'+i).style.textDecoration = 'none';
  }

  if (curState == 'collection'){
    document.getElementById('nav0').style.textDecoration = 'underline';
  } else if (curState == 'detail'){
    document.getElementById('nav1').style.textDecoration = 'underline';
  } else if (curState == 'artists'){
    document.getElementById('nav2').style.textDecoration = 'underline';
  } else {
    document.getElementById('nav3').style.textDecoration = 'underline';
  }
}