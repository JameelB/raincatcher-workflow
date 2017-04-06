var chai = require('chai');
var expect = chai.expect;
var arrayOfMockWorkflows = require('../../../test/fixtures/mockWorkflows');
var mockSyncEvents = require('../../../test/fixtures/mockSyncEvents');


describe('Workflow sync event store', function() {
  var mockAppliedEvent = mockSyncEvents.mockAppliedEvent;
  var mockFailedEvent = mockSyncEvents.mockFailedEvent;
  var SyncEvents;

  beforeEach(function() {
    SyncEvents = require('./sync-events-store');
    SyncEvents.addEvent(mockAppliedEvent);
    SyncEvents.addEvent(mockFailedEvent);
  });

  it("Should map sync events to workflows", function() {
    SyncEvents.mapWorkflowsToEvents(arrayOfMockWorkflows);
    expect(arrayOfMockWorkflows[0].syncStatus).to.exist;
    expect(arrayOfMockWorkflows[0].syncStatus.entityId).to.equal(mockAppliedEvent.uid);
    expect(arrayOfMockWorkflows[0].syncStatus.code).to.equal(mockAppliedEvent.code);

    expect(arrayOfMockWorkflows[1].syncStatus).to.exist;
    expect(arrayOfMockWorkflows[1].syncStatus.entityId).to.equal(mockFailedEvent.uid);
    expect(arrayOfMockWorkflows[1].syncStatus.code).to.equal(mockFailedEvent.code);
  });
  it("Should set sync status for workflow object", function() {
    expect(arrayOfMockWorkflows[0].syncStatus).to.exist;
    expect(arrayOfMockWorkflows[0].syncStatus.entityId).to.equal(mockAppliedEvent.uid);
    expect(arrayOfMockWorkflows[0].syncStatus.code).to.equal(mockAppliedEvent.code);

    expect(arrayOfMockWorkflows[2].syncStatus).to.not.exist;
  });

});

