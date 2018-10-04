module.exports = function getZerosCount(number, base) {
  // your implementation
  let baseArr = [];
  let resultsArr = [];
  let factors = primeFactors();

  function primeFactors() {
    let locBase = base;
    let factors = [];
    let divisor = 2;

    while (locBase >= 2) {
      if (locBase % divisor === 0) {
        factors.push(divisor);
        locBase = locBase / divisor;
      } else {
        divisor++;
      }
    }
    return factors;
  }

  let factorsSet = [...new Set(factors)];
  let localBase = base;

  for (let i = 0, factorsLen = factorsSet.length; i < factorsLen; i++) {
    let maxFactor = factorsSet[i];
    let localMaxFactor = maxFactor;
    let counter = 0;

    while (localBase % maxFactor === 0) {
      counter++;
      maxFactor *= localMaxFactor;
    }

    baseArr.push([localMaxFactor, counter]);
    localBase = localBase / Math.pow(localMaxFactor, counter);
    counter = 0;
  }

  for (let i = 0, baseArrLen = baseArr.length; i < baseArrLen; i++) {
    let reducedValue = getdivisionResultsArr(baseArr[i][0]).reduce(
      (p, c) => p + c,
      0
    );
    resultsArr.push(Math.floor(reducedValue / baseArr[i][1]));
  }

  function getdivisionResultsArr(x) {
    let divisionResultsArr = [];
    let localX = x;

    while (localX <= number) {
      divisionResultsArr.push(parseInt(number / localX));
      localX *= x;
    }
    return divisionResultsArr;
  }

  return Math.min.apply(null, resultsArr);
};
