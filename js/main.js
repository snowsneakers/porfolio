const TypeWriter = function (txtElement, words, wait = 3000) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = "";
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
};

//type method

TypeWriter.prototype.type = function () {
  //current index of word
  const current = this.wordIndex % this.words.length;
  //get full text of current word
  const fullTxt = this.words[current];
  //check if deleting
  if (this.isDeleting) {
    //remove char
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    // add char
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  //insert txt into element

  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

  // inital type speed
  let typeSpeed = 250;

  if (this.isDeleting) {
    typeSpeed /= 2;
  }

  // is word complete

  if (!this.isDeleting && this.txt === fullTxt) {
    //make pause at end
    typeSpeed = this.wait;
    //set is delete to true
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    //move to the next word
    this.wordIndex++;
    //pause before start typing
    typeSpeed = 500;
  }

  setTimeout(() => this.type(), typeSpeed);
};

//init on dom load

document.addEventListener("DOMContentLoaded", init);
// init app
function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");
  //init typewriter
  new TypeWriter(txtElement, words, wait);
}

let links = document.querySelectorAll("a");
let paths = document.querySelectorAll("path");
let moon = document.querySelector(".moon");
let sun = document.querySelector(".sun");


  // dark mode
let darkMode = localStorage.getItem("darkMode");
const darkModeButton = document.querySelectorAll(".darkModeButton");

  //enable dark mode

const enableDarkMode = () => {
  document.body.classList.add("darkMode");
  localStorage.setItem("darkMode", "enabled");
  links.forEach((link) => {
    link.style.color = "rgb(233, 231, 213)";
  });
  paths.forEach((path) => {
    path.style.fill = "rgb(233, 231, 213)";
  });
  moon.classList.add("hidden");
  sun.classList.remove("hidden");
};

  //disable dark mode

const disableDarkMode = () => {
  document.body.classList.remove("darkMode");
  localStorage.setItem("darkMode", null);
  links.forEach((link) => {
    link.style.color = "#191919";
  });
  paths.forEach((path) => {
    path.style.fill = "#191919";
  });
  moon.classList.remove("hidden");
  sun.classList.add("hidden");
};

if (darkMode === "enabled") {
  enableDarkMode();
}

darkModeButton.forEach((button) => {
  button.addEventListener("click", () => {
    darkMode = localStorage.getItem("darkMode");
    if (darkMode !== "enabled") {
      enableDarkMode();
    } else {
      disableDarkMode();
    }
  });
});

const sections = document.querySelectorAll(".sectionContainer");
const navLi = document.querySelectorAll("nav ul li");
const scrollArrow = document.querySelector('.scrollActivate')

// reactive header

window.onscroll = () => {
  var current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (scrollY >= sectionTop - 60) {
      current = section.getAttribute("id");
    }
  });
  navLi.forEach((li) => {
    li.classList.remove("active");
    if (li.classList.contains(current)) {
      li.classList.add("active");
      document.querySelector("h2").innerText = current;
    }
  });
  if(scrollY !== 0){
    scrollArrow.classList.add('hidden')
  } else{
    scrollArrow.classList.remove('hidden')
  }
};

