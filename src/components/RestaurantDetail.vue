<template>
  <div id="restaurant">
    <div class="text-h6 mb-5"><v-icon class="mr-5" @click="$router.push('/')">mdi-arrow-left</v-icon><span>{{restaurant.name}}</span></div>
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
    }
  },
  props:['restaurantId'],
  methods:{
    async getRestaurantDetail(){
      await axios.get('https://thawing-sea-60162.herokuapp.com/api/restaurant/' + this.restaurantId)
      .then((response)=>{
        
        const getLocationName = new Promise((resolve)=>{
          axios.get('https://thawing-sea-60162.herokuapp.com/api/location/' + response.data.data.location_id)
          .then((response)=>{
            let location = response.data.data.name
            resolve(location)
          })
        })
        const getGenreName = new Promise((resolve)=>{
          axios.get('https://thawing-sea-60162.herokuapp.com/api/genre/' + response.data.data.genre_id)
          .then((response)=>{
            let genre = response.data.data.name
            resolve(genre)
          })
        })
        Promise.all([getLocationName,getGenreName]).then((values)=>{
          this.restaurant = {
            id : response.data.data.id,
            name : response.data.data.name,
            location : values[0],
            genre : values[1],
            detail : response.data.data.detail,
            img : response.data.data.img
          }
        })
      })
    }
  },
  async created(){
    this.getRestaurantDetail()
  }
}
</script>

<style>

</style>