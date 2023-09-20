// Locomotive js for smooth scroll copied from locomotive js github
// But locomotive and gsap can't work together for that I have copied code from locomotive codepen and modified that code

function init(){
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
    
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);
    
    // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });
    
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();    
}

init();

// Purple block on the time of hovering the navbar 
var h4 = document.querySelectorAll("#nav h4");
var Purple = document.querySelector("#purple");
var text = document.querySelector("marquee h1");

for (var i = 0; i < 4; i++) {
  (function(index) { // Create a closure to capture the current value of i
    h4[index].addEventListener("mouseenter", function() {
      Purple.style.opacity = "1";
      Purple.style.display = "flex";
      if (index === 0) {
        text.innerHTML = "HOME HOME HOME HOME HOME HOME HOME HOME HOME HOME HOME HOME ";
      }
      if (index === 1) {
        text.innerHTML = "WORK WORK WORK WORK WORK WORK WORK WORK WORK WORK WORK WORK ";
      }
      if (index === 2) {
        text.innerHTML = "STUDIO STUDIO STUDIO STUDIO STUDIO STUDIO STUDIO STUDIO STUDIO ";
      }
      if (index === 3) {
        text.innerHTML = "CONTACT CONTACT CONTACT CONTACT CONTACT CONTACT CONTACT CONTACT ";
      }
    });

    h4[index].addEventListener("mouseleave", function() {
      Purple.style.opacity = "0";
      Purple.style.display = "none";
    });
  })(i); // Pass the current value of i into the closure
}


// cursor styling 
var crsr = document.querySelector("#cursor");
var main = document.querySelector("#main");
document.addEventListener("mousemove", function(dets){
  crsr.style.left = dets.x + 3 + "px";
  crsr.style.top = dets.y + 3 + "px";
})

var video = document.querySelector(".page1 video");
video.addEventListener("mouseenter",function(){
  // crsr.style.left = dets.x - 20 +"px";
  crsr.style.width = "70px";
  crsr.style.height = "20px";
  crsr.style.borderRadius = "10px";
  crsr.innerHTML = "Sound";
})
video.addEventListener("mouseleave",function(){
  // crsr.style.left = dets.x + "px";
  crsr.style.width = "20px";
  crsr.style.height = "20px";
  crsr.style.borderRadius = "10px";
  crsr.innerHTML = " ";
})


// Timeline is a type of class for giving animation on the time of scroll 
var tl = gsap.timeline({
    scrollTrigger:{
        trigger: ".page1 h2",
        scroller: "#main",
        // markers: true,
        start: "top 25%",
        end: "top 0%",
        scrub: 3
    }
})

tl.to(".page1 h2", {
    x: -100
},"anim")

tl.to(".page1 h3",{
    x:100
},"anim")

tl.to(".page1 video",{
    width: "90%"
},"anim")

// For backgroundColor changing to white on the time of scrolling
var tl2 = gsap.timeline({
  scrollTrigger:{
      trigger: ".page1 h2",
      scroller: "#main",
      // markers: true,
      start: "top -80%",
      end: "top -80%",
      scrub: 3
  }
})

tl2.to("#main",{
  backgroundColor: "white"
})

// For backgroundColor changing to black on the time of scrolling
var tl2 = gsap.timeline({
  scrollTrigger:{
      trigger: ".page1 h2",
      scroller: "#main",
      // markers: true,
      start: "top -280%",
      end: "top -300%",
      scrub: 3
  }
})

tl2.to("#main",{
  backgroundColor: "black"
})


//Image hovering in page5
var boxes = document.querySelectorAll(".box");
boxes.forEach(function(elem){
  elem.addEventListener("mouseenter",function(){
    var att = elem.getAttribute("data-image");
    // console.log(att);
    crsr.style.width = "400px";
    crsr.style.height = "300px";
    crsr.style.borderRadius = "0";
    crsr.style.backgroundImage = `url(${att})`;
  })
  
  elem.addEventListener("mouseleave",function(){
    crsr.style.width = "20px";
    crsr.style.height = "20px";
    crsr.style.borderRadius = "10px";
    crsr.style.backgroundImage = `none`;
  })
})
