import {createApp} from 'vue';
import './style.scss';
// @ts-ignore
import App from './App.vue';
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {fab} from "@fortawesome/free-brands-svg-icons";
// @ts-ignore
import Home from "./pages/Home.vue";
import {createRouter, createWebHashHistory} from "vue-router";
import {createPinia} from "pinia";
// @ts-ignore
import Extensions from "./pages/Extensions.vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
// @ts-ignore
import VueTippy from 'vue-tippy';
import 'tippy.js/dist/tippy.css'

library.add(fas, fab);

const routes = [
    {path: '/', component: Home},
    {path: '/exts', component: Extensions},
];

const router = createRouter({
    routes,
    history: createWebHashHistory(),
});

const pinia = createPinia();

createApp(App)
    .use(VueTippy)
    .use(Toast)
    .use(pinia)
    .use(router)
    .mount('#app');
