import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {RuleService} from "../../services/rule.service";
import {RuleModel} from "../../models/rule.model";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-rule-edit',
  templateUrl: './rule-edit.component.html',
  styleUrls: ['./rule-edit.component.scss'],
  providers: [
    NgbActiveModal,
]
})
export class RuleEditComponent implements OnInit {
  @Input() service: any;
  @Input() rule: any;
  @Input() methods: any;
  @Input() ruleId: any;
  ruleForm!: FormGroup;
  hasError!: boolean;
  private unsubscribe: Subscription[] = [];

  codeExample: string = '\n<url-pattern> := <scheme>://<host><path>\n' +
    '<scheme> := \'*\' | \'http\' | \'https\'\n' +
    '<host> := \'*\' | \'*.\' <any char except \'/\' and \'*\'>+\n' +
    '<path> := \'/\' <any chars>'
  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, private ruleService: RuleService) { }

  ngOnInit(): void {
    this.initForm();
  }

  get f() {
    return this.ruleForm.controls;
  }

  initForm() {
    this.ruleForm = this.fb.group({
      service: [
        this.service,
        Validators.compose([
          Validators.required
        ]),
      ],
      rule: [
        this.rule,
        Validators.compose([
          Validators.required
        ]),
      ],
      methods: [
        this.methods,
        Validators.compose([
          Validators.required
        ]),
      ],
    });
  }

  submit() {
    this.hasError = false;
    const result: {
      [key: string]: string;
    } = {};
    Object.keys(this.f).forEach((key) => {
      result[key] = this.f[key].value;
    });
    const newRule = new RuleModel();
    newRule.setRule(result);


    const employeeSub = this.ruleService.updateRule(newRule, this.ruleId)
      .pipe(first())
      .subscribe((rule: RuleModel) => {
        if (rule) {
          this.activeModal.close();
          location.reload()
        } else {
          this.hasError = true;
        }
      })
    this.unsubscribe.push(employeeSub);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
