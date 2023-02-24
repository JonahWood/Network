<template>
<div class="card py-2">
    
    <div>
        <div>{{ post.body }}</div>
        <img class="m-1 rounded img-fluid" height="500" :src="post.imgUrl" alt="image.png">
    </div>
    <div class="d-flex p-2  justify-content-end">
        <img :title="`${post.creator.name}'s page`" class="profile-picture" :src="post.creator.picture" alt="">
    </div>
</div>
</template>


<script>
import { Post } from '../models/Post';

export default {
    props: {
        post: {
            type: Post,
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