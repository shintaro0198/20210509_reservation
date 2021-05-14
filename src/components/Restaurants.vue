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
      location : "",
      genre : "",
      num:10,
      heart : false
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
    async getRestaurantList(){
      await axios.get('https://thawing-sea-60162.herokuapp.com/api/restaurant')
      .then((response)=>{
        Promise.all(response.data.data.map((item)=>{
          return new Promise((resolve)=>{
            const getReview = new Promise((resolve)=>{
              axios.get('https://thawing-sea-60162.herokuapp.com/api/evaluationsort/' + item.id)
              .then((response)=>{
                if(response.data.data.length>=1){
                  const reviewList = [];
                  Promise.all(response.data.data.map((item)=>{
                    return new Promise((resolve)=>{
                      reviewList.push(parseInt(item.rating))
                      resolve()
                    })
                  })).then(()=>{
                    const sum = reviewList.reduce((sum,element)=>{
                      return sum+element
                    })
                    const average = sum/response.data.data.length
                    resolve(average)
                  })
                } else{
                  const average = 0;
                  resolve(average)
                }
              })
            })
            const getLocationName = new Promise((resolve)=>{
              axios.get('https://thawing-sea-60162.herokuapp.com/api/location/' + item.location_id)
              .then((response)=>{
                const location = response.data.data.name
                resolve(location);
              })
            })
            const getGenreName = new Promise((resolve)=>{
              axios.get('https://thawing-sea-60162.herokuapp.com/api/genre/' + item.genre_id)
              .then((response)=>{
                const genre = response.data.data.name
                resolve(genre)
              })
            })
            const getFavorite = new Promise((resolve)=>{
              axios.get(`https://thawing-sea-60162.herokuapp.com/api/favorite?user_id=${this.$store.state.user.id}&restaurant_id=${item.id}`)
              .then((response)=>{
                const favorite = response.data.favorite
                resolve(favorite)
              })
            })
            Promise.all([getReview,getLocationName,getGenreName,getFavorite]).then((values)=>{
              let restaurant = {
                id : item.id,
                name : item.name,
                rating : values[0],
                location : values[1],
                genre : values[2],
                favorite : values[3],
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
    }
  },
  async created(){
    this.getRestaurantList();
  },
}
</script>

<style>

</style>