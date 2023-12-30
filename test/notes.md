## Functional Testing Using A Headless Browser

### Simulate Actions Using a Headless Browser

- What is a headless browser?
    * A browser without a GUI aka no screen/window to see web pages, videos, etc. 
    * They still renders and understand HTML, CSS, JS like a normal browser which is great for testing since we don't use memory or space on visualizing web pages. 

- Why are we using Zombie.js?
    * Besides the cool theme, It is lightweight since we don't need extra installations like other headless browsers
    * It works in limited sandboxes like replit
    * CONS: Not as powerful as other headless browsers like Cypress or puppeteer

- How will Zombie.js and Mocha work together?
    * Mocha has a method or hook to allow us to setup code before running test which is good for very slow async tasks like updating or reading from DB or other tasks
    * In the case of headless browsers, You need to go to the webpage before running any test (focusing on visiting pages)
    * `SuiteSetup` hook is ran only once at the start of a test suite. 
    * It is same as `beforeAll` hook  
    [mocha hooks](https://mochajs.org/#hooks)

    

```sh

// Using Zombie.js with Mocha to setup lightweight client-side testing simulate user actions

1. Install zombie and import into test suite
```js
const Browser = require('zombie.js');
Browser.site = 'url of project';
```

2. Make a new instance of the browser interface
```js
const browser = new browser();
```

3. Use mocha's hook `suiteSetup` to get zombie headless browser ready for test with
cb function using done to end async work

suiteSetup(function(done){
    browser.visit('/[path]', done);
});
```

### Zombie methods 
- Zombie.js has methods (usually async) that allows us to imitiate user activity 
- `.fill()` on browser object fills in a form after taking in a element selector and text to fill in input. It returns a promise so we need to promise chain or async/await to continue. 
- `.pressButton()` is a method to call a form's submit button. It is async so use within a promise chain or async/await. 
- `.assert.success()` is a method to test if a response object has a status of 200
- `.assert.text()` is a method to insert text into a element selector
- `.assert.elements()` is a method to determine the number of elements on a webpage
note: all methods above are async
[Read zombie docs here. It's a quick read.](https://zombie.js.org/)
example:
```js
test('Submit the surname "Polo" in the HTML form', function (done) {
  browser.fill('surname', 'Polo').then(() => {
    browser.pressButton('submit', () => {
      browser.assert.success();
      browser.assert.text('span#name', 'Marco');
      browser.assert.text('span#surname', 'Polo');
      browser.assert.elements('span#dates', 1, {atMost: 1});
      done();
    });
  });
});

/*
First, the fill method of the browser object fills the surname field of the form with the value 'Polo'. fill returns a promise, so then is chained off of it.

Within the then callback, the pressButton method of the browser object is used to invoke the form's submit event listener. The pressButton method is asynchronous.

Then, once a response is received from the AJAX request, a few assertions are made confirming:

The status of the response is 200
The text within the <span id='name'></span> element matches 'Marco'
The text within the <span id='surname'></span> element matches 'Polo'
There is 1 <span id='dates'></span> element.
Finally, the done callback is invoked, which is needed due to the asynchronous test.
*/
```