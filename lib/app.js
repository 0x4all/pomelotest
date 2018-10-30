var SessionService = require("./common/service/sessionService");
var ChannelService = require("./common/service/channelService");
var fs = require("fs");

module.exports = function(opts){
    return new App(opts);
}

var _init= function(app) {
    app.set("sessionService",new SessionService());
    app.set("channelService",new ChannelService());
}

var App = function(){
    this.settings = {};
    this.rpc = {};
    _init(this);
}

App.prototype.init = function(opts) {
    this.opts = opts;
}
var sessionIndex = 0;
App.prototype.session = function() {
    var ss = this.get("sessionService");
    return ss.create(++sessionIndex, "testServerId",{});
}

App.prototype.getServersByType = function(stype) {
    return [{id:"testServer-1"}];
}

App.prototype.getServerId = function() {
    return "testServer-1";
}

App.prototype.get = function(key) {
    return this.settings[key];
}

App.prototype.set = function(key, value) {
    this.settings[key] = value;
}

var _getbasename = function(filename) {
    return filename.substring(0,filename.lastIndexOf("."));
}

App.prototype.mockrpc = function(serverdir) {
    var servers = fs.readdirSync(serverdir);
    for(var i = 0,l = servers.length; i < l ; ++i) {
        var server = servers[i];
        var rpcserver = this.rpc[server] = {};
        var serverpath = serverdir + "/" + server + "/remote/";
        var stat = fs.existsSync(serverpath);
        if(stat ) {
            try {
                var remotefiles = fs.readdirSync(serverpath);
                for(var x = 0,xl = remotefiles.length; x < xl; ++x) {
                    var remotefile = remotefiles[x];
                    var remote = (serverpath + remotefile);
                    try {
                        var mod = require(remote);
                        if(typeof mod == "function") {
                            var remod = mod(this);
                            for(var k in remod) {
                                var mk = remod[k];
                                if(typeof mk == "function") {
                                    remod[k].toServer = (function(k,remod){ 
                                        return function(serverId){
                                                var args = Array.prototype.slice.call(arguments,1);
                                                remod[k].apply(remod, args);
                                            }
                                    })(k,remod);
                                }
                            }
                            rpcserver[_getbasename(remotefile)] = remod;
                        }
                    }catch(e) {
                        console.warn(e);
                    }
                }
            }catch(e){}
        }
    }
}