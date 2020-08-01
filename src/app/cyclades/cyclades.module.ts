import { NgModule } from "@angular/core"
import { RouterModule } from '@angular/router';
import { CycladesComponent } from './cyclades.component';

@NgModule({
    imports: [

        RouterModule.forChild([
            { path: '', component: CycladesComponent },
        ])
    ],
})
export class CycladesModule { }