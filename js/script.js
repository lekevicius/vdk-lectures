/*
  JavaScript komentarai yra tokie patys, kaip ir CSS.
  Taip pat egzistuoja trumpesnis komentarų variantas:
  // komentaras

  Išankstinis perspėjimas:
  JavaScript yra rimta programavimo kalba, ir žymiai sudėtingesnis dalykas
  nei HTML ir CSS. Siūlau pradėti skaityti tik gerai susigaudžius HTML ir CSS,
  ir perskaičius bei supratus puslapyje esančią medžiagą.

  Čia bus kodas, tokia tvarka keturiems dalykams:
  - Laikrodžio demo
  - Burbulų jQuery demo
  - Galerijos paveiksliukų atidarymo plugino
  - Puslapio headerio animacijos įjungimo
*/

$(function() {
  /*
    Ši pirma eilutė jau yra gana sudėtinga.
    $ yra funkcija, kurią suteikia jQuery sistema.
    Ši funkcija gauna kitą funkciją, kurią paleis, kai puslapis bus pasirengęs vykdyti kodą.

    Jei atrodo sudėtinga (taip ir yra), tiesiog pridėkite jQuery į savo puslapį, 
    pradėkite kodą šia eilute, ir baikite tokia, kaip baigiasi šis.
  */

  /********* PIRMA DEMONSTRACIJA: JAVASCRIPT LAIKRODIS *********/

  var hours = document.getElementById('hours');
  var hoursShadow = document.getElementById('hours-shadow');
  var minutes = document.getElementById('minutes');
  var minutesShadow = document.getElementById('minutes-shadow');
  var seconds = document.getElementById('seconds');
  var secondsShadow = document.getElementById('seconds-shadow');
  /*
    Klasikinis būdas pasirinkti HTML elementus: per jų id atributus,
    naudojantis document.getElementById.
    Pasirinktas elementas yra "išsaugojamas" kintamajame.
  */

  function updateTime() {
    /*
      Tai yra funkcija - kodo gabalas.
      Šis bus vykdoamas kas sekundę (tai paleidžiama žemiau).
    */
    var now = new Date(); // Gauname dabartinį laiką
    var nowHours = now.getHours(); // Ištraukiama valandas kaip skaičių...
    var nowMinutes = now.getMinutes(); // minutes
    var nowSeconds = now.getSeconds(); // ir sekundes
    /*
      Visi galimi objektai ir jų standartinės funkcijos yra aprašytos MDN.
    */
    
    hours.style.webkitTransform = "rotate(" + (nowHours*30) + "deg)";
    hoursShadow.style.webkitTransform = "rotate(" + (nowHours*30) + "deg)";
    
    minutes.style.webkitTransform = "rotate(" + (nowMinutes*6) + "deg)";
    minutesShadow.style.webkitTransform = "rotate(" + (nowMinutes*6) + "deg)";
    
    seconds.style.webkitTransform = "rotate(" + (nowSeconds*6) + "deg)";
    secondsShadow.style.webkitTransform = "rotate(" + (nowSeconds*6) + "deg)";

    /*
      Viršuje esančios eilutės rodo kaip JavaScript gali keisti pasirinktų HTML elementų CSS.
      Čia visos trys kalbos dirba kartu!

      Valanda bus skaičius nuo 0 iki 23, ir padauginus iš 30 laipsnių rodyklė rodys teisingą valandą.
      Analogiška logika naudojama suskaičiuoti minučių ir sekundžių kampą.
    */
  }

  setInterval(updateTime, 1000);
  /*
    Ši JavaScript funkcija nurodo, kokią funkciją paleisti ir kas kiek laiko.
    1000 yra 1000 milisekundžių, arba viena sekundė.
  */ 

  /*
    Visai laikrodžio demo jQuery nebuvo būtinas - bet jQuery labai smarkiai palengvina darbą su JavaScript.
    Nuo čia visi pavyzdžiai naudos jQuery.
  */


  /********* ANTRA DEMONSTRACIJA: JQUERY BURBULAI *********/


  var jQueryDemo = $('.jquery-demo');
  // Taip elementai pasirenkami su jQuery: lygiai kaip su CSS.
  var demoAreaWidth = jQueryDemo.width();
  var demoAreaHeight = jQueryDemo.height();
  // jQuery leidžia lengvai gauti elemento dydį, naudingą tolesniam programavimui

  function createBall() {
    var randomSize = Math.round( Math.random() * 60 + 30 );
    var halfSize = randomSize / 2;
    var randomX = Math.round( Math.random() * demoAreaWidth ) - halfSize;
    var randomY = Math.round( Math.random() * demoAreaHeight ) - halfSize;
    var randomHue = Math.round( Math.random() * 90 - 60 );
    var randomAlpha = Math.random() * 0.5 + 0.3;
    /*
      Šis kodas sugeneruoja atsitiktinį burbulo dydį, poziciją, spalvą ir parmatomumą.
    */

    var randomBackground = "hsla(" + randomHue + ", 50%, 70%, " + randomAlpha + ")";
    // Visa spalva naudojant HSLA (pakomentuotą CSS)

    var newBall = $("<div class='ball'>");
    // Taip jQuery leidžia kurti visiškai naujus elementus
    newBall.css({
      width: randomSize + "px", 
      height: randomSize + "px", 
      left: randomX + "px", 
      top: randomY + "px",
      webkitTransform: "scale(0)",
      background: randomBackground
    });
    // Taip galima elementui nustati CSS per jQuery.

    setTimeout(function () {
      newBall.css({ webkitTransform: "" }); 
    }, 100);
    // setTimeout įvykdo kodą po kiek laiko. Šito kodo reikia sklandžiai animacijai...

    jQueryDemo.append(newBall);
    // Ši eilutė prideda naujai sukurtą elementą į prieš tai pasirinktą ir išsaugotą elementą.

    newBall.on('click', function () {
      $(this).css({ webkitTransform: "scale(0)" });
      createBall();
    });
    /*
      jQuery leidžia labai paprastai nurodyti, kokį kodą vykdyti, kai elementas paspaudžiamas.
      Kiekvienas naujai sukurtas burbulas lauks paspaudimo, ir kai bus paspaustas, susianimuos iki 0
      ir sukurs naują burbulą...
    */
  }

  for (var i = 1; i <= 25; i++) {
    createBall();
  };
  /*
    Tai yra vadinamas for-loop: su juo kodą galima kartoti kelis kartus.
    Šiuo atveju jis sukuria 25 pradinius burbulus, naudodamasis mūsų aukčiau aprašyta funkcija createBall.
  */


  /********* TREČIA DEMONSTRACIJA: JQUERY PLUGIN *********/


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

  /*
    Šis labai trumpas kodo gabaliukas "aktyvuoja" instaliuotą jQuery pluginą Magnific Popup.
    Jam reikalingas CSS ir JS kodas buvo pridėtas HTML kode.

    Viskas, kas čia yra, tai vienos funkcijos iškvietimas su nustatymais:
    jog noriu, kad visos galerijoj nuorodos atsidarytų su zoom animacija.
  */


  /********* KETVIRTA DEMONSTRACIJA: PUSLAPIO HEADERIS *********/


  /*
    Čia toks sudėtingas kodas, kad net vertą aiškinti...

    ...o gal taip nėra?

    Jei prisikapstei prie šio, pačio paskutinio kodo, 
    turėtum turėti pakankamai intuicijos susigaudyti, kas vyksta.
    Pabandyk susigaudyti.

    Ir jei jauti, kad pagauni, dideli sveikinimai:
    tu įkirtai viską - HTML, CSS ir JavaScript.
  */

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

/*
  Internetą kuriame kiekvienas iš mūsų.
  Supratęs šį kodą tu įgijai naujų gebėjimų:
  žinok, kad viskas yra įmanoma.
  Nėra nesukuriamų dalykų.
  Ok, iš tiesų yra, bet tai kiek trukdo mano motyvuojančiai kalbai.
  Žodžiu, sukurk tai, ko dar niekas nėra matęs.
  21 amžiaus istorija dar neparašyta.
*/
