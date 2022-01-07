//permute function found here:
//https://stackoverflow.com/questions/43241174/javascript-generating-all-combinations-of-elements-in-a-single-array-in-pairs
function permute(valuesArray: number[]) {
  var combi = [];
  var temp = [];
  var slent = Math.pow(2, valuesArray.length);

  for (var i = 0; i < slent; i++) {
    temp = [];
    for (var j = 0; j < valuesArray.length; j++) {
      if (i & Math.pow(2, j)) {
        temp.push(valuesArray[j]);
      }
    }
    if (temp.length > 0) {
      combi.push(temp);
    }
  }

  return combi;
}

export default permute;
