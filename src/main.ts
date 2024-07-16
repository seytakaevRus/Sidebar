import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { RouterLink } from 'vue-router';
import PrimeVue from 'primevue/config';

import AppComponent from '@/App.vue';
import '@/assets/theme/sidebar-theme.css';

const pinia = createPinia();
const div = document.createElement('div');

div.id = 'space-sidebar';
document.body.appendChild(div);

const app = createApp(AppComponent);

// register router-link so Primevue doesn't complain
app.component('RouterLink', RouterLink);

app.use(PrimeVue).use(pinia)
  .mount('#space-sidebar');
