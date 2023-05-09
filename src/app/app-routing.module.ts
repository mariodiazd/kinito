import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { KinitoComponent } from './kinito/kinito.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserlistComponent } from './userlist/userlist.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'participantes', component: KinitoComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'clasi', component: UserlistComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
