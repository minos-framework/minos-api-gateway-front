import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutzRulesComponent } from './autz-rules.component';

describe('AutzRulesComponent', () => {
  let component: AutzRulesComponent;
  let fixture: ComponentFixture<AutzRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutzRulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutzRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
