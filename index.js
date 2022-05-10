#!/usr/bin/env node
const inquirer = require("inquirer");

const Typescript = require("./languages/typescript");
const { writeFileContent } = require("./util");

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
    const commonFiles = require("./commonFiles.json");
    const commonFilesKeys = Object.keys(commonFiles);

    await Promise.all(commonFilesKeys.map(file => writeFileContent(file, commonFiles)));
    await languages[answers.choice]();
  });
