<template>
  <div id="header-auth">
    <v-toolbar flat class="blue white--text d-block d-xl-none d-md-none d-sm-none">
      <v-toolbar-title class="mx-auto text-h5">
        Reserve
      </v-toolbar-title>
    </v-toolbar>
    <v-toolbar flat class="blue white--text">
      <v-layout class="justify-space-between mx-5">
        <v-toolbar-title class="text-h5 d-none d-xl-block d-md-block d-sm-block">
          Reserve
        </v-toolbar-title>
        <v-toolbar-items class="white--text">
          <v-btn text color="white"  class="text-subtitle-1 font-weight-bold" @click="$router.push('/login')">ログイン</v-btn>
          <v-btn text color="white"  class="text-subtitle-1 font-weight-bold" @click="$router.push('/signup')">サインアップ</v-btn>
        </v-toolbar-items>
      </v-layout>
    </v-toolbar>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>