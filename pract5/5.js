function isPalindrome(str) {
  const lowerStr = str.toLowerCase();
  const reversedStr = lowerStr.split('').reverse().join('');
  return lowerStr === reversedStr;
}