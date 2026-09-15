export const shuffle = function (array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
};

export const pct = function (part, whole) {
  if (!whole) return;

  return Math.round(part / whole * 100);
};

export const sum = function (getter, arr) {
  return arr.reduce((ret, item) => ret + item[getter], 0);
};

export const avg = function (getter, arr) {
  if (!arr.length) return;

  return Math.round(sum(getter, arr) / arr.length);
};

export const min = function (getter, arr) {
  if (!arr.length) return;

  return Math.min(...arr.map(item => item[getter]));
};

export const max = function (getter, arr) {
  if (!arr.length) return;

  return Math.max(...arr.map(item => item[getter]));
};

export const groupBy = function (getter, arr) {
  if (!arr.length) return {};

  return Object.groupBy(arr, el => el[getter]);
};

export const pad = function (n) {
  return n < 10 ? '0' + n : '' + n;
};

export const dursec = function (d1, d2) {
  return Math.round((new Date(d2) - new Date(d1)) / 1000);
};

export const secToHr = function (sec) {
  if (!sec) return;

  return Math.round(sec / 60 / 60 * 10) / 10;
};
