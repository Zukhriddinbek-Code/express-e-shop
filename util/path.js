const path = require("path");

//Return the directory name of a path
module.exports = path.dirname(require.main.filename);
