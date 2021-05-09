<template>
  <div id="favorites">
    <v-row class="mx-auto">
      <v-col class="mx-auto" v-for="item in restaurantList" :key="item.id">
        <v-card width="230px">
          <v-img :src="item.img"></v-img>
          <v-card-title>{{item.name}}</v-card-title>
          <v-card-text><span class="mr-3">#{{item.location}}</span><span>#{{item.genre}}</span></v-card-text>
          <v-card-text>
            <v-layout justify-space-between>
            <v-btn color="primary" @click="$router.push({name:'Detail',params:{restaurant_id:item.id}})">詳しく見る</v-btn>
            <v-icon @click="like(item.id)" color="red">mdi-cards-heart</v-icon>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      restaurantList:[]
    }
  },
  methods:{
    async getRestaurantList(){
      await axios.get('https://thawing-sea-60162.herokuapp.com/api/favorite/'  + this.$store.state.user.id)
      .then((response)=>{
        Promise.all(response.data.data.map((item)=>{
          return new Promise((resolve)=>{
            axios.get('https://thawing-sea-60162.herokuapp.com/api/restaurant/' + item.restaurant_id)
            .then((response)=>{
              let name = response.data.data.name;
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
                let restaurant = {
                  id : item.restaurant_id,
                  name : name,
                  location : values[0],
                  genre : values[1],
                  img : item.img
                }
                this.restaurantList.push(restaurant)
                resolve()
              })
            })
          })
        })).then(()=>{
          this.restaurantList.sort((a,b)=>{
            return a.id<b.id
          })
        })
      })
    },
    async like(restaurantId){
      console.log(this.$store.state.user.id,restaurantId)
      await axios.post('https://thawing-sea-60162.herokuapp.com/api/favorite',{
        user_id : this.$store.state.user.id,
        restaurant_id : restaurantId
      })
      .then(()=>{
        this.restaurantList = []
        this.getRestaurantList();
      })
    }
  },
  async created(){
    this.getRestaurantList()
  }
}
</script>

<style>

</style>