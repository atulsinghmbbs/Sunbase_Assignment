// Function to handle form submission
const apiURL = "http://localhost:8080"

document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default submission of  form

    // user input
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // rqst to authenticate user
    fetch(`${apiURL}/sunbase/portal/api/assignment_auth.jsp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Checking if the JWT token is received and if receive add it to cookie
        if (data.jwtToken) {
          // Saving token in cookie
          document.cookie = "jwt=" + data.jwtToken + "; path=/";

          // redirecting to home page
          window.location.href = "index.html";
        } else {
          alert("Authentication failed. Please check your credentials.");
        }
      })
      .catch((error) => {
        alert("Invalid username and password!")
        console.error("Error:", error);
      });
  });