import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: "home", loadChildren: "./home/home.module#HomePageModule"},
  { path: "cyclades", loadChildren: './cyclades/cyclades.module#CycladesModule' },
  { path: "cyclades-classic/:numberOfPlayers", loadChildren: './cyclades-classic/cyclades-classic.module#CycladesClassicModule' },
  { path: "cyclades-titans/:numberOfPlayers", loadChildren: './cyclades-titans/cyclades-titans.module#CycladesTitansModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
