var App = require("./lib/app");
var m = {};
module.exports = m;

var app = App();
m.app = function(opts) {
    app.init(opts);
    return app;
}
