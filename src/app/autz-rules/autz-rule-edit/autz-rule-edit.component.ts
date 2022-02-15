import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {RuleModel} from "../../models/rule.model";
import {first} from "rxjs/operators";
import {AutzRuleService} from "../../services/autz_rule.service";
import {AutzRuleModel} from "../../models/autz_rule.model";
import {RoleModel} from "../../models/role.model";
import {RoleService} from "../../services/role.service";

@Component({
  selector: 'app-autz-rule-edit',
  templateUrl: './autz-rule-edit.component.html',
  styleUrls: ['./autz-rule-edit.component.scss'],
  providers: [
    NgbActiveModal,
  ]
})
export class AutzRuleEditComponent implements OnInit {

  @Input() service: any;
  @Input() rule: any;
  @Input() roles: any;
  @Input() methods: any;
  @Input() ruleId: any;
  ruleForm!: FormGroup;
  hasError!: boolean;
  @Output() editModalEvent = new EventEmitter<string>();
  roles_list!: Observable<Array<RoleModel>>;
  private unsubscribe: Subscription[] = [];

  codeExample: string = '\n<url-pattern> := <scheme>://<host><path>\n' +
    '<scheme> := \'*\' | \'http\' | \'https\'\n' +
    '<host> := \'*\' | \'*.\' <any char except \'/\' and \'*\'>+\n' +
    '<path> := \'/\' <any chars>'

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, private roleService: RoleService, private ruleService: AutzRuleService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.roles_list = this.roleService.getRoles();
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
      roles: [
        this.roles,
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

    const employeeSub = this.ruleService.updateRule(newRule, this.ruleId)
      .pipe(first())
      .subscribe((rule: RuleModel) => {
        if (rule) {
          this.editModalEvent.emit('closeModal');
          this.router.navigate(['autz-rules'],)
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
