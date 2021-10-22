<template>
<nav class="navbar navbar-light">
  <div class="container">
    <router-link class="navbar-brand" :to="{name: 'globalFeed'}">
      A&B
    </router-link>
    <template v-if="isLoggedIn">
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'globalFeed'}" exact active-class="active">
              Home
            </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'createArticle'}" active-class="active">
            <i class="ion-compose"></i> &nbsp; New Article
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'settings'}" active-class="active">
            <i class="ion-gear-a"></i> &nbsp; Settings
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'userProfile', params: {slug: currentUser.username}}" active-class="active">
            <img class="user-pic" :src="currentUser.image"/>
            &nbsp; {{currentUser.username}}
          </router-link>
        </li>
      </ul>
    </template>
    <template v-if="!isLoggedIn">
      <ul class="nav navbar-nav pull-xs-right">

        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'globalFeed'}"  exact active-class="active">
            Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'login'}" active-class="active">
            Sign in
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'register'}" active-class="active">
            Sign up
          </router-link>
        </li>

      </ul>
    </template>
  </div>
</nav>
</template>

<script>
// import {mapState} from 'vuex';
import {gettersTypes} from "@/store/modules/auth";
import {mapGetters} from 'vuex';

export default {
  name: "McvTopBar",
  computed: {
    ...mapGetters({
      currentUser: gettersTypes.currentUser,
      isLoggedIn: gettersTypes.isLoggedIn,
      isAnonymous: gettersTypes.isAnonymous
    }),


  }
}
</script>

<style scoped>

</style>
