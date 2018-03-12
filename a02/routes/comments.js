module.exports = {
    getComments(req, res) {

        let commV = (req.store.posts[req.params.postId]||{}).comments

        if(commV){
            res.status(200).send(
                commV
            )
        }else{
            res.status(200).send(
                'There is no comments on this posts'
            )
        }

    }, 
    addComment(req, res) {

        let newComment = req.body
        let commV = (req.store.posts[req.params.postId]||{}).comments

        if(commV){
            req.store.posts[req.params.postId].comments.push(newComment.text)
        }else{

            req.store.posts[req.params.postId].comments = []
            req.store.posts[req.params.postId].comments.push(newComment.text)

        }

        res.status(201).send('Your comment was saved')

    },
    updateComment(req, res) {

        let updComm = req.body

        req.store.posts[req.params.postId].comments[req.params.commentId] = updComm.text

        res.status(200).send("Comment id "+req.params.commentId+" from Post id "+req.params.postId+" is updated")
    },
    removeComment(req, res) {

        if((req.params||{}).commentId){

            req.store.posts[req.params.postId].comments.splice(req.params.commentId, 1)

            res.status(200).send("The comment id "+req.params.commentId+" from post id "+req.params.postId+" was removed")

        }else{

            req.store.posts[req.params.postId].comments = []

        }
    }
}
