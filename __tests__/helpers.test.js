// importing format_date function
const {format_date, format_plural, format_url} = require('../utils/helpers');

// writing test to ensure format_date() takes Date() objects and returns dates in MM/DD/YYYY format
test('format_date() returns a date string', () => {
  const date = new Date('2020-03-20 16:12:03');

  expect(format_date(date)).toBe('3/20/2020');
});

// test 2 
// checking formal_plural() correctly pluralizes words
test('format_plural() correctly pluralizes words', () => {
  const word1 = format_plural('tiger', 2);
  const word2 = format_plural('lion', 1);

  expect(word1).toBe('tigers');
  expect(word2).toBe('lion');
});

// test 3
// shortening URL strings
test('format_url() returns a simplified url string', () => {
  const url1 = format_url('http://test.com/page/1');
  const url2 = format_url('https://www.coolstuff.com/abcdefg/');
  const url3 = format_url('https://www.google.com?q=hello');

  expect(url1).toBe('test.com');
  expect(url2).toBe('coolstuff.com');
  expect(url3).toBe('google.com');
});