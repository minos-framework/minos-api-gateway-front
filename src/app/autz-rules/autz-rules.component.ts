import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {RuleModel} from "../models/rule.model";
import {RuleService} from "../services/rule.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AutzRuleService} from "../services/autz_rule.service";
import {RoleModel} from "../models/role.model";
import {RoleService} from "../services/role.service";

@Component({
  selector: 'app-autz-rules',
  templateUrl: './autz-rules.component.html',
  styleUrls: ['./autz-rules.component.scss']
})
export class AutzRulesComponent implements OnInit {
  rules!: Observable<Array<RuleModel>>;
  roles!: Observable<Array<RoleModel>>;
  constructor(private ruleService: AutzRuleService, private roleService: RoleService, private modalService: NgbModal) { }

  ngOnInit(): void {
    //this.roles = this.roleService.getRoles();
    this.initTable()
  }

  private initTable() {
    this.rules = this.ruleService.getRules();
  }

  open(content: any) {
    this.modalService.open(content);
  }

  deleteRule(rule_id: number){
    this.ruleService.deleteRule(rule_id).subscribe(
      () => {
        this.initTable();
      }
    );
    this.initTable();
  }
}
