<template>
  <div id="detail">
    <Header>
      <v-btn @click="$router.push('/mypage')" text class="font-weight-bold white--text">マイページ</v-btn>
    </Header>
    <v-row class="mt-5 mx-10">
      <v-col cols="10" xl="5" md="5" sm="8" class="mx-auto">
        <RestaurantDetail :restaurantId="restaurant_id">
          <v-btn x-small text class="d-block ml-auto" @click="showReview=!showReview">レビューを確認する</v-btn>
        </RestaurantDetail>
      </v-col>
      <v-col cols="10" xl="5" md="5" sm="8" class="mx-auto" v-if="showReview===true">
        <Review :restaurantId="restaurant_id">
          <v-btn @click="showReview=!showReview" small text>レビューを閉じる</v-btn>
        </Review>
      </v-col>
      <v-col cols="10" xl="5" md="5" sm="8" class="mx-auto mt-11 mb-10">
        <Reserve :restaurantId="restaurant_id">
          <div>予約する</div>
        </Reserve>
      </v-col>
    </v-row>
    
  </div>
</template>

<script>
import Header from '../components/Header'
import RestaurantDetail from '../components/RestaurantDetail'
import Review from '../components/Review'
import Reserve from '../components/Reserve'
export default {
  data(){
    return{
      showReview:false
    }
  },
  props:['restaurant_id'],
  components:{
    Header,RestaurantDetail,Review,Reserve
  }
}
</script>

<style>

</style>