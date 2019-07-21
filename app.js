console.log('twitter');

const Twit=require('twit');
const express=require('express');
const app=express();
const exphbs=require('express-handlebars');
const mongoose=require('mongoose');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const config=require('./config');


mongoose.connect('mongodb://localhost:27017/twit-pro',{
  useNewUrlParser: true
}).then(()=>{
  console.log('Mondodb connected');
}).catch(err=> console.log("not connecting to mongodb"));

//Load tweet model
require('./models/tweets');
const Tweet= mongoose.model('tweets');

app.get('/',(req,res)=>{
   res.render('list');
console.log(Tweet);
 /*  Tweet.find()
    .then(tweets=>{
     res.render('./list',{
      tweets : tweets
  });
})*/;
})

app.get('/refreshlist',(req,res)=>{
  var T=new Twit(config);
  
  var params={ 
    q: '#realDonaldTrump',
    count: 10,
    result_type:'recent',
    lang: 'en' 
  }
  function gotData(err, data, response) {
    var tweets=data.statuses;
    var tweetChunk=[];
    tweets.forEach((data)=>{
     const newTweet={
        title : data.text
      }
      new Tweet(newTweet)
      .save();
    });
    // console.log(Tweet.find());
    res.render('./list',{
      tweets : tweets
    })
  }
  T.get('search/tweets',params,gotData);
  
});
 const port =process.env.PORT || 8000;

app.listen(8000,()=>{
  console.log('listening to 8000');
});

