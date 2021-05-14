<template>
  <div id="reservation">
    <p class="gothic-h6 font-weight-bold">
      予約状況
    </p>
    <p v-if="reservationList.length===0">予約情報はありません</p>
    <v-card color="blue white--text" v-for="(item,index) in reservationList" class="mb-10" :key="item.reservationId">
      <template>
        <v-card-title class="mb-3">
          <v-icon class="mr-5 white--text">mdi-clock-time-four-outline
          </v-icon>
          <v-col>予約{{index+1}}</v-col>
        </v-card-title>
      </template>
      <template>
        <v-card-text class="font-weight-bold white--text">
          <v-row>
            <v-col class="mr-3">レストラン</v-col>
            <v-col>
              <div>{{item.name}}</div>
              <div v-if="item.showEdit===true"><v-text-field dense></v-text-field></div>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-text class="font-weight-bold white--text">
          <v-row>
            <v-col class="mr-3">日程</v-col>
            <v-col>
              <div>{{item.date}}</div>
              <div v-if="item.showEdit===true"><v-text-field dense></v-text-field></div>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-text class="font-weight-bold white--text">
          <v-row>
            <v-col class="mr-3">時刻</v-col>
            <v-col>
              <div>{{item.time}}</div>
              <div v-if="item.showEdit===true"><v-text-field dense></v-text-field></div>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-text class="font-weight-bold white--text">
          <v-row>
            <v-col class="mr-3">人数</v-col>
            <v-col>
              <div>{{item.number}}</div>
              <div v-if="item.showEdit===true"><v-text-field den></v-text-field></div>
            </v-col>
          </v-row>
        </v-card-text>
      </template>
      <template>
        <v-card-text>
          <v-btn v-if="item.showVerification===false" @click="item.showVerification=true" class="d-block ml-auto">予約キャンセル</v-btn>
          <v-card v-if="item.showVerification===true">
            <v-card-title>
              本当に予約をキャンセルしますか
            </v-card-title>
            <v-card-text>
              <v-layout justify-space-between>
              <v-btn @click="deleteReservation(item.id)">はい</v-btn>
              <v-btn @click="item.showVerification=false">いいえ</v-btn>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-card-text>
      </template>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      reservationList : [],
      showVerification : false
    }
  },
  methods:{
    async getReservation(){
      await axios.get('https://thawing-sea-60162.herokuapp.com/api/reservesort/' + this.$store.state.user.id)
      .then((response)=>{
        Promise.all(response.data.data.map((item)=>{
          const reservationId = item.id
          const reservationDate = item.date;
          const reservationTime = item.time;
          const reservationNumber = item.number;
          return new Promise((resolve)=>{
            axios.get('https://thawing-sea-60162.herokuapp.com/api/restaurant/' + item.restaurant_id)
            .then((response)=>{
              const reservationName = response.data.data.name
              const restaurant = {
                id : reservationId,
                name : reservationName,
                date : reservationDate,
                time : reservationTime,
                number : reservationNumber,
                showEdit : false,
                showVerification : false,
              };
              this.reservationList.push(restaurant)
              resolve()
            })
          })
        })).then(()=>{
        this.reservationList.sort((a,b)=>{
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
        this.reservationList = []
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