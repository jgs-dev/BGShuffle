import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'cyclades', pathMatch: 'full' },
  { path: "cyclades", loadChildren: './cyclades/cyclades.module#CycladesModule' },
  { path: "cyclades/cyclades-classic/:numberOfPlayers", loadChildren: './cyclades-classic/cyclades-classic.module#CycladesClassicModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
