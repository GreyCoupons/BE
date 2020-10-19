// SETUP
var express = require('express')
var express_graphql = require('express-graphql')
var {buildSchema} = require('graphql')
// const server = express()
// require('dotenv').config() //enables environment variables
// const PORT = process.env.PORT || 4420

//GRAPHQL SCHEMA
var schema = buildSchema(`
    type Query {
        message: String
    }
`);

//ROOT RESOLVER
var root = {
  message: () => 'Hello Wold!'
};

//CREATE AN EXPRESS SERVER AND A GRAPHQL ENDPOINT
var app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
// MIDDLEWARE
// server.use(require('cors')())
// server.use(require('helmet')())
// server.use(express.json())

// // ROUTES
// server.get('/', (req, res) => {
//   res.send('API is running, bruh.')
// })

// app.listen(PORT, () => {
//   console.clear()
//   console.log(`
//         ██        ████      ██            
//             ██  ██  ██████      ██        
//   ██  ████  ████  ██████████████          
//       ████  ████  ██████████████    ██    
//     ████████████████████████████████      
//   ██████████████████████████████████           █████████░  ████████░  ████████░  ██████████░
//     ██████████████████████████████████             ██░     ██░        ██░            ██░
//   ██████████░░██████████░░██████████████           ██░     ████████░  ████████░      ██░
//     ████████████░░████░░░░██░░████████             ██░     ██░              ██░      ██░
//   ██  ████░░░░░░░░░░██░░░░░░░░░░██████             ██░     ████████░  ████████░      ██░
//   ██  ████░░████░░░░██░░░░░░░░░░██████    
//       ██░░░░████░░░░░░░░░░░░░░░░██  ████        ╔═══╗  ╔═══╗  ══╦══
//       ██░░░░████░░░░██░░░░░░░░░░██    ████      ╠═══╣  ╠═══╝    ║
//       ██░░░░████░░░░░░░░░░░░░░░░██    ████      ╩   ╩  ╩      ══╩══
//       ██░░░░████░░░░░░░░░░░░░░░░██    ████
//       ██░░░░████░░░░░░░░░░░░░░░░██    ████
//       ██░░░░░░██░░░░░░░░░░░░░░░░██    ████
//       ██░░░░░░░░░░░░░░░░░░░░░░░░██  ████  
//       ██░░░░░░░░░░░░░░░░░░░░░░░░██████    
//       ██░░░░░░░░░░░░░░░░░░░░░░░░████      
//       ██░░░░░░░░░░░░░░░░░░░░░░░░██        
//       ████░░░░░░░░░░░░░░░░░░░░░░██        
//       ████████████████████████████        
//       ██                        ██                                                PORT ${PORT}  
//       ████████████████████████████`)
// })

