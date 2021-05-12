<template>
  <div id="favorites">
    <p class="font-weight-bold gothic-h6">お気に入り店舗</p>
    <v-row class="mx-auto">
      <v-col class="mx-auto" v-for="item in restaurantList" :key="item.id">
        <v-card width="230px">
          <v-img :src="item.img"></v-img>
          <v-card-title>{{item.name}}</v-card-title>
          <v-card-text>
            <v-rating readonly small dense half-increments half-icon="mdi-star-half-full" color="amber darken-1" v-model="item.rating"></v-rating>
            <div class="mb-3">
              <span class="mr-3">#{{item.location}}</span><span>#{{item.genre}}</span>
            </div>
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
              const name = response.data.data.name;
              const img = response.data.data.img;
              const getReview = new Promise((resolve)=>{
              axios.get('https://thawing-sea-60162.herokuapp.com/api/evaluationsort/' + response.data.data.id)
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
              Promise.all([getReview,getLocationName,getGenreName]).then((values)=>{
                const restaurant = {
                  id : item.restaurant_id,
                  name : name,
                  rating : values[0],
                  location : values[1],
                  genre : values[2],
                  img : img
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