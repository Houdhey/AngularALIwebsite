import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { QuizComponent } from './components/quiz/quiz.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarDynamicComponent } from './testFactory/nav-bar-dynamic/nav-bar-dynamic.component';
import { LoginComponent } from './components/login/login.component';
import { OtpComponent } from './components/otp/otp.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CalendarComponent } from './components/calendar/calendar.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomepageComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home-test',
    component: HomeComponent,
  },
  {
    path: 'quiz',
    component: QuizComponent,
  },
  {
    path: 'lobby',
    component: LobbyComponent,
  },
  {
    path: 'test',
    component: CalendarComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
