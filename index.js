import  express  from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = 'https://api.weatherapi.com/v1/';
const KEY = '22470c34cea14d7aae075142233006';
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
let data;

app.get('/',(req,res)=>{
    res.render('index.ejs');
});

app.get('/result',(req,res)=>{
    res.render('result.ejs',{content:data});
});

app.get('/search', async (req,res)=>{
    const country = req.query.country;
    try{
        const response = await axios.get(`${API_URL}current.json?key=${KEY}&q=${country}`);
        data=response.data;
        res.redirect('/result');
    }catch (er){
        console.log(`error happend ${er.message}`);
    }
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
