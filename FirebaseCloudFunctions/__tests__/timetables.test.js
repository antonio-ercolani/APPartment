const timetables = require('../functions/timetables.js');

test('No input #1', () => {
  expect(timetables.verifyInputSingleEvent()).toBeFalsy();
})

test('No input #2', () => {
  expect(timetables.verifyInputSingleEvent({}, "")).toBeFalsy();
})

test('Missing field #1', () => {
  expect(timetables.verifyInputSingleEvent({
    date: '01-12-2021',
    description: 'food'
  }, 'Cornalia')).toBeFalsy();
})

test('Missing field #2', () => {
  expect(timetables.verifyInputSingleEvent({
    author: "Antonio",
    date: '01-12-2021',
  }, "Capucci")).toBeFalsy();
})

test('Missing field #3', () => {
  expect(timetables.verifyInputSingleEvent({
    description: "Pulizia cucina",
    date: '01-12-2022',
  }, 'Capucci')).toBeFalsy();
})

test('Missing field #4', () => {
  expect(timetables.verifyInputSingleEvent({
    date: '01-12-2022'
  }, 'Cornalia')).toBeFalsy();
})

test('Wrong input types #1', () => {
  expect(timetables.verifyInputSingleEvent({
    description: "Pulizia cucina",
    date: '01-12-2022',
    author: "Riccardo"
  }, {apartment: "Settala"})).toBeFalsy();
})

test('Wrong input types #2', () => {
  expect(timetables.verifyInputSingleEvent({
    description: "Staccano luce alle 12",
    date: '01-12-2022',
    author: "Riccardo"
  }, 342)).toBeFalsy();
})

test('Wrong input types #3', () => {
  expect(timetables.verifyInputSingleEvent({
    description: "Manutenzione terrazzo",
    date: '01-12-2022',
    author: "Riccardo"
  }, ["Cornalia"])).toBeFalsy();
})

test('Correct input #1', () => {
  expect(timetables.verifyInputSingleEvent({
    description: "Compleanno Andrea",
    date: '01-12-2022',
    author: "Riccardo"
  }, "Settala")).toBeTruthy();
})

test('Correct input #2', () => {
  expect(timetables.verifyInputSingleEvent({
    description: "Idraulico",
    date: '13-04-2019',
    author: "Elena" 
  }, "Cornalia")).toBeTruthy();
})

test('No input #1', () => {
  expect(timetables.verifyInputTimetable()).toBeFalsy();
})

test('No input #2', () => {
  expect(timetables.verifyInputTimetable({}, "")).toBeFalsy();
})

test('Missing field #1', () => {
  expect(timetables.verifyInputTimetable({
    period: 32,
    description: 'food'
  }, 'Cornalia')).toBeFalsy();
})

test('Missing field #2', () => {
  expect(timetables.verifyInputTimetable({
    period: 31,
    startDate: '01-12-2021',
    endDate: '01-12-2022'
  }, "Capucci")).toBeFalsy();
})

test('Missing field #3', () => {
  expect(timetables.verifyInputTimetable({
    description: "Pulizia cucina",
    startDate: '01-12-2021',
    endDate: '01-12-2022',
    members: ["Elena", "Riccardo"]
  }, 'Capucci')).toBeFalsy();
})

test('Missing field #4', () => {
  expect(timetables.verifyInputTimetable({
    members: ["Elena", "Riccardo"]
  }, 'Cornalia')).toBeFalsy();
})

test('Wrong input types #1', () => {
  expect(timetables.verifyInputTimetable({
    period: [21],
    description: "Portare fuori spazzatura",
    startDate: '01-12-2021',
    endDate: '01-12-2022',
    members: ["Elena", "Riccardo"]  
  }, {apartment: "Settala"})).toBeFalsy();
})

test('Wrong input types #2', () => {
  expect(timetables.verifyInputTimetable({
    period: {length: 21},
    description: "Portare fuori spazzatura",
    startDate: '01-12-2021',
    endDate: '01-12-2022',
    members: ["Elena", "Riccardo"]  
  }, "Settala")).toBeFalsy();
})

test('Wrong input types #3', () => {
  expect(timetables.verifyInputTimetable({
    period: 21,
    description: "Portare fuori spazzatura",
    startDate: '01-12-2021',
    endDate: '01-12-2022',
    members: ["Elena", "Riccardo"]  
  }, ["Cornalia"])).toBeFalsy();
})

test('Correct input #1', () => {
  expect(timetables.verifyInputTimetable({
    period: 21,
    description: "Portare fuori spazzatura",
    startDate: '01-12-2021',
    endDate: '01-12-2022',
    members: ["Elena", "Riccardo"]  
  }, "Settala")).toBeTruthy();
})

test('Correct input #2', () => {
  expect(timetables.verifyInputTimetable({
    period: 3,
    description: "Pulizia Cucina",
    startDate: '30-11-2021',
    endDate: '03-12-2021',
    members: ["Antonio", "Andrea"]  
  }, "Cornalia")).toBeTruthy();
})









