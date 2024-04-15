const HOSTNAME = "https://714kd0vmo1.execute-api.us-east-1.amazonaws.com";
const LOADING_SPINNER = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';

/**
 * Injects the HTML of the page into the root div and executes any scripts in the page.
 * @param {string} pageName - Name of the page to load (e.g., "pages/signin.html").
 */
const loadPage = (pageName) => {
    const rootDiv = document.getElementById("root");
    fetch(pageName)
        .then((response) => response.text())
        .then((html) => {
            rootDiv.innerHTML = html;
            // Execute scripts after injecting HTML
            const scripts = rootDiv.querySelectorAll("script");
            scripts.forEach((script) => {
                if (script.src) {
                    // If script has a src attribute, create a new script element and set its src attribute
                    const newScript = document.createElement("script");
                    newScript.src = script.src;
                    document.head.appendChild(newScript);
                } else {
                    // If script does not have a src attribute, execute its content
                    eval(script.innerText);
                }
            });
        });
};

loadPage("pages/signin.html"); // Load the signin page by default
