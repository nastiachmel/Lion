const circleType = new CircleType(document.getElementById('autoplay'));

// Set the radius to 150 pixels.
circleType.radius(83);



    let winHeight = document.documentElement.clientHeight-6;     // высота окна
    let divHeight = $('.mcs-horizontal-example').height();  // высота блока
    let ratio = winHeight / divHeight;      // отношение между ними
    $('.mcs-horizontal-example').css({ zoom: ratio });      // масштабирование блока 
	console.log( window.innerHeight );
	console.log(winHeight);
	console.log(divHeight);
let height=document.documentElement.clientHeight;
$("#ymaps1592459654300206895").css("height",`divHeight`);
$(document).ready(function() {
  $('html, body, *').mousewheel(function(e, delta) {
      
      this.scrollLeft -= (delta * 40);
      e.preventDefault();
  });
});

function Constellation (canvas) {
  var _this = this,
      context = canvas.getContext('2d'),
      config = {
        star: {
          color: 'rgba(0, 0, 0, .5)',
          width: 5,
      		randomWidth:true
        },
        line: {
          color: 'rgba(0, 0, 0, .5)',
          width: 0.5
        },
        position: {
          x: 0,
          y: 0
        },
        width: window.innerWidth,
        height: window.innerHeight,
       // length: 100,
        distance: 120,
        length: (window.innerWidth / 16),
        radius: (window.innerWidth / 8),
       // radius: 150,
        stars: []
      };

  function Star () {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * config.star.width;

    this.vx = (0.5 - Math.random())/5;
    this.vy = (0.5 - Math.random())/5;

    this.create = function() {
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      context.fill();
    };
  }

  this.animate = function() {
    var i;
    for (i = 0; i < config.length; i++) {

      var star = config.stars[i];

      if (star.y < 0 || star.y > canvas.height) {
        star.vy = - star.vy;
      } else if (star.x < 0 || star.x > canvas.width) {
        star.vx = - star.vx;
      }

      star.x += star.vx;
      star.y += star.vy;
    }
  };

  this.line = function() {
    var length = config.length,
        iStar,
        jStar,
        i,
        j;

    for (i = 0; i < length; i++) {
      for (j = 0; j < length; j++) {
        iStar = config.stars[i];
        jStar = config.stars[j];

        if (
          (iStar.x - jStar.x) < config.distance &&
          (iStar.y - jStar.y) < config.distance &&
          (iStar.x - jStar.x) > - config.distance &&
          (iStar.y - jStar.y) > - config.distance
        ) {
          if (
            (iStar.x - config.position.x) < config.radius &&
            (iStar.y - config.position.y) < config.radius &&
            (iStar.x - config.position.x) > - config.radius &&
            (iStar.y - config.position.y) > - config.radius
          ) {
            context.beginPath();
            context.moveTo(iStar.x, iStar.y);
            context.lineTo(jStar.x, jStar.y);
            context.stroke();
            context.closePath();
          }
        }
      }
    }
  };

  this.createStars = function () {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < config.length; i++) {
      config.stars.push(new Star());
      config.stars[i].create();
    }

    _this.animate();
    _this.line();
  };

  this.setCanvas = function () {
    canvas.width = config.width;
    canvas.height = config.height;
  };

  this.setContext = function () {
    context.fillStyle = config.star.color;
    context.strokeStyle = config.line.color;
    context.lineWidth = config.line.width;
  };

  this.loop = function (callback) {
    callback();

    window.requestAnimationFrame(function () {
      _this.loop(callback);
    });
  };

  this.bind = function () {
    canvas.addEventListener("mousemove", function(e){
      config.position.x = e.pageX - canvas.offsetLeft;
      config.position.y = e.pageY - canvas.offsetTop;
    });
  };

  this.init = function () {
    this.setCanvas();
    this.setContext();
    this.loop(this.createStars);
    this.bind();
  };
}

document.addEventListener("DOMContentLoaded", function() {
	var c = new Constellation(document.getElementById('canvas'));
	var l = new Constellation(document.getElementById('canvas2'));
	var l2 = new Constellation(document.getElementById('canvas3'));
	c.init();
	l.init();
	l2.init();
});


(function($){
  $(window).on("load",function(){

    $(".mcs-horizontal-example").mCustomScrollbar({
			axis: "x" ,
			mouseWheel:{ axis: "string" },
      // setHeight: '100%',
      advanced:{
        autoExpandHorizontalScroll:true
      }
    });
  });

})(jQuery)

window.onload = function () {
  document.body.classList.add('loaded_hiding');
  window.setTimeout(function () {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');
  }, 500);
}