// JavaScript for Saucy Landing Page

// Placeholder for live ticker logic
console.log("Script.js is connected and ready!");

// Function to simulate a counter with flip effect
let count = 0; // Initial count value
let tickerDigits = document.querySelectorAll(".counter-digit"); // Get all the counter digit elements

function updateTicker() {
  count++; // Increment the count

  // Split count into individual digits
  let countStr = count.toString().padStart(3, "0"); // Ensure we have at least 3 digits

  // Update each digit's content
  tickerDigits.forEach((digit, index) => {
    digit.textContent = countStr.charAt(index); // Set each digit accordingly
  });
}

// Test - Simulate a counter update every 5 seconds
// setInterval(updateTicker, 5000);

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
      .then((response) => response.text())
      .then((data) => {
        // Success confirmation message
        alert("You're on Saucy's waitlist!");
        form.reset(); // Reset the form fields
        updateTicker();
      })
      .catch((error) => {
        // Error message
        alert("Something went wrong. Please try again later.");
      });
  });
