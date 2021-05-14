<template>
  <div id="signup">
    <HeaderAuth></HeaderAuth>
    <v-col cols="9" xl="6" md="6" class="mt-16 mx-auto">
      <v-card>
        <v-card-title>
          サインアップ
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field type="text" prepend-icon="mdi-account" label="ユーザーネーム" v-model="name" :rules="rules.userNameRules">
            </v-text-field>
            <v-text-field type="email"
            prepend-icon="mdi-email" label="email" v-model="email" :rules="rules.emailRules">
            </v-text-field>
            <v-text-field :type="show? 'password': 'text'" prepend-icon="mdi-lock"
            :append-icon="show? 'mdi-eye':'mdi-eye-off'" 
            @click:append="show = !show" label="パスワード" v-model="password" :rules="rules.passwordRules">
            </v-text-field>
          </v-form>
          <v-btn class="d-block ml-auto" color="primary" @click="signup">作成</v-btn>
        </v-card-text>
      </v-card>
    </v-col>
  </div>
</template>

<script>
import axios from 'axios'
import HeaderAuth from '../components/HeaderAuth'
export default {
  data(){
    return {
      show : true,
      name : "",
      email : "",
      password : "",
      rules:{
        userNameRules:[
          v => !!v || '',
          v => (!!v && 6 <= v.length && 12 >=v.length) || `6文字以上12文字以下で入力してください`
        ],
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
    HeaderAuth,
  },
  methods:{
    signup(){
      if(this.name!==""&&this.email!==""&&this.password!==""){
        axios.post('https://thawing-sea-60162.herokuapp.com/api/register',{
        name : this.name,
        email : this.email,
        password : this.password
        })
        .then((response)=>{
          console.log(response)
          this.$router.push('/thanks')
        })
        .catch((error)=>{
          console.log(error)
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