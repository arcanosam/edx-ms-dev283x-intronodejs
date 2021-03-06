const express = require('express') 
const logger = require('morgan')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser')

let app = express() 

app.use(bodyParser.json())
app.use(logger('dev'))
app.use(errorhandler())

let store = {
    posts: [{
        "name": "Top 10 ES6 Features every Web Developer must know",
        "url": "https://webapplog.com/es6",
        "text": "This essay will give you a quick introduction to ES6. If you don’t know what is ES6, it’s a new JavaScript implementation.",
        "comments": [
            "Cruel…..var { house, mouse} = No type optimization at all",
            "I think you’re undervaluing the benefit of ‘let’ and ‘const’.",
            "(p1,p2)=>{ … } ,i understand this ,thank you !"
        ]
    }]
}

app.use(
    (req, res, next) => {
        req.store = store
        next()
    }
)

let {getPosts,addPost,updatePost,removePost} = require('./routes').postsM
let {getComments,addComment,updateComment,removeComment} = require('./routes').commM

app.get(
    '/posts',
    getPosts
)

app.post(
    '/posts', 
    addPost
)

app.get(
    '/posts/:postId/comments', 
    getComments
)

app.post(
    '/posts/:postId/comments', 
    addComment
)

app.put(
    '/posts/:postId',
    updatePost
)

app.put(
    '/posts/:postId/comments/:commentId',
    updateComment
)

app.delete(
    '/posts/:postId/comments/:commentId',
    removeComment
)

app.delete(
    '/posts/:postId',
    removePost
)

app.listen(3000)
