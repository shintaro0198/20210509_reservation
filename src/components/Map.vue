<template>
  <div id="map">
    <v-img :src="map"></v-img>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      map : ""
    }
  },
  props:['restaurantId'],
  methods:{
    getRestaurantMap(){
      axios.get('https://thawing-sea-60162.herokuapp.com/api/map/' + this.restaurantId)
      .then((response)=>{
        const lat = response.data.data.lat;
        const ing = response.data.data.ing;
        this.map = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${ing}&zoom=18&size=400x400&markers=color:red|${lat},${ing}&key=AIzaSyC7oe5fBTfkn646uSD2waHW-_aw4wT84nQ`
      })
    }
  },
  async created(){
    this.getRestaurantMap()
  }
}
</script>

<style>

</style>