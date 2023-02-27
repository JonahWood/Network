<template>
    <div class="container-fluid">
<div class="row">
    <div class="col-12 mt-3">
        <img class="coverimg-css" :src="profile?.coverImg">
    </div>
    <div class="col-5 mt-1">
        <h1> <img class="profile-picture" :src="profile?.picture"> {{profile?.name}}
            <span v-if="profile?.graduated"><i class="mdi mdi-school"></i></span> 
            <span v-if="profile?.github"><a :href="profile?.github" target="_blank">
            <i class="mdi mdi-github"></i>
            </a></span>
            <span v-if="profile?.linkedin">
                <a :href="profile?.linkedin" target="_blank">
            <i class="mdi mdi-linkedin"></i>
                </a>
            </span>
<div class="ms-2"><h5>Class: {{ profile?.class ? profile?.class : 'None'}}</h5></div>
        </h1>
    </div>
    <div class="col-7 bio-class mt-3">
        <h4>{{ profile?.bio }} 
            
        </h4>
    </div>
    <div v-if="profile?.resume" class="offset-5 col-7 bio-class-2 mb-3"><h4>{{ profile?.resume }}</h4></div>
    <div v-for="p in posts" class="col-6">
    <PostsCard :post="p"/>
    </div>
    <div class="offset-4 col-3 mt-1">
    <button v-if="(page > 1)" @click="changePage(page = 1)">First</button>
    <button v-else disabled>First</button>
<button @click="changePage(page - 1)" v-if="(page > 1)">Previous</button>
<button v-else disabled>Previous</button>

</div>

<div class="col-2 mt-1">
<button @click="changePage(page + 1)" v-if="(page < max)">Next</button>
<button v-else disabled>Next</button>
<button v-if="(page < max)" @click="changePage(page = max)">Last</button>
<button v-else disabled>Last</button>

</div>
    <div v-for="a in ads" class="col-2">
    <Ad :ad="a"/>
    </div>
</div>

    </div>
</template>



<script>
import { onMounted, onUnmounted, computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { postsService } from '../services/PostsService';
import { adsService } from '../services/AdsService'
import { profilesService } from '../services/ProfilesService.js'
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import PostsCard from '../components/PostsCard.vue';




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

async function getAds(){
        try {
            adsService.getAds()
        } catch (error) {
            Pop.error(error)
            logger.error(error)
        }
        }

function test(){
    logger.log('testing')
}

onMounted(() => {
    getAds()
    getProfileById();
    getPostsByCreator();
});

onUnmounted(()=>{
    profilesService.clearProfile()
    postsService.clearPosts()
})

return {
    async changePage(page){
try {
  await postsService.changePage(page, route.params.id)
} catch (error) {
  Pop.error(error.message)
  logger.error('[this is the error from the changePage]', error)
}
},



    profile: computed(()=>AppState.profile),
    posts: computed(()=> AppState.posts),
    ads: computed(() => AppState.ads),
    page: computed(()=> AppState.page),
    max: computed(()=> AppState.max)
}
},
components: { PostsCard }
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

.profile-picture {
height: 10vh;
width: 10vh;
object-fit: cover;
border-radius: 50%;
border: 1px solid black;
box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.578);
}

.bio-class{
font-size: 3vh;
border-bottom: 1px solid #8080807a;
border-top: 1px solid #8080807a;
}

.bio-class-2{
font-size: 3vh;
border-bottom: 1px solid #8080807a;
}

.coverimg-css{
    height: 500px;
    width: 100%;
}


</style>