<template>
  <div id="reserve">
    <v-card>
      <v-card-title>
        予約
      </v-card-title>
      <v-card-text>
        <template>
          <v-text-field label="日程" v-model="date" @click="showDatePicker=!showDatePicker" readonly></v-text-field>
          <v-scroll-y-transition>
            <div v-show="showDatePicker==true">
              <v-date-picker v-model="date" locale="jp-ja" :allowed-dates="allowedDates" :day-format="date => new Date(date).getDate()"></v-date-picker>
              <v-btn @click="showDatePicker=!showDatePicker" text color="primary">決定</v-btn>
            </div>
          </v-scroll-y-transition>
        </template>
        <template>
          <v-text-field label="時刻" v-model="time" @click="showTimePicker=!showTimePicker"></v-text-field>
          <v-scroll-y-transition>
            <div v-show="showTimePicker==true">
              <v-time-picker v-model="time" ampm-in-title format="24hr" :allowed-hours="allowedHours"></v-time-picker>
              <v-btn @click="showTimePicker=!showTimePicker" text color="primary">決定</v-btn>
            </div>
          </v-scroll-y-transition>
        </template>
        <template>
          <v-select :items="numbers" label="人数" v-model="number"></v-select>
        </template>
        <template>
          <div class="font-weight-bold">
            <v-row><v-col>レストラン</v-col><v-col>レストラン</v-col></v-row>
            <v-divider></v-divider>
            <v-row><v-col>日程</v-col><v-col>{{date}}</v-col></v-row>
            <v-divider></v-divider>
            <v-row><v-col>時刻</v-col><v-col>{{time}}</v-col></v-row>
            <v-divider></v-divider>
            <v-row><v-col>人数</v-col><v-col>{{number}}</v-col></v-row>
            <v-divider></v-divider>
          </div>
        </template>
      </v-card-text>
      <template><v-btn color="primary" tile class="d-block text-center" width="100%" @click="reserve">予約する</v-btn></template>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      show: false,
      date:"",
      time:"",
      number:"",
      numbers:[1,2,3,4,5],
      showDatePicker:false,
      showTimePicker:false,
      allowedHours:[10,11,12,13,14,15,16,17,18,19,20],
      showCalendarTitle: false
    }
  },
  props:['restaurantId'],
  methods:{
    allowedDates(){
      return [1,2,3,4,5]
    },
    reserve(){
      axios.post('https://thawing-sea-60162.herokuapp.com/api/reservation',{
        user_id : this.$store.state.user.id,
        restaurant_id : this.restaurantId,
        date : this.date,
        time : this.time,
        number : this.number
      })
      .then(()=>{
        this.$router.push('/reserved')
      })
    }
  },
}
</script>

<style>

</style>