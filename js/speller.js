export default {
  check,
  lookup,
};

var elements;
var symbols = {};

await loadPeriodicTable();

// ****************************

async function loadPeriodicTable() {
  elements = await (await fetch("periodic-table.json")).json();
  for (let element of elements) {
    symbols[element.symbol.toLowerCase()] = element;
  }
}

function findCandidates(inputWord) {
  var oneLetterSymbols = new Set();
  var twoLetterSymbols = new Set();

  for (let i = 0; i < inputWord.length; i++) {
    // collect one letter symbol options
    if (inputWord[i] in symbols) {
      oneLetterSymbols.add(inputWord[i]);
    }

    // collect two letter symbol options
    if (i <= inputWord.length - 2) {
      let two = inputWord.slice(i, i + 2);
      if (two in symbols) {
        twoLetterSymbols.add(two);
      }
    }
  }

  return [...twoLetterSymbols, ...oneLetterSymbols];
}

function spellWord(candidates, charsLeft) {
  for (let candidate of candidates) {
    let chunk = charsLeft.slice(0, candidate.length);

    //there is a match
    if (candidate == chunk) {
      //if there are remaining chars
      if (charsLeft.length > chunk.length) {
        //recurse over remaining
        let rest = charsLeft.slice(chunk.length);
        let res = spellWord(candidates, rest);
        
				//only if a path exists do we go continue
        if (res.length > 0) {
          return [candidate, ...res];
        }
      }

      //otherwise there are no remaining chars
      else {
        return [candidate];
      }
    }
  }

  //we only hit here if there are no matches
  return [];
}

function check(inputWord) {
  var candidates = findCandidates(inputWord);
  return spellWord(candidates, inputWord);
}

function lookup(elementSymbol) {
  return symbols[elementSymbol];
}
