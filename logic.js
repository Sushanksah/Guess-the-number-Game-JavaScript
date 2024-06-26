let randomNumber = parseInt(Math.random()*100 + 1);

const userInp = document.querySelector(".guessField");
const btn = document.querySelector(".submit");
const prvGuess = document.querySelector(".guesses");
const remGuess = document.querySelector(".lastResult");
const loworhi = document.querySelector(".loworhi");
const resultPara = document.querySelector(".resultPara");

const p = document.createElement(`p`);

let playGame = true;

let previousGuess = [];
let attempts = 1;

if(playGame){
    btn.addEventListener("click", (event) => {
        event.preventDefault();
        const guess = parseInt(userInp.value);
        console.log(guess);
        validate(guess);
    })
}

const validate = (guess) => {
    if(isNaN(guess)){
        alert("Please Enter a Number");
    }else if (guess < 1){
        alert("Please Enter a Number Greater than 1");
    }else if (guess > 100){
        alert("Please Enter a Number Less than 100");
    }else {
        previousGuess.push(guess);
        if(attempts === 11) {
            displayGuess(guess);
            displayMessage(`Game Over. Random number was ${randomNumber}`);
            endGame();
        } else {
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

const checkGuess = (guess) => {
    if(guess === randomNumber) {
        displayGuess(guess);
        displayMessage(`You guessed it Right.`);
        endGame();
    } else if (guess < randomNumber) {
        displayMessage (`The number you guessed is too low`);
    } else if (guess > randomNumber) {
        displayMessage (`The number you guessed is too high`);
    }
};

const displayGuess = (guess) => {
    userInp.value = ``;
    prvGuess.innerHTML += `${guess} `;
    attempts++;
    remGuess.innerHTML = `${11 - attempts}`;
}

const displayMessage = (message) => {
    loworhi.innerHTML = `<h2> ${message} </h2>`;
}

const endGame = () => {
    userInp.value = ``;
    userInp.setAttribute(`disabled`, ``);
    p.innerHTML = `<h2 id = "newgame">New Game</h2>`;
    resultPara.appendChild(p);
    playGame = false;
    newGame();
}

const newGame = () => {
    const newGame = document.querySelector("#newgame");
    newGame.addEventListener("click", () => {
        randomNumber = parseInt(Math.random()*100 + 1);
        previousGuess = [];
        attempts = 1;
        prvGuess.innerHTML = ``;
        remGuess.innerHTML = `${11 - attempts}`;
        userInp.removeAttribute("disabled");
        resultPara.removeChild(p);
        playGame = true;
    }) 
}