import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { UserlistComponent } from './userlist/userlist.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KinitoComponent } from './kinito/kinito.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { CountdownTimerModule } from 'projects/countdown-timer/src/lib/countdown-timer.module';

@NgModule({
  declarations: [
    AppComponent,
    UserlistComponent,
    KinitoComponent,
    HomeComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CountdownTimerModule,
    AppRoutingModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
