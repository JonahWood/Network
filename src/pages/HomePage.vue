<template>
<div class="container">
  <div class="row">
    <div v-for="p in posts" class="col-8 mb-3">
      <PostsCard :post="p"/>
    </div>
    <div v-for="a in ads" class="col-2">
      <Ad :ad="a"/>
    </div>
<div v-if="account.id" class="sticky-bottom">
  <button class=" btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">Your Profile</button>

<div class="offcanvas offcanvas-bottom" tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasBottomLabel">Profile</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body small">
    put the profile junk here future Jonah
    good luck (づ◔ ͜ʖ◔)づ
  </div>
</div>
</div>
  </div>
</div>
</template>

<script>
import { onMounted, computed } from 'vue';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { postsService } from '../services/PostsService'
import { adsService } from '../services/AdsService'
import { AppState } from "../AppState"
import PostsCard from '../components/PostsCard.vue';
import Ad from '../components/Ad.vue';



export default {
    setup() {
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
            account: computed(() => AppState.account),
            posts: computed(() => AppState.posts),
            ads: computed(() => AppState.ads)
        };
    },
    components: { PostsCard, Ad }
}
</script>

<style scoped lang="scss">
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
