import { fetchJoke } from "./fetching";
import { getSavedJokes, removeJoke, saveJoke } from "./storing";
import "./styles/main.scss";

const currentJokeEl = document.querySelector(".current-joke__text");
const loadNewJokeBtn = document.querySelector(".current-joke__generate");
const savedJokeBtn = document.querySelector(".current-joke__save");
const savedJokesListEl = document.querySelector(".saved-jokes__list");

let currentJoke = "";

async function loadNewJoke(){
  const joke = await fetchJoke();

  if (!currentJoke){
    savedJokeBtn.classList.remove("current-joke__save--disabled");
  }

  currentJoke = joke;
  currentJokeEl.innerText = joke;
}
function saveCurrentJoke(){
  if(currentJoke){
    saveJoke(currentJoke);
    renderSavedJokes();
  }
}

function removeSavedJoke(index){
  removeJoke(index);
  renderSavedJokes();
}
window.removeSavedJoke = removeSavedJoke;

function renderSavedJokes(){
  const savedJokes = getSavedJokes();

  let html = "";

  savedJokes.forEach((joke, index) => {
    html += `
    <div class="saved-joke">
            <div class="saved-joke__text">
            ${joke}
            </div>
            <button class="saved-joke__remove" onclick="removeSavedJoke(${index})">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="saved-joke__remove-icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </div>
    
    `; 
  });

  if(!html) html = "<em>No Jokes has been Saved.</em>";

  savedJokesListEl.innerHTML = html;
}

loadNewJokeBtn.addEventListener("click", loadNewJoke);
savedJokeBtn.addEventListener("click", saveCurrentJoke);

renderSavedJokes();