## Advanced Node and Express 

### Template Engine Setup

#### What is a template engine?
- A tool that lets us use static template files in our app. When the app is running the template engine swaps variables in the template with actual values which we can give it from our server (backend). It turns the template into a static HTML file that is used by client (frontend). 

- Pros: It's eaier to makea HTML page that shows variables without needing an API call to show some data. 
- Good for MVP iteration aka rapid prototyping. 

#### How to tell Express.js to set a specific template engine to use?
- We use Express app's `set` method with a key `view engine` with a value `pug` (or jade)
```js
app.set('view engine', 'pug');
```
- We use another `set` method to set the `views` key of the express app to point to `./views/pug` folder (directory). 

```js
app.set('views', './views/pug')
```

### Using a Template Engine's Powers

- One of the best features of a template engine is pass variables from the server to the template before turning into client-side html

- We can use variables in pug files like so:
```pug
head
    title=title
body
    <p>#{name}</p>
    <p>#{message}</p>
```

- The variables don't have values at the moment because we need to send them from the server using `res.render` with an object with each variable as a key with a value with want each one to have:

```js
app.get("/", ((req, res) =>{
    res.render('index', { title: 'Hello', message: 'Please log in', name: 'Guest' });
}))
```

When you reload server, you should see the values from server on the client-side!

 