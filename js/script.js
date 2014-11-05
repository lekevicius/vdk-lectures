$(function() {

  var hours = document.getElementById('hours');
  var hoursShadow = document.getElementById('hours-shadow');
  var minutes = document.getElementById('minutes');
  var minutesShadow = document.getElementById('minutes-shadow');
  var seconds = document.getElementById('seconds');
  var secondsShadow = document.getElementById('seconds-shadow');

  function updateTime() {
    var now = new Date();
    var nowHours = now.getHours();
    var nowMinutes = now.getMinutes();
    var nowSeconds = now.getSeconds();
    
    hours.style.webkitTransform = "rotate(" + (nowHours*30) + "deg)";
    hoursShadow.style.webkitTransform = "rotate(" + (nowHours*30) + "deg)";
    
    minutes.style.webkitTransform = "rotate(" + (nowMinutes*6) + "deg)";
    minutesShadow.style.webkitTransform = "rotate(" + (nowMinutes*6) + "deg)";
    
    seconds.style.webkitTransform = "rotate(" + (nowSeconds*6) + "deg)";
    secondsShadow.style.webkitTransform = "rotate(" + (nowSeconds*6) + "deg)";
  }

  setInterval(updateTime, 1000);



  var jQueryDemo = $('.jquery-demo');
  var demoAreaWidth = jQueryDemo.width();
  var demoAreaHeight = jQueryDemo.height();

  function createBall() {
    var randomSize = Math.round( Math.random() * 60 + 30 );
    var halfSize = randomSize / 2;
    var randomX = Math.round( Math.random() * demoAreaWidth ) - halfSize;
    var randomY = Math.round( Math.random() * demoAreaHeight ) - halfSize;
    var randomHue = Math.round( Math.random() * 90 - 60 );
    var randomAlpha = Math.random() * 0.5 + 0.3;

    var randomBackground = "hsla(" + randomHue + ", 50%, 70%, " + randomAlpha + ")";

    var newBall = $("<div class='ball'>");
    newBall.css({
      width: randomSize + "px", 
      height: randomSize + "px", 
      left: randomX + "px", 
      top: randomY + "px",
      webkitTransform: "scale(0)",
      background: randomBackground
    });

    setTimeout(function () {
      newBall.css({ webkitTransform: "" }); 
    }, 100);

    jQueryDemo.append(newBall);

    newBall.on('click', function () {
      $(this).css({ webkitTransform: "scale(0)" });
      createBall();
    });
  }

  for (var i = 1; i <= 25; i++) {
    createBall();
  };



  $('.portfolio-example .gallery').magnificPopup({
    delegate: 'a',
    type:'image',
    mainClass: 'mfp-with-zoom',
    zoom: {
      enabled: true
    },
    gallery: {
      enabled: true
    }
  });


  $(window).scrollTop(0);
  var siteHeader = $('#header');
  var siteHeaderScrolled = false;
  if ($(window).scrollTop() > 0) {
    siteHeaderScrolled = true;
  }

  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 30 && !siteHeaderScrolled) {
      siteHeader.addClass('scrolled');
      siteHeaderScrolled = true;
    }
    if ($(window).scrollTop() <= 30 && siteHeaderScrolled) {
      siteHeader.removeClass('scrolled');
      siteHeaderScrolled = false;
    }
  });

});
