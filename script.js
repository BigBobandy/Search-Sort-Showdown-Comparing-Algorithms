// Grabbing html elements from the DOM
const beginBtn = document.getElementById("beginBtn");
const inputElement = document.getElementById("userInput");
const form = document.getElementById("inputForm");
const container = document.querySelector(".container");
const results = document.getElementById("resultContainer");
const searchButton = document.getElementById("searchBtn");
const websiteDescription = document.getElementById("website-description");
const sizeSelectElement = document.getElementById("size-selector");
const iterationSelectorElement = document.getElementById(
  "sort-iteration-selector"
);

// Set the size of the array to the default size of 11
let size = 11;
// Initialize an array with the size variable
let array = [size];
// Variable to store user input
let input;
// Defines how many times the sorting algorithms will run with the defualt value being 50
let numRuns = 50;

// Create an element for the bubble sort result
const bubbleSortElement = document.createElement("h4");
bubbleSortElement.setAttribute("id", "bubble-sort-element");
bubbleSortElement.classList.add("result");

// Create an element to display the error message
const errorElement = document.createElement("h4");
errorElement.setAttribute("id", "error-message");

// Create an element for the insertion sort result
const insertionSortElement = document.createElement("h4");
insertionSortElement.setAttribute("id", "insertion-sort-element");
insertionSortElement.classList.add("result");

// Add an event listener to the begin button for a click event
beginBtn.addEventListener("click", () => {
  // Remove the "hide" class from the inputElement and searchButton
  inputElement.classList.remove("hide");
  searchButton.classList.remove("hide");
  websiteDescription.classList.add("hide");
  sizeSelectElement.classList.remove("hide");
  iterationSelectorElement.classList.remove("hide");
  // Remove the begin button
  beginBtn.remove();

  // Create an element with directions and append it to the container
  const directions = document.createElement("h4");
  directions.innerHTML =
    "Choose a number from the array below to compare the efficiency of binary and sequential search algorithms in finding your selected number, as well as the performance of bubble sort and insertion sort in sorting the array";
  container.append(directions);

  // Call the function that populates the array with 20 random numbers from 1-99, then the list function puts them in a list element and appends them
  populateArray(array, size);
  list();

  // Create an element for the sequential search results and append it to the results element
  const sequentialSearchElement = document.createElement("h4");
  sequentialSearchElement.setAttribute("id", "sequential-search-element");
  sequentialSearchElement.classList.add("result");
  results.append(sequentialSearchElement);

  // Create an element for the binary search results and append it to the results element
  const binarySearchElement = document.createElement("h4");
  binarySearchElement.setAttribute("id", "binary-search-element");
  binarySearchElement.classList.add("result");
  results.append(binarySearchElement);

  // Appending the other elements to the results container
  results.append(bubbleSortElement);
  results.append(insertionSortElement);
  results.append(errorElement);
});

sizeSelectElement.addEventListener("change", arraySizeHandler);

iterationSelectorElement.addEventListener("change", iterationHandler);

// Add an event listener to the search button for a click event
searchButton.addEventListener("click", () => {
  // Remove the "hide" class from the results element
  results.classList.remove("hide");

  // Storing what is entered by the user
  input = inputElement.value;

  // Check for input errors
  if (errorHandler(inputElement)) {
    return;
  }

  // Determine if the number is found in the array or not by calling the search functions
  const numberFound =
    sequentialSearch(array, size, input) && binarySearch(array, size, input);

  // If the number is found, display the bubble sort and insertion sort elements
  if (numberFound) {
    bubbleSortElement.style.display = "block";
    insertionSortElement.style.display = "block";
  } else {
    // If the number is not found, hide the bubble sort and insertion sort elements
    bubbleSortElement.style.display = "none";
    insertionSortElement.style.display = "none";
  }

  // Use the measureAverageSortTime function to calculate average time for both sorting algorithms
  const insertionSortAverageTime = measureAverageSortTime(
    insertionSort,
    array,
    numRuns
  );
  const bubbleSortAverageTime = measureAverageSortTime(
    bubbleSort,
    array,
    numRuns
  );

  // Display the average time taken by each sorting algorithm
  bubbleSortElement.innerText = `Bubble sort took an average of ${bubbleSortAverageTime.toFixed(
    3
  )} microseconds to sort the array ${numRuns} times.`;
  insertionSortElement.innerText = `Insertion sort took an average of ${insertionSortAverageTime.toFixed(
    3
  )} microseconds to sort the array ${numRuns} times.`;

  // Appending sort results
  results.append(insertionSortElement);
  results.append(bubbleSortElement);

  // Call the sequential search function with the array, size, and input
  sequentialSearch(array, size, input);
  // Call the binary search function with the array, size, and input
  binarySearch(array, size, input);
  // Reset the user input form
  form.reset();
});

// This function calls the random function and populates the array with 20 random numbers ranging from 1-99
function populateArray(array, size) {
  for (let i = 0; i < size - 1; i++) {
    let randomNumber = random();

    // Check if the random number already exists in the array to prevent duplicates in the array
    while (array.includes(randomNumber)) {
      // Generate a new random number if it already exists in the array
      randomNumber = random();
    }

    // Add the unique random number to the array
    array[i] = randomNumber;
  }
}

// Generate a random number between 1 and 99
function random() {
  return 1 + Math.floor(Math.random() * 99);
}

// Function to create and display an unordered list based on the array
function list() {
  // Create a new unordered list (ul) element and store it in the listContainer variable
  const listContainer = document.createElement("ul");
  // Add the "list" class to the listContainer element
  listContainer.classList.add("list");

  // Clear the existing array before populating it with new values
  array = [];

  // Call the populateArray function to fill the array with values based on the selected size
  populateArray(array, size);

  // Iterate through each item in the array
  array.forEach((item) => {
    // Create a new list item (li) element for each array item
    let li = document.createElement("li");

    // Set the inner text of the list item to the current array item's value
    li.innerText = item;

    // Append the listContainer (ul) to the container element
    container.append(listContainer);

    // Append the newly created list item (li) to the listContainer (ul)
    listContainer.append(li);
  });
}

// Sort the array in ascending order using the bubble sort algorithm
function bubbleSort(array) {
  // Calculate the index of the last element in the array
  maxElement = array.length - 1;

  // Iterate through the array, comparing adjacent elements
  for (var i = 0; i < maxElement; i++) {
    // Iterate through the unsorted part of the array
    for (var j = 0; j < maxElement - i - 1; j++) {
      // Compare adjacent elements and swap them if they are in the wrong order
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
  const binaryElement = document.getElementById("binary-search-element");
  let start = 0;
  let end = size - 1;
  // Variables to store the search information
  let found = false;
  let searches = 0;
  const searchType = "Binary";

  // Sort the array in ascending order
  array.sort((a, b) => a - b);

  // Continue searching as long as the start index is less than or equal to the end index
  while (start <= end) {
    // Calculate the middle index of the current search range
    let mid = Math.floor((start + end) / 2);

    // Check if the middle element matches the input value
    if (array[mid] == input) {
      // Record that we've made another search attempt
      searches += 1;
      // We've found the input value, so update the found flag
      found = true;
      // Exit the loop since we've found the value
      break;
    } else if (array[mid] < input) {
      // Record that we've made another search attempt
      searches += 1;
      // The input value is greater than the middle element, so update the start index to the right of the middle index
      start = mid + 1;
    } else {
      // The input value is less than the middle element, so update the end index to the left of the middle index
      end = mid - 1;
      // Record that we've made another search attempt
      searches += 1;
    }
  }

  // Calling displayResults with the search information as arguments in order to display them
  displayResults(found, searches, binaryElement, searchType);

  // Returning true or false if the number entered by the user is found in the array
  return found;
}

// Perform sequential search on the array to find the input value
function sequentialSearch(array, size, input) {
  const sequentialElement = document.getElementById(
    "sequential-search-element"
  );
  let found = false;
  // Variables to store the search information
  let searches = 0;
  let i = 0;
  const searchType = "Sequential";

  // Keep looking for the input value until it's found or we've reached the end of the array
  while (found == false && i <= size - 1) {
    // Check if the current array element matches the input value
    if (array[i] == input) {
      // We've found the input value, so update the found flag
      found = true;
      // Record that we've made another search attempt
      searches += 1;
      // Exit the loop since we've found the value
      break;
    } else {
      // Move on to the next array element
      i++;
      // Record that we've made another search attempt
      searches += 1;
    }
  }

  // Calling displayResults with the search information as arguments in order to display them
  displayResults(found, searches, sequentialElement, searchType);

  // Returning true or false if the number entered by the user is found in the array
  return found;
}

// Perform insertion sort on the array
function insertionSort(array) {
  // Iterate through the array, starting from the second element (index 1)
  for (let i = 1; i < array.length; i++) {
    // Store the current element as the key
    let key = array[i];
    // Set j to the index before the current element (i - 1)
    let j = i - 1;

    // Move elements of array[0...i-1] that are greater than the key to one position ahead of their current position
    // As long as j is not negative and the current element at index j is greater than the key
    while (j >= 0 && array[j] > key) {
      // Move the element at index j to the next position (j + 1)
      array[j + 1] = array[j];
      // Decrement j
      j = j - 1;
    }
    // Insert the key in its correct position in the sorted part of the array
    array[j + 1] = key;
  }
}

// Function that takes in search algorithm info and displays it
function displayResults(found, searches, element, type) {
  let result = "";
  const searchType = type;

  // If the number is found and it took only 1 search
  if (found == true && searches == 1) {
    // Set the result message
    result = `It took ${searches} search using the ${searchType} search algorithm to find ${input}.`;

    // If the number is found and it took more than 1 search
  } else if (found == true) {
    // Set the result message
    result = `It took ${searches} searches using the ${searchType} search algorithm to find ${input}.`;

    // If the number is not found display the error message only once
  } else if (searchType === "Sequential") {
    // Set the error message
    result =
      "The number you entered could not be found. Please enter a number from the array above.";
  }
  // Update the result element with the message
  element.innerHTML = result;
}

// Function for input validation
function errorHandler(input) {
  // Check if the input field is empty or contains only whitespace
  if (!input.value.trim()) {
    // Set the error message to be displayed
    const errorMessage = "Please enter a number before searching.";

    errorElement.innerText = errorMessage;

    // Append the error message to the results element
    results.appendChild(errorElement);

    // Return true to indicate there's an error
    return true;
  } else {
    // If there's a valid input, remove any previous error message
    if (errorElement.parentElement) {
      errorElement.remove();
    }

    // Return false to indicate there's no error
    return false;
  }
}

// Function to run the sorting algorithms multiple times and calculate the average time
function measureAverageSortTime(sortFunction, array, numRuns) {
  let totalTime = 0;

  // Loop for numRuns iterations to measure the average time taken by the sort function
  for (let i = 0; i < numRuns; i++) {
    // Create a copy of the original array to be sorted,
    // ensuring that the original array remains unmodified during each run
    let arrayCopy = [...array];

    // Record the start time of the sort function using performance.now()
    let startTime = performance.now();

    // Call the sort function using the copied array as input
    sortFunction(arrayCopy);

    // Record the end time of the sort function using performance.now()
    let endTime = performance.now();

    // Calculate the time taken for this specific run (in microseconds)
    // and add it to the totalTime variable
    totalTime += (endTime - startTime) * 1000;
  }

  // Calculate and return the average time the sort function took across all runs (in microseconds)
  return totalTime / numRuns;
}

// Function to handle the changes in the array size selection menu
function arraySizeHandler() {
  const selectedSize = sizeSelectElement.value;
  console.log(selectedSize);

  if (selectedSize === "11") {
    size = 11;
  } else if (selectedSize === "21") {
    size = 21;
  } else if (selectedSize === "41") {
    size = 41;
  } else if (selectedSize === "61") {
    size = 61;
  } else if (selectedSize === "81") {
    size = 81;
  }
  // Generate a new array with the updated size and display it
  array = populateArray(size);

  // Remove the previous list from the container
  const oldList = document.querySelector(".list");
  if (oldList) {
    oldList.remove();
  }

  // Create a new list and display it
  list();
}

// Function to handle the changes in the iteration selection menu
function iterationHandler() {
  // Get the value of the selected iteration option
  const selectedIteration = iterationSelectorElement.value;

  // Check the selected value and update the numRuns variable accordingly
  if (selectedIteration === "50") {
    numRuns = 50;
  } else if (selectedIteration === "100") {
    numRuns = 100;
  } else if (selectedIteration === "1000") {
    numRuns = 1000;
  } else if (selectedIteration === "10000") {
    numRuns = 10000;
  } else if (selectedIteration === "100000") {
    numRuns = 100000;
  }
}
