import { AppState } from "../AppState"
import { Post } from "../models/Post"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class PostsService{
async getPosts(){
    const res = await api.get('api/posts')
    // logger.log(res.data)
    AppState.posts = res.data.posts
    // AppState.posts.map(p => new Post(p))
    logger.log('[posts from the appstate]', AppState.posts)
}

async getPostsByCreator(query){
    const res = await api.get('api/posts', {params: query})
    logger.log('this profiles posts:', res.data)
    AppState.posts = res.data.posts
    logger.log('aaaaaaaaaa',AppState.posts)
}

clearPosts(){
    AppState.posts = []
}

async createPost(postData){
    const res = await api.post('api/posts', postData)
    AppState.posts.unshift(res.data)
    return res.data
}


async deletePost(postId){
    let postIndex = AppState.posts.findIndex(p=>p.id == postId)
    const res = await api.delete(`api/posts/${postId}`)
    AppState.posts.splice(postIndex, 1)
}
}

export const postsService = new PostsService