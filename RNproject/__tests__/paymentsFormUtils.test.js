const paymentFormUtils = require('../screens/HomeScreen/PaymentsScreen/paymentsFormUtils')

test('Missing values #1', () => {
  expect(paymentFormUtils.checkMissingValuesPayment()).toBeFalsy();
})

test('Missing values #2', () => {
  expect(paymentFormUtils.checkMissingValuesPayment("payoff")).toBeFalsy();
})

test('Missing values #3', () => {
  expect(paymentFormUtils.checkMissingValuesPayment("", "20")).toBeFalsy();
})

test('Correct input #1', () => {
  expect(paymentFormUtils.checkMissingValuesPayment("payoff", "20")).toBeTruthy();
})

test('Correct input #2', () => {
  expect(paymentFormUtils.checkMissingValuesPayment("saldo", "44")).toBeTruthy();
})

test('Missing values #1', () => {
  expect(paymentFormUtils.checkMissingValuesPayOff()).toBeFalsy();
})

test('Missing values #2', () => {
  expect(paymentFormUtils.checkMissingValuesPayOff("payoff")).toBeFalsy();
})

test('Missing values #3', () => {
  expect(paymentFormUtils.checkMissingValuesPayOff("", "20")).toBeFalsy();
})

test('Correct input #1', () => {
  expect(paymentFormUtils.checkMissingValuesPayOff("payoff", "20", "select")).toBeTruthy();
})

test('Correct input #2', () => {
  expect(paymentFormUtils.checkMissingValuesPayOff("saldo", "44", "select")).toBeTruthy();
})

test('Wrong input type #1', () => {
  expect(paymentFormUtils.checkAmountCorrectness("ciao")).toBeFalsy();
})

test('Wrong input type #2', () => {
  expect(paymentFormUtils.checkAmountCorrectness({amount: 30})).toBeFalsy();
})

test('Correct input #1', () => {
  expect(paymentFormUtils.checkAmountCorrectness("21")).toBeTruthy();
})

test('Correct input #2', () => {
  expect(paymentFormUtils.checkAmountCorrectness(1)).toBeTruthy();
})

test('Correct input #3', () => {
  expect(paymentFormUtils.checkAmountCorrectness(432)).toBeTruthy();
})