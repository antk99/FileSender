# File Sender Desktop Application

<div style="display: flex; align-items: center; gap: 8px;">

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/2560px-Amazon_Web_Services_Logo.svg.png" alt="AWS logo" width="150px" />

<img src="https://assets-global.website-files.com/627ca6f747706dac04ccaba1/63c14fc134c432153431a0aa_logo-aws-header.png" alt="AWS API Gateway" width="150px" />

<img src="https://i.imgur.com/AzyGG2x.png" alt="AWS Lambda" width="150px" />

<img src="https://files.cdata.com/media/media/i3nhanbw/20191018-dynamodb-performance-0.png" alt="AWS DynamoDB" width="150px" />

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Electron_Software_Framework_Logo.svg/2048px-Electron_Software_Framework_Logo.svg.png" alt="Electron.js" width="150px" />

<img src="https://miro.medium.com/v2/resize:fit:1400/1*nr87r9gOkPvKuDl6U0nhig.png" alt="Node.js" width="150px" />

</div>

## Overview

File Sender is a desktop application designed to allow users to securely send files to a server hosted on the AWS cloud platform. The application gathers relevant information about selected files, sends it to the server, and displays a unique hash received as a confirmation message.

## Installation

To install and run the File Sender desktop application, you can either download the executable from the releases on this GitHub, or download the code and built it yourself.

### Instructions for Building It Yourself

Before you get started, you need to make sure you have Node.js installed on your system: https://nodejs.org/en. Run the following command to make sure Node.js is installed correctly.
```bash
node -v
```

1. **Clone Repository**:
    ```bash
    git clone https://github.com/antk99/FileSender.git
    ```
2. **Install Dependencies**:
   Navigate to the project directory and install dependencies using npm:
    ```bash
    cd FileSender
    npm install
    ```
3. **Run the Application**:
   Start the application by running the following command:
    ```bash
    npm start
    ```
4. **Build the Executable (Optional)**:
   Build the executable by running the following command:
    ```bash
    npm run package
    ```
    You will find the executable file in the **out** folder.

## Logins

There is currently no sign up functionality, so use the following accounts to access the application:

### Account 1

```text
userId=admin
password=pY^N@2S6bk4~
```

### Account 2

```text
userId=user
password=%584Iy,RM0£<
```

## Important

The AWS Gateway API, Lambda Functions, and Dynamo database will be shutdown soon, which will break the application completely.
