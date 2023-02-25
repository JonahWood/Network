<template>
  <span class="navbar-text">
    <button class="btn selectable text-success lighten-30 text-uppercase my-2 my-lg-0" @click="login"
      v-if="!user.isAuthenticated">
      Login
    </button>
    <div v-else>
      <div class="d-flex about text-start justify-content-between">
        <h1>Hello 
          <router-link :to="{name: 'EditAccountPage'}">
          <span title="Edit Account" :data-content="account.name" class="prof-text">{{ account.name }}</span>
        </router-link>
        <h6 v-if="account.github">
          <a :href="account.github" target="_blank">
            <i class="mdi mdi-github"></i>
          </a>
        </h6>
        </h1>
        <div><img class="profile-picture" :src="account.picture" :alt="account.name"></div>
      </div>
      <div class="container-fluid">
        <div class="row">
          <div class="col-6">
            <img height="350" :src="account.coverImg" :alt="account.name">
          </div>
          <div class="col-6 bio-class">
            <span class="">{{ account.bio }}
        </span>
          </div>
        </div>
      </div>
      <div>
        

      </div>
            <!-- <div class="list-group-item dropdown-item list-group-item-action text-danger selectable" @click="logout">
              <i class="mdi mdi-logout"></i>
              logout
            </div> -->
          </div>
  </span>
</template>

<script>
import { getGlobalThis } from '@vue/shared'
import { computed } from 'vue'
import { AppState } from '../AppState'
import EditAccountPage from '../pages/EditAccountPage.vue'
import { accountService } from '../services/AccountService'
import { AuthService } from '../services/AuthService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
export default {
  setup() {
    async function getGit(){
      try {
        accountService.getGit()
      } catch (error) {
        Pop.error(error.message)
        logger.error(error)
      }
    }
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-picture {
  height: 10vh;
  width: 10vh;
  object-fit: cover;
  border-radius: 50%;
}

.bio-class{
  font-size: 3vh;
  border-bottom: 1px solid #80808049;
  border-top: 1px solid #80808049;
}
.prof-text {
color: white;
cursor: pointer;
}
.prof-text:hover {    
      color:#313131;
      -webkit-animation:colorchange 20s infinite alternate;
}

    @-webkit-keyframes colorchange {
      0% {
        
        color: rgb(169, 169, 255);
      }
      
      10% {
        
        color: #d063ff;
      }
      
      20% {
        
        color: #1abc9c;
      }
      
      30% {
        
        color: #d35400;
      }
      
      40% {
        
        color: blue;
      }
      
      50% {
        
        color: #34495e;
      }
      
      60% {
        
        color: blue;
      }
      
      70% {
        
        color: #2980b9;
      }
      80% {
     
        color: #f1c40f;
      }
      
      90% {
     
        color: #2980b9;
      }
      
      100% {
        
        color: pink;
      }
    }
</style>
