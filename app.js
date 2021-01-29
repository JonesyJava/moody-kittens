/**
 * Stores the list of kittens
 * @type {Kitten[]}
 */
let kittens = [];
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * you can use robohash for images
 * https://robohash.org/<INSERTCATNAMEHERE>?set=set4
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  let form = event.target
  let kitten = {
    id: generateId(),
    name: form.name.value,
    mood: "tolerant",
    affection: 5
  }
  kittens.push(kitten)
  saveKittens()
  form.reset()
}

function removeKitten(id) {
  let index = kittens.findIndex(k => k.id == id)
  if (index == -1) {
    throw new Error("Invalid Kitten Id")
  }
  kittens.splice(index, 1)
  saveKittens()
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
  drawKittens()
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let storedKittens = JSON.parse(window.localStorage.getItem("kittens"))
  if (storedKittens) {
    kittens = storedKittens
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let kittenListElement = document.getElementById("kitten-list")
  let kittensTemplate = ""
  kittens.forEach(kitten => {
    kittensTemplate += /*html*/`
    <div class="col m-2 text-center">
      <div class ="card kittens-card">
        <div class="kitten ${kitten.mood}">
          <img class=" image-top kitten" src="https://robohash.org/<${kitten.name}>?set=set4&size=100x100">
        </div>
          <h3>Name: ${kitten.name}</h3>
          <p>Mood: ${kitten.mood}</p>
          <p>Affection: ${kitten.affection}</p>
            <div>
              <button type="button" onclick="pet('${kitten.id}')">PET</button>
            </div>
            <div>
             <button type="button" onclick="catnip('${kitten.id}')">CATNIP</button>
            </div>
            <div>
                <button type="button" class="remove-button" onclick="removeKitten('${kitten.id}')">Remove</button>
            </div>
          </div>
      </div>
    </div>
      `
  })
  kittenListElement.innerHTML = kittensTemplate
}

/**
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {
  let index = kittens.findIndex(kittens => kittens.id == id)
  return kittens.find(k => k.id == id);
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .7
 * increase the kittens affection
 * otherwise decrease the affection
 * save the kittens
 * @param {string} id
 */
function pet(id) {
  let currentKitten = findKittenById(id)
  let randNum = Math.random()
  if (randNum > .7) {
    currentKitten.affection++;
    setKittenMood(currentKitten)
  } else {
    currentKitten.affection--;
    setKittenMood(currentKitten)
  }
  saveKittens()
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
 * @param {string} id
 */
function catnip(id) {
  let currentKitten = findKittenById(id)
  currentKitten.mood = "tolerant"
  currentKitten.affection = 5
  saveKittens()
}

/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) {
  document.getElementById('kitten-list').classList.remove(kitten.mood)
  if (kitten.affection > 6) { kitten.mood = "happy" }
  if (kitten.affection <= 5) { kitten.mood = "tolerant" }
  if (kitten.affection <= 3) { kitten.mood = "angry" }
  if (kitten.affection <= 0) { kitten.mood = "gone" }
  document.getElementById('kitten-list').classList.add(kitten.mood)
  saveKittens()
}

function getStarted() {
  document.getElementById("welcome").remove();
  drawKittens();
}

/**
 * Defines the Properties of a Kitten
 * @typedef {{id: string, name: string, mood: string, affection: number}} Kitten
 *

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );
}
