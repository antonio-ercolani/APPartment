const announcementFormUtils = require('../screens/HomeScreen/AnnouncementsScreen/announcementFormUtils')

test('Missing field', () => {
  expect(announcementFormUtils.checkForm()).toBeFalsy();
})

test('Wrong input type #1', () => {
  expect(announcementFormUtils.checkForm({text: "Chiudere porta"})).toBeFalsy();
})

test('Wrong input type #2', () => {
  expect(announcementFormUtils.checkForm(['Chiudere porta'])).toBeFalsy();
})

test('Wrong input type #3', () => {
  expect(announcementFormUtils.checkForm(44)).toBeFalsy();
})

test('Correct input #1', () => {
  expect(announcementFormUtils.checkForm("Pulire sala")).toBeTruthy();
})

test('Correct input #2', () => {
  expect(announcementFormUtils.checkForm("Domani viene idraulico")).toBeTruthy();
})

test('Correct input #3', () => {
  expect(announcementFormUtils.checkForm("Tolgono la luce alle 18!")).toBeTruthy();
})