const inquirer = require("inquirer");
const npm = require("npm");

const Express = require("./frameworks/express");

const commonFiles = require("../../commonFiles.json");
const { installBasePackages, startupProject, writeFileContent } = require("../../util");

module.exports = Typescript = async () => {
  const typescriptFiles = require("./files.json");

  await new Promise((resolve, reject) => {
    npm.load((error) => {
      if (error) {
        reject(error);
      } else {
        startupProject(reject);

        installBasePackages(reject);

        npm.config.set("save-dev", true);
        npm.commands.i([
          "@types/jest", "@types/node", "@typescript-eslint/eslint-plugin",
          "@typescript-eslint/parser", "eslint-import-resolver-typescript", "module-alias",
          "ts-jest", "ts-node", "typescript"
        ], (error) => {
          if (error) {
            reject(error);
          }
        });
        npm.config.set("save-dev", false);

        resolve();
      }
    });
  });

  const commonFilesKeys = Object.keys(commonFiles);
  const typescriptFilesKeys = Object.keys(typescriptFiles);

  await Promise.all(commonFilesKeys.map(file => writeFileContent(file, commonFiles)));
  await Promise.all(typescriptFilesKeys.map(file => writeFileContent(file, typescriptFiles)));

  const projectTypes = {
    async Server() {
      const frameworks = {
        Express,
      }

      inquirer.prompt([
        {
          type: "list",
          name: "choice",
          message: "Which framework?",
          choices: [
            "Express",
          ]
        }
      ])
        .then(async (answers) => {
          await frameworks[answers.choice]();
        });
    }
  }

  inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "What type of project?",
      choices: [
        "Server",
      ]
    }
  ])
    .then(async (answers) => {
      await projectTypes[answers.choice]();
    });
}
