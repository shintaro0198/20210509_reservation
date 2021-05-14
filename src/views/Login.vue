<template>
  <div id="login">
    <HeaderAuth></HeaderAuth>
    <v-col cols="9" xl="6" md="6" class="mx-auto mt-16">
      <v-card>
        <v-card-title>
          ログイン
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field type="email" label="email" prepend-icon="mdi-email" v-model="email" :rules="rules.emailRules"></v-text-field>
            <v-text-field :type="show? 'password':'text' " label="パスワード" 
            :append-icon="show? 'mdi-eye':'mdi-eye-off'" 
            @click:append="show = !show" prepend-icon="mdi-lock" v-model="password" :rules="rules.passwordRules"></v-text-field>
          </v-form>
          <v-btn color="primary" class="d-block ml-auto" @click="login">ログイン</v-btn>
        </v-card-text>
      </v-card>
    </v-col>
  </div>
</template>

<script>
import HeaderAuth from '../components/HeaderAuth'
export default {
  data(){
    return{
      show : true,
      email : "",
      password : "",
      rules:{
        emailRules:[
          v => !!v || '',
          v => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9-]+)*$/.test(v) || '有効なメールアドレスを入力してください'
        ],
        passwordRules:[
          v => !!v || '',
          v => /^(?=.*?[a-z])(?=.*?[A-Z])[a-zA-Z0-9!#$%&'*+/=?^_\\d]{8,20}$/.test(v) || '半角の大文字/小文字を含んだ8文字以上20文字以下の文字列を入力してください'
        ]
      }
    }
  },
  components:{
    HeaderAuth
  },
  methods:{
    login(){
      if(this.email!=="",this.password!==""){
        this.$store.dispatch('login',{
        email : this.email,
        password : this.password
      })
      } else{
        alert('入力されていない項目があります')
      }
    }
  }
}
</script>

<style>

</style>