// Challenge 4
//**************************** GENERATE INCREMENT VALUES *******************************************

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

//***************** TAKES GENERATE FUNCTION AND CREATES END VALUE ****************

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

//*************************** 2 GENERATE ARGUMENT ******************************

// Write a fromTo function that produces a generator that will produce values in a range.

function fromTo(start, end) {
  return to(from(start), end);
}

var index = fromTo(0, 3);
console.log(index()); //0
console.log(index()); //1
console.log(index()); //2
console.log(index()); //undefined

//********************** ARRAY | GENERATOR ARGUMENT ****************************

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

//******************************************************************************

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

//****************************************************************************
