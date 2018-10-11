var App = require("./lib/app");
var m = {};
module.exports = m;


m.app = function(opts) {
    return App(opts);
}