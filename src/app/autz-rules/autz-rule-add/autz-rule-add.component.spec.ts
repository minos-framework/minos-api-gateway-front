import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutzRuleAddComponent } from './autz-rule-add.component';

describe('AutzRuleAddComponent', () => {
  let component: AutzRuleAddComponent;
  let fixture: ComponentFixture<AutzRuleAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutzRuleAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutzRuleAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
