// Initialize HTML elements
const signinButton = document.getElementById("signInButton");

/**
 * Handles the sign in process. Sends a POST request to the server with the user ID and password.
 * If successful, stores the user ID and auth token in local storage.
 */
const signin = async () => {
    signinButton.disabled = true;
    signinButton.innerHTML = LOADING_SPINNER;

    const userId = document.getElementById("userid").value;
    const password = document.getElementById("password").value;

    if (!userId || !password) {
        alert("Please enter user ID and password");
        signinButton.disabled = false;
        signinButton.innerHTML = "Sign In";
        return;
    }

    const credentials = {
        userId,
        password: electron.hashString(password),
    };

    try {
        const response = await fetch(`${HOSTNAME}/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || data.error || data || "Failed to sign in");
        }

        localStorage.setItem("userId", userId);
        localStorage.setItem("authToken", data);
    } catch (error) {
        alert(error.message);
        signinButton.disabled = false;
        signinButton.innerHTML = "Sign In";
        return;
    }

    loadPage("pages/dashboard.html");
};

// Sign in when button is clicked
signinButton.addEventListener("click", signin);

// Sign in when Enter key is pressed
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        signin();
    }
});
