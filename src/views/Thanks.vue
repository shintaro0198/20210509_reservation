<template>
  <div id="thanks">
    <HeaderAuth></HeaderAuth>
    <v-col cols="9" xl="6" md="6" class="mx-auto mt-16">
      <v-card class="text-center">
          <v-card-text class="font-weight-bold">
            <p class="gothic-sub-1">アカウントを作成しました</p>
            </v-card-text>
          <v-card-text><v-btn @click="$router.push('/login')">ログインする</v-btn></v-card-text>
      </v-card>
    </v-col>
  </div>
</template>

<script>
import HeaderAuth from '../components/HeaderAuth'
export default {
  components:{
    HeaderAuth
  }
}
</script>

<style>

</style>