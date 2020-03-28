export default (num) => {
  const digits = String(+num).split('');
  const key = ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM',
    '', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC',
    '', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];
  let romanNum = '';
  let i = 3;
  // eslint-disable-next-line no-plusplus
  while (i--) romanNum = (key[+digits.pop() + (i * 10)] || '') + romanNum;
  return Array(+digits.join('') + 1).join('M') + romanNum;
};
