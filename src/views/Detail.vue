<template>
  <div id="detail">
    <Header>
      <v-btn @click="$router.push('/mypage')" text class="font-weight-bold white--text">マイページ</v-btn>
    </Header>
    <v-row class="mt-5 mx-10">
      <v-col cols="10" xl="5" md="5" sm="8" class="mx-auto">
        <RestaurantDetail :restaurantId="restaurant_id"></RestaurantDetail>
      </v-col>
      <v-col cols="10" xl="5" md="5" sm="8" class="mx-auto mt-12 mb-10">
        <Reserve :restaurantId="restaurant_id"></Reserve>
      </v-col>
    </v-row>
    
  </div>
</template>

<script>
import Header from '../components/Header'
import RestaurantDetail from '../components/RestaurantDetail'
import Reserve from '../components/Reserve'
export default {
  data(){
    return{
    }
  },
  props:['restaurant_id'],
  components:{
    Reserve,RestaurantDetail,Header
  }
}
</script>

<style>

</style>