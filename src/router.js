import {createRouter, createWebHistory} from 'vue-router'
import Home from './pages/Home.vue';
import DetailProject from './pages/DetailProject.vue';
import Login from './pages/auth/Login.vue';
import Role from './pages/auth/register/Role.vue';
import Account from './pages/auth/register/Account.vue';
import Done from './pages/auth/register/Done.vue';

const routes = [
  {
    path: '/',
    component: Home,
    name: 'Home',
    props: true,
  },
  {
    path: '/project/:id',
    component: DetailProject,
    name: 'DetailProject',
    props: true,
  },
  {
    path: '/auth/login',
    component: Login,
    name: 'Login'
  },
  {
    path: '/auth/register/role',
    component: Role,
    name: 'Role'
  },
  {
    path: '/auth/register/done',
    component: Done,
    name: 'Done'
  },
  {
    path: '/auth/register/account',
    component: Account,
    name: 'Account'
  }
]

export default createRouter({
  history: createWebHistory(),
  routes,
})