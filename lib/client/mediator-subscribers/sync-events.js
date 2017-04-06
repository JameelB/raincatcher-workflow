var SyncEvents = require('../workflow-client/sync-events-store');

/**
 * Initialize a subscriber for sync remote event topics.
 */
module.exports = function syncEventSubscriber() {

  /**
   * Handler for sync remote events
   *
   * @param {object} parameters
   * @param {string} parameters.uid - String used as an identifier for the sync event.
   * @param {object} parameters.message - Object which contains additional information about the sync notification
   */
  return function handleSyncEventTopics(parameters) {
    if (parameters && parameters.uid && parameters.message) {
      SyncEvents.addEvent(parameters);
    }
  };
};

