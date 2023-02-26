<template>
    <div class="container-fluid">
<div class="row">
    <div class="col-12">
        <img class="coverimg-css" :src="profile?.picture" :alt="profile?.name">
    </div>
    <div class="col-4">
        <h1>{{profile?.name}}
            <span v-if="profile?.graduated"><i class="mdi mdi-school"></i></span> 
            <span v-if="profile?.github"><a :href="profile?.github" target="_blank">
            <i class="mdi mdi-github"></i>
            </a></span>
        </h1>
    </div>
    <div class="col-8 bio-class mt-3">
        <h4>{{ profile?.bio }} 
            
        </h4>
    </div>
</div>

    </div>
</template>



<script>
import { onMounted, onUnmounted, computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { postsService } from '../services/PostsService';
import { profilesService } from '../services/ProfilesService.js'
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';



export default {
    setup(){
        // debugger
        const route = useRoute();
    async function getProfileById(){
        
    try {
    const profileId = route.params.profileId
    logger.log('prof-id', profileId)
    await profilesService.getProfileById(profileId)
} catch (error) {
    Pop.error(error.message)
    logger.error(error)
}
}
async function getPostsByCreator(){
    try {
        const profileId = route.params.profileId
        await postsService.getPostsByCreator({creatorId: profileId})
    } catch (error) {
        Pop.error(error.message)
        logger.error(error)
    }
}

function test(){
    logger.log('testing')
}

onMounted(() => {
    
    test();
    getProfileById();
    getPostsByCreator();
});

onUnmounted(()=>{
    profilesService.clearProfile()
    postsService.clearPosts()
})

return {
    profile: computed(()=>AppState.profile),
    posts: computed(()=> AppState.posts)
}
}
}

</script>


<style lang="scss" scoped>

.bio-class{
font-size: 3vh;
border-bottom: 1px solid #8080807a;
border-top: 1px solid #8080807a;
}

.coverimg-css{
    height: 500px;
    width: 100%;
}


</style>