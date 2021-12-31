const payments = require('../functions/payments.js');

test('No input', () => {
  expect(payments.verifyApartment()).toBeFalsy();
})

test('Not string #1', () => {
  expect(payments.verifyApartment(32)).toBeFalsy();
})

test('Not string #2', () => {
  expect(payments.verifyApartment({apartment: "Cornalia"})).toBeFalsy();
})

test('Not string #3', () => {
  expect(payments.verifyApartment(["Cornalia"])).toBeFalsy();
})

test('Empty string', () => {
  expect(payments.verifyApartment("")).toBeFalsy();
})

test('Correct input #1', () => {
  expect(payments.verifyApartment("Cornalia")).toBeTruthy();
})

test('Correct input #2', () => {
  expect(payments.verifyApartment("capucci")).toBeTruthy();
})

test('Correct input #3', () => {
  expect(payments.verifyApartment("SETTALA")).toBeTruthy();
})

test('No input #1', () => {
  expect(payments.verifyPaymentInput()).toBeFalsy();
})

test('No input #2', () => {
  expect(payments.verifyPaymentInput({})).toBeFalsy();
})

test('Missing field #1', () => {
  expect(payments.verifyPaymentInput({
    amount: 32,
    description: 'food'
  })).toBeFalsy();
})

test('Missing field #2', () => {
  expect(payments.verifyPaymentInput({
    amount: 32,
    apartment: 'capucci'
  })).toBeFalsy();
})

test('Missing field #3', () => {
  expect(payments.verifyPaymentInput({
    apartment: "cornalia",
    description: 'food'
  })).toBeFalsy();
})

test('Missing field #4', () => {
  expect(payments.verifyPaymentInput({
    description: 'food'
  })).toBeFalsy();
})

test('Wrong input types #1', () => {
  expect(payments.verifyPaymentInput({
    amount: 32,
    description: ['food'],
    apartment: 'capucci'
  })).toBeFalsy();
})

test('Wrong input types #2', () => {
  expect(payments.verifyPaymentInput({
    amount: 32,
    description: 'food',
    apartment: {name: 'capucci'}
  })).toBeFalsy();
})

test('Wrong input types #3', () => {
  expect(payments.verifyPaymentInput({
    amount: 32,
    description: 'food',
    apartment: 3
  })).toBeFalsy();
})

test('Correct input #1', () => {
  expect(payments.verifyPaymentInput({
    amount: 32,
    description: 'food',
    apartment: 'capucci'
  })).toBeTruthy();
})

test('Correct input #2', () => {
  expect(payments.verifyPaymentInput({
    amount: 4432,
    description: 'water',
    apartment: 'CORNALIA'
  })).toBeTruthy();
})

test('Correct input #1', () => {
  expect(payments.verifyPaymentInput({
    amount: 1,
    description: 'bills',
    apartment: 'capucci'
  })).toBeTruthy();
})

test('Missing input #1', () => {
  expect(payments.verifyPayOffInput({})).toBeFalsy();
})

test('Missing input #2', () => {
  expect(payments.verifyPayOffInput()).toBeFalsy();
})

test('Missing fields #1', () => {
  expect(payments.verifyPayOffInput({
    amount: 32,
    description: 'food'
  })).toBeFalsy();
})

test('Missing fields #2', () => {
  expect(payments.verifyPayOffInput({
    amount: 32,
    description: 'food',
    member: 'AD2D78FH3F9S'
  })).toBeFalsy();
})

test('Missing fields #3', () => {
  expect(payments.verifyPayOffInput({
    apartment: '32',
    description: 'food',
    member: 'AD2D78FH3F9S'
  })).toBeFalsy();
})

test('Missing fields #4', () => {
  expect(payments.verifyPayOffInput({
    amount: 32
  })).toBeFalsy();
})

test('Wrong input types #1', () => {
  expect(payments.verifyPayOffInput({
    amount: 32,
    description: 'food',
    apartment: 'capucci',
    member: {uid: 'AD2D78FH3F9S'}
  })).toBeFalsy();
})

test('Wrong input types #2', () => {
  expect(payments.verifyPayOffInput({
    amount: 32,
    description: ['food'],
    apartment: 'capucci',
    member: 423423
  })).toBeFalsy();
})

test('Wrong input types #3', () => {
  expect(payments.verifyPayOffInput({
    amount: 32,
    description: 'food',
    apartment: {name: 'capucci'},
    member: 'AD2D78FH3F9S'
  })).toBeFalsy();
})

test('Correct input #1', () => {
  expect(payments.verifyPayOffInput({
    amount: 1,
    description: 'bills',
    apartment: 'capucci',
    member: 'AD2D78FH3F9S'
  })).toBeTruthy();
})

test('Correct input #2', () => {
  expect(payments.verifyPayOffInput({
    amount: 2342,
    description: 'water',
    apartment: 'cornalia',
    member: 'DFJAFK9932'
  })).toBeTruthy();
})

test('Correct input #3', () => {
  expect(payments.verifyPayOffInput({
    amount: 2,
    description: 'food',
    apartment: 'SETTALA',
    member: 'fdfd8f3jhs'
  })).toBeTruthy();
})











