import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin.guard';
export const routes: Routes = [
 {path:'',loadComponent:()=>import('./public/pages/convite-page/convite-page.component').then(m=>m.ConvitePageComponent)},
 {path:'admin/login',loadComponent:()=>import('./admin/pages/login/login.component').then(m=>m.LoginComponent)},
 {path:'admin',canActivate:[adminGuard],loadComponent:()=>import('./admin/components/admin-layout/admin-layout.component').then(m=>m.AdminLayoutComponent),children:[
  {path:'',pathMatch:'full',redirectTo:'dashboard'},
  {path:'dashboard',loadComponent:()=>import('./admin/pages/dashboard/dashboard.component').then(m=>m.DashboardComponent)},
  {path:'confirmacoes',loadComponent:()=>import('./admin/pages/confirmacoes/confirmacoes.component').then(m=>m.ConfirmacoesComponent)},
  {path:'configuracoes',loadComponent:()=>import('./admin/pages/configuracoes-evento/configuracoes-evento.component').then(m=>m.ConfiguracoesEventoComponent)}
 ]},
 {path:'**',redirectTo:''}
];
