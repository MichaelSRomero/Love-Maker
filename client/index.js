// -------------------GLOBAL VARIABLES-------------------- //
const snippets = {
    0: `Don't do it!`,
    1: `You should really find someone else`,
    2: `You can do much, much better`,
    3: `Fun for a day or two, but you'll regret it`,
    4: `Good for 1 or 2 dates`,
    5: `Mehhhhhhhhh`,
    6: `If you feel like settling`,
    7: `A nice flame, but will fizzle`,
    8: `Serious potential`,
    9: `Looks like love!`,
    10: `I hear wedding bells!!!!!`
}

// Adjectives exist at 1 and 3 positions
const iceBreakers = {
    0: ["U up?"],
    1: ["Aside from being", "sexy", ", what do you do for a", "living", "?"],
    2: ["Are you related to Jean-Claude Van Damme? Because Jean-Claude Van Damme you’re", "sexy", "!"],
    3: ["Baby, if you were words on a page, you’d be fine print"],
    4: ["Something’s", "wrong", "with my eyes, because I can’t take them off you"],
    5: ["But the heart's not like a box that gets filled up. It expands in size the more you love."],
    6: ["If you stood in front of the mirror and held up eleven red roses you would see twelve of the most", "beautiful", "things you could ever see."],
    7: ["I just wanted to show this rose how incredibly", "beautiful", "you are."],
    8: ["I think the gaps between my fingers were meant for yours."],
    9: ["Are you as ", "beautiful", "on the inside as you are on the outside?"],
    10: ["How can other people love when I'm using the world's supply on you?"]
}

// -------------------GLOBAL SELECTORS-------------------- //
const scoreTag = document.querySelector(".results-output-container__score");
const snippetTag = document.querySelector(".results-output-container__snippet");
const backButtonTag = document.querySelector('.back-btn--display')
const mainTag = document.querySelector('.main')
const resultsContainerTag = document.querySelector('.results-container--display')
const nameFormTagDisplay = document.querySelector('.name-form--display')
const heartImageTag = document.querySelector('.results-img--display')
const nameForm = document.querySelector(".name-form");
const logoTag = document.querySelector(".logo--display");


function loveScoreGenerator(name, crushName) {
  const key = name + crushName;
  if (localStorage.hasOwnProperty(key)) return JSON.parse(localStorage.getItem(key));
  const randomScore = Math.ceil(Math.random() * 100)
  const snippetText = snippets[Math.floor(randomScore / 10)]
  const matchDetails = {score: randomScore, snippet: snippetText}
  localStorage.setItem(key, JSON.stringify(matchDetails))
  return matchDetails;
}

/*
** Sends the user to the results screen upon submission
*/
nameForm.addEventListener("submit", (event) => {
    // preventing the page from reloading
    event.preventDefault();
    const userNameTag = event.target["user-name"];
    const crushNameTag = event.target["crush-name"];
    const userName = userNameTag.value;
    const crushName = crushNameTag.value;
    if (userName.length > 0 && crushName.length > 0) {
        // upon submission resetting the input values to empty
        userNameTag.value = "";
        crushNameTag.value = "";
        // generating a score and rendering it dynamically
        const calculatorOutput = loveScoreGenerator(userName, crushName);
        scoreTag.textContent = calculatorOutput.score;
        snippetTag.textContent = `"${calculatorOutput.snippet}"`;
        // Setting content for icebreaker
        const iceBreakerTag = document.querySelector(".icebreaker-container__text");
        const iceBreakerArray = iceBreakers[Math.floor(Math.random() * 10)];
        const randomArr = new RandomArray(iceBreakerArray);
        randomArr.randomize().then(ele => {
            iceBreakerTag.textContent = ele.join(" ");
            // hiding the main screen and displaying the results screen
            mainTag.style.background = "none";
            resultsContainerTag.style.display = "inherit";
            heartImageTag.style.display = "inherit";
            backButtonTag.style.display = "inherit";
            nameFormTagDisplay.style.display = "none";
            logoTag.style.display = "none";
        })
    } else {
        userNameTag.classList.add("apply-shake")
        crushNameTag.classList.add("apply-shake")
        removeAnimation(userNameTag)
        removeAnimation(crushNameTag)
    }
})

/*
** Goes to the previous screen upon click
*/
backButtonTag.addEventListener("click", (e) => {
    // hides the current pages tags
    resultsContainerTag.style.display = "none";
    heartImageTag.style.display = "none";
    backButtonTag.style.display = "none";
    // changes the background to pink
    mainTag.style.background = "rgb(255, 19, 110)";
    nameFormTagDisplay.style.display = "inherit";
    logoTag.style.display = "inherit";
})

/*
** Removes Animation from inputs
*/
function removeAnimation(node) {
  node.addEventListener("animationend", (e) => node.classList.remove("apply-shake"))
}