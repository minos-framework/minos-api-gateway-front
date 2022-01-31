import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {EndpointService} from "../services/endpoint.service";
import {Observable} from "rxjs";
import {EndpointModel} from "../models/endpoint.model";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {RuleAddComponent} from "../rules/rule-add/rule-add.component";

@Component({
  selector: 'app-endpoint',
  templateUrl: './endpoint.component.html',
  styleUrls: ['./endpoint.component.scss']
})
export class EndpointComponent implements OnInit {
  endpoints!: Observable<Array<EndpointModel>>;

  constructor(private endpointService: EndpointService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.initTable()
  }

  open(service_name: string) {
    const modal = this.modalService.open(RuleAddComponent);
    modal.componentInstance.name = service_name
  }

  private initTable() {
    this.endpoints = this.endpointService.getEndpoints();
  }
}
