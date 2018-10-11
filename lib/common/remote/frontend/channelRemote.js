/**
 * Remote channel service for frontend server.
 * Receive push request from backend servers and push it to clients.
 */
var utils = require('../../../util/utils');
var logger = console.log.bind('pomelo', __filename);

module.exports = function(app) {
  return new Remote(app);
};

var Remote = function(app) {
  this.app = app;
};

/**
 * Push message to client by uids.
 *
 * @param  {String}   route route string of message
 * @param  {Object}   msg   message
 * @param  {Array}    uids  user ids that would receive the message
 * @param  {Object}   opts  push options
 * @param  {Function} cb    callback function
 */
Remote.prototype.pushMessage = function(route, msg, uids, opts, cb) {
  if(!msg){
    logger.error('Can not send empty message! route : %j, compressed msg : %j',
        route, msg);
    utils.invokeCallback(cb, new Error('can not send empty message.'));
    return;
  }
  logger.debug('[%s] pushMessage uids: %j, msg: %j, sids: %j', "testServerId", uids, msg, sids);
  utils.invokeCallback(cb);
};

/**
 * Broadcast to all the client connectd with current frontend server.
 *
 * @param  {String}    route  route string
 * @param  {Object}    msg    message
 * @param  {Boolean}   opts   broadcast options. 
 * @param  {Function}  cb     callback function
 */
Remote.prototype.broadcast = function(route, msg, opts, cb) {
  utils.invokeCallback(cb);
};
