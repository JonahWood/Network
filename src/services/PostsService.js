import { AppState } from "../AppState"
import { Post } from "../models/Post"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class PostsService{
async getPosts(){
    const page = 1
    // const res = await api.get('api/posts')
    const res = await api.get('api/posts?page=' + page)
    logger.log('ah shit here we go again',res.data)
    AppState.posts = res.data.posts
    AppState.page = page
    // AppState.max = res.data.posts.page.max
    AppState.max = res.data.totalPages
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


async changePage(page, id){
    if (id = null) {
        const res = await api.get('api/posts?page=' + page)
        AppState.posts = res.data.posts
        AppState.page = page
    } else {
        const res = await api.get('api/posts', { params: { creatorId: id, page: page } })
        AppState.posts = res.data.posts
        AppState.page = page
    }
}

async search(searchData){
    const res = await api.get('api/posts', {params: searchData})
    logger.log('the search found', res.data)
    AppState.posts = res.data.posts
    AppState.page = res.data.page
}

}

export const postsService = new PostsService