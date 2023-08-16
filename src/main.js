import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';

const app = createApp(App);
const pinia = createPinia();
app.use(router);
app.use(pinia);
const selectedPhoto = localStorage.getItem('selectedPhoto');
if (selectedPhoto) {
  pinia.state.value.auth.selectedPhoto = selectedPhoto;
}

app.mount('#app');
