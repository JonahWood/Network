<template>
<div>
    <img class="img-fluid" :title="ad.title" :src="ad.tall" alt="">
</div>
</template>


<script>
import { Ad } from '../models/Ad';

export default {

    props: {
        ad: {
            type: Object,
            required: true
        }
    },
    setup(){
        return {}
    }
}
</script>


<style lang="scss" scoped>

</style>