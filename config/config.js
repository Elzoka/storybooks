const env = process.env.NODE_ENV || "developement"

if(env === "developement"){
  process.env.MONGODB_URI = "mongodb://localhost:27017/storybooks"
  process.env.PORT = 3000;
}
