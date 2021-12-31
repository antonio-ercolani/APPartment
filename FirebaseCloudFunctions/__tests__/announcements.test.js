const announcements = require('../functions/announcements.js');

test('No input', () => {
  expect(announcements.verifyInputAnnouncementTrigger({})).toBeFalsy();
})

test('Missing announcement field', () => {
  expect(announcements.verifyInputAnnouncementTrigger({
    member:'2HA7HDWB35BD',
    timestamp:213213
  })).toBeFalsy();
})

test('Missing timestamp field', () => {
  expect(announcements.verifyInputAnnouncementTrigger({
    announcement:'Yes',
    member:'2HA7HDWB35BD',
  })).toBeFalsy();
})

test('Missing member field', () => {
  expect(announcements.verifyInputAnnouncementTrigger({
    announcement:'Yes',
    timestamp:213213
  })).toBeFalsy();
})

test('Missing announcement and member field', () => {
  expect(announcements.verifyInputAnnouncementTrigger({
    timestamp:213213
  })).toBeFalsy();
})

test('Missing timestamp and announcement field', () => {
  expect(announcements.verifyInputAnnouncementTrigger({
    member:'2HA7HDWB35BD',
  })).toBeFalsy();
})

test('Incorrect timestamp #1', () => {
  expect(announcements.verifyInputAnnouncementTrigger({
    announcement:'Yes',
    member:'2HA7HDWB35BD',
    timestamp:'223412312A'
  })).toBeFalsy();
})

test('Incorrect timestamp #2', () => {
  expect(announcements.verifyInputAnnouncementTrigger({
    announcement:'Yes',
    member:'2HA7HDWB35BD',
    timestamp:'DSAD9219'
  })).toBeFalsy();
})

test('Incorrect timestamp #3', () => {
  expect(announcements.verifyInputAnnouncementTrigger({
    announcement:'Yes',
    member:'2HA7HDWB35BD',
    timestamp:'25/12/2022'
  })).toBeFalsy();
})

test('Incorrect timestamp #4', () => {
  expect(announcements.verifyInputAnnouncementTrigger({
    announcement:'Yes',
    member:'2HA7HDWB35BD',
    timestamp:[232,43953]
  })).toBeFalsy();
})

test('Incorrect timestamp #5', () => {
  expect(announcements.verifyInputAnnouncementTrigger({
    announcement:'Yes',
    member:'2HA7HDWB35BD',
    timestamp:{value: 21312321}
  })).toBeFalsy();
})

test('Correct input #1', () => {
  expect(announcements.verifyInputAnnouncementTrigger({
    announcement:'Yes',
    member:'2HA7HDWB35BD',
    timestamp:213213
  })).toBeTruthy();
})

test('Correct input #2', () => {
  expect(announcements.verifyInputAnnouncementTrigger({
    announcement:'Rent due',
    member:'343HDS7DHB21',
    timestamp:54434
  })).toBeTruthy();
})

test('Correct input #3', () => {
  expect(announcements.verifyInputAnnouncementTrigger({
    announcement:'Remember to lock the door!!!',
    member:'HC8D812BRDS',
    timestamp:564353453
  })).toBeTruthy();
})

test('Correct input #4', () => {
  expect(announcements.verifyInputAnnouncementTrigger({
    announcement:'Granda visiting',
    member:'FADF9D9AFF2',
    timestamp:3525345
  })).toBeTruthy();
})

test('Missing announcement', () => {
  expect(announcements.verifyInputAnnouncement("cornalia")).toBeFalsy();
})

test('Missing apartment #1', () => {
  expect(announcements.verifyInputAnnouncement("", "cornalia")).toBeFalsy();
})

test('Missing apartment #2', () => {
  expect(announcements.verifyInputAnnouncement(null, "cornalia")).toBeFalsy();
})

test('Wrong input format #1', () => {
  expect(announcements.verifyInputAnnouncement(null, "cornalia")).toBeFalsy();
})

test('Wrong input format #2', () => {
  expect(announcements.verifyInputAnnouncement(213, {})).toBeFalsy();
})

test('Wrong input format #3', () => {
  expect(announcements.verifyInputAnnouncement(["Rent due"], "cornalia")).toBeFalsy();
})

test('Wrong input format #4', () => {
  expect(announcements.verifyInputAnnouncement(["Rent due"], 15)).toBeFalsy();
})

test('Correct input #5', () => {
  expect(announcements.verifyInputAnnouncement("Rent due", "cornalia")).toBeTruthy();
})

test('Correct input #6', () => {
  expect(announcements.verifyInputAnnouncement("Yes", "capucci")).toBeTruthy();
})