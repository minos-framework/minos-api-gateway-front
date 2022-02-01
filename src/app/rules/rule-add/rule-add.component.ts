import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import {RuleModel} from "../../models/rule.model";
import {RuleService} from "../../services/rule.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-rule-add',
  templateUrl: './rule-add.component.html',
  styleUrls: ['./rule-add.component.scss']
})
export class RuleAddComponent implements OnInit {
  @Input() name: any;
  ruleForm!: FormGroup;
  hasError!: boolean;
  errorMessage!: any;
  private unsubscribe: Subscription[] = [];

  codeExample: string = '\n<url-pattern> := <scheme>://<host><path>\n' +
    '<scheme> := \'*\' | \'http\' | \'https\'\n' +
    '<host> := \'*\' | \'*.\' <any char except \'/\' and \'*\'>+\n' +
    '<path> := \'/\' <any chars>'

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, private ruleService: RuleService, private router: Router,) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  get f() {
    return this.ruleForm.controls;
  }

  initForm() {
    let name = `${this.name}s`
    if(this.name == '*') {
      name = this.name
    } else {
      this.name = name
    }

    this.ruleForm = this.fb.group({
      service: [
        name,
        Validators.compose([
          Validators.required
        ]),
      ],
      rule: [
        `*://*/${name}/*`,
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
      .subscribe(
        result => {
          console.log(result)
        },
        error => {
          this.hasError = true;
          this.errorMessage = error;
        },
        () => {
          this.activeModal.close();
          this.router.navigate(['/rules']);
        }
      )
    this.unsubscribe.push(employeeSub);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
