/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import fs from "fs";

const modules: any = [];

fs.readdirSync(__dirname).forEach((folderOrFile) => {
  if (folderOrFile !== "index.ts") {
    let apiModule = require(`./${folderOrFile}`);
    if (apiModule.default) {
      apiModule = apiModule.default;
    }

    modules.push(apiModule);
  }
});

export default modules;
