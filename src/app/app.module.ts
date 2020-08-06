import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CycladesComponent } from './cyclades/cyclades.component';
import { FormsModule } from "@angular/forms"
import { CycladesClassicComponent } from './cyclades-classic/cyclades-classic.component';
import { HomePage } from './home/home.page';
import { CycladesTitansComponent } from './cyclades-titans/cyclades-titans.component';
import { IonicStorageModule } from "@ionic/storage"
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [AppComponent,
    CycladesComponent,
    CycladesClassicComponent,
    HomePage,
    CycladesTitansComponent,
    ProfileComponent],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    IonicStorageModule.forRoot()],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
