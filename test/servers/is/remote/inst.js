/**
 * Remote service for backend servers.
 * Receive and handle request message forwarded from frontend server.
 */
module.exports = function(app) {
  return new Remote(app);
};

var Remote = function(app) {
  this.app = app;
};

/**
 * Forward message from frontend server to other server's handlers
 *
 * @param msg {Object} request message
 * @param session {Object} session object for current request
 * @param cb {Function} callback function
 */
Remote.prototype.forwardMessage = function(msg, session, cb) {
  // generate backend session for current request
  console.log("forward msg",msg, session);
  if(cb) {cb()}
};

Remote.prototype.forwardMessage2 = function(route, body, aesPassword, compressGzip, session, cb) {
  // logger.debug('backend server [%s] handle message: %j', this.app.serverId, msg);

  if(cb) {cb()}
};