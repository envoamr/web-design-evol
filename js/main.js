// Visible width/height
var width =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;
var height =
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;

// Fill page for next sections, since title moves out of block
document.querySelector("div#intro").style.height = `${height}px`;

// INTRO

// Dropdown title animation
function introTitleAnim() {
  introTitle = "Website Design";
  introTitleDiv = document.querySelector("div#title");

  // Create letter spans
  introTitle.split("").forEach((letter) => {
    span = document.createElement("span");
    text = document.createTextNode(letter);
    span.appendChild(text);
    introTitleDiv.appendChild(span);
  });

  // Animate title dropping
  anime({
    targets: "div#title span",
    easing: "easeInOutElastic",
    translateY: window.innerHeight / 2,
    translateY: [-200, height / 2 - 80],
    duration: 1000,
    delay: anime.stagger(50),
    complete: function (anim) {
      introBallAnim();
    },
  });
}

// Floating balls animation
function introBallAnim() {
  introFloatingDiv = document.querySelector("div#floating");
  ballArray = [];

  // Create ball divs at random positions
  for (let index = 0; index < 10; index++) {
    ballDiv = document.createElement("span");
    dimen = Math.random() * 80 + 30;
    ballDiv.style.width = dimen + "px";
    ballDiv.style.height = dimen + "px";
    ballDiv.style.borderRadius = "50%";
    ballDiv.style.backgroundColor = "#338fff";
    ballDiv.style.position = "absolute";
    ballDiv.style.top = `${Math.random() * (height / 2) + height / 6}px`;
    ballDiv.style.left = `${Math.random() * (width / 2) + width / 6}px`;
    ballDiv.style.overflow = "hidden";
    ballArray.push(ballDiv);
    introFloatingDiv.appendChild(ballDiv);
  }

  // Animate each ball
  ballArray.forEach((ball) => {
    time = Math.random() * 14000 + 10000;

    moveYOne = Math.random() * (height / 4) + 50;
    dimens = [moveYOne, moveYOne * -1];
    moveYOne = dimens[Math.floor(Math.random() * dimens.length)];

    moveXOne = Math.random() * (width / 6) + 50;
    dimens = [moveXOne, moveXOne * -1];
    moveXOne = dimens[Math.floor(Math.random() * dimens.length)];

    moveYTwo = Math.random() * (height / 4) + 50;
    dimens = [moveYTwo, moveYTwo * -1];
    moveYTwo = dimens[Math.floor(Math.random() * dimens.length)];

    moveXTwo = Math.random() * (width / 6) + 50;
    dimens = [moveXTwo, moveXTwo * -1];
    moveXTwo = dimens[Math.floor(Math.random() * dimens.length)];

    initialY = ball.style.top;
    initialX = ball.style.left;

    anime({
      targets: ball,
      keyframes: [
        { translateY: moveYOne, translateX: moveXOne },
        { translateY: moveYTwo, translateX: moveXTwo },
        { translateY: moveYOne * -1, translateX: moveXOne * -1 },
        { translateY: moveYTwo * -1, translateX: moveXTwo * -1 },
      ],
      direction: "alternate",
      duration: time,
      easing: "easeOutQuad",
      loop: true,
    });
  });

  // Animate showcase button
  let button = document.querySelector("div#intro a");
  button.style.transform = `translateY(${height / 2 - 70}px)`;
  button.classList.add("fadeIn2");
  button.classList.remove("hide");
}

function initScroll() {
  function scrollToEle(element) {
    document.querySelector(element).scrollIntoView({
      behavior: "smooth",
    });
  }

  // Start journey
  document.querySelector("div#intro a").addEventListener("click", () => {
    scrollToEle("div#showcase");
  });

  // Automate all carousels scroll animation
  let years = ["2020", "2015", "2010", "2005", "2000", "1995"];
  years.forEach((year) => {
    document
      .querySelector(`#carousel-control-prev-${year}`)
      .addEventListener("click", () => {
        scrollToEle(`div#websites-${year}`);
        // scrollToEle(`#main-carousel-${year}`)
      });
    document
      .querySelector(`#carousel-control-next-${year}`)
      .addEventListener("click", () => {
        scrollToEle(`div#websites-${year}`);
        // scrollToEle(`#main-carousel-${year}`)
      });
  });
}

function initCarousel() {
  // When document is ready, activate all carousels
  $(document).ready(function () {
    // Automate carousels
    let years = ["2020", "2015", "2010", "2005", "2000", "1995"];
    years.forEach((year) => {
      $(`#main-carousel-${year}`).carousel();
      $(`#carousel-control-prev-${year}`).click(function () {
        $(`#main-carousel-${year}`).carousel("prev");
      });
      $(`#carousel-control-next-${year}`).click(function () {
        $(`#main-carousel-${year}`).carousel("next");
      });
    });
  });
}

// Initialize elevator button to go to the top
function initElevator() {
  let button = document.querySelector("div#go-up button");
  finishTime = 10000;

  window.onload = function () {
    new Elevator({
      element: button,
      mainAudio: "./audio/elevator.mp3",
      endAudio: "./audio/ding.mp3",
    });
  };

  button.addEventListener("click", () => {
    endingScene(finishTime);
  });
}

function endingScene(finishTime) {
  // Showcase
  document.querySelector("div#showcase div.title p").textContent =
    "Enjoyed having you!";
  // Title and floating
  document.querySelector("div#intro div#title").classList.add("d-none");
  document.querySelector("div#intro div#floating").classList.add("d-none");
  // Topic and author
  document.querySelector("div#intro div#bye").style.transform = `translateY(${
    height / 2 - height / 5.87
  }px)`;
  document.querySelector("div#intro div#bye").classList.remove("d-none");

  // Buttons
  let oldBtn = document.querySelector("div#intro a");

  let newBtn = oldBtn.cloneNode(true);
  newBtn.id = "code";
  newBtn.innerHTML = 'code<i class="fas fa-external-link-alt ml-2"></i>';
  newBtn.href = "https://github.com/envoamr/web-design-evol";
  newBtn.target = "_blank";
  newBtn.className = "btn btn-dark btn-pill text-primary m-1 pl-4 pr-4";
  newBtn.style.transform = `translateY(${height / 3}px)`;

  let newBtn2 = newBtn.cloneNode(true);
  newBtn2.id = "again";
  newBtn2.innerHTML = 'again<i class="fas fa-redo ml-2"></i>';
  newBtn2.href = window.location;
  newBtn2.target = "";

  // Add button to document
  document.querySelector("div#intro a").classList.add("d-none");
  document.querySelector("div#intro").appendChild(newBtn);
  document.querySelector("div#intro").appendChild(newBtn2);

  setTimeout(() => {
    // document.querySelector('div#go-up').classList.add('d-none')
    // document.querySelector('div#showcase').classList.add('d-none')
    document.title = "Evolution of Web Design by envoamr";
    document.querySelector("div#intro").style.height = `100vh`;
    document.body.style.overflow = "hidden";
  }, finishTime + 1000);
}

// Function calls
introTitleAnim();
initScroll();
initCarousel();
initElevator();
