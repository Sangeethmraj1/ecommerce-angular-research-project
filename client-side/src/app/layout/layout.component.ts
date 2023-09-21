import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isAdminRoute } from './layout.types';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  currentRoute: string = ''
  adminRoutes: string[] = []
  isAdmin: boolean = false

  constructor(private router: Router) { }

  ngOnInit() {
    this.currentRoute = this.router.url
    this.adminRoutes = ['/users', '/products', '/category']
    this.isAdmin = this.adminRoutes?.some((path) => this.currentRoute == path)
  }

}
