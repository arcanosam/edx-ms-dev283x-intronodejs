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

    },
    removeComment(req, res) {

    }
}
