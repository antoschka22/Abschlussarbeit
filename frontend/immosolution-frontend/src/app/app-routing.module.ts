import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { FacebookComponent } from './components/admin/facebook/facebook.component';
import { LoginComponent } from './components/admin/login/login.component';
import { FertigeprojekteComponent } from './components/frontend/fertigeprojekte/fertigeprojekte.component';
import { IndexComponent } from './components/frontend/index/index.component';
import { LaufendeprojekteComponent } from './components/frontend/laufendeprojekte/laufendeprojekte.component';
import { AuthGuard } from './guards/auth.guard';
import { FacebookAuthGuard } from './guards/facebook-auth.guard';
import { MasterGuard } from './guards/master.guard';

const routes: Routes = [
  { path: 'admin', component: DashboardComponent,
  canActivate: [MasterGuard], data: {guards: [AuthGuard], roles: ['ADMIN']}},
  { path: 'facebook', component: FacebookComponent,
  canActivate: [MasterGuard], data: {guards: [FacebookAuthGuard], roles:['ADMIN']}},
  { path: '', component: IndexComponent},
  { path: 'login', component: LoginComponent},
  { path: 'laufendeprojekte', component: LaufendeprojekteComponent},
  { path: 'fertigeprojekte', component: FertigeprojekteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule {
}
