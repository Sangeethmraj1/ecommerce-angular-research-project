import { Component, Output, EventEmitter, ViewChild, OnInit } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ApiServices } from 'src/app/core/api/api.service';
import { ToastService } from 'src/app/core/toast/toast';
import { Categories } from 'src/app/modules/user/home/home.types';

export interface EditLeadSourceEvent {
  type: 'close' | 'edit';
}

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit{
  @ViewChild('productNgForm') productNgForm!: NgForm
  productForm!: UntypedFormGroup
  file: any
  categories:Categories[]=[]
  @Output() update = new EventEmitter<EditLeadSourceEvent>();
  constructor(
    private formBuilder:UntypedFormBuilder,
    private apiService:ApiServices,
    private toastService:ToastService
    ){}
  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      category: ['', [Validators.required]],
      price: ['', [Validators.required]],
    })
    this.getAllCategories()
  }

  getAllCategories(){
    this.apiService.getAll('category/find').subscribe({
      next:(response)=>{
        this.categories=response.Categories
      }
    })
  }
  fileUpload(e:any){
    this.file=e.target.files[0]
  }

  closeModal(){
    this.update.emit({ type: 'close' });
  }

  submit(){
    if(this.productForm.invalid){
      return
    }
    console.log(this.productForm.value);
    const formData = new FormData()
    for(const value in this.productForm.value){
      formData.append(value,this.productForm.value[value])
    }
    formData.append('avatar_file',this.file)
    this.apiService.create('product/create',formData).subscribe({
      next:(response)=>{
        this.toastService.success('Product created')
        this.update.emit({ type: 'close' });

      }
    })
  }
}
