module.exports = function getZerosCount(number, base) {
  // your implementation
  let baseArr = [];
  let divisionResultsArr = [];
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

  factors.reverse();
  let factorsLen = factors.length;
  let localBase = base;
  let counter = 1;

  for (let i = 0; i < factorsLen; i++) {

    let maxFactor = factors[i];
    let localMaxFactor = maxFactor;

    if (localBase > 0) {
      if (localBase % maxFactor === 0) {
        if (maxFactor <= localBase) {
          baseArr.push([maxFactor, counter]);
          localBase -= maxFactor * counter;
          counter++;
          maxFactor *= localMaxFactor;
        }
        i--;
        counter = 1;
      }
    }
  }

  let baseArrLen = baseArr.length;
  for (let i = 0; i < baseArrLen; i++) {

    getdivisionResultsArr(baseArr[i][0]);
    let reducedValue = divisionResultsArr.reduce((p, c) => p + c, 0);
    resultsArr.push(reducedValue / baseArr[i][1]);
  }

  function getdivisionResultsArr(x) {
    let localX = x;

    while (localX <= number) {
      divisionResultsArr.push(parseInt(number / localX));
      localX *= x;
    }
    return divisionResultsArr;
  }

  let unicFactors = [...new Set(factors)];
  return (unicFactors.length === 1) ? Math.floor(Math.min.apply(null, resultsArr) / factors.length) : Math.floor(Math.min.apply(null, resultsArr));
}