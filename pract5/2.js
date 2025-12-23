function secondLargest(arr) {
  const uniqueArr = [...new Set(arr)];
  uniqueArr.sort((a, b) => b - a);
  
  if (uniqueArr.length > 1) {
    return uniqueArr[1];
  } else {
    return undefined;
  }
}