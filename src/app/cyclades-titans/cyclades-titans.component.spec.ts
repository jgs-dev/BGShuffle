import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CycladesTitansComponent } from './cyclades-titans.component';

describe('CycladesTitansComponent', () => {
  let component: CycladesTitansComponent;
  let fixture: ComponentFixture<CycladesTitansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CycladesTitansComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CycladesTitansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
