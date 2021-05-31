<template>
  <div id="search">
    <v-col cols="10" xl="6" md="6" class="mx-auto mt-5">
      <v-card class="px-5 pt-5">
        <v-layout>
          <div class="mr-3">
            <v-select :items="locations"  v-model="location" label="エリア"></v-select>
          </div>
          <div class="mr-3">
            <v-select :items="genres" v-model="genre" label="ジャンル"></v-select>
          </div>
          <div class="d-none d-xl-block d-md-block d-sm-block">
            <v-text-field append-icon="mdi-magnify" v-model="text" label="検索"></v-text-field>
          </div>
        </v-layout>
        <div class="d-block d-xl-none d-md-none d-sm-none">
          <v-text-field append-icon="mdi-magnify" v-model="text" label="検索"></v-text-field>
        </div>
      </v-card>
    </v-col>
  </div>
</template>

<script>
export default {
  data(){
    return{
      locations:[
        'All area',
        '北海道',
        '青森県',
        '岩手県',
        '宮城県',
        '秋田県',
        '山形県',
        '福島県',
        '茨城県',
        '栃木県',
        '群馬県',
        '埼玉県',
        '千葉県',
        '東京都',
        '神奈川県',
        '新潟県',
        '富山県',
        '石川県',
        '福井県',
        '山梨県',
        '長野県',
        '岐阜県',
        '静岡県',
        '愛知県',
        '三重県',
        '滋賀県',
        '京都府',
        '大阪府',
        '兵庫県',
        '奈良県',
        '和歌山県',
        '鳥取県',
        '島根県',
        '岡山県',
        '広島県',
        '山口県',
        '徳島県',
        '香川県',
        '愛媛県',
        '高知県',
        '福岡県',
        '佐賀県',
        '長崎県',
        '熊本県',
        '大分県',
        '宮崎県',
        '鹿児島県',
        '沖縄県'
      ],
      location:"All area",
      genres:[
        'All genre','居酒屋','イタリアン','寿司','焼肉','ラーメン'
      ],
      genre: "All genre",
      text: ""
    }
  },
  watch:{
    location: function(){
      this.$emit('getSearchedLocation',this.location)
    },
    genre: function(){
      this.$emit('getSearchedGenre',this.genre)
    },
    text: function(){
      this.$emit('getSearchedText',this.text)
    }
  },
}
</script>

<style>

</style>