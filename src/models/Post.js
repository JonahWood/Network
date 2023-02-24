export class Post{
constructor(){
this.body = data.body
this.imgUrl = data.imgUrl
this.creatorId = data.creatorId
this.likeIds = data.likeIds
this.creator = new Profile(data.creator)
// this.createdAt = new Date(data.createdAt).toLocaleDateString()
}
}