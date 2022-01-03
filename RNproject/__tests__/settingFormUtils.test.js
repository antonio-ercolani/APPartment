const settingFormUtils = require('../screens/HomeScreen/SettingsScreen/settingFormUtils')

test('Missing fields #1', () => {
  expect(settingFormUtils.checkForm()).toBeFalsy();
})

test('Missing fields #2', () => {
  expect(settingFormUtils.checkForm("password")).toBeFalsy();
})

test('Missing fields #3', () => {
  expect(settingFormUtils.checkForm("riccardo@mail.com" , "p4ssw0rd")).toBeFalsy();
})

test('Invalid email #1', () => {
  expect(settingFormUtils.checkForm("riccardo@mail" , "p4ssw0rd", "p4ssw0rd")).toBeFalsy();
})

test('Invalid email #2', () => {
  expect(settingFormUtils.checkForm("riccardomail" , "p4ssw0rd", "p4ssw0rd")).toBeFalsy();
})

test('Invalid email #3', () => {
  expect(settingFormUtils.checkForm("riccardo@mail.5" , "p4ssw0rd", "p4ssw0rd")).toBeFalsy();
})

test('Invalid email #4', () => {
  expect(settingFormUtils.checkForm("riccardo@outlook." , "p4ssw0rd", "p4ssw0rd")).toBeFalsy();
})

test('Repeat password != password #1', () => {
  expect(settingFormUtils.checkForm("riccardo@mail.com" , "123456", "p4ssw0rd")).toBeFalsy();
})

test('Repeat password != password #2', () => {
  expect(settingFormUtils.checkForm("riccardo@mail.com" , "p4ssw0rd", "password")).toBeFalsy();
})

test('Repeat password != password #3', () => {
  expect(settingFormUtils.checkForm("riccardo@mail.com" , "p4ssw0rd", "ppassww")).toBeFalsy();
})

test('Password too short #1', () => {
  expect(settingFormUtils.checkForm("riccardo@mail.com" , "p4ssw", "p4ssw")).toBeFalsy();
})

test('Password too short #2', () => {
  expect(settingFormUtils.checkForm("riccardo@mail.com" , "12345", "12345")).toBeFalsy();
})

test('Password too short #3', () => {
  expect(settingFormUtils.checkForm("riccardo@mail.com" , "ddd", "ddd")).toBeFalsy();
})

test('Correct input #1', () => {
  expect(settingFormUtils.checkForm("riccardo@mail.com" , "p4ssw0rd", "p4ssw0rd")).toBeTruthy();
})

test('Correct input #2', () => {
  expect(settingFormUtils.checkForm("elena@mail.com" , "123456", "123456")).toBeTruthy();
})

test('Correct input #3', () => {
  expect(settingFormUtils.checkForm("valmo@mail.com" , "20220115", "20220115")).toBeTruthy();
})