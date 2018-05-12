document.addEventListener("DOMContentLoaded", init);


		
		
		function ez_image_scroller(){
			Array.from(document.querySelectorAll(".ez_image_scroller")).forEach(scroller_init);
			function scroller_init(scroller){
				//build nav
				scroller.innerHTML += "<nav><button>&#9664;</button><button>&#9654;</button></nav>";
				//navigation
				scroller.querySelector("nav button:first-of-type").addEventListener("click", scroller_prev);
				scroller.querySelector("nav button:last-of-type").addEventListener("click", scroller_next);
				//show first slide
				scroller.children[0].classList.add("active");
			}
			function scroller_prev(e){
				var scroller = e.target;
				while(!scroller.classList.contains("ez_image_scroller") && scroller !== document.body){
					scroller = scroller.parentElement;
				}
				var curr = scroller.querySelector(".active");
				curr.classList.remove("active");
				if (curr.previousElementSibling){
					curr.previousElementSibling.classList.add("active");
				}
				else {
					scroller.children[scroller.children.length-2].classList.add("active");
				}
			}
			function scroller_next(e){
				var scroller = e.target;
				while(!scroller.classList.contains("ez_image_scroller") && scroller !== document.body){
					scroller = scroller.parentElement;
				}
				var curr = scroller.querySelector(".active");
				curr.classList.remove("active");
				if (curr.nextElementSibling !== scroller.children[scroller.children.length-1]){
					curr.nextElementSibling.classList.add("active");
				}
				else {
					scroller.children[0].classList.add("active");
				}
			}
		}

    // let sliderImages = document.querySelectorAll('.slide'),
    //     arrowRight = document.querySelector('#arrow-left'),
    //     arrowLeft = document.querySelector("#arrow-right"),
    //     current = 0;

    // // Clear all images
    // function reset(){
    //     for(let i = 0; i < sliderImages.length; i ++){
    //         sliderImages[i].style.display = "none";
    //     }
    // }

    // //Init slider
    // function startSlide(){
    //     reset();
    //     sliderImages[0].style.display = "block"
    // }

    // //show prev
    // function slideLeft(){
    //     reset();
    //     sliderImages[current - 1].style.display = "block";
    //     current--;
    // }

    // //Show next
    // function slideRight(){
    //     reset();
    //     sliderImages[current + 1].style.display = "block";
    //     current++;
    // }
    // //Left arrow click
    // arrowLeft.addEventListener("click", function(){
    //     if(current === 0){
    //         current = sliderImages.length;
    //     }
    //     slideLeft();
    // });

    // //Right arrow click
    // arrowRight.addEventListener("click", function(){
    //     if(current === sliderImages.length - 1){
    //         current = -1;
    //     }
    //     slideRight();
    // });

    // startSlide();
    // -------------------------====================================
    
function init(){	
    ez_image_scroller();
    Array.from(document.querySelectorAll("#topnav a[href^='#'], nav section a")).forEach((anchor) => {
        anchor.addEventListener("click", function(e){
            e.preventDefault();
            console.log(e.target.getAttribute("href"));
            smoothscroll(e.target.getAttribute("href"), 0.2);
        });
    });
  
    Array.from(document.querySelectorAll("#wireframes figure a[href*='assets']")).forEach((anchor)=> {
        anchor.href="#";
        anchor.addEventListener("click", function(e){
            e.preventDefault();
            var figure = e.target;
            while(figure.tagName.toLowerCase()!=="figure"){
                figure = figure.parentElement;
            }
            figure = figure.outerHTML.slice(0);
            console.log(figure);
            var aside = document.querySelector("aside");
            aside.innerHTML = figure;
            aside.className = "active";
            console.log(aside);
        });
    });

    var aside = document.querySelector("aside");
    aside.addEventListener("click", (e) => {
        // var aside = e.target;
        // while(aside.tagName.toLowerCase !== "aside"){
        
        aside.className = "";

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
// var slideIndex = 1;
// showDivs(slideIndex);

// function plusDivs(n) {
//     showDivs(slideIndex += n);
// }

// function showDivs(n) {
//     var i;
//     var slides = document.getElementsByClassName("mySlides");
//     console.log("button clicked");
//     if (n > slides.length) {slideIndex = 1} 
//     if (n < 1) {slideIndex = slides.length} ;
//     for (i = 0; i < slides.length; i++) {
//         slides[i].style.display = "none"; 
//     }
//     slides[slideIndex-1].style.display = "block"; 
// }