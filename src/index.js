const express = require('express'),
    morgan = require('morgan'),
    app = express(),
    bodyParser = require('body-parser');
    cors = require('cors');

const graphqlHTTP = require("express-graphql");
const schema = require("./graphql/schema");

const checkAuth = require('./middlewares/checkAuth');


//app.use(bodyParser.json());
app.use(express.json());

require('dotenv').config();

// settings
app.set('port', process.env.PORT || 4000);

app.use(cors());

// middlewares
app.use(morgan('dev'));
//app.use(express.urlencoded({extended: true}))
app.use(checkAuth);

// error handler
app.use(function(err, req, res, next){
    res.status(400).json({error: err, message: err.message});
});

// Graphql
app.use(
    '/graphql',
    graphqlHTTP.graphqlHTTP((req, res) => {
      return {
        graphiql: {        
          headerEditorEnabled: true    
        },
        schema,
        context: {
          req: req,
          res: res
        }
      }
    })
)

// starting the server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});
