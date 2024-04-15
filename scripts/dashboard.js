// Initialize HTML elements
const chooseFileButton = document.getElementById("chooseFileButton");
const chosenFileText = document.getElementById("chosenFile");
const uploadFileButton = document.getElementById("uploadButton");
const filesList = document.getElementById("files");

// Display user name on dashboard
document.getElementById("user-name").innerHTML = `Hello, ${localStorage.getItem("userId")}`;

// Trigger file input when upload section is clicked
document.getElementById("uploadSection").addEventListener("click", () => {
    chooseFileButton.click();
});

// Update file name when file is chosen or reset
chooseFileButton.addEventListener("change", () => {
    if (chooseFileButton.files.length === 0) {
        chosenFileText.innerHTML = "Choose file to upload (max 300KB)";
        uploadFileButton.disabled = true;
        return;
    }
    chosenFileText.innerHTML = Object.values(chooseFileButton.files)
        .map((file) => file.name)
        .join(", ");
    uploadFileButton.disabled = false;
});

// Upload file to server when upload button is clicked
uploadFileButton.addEventListener("click", async () => {
    uploadFileButton.disabled = true;
    uploadFileButton.innerHTML = LOADING_SPINNER;

    const hash = await electron.sendFileToServer(chooseFileButton.files[0].path);

    if (hash) {
        filesList.innerHTML =
            new File(chooseFileButton.files[0].name, hash.replaceAll('"', "")).toHTML() +
            filesList.innerHTML.replace("No files found", "");
    } else {
        alert("Failed to upload file");
    }

    uploadFileButton.innerHTML = "Upload File";
    chooseFileButton.value = "";
    chosenFileText.innerHTML = "Choose file to upload (max 300KB)";
});

/**
 * Fetch files from server and display them
 */
const fetchFiles = async () => {
    filesList.innerHTML = LOADING_SPINNER;

    try {
        const response = await fetch(`${HOSTNAME}/files`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        });

        if (response.ok) {
            const files = await response.json();
            filesList.innerHTML = files.map((file) => File.fromJSON(file).toHTML()).join("");
            filesList.innerHTML = filesList.innerHTML || "No files found";
        } else {
            throw new Error("Failed to fetch files");
        }
    } catch (error) {
        console.error("Error fetching files:", error);
        filesList.innerHTML = "No files found";
        alert(error.message);
    }
};

fetchFiles(); // Fetch files on page load

/**
 * Delete file from database and remove it from the list
 * @param {string} fileId - ID/hash of the file to delete
 */
const deleteFile = async (fileId) => {
    try {
        const response = await fetch(`${HOSTNAME}/files/${fileId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        });

        if (response.ok) {
            document.getElementById(fileId).remove();
        } else {
            throw new Error("Failed to delete file");
        }
    } catch (error) {
        console.error("Error deleting file:", error);
        alert(error.message);
    }

    if (filesList.children.length === 0) {
        filesList.innerHTML = "No files found";
    }
};

class File {
    /**
     * Represents a file object with name and hash.
     * @param {string} name - Name of the file
     * @param {string} hash - Hash of the file
     */
    constructor(name, hash) {
        this.name = name;
        this.hash = hash;
    }

    static fromJSON(json) {
        return new File(json.name, json.id);
    }

    toJSON() {
        return {
            name: this.name,
            id: this.hash,
        };
    }

    toHTML() {
        return `<div id="${this.hash}" class="file">
        <div class="file-info-container">
          <img class="invert" src="https://cdn-icons-png.flaticon.com/512/2258/2258853.png" height="25px"/>
          <div class="file-info">
            <p>${this.name}</p>
            <p class="hash">${this.hash}</p>
          </div>
        </div>
        <img class="delete-file invert" src="https://cdn-icons-png.flaticon.com/512/2734/2734822.png" height="25px" onclick="deleteFile('${this.hash}')"/>
      </div>`;
    }
}
