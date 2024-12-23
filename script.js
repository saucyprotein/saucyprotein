// JavaScript for Saucy Landing Page

// Placeholder for live ticker logic
console.log("Script.js is connected and ready!");

// Function to simulate a counter with flip effect
let count = 1000; // Initial count value
let previousCount = 1000; // Previous count value for comparison

let tickerDigits = document.querySelectorAll(".counter-digit"); // Get all the counter digit elements

function updateTicker() {
  let countStr = count.toString().padStart(3, "0"); // Ensure we have at least 3 digits
  let previousCountStr = previousCount.toString().padStart(3, "0");

  // Update each digit's content
  tickerDigits.forEach((digit, index) => {
    let newDigit = countStr.charAt(index);
    let oldDigit = previousCountStr.charAt(index);

    // If the digit has changed, apply a flip animation
    if (newDigit !== oldDigit) {
      digit.classList.add("flip");
      setTimeout(() => {
        digit.textContent = newDigit;
        digit.classList.remove("flip");
      }, 500); // Flip duration
    } else {
      digit.textContent = newDigit;
    }
  });

  // Store current count after animation completes to avoid mid-animation updates
  setTimeout(() => {
    previousCount = count;
  }, 200); // Ensure it's updated after the flip
}

// Fetch current counter value from the Google Apps Script Web App
async function getCounterValue() {
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbzZIlqBB7svYvPYchds9bWMpjuJSNn5wp2Bj703eUXdzSlqM4jtf2FBsUEkN0_rskHl/exec"
    ); // Your Web App URL
    const data = await response.json();
    count = data.count; // Get the count value from the response
    updateTicker(); // Update the ticker with the fetched value
  } catch (error) {
    console.error("Error fetching counter value:", error);
  }
}

// Call the function when the page loads to initialize the ticker with the current value
window.onload = function () {
  getCounterValue();
};

document
  .getElementById("waitlist-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var form = event.target;
    var formData = new FormData(form);

    fetch(
      "https://script.google.com/macros/s/AKfycbzZIlqBB7svYvPYchds9bWMpjuJSNn5wp2Bj703eUXdzSlqM4jtf2FBsUEkN0_rskHl/exec",
      {
        method: "POST",
        body: formData
      }
    )
      .then((response) => response.json()) // Expect JSON response
      .then((data) => {
        // Success confirmation message
        alert("You're on Saucy's waitlist!");
        form.reset(); // Reset the form fields

        // Update the counter with the new value received from the server
        count = data.count; // Update count with the value returned from the server
        updateTicker(); // Update the ticker
      })
      .catch((error) => {
        // Error message
        alert("Something went wrong. Please try again later.");
      });
  });
