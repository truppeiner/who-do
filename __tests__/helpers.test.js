const {format_date, format_plural, format_url, format_time} = require('../utils/helpers');

test('format_url() returns a simplified url string', () => {
  const url1 = format_url('http://test.com/page/1');
  const url2 = format_url('https://www.coolstuff.com/abcdefg/');
  const url3 = format_url('https://www.google.com?q=hello');

  expect(url1).toBe('test.com');
  expect(url2).toBe('coolstuff.com');
  expect(url3).toBe('google.com');
});

test('format_plural() returns a pluralized word', () => {
  const word1 = format_plural('tiger', 1);
  const word2 = format_plural('lion', 2);

  expect(word1).toBe('tiger');
  expect(word2).toBe('lions');
});

test('format_date() returns a date string', () => {
  const date = new Date('2020-03-20');

  expect(format_date(date)).toBe('3/20/2020');
});

test('format_time() returns a time string', () => {
  const time = format_time('09:22:000');
  const time2 = format_time('12:51:000');

  expect(time).toBe('9:22 AM');
  expect(time2).toBe('12:51 PM');
});