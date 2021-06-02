<template>
  <div id="restaurant">
    <v-row>
      <v-col cols="10"  xl="5" md="5" class="mx-auto">
        <v-layout justify-space-between align-center>
          <div class="gothic-h6 mb-3 font-weight-bold"><v-icon class="mr-5" @click="$router.push('/')">mdi-arrow-left</v-icon><span>{{restaurant.name}}</span></div>
          <div>
            <v-rating :value="restaurant.rating" readonly half-increments dense half-icon="mdi-star-half-full" color="amber darken-1" class="d-inline-block"></v-rating><span class="body-2">({{reviewLength}})</span>
            <slot></slot>
          </div>
        </v-layout>
        <v-img :src="restaurant.img"></v-img>
        <div class="mt-5"><span>#{{restaurant.location}}</span><span>#{{restaurant.genre}}</span></div>
        <p class="mt-5 font-weight-bold">{{restaurant.detail}}</p>
      </v-col>
      <v-col cols="10" xl="5" md="5" class="mx-auto">
        <div v-if="restaurant.course_menu!=undefined">
          <p class="gothic-h6 font-weight-bold">おすすめコースメニュー</p>
          <p>{{restaurant.course_menu.title}}</p>
          <p style="white-space: pre-wrap;">{{restaurant.course_menu.detail}}</p>
        </div>
      </v-col>
    </v-row>
    </div>
  
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      restaurant:{},
      reviewLength:0
    }
  },
  props:['restaurantId'],
  methods:{
    async getRestaurantDetail(){
      await axios.get('https://thawing-sea-60162.herokuapp.com/api/restaurant/' + this.restaurantId)
      .then((response)=>{
       this.restaurant = response.data.data
       this.reviewLength = response.data.data.review.length
      })
    },
  },
  async created(){
    this.getRestaurantDetail()
  }
}
</script>

<style>

</style>