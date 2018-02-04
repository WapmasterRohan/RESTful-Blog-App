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
app.use(express.static("public"));   // to use this folder for stylesheets
mongoose.connect('mongodb://localhost/blogs');

// var db = mongoose.connection;

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

// Nothing to show at the index route, so redirect it to index route
app.get("/", (req, res) => res.redirect("/blogs"));

// Index route
app.get("/blogs", (req, res) => {
    Blog.find({}, function(err, blogs) {
        if (! err) {
            res.render("index", {
                blogs: blogs,
                title: "Blog App"
            })
        } else {
            res.render("error");
        }
    });
})

// New route
app.get("/blogs/new", (req, res) => res.render("new", {
    title: "Create Post"
}));

// Create route
app.post("/blogs", (req, res) => {
    let post = req.body;
    Blog.create(post, function(err, post) {
        if (err) {
            console.log("Error occurred");
            res.render("new", {
                title: "Create post"
            });
        } else {
            console.log(post);
            res.render("blogs", {
                post: post,
                title: "Blog App"
            });
        }
    });
});

// Create the server
app.listen(3000, () => console.log("App is opened in port 3000! "));