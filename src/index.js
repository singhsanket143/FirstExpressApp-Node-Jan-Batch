const express = require('express');
const bodyParser = require('body-parser');
// When we call the function express we create a new express server object

const app = express(); // http server object

const PORT = 3000;


app.use(bodyParser.json()); 
app.use(bodyParser.text());
app.use(bodyParser.urlencoded());

// express middleware
function m1(req, res, next) { // next => m2
    console.log('Inside middleware m1');
    // return res.json({msg: 'not ok'})
    // m2(req, res);
    console.log("Req.user inside m1", req.user); // undefined

    req.user = {id: 1, email: 's@s.com'}
    next();

    console.log("after calling next in m1")
}

function m2(req, res, next) { // next => cb func
    console.log('Inside middleware m2');
    console.log("Req.user inside m2", req.user); // {...}

    next();

    console.log("after calling next in m2")

}

app.get('/home', m1, m2, (req, res) => {
    // everytime someone calls the /home route, this callback will be called
    console.log("/home called");

    console.log(req.url, req.query);

    return res.json({msg: 'ok'}); // here we are passing a js object
});

app.get('/products/:product_id/rating/:rate', (req, res) => {
    // :id part is variable and products is static
    // :id part is your url params and overall these kind of routes are called as dynammic routes
    console.log(req.params);
    const pid = req.params.product_id;
    return res.json({productId: pid, rating: req.params.rate});
});

app.post('/data', (req, res) =>{

    console.log(req.body);
    
    return res.json({msg: 'ok'});
})

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`)
});


// how can the client send custom data to the server
/**
 * 1. URL Params -- /products/7
 * 2. Query Params -- ?key1=value1&key2=value2&key3=value3
 * 3. Request Body
 * 
 */