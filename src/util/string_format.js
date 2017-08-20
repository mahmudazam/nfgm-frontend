
export function formatPhoneNumber(num) {
  let start = 0;
  if(num.charAt(0) === '+') {
    num = num.substring(0 , 2) // +a
          + ' (' + num.substring(2 , 5) + ') ' // _(bbb)_
          + num.substring(5 , 8) + '-' // ccc-
          + num.substring(8 , 12) // dddd
          // num = +a (bbb) ccc-dddd
  }
  return num;
}
