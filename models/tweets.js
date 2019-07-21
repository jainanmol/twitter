const moongose=require('mongoose');
const Schema=moongose.Schema;

//Create schema

const TweetSchema=new Schema({
  title: {
    type: String,
    required :true
  }
});

moongose.model('tweets', TweetSchema);