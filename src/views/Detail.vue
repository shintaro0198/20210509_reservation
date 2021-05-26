<template>
  <div id="detail">
    <Header>
      <v-btn @click="$router.push('/mypage')" text class="font-weight-bold white--text">マイページ</v-btn>
    </Header>
    <v-row class="mt-5 mx-10">
      <v-col cols="12" class="mx-auto">
        <RestaurantDetail :restaurantId="restaurant_id">
          <v-btn x-small text class="d-block ml-auto" @click="showReview=!showReview" href="#review" style="transition : 1s">レビューを確認する</v-btn>
        </RestaurantDetail>
      </v-col>
      <v-col cols="10" xl="5" md="5" class="mx-auto" v-if="showReview===true" id="review">
        <Review :restaurantId="restaurant_id">
          <v-btn @click="showReview=!showReview" small text>レビューを閉じる</v-btn>
        </Review>
      </v-col>
      <v-col cols="10" xl="5" md="5" class="mx-auto">
        <Map :restaurantId="restaurant_id"></Map>
      </v-col>
      <v-col cols="10" xl="5" md="5" class="mx-auto">
        <Reserve :restaurantId="restaurant_id" :postMethod="'post'">
          <div>予約する</div>
        </Reserve>
      </v-col>
      <v-col v-if="showReview===true" cols="10" xl="5" md="5" class="mx-auto"></v-col>
    </v-row>
  </div>
</template>

<script>
import Header from '../components/Header'
import RestaurantDetail from '../components/RestaurantDetail'
import Map from '../components/Map'
import Review from '../components/Review'
import Reserve from '../components/Reserve'
export default {
  data(){
    return{
      showReview:false,
    }
  },
  props:['restaurant_id'],
  components:{
    Header,RestaurantDetail,Map,Review,Reserve
  },
}
</script>

<style>

</style>