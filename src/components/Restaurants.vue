<template>
  <div id="restaurant">
    <v-row class="mx-auto">
      <v-col class="mx-auto" v-for="item in list" :key="item.id">
        <v-card width="200px">
          <v-img :src="item.img"></v-img>
          <v-card-title>{{item.name}}</v-card-title>
          <v-card-text>
            <v-rating readonly small dense half-increments half-icon="mdi-star-half-full" color="amber darken-1" v-model="item.rating" ></v-rating>
            <div class="mb-3">
              <span class="mr-3">#{{item.location}}</span><span>#{{item.genre}}</span>
            </div>
            <v-layout justify-space-between>
              <v-btn color="primary" @click="$router.push({name:'Detail',params:{restaurant_id:item.id}})">詳しく見る</v-btn>
              <v-icon v-if="item.favorite===true" @click="like(item.id);item.favorite=!item.favorite" color="red">mdi-cards-heart</v-icon>
              <v-icon v-else @click="like(item.id,item.favorite);item.favorite=!item.favorite">mdi-heart-outline</v-icon>
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
      num:10,
      heart : false
    }
  },
  props:['searchedLocation','searchedGenre','searchedText'],
  computed:{
    list(){
      let searchedList = [];
      if(this.searchedText!==""){
        for (let item of this.restaurantList){
          if(item.name.indexOf(this.searchedText)!== -1 ||item.kana_name.indexOf(this.searchedText)!== -1){
            searchedList.push(item)
          } 
        }
      } else{
        searchedList = this.restaurantList
      }
      return searchedList
    },
    searchItems(){
      return [this.searchedLocation,this.searchedGenre]
    },
    location(){
      let location = 'All area';
      if(this.searchedLocation!==""){
        location = this.searchedLocation
      }
      return location
    },
    genre(){
      let genre = 'All genre';
      if(this.searchedGenre!==""){
        genre = this.searchedGenre
      }
      return genre
    }
  },
  watch:{
    searchItems : async function(){
      await axios.get(`https://thawing-sea-60162.herokuapp.com/api/search?location=${this.location}&genre=${this.genre}`)
      .then((response)=>{
        this.getFavorites(response.data.data)
      })
    }
  },
  methods:{
    async getRestaurantList(){
      await axios.get('https://thawing-sea-60162.herokuapp.com/api/restaurant')
      .then((response)=>{
        this.getFavorites(response.data.data)
      })
    },
    getFavorites(restaurants){
      this.restaurantList = []
      Promise.all(restaurants.map((item)=>{
          return new Promise((resolve)=>{
            new Promise((resolve)=>{
              axios.get(`https://thawing-sea-60162.herokuapp.com/api/favorite?user_id=${this.$store.state.user.id}&restaurant_id=${item.id}`)
              .then((response)=>{
                const favorite = response.data.favorite
                resolve(favorite)
              })
            })
            .then((result)=>{
              let restaurant = {
                id : item.id,
                name : item.name,
                kana_name : item.kana_name,
                rating : item.rating,
                location : item.location,
                genre : item.genre,
                favorite : result,
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
    },
    async like(restaurantId){
      await axios.post('https://thawing-sea-60162.herokuapp.com/api/favorite',{
        user_id : this.$store.state.user.id,
        restaurant_id : restaurantId
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