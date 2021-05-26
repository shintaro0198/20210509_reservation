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
              <v-date-picker v-model="date" locale="jp-ja" :allowed-dates="allowedDates" :day-format="date => new Date(date).getDate()" :min="today" :max="max"></v-date-picker>
              <v-btn @click="showDatePicker=!showDatePicker" text color="primary">決定</v-btn>
              <p>{{today}}</p>
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
          <v-select :items="numbers" label="人数" v-model="number" dense class="mt-5"></v-select>
        </template>
        <template>
          <div class="font-weight-bold">
            <v-row><v-col>レストラン</v-col><v-col>{{restaurantName}}</v-col></v-row>
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
      <template><v-btn color="primary" tile class="d-block text-center" width="100%" @click="reserve"><slot></slot></v-btn></template>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      show: false,
      restaurantName : "",
      date:"",
      time:"",
      number:"",
      numbers:[1,2,3,4,5,6,7,8,9,10],
      showDatePicker:false,
      showTimePicker:false,
      showCalendarTitle: false,
    }
  },
  computed:{
    today(){
      const date = new Date;
      const year = date.getFullYear()
      const month = date.getMonth()+1
      const editedMonth = ('0' +month ).slice(-2)
      const day = date.getDate()
      const today = year + '-' + editedMonth + '-' + day
      return today
    },
    max(){
      const date = new Date;
      const year = date.getFullYear()
      const month = date.getMonth()+1
      const editedMonth = ('0' + month ).slice(-2)
      const day = date.getDate()
      const max = year+1 + '-' + editedMonth + '-' +  day
      return max
    },
    allowedHours(){
      const allowedHoursList = [10,11,12,13,14,15,16,17,18,19,20,21,22];
      const date = new Date;
      const time = parseInt(date.getHours());
      const limitedHoursList = allowedHoursList.slice(time-9)
      if(this.date===this.today){
        return limitedHoursList
      } else{
        return allowedHoursList
      }
    }
  },
  props:['restaurantId','reservationId','postMethod','putMethod'],
  methods:{
    allowedDates(){
      return [1,2,3,4,5]
    },
    async getRestaurantName(){
      if(this.postMethod=="post"){
        await axios.get('https://thawing-sea-60162.herokuapp.com/api/restaurant/' + this.restaurantId)
        .then((response)=>{
          this.restaurantName = response.data.data.name
        })
      } else if(this.putMethod=="put"){
        await axios.get('https://thawing-sea-60162.herokuapp.com/api/reservation/' + this.reservationId)
        .then((response)=>{
          axios.get('https://thawing-sea-60162.herokuapp.com/api/restaurant/' + response.data.data.restaurant_id)
          .then((response)=>{
            this.restaurantName = response.data.data.name
          })
        })
      }
    },
    async reserve(){
      if(this.postMethod=="post"){
        if(this.date==="" || this.time==="" || this.number===""){
          alert('入力されていない項目があります')
        } else{
          await axios.post('https://thawing-sea-60162.herokuapp.com/api/reservation',{
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
      } else if(this.putMethod=="put"){
        if(this.date==="" || this.time==="" || this.number===""){
          alert('入力されていない項目があります')
        } else{
          await axios.put('https://thawing-sea-60162.herokuapp.com/api/reservation/'+this.reservationId,{
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
      }
      
    }
  },
  async created(){
    this.getRestaurantName()
  }
}
</script>

<style>

</style>