const env = process.env.NODE_ENV || "developement"

if(env === "developement"){
  process.env.MONGODB_URI = "mongodb://localhost/storybooks";
  process.env.PORT = 3000;
}
