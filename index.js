#!/usr/bin/env node
const inquirer = require("inquirer");

const Typescript = require("./languages/typescript");

const languages = {
  Typescript,
}

inquirer.prompt([
  {
    type: "list",
    name: "choice",
    message: "Javascript or Typescript?",
    choices: [
      "Typescript"
    ]
  }
])
  .then(async (answers) => {
    await languages[answers.choice]();
  });
