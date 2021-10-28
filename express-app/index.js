import express from "express";
import path from "path";
import favicon from "serve-favicon";
import data from "./data/data.json";

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.use('/images', express.static('images'));

app.use(favicon(path.join(__dirname, 'public', "favicon.ico")));

// Method to use JSON
//app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) => {
    res.json(data);
});

// JSON data: {"hello": "JSON is Cool"}
// URLEncoded data: hello=URLEncoded+is+cool

app.post('/newItem', (req,res)=>{
    console.log(req.body);
    res.send(req.body);
});

app.get('/item/:id', (req, res, next) => {
    // Ths is the middleware that pulls the data
    let user = Number(req.params.id);
    //middleware that uses the req object
    console.log(`Request from: ${req.originalUrl}`);
    console.log(`Request type: ${ req.method }`);
    //everything above is middleware 
    res.send(data[user]);
    next();
}, (req, res) => {
    console.log('Did you get the right data?');
});

app.route('/item')
    .get((req, res) => {
        //throw new Error();
        //res.download("images/rocket.jpg");
        //res.redirect("https://www.linkedin.com");
        //res.end();
        res.send(`A GET request on /item at PORT: ${ PORT }`)
    }).post((req, res) => {
        res.send(`A POST request on /item at PORT: ${ PORT }`)
    }).put((req, res) => {
        res.send(`A PUT request on /item at PORT: ${ PORT }`)    
    }).delete ((req, res) => {
        res.send(`A DELETE request on /item at PORT: ${ PORT }`) 
    });

//Error handling function
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(`Red alert! Error happened: ${err.stack}`);
});

app.listen(PORT, () => {
    console.log(`Your server is running on PORT : ${ PORT }`);
});