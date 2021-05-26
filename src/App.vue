<template>
  <v-app>
    <v-main class="grey lighten-3 pb-10">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  
}
</script>

<style>
* :not(.v-icon) {
  font-family: '游ゴシック'
}
.v-application .text-h1,.v-application .text-h2,.v-application .text-h3,.v-application .text-h4,.v-application .text-h5,.v-application .text-h6,.v-application .text-subtitle-1{
  font-family: '游ゴシック'
}
.v-application *{
  font-family: '游ゴシック';
}
.gothic-h5{
  font-family: '游ゴシック';
  font-size: 30px;
}
.gothic-h6{
  font-family: '游ゴシック';
  font-size: 20px;
}
.gothic-sub-1{
  font-family: '游ゴシック';
  font-size: 18px;
}
p{
  padding: 0;
}
</style>