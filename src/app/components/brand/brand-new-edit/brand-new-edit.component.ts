import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrandService } from '../../../core/services/brand.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { CoreHelpers } from '../../../core/helpers/core.helpers';


@Component({
  selector: 'app-brand-new-edit',
  templateUrl: './brand-new-edit.component.html',
  styleUrls: ['./brand-new-edit.component.scss']
})
export class BrandNewEditComponent implements OnInit {

  form: FormGroup;
  paramId: any = null;
  dataObject: any = null;

  constructor(
    private route: ActivatedRoute, 
    private service: BrandService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private coreHelpers: CoreHelpers
  ) {
    if(this.route.snapshot.params.id) this.paramId = this.route.snapshot.params.id;

  }

  ngOnInit() {

    if(this.paramId) {
      this.dataObject = this.route.snapshot.data.brand;

      this.form = this.formBuilder.group({
        id: [this.dataObject.id, Validators.required],
        name: [this.dataObject.name, Validators.required],
        description: [this.dataObject.description, Validators.required]
      });

    } else {

      this.form = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required]
      });

    }
    
  }

  redirectPage(){
    this.coreHelpers.redirectPage('/brand');
  }

  save() {
    if(this.paramId) {
      this.service.update(this.form.value).pipe().subscribe(data => {
        this.snackBar.open('Kayıt Güncellendi.', '', {duration: 500});
        console.log(data);
        this.redirectPage();
      });
    } else {
      this.service.create(this.form.value).pipe().subscribe(data => {
        this.snackBar.open('Kayıt Eklendi.', '', {duration: 500});
        console.log(data);
        this.redirectPage();
      });
    }

    
    
  }

}
