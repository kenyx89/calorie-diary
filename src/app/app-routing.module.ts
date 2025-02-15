import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';

const redirectToLogin = redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then(m => m.HomePageModule),
    ...canActivate(redirectToLogin)
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  {
    path: 'signup',
    loadChildren: './pages/signup/signup.module#SignupPageModule'
  },
  {
    path: 'reset-password',
    loadChildren:
    './pages/reset-password/reset-password.module#ResetPasswordPageModule'
  },
  {
    path: 'profile',
    loadChildren: './pages/profile/profile.module#ProfilePageModule',
    ...canActivate(redirectToLogin)
  },
  { path: 'feed', loadChildren: './feed/feed.module#FeedPageModule' },
  { path: 'tracker', loadChildren: './tracker/tracker.module#TrackerPageModule' },
  { path: 'uploader', loadChildren: './uploader/uploader.module#UploaderPageModule' },
  { path: 'log-modal', loadChildren: './log-modal/log-modal.module#LogModalPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
