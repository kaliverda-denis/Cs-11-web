function isAnagram(str1, str2) {
  const cleanAndSort = (str) => {
    return str
      .toLowerCase()
      .split('')
      .sort()
      .join('');
  };

  return cleanAndSort(str1) === cleanAndSort(str2);
}