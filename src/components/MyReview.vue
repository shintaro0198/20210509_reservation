<template>
  <div id="review">
    <p class="font-weight-bold gothic-h6">レビュー</p>
    <div v-for="item in reviewList" :key="item.id">
      <div class="font-weight-bold"><span class="mr-3">{{item.userName}}</span><span>{{item.restaurantName}}</span></div>
      <v-layout justify-space-between>
        <div class="d-flex">
          <v-rating v-model="item.rating" small dense half-increments readonly half-icon="mdi-star-half-full"  color="amber darken-1" class="mr-5"></v-rating>
          <p class="mt-1">{{item.comment}}</p>
        </div>
        <v-icon @click="item.showVerification=!item.showVerifycation">mdi-delete</v-icon>
      </v-layout>
      <v-card v-if="item.showVerification===true">
          <v-card-text>
            <p>レビューを削除しますか</p>
            <v-layout justify-space-between>
              <v-btn @click="deleteReview(item.id)">はい</v-btn>
              <v-btn @click="item.showVerification=false">いいえ</v-btn>
            </v-layout>
          </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      reviewList:[],
      showVerification : false
    }
  },
  methods:{
    async getMyReviews(){
      await axios.get(`https://thawing-sea-60162.herokuapp.com/api/evaluationsort?user_id=${this.$store.state.user.id}`)
      .then((response)=>{
        Promise.all(response.data.data.map((item)=>{
          return new Promise((resolve)=>{
              const getUserName = new Promise((resolve)=>{
                axios.get('https://thawing-sea-60162.herokuapp.com/api/user/' + item.user_id)
                .then((response)=>{
                  const userName = response.data.data.name
                  resolve(userName)
                })
              })
              const getRestaurantName = new Promise((resolve)=>{
                axios.get('https://thawing-sea-60162.herokuapp.com/api/restaurant/' + item.restaurant_id)
                .then((response)=>{
                  const restaurantName = response.data.data.name
                  resolve(restaurantName)
                })
              })
              Promise.all([getUserName,getRestaurantName]).then((values)=>{
                const data ={
                  id : item.id,
                  userName : values[0],
                  restaurantName : values[1],
                  rating : parseInt(item.rating.toLocaleString()),
                  comment : item.content,
                  showVerification : false
                }
                this.reviewList.push(data)
                resolve()
              })
            })
        })).then(()=>{
          this.reviewList.sort((a,b)=>{
            return a.id-b.id
          })
        })
      })
    },
    async deleteReview(reviewId){
      await axios.delete('https://thawing-sea-60162.herokuapp.com/api/evaluation/' + reviewId)
      .then(()=>{
        this.reviewList = []
        this.getMyReviews()
      })
    }
  },
  async created(){
    this.getMyReviews()
  }
}
</script>

<style>

</style>