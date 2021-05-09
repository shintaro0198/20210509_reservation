<template>
  <div id="home">
    <Header>
      <v-btn text class="white--text font-weight-bold" @click="$router.push('/mypage')">マイページ</v-btn>
    </Header>
    <Search @getSearchedLocation="showSearchedLocation" @getSearchedGenre="showSearchedGenre" @getSearchedText="showSearchedText"></Search>
    <div class="mx-10 mt-10">
      <Restaurants :searchedLocation="searchedLocation" :searchedGenre="searchedGenre" :searchedText="searchedText"></Restaurants>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import Search from '../components/Search'
import Restaurants from '../components/Restaurants'
export default {
  data(){
    return{
      searchedLocation : "",
      searchedGenre : "",
      searchedText : ""
    }
  },
  methods:{
    showSearchedLocation(searchedLocation){
      this.searchedLocation = searchedLocation
    },
    showSearchedGenre(searchedGenre){
      this.searchedGenre = searchedGenre
    },
    showSearchedText(searchedText){
      this.searchedText = searchedText
    }
  },
  components:{
    Header,Search,Restaurants
  },
}
</script>

<style>

</style>