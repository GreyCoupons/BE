const express = require('express')
const bodyParser = require('body-parser')
const {graphqlHTTP} = require('express-graphql') //export valid middleware function
const {buildSchema} = require('graphql')
const {Client} = require('pg')
require('./motd/motd')

const PORT = 4444
const app = express()
const events = []

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    password: 'idontknow',
    database: 'test'
})

client.connect()

app.use(bodyParser.json())

app.use(
    '/api',
    graphqlHTTP({
        schema: buildSchema(`
            type Event {
                _id: ID!
                title: String!
                description: String!
                price: Float!
                date: String!
            }

            input EventInput {
                title: String!
                description: String!
                price: Float!
                date: String
            }

            type RootQuery {
                events: [Event!]!
            }
            type RootMutation {
                createEvent(eventInput: EventInput): Event
            }
            schema {
                query: RootQuery
                mutation: RootMutation
            }
        `),
        rootValue: {
            events: () => events,
            createEvent: (args) => {
                const event = {
                    _id: Math.random().toString(),
                    title: args.eventInput.title,
                    description: args.eventInput.description,
                    price: +args.eventInput.price,
                    date: new Date().toISOString()
                }
                events.push(event)
                return event
            },
        },
        graphiql: true
}))

app.listen(PORT, () => {
    console.clear()
    console.log(motd(PORT))
})