const express  = require("express");
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/',require("./webScraper").scraper);
app.get('/fetchToken/:id',require("./tokenFetcher").fetcher);
app.post('/savedata',require('./processData').save);
app.get('/getdata',require('./processData').getData);
const port = 8000;

app.listen(port,(err)=>{
    if(err){
        console.log(`Error in starting the server ${err}`);
        return;
    }

    console.log(`server is running at port ${port}`)
})
