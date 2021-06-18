<template>
  <div id="mypage">
    <Header>
      <v-btn text class="white--text text-subtitle1 font-weight-bold" @click="$router.push('/')">店舗一覧</v-btn>
    </Header>
    <div class="mt-5 mx-10">
      <div>
        <v-col class="gothic-h6 font-weight-bold ml-xl-auto ml-md-auto mx-auto mx-xl-0 mx-md-0 text-center text-xl-left text-md-left" cols="6">{{$store.state.user.name}}</v-col>
      </div>
      <v-row class="mt-5 mb-3">
        <v-col cols="10" xl="5" md="5" class="mx-auto">
          <Reservation @getEditData="EditData"></Reservation>
        </v-col>
        <v-col v-if="showEdit==true" cols="10" xl="5" md="5" class=" mx-auto">
          <Reserve :reservationId="id" :putMethod="'put'">予約情報を変更する</Reserve>
        </v-col>
        <v-col cols="10" xl="6"  md="6" class="mx-auto">
          <Favorites></Favorites>
        </v-col>
        <v-col cols="10" xl="5" md="5" class="mx-auto">
          <MyReview></MyReview>
        </v-col>
        <v-col v-if="showEdit===false" cols="10" xl="5" md="5" class="mx-auto"></v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import Reservation from '../components/Reservation'
import Reserve from '../components/Reserve'
import Favorites from '../components/Favorites'
import MyReview from '../components/MyReview'
export default {
  data(){
    return{
      favoriteList : [],
      showEdit : false,
      id : "",
    }
  },
  methods:{
    EditData(showEdit,reservationId){
      this.showEdit = showEdit;
      this.id = reservationId
    }
  },
  components:{
    Header,
    Reservation,
    Reserve,
    Favorites,
    MyReview
  },
}
</script>
