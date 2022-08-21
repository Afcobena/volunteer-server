function isOwner(req,res,next){
    return req.payload._id === req.params
}


module.exports = {
    isOwner
}