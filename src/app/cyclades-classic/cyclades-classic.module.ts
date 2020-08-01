import { NgModule } from "@angular/core"
import { RouterModule } from '@angular/router';
import { CycladesClassicComponent } from './cyclades-classic.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: "", component: CycladesClassicComponent }
        ])
    ]
})
export class CycladesClassicModule { }