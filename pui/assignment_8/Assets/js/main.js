
// window.addEventListener('scroll', function() {
//   document.getElementById('showScroll').innerHTML = pageYOffset + 'px';
// });


var runtime = 5000;
var curState = "collection";
var scrollUpAnim;
var scrollDownAnim;

function countUpdate (){
  autoup();
  autodown();

}

function stateValidator (newState){
  if (curState == "collection"){
    runwayExitRight();
    runwayExitLeft();
    detailEnter();
    curState = "detail";
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

function runwayExitLeft(){
  scrollUpAnim.pause();
  var w = window.innerWidth;

  scrollUpAnim = anime({
    targets: '#autoup',
    translateX: [0, -w],
    opacity: 0,
    easing: 'linear',
    duration: 1000
    // loop: true
  });

  // scrollDownAnim.add({
  //   targets: '#autodown',
  //   translateX: [0, w]
  // });
}

function runwayExitRight(){
  scrollDownAnim.pause();
  var w = window.innerWidth;
  // var curStyle = document.getElementById('autodown').style;
  var offset = document.getElementById('autodown').style.transform;
  document.getElementById('autodown').style.transform = offset;
  // var offset = maxscroll - imgHeight*3/4;
  // console.log(offset);

  scrollDownAnim = anime({
    targets: '#autodown',
    translateX: [0, w],
    opacity: 0,
    easing: 'linear',
    duration: 1000,
    complete: function(anim) {
      document.getElementById('collection').style.display = 'none';
    }
    // loop: true
  });

  // scrollDownAnim.add({
  //   targets: '#autodown',
  //   translateX: [0, w]
  // });
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

