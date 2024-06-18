const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const helmet = require("helmet");
const session = require("express-session");

const db = require('./db/db')
const __userBlogRoute = require('./router/user/userblog')
const __userRoute = require('./router/user/user')
const __complaintRoute = require('./router/complaint.router.js')
  
const __adminRoute = require('./router/admin/admin') 

const multerError = require('./rules/handleError')

const app = express()

const nigeriaTimeZone = 'Africa/Lagos';
process.env.TZ = nigeriaTimeZone;
Intl.DateTimeFormat().resolvedOptions().timeZone; // Verify that the time zone is set to Nigeria's time zone


app.use(helmet({ dnsPrefetchControl: false }));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); 


// set up session middleware
app.use(
  session({
    secret: `${process.env.APP_STATE}`,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },   
  })
);

// enable secure credentials
dotenv.config()
// ALLOW COOKIES
app.use(cookieParser(`${process.env.APP_STATE}`))
// app.use(cookieParser())

// parse application/json
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const corsOption = {
    credentials: true,
    origin: ["http://localhost:5173", "http://localhost:5174", "http://127.0.0.1:5173", ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    optionSuccessStatus:200,
}


// app.set("trust proxy", 1)
app.use(cors(corsOption))


app.get("/", (req, res) => {
  return res.status(404).sendFile(__dirname + "/index.html");
});
app.use('/api/user', cors(corsOption),  __userRoute)
app.use('/api/complaint', cors(corsOption),  __complaintRoute)
app.use('/api/admin', cors(corsOption),  __adminRoute) 
app.use('/api/user-blog', cors(corsOption),  __userBlogRoute) 

app.use('/uploads',  express.static('./uploads'))
app.use(multerError)
  
db.authenticate().then((res)=> console.log('Connected to Forum DB successfully.')
).catch((err) => console.error('Unable to connect to the database:', err));
 

app.listen(process.env.LOCAL_PORT, console.log("Connection started at", process.env.LOCAL_PORT));
