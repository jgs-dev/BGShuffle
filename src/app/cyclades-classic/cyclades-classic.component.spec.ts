import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CycladesClassicComponent } from './cyclades-classic.component';

describe('CycladesClassicComponent', () => {
  let component: CycladesClassicComponent;
  let fixture: ComponentFixture<CycladesClassicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CycladesClassicComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CycladesClassicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
