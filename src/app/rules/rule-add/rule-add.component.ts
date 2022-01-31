import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import {RuleModel} from "../../models/rule.model";
import {RuleService} from "../../services/rule.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-rule-add',
  templateUrl: './rule-add.component.html',
  styleUrls: ['./rule-add.component.scss']
})
export class RuleAddComponent implements OnInit {
  @Input() name: any;
  ruleForm!: FormGroup;
  hasError!: boolean;
  private unsubscribe: Subscription[] = [];

  codeExample: string = '\n<url-pattern> := <scheme>://<host><path>\n' +
    '<scheme> := \'*\' | \'http\' | \'https\'\n' +
    '<host> := \'*\' | \'*.\' <any char except \'/\' and \'*\'>+\n' +
    '<path> := \'/\' <any chars>'

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, private ruleService: RuleService) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  get f() {
    return this.ruleForm.controls;
  }

  initForm() {
    this.ruleForm = this.fb.group({
      service: [
        `${this.name}s`,
        Validators.compose([
          Validators.required
        ]),
      ],
      rule: [
        `*://*/${this.name}s/*`,
        Validators.compose([
          Validators.required
        ]),
      ],
      methods: [
        ['*'],
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


    const employeeSub = this.ruleService.addRule(newRule)
      .pipe(first())
      .subscribe((rule: RuleModel) => {
        if (rule) {
          this.activeModal.close();
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
