const beginBtn = document.getElementById("beginBtn");
const inputElement = document.getElementById("userInput");
const form = document.getElementById("inputForm");
const container = document.querySelector(".container");
const results = document.getElementById("resultContainer");
const searchButton = document.getElementById("searchBtn");

let size = 21;
let array = [size];

beginBtn.addEventListener("click", () => {
  inputElement.classList.remove("hide");
  searchButton.classList.remove("hide");
  beginBtn.remove();
  //Creating the element with directions and appending it
  const directions = document.createElement("h4");
  directions.innerHTML =
    "Select a number from the array below to determine which search algorithm, binary or sequential, can more efficiently find your chosen number.";
  container.append(directions);

  //Calling the function that populates the array with 20 random numbers from 1-99 then the list function puts them in a list element and appends them
  populateArray(array, size);
  list();

  //Creating the element for the sequential search results
  const seqResult = document.createElement("h4");
  seqResult.setAttribute("id", "seqResult");
  seqResult.classList.add("result");
  results.append(seqResult);

  //Creating the element for the binary search results
  const binResult = document.createElement("h4");
  binResult.setAttribute("id", "binResult");
  binResult.classList.add("result");
  results.append(binResult);
});

//Event listener for the search button that will execute the lines of code when clicked
searchButton.addEventListener("click", () => {
  results.classList.remove("hide");
  const input = document.getElementById("userInput").value;
  //First the array is sorted in ascending order
  sortArray(array, size);
  //Then the function for the sequential search of the array is called
  seqSearch(array, size, input);
  //Then the function for binary search is called
  binarySearch(array, size, input);
  //Then the function to get the results of the binary search is called
  getResults();
  //The number entered by the user is cleared so that it cannot be spammed
  form.reset();
});

//This function calls the random function and populates the array with 20 random numbers ranging from 1-99
function populateArray(array, size) {
  for (let i = 0; i < size - 1; i++) {
    array[i] = random();
  }
}

function random() {
  return 1 + Math.floor(Math.random() * 99);
}

//The list function creates a unordered list element and adds every number of the array to the list then appends it
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
