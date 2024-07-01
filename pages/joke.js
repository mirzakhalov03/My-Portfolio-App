import { uzbekJokes } from './uzbekJokes.js';
import { memeJokes } from './memeJokes.js';

const $jokeText = document.querySelector(".joke__text");
const $nextBtn = document.querySelector(".nextBtn");
const $langSelect = document.querySelector(".language");

const url = 'https://icanhazdadjoke.com';
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
};

let shownUzbekJokes = [];
let shownMemeJokes = [];
let shownEngJokes = [];

const getRandomJoke = (jokesArray, shownJokes) => {
    if (shownJokes.length === jokesArray.length) {
        shownJokes.length = 0; 
    }
    let randomJoke;
    do {
        randomJoke = jokesArray[Math.floor(Math.random() * jokesArray.length)];
    } while (shownJokes.includes(randomJoke.id));
    shownJokes.push(randomJoke.id);
    return randomJoke;
};

const fetchJoke = () => {
    if ($langSelect.value === "uzb") {
        const joke = getRandomJoke(uzbekJokes, shownUzbekJokes);
        renderJoke(joke);
    } else if ($langSelect.value === "eng") {
        if (shownEngJokes.length < uzbekJokes.length) {
            fetch(url, options)
                .then(response => response.json())
                .then(result => {
                    renderJoke(result);
                    shownEngJokes.push(result.id);
                })
                .catch(error => console.error(error));
        } else {
            console.log("All jokes have been shown. Please reset or add more jokes.");
        }
    } else if ($langSelect.value === "meme") {
        const joke = getRandomJoke(memeJokes, shownMemeJokes);
        renderJoke(joke, true);
    }
};

const renderJoke = (result, isMeme = false) => {
    if (isMeme) {
        $jokeText.innerHTML = `<img class="joke__image" src="${result.imageUrl}" alt="Meme" />`;
    } else {
        $jokeText.textContent = result.joke;
    }
};

const nextJoke = () => {
    fetchJoke();
};

$nextBtn.addEventListener("click", nextJoke);
$langSelect.addEventListener("change", fetchJoke);

fetchJoke();
