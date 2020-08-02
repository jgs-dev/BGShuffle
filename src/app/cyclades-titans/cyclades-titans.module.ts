import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { CycladesTitansComponent } from './cyclades-titans.component';


@NgModule({
    imports: [
        RouterModule.forChild([
            { path: "", component: CycladesTitansComponent }
        ])
    ]
})
export class CycladesTitansModule { }

