import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutzRuleEditComponent } from './autz-rule-edit.component';

describe('AutzRuleEditComponent', () => {
  let component: AutzRuleEditComponent;
  let fixture: ComponentFixture<AutzRuleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutzRuleEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutzRuleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
