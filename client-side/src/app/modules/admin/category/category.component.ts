import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PeriodicElement } from '../dashboard/dashboard.type';
import { MatDialog } from '@angular/material/dialog';
import { CategoryFormComponent } from './category-form/category-form.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  constructor(private dialog:MatDialog){}
  ngOnInit(): void {
    this.getuser()
  }
  dataSource = new MatTableDataSource<PeriodicElement>([]);
   ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  getuser(){
    this.dataSource.data=this.ELEMENT_DATA
    console.log(this.dataSource.data);
  }

  addCategory(){
    const dialog = this.dialog.open(CategoryFormComponent, {
      autoFocus: false,
      width: '30%'
    });

    const instance = dialog.componentInstance as CategoryFormComponent;

    instance.update.subscribe(({ type }) => {
      dialog.close();
      if (type === 'edit') {
        
      }
    });
  }
}
