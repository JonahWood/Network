<template>
<div class="card p-2 posts-sizenstuff">
    
    <div>
        <span><h5 class="d-flex justify-content-between">{{ post.body }} <i @click="deletePost(post.id)" v-if="account?.id == post.creatorId" class="mdi mdi-delete selectable"></i></h5> <h6>{{ new Date(post.createdAt).toLocaleDateString(`en-US`) }}</h6> </span>
        <img v-if="post.imgUrl" class="rounded img-fluid" height="500" :src="post.imgUrl" alt="">
    </div>
    <router-link :to="{name: 'Profile', params: {profileId: post.creatorId}}">
    <div class="d-flex p-2  justify-content-end selectable">
        <img :title="`${post.creator.name}'s page`" class="profile-picture" :src="post.creator.picture" alt="https://via.placeholder.com/300">
    </div>
</router-link>
<div class="likes d-flex justify-content-end mb-2">
    <i v-if="!post.likeIds.includes(account.id)" class="text-danger mdi mdi-heart-outline selectable" title="likes"
        @click="likePost(post.id)"></i>
    <i v-else class="text-danger mdi mdi-heart selectable " title="likes" @click="likePost(post.id)"></i>
    <div class="text ms-2">{{ post.likes.length }}</div>
    </div>
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
            
        },
    },



    
    setup(){
        return {
            async likePost(id){
                try {
                    await postsService.likePost(id)
                } catch (error) {
                    Pop.error(error.message)
                    logger.error('this is the logger in [likePost]',error)
                }
            },


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
img {
		display: block;
		position: relative;
		&:before {
			content: url(https://via.placeholder.com/300);
			display: block;
			width: 100%;
			height: 100%;
		}
	}

.likes{
    font-size: 3vh;
}
.profile-picture {
height: 10vh;
width: 10vh;
border-radius: 50%;
box-shadow: 2px 2px 4px black;
}
</style>