const express = require('express');
const app = express();
var cors = require('cors')

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);

var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// Setup the server
const server = require('http').createServer(app);
server.listen(3000, () => {
    console.log("Server running on port", server.address().port);
});

// DB & ORM
const knexConfig = require('./knexfile');
const Knex = require('knex');
const { Model } = require('objection');
const knex = Knex(knexConfig.development);
Model.knex(knex);


// Create routes
const db = {
    Link: require('./models/Link')
}

app.get('/api/links', function (req, res) {
    db.Link.query().select().then(links => {
       
        res.send(links);
        
    });

});

app.get('/api/links/tags', function (req, res) {
    db.Link.query().select().then(links => {

        console.log(links)

       	let tagArray = [];
      	for (var val of links){
              console.log("val", val.tag)
              
          tagArray.push(val.tag);
        }
        console.log(tagArray)
        res.send(tagArray);
    });
  
});

app.post('/api/links', function (req, res) {
    const title = req.body.title;
    const link = req.body.link;
    const tag = req.body.tag;
    db.Link.query().insert({
        title: title,
        link: link,
        tag: tag
    }).then(persistedData => {
        const payload = persistedData;
        const status = 201;
        res.status(status)
        res.send(payload)
        // res.send({ "status": status, "message": "link has been successfully created", "data": payload })
    });
});


app.delete('/api/links/:id', (req, res) => {
    db.Link.query().delete().where({id:req.params.id}).then(res.send('Deleted successfully.'))
        
});
