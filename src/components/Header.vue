<template>
  <div id="header">
    <v-toolbar flat class="blue white--text d-block d-xl-none d-md-none d-sm-none">
      <v-toolbar-title class="mx-auto text-h5">
        Reserve
      </v-toolbar-title>
    </v-toolbar>
    <v-toolbar flat class="blue white--text">
      <v-layout justify-space-between class="mx-5">
        <v-toolbar-title class="text-h5 d-none d-xl-block d-md-block d-sm-block">
          Reserve
        </v-toolbar-title>
        <v-toolbar-items class="mx-auto  mx-xl-0 mx-md-0 mx-sm-0">
          <slot></slot>
          <v-btn text color="white" class="text-ssubtitle-1 font-weight-bold" @click="$store.dispatch('logout')">
            ログアウト
          </v-btn>
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