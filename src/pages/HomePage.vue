<template>
<div class="container">
  <div class="row">
    <div v-for="p in posts" class="col-8 mb-3">
      <PostsCard :post="p"/>
    </div>
    <div class="offset-1 col-2">

    </div>
  </div>
</div>
</template>

<script>
import { onMounted, computed } from 'vue';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { postsService } from '../services/PostsService'
import { AppState } from "../AppState"
import PostsCard from '../components/PostsCard.vue';



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
        onMounted(() => {
            getPosts();
        });
        return {
            posts: computed(() => AppState.posts.posts)
        };
    },
    components: { PostsCard }
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
