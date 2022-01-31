import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {RuleModel} from "../models/rule.model";
import {RuleService} from "../services/rule.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {
  rules!: Observable<Array<RuleModel>>;
  constructor(private ruleService: RuleService, private modalService: NgbModal) { }

  ngOnInit(): void {
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
