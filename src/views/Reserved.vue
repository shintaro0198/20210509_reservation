<template>
  <div id="reserved">
    <Header>
      <v-btn @click="$router.push('/mypage')" text class="font-weight-bold white--text">マイページ</v-btn>
    </Header>
    <v-col cols="9" xl="6" md="6" class="mx-auto mt-16">
      <v-card class="text-center">
          <v-card-text class="font-weight-bold">
            <p class="gothic-sub-1">ご予約が完了いたしました</p>
            </v-card-text>
          <v-card-text><v-btn @click="$router.push('/mypage')">戻る</v-btn></v-card-text>
      </v-card>
    </v-col>
  </div>
</template>

<script>
import Header from '../components/Header'
export default {
  components:{
    Header
  }
}
</script>

<style>

</style>