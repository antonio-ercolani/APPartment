const stockManagement = require('../functions/stockManagement.js');


test('Missing announcement #1', () => {
  expect(stockManagement.verifyInputItem("cornalia")).toBeFalsy();
})

test('Missing announcement #2', () => {
  expect(stockManagement.verifyInputItem("", "cornalia")).toBeFalsy();
})

test('Missing announcement #3', () => {
  expect(stockManagement.verifyInputItem(null, "cornalia")).toBeFalsy();
})

test('Wrong input format #1', () => {
  expect(stockManagement.verifyInputItem(213, {})).toBeFalsy();
})

test('Wrong input format #2', () => {
  expect(stockManagement.verifyInputItem(["Pane"], "cornalia")).toBeFalsy();
})

test('Wrong input format #3', () => {
  expect(stockManagement.verifyInputItem(["Toilet paper"], 15)).toBeFalsy();
})

test('Correct input #1', () => {
  expect(stockManagement.verifyInputItem("Toilet paper", "cornalia")).toBeTruthy();
})

test('Correct input #2', () => {
  expect(stockManagement.verifyInputItem("Dish soap", "capucci")).toBeTruthy();
})