// fourth step was database making with api
// third step of admin panel making
require ("dotenv").config();
const express = require('express');
const cors = require("cors")
const app = express();
const contactRoute = require("./router/contact-router")
const authRoute = require("./router/auth-router")
const serviceRoute = require("./router/service-router")   // second step of this page db
const connectDb = require ("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const adminRoute = require("./router/admin-router")
// lets tackle cors
const corsOptions = {
    origin:"http://localhost:5173",
    methods:"GET, POST, PUT, DELETE , PATCH , HEAD",
    credentials:true
}

app.use(cors(corsOptions));

app.use(express.json());
app.use("/api/auth",authRoute);
app.use("/api/form",contactRoute);       
app.use("/api/data",serviceRoute);   //take this step 1st in page
// let's define admin route
app.use("/api/admin",adminRoute);

app.use(errorMiddleware);

const PORT = 5000;
connectDb().then(() =>{
app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
});
});