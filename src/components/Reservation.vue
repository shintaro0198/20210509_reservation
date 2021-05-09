<template>
  <div id="reservation">
    <p class="text-h6 font-weight-bold">
      予約状況
    </p>
    <v-card color="blue white--text" v-for="(item,index) in list" class="mb-10" :key="item.reservationId">
      <v-card-title class="mb-3">
        <v-icon class="mr-5 white--text">mdi-clock-time-four-outline
        </v-icon>
        <v-col>予約{{index+1}}</v-col>
        <v-col class="text-right"><v-icon color="white">mdi-information-outline</v-icon></v-col>
      </v-card-title>
      <v-card-text class="font-weight-bold white--text">
        <v-row>
          <v-col class="mr-3">レストラン</v-col>
          <v-col>{{item.name}}</v-col>
        </v-row>
      </v-card-text>
      <v-card-text class="font-weight-bold white--text">
        <v-row>
          <v-col class="mr-3">日程</v-col>
          <v-col>{{item.date}}</v-col>
        </v-row>
      </v-card-text>
      <v-card-text class="font-weight-bold white--text">
        <v-row>
          <v-col class="mr-3">時刻</v-col>
          <v-col>{{item.time}}</v-col>
        </v-row>
      </v-card-text>
      <v-card-text class="font-weight-bold white--text">
        <v-row>
          <v-col class="mr-3">人数</v-col>
          <v-col>{{item.number}}</v-col>
        </v-row>
      </v-card-text>
      <v-card-text>
        <v-btn v-if="showVerification===false" @click="showVerification=true" class="d-block ml-auto">予約キャンセル</v-btn>
        <v-card v-if="showVerification===true">
          <v-card-title>
            本当に予約をキャンセルしますか
          </v-card-title>
          <v-card-text>
            <v-layout justify-space-between>
            <v-btn @click="deleteReservation(item.reservationId)">はい</v-btn>
            <v-btn @click="showVerification=false">いいえ</v-btn>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      list : [],
      showVerification : false
    }
  },
  methods:{
    async getReservation(){
      await axios.get('https://thawing-sea-60162.herokuapp.com/api/reservesort/' + this.$store.state.user.id)
      .then((response)=>{
        Promise.all(response.data.data.map((item)=>{
          let reservationId = item.id
          let reservationDate = item.date;
          let reservationTime = item.time;
          let reservationNumber = item.number;
          return new Promise((resolve)=>{
            axios.get('https://thawing-sea-60162.herokuapp.com/api/restaurant/' + item.restaurant_id)
            .then((response)=>{
              let reservationName = response.data.data.name
              let restaurant = {
                reservationId : reservationId,
                name : reservationName,
                date : reservationDate,
                time : reservationTime,
                number : reservationNumber
              };
              this.list.push(restaurant)
              resolve()
            })
          })
        })).then(()=>{
        this.list.sort((a,b)=>{
          return a.reservationId - b.reservationId
        })
      })
      })
    },
    async deleteReservation(reservation_id){
      console.log(reservation_id)
      await axios.delete('https://thawing-sea-60162.herokuapp.com/api/reservation/' + reservation_id)
      .then(()=>{
        alert('予約をキャンセルしました')
      }).then(()=>{
        console.log('reload')
        this.list = []
        this.getReservation();
      })
    }
  },
  async created(){
   this.getReservation();
  }
}
</script>

<style>

</style>