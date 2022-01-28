import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  items!: MenuItem[];
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.items = [
            {
                label:'Home',
                icon:'pi pi-fw pi-home',
                url: '/',
            },
            {
                label:'Endpoints',
                icon:'pi pi-fw pi-link',
                url: 'endpoints',
            },
            {
                label:'Auth Rules',
                icon:'pi pi-fw pi-directions',
                url: 'rules',
            }
        ];
  }

  logoutRedirect() {
    this.router.navigate(['logout'])
  }

}
