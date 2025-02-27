import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import {
  provideAnalytics,
  getAnalytics,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { NavbarnewComponent } from './testFactory/navbarnew/navbarnew.component';
import { NavBarDynamicComponent } from './testFactory/nav-bar-dynamic/nav-bar-dynamic.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import { OtpComponent } from './components/otp/otp.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { Camera } from '@ionic-native/camera/ngx';
import player from 'lottie-web';
import { LottieModule } from 'ngx-lottie';
import { QRCodeModule } from 'angularx-qrcode';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CotisationsComponent } from './components/cotisations/cotisations.component';
import { HeaderComponent } from './components/header/header.component';
import { Navbar3Component } from './testFactory/navbar3/navbar3.component';

// Note we need a separate function as it's required
// by the AOT compiler.
export const playerFactory = () => player;
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AudioPlayerComponent,
    LobbyComponent,
    NavbarComponent,
    QuizComponent,
    NavbarnewComponent,
    NavBarDynamicComponent,
    LoginComponent,
    OtpComponent,
    HomepageComponent,
    CalendarComponent,
    CotisationsComponent,
    HeaderComponent,
    Navbar3Component,
  ],
  imports: [
    BrowserModule,
    NgOtpInputModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideMessaging(() => getMessaging()),
    provideStorage(() => getStorage()),
    FormsModule,
    ReactiveFormsModule,
    LottieModule.forRoot({ player: playerFactory }),
    QRCodeModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ScreenTrackingService,
    UserTrackingService,
    Camera,
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
