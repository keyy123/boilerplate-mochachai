## Functional Testing with `chai-http` & `Mocha`

- Mocha can test async code like API endpoints via `chai-http` plugin

Example - 'GET /hello?name=[name] => "hello [name]"' using `chai-http`

```js
suite('GET /hello?name=[name] => "hello [name]"', function(){
    test('?name=John', function(done){
        chai
            .request(server)
            .keepOpen()
            .get('/hello?name=John')
            .end(function(err, res){
                assert.equal(res.status, 200, 'Response should be 200');
                assert.equal(res.text, 'hello John', 'Response should be hello John');
                done();
            })
    })
})

/*
Test sends a GET request to server with a name as URL query string (?name=John). 

IN the end method's cb fxn. the response object (res) is received which has a status property and text property 

We make 2 assertion in end cb function, One to check if status prop on res object is 200 and if the text from repsonse object is 'hello John'

done parameter is used w/o arguments at end of test to signal that the async work is done

keepOpen method is vital to keep server open to stop chai-http from closing servver especially so fcc can test your functional endpoints. It is used right after request method. 

NOTE: chai-http will start and stop server automatically without keepOpen method.
*/
```

Chai-http can use `PUT` method to test `PUT` requests and `send` method to send JSON or other forms of responses to be test by API endpoints

example - testing PUT requests with chai-http

```js
const server = require("../server.js");
test('some name that makes sense', function (done){
chai
    .request(server)
    .keepOpen()
    .put('/travellers') // 
    .send({ //
        "surname":"peep"
    })
    .end(function(err, res){
        //assertions on endpoint here
        //when done use done() to tell chai-http that async work is done
        done()
    })
})
```