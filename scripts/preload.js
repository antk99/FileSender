const { contextBridge } = require("electron");
const fs = require("fs");
const path = require("path");
const os = require("os");
const crypto = require("crypto");

/**
 * Hash a string using SHA-256 algorithm.
 * @param {string} str - String to hash
 * @returns The hashed string.
 */
const hashString = (str) => {
    return crypto.createHash("sha256").update(str).digest("hex");
};

/**
 * Get information about a file.
 * @param {string} filePath - Path to the file on disk
 * @returns The file information.
 */
const getFileInfo = (filePath) => {
    try {
        const stats = fs.statSync(filePath);
        return {
            name: path.basename(filePath),
            size: stats.size, // in bytes
            lastModified: stats.mtime, // last modified time
        };
    } catch (error) {
        console.error("Error getting file information:", error);
        return null;
    }
};

/**
 * Get the MAC address of the first network interface that has a non-zero MAC address.
 * @returns The first non-zero MAC address.
 */
const getMacAddress = () => {
    const networkInterfaces = os.networkInterfaces();
    for (const networkInterface of Object.values(networkInterfaces)) {
        for (const networkInfo of networkInterface) {
            if (!networkInfo.mac || networkInfo.mac === "00:00:00:00:00:00") {
                continue;
            }
            return networkInfo.mac;
        }
    }
    return null;
};

/**
 * Send a file to the server. The file is read from disk and sent as a base64-encoded string.
 * @param {string} filePath - Path to the file on disk
 * @returns The hash of the file on the server if successful, otherwise an empty string.
 */
const sendFileToServer = async (filePath) => {
    const fileInfo = getFileInfo(filePath);
    const macAddress = getMacAddress();
    const userId = localStorage.getItem("userId");
    if (!fileInfo || !macAddress || !userId) {
        console.error("Failed to get file information, MAC address, or user ID");
        return "";
    }

    // file size must be less than 300KB
    if (fileInfo.size > 300000) {
        alert("File size exceeds 300KB limit");
        return "";
    }

    try {
        const data = fs.readFileSync(filePath);
        const fileData = {
            name: fileInfo.name,
            lastModified: fileInfo.lastModified,
            macAddress,
            file: data.toString("base64"),
        };

        const response = await fetch(`https://714kd0vmo1.execute-api.us-east-1.amazonaws.com/files`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
            body: JSON.stringify(fileData),
        });

        if (response.ok) {
            hash = await response.text();
            return hash;
        } else {
            return "";
        }
    } catch (error) {
        console.error("Error uploading file:", error);
        return "";
    }
};

contextBridge.exposeInMainWorld("electron", {
    sendFileToServer,
    hashString,
});
