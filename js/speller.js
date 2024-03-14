export default {
  check,
  lookup,
};

var elements;

await loadPeriodicTable();

// ****************************

async function loadPeriodicTable() {
  elements = await (await fetch("periodic-table.json")).json();
}

function check(inputWord) {
  if (inputWord.length > 0) {
    for (let element of elements) {
      let symbol = element.symbol.toLowerCase();
      if (symbol.length <= inputWord.length) {
        //did symbol match first one or two characters in inputWord
        if (inputWord.slice(0, symbol.length) == symbol) {
          //still have characters left?
          if (inputWord.length > symbol.length) {
            let res = check(inputWord.slice(symbol.length));

            //match susccessully?
            if (res.length > 0) {
              return [symbol].concat(res);
            }
          } else {
            return [symbol];
          }
        }
      }
    }
  }

  return [];
}

function lookup(elementSymbol) {
  for (const el of elements) {
    if (elementSymbol.toLowerCase() === el.symbol.toLowerCase()) {
      return el;
    }
  }
}
