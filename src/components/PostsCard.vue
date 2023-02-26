<template>
<div class="card p-2 posts-sizenstuff">
    
    <div>
        <span><h5 class="d-flex justify-content-between">{{ post.body }} <i @click="deletePost(post.id)" v-if="account?.id == post.creatorId" class="mdi mdi-delete selectable"></i></h5>  </span>
        <img class="rounded img-fluid" height="500" :src="post.imgUrl" alt="https://bcw.blob.core.windows.net/public/images/7538647622428924">
    </div>
    <router-link :to="{name: 'Profile', params: {profileId: post.creatorId}}">
    <div class="d-flex p-2  justify-content-end selectable">
        <img :title="`${post.creator.name}'s page`" class="profile-picture" :src="post.creator.picture" alt="https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg">
    </div>
</router-link>
</div>
</template>


<script>
import { Post } from '../models/Post';
import { computed } from 'vue'
import { AppState } from '../AppState';
import Pop from '../utils/Pop';
import { logger } from '../utils/Logger';
import { postsService } from '../services/PostsService';

export default {
    props: {
        post: {
            type: Object,
            required: true
            
        }
    },

    setup(props){
        return {
            async deletePost(postId){
                try {
                    if (await Pop.confirm("Are you sure you'd like to delete this post?")) {
                        await postsService.deletePost(postId)
                    }
                } catch (error) {
                    Pop.error(error.message)
                    logger.error('this is the logger in [deletePost]',error)
                }
            },


            account: computed(() => AppState.account)
        }
    }
}
</script>


<style lang="scss" scoped>
.profile-picture {
height: 10vh;
width: 10vh;
border-radius: 50%;
box-shadow: 2px 2px 4px black;
}
</style>