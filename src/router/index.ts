import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import MedicoListar from '../views/medico/Listar.vue'
import AtendentesListar from '../views/atendentes/Listar.vue'
import PacientesListar from '../views/pacientes/Listar.vue'


Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/medicos',
    name: 'MedicoListar',
    component: MedicoListar
  },
  {
    path: '/atendentes',
    name: 'AtendentesListar',
    component: AtendentesListar
  },
  {
    path: '/pacientes',
    name: 'PacientesListar',
    component: PacientesListar
  },
]

const router = new VueRouter({
  routes
})

export default router
