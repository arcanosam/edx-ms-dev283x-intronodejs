module.exports = {
    getPosts(req, res) {
        res.status(200).send(req.store.posts)
    },
    addPost(req, res) {
    },
    updatePost(req, res) {
    },
    removePost(req, res) {
    }
}
