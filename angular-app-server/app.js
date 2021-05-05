const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const graphSchema = require('./graphql/schema');
const graphResolver= require('./graphql/resolvers');
const cookieParser = require('cookie-parser')
const { ApolloServer } = require('apollo-server-express');
const {validateTokensMiddleware} = require('./middleware/cookies');
const cors = require('cors');

  
const app =  express();

const port = process.env.PORT || '3001';
const mongooseCode = 'mongodb+srv://MartinR:Ukumasing1@cluster0.qyiy9.mongodb.net/onlineShop?retryWrites=true&w=majority'
mongoose.connect(mongooseCode)
    .then( result => {
        console.log('mongoose connected');
    })
    .catch(err => {
        console.log(err);
    })

app.use(bodyParser.json());



/*
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    if(req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });*/
  

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.status;
    const message = error.message;
    res.status(status).json({message: message});
});

var corsOptions = {
  origin: "http://localhost:3000",
  credentials: true // <-- REQUIRED backend setting
};
app.use(cors(corsOptions));



const apolloServer = new ApolloServer({
  schema: graphSchema,
  rootValue: graphResolver,
  graphiql: true,
  context: ({ req, res }) => ({ req, res }),
  
  credentials: "include",
  playground: {
    settings: {
      "request.credentials": "include"
    }
  },
  formatError(err) {
    if(!err.originalError) {
      return err;
    }
    const data = err.originalError.data;
    const message = err.message || "an error occurred"
    const code = err.originalError.code || 500
    return {data, message, code}
  }
})


app.use(cookieParser());
app.use(validateTokensMiddleware); // middleware to be built
apolloServer.applyMiddleware({ app, cors: false });


app.listen(port, (result) => {
    console.log('server started');
});
module.exports = app;

