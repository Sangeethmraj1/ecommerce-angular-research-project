import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(private router:Router){}
  logout(){
    console.log('logout');
    
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    this.router.navigateByUrl('/')
  }
}
