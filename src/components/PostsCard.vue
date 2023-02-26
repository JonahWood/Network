<template>
<div class="card p-2">
    
    <div>
        <div>{{ post.body }}</div>
        <img class="rounded img-fluid" height="500" :src="post.imgUrl" alt="image.png">
    </div>
    <router-link :to="{name: 'Profile', params: {profileId: post.creatorId}}">
    <div class="d-flex p-2  justify-content-end selectable">
        <img :title="`${post.creator.name}'s page`" class="profile-picture" :src="post.creator.picture" alt="">
    </div>
</router-link>
</div>
</template>


<script>
import { Post } from '../models/Post';

export default {
    props: {
        post: {
            type: Object,
            required: true
            
        }
    },

    setup(props){
        return {}
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