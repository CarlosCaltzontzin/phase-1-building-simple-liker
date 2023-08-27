// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
document.addEventListener("DOMContentLoaded", () => {
  // Step 1: Add an event listener to the heart icons
  const heartIcons = document.querySelectorAll(".like-glyph");
  heartIcons.forEach((heart) => {
    heart.addEventListener("click", () => {
      handleLike(heart);
    });
  });

  // Step 2: Handle the like action
  function handleLike(heart) {
    mimicServerCall()
      .then(() => {
        // Server request success
        toggleHeart(heart);
      })
      .catch((error) => {
        // Server request failure
        displayErrorModal(error);
      });
  }

  // Step 3: Update the heart icon
  function toggleHeart(heart) {
    if (heart.textContent === EMPTY_HEART) {
      heart.textContent = FULL_HEART;
      heart.classList.add("activated-heart");
    } else {
      heart.textContent = EMPTY_HEART;
      heart.classList.remove("activated-heart");
    }
  }

  // Step 4: Display error modal
  function displayErrorModal(errorMessage) {
    const errorModal = document.querySelector("#modal");
    const modalMessage = document.querySelector("#modal-message");
    
    // Set the error message
    modalMessage.textContent = errorMessage;

    // Remove the .hidden class to show the modal
    errorModal.classList.remove("hidden");
    
    // Hide the modal after 3 seconds
    setTimeout(() => {
      errorModal.classList.add("hidden");
    }, 3000);
  }
});

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
