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
}

export const postsService = new PostsService