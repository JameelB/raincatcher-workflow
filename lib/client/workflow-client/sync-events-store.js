var CONSTANTS = require('../../constants');
var data = {};

/**
 * Sets sync status for a workflow object.
 *
 * @param {object} event - object passed in by sync event handler, should contain data used for logItem object.
 * @param {string} event.uid - String used as an identifier for the event.
 * @param {string} event.code - String which identifies the notification received from sync. i.e. "remote_update_applied/failed"
 * @param {object} event.message - Object which contains additional information about the sync notification
 */
function addEvent(event) {
  var logItem = {
    entityId: event.uid,
    code: event.code,
    action: event.message.action,
    message: event.message.msg,
    type: event.message.type,
    ts: Date.now()
  };

  if (event.code === CONSTANTS.SYNC_EVENT_TOPICS.REMOTE_UPDATE_FAILED) {
    logItem.icon = "sync_problem";
  }

  data[event.uid] = logItem;
}

/**
 * Gets the current sync status for a workflow.
 * @param {string} id - String used as an identifier of the workflow to be updated.
 */
function getSyncStatus(id) {
  return data[id];
}

/**
 * Iterates through array of passed in objects and updates the syncStatus of each object.
 * @param {array} arrayOfworkflows
 */
function mapWorkflowsToEvents(arrayOfworkflows) {
  arrayOfworkflows.forEach(function(workflow) {
    workflow.syncStatus = getSyncStatus(workflow.id);
  });
}


module.exports = {
  addEvent: addEvent,
  getSyncStatus: getSyncStatus,
  mapWorkflowsToEvents: mapWorkflowsToEvents
};


