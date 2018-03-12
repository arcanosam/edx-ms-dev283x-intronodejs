#!/bin/bash

test_blog_api(){

    clear

    echo $1
    echo

    if [ -z "$3" ]
    then
        curl $2
    else
        if [ "$2" = "DELETE" ]
        then
            curl -X $2 $3
        else
            curl -H "$2" -X $3 -d "$4" "$5"
        fi
    fi

    echo
    echo

    read -p "Press enter to continue"

    echo
}

clear

echo "Assignment 02 tests start"

read -p "Press enter to continue"

test_blog_api "LOG: GET - All Blog posts and comments" "http://localhost:3000/posts"

test_blog_api "LOG: POST - Add new post" "Content-Type: application/json" "POST" '{"name": "Top 10 ES6 Features", "url":"http://webapplog.com/es6", "text": ""}' "http://localhost:3000/posts"

test_blog_api "LOG: GET - All Blog posts and comments" "http://localhost:3000/posts" 

test_blog_api "LOG: POST - add new comment to post id 0" "Content-Type: application/json" "POST" '{"text":"comment 4"}' "http://localhost:3000/posts/0/comments"

test_blog_api "LOG: GET - listing comments from post id 0" "http://localhost:3000/posts/0/comments" 

test_blog_api "LOG: POST - add a comment to post id 1" "Content-Type: application/json" "POST" '{"text":"comment 1"}'  "http://localhost:3000/posts/1/comments"

test_blog_api "LOG: GET - listing comments from post id 1" "http://localhost:3000/posts/1/comments"

test_blog_api "LOG: PUT - update post id 0" "Content-Type: application/json" "PUT" '{"name": "JS", "url":"", "text": "my new update"}' "http://localhost:3000/posts/0"

test_blog_api "LOG: GET - All Blog posts and comments" "http://localhost:3000/posts"

test_blog_api "LOG: PUT - update comment id 3 from post id 0" "Content-Type: application/json" "PUT" '{"text":"comment 4.1"}' "http://localhost:3000/posts/0/comments/3"

test_blog_api "LOG: GET - All Blog posts and comment" "http://localhost:3000/posts"

test_blog_api "LOG: DELETE - Deleting a comment" "DELETE" "http://localhost:3000/posts/0/comments/3"

test_blog_api "LOG: GET - All Blog posts and comment" "http://localhost:3000/posts"

test_blog_api "LOG: DELETE - Deleting a post" "DELETE" "http://localhost:3000/posts/0"

test_blog_api "LOG: GET - All Blog posts and comment" "http://localhost:3000/posts"

echo "Assignment 02 tests finished"
