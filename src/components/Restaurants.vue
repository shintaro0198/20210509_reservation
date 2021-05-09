<template>
  <div id="restaurant">
    <v-row class="mx-auto">
      <v-col class="mx-auto" v-for="item in list" :key="item.id">
        <v-card width="230px">
          <v-img :src="item.img"></v-img>
          <v-card-title>{{item.name}}</v-card-title>
          <v-card-text><span class="mr-3">#{{item.location}}</span><span>#{{item.genre}}</span></v-card-text>
          <v-card-text>
            <v-layout justify-space-between>
            <v-btn color="primary" @click="$router.push({name:'Detail',params:{restaurant_id:item.id}})">詳しく見る</v-btn>
            <v-icon v-if="item.favorite=='available'" @click="like(item.id)" color="red">mdi-cards-heart</v-icon>
            <v-icon v-else @click="like(item.id)">mdi-heart-outline</v-icon>
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
      restaurantList : [],
      location : "",
      genre : "",
      num:10
    }
  },
  props:['searchedLocation','searchedGenre','searchedText'],
  computed:{
    list(){
      const searchedList = [];
      if(this.searchedText!==""){
        for (let item of this.restaurantList){
          if(item.name.indexOf(this.searchedText)!== -1){
            searchedList.push(item)
          }
        }
      } else if(this.searchedLocation==='All area' && this.searchedGenre==='All genre'){
        for(let item of this.restaurantList){
          searchedList.push(item)
        }
      }  else if(this.searchedLocation!=='All area' && this.searchedGenre==='All genre'){
        for(let item of this.restaurantList){
          if(item.location.indexOf(this.searchedLocation)!== -1){
            searchedList.push(item)
          }
        }
      } else if(this.searchedLocation==='All area' && this.searchedGenre!=='All genre'){
        for(let item of this.restaurantList){
          if(item.genre.indexOf(this.searchedGenre)!== -1){
            searchedList.push(item)
          }
        }
      } else{
        for(let item of this.restaurantList){
          if(item.location.indexOf(this.searchedLocation)!== -1 && item.genre.indexOf(this.searchedGenre)!== -1){
            searchedList.push(item)
          }
        }
      }
      return searchedList
    }
  },
  methods:{
    aaaa(){
      console.log(this.searchedLocation,this.searchedGenre,this.searchedText)
    },
    async getRestaurantList(){
      await axios.get('https://thawing-sea-60162.herokuapp.com/api/restaurant')
      .then((response)=>{
        Promise.all(response.data.data.map((item)=>{
          return new Promise((resolve)=>{
            const getLocationName = new Promise((resolve)=>{
              axios.get('https://thawing-sea-60162.herokuapp.com/api/location/' + item.location_id)
              .then((response)=>{
                let location = response.data.data.name
                resolve(location);
              })
            })
            const getGenreName = new Promise((resolve)=>{
              axios.get('https://thawing-sea-60162.herokuapp.com/api/genre/' + item.genre_id)
              .then((response)=>{
                let genre = response.data.data.name
                resolve(genre)
              })
            })
            const getFavorite = new Promise((resolve)=>{
              axios.get(`https://thawing-sea-60162.herokuapp.com/api/favorite?user_id=${this.$store.state.user.id}&restaurant_id=${item.id}`)
              .then((response)=>{
                let favorite = response.data.favorite
                resolve(favorite)
              })
            })
            Promise.all([getLocationName,getGenreName,getFavorite]).then((values)=>{
              let restaurant = {
                id : item.id,
                name : item.name,
                location : values[0],
                genre : values[1],
                favorite : values[2],
                img : item.img
              }
              this.restaurantList.push(restaurant)
              resolve();
            })
          })
        })).then(()=>{
            this.restaurantList.sort((a,b)=>{
              return a.id-b.id
            })
          })
      })
    },
    async like(restaurantId){
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
    this.getRestaurantList();
  },
}
</script>

<style>

</style>