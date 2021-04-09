var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var app = express();
var sc = require("./models/model1")
var sc2 = require("./models/model2")
var data1 = require('./MOCK-DatA-1');
var data2 = require('./MOCk-DATA-2');
const { join } = require('path');
const { json } = require('express');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('view engine','hbs');
mongoose.connect("mongodb+srv://sunchu_000:sunchu_000@cluster0.xbvjf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false}).then(()=> console.log('connected'))
app.get('/',(req,res)=>{
    // data1.forEach(element => {
    //     const sc11 = new sc({
    //         full_name:element.full_name,
    //         email:element.email,
    //         number:element.number,
    //         city:element.city,
    //         url:element.url
    //     });
    //     sc11.save();
    // });
    // data2.forEach(element => {
    //     const sc12 = new sc1({
    //         full_name:element.full_name,
    //         email:element.email,
    //         team_name:element.team_name
    //     });
    //     sc12.save();
// });
res.render('index');
});
app.get('/display',async (req,res)=>{
     
    const user1 =await sc.aggregate([
        {
            $lookup:{
                from:"sc2",
                localField:'full_name',
                foreignField:'full_name',
                as:'Team_name',
            },            
           
        },
        { 
            $replaceRoot: {
              newRoot: {
                 $mergeObjects:[{
                  $arrayElemAt:["$Team_name",0]
              },
              "$$ROOT"
              ]
            }
          },
        },
        {
            $project:{
                'Team_name':0,
                _id:0,
                __v:0
            }
        }
    ]).then(data=>{
        
        res.render('index',{array:data});
       // console.log(resp);
    })

   

});

const port = process.env.PORT || 8080;
app.listen(port , () => { console.log("server started.....") });