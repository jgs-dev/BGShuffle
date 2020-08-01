import { NgModule } from '@angular/core';

import { HomePage } from './home.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: "", component: HomePage }
    ])
  ]
})
export class HomePageModule { }
