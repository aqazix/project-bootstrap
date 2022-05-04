const fs = require("fs");
const { dirname } = require("path");

module.exports = writeFileContent = async (filename, fileContent) => {
  const dir = dirname(filename);

  try {
      await fs.promises.access(dir);
  } catch (error) {
      await fs.promises.mkdir(dir, { recursive: true });
  }

  await fs.promises.writeFile(filename, fileContent[filename]);
};
