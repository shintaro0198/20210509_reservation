<template>
  <div id="mypage">
    <Header>
      <v-btn text class="white--text text-subtitle1 font-weight-bold" @click="$router.push('/')">店舗一覧</v-btn>
    </Header>
    <div class="mt-5 mx-10">
      <div>
        <v-col class="text-h6 font-weight-bold mx-auto mx-xl-0 mx-md-0 ml-xl-auto ml-md-auto text-center text-xl-left text-md-left" cols="6">{{$store.state.user.name}}</v-col>
      </div>
      <v-row class="mt-5 mb-3">
        <v-col cols="10" xl="5" md="5" class="mx-auto ml-xl-auto ml-md-auto">
          <Reservation></Reservation>
        </v-col>
        <v-col cols="10" xl="6"  md="6" class="ml-xl-auto ml-md-auto mx-auto">
          <p class="font-weight-bold text-h6">お気に入り店舗</p>
          <Favorites></Favorites>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import Reservation from '../components/Reservation'
import Favorites from '../components/Favorites'
export default {
  data(){
    return{
      favoriteList : [],
    }
  },
  methods:{
  },
  components:{
    Header,
    Reservation,
    Favorites
  },
}
</script>

<style lang="sass" scoped>
@import '../assets/saas/variables.scss'
</style>