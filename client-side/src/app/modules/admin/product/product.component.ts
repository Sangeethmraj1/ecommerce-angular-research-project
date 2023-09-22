import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormComponent } from './product-form/product-form.component';
import { ApiServices } from 'src/app/core/api/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { PeriodicElement } from '../dashboard/dashboard.type';
import { tableDataContent } from './product.type';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{
  dataSource = new MatTableDataSource<tableDataContent>([]);
  ngOnInit(): void {
    this.getProducts()
    
  }
  displayedColumns: string[] = ['position','avatar', 'name', 'description','price','action'];
  constructor(
    private dialog:MatDialog,
    private apiService:ApiServices
    ){}

  getProducts(){
    this.apiService.getAll('product/find').subscribe({
      next:(response)=>{
        this.dataSource.data=response.Products
      }
    })
  }
  addProduct(){
    const dialog = this.dialog.open(ProductFormComponent, {
      autoFocus: false,
      width: '30%'
    });

    const instance = dialog.componentInstance as ProductFormComponent;

    instance.update.subscribe(({ type }) => {
      dialog.close();
      if (type === 'edit') {
        
      }
    });
  }
}
