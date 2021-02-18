


const inquirer = require("inquirer")
const fs = require("fs");
const axios = require("axios");

const generate = require("./generate.js");

const questions = [

  {
    type: "input",
    name: "title",
    message: "What is your project title?",
  },
 
  {
    type: "input",
    name: "badge",
    message: "Please list any badge links for this project: ",
  },

  {
    type: "input",
    name: "description",
    message: "Type your description for your project: ",
  },
  
  {
    type: "input",
    name: "installation",
    message: "Please provide your project's installation instructions: ",
  },
  
  {
    type: "list",
    name: "license",
    message: "Please provide project (any) license(s): ",
    choices: [
      "GNU AGPLv3",
      "GNU GPLv3",
      "GNU LGPLv3",
      "Mozilla Public License 2.0",
      "Apache License 2.0",
      "MIT License",
      "Boost Software License 1.0",
      "The Unlicense",
    ],
  },
 
  {
    type: "input",
    name: "license",
    message: "Please provide project (any) license(s): ",
  },
  
  {
    type: "input",
    name: "contribute",
    message: "Please provide the contributing members of the project: ",
  },
 
  {
    type: "input",
    name: "test",
    message: "Please provide the project tests: ",
  },
  
  {
    type: "input",
    name: "username",
    message: "What is your GitHub username? ",
  },

  {
    type: "input",
    name: "repository",
    message: "What is the link to your GitHub repository? ",
  },
];

inquirer.prompt(questions).then(function (data) {
    const gitHubUrl = `https://api.github.com/users/${data.username}`;
  
    axios.get(gitHubUrl).then(function (res) {
      const gitHubData = {
        gitHubImage: res.data.avatar_url,
        email: res.data.email,
        profile: res.data.html_url,
        name: res.data.name,
      };
  
      fs.writeFile("README.md", generate(data, gitHubData), function (err) {
        if (err) {
          throw err;
        }
  
        console.log("README.md created successfully!");
      });
    });
  });
  
  function init() {}
  init();
