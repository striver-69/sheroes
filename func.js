let dict = {};
const getGlobalMimimum = () => {
  let str = '-';
  for (let i = 0; i <= 127; i++) {
    str = str + 9;
  }
  return str;
};

//Sanitizing unwanted values using regex validation and removing trailing zeroes.

function removeTrailZero(number) {
  if (number[0] === '-') {
    return '-' + number.substring(1).replace(/^0+/, '');
  }
  const newString = number.replace(/^0+/, '');
  return newString === '' ? '0' : newString;
}

function SanitizingInput(arr) {
  const reg = /^-?\d+\.?\d*$|^\d*\.?\d+$/;
  const regex = new RegExp(reg);
  const newArr = arr
    .filter((el) => {
      return regex.test(el);
    })
    .map((el) => {
      const trimmedVal = removeTrailZero(el);
      dict[trimmedVal] = el;
      return trimmedVal;
    });

  return newArr;
}

// Comparartor Helper Functions logic to check 2 numbers represented as string.

const countNegativeSignSum = (a, b) => (a[0] === '-') + (b[0] === '-');

function comparator(a, b, flag) {
  const len1 = a.length;
  const len2 = b.length;
  const Mn = Math.min(len1, len2);
  const dec1 = getDecimalPointIndex(a);
  const dec2 = getDecimalPointIndex(b);
  if (dec1 > dec2) {
    return flag === 0 ? true : false;
  }
  if (dec1 < dec2) {
    return flag === 1 ? true : false;
  }
  for (let i = 0; i < Mn; i++) {
    if (a[i] === '.') continue;
    if (a[i] !== b[i]) {
      if (parseInt(a[i]) > parseInt(b[i])) {
        return flag === 0 ? true : false;
      } else {
        return flag === 1 ? true : false;
      }
    }
  }
  if (len1 > len2) {
    return flag === 1 ? false : true;
  }
  return flag === 0 ? false : true;
}

function getDecimalPointIndex(a) {
  for (let i = 0; i < a.length; i++) {
    if (a[i] === '.') return i;
  }
  return a.length;
}

function compare(a, b) {
  let countNegativeSign = 0;
  countNegativeSign = countNegativeSignSum(a, b);
  if (countNegativeSign === 1) {
    return b[0] !== '-';
  }
  if (countNegativeSign === 2) {
    a = a.substring(1);
    b = b.substring(1);
    return comparator(a, b, 0);
  }
  return comparator(a, b, 1);
}

function sameAfterDecimal(a, b) {
  for (let i = a.length; i < b.length; i++) {
    if (b[i] !== '0') return false;
  }
  return true;
}

function isEqualToCurrentMaximum(a, b) {
  const len1 = a.length;
  const len2 = b.length;
  let isDecimal = false;
  const minLength = Math.min(a.length, b.length);
  for (let i = 0; i < minLength; i++) {
    if (a[i] !== b[i]) return false;
    if (a[i] === '.') {
      isDecimal = true;
    }
  }
  if (len1 === len2) return true;
  if (!isDecimal) {
    if (len1 !== minLength) {
      if (a[minLength] !== '.') {
        return false;
      }
      for (let i = minLength + 1; i < len1; i++) {
        if (parseInt(a[i]) !== 0) return false;
      }
      return true;
    } else {
      if (b[minLength] !== '.') {
        return false;
      }
      for (let i = minLength + 1; i < len2; i++) {
        if (parseInt(b[i]) !== 0) return false;
      }
      return true;
    }
  } else {
    if (len1 !== minLength) {
      for (let i = minLength; i < len1; i++) {
        if (parseInt(a[i]) !== 0) return false;
      }
      return true;
    } else {
      for (let i = minLength; i < len2; i++) {
        if (parseInt(b[i]) !== 0) return false;
      }
      return true;
    }
  }
}

function getMaximumValue(newArr) {
  let value = getGlobalMimimum();
  for (let i = 0; i < newArr.length; i++) {
    if (compare(value, newArr[i])) {
      value = newArr[i];
    }
  }
  return value;
}

function getSecondMaximumValue(newArr, value) {
  let max2Index = -1;
  for (let i = 0; i < newArr.length; i++) {
    if (
      !isEqualToCurrentMaximum(newArr[i], value) &&
      (max2Index === -1 || compare(newArr[max2Index], newArr[i]))
    ) {
      max2Index = i;
    }
  }
  return max2Index === -1 ? -1 : dict[newArr[max2Index]];
}
function getSecondMaximum(Array = []) {
  const sanitizedArray = SanitizingInput(Array);

  if (sanitizedArray.length < 2) return -1;
  const greatestValue = getMaximumValue(sanitizedArray);
  const secondMaxValue = getSecondMaximumValue(sanitizedArray, greatestValue);
  return secondMaxValue;
}

module.exports = getSecondMaximum;
