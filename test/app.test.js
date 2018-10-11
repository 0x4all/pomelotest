var pomelotest = require("../index");

var app = pomelotest.app();
var ss = app.get("sessionService");
var session = app.session();
var userid = 10001;

session.set("username","test");
session.bind(userid);
var s  = ss.get(session.id);
// console.log("create:",s);

ss.kick(userid,function(a1,a2){
    console.log(userid,"kicked");
    var s  = ss.getByUid(userid);
    console.log("kicked session:",userid);
})


var cs = app.get("channelService");
cs.pushMessageByUids("testroute",{"msg":"test"},[{uid:10001,sid:"testServerId"}],{},function(){
    console.log("push done.")
})

var path = require("path");
var serverdir = path.resolve(__dirname,"./servers");
app.mockrpc(serverdir);


// console.log(app.rpc.is.inst.forwardMessage.toServer.toString());
app.rpc.is.inst.forwardMessage.toServer("testServerId",{msg:"test"},{session:1},function(){
    console.log("forwardMessage call done.")
})