function resolveAfter2Seconds(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, 1000);
  });
}

// node.js ではグローバルスコープに入れておく必要がある
global.resolveAfter2Seconds = resolveAfter2Seconds;

let AsyncFunction = Object.getPrototypeOf(async function(){}).constructor

let a = new AsyncFunction('a',
                          'b',
                          'return await resolveAfter2Seconds(a) + await resolveAfter2Seconds(b);');

a(10, 20).then(v => {
  console.log(v); // prints 30 after 2 seconds
});
