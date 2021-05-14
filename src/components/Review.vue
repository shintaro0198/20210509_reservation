<template>
  <div id="evaluation">
    <v-layout justify-space-between align-center class="mb-3">
      <div class="gothic-h6 font-weight-bold">レビュー</div><slot></slot>
    </v-layout>
    <template>
      <div v-for="item in limitedReviewList" :key="item.id">
        <div class="font-weight-bold">{{item.userName}}</div>
        <div class="d-flex">
          <v-rating v-model="item.rating" small dense half-increments readonly half-icon="mdi-star-half-full"  color="amber darken-1" class="mr-5"></v-rating>
          <p class="mt-1">{{item.comment}}</p>
        </div>
      </div>
      <v-btn @click="showMoreReview=!showMoreReview" class="ml-auto d-block">レビューを全て確認する</v-btn>
    </template>
    <template>
      <div v-if="showMoreReview===true">
        <div v-for="item in unlimitedReviewList" :key="item.id">
          <div class="font-weight-bold">{{item.userName}}</div>
          <div class="d-flex">
            <v-rating v-model="item.rating" small dense half-increments readonly half-icon="mdi-star-half-full"  color="amber darken-1" class="mr-5"></v-rating>
            <p>{{item.comment}}</p>
          </div>
        </div>
      </div>
    </template>
    <template>
      <v-rating v-model="rating" dense half-increments half-icon="mdi-star-half-full"  color="amber darken-1" class="body-2"></v-rating>
      <v-textarea solo dense v-model="comment" auto-grow></v-textarea>
      <v-btn @click="sendReview" class="ml-auto d-block">レビューを投稿する</v-btn>
    </template>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      rating:4,
      comment:"",
      reviewList:[],
      openReview: false,
      showMoreReview : false
    }
  },
  computed:{
    limitedReviewList(){
      return this.reviewList.slice(0,4)
    },
    unlimitedReviewList(){
      return this.reviewList.slice(4)
    }
  },
  props:['restaurantId'],
  methods:{
    async getReviews(){
      axios.get('https://thawing-sea-60162.herokuapp.com/api/evaluationsort/' + this.restaurantId)
      .then((response)=>{
        Promise.all(
          response.data.data.map((item)=>{
            return new Promise((resolve)=>{
              axios.get('https://thawing-sea-60162.herokuapp.com/api/user/' + item.user_id)
              .then((response)=>{
                const userName = response.data.data.name
                resolve(userName)
              })
            }).then((result)=>{
              const data ={
                id : item.id,
                userName : result,
                rating : parseInt(item.rating.toLocaleString()),
                comment : item.content
              }
              this.reviewList.push(data)
            })
          })
        ).then(()=>{
          this.reviewList.sort((a,b)=>{
            return a.id -b.id
          })
        })
      })
    },
    async sendReview(){
      await axios.post('https://thawing-sea-60162.herokuapp.com/api/evaluation',{
        user_id : this.$store.state.user.id,
        restaurant_id : this.restaurantId,
        rating : this.rating,
        content : this.comment
      })
      .then(()=>{
        this.$store.dispatch('reload')
      })
    }
  },
  async created(){
    this.getReviews()
  }
}
</script>

<style>

</style>