const path = require('path');
const express = require('express');
const hbs = require('hbs');
const Geocode = require('./utils/geocode');
const foreCast = require('./utils/forecast');

const app = express();
const publicDirecteryPath = path.join(__dirname,"../public")
const viewTemplate = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.use(express.static(publicDirecteryPath))
app.set('view engine','hbs')
app.set('views',viewTemplate)
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Shivam'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        meg:"this is help page",
        name:"Shivam"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about me',
        name:'Shivam'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
       return res.send({
            error:'You must provide an address'
        })
    }else{
        Geocode(req.query.address,(error,data)=>{
          if(error){
            return res.send({
                error:error
            })
          }
            foreCast(data.latitude,data.longitude,(error,forecastData)=>{
             if(error){
                return res.send({
                    error:error
                })
             }
             res.send({
                forecast:forecastData,
                location:data.place_name
            });
            })
        }) 
      }
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        error:'The Help page you requested does not exists',
        name:'Shivam'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        error:'The was not found',
        name:'Shivam'
    })
})

app.listen(3000,()=>{
    console.log('This app is running')
});