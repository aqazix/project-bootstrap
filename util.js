const fs = require("fs");
const npm = require("npm");
const { dirname } = require("path");

exports.writeFileContent = async (filename, fileContent) => {
  const dir = dirname(filename);

  try {
    await fs.promises.access(dir);
  } catch (error) {
    await fs.promises.mkdir(dir, { recursive: true });
  }

  await fs.promises.writeFile(filename, fileContent[filename]);
};

exports.startupProject = (reject) => {
  npm.config.set("y", true);
  npm.commands.init([], (error) => {
    if (error) {
      reject(error);
    }
  });
  npm.config.set("y", false);
}
