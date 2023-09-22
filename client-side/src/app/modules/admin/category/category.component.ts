import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PeriodicElement } from '../dashboard/dashboard.type';
import { MatDialog } from '@angular/material/dialog';
import { CategoryFormComponent } from './category-form/category-form.component';
import { ApiServices } from 'src/app/core/api/api.service';
import { Category } from './category.type';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  constructor(
    private dialog: MatDialog,
    private apiService: ApiServices
  ) { }
  ngOnInit(): void {
    this.getCategories()
  }
  dataSource = new MatTableDataSource<PeriodicElement>([]);

  displayedColumns: string[] = ['position', 'avatar', 'name', 'description', 'action'];
  getCategories() {
    this.apiService.getAll('category/find').subscribe({
      next: (response) => {
        this.dataSource.data = response.Categories
      }
    })

  }

  addCategory() {
    const dialog = this.dialog.open(CategoryFormComponent, {
      autoFocus: false,
      width: '30%'
    });

    const instance = dialog.componentInstance as CategoryFormComponent;

    instance.update.subscribe(({ type }) => {
      dialog.close();
    });
  }

  editCategory(category:Category) {
    
    const dialog = this.dialog.open(CategoryFormComponent, {
      autoFocus: true,
      width: '30%'
    })

    const instance = dialog.componentInstance as CategoryFormComponent

    instance.categoryDetails = category

    instance.update.subscribe(({ type }) => {
      dialog.close();
      if (type === 'edit') {
        this.getCategories()
      }
    });

  }
}

