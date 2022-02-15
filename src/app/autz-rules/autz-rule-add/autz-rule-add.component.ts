import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {first} from "rxjs/operators";
import {RoleModel} from "../../models/role.model";
import {RoleService} from "../../services/role.service";
import {AutzRuleService} from "../../services/autz_rule.service";
import {AutzRuleModel} from "../../models/autz_rule.model";

@Component({
  selector: 'app-autz-rule-add',
  templateUrl: './autz-rule-add.component.html',
  styleUrls: ['./autz-rule-add.component.scss']
})
export class AutzRuleAddComponent implements OnInit {
  @Input() name: any;
  ruleForm!: FormGroup;
  hasError!: boolean;
  errorMessage!: any;
  roles!: Observable<Array<RoleModel>>;
  private unsubscribe: Subscription[] = [];

  codeExample: string = '\n<url-pattern> := <scheme>://<host><path>\n' +
    '<scheme> := \'*\' | \'http\' | \'https\'\n' +
    '<host> := \'*\' | \'*.\' <any char except \'/\' and \'*\'>+\n' +
    '<path> := \'/\' <any chars>'

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, private roleService: RoleService, private ruleService: AutzRuleService, private router: Router,) {
  }

  ngOnInit(): void {
    this.roles = this.roleService.getRoles();
    this.initForm();
  }

  get f() {
    return this.ruleForm.controls;
  }

  initForm() {
    let name = `${this.name}s`
    let rule = `*://*/${name}*`
    if(this.name == '*') {
      name = this.name
      rule = `*://*/*`
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
        rule,
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
      roles: [
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
    const newRule = new AutzRuleModel();
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
          this.router.navigate(['/autz-rules']);
        }
      )
    this.unsubscribe.push(employeeSub);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
