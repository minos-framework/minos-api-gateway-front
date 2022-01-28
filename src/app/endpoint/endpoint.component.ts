import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {EndpointService} from "../services/endpoint.service";
import {Observable} from "rxjs";
import {EndpointModel} from "../models/endpoint.model";

@Component({
  selector: 'app-endpoint',
  templateUrl: './endpoint.component.html',
  styleUrls: ['./endpoint.component.scss']
})
export class EndpointComponent implements OnInit {
  endpoints!: Observable<Array<EndpointModel>>;

  constructor(private endpointService: EndpointService) { }

  ngOnInit(): void {
    this.initTable()
  }

  private initTable() {
    this.endpoints = this.endpointService.getEndpoints();
  }
}
