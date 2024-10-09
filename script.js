var radius = 240; // how big of the radius
var autoRotate = true; // auto rotate or not
var rotateSpeed = -60; // unit: seconds/360 degrees
var imgWidth = 170; // width of images (unit: px)
var imgHeight = 220; // height of images (unit: px)

// Link of background music - set 'null' if you dont want to play background music
var bgMusicURL = 'https://api.soundcloud.com/tracks/143041228/stream?client_id=587aa2d384f7333a886010d5f52f302a';
var bgMusicControls = true; // Show UI music control



// ===================== start =======================
// animation start after 1000 miliseconds
setTimeout(init, 1000);

var odrag = document.getElementById('drag-container');
var ospin = document.getElementById('spin-container');
var aImg = ospin.getElementsByTagName('img');
var aVid = ospin.getElementsByTagName('video');
var aEle = [...aImg, ...aVid]; // combine 2 arrays

// Size of images
ospin.style.width = imgWidth + "px";
ospin.style.height = imgHeight + "px";

// Size of ground - depend on radius
var ground = document.getElementById('ground');
ground.style.width = radius * 3 + "px";
ground.style.height = radius * 3 + "px";

function init(delayTime) {
  for (var i = 0; i < aEle.length; i++) {
    aEle[i].style.transform = "rotateY(" + (i * (360 / aEle.length)) + "deg) translateZ(" + radius + "px)";
    aEle[i].style.transition = "transform 1s";
    aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
  }
}

function applyTranform(obj) {
  // Constrain the angle of camera (between 0 and 180)
  if(tY > 180) tY = 180;
  if(tY < 0) tY = 0;

  // Apply the angle
  obj.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + (tX) + "deg)";
}

function playSpin(yes) {
  ospin.style.animationPlayState = (yes?'running':'paused');
}

var sX, sY, nX, nY, desX = 0,
    desY = 0,
    tX = 0,
    tY = 10;

// auto spin
if (autoRotate) {
  var animationName = (rotateSpeed > 0 ? 'spin' : 'spinRevert');
  ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
}

// add background music
if (bgMusicURL) {
  document.getElementById('music-container').innerHTML += `
<audio src="${bgMusicURL}" ${bgMusicControls? 'controls': ''} autoplay loop>    
<p>If you are reading this, it is because your browser does not support the audio element.</p>
</audio>
`;
}

// setup events
// document.onpointerdown = function (e) {
//   clearInterval(odrag.timer);
//   e = e || window.event;
//   var sX = e.clientX,
//       sY = e.clientY;

//   this.onpointermove = function (e) {
//     e = e || window.event;
//     var nX = e.clientX,
//         nY = e.clientY;
//     desX = nX - sX;
//     desY = nY - sY;
//     tX += desX * 0.1;
//     tY += desY * 0.1;
//     applyTranform(odrag);
//     sX = nX;
//     sY = nY;
//   };

//   this.onpointerup = function (e) {
//     odrag.timer = setInterval(function () {
//       desX *= 0.95;
//       desY *= 0.95;
//       tX += desX * 0.1;
//       tY += desY * 0.1;
//       applyTranform(odrag);
//       playSpin(false);
//       if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
//         clearInterval(odrag.timer);
//         playSpin(true);
//       }
//     }, 17);
//     this.onpointermove = this.onpointerup = null;
//   };

//   return false;
// };

// document.onmousewheel = function(e) {
//   e = e || window.event;
//   var d = e.wheelDelta / 20 || -e.detail;
//   radius += d;
//   init(1);
// };

document.getElementById("myform").onsubmit = function(e) {
  e.preventDefault(); // Prevent default form submission
  // Perform any additional actions (e.g., form validation or AJAX request)
  location.reload(); // Refresh the page
};


// /*Latest updates
// please remove if makes the deployed website bad*/

// const facts = [
//   "There are over 5,000 confirmed exoplanets.",
//   "Exoplanets can orbit binary star systems.",
//   "Some exoplanets have atmospheres rich in water vapor.",
//   "Exoplanets are discovered using the transit method.",
//   "Hot Jupiters are gas giants orbiting close to their stars.",
//   "Kepler-22b was the first potentially habitable exoplanet found."
// ];

// let progress = 0;
// const progressBar = document.querySelector('.progress');
// const factText = document.getElementById('fact');
// let factIndex = 0;
// let letterIndex = 0;
// let intervalId;
// let totalResources = 0;
// let loadedResources = 0;

// function typeFact(fact) {
//   if (letterIndex < fact.length) {
//     factText.innerHTML += fact.charAt(letterIndex);
//     letterIndex++;
//     setTimeout(() => typeFact(fact), 100);
//   } else {
//     setTimeout(() => nextFact(), 5000);
//   }
// }

// function nextFact() {
//   factIndex = (factIndex + 1) % facts.length;
//   factText.innerHTML = '';
//   letterIndex = 0;
//   typeFact(facts[factIndex]);
// }

// // Function to update progress bar based on loaded resources
// function updateProgress() {
//   loadedResources++;
//   const progressPercentage = (loadedResources / totalResources) * 100;
//   progressBar.style.width = progressPercentage + '%';

//   if (loadedResources === totalResources) {
//     document.getElementById('loading-screen').style.display = 'none';
//     document.getElementById('content').style.display = 'block';
//   }
// }

// // Track image loading
// function trackResourceLoading() {
//   const images = document.querySelectorAll('img');
//   totalResources = images.length;

//   images.forEach((img) => {
//     if (img.complete) {
//       updateProgress();
//     } else {
//       img.addEventListener('load', updateProgress);
//       img.addEventListener('error', updateProgress); // To handle image load failure
//     }
//   });
// }

// // Start typing facts and tracking resources
// document.addEventListener('DOMContentLoaded', function () {
//   typeFact(facts[factIndex]);
//   trackResourceLoading(); // Start tracking image loading
// });
