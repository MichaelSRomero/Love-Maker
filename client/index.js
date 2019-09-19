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

const iceBreakers = {
    0: `U up?`,
    1: `Aside from being sexy, what do you do for a living?`,
    2: `Are you related to Jean-Claude Van Damme? Because Jean-Claude Van Damme you’re sexy!`,
    3: `Baby, if you were words on a page, you’d be fine print`,
    4: `Something’s wrong with my eyes, because I can’t take them off you`
}



function loveScoreGenerator(name, crushName) {
    // const cache = {};
    // function randomNum(name, targetName) {
        const key = name + crushName;
        if (localStorage.hasOwnProperty(key)) return JSON.parse(localStorage.getItem(key));
        const randomScore = Math.ceil(Math.random() * 100)
        const snippetText = snippets[Math.floor(randomScore / 10)]
        const matchDetails = {score: randomScore, snippet: snippetText}
        localStorage.setItem(key, JSON.stringify(matchDetails))
        return matchDetails;
        // cache[key] = {score: randomScore, snippet: snippetText};
        // console.log(cache);
        
        // return cache[key];
    // }
    // return randomNum;
}

const scoreTag = document.querySelector(".results-output-container__score");
const snippetTag = document.querySelector(".results-output-container__snippet");
const backButtonTag = document.querySelector('.back-btn--display')
const mainTag = document.querySelector('.main')
const resultsContainerTag = document.querySelector('.results-container--display')
const nameFormTagDisplay = document.querySelector('.name-form--display')
const heartImageTag = document.querySelector('.results-img--display')
const nameForm = document.querySelector(".name-form");

nameForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const userNameTag = event.target["user-name"];
    const crushNameTag = event.target["crush-name"];
    const userName = userNameTag.value;
    const crushName = crushNameTag.value;
    userNameTag.value = "";
    crushNameTag.value = "";

    const calculatorOutput = loveScoreGenerator(userName, crushName);
    scoreTag.textContent = calculatorOutput.score;
    snippetTag.textContent = calculatorOutput.snippet;
    // Setting content for icebreaker
    const iceBreakerTag = document.querySelector(".icebreaker-container__text");
    const iceBreakerString = iceBreakers[Math.floor(Math.random() * 5)];
    iceBreakerTag.textContent = iceBreakerString;

    mainTag.style.background = "none";
    resultsContainerTag.style.display = "inherit";
    heartImageTag.style.display = "inherit";
    backButtonTag.style.display = "inherit";
    nameFormTagDisplay.style.display = "none";
})

backButtonTag.addEventListener("click", (e) => {
    resultsContainerTag.style.display = "none";
    heartImageTag.style.display = "none";
    backButtonTag.style.display = "none";
    mainTag.style.background = "rgb(255, 19, 110)";
    nameFormTagDisplay.style.display = "inherit";
})
