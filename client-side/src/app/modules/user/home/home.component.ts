import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServices } from 'src/app/core/api/api.service';
import { Categories, Products } from './home.types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  categories:Categories[]=[]
  products:Products[]=[]
  constructor(
    private router:Router,
    private apiService:ApiServices){}
  ngOnInit(): void {
    this.getCategories()
    this.getProducts()
  }

  getCategories(){
    this.apiService.getAll('category/find').subscribe({
      next:(response)=>{
        this.categories=response.Categories
      }
    })
  }

  getProducts(){
    this.apiService.getAll('product/find').subscribe({
      next:(response)=>{
        this.products=response.Products
      }
    })
  }
}
