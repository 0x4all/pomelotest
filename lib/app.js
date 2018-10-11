var SessionService = require("./common/service/sessionService");
var ChannelService = require("./common/service/channelService");
module.exports = function(opts){
    return new App(opts);
}

var _init= function(app) {
    app.set("sessionService",new SessionService());
    app.set("channelService",new ChannelService());
}

var App = function(opts){
    this.opts = opts;
    this.settings = {};
    _init(this);
}
var sessionIndex = 0;
App.prototype.session = function() {
    var ss = this.get("sessionService");
    return ss.create(++sessionIndex, "testServerId",{});
}

App.prototype.getServersByType = function(stype) {
    return [{id:"testServer"}];
}

App.prototype.get = function(key) {
    return this.settings[key];
}

App.prototype.set = function(key, value) {
    this.settings[key] = value;
}