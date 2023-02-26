<template>
<div class="container">
  <div class="row">
    <div v-if="account.id" class="col-12 card my-2">
      <form @submit.prevent="createPost">
        <div class="mb-3">
            <label class="form-label">New Post</label>
            <input placeholder="Whats on your mind?" required v-model="editable.body" type="text" class="form-control">
        </div>
        <div class="mb-3">
            <label for="imgUrl" class="form-label">imgUrl</label>
            <input v-model="editable.imgUrl" type="url" class="form-control" id="imgUrl" placeholder="https://bcw.blob.core.windows.net/public/images/7538647622428924">
        </div>
        <div>
      <button type="submit" class="btn btn-primary mb-1" data-bs-dismiss="modal">
        Post
      </button>
    </div>
      </form>
    </div>
    <div v-for="p in posts" class="col-8 mb-3">
      <PostsCard :post="p"/>
    </div>
    <div v-for="a in ads" class="col-2">
      <Ad :ad="a"/>
    </div>
<div class="sticky-bottom">
  <button class=" btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">Your Profile</button>

<div class="offcanvas offcanvas-bottom bg-dark offcanvas-size-xxl " tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasBottomLabel">Your Profile</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body small">
    <Login />
  </div>
</div>
</div>
  </div>
</div>
</template>

<script>
import { onMounted, computed, ref } from 'vue';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { postsService } from '../services/PostsService'
import { adsService } from '../services/AdsService'
import { AppState } from "../AppState"
import PostsCard from '../components/PostsCard.vue';
import Ad from '../components/Ad.vue';
import Login from '../components/Login.vue';



export default {
    setup() {
      const editable = ref({})



        async function getPosts() {
            try {
                await postsService.getPosts();
            }
            catch (error) {
                Pop.error(error.message);
                logger.error(error);
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
        onMounted(() => {
            getPosts();
            getAds();
        });
        return {
          editable,
          async createPost(){
try {
  await postsService.createPost(editable.value)
} catch (error) {
  Pop.error(error.message)
  logger.error(error)
}
},
            account: computed(() => AppState.account),
            posts: computed(() => AppState.posts),
            ads: computed(() => AppState.ads)
        };
    },
    components: { PostsCard, Ad, Login }
}
</script>

<style scoped lang="scss">
.offcanvas-size-xxl {
    width: 100%;
    height: 66vh !important
}


.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
