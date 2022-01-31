import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleAddComponent } from './rule-add.component';

describe('RuleAddComponent', () => {
  let component: RuleAddComponent;
  let fixture: ComponentFixture<RuleAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuleAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
