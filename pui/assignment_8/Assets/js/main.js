
// window.addEventListener('scroll', function() {
//   document.getElementById('showScroll').innerHTML = pageYOffset + 'px';
// });


var runtime = 5000;
var curState = "collection";
var scrollUpAnim;
var scrollDownAnim;
var scrollLeftAnim;
var scrollRightAnim;

function countUpdate (){
  autoup();
  autodown();

  document.getElementById('nav0').style.textDecoration = 'underline';

}

function stateValidator (newState){

  if (curState == "collection"){
    runwayExit();
    // runwayExitLeft();
    detailEnter();
  }

  if (curState = "detail"){
    document.getElementById('collection').style.display = 'initial';
  }

  curState = newState;
  resetUnderline(curState);

}

function resetUnderline(curState){
  for (var i = 0; i < 3; i ++){
    document.getElementById('nav'+i).style.textDecoration = 'none';
  }
  if (curState == 'collection'){
    document.getElementById('nav0').style.textDecoration = 'underline';
  } else if (curState == 'detail'){
    document.getElementById('nav1').style.textDecoration = 'underline';
  } else {
    document.getElementById('nav2').style.textDecoration = 'underline';
  }
}

function detailEnter(){
  var colorchange = anime({
    targets: 'body',
    backgroundColor: '#1E2531',
    duration: 1000
  });

  var fadeIn = anime({
    targets: '#detailmain',
    opacity: [0, 1],
    delay: 500,
    duration: 1500
  });


}

function runwayExit(){
  scrollDownAnim.pause();
  scrollUpAnim.pause();
  var w = window.innerWidth;
  // var offset = document.getElementById('autodown').style.transform;
  // document.getElementById('autodown').style.transform = offset;
  // var offset = maxscroll - imgHeight*3/4;
  // console.log(offset);

  scrollLeftAnim = anime({
    targets: '#autoup',
    translateX: [0, -w],
    opacity: 0,
    easing: 'linear',
    duration: 1000
  });

  scrollRightAnim = anime({
    targets: '#autodown',
    translateX: [0, w],
    opacity: 0,
    easing: 'linear',
    duration: 1000,
    complete: function(anim) {
      document.getElementById('collection').style.display = 'none';
    }
  });
}

function autoup(){
  var maxscroll = document.getElementById('autoup').offsetHeight;
  var imgHeight = document.getElementById('identifier1').offsetHeight;
  var offset = maxscroll - imgHeight;
  // console.log(imgHeight);

  scrollUpAnim = anime({
    targets: '#autoup',
    translateY: [0, -offset],
    easing: 'linear',
    duration: runtime
    // loop: true
  });
}

function autodown(){
  var maxscroll = document.getElementById('autodown').offsetHeight;
  var imgHeight = document.getElementById('identifier2').offsetHeight;
  var offset = maxscroll - imgHeight*3/4;
  // console.log(imgHeight);

  scrollDownAnim = anime({
    targets: '#autodown',
    translateY: [-offset, 0],
    easing: 'linear',
    duration: runtime,
    // loop: true
    complete: function(anim) {
      console.log("anim.completed");
    }
  });
}

