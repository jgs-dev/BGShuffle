import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CycladesComponent } from './cyclades.component';

describe('CycladesComponent', () => {
  let component: CycladesComponent;
  let fixture: ComponentFixture<CycladesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CycladesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CycladesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
