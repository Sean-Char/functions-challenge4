// Challenge 4
//**************************** GENERATE STARTING VALUES **********************

// Write a from function that produces a generator that will produce a series of values
function from(start) {
  return function() {
    var next = start;
    start += 1;
    return next;
  };
}

var index = from(0);
console.log(index()); // 0
console.log(index()); // 1
console.log(index()); // 2

//***************** TAKES GENERATE ENDING VALUE ****************

// Write a to function that takes a generator and an end value, and returns a generator that will produce numbers up to that limit.

function to(gen, end) {
  return function() {
    var value = gen();
    if (value < end) {
      return value;
    }
    return undefined;
  }
}

var index = to(from(1), 3);
console.log(index()); // 1
console.log(index()); //2
console.log(index()); // undefined

//*************************** GENERATE START & ENDING ******************************

// Write a fromTo function that produces a generator that will produce values in a range.

function fromTo(start, end) {
  return to(from(start), end);
}

var index = fromTo(0, 3);
console.log(index()); //0
console.log(index()); //1
console.log(index()); //2
console.log(index()); //undefined

//********************** ELEMENT FUNCTION ****************************

// Write an element function that takes an array and a generator and returns a generator that will produce elements from the array.
function element(array, gen) {
  return function() {
    var index = gen();
    if (index !== undefined) {
      return array[index];
    }
  }
}

var ele = element(['a','b','c','d'], fromTo(1, 3));
console.log(ele()); // 'b'
console.log(ele()); // 'c'
console.log(ele()); // undefined

//**************** MODIFY ELEMENT FUNCTION | OPTIONAL GENERATOR ********

// Modify the element function so that the generator argument is optional. If a generator is not provided, then each of the elements of the array will be produced.
function element(array, gen) {
  if (gen === undefined) {
    gen = fromTo(0, array.length);
  }
  return function() {
    var index = gen();
    if (index !== undefined) {
      return array[index];
    }
  };
}

var ele = element(['a','b','c','d'])
console.log(ele) // 'a';
console.log(ele) // 'b';
console.log(ele) // 'c';
console.log(ele) // 'd';
console.log(ele) // undefined;

//************************ PUSH GENERATOR VALUE INTO ARRAY *******************

// Write a collect function that takes a generator & an array & produces a function that will collect the results in the array.

function collect(gen, array) {
  return function() {
    var value = gen()
    if (value !== undefined) {
      array.push(value)
    }
    return array;
  }
}

var array = [];
var col = collect(fromTo(0, 2), array)
console.log(col()); //0
console.log(col()); //1
console.log(col()); //undefined

//********************** RECURSION TYPE FUNCTION *******************************

// Write a filter function that takes a generator & a predicate & produces a generator that produces only the values approved by the predicate.

// function filter(gen, predicate) {
//   return function() {
//     var value;
//     do {
//       value = gen();
//     } while (value !== undefined && !predicate(value));
//     return value;
//   }
// }

// ES6
function filter(gen, predicate) {
  return function recur() {
    var value = gen();
    if (value === undefined || predicate(value)) {
      return value;
    }
    return recur();
  }
}

var fil = filter(fromTo(0, 5), function third(value){
  return (value % 3) === 0;
});

console.log(fil()); //0
console.log(fil()); //3
console.log(fil()); //undefined

//*******************************************************

// Write a concat function that takes two generators & produces a generator that combines the sequences.
function concat(gen1, gen2) {
  var gen = gen1;
  return function() {
    var value = gen1();
    if (value !== undefined) {
      return value;
    }
    gen = gen2;
    return gen2();
  };
}

// ES6
// function concat(...gens) {
//   var next = element(gens);
//   var gen = next();
//   return function recur() {
//     var value = gen();
//     if (value === undefined) {
//       gen = next();
//       if (gen !== undefined) {
//         return recur();
//       }
//     }
//     return value;
//   }
// }

var con = concat(fromTo(0, 3), fromTo(0, 2));
console.log(con()); //0
console.log(con()); //1
console.log(con()); //2
console.log(con()); //0
console.log(con()); //1
console.log(con()); //undefined
