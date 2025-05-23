// import 'ress'
import { createApp } from 'vue'

import '@/assets/main.scss'

import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import router from '@/router'
import { createPinia } from 'pinia'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
