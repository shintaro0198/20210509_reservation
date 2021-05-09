module.exports = {
  transpileDependencies: [
    'vuetify'
  ]
}
export default {
  buildModules: [
    '@vuejs/vuetify'
  ],
  vuetify: {
    customVariables: ['~/assets/saas/variables.scss'],
    treeShake: true
  }
}