const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const expressSanitizer = require('express-sanitizer');
// const methodOverride = require('method-override');

app.use(bodyParser.urlencoded({
    extended: true
}));
// app.use(expressSanitizer());
// app.use(methodOverride('_method')) // Override with POST having ?_method=DELETE
app.set("view engine", "ejs");
mongoose.connect('mongodb://localhost/blogs');

var db = mongoose.connection;

const Schema = mongoose.Schema;
const blogSchema = new Schema({
    title:  String,
    // author: String,
    body:   String,
    // comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    // hidden: Boolean,
    // meta: {
    //   votes: Number,
    //   favs:  Number
    // }
});
const Blog = mongoose.model('Blog', blogSchema); // singular form of the database name
// let firstPost = {
//     title: "First blog post",
//     body: "My first blog post"
// };
// Blog.create(firstPost, function(err, blog) {
//     if (err) {
//         console.log("Error occurred");
//     } else {
//         console.log(blog);
//     }
// });

// Nothing to show at the index route, so redirect it to index route
app.get("/", (req, res) => res.redirect("/blogs"));

app.get("/blogs", (req, res) => {
    Blog.find({}, function(err, blogs) {
        if (! err) {
            console.log(blogs);
        }
    });
})

app.listen(3000, () => console.log("App is opened in port 3000! "));