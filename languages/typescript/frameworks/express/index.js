const npm = require("npm");

const { writeFileContent } = require("../../../../util");

module.exports = Express = async () => {
  await new Promise(async (resolve, reject) => {
    npm.load((error) => {
      if (error) {
        reject(error);
      } else {
        npm.commands.i(["cors", "express", "express-async-errors", "swagger-ui-express"], (error) => {
          if (error) {
            reject(error);
          }
        });
        npm.config.set("save-dev", true);
        npm.commands.i(["@types/cors", "@types/express", "@types/swagger-ui-express"], (error) => {
          if (error) {
            reject(error);
          }
        });
        npm.config.set("save-dev", false);

        resolve();
      }
    });

    resolve();
  });

  const expressFiles = require("./files.json");
  const expressFilesKeys = Object.keys(expressFiles);

  await Promise.all(expressFilesKeys.map(file => writeFileContent(file, expressFiles)));
}
