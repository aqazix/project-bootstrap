const fs = require("fs");
const npm = require("npm");
const { dirname } = require("path");

exports.installBasePackages = (reject) => {
  npm.config.set("save-dev", true);
  npm.commands.i([
    "casual", "dotenv", "eslint",
    "eslint-config-airbnb-base", "eslint-config-prettier", "eslint-plugin-import",
    "eslint-plugin-import-helpers", "eslint-plugin-prettier", "husky",
    "jest", "prettier",
  ], (error) => {
    reject(error);
  });
  npm.config.set("save-dev", false);
}

exports.startupProject = (reject) => {
  npm.config.set("y", true);
  npm.commands.init([], (error) => {
    if (error) {
      reject(error);
    }
  });
  npm.config.set("y", false);
};

exports.writeFileContent = async (filename, fileContent) => {
  const dir = dirname(filename);

  try {
    await fs.promises.access(dir);
  } catch (error) {
    await fs.promises.mkdir(dir, { recursive: true });
  }

  await fs.promises.writeFile(filename, fileContent[filename]);
};
