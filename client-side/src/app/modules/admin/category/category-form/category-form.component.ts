import { Component, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
export interface EditLeadSourceEvent {
  type: 'close' | 'edit';
}
@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit{
  @ViewChild('categoryNgForm') categoryNgForm!: NgForm
  categoryForm!: UntypedFormGroup
  @Output() update = new EventEmitter<EditLeadSourceEvent>();
  constructor( private formBuilder: UntypedFormBuilder){}
  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]]
    })
  }

  closeModal(){
    console.log('closeeee');
    
    this.update.emit({ type: 'close' });

  }
}
