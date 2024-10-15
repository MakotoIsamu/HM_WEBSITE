require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongo')
const cors = require('cors')
const app = express()
const AuthRoutes = require('./routes/AuthRoutes')
const PORT = process.env.PORT || 3000

app.use(cors({
    origin: 'https://hm-website-frontend.vercel.app/',
    methods: ['GET', 'POST'],
    credentials: true,
}))
app.use(express.json())
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: MongoDBStore.create({
        mongoUrl: process.env.MONGO_URL,
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
}))

//Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB')
}).catch((err) => {
    console.log(err)
})

app.get('/', (req, res) => {
    res.send('Api is running')
})

app.use('/auth', AuthRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})

