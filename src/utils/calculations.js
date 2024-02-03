export const calculateMean = (array) => array.reduce((acc, val) => acc + val, 0) / array.length || 0

export const calculateMedian = (array) => {
  const sortedArray = array.slice().sort((a, b) => a - b);
  const middle = Math.floor(sortedArray.length / 2);
  return sortedArray.length % 2 === 0 ? (sortedArray[middle - 1] + sortedArray[middle]) / 2 : sortedArray[middle];
};

export const calculateMode = (array) => {
  const frequencyMap = {};
  array.forEach((value) => {
    frequencyMap[value] = (frequencyMap[value] || 0) + 1;
  });
  const mode = Object.keys(frequencyMap).reduce((a, b) => frequencyMap[a] > frequencyMap[b] ? a : b);
  return parseFloat(mode);
};

export const calculateGamma = (point) => {
  return (point.Ash * point.Hue) / point.Magnesium;
};
