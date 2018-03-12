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

        res.status(201).send(
            JSON.stringify(
                req.store.posts,
                null,
                2
            )
        )

    },
    updatePost(req, res) {
    },
    removePost(req, res) {
    }
}
