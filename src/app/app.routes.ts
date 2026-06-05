import { Routes } from '@angular/router';
import { Cadastro } from './cadastro/cadastro';
import { CadastroAdmin } from './cadastro/cadastro-admin'; // ← Importado cadastro-admin
import { Login } from './login/login';
import { Home } from './home/home';
import { CadastrarEvento } from './cadastrar-evento/cadastrar-evento';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'cadastro', component: Cadastro }, // ← Cadastro comum (sem checkbox)
  { path: 'cadastro-admin', component: CadastroAdmin }, // ← Admin pode acessar
  { path: 'login', component: Login },
  { path: 'admin', component: CadastrarEvento },
  { path: '**', redirectTo: 'home' },
];
