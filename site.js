document.addEventListener("DOMContentLoaded", init);

function init(){	
  	
    Array.from(document.querySelectorAll("#topnav a[href^='#']")).forEach((anchor) => {
        anchor.addEventListener("click", function(e){
            e.preventDefault();
            smoothscroll(e.target.getAttribute("href"), 0.2);
        });
    });
  
    Array.from(document.querySelectorAll("#wireframe figure a[href^='assets']")).forEach((anchor)=> {
        anchor.href="#";
        anchor.addEventListener("click", function(e){
            e.preventDefault();
            var figure = e.target.parentElement.outerHTML.slice(0);
            var aside = document.querySelector("aside");
            aside.innerHTML = figure;
            aside.className = "active";
        });
    });

    document.querySelector("aside").addEventListener("click", (e) => {
        e.target.className = "";
    });
}

function smoothscroll(elem, ease=0.1){
    //elem could be selector string or actual element
    if (typeof elem === "string"){
        elem = document.querySelector(elem);
    }
    //make sure elem exists
    if (!elem || !elem.nodeType || elem.nodeType !== 1){
        console.warn("smoothscroll() needs an element or selector to an element");
        return;
    }
    //clamp ease to be between 0.05 and 1
    ease = Math.max(0.05, Math.min(1, ease));
    //get current scroll position
    var currYposition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
    //get target y position
    var targetY = (function findYPosition(elem){
        if ("function" === typeof elem.getBoundingClientRect){
            return elem.getBoundingClientRect().top;
        }
        var yPosition = 0;
        while (elem.offsetParent){
            yPosition += elem.offsetTop;
            elem = elem.offsetParent;
        }
        return yPosition;
    })(elem);
    //scrolling animation
    function scroll(){
        currYposition += (targetY - currYposition) * ease;
        if (Math.abs(targetY - currYposition) <= ease){
            currYposition = targetY;
        }
        window.scroll(0, currYposition);
        if (currYposition !== targetY){
            requestAnimationFrame(scroll);
        }
    }
    scroll();
}

//-------------------------- carousel --------------------------
var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
    showDivs(slideIndex += n);
}

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides");
    if (n > x.length) {slideIndex = 1} 
    if (n < 1) {slideIndex = x.length} ;
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none"; 
    }
    x[slideIndex-1].style.display = "block"; 
}

