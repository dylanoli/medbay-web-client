import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import HomePaciente from '../views/HomePaciente.vue'
import MedicoListar from '../views/medico/Listar.vue'
import AtendentesListar from '../views/atendentes/Listar.vue'
import PacientesListar from '../views/pacientes/Listar.vue'
import ConsultaAtendenteListar from '../views/consultas/Listar.vue'

import HomeUsuario from '../views/usuario/HomeUsuario.vue'

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
    path: '/home',
    name: 'HomePaciente',
    component: HomePaciente
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
  {
    path: '/usuario',
    name: 'HomeUsuario',
    component: HomeUsuario
  },
  {
    path: '/atendentes/consultas',
    name: 'ConsultaAtendenteListar',
    component: ConsultaAtendenteListar
  },

]

const router = new VueRouter({
  routes
})

export default router
