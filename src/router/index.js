import { createRouter, createWebHashHistory } from 'vue-router';
import homepage from '../views/homepage.vue';
import dda from '../views/dda.vue';
import mollysoda from '../views/mollysoda.vue';
import netart from '../views/netart.vue';
import cdesktop from '../views/cdesktop.vue';
import oeuvres from '../views/œuvres.vue';

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: homepage },
    { path: '/dda', name: 'dda', component: dda },
    { path: '/mollysoda', name: 'mollysoda', component: mollysoda },
    { path: '/netart', name: 'netart', component: netart },
    { path: '/cdesktop', name: 'cdesktop', component: cdesktop },
    { path: '/oeuvres', name: 'oeuvres', component: oeuvres },
  ]
});
