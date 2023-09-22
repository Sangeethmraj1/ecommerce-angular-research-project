import { Component, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ApiServices } from 'src/app/core/api/api.service';
import { ToastService } from 'src/app/core/toast/toast';
import { Category } from '../category.type';
export interface EditLeadSourceEvent {
  type: 'close' | 'edit';
}
@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  @ViewChild('categoryNgForm') categoryNgForm!: NgForm
  categoryForm!: UntypedFormGroup
  file: any
  editForm:boolean=false
  fileChange:boolean=false
  categoryDetails!:Category;
  @Output() update = new EventEmitter<EditLeadSourceEvent>();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private apiService: ApiServices,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
  
    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]]
    })

    if(this.categoryDetails!=undefined){
      this.editForm = true
      this.categoryForm.patchValue({
        name:this.categoryDetails.name,
        description:this.categoryDetails.description
      })
    }
  }

  closeModal() {
    this.update.emit({ type: 'close' });

  }

  fileUpload(event: any) {
    this.file = event.target.files[0];
    this.fileChange=true
  }

  submit() {
    if (this.categoryForm.invalid) {
      return;
    }
    if(this.fileChange){{}}
    const formData = new FormData()
    console.log(this.file);
    for (const value in this.categoryForm.value) {
      formData.append(value, this.categoryForm.value[value])
    }
    formData.append('avatar_file', this.file)
    console.log(this.categoryForm.value);

    this.apiService.create('category/create', formData).subscribe({
      next: (res) => {
        this.toastService.success('Category created')
        this.update.emit({ type: 'close' });
      }
    })

  }
}
