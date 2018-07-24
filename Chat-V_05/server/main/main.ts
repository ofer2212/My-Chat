import * as http from 'http';
import app from './app';
import * as mongoose from 'mongoose'
const server = http.createServer(app);
mongoose.connect('mongodb://localhost:27017/chat').then(()=>{
    console.log("db connected")
}).catch((e)=>{console.log("db error",e)});


server.listen(4000, () => {
    console.log("Server is running");
});