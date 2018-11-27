// $.fn.moveIt = function(){
//   var $window = $(window);
//   var instances = [];

//   $(this).each(function(){
//     instances.push(new moveItItem($(this)));
//   });

//   window.addEventListener('scroll', function(){
//     var scrollTop = $window.scrollTop();
//     instances.forEach(function(inst){
//       inst.update(scrollTop);
//     });
//   }, {passive: true});
// }

// var moveItItem = function(el){
//   this.el = $(el);
//   this.speed = parseInt(this.el.attr('data-scroll-speed'));
// };

// moveItItem.prototype.update = function(scrollTop){
//   this.el.css('transform', 'translateY(' + -(scrollTop / this.speed) + 'px)');
// };

// // Initialization
// $(function(){
//   $('[data-scroll-speed]').moveIt();
// });

window.addEventListener('scroll', function() {
  document.getElementById('showScroll').innerHTML = pageYOffset + 'px';
});


var runtime = 5000;

function countUpdate (){
  // autoup();
  // autodown();

}

function autoup(){
  var maxscroll = document.getElementById('autoup').offsetHeight;
  var imgHeight = document.getElementById('identifier1').offsetHeight;
  var offset = maxscroll - imgHeight;
  console.log(imgHeight);

  var keyframes = anime({
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
  console.log(imgHeight);

  var keyframes = anime({
    targets: '#autodown',
    translateY: [-offset, 0],
    easing: 'linear',
    duration: runtime
    // loop: true
  });
}

