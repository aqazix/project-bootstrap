const inquirer = require("inquirer");
const npm = require("npm");

const Express = require("./frameworks/express");

const commonFiles = require("../../commonFiles.json");
const { startupProject, writeFileContent } = require("../../util");

module.exports = Typescript = async () => {
  const typescriptFiles = require("./files.json");

  await new Promise((resolve, reject) => {
    npm.load((error) => {
      if (error) {
        reject(error);
      } else {
        startupProject(reject);

        npm.config.set("save-dev", true);
        npm.commands.i([
          "@types/jest", "@types/node", "@typescript-eslint/eslint-plugin",
          "@typescript-eslint/parser", "casual", "dotenv",
          "eslint", "eslint-config-airbnb-base", "eslint-config-prettier",
          "eslint-import-resolver-typescript", "eslint-plugin-import", "eslint-plugin-import-helpers",
          "eslint-plugin-prettier", "husky", "jest",
          "module-alias", "prettier", "ts-jest",
          "ts-node", "typescript"
        ], (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
        npm.config.set("save-dev", false);
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
