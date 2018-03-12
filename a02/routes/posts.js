module.exports = {
    getPosts(req, res) {
        res.status(200).send(
            JSON.stringify(
                req.store.posts,
                null,
                2
            )
        )
    },
    addPost(req, res) {

        let newPost = req.body

        let id = req.store.posts.length

        req.store.posts.push(newPost)

        res.status(201).send("New post saved")

    },
    updatePost(req, res) {

        let updPost = req.body

        req.store.posts[req.params.postId]={
            "name":(updPost||{}).name,
            "url":(updPost||{}).url,
            "text":(updPost||{}).text,
            "comments":req.store.posts[req.params.postId].comments
        }

        res.status(200).send("Post id "+req.params.postId+" updated")

    },
    removePost(req, res) {
    }
}
