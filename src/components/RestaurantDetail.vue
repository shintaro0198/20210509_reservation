<template>
  <div id="restaurant">
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
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      restaurant:{},
      reviewLength:""
    }
  },
  props:['restaurantId'],
  methods:{
    async getRestaurantDetail(){
      await axios.get('https://thawing-sea-60162.herokuapp.com/api/restaurant/' + this.restaurantId)
      .then((response)=>{
        const getReview = new Promise((resolve)=>{
          axios.get('https://thawing-sea-60162.herokuapp.com/api/evaluationsort/' + this.restaurantId)
          .then((response)=>{
            this.reviewLength = response.data.data.length
            if(response.data.data.length>0){
              const ReviewList = []
              Promise.all((response.data.data.map((item)=>{
                return new Promise((resolve)=>{
                  ReviewList.push(parseInt(item.rating))
                  resolve()
                })
              }))).then(()=>{
                const sum = ReviewList.reduce((sum,element)=>{
                  return sum + element
                })
                const average = sum/response.data.data.length
                console.log(sum)
                resolve(average)
              })
            } else{
              const rating = 0
              resolve(rating)
            }
          })
        })
        const getLocationName = new Promise((resolve)=>{
          axios.get('https://thawing-sea-60162.herokuapp.com/api/location/' + response.data.data.location_id)
          .then((response)=>{
            const location = response.data.data.name
            resolve(location)
          })
        })
        const getGenreName = new Promise((resolve)=>{
          axios.get('https://thawing-sea-60162.herokuapp.com/api/genre/' + response.data.data.genre_id)
          .then((response)=>{
            const genre = response.data.data.name
            resolve(genre)
          })
        })
        Promise.all([getReview,getLocationName,getGenreName]).then((values)=>{
          this.restaurant = {
            id : response.data.data.id,
            name : response.data.data.name,
            rating : values[0],
            location : values[1],
            genre : values[2],
            detail : response.data.data.detail,
            img : response.data.data.img
          }
        })
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