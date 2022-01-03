const timetableFormUtils = require('../screens/HomeScreen/TimetablesScreen/timetableFormUtils')


test('Missing values #1', () => {
  expect(timetableFormUtils.checkFormTimetable()[0]).toBeFalsy();
})

test('Missing values #2', () => {
  expect(timetableFormUtils.checkFormTimetable("01/23/2023", "01/24/2023", "2")[0]).toBeFalsy();
})

test('Missing values #3', () => {
  expect(timetableFormUtils.checkFormTimetable("01/23/2023", "01/24/2023", "Pulizie")[0]).toBeFalsy();
})

test('Period too long', () => {
  expect(timetableFormUtils.checkFormTimetable("01/24/2023", "01/24/2023", "200", "Pulizie")[0]).toBeFalsy();
})

test('Description too long', () => {
  expect(timetableFormUtils.checkFormTimetable("01/23/2023", "01/24/2023", "20", "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...")[0]).toBeFalsy();
})

test('End date prior to start date #1', () => {
  expect(timetableFormUtils.checkFormTimetable("01/23/2023", "01/24/2020", "20", "Pulizie")[0]).toBeFalsy();
})

test('End date prior to start date #2', () => {
  expect(timetableFormUtils.checkFormTimetable("01/20/2023", "01/01/2023", "20", "Pulizie")[0]).toBeFalsy();
})

test('Correct input #1', () => {
  expect(timetableFormUtils.checkFormTimetable("01/23/2023", "01/24/2024", "20", "Pulizie")[0]).toBeTruthy();
})

test('Correct input #2', () => {
  expect(timetableFormUtils.checkFormTimetable("03/23/2022", "01/03/2023", "20", "Pulizie")[0]).toBeTruthy();
})

test('Correct input #3', () => {
  expect(timetableFormUtils.checkFormTimetable("01/23/2023", "01/24/2024", "20", "Pulizie")[0]).toBeTruthy();
})