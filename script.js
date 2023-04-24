// Grabbing html elements from the DOM
const beginBtn = document.getElementById("beginBtn");
const inputElement = document.getElementById("userInput");
const form = document.getElementById("inputForm");
const container = document.querySelector(".container");
const results = document.getElementById("resultContainer");
const searchButton = document.getElementById("searchBtn");

// Set the size of the array to 21
let size = 21;
// Initialize an array of size 21
let array = [size];

// Add an event listener to the begin button for a click event
beginBtn.addEventListener("click", () => {
  // Remove the "hide" class from the inputElement and searchButton
  inputElement.classList.remove("hide");
  searchButton.classList.remove("hide");
  // Remove the begin button
  beginBtn.remove();

  // Create an element with directions and append it to the container
  const directions = document.createElement("h4");
  directions.innerHTML =
    "Select a number from the array below to determine which search algorithm, binary or sequential, can more efficiently find your chosen number.";
  container.append(directions);

  // Call the function that populates the array with 20 random numbers from 1-99, then the list function puts them in a list element and appends them
  populateArray(array, size);
  list();

  // Create an element for the sequential search results and append it to the results element
  const seqResult = document.createElement("h4");
  seqResult.setAttribute("id", "seqResult");
  seqResult.classList.add("result");
  results.append(seqResult);

  // Create an element for the binary search results and append it to the results element
  const binResult = document.createElement("h4");
  binResult.setAttribute("id", "binResult");
  binResult.classList.add("result");
  results.append(binResult);
});

// Add an event listener to the search button for a click event
searchButton.addEventListener("click", () => {
  // Remove the "hide" class from the results element
  results.classList.remove("hide");
  // Get the user input value
  const input = document.getElementById("userInput").value;
  // Sort the array in ascending order
  sortArray(array, size);
  // Call the sequential search function with the array, size, and input
  seqSearch(array, size, input);
  // Call the binary search function with the array, size, and input
  binarySearch(array, size, input);
  // Call the function to get the results of every search
  getResults();
  // Reset the user input form
  form.reset();
});

// This function calls the random function and populates the array with 20 random numbers ranging from 1-99
function populateArray(array, size) {
  for (let i = 0; i < size - 1; i++) {
    array[i] = random();
  }
}

// Generate a random number between 1 and 99
function random() {
  return 1 + Math.floor(Math.random() * 99);
}

// The list function creates an unordered list element and adds every number of the array to the list, then appends it to the container
function list() {
  const listContainer = document.createElement("ul");
  listContainer.classList.add("list");
  array.forEach((item) => {
    let li = document.createElement("li");
    li.innerText = item;
    container.append(listContainer);
    listContainer.append(li);
  });
}

// Sort the array in ascending order using the bubble sort
function sortArray(array, size) {
  maxElement = size - 1;

  for (var i = 0; i < maxElement; i++) {
    for (var j = 0; j < maxElement - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }
}

// Perform binary search on the sorted array to find the input value
function binarySearch(array, size, input) {
  let start = 0;
  let end = size - 1;
  let found = false;
  let searches = 0;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    if (array[mid] == input) {
      searches += 1;
      found = true;
      return [found, searches];
    } else if (array[mid] < input) {
      searches += 1;
      start = mid + 1;
    } else {
      end = mid - 1;
      searches += 1;
    }
  }
  return [found, searches];
}

// Get the results of the searches and display them
function getResults() {
  const input = document.getElementById("userInput").value;
  const binResult = document.getElementById("binResult");
  const [found, searches] = binarySearch(array, size, input);
  let result;

  if (found == true && searches == 1) {
    result = `It took ${searches} search using the binary search algorithm to find ${input}.`;
  } else if (found == true) {
    result = `It took ${searches} searches using the binary search algorithm to find ${input}.`;
  } else {
    result =
      "The number you entered could not be found. Please enter a number from the array above.";
  }
  binResult.innerHTML = result;
}

// Perform sequential search on the array to find the input value
function seqSearch(array, size, input) {
  const seqResult = document.getElementById("seqResult");
  let found = false;
  let searches = 0;
  let result;
  let i = 0;

  while (found == false && i <= size - 1) {
    if (array[i] == input) {
      found = true;
      searches += 1;
      break;
    } else {
      i++;
      searches += 1;
    }
  }

  return searches;

  if (found == true && searches == 1) {
    result = `It took ${searches} search using the sequential search algorithm to find ${input}.`;
  } else if (found == true) {
    result = `It took ${searches} searches using the sequential search algorithm to find ${input}.`;
  } else {
    result =
      "The number you entered could not be found. Please enter a number from the array above.";
  }
  seqResult.innerHTML = result;
}
