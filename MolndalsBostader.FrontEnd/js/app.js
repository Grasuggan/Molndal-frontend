/*======================================
  #Set browser class
======================================*/
navigator.browserSpecs = (function () {
  var ua = navigator.userAgent, tem,
      M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return { name: 'IE', version: (tem[1] || '') };
  }
  if (M[1] === 'Chrome') {
      tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
      if (tem != null) return { name: tem[1].replace('OPR', 'Opera'), version: tem[2] };
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
  if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
  return { name: M[0], version: M[1] };
})();

$(function () {
  if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) { $('body').addClass('browser-opera') }
  else if (navigator.userAgent.indexOf("Chrome") != -1) { $('body').addClass('browser-chrome'); }
  else if (navigator.userAgent.indexOf("Safari") != -1) { $('body').addClass('browser-safari'); }
  else if (navigator.userAgent.indexOf("Firefox") != -1) { $('body').addClass('browser-firefox'); }
  else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) { $('body').addClass('browser-explorer'); }
  else if (navigator.userAgent.indexOf("Edge") != -1) { $('body').addClass('browser-edge'); }
  if (navigator.browserSpecs.version) { $('body').addClass('browser-version-' + navigator.browserSpecs.version); }

  var el = document.createElement('div');
  el.setAttribute('ongesturestart', 'return;');
  if (typeof el.ongesturestart == "function") { $("body").addClass("touch"); }
  else { $("body").addClass("no-touch"); }
});


/*======================================
#Set .scroll class on scroll
======================================*/
$(function () {
  var body = $("body"),
      scrollVal = 100;
  currentScroll = 0;

  if ($(window).scrollTop() > scrollVal) { body.addClass("scroll"); }

  $(window).scroll(function () {
      currentScroll = $(this).scrollTop();
      if (currentScroll > scrollVal) { body.addClass("scroll"); }
      else { body.removeClass("scroll"); }
  });
});

/*======================================
#Navigation
======================================*/
$(function () {
  $(document).on("click", ".toggle-mobile-nav", function (e) {
      e.preventDefault();
      
     
     
      var current = $('.current-select-main');
   
      if(current.parents('li.selected').length > 0){
          var parentsOfCurrent = current.parents('li.selected');
           parentsOfCurrent.each(function () {
            var aTag = $(this).children('a'); 
            var span = aTag.children('.expand');
               if(!span.hasClass('open')){
                   span.addClass("open");
               }
               
           });
           if(current.hasClass('has-child')){
               current.children('ul').css('display', 'none');
           }
      
      }
  
      $("body").toggleClass("mobile-nav-visible");
      
      
  });

  $(".main-nav li ul").each(function () {
      $(this).parent("li").addClass("has-child");
      
  });
  
  $(".main-nav > ul > li.nav-toggle-search").prev("li").addClass("flip-nav").prev("li").addClass("flip-nav-m");
 
});
  
    //Toggle mobile second level nav

$(document).on("click", ".main-nav ul li a .expand", function(e){
  e.preventDefault();
  var ull = $(this).closest("li").children("ul");
  if(ull.css('display') == 'none'){
  $(this).addClass("open").closest("li").children("ul").slideToggle(200);
  }
  else{
   $(this).removeClass("open").closest("li").children("ul").slideToggle(200);
  }

  
});
  
//Toggle mobile second level nav
$(document).on("keydown", ".main-nav ul li a .expand", function(e){
     var keyCode = e.keyCode || e.which;
  if (keyCode == 13) { 
  e.preventDefault();
  var ull = $(this).closest("li").children("ul");
  if(ull.css('display') == 'none'){
  $(this).addClass("open").closest("li").children("ul").slideToggle(200);
  }
  else{
       $(this).removeClass("open").closest("li").children("ul").slideToggle(200);
      }

  }
});

  
$(document).on("click", ".nav-toggle-search", function (e) {
      e.preventDefault();
      $("body").addClass("search-visible");
      setTimeout(function () {
          $("#search-form input").focus();
      }, 325);
  });

  $(document).on("click", ".close-search", function (e) {
      e.preventDefault();
      $("body").removeClass("search-visible");
  });
  
  $(document).keyup(function(e){
      if(e.keyCode == 27){ 
          $("body").removeClass("search-visible"); 
      }
  });


//on touchscreen
 $(document).on("touchstart", ".main-nav ul li a", function(e){
var navLi = $(this).parent("li");
var navAllLi = $(".main-nav li");
var dropExist = navLi.children("ul").length;
 var thisTarget = navLi.parent('.main-nav ul li ul').length;
 

if(!navLi.hasClass("touch-open") && dropExist && !$("body").hasClass("mobile-nav-visible")){
  e.preventDefault();
  var parentLi = navLi.closest(".touch-open");
  navAllLi.not(parentLi).removeClass("touch-open");
  navLi.addClass("touch-open");
}
else if(dropExist){
  navAllLi.removeClass("touch-open");
}
else if(dropExist===0 && $(".touch-open")[0] && thisTarget < 1 ){
   
    navAllLi.removeClass("touch-open");
    
}
});

// ON tab press enter
$(document).on("keydown", ".main-nav ul li a", function(e){
var keyCode = e.keyCode || e.which;
if(keyCode == 13){
var navLi = $(this).parent("li");
var navAllLi = $(".main-nav li");
var dropExist = navLi.children("ul").length;
 var thisTarget = navLi.parent('.main-nav ul li ul').length;

if(!navLi.hasClass("touch-open") && dropExist && !$("body").hasClass("mobile-nav-visible")){
e.preventDefault();
var parentLi = navLi.closest(".touch-open");
navAllLi.not(parentLi).removeClass("touch-open");
navLi.addClass("touch-open");
}
else if(dropExist){
navAllLi.removeClass("touch-open");
}
else if(dropExist===0 && $(".touch-open")[0] && thisTarget < 1 ){
 
  navAllLi.removeClass("touch-open");
  
}
}
});

//Close open menues when focus on next menue title
$(document).on("focus", ".main-nav ul li a", function(e){
var navLi = $(this).parent("li");
var navAllLi = $(".main-nav li");
 var thisTarget = navLi.parent('.main-nav ul li ul').length;

if(thisTarget < 1 && !$("body").hasClass("mobile-nav-visible")){
$(this).closest(".touch-open").removeClass(".touch-open")
 navLi.closest(".touch-open");
navAllLi.removeClass("touch-open");
navLi.removeClass("touch-open");
}
});









/*======================================
#Scroll to top
======================================*/
$(function () {
  $(document).on("click", ".to-top", function (e) {
      e.preventDefault();
      $("html, body").animate({ scrollTop: 0 }, 500);
  });
});

/*======================================
#Clone sidebar for mobile
======================================*/

$(function () {
  var sidebar = $("aside .sidebar");
  if (sidebar.length > 0) {
      sidebar.clone().appendTo(".sm-sidebar");
  }
});

/*======================================
#Toggle translate
======================================*/
$(function () {
  $(document).on("click", ".translate-btn", function (e) {
      e.preventDefault();
      $(this).parent().toggleClass("open");
  });
  $(document).on("click", ".close-translate", function (e) {
      e.preventDefault();
      $(this).parent().parent().removeClass("open");
  });
});

/*======================================
#Social Share
======================================*/
$(function () {
  $(document).on("click", ".social-share a", function (e) {
      if ($(window).width() > 768) {
          e.preventDefault();

          var targetUrl = $(this).attr("href");
          var winWidth = $(this).data("width");
          var winHeight = $(this).data("height");
          PopupCenter(targetUrl, 'sharer', winWidth, winHeight);

      }
  });
});

function PopupCenter(url, title, w, h) {
  var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
  var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

  var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
  var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

  var left = ((width / 2) - (w / 2)) + dualScreenLeft;
  var top = ((height / 2) - (h / 2)) + dualScreenTop;
  var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

  if (window.focus) {
      newWindow.focus();
  }
}


/*======================================
#Page loaded 
======================================*/
$(window).load(function () {
  $("body").addClass("page-loaded").removeClass("page-loading");



});
$(document).on("keydown", ".skip-link", function(e){
    var keyCode = e.keyCode || e.which;
if (keyCode == 13) {

  if($("#content").length > 0){
    var hash = "#content";
      $("html, body").animate({scrollTop: $(hash).offset().top - 100}, 850);

    }
  }
   
});



  



/*======================================
#Logged in
======================================*/
$(function () {
  if ($(".logged-on-container").length) {
      $(".nav-my-page > a").hide();
  }

});
/*======================================
#Cookie
======================================*/
$(function () {

  $(document).on("click", ".cookie-info a.btn", function (e) {
      e.preventDefault();
      $(".cookie-info").remove();
      setCookie("cookie-info", "true", 365);
  });

  if (getCookie("cookie-info") == "") {
      $(".cookie-info").removeClass("hide");
  }
});


function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};


function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "";
};


$(function () {
    
  if($(window).width() > 992){

  $('.navCol').each(function() {

    var heightCount = 0;
    $(this).children('.babyCol').each(function() {
      var addHeight = $(this).height() + (60 - $(this).height());
      $(this).css('height', addHeight);
      heightCount += $(this).height();
    })

    var div = (heightCount + 30) / 2;
    $(this).css('height', div);


  });
  
}
});