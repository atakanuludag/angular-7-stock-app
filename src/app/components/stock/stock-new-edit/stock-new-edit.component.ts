import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockService } from '../../../core/services/stock.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { CoreHelpers } from '../../../core/helpers/core.helpers';


@Component({
  selector: 'app-stock-new-edit',
  templateUrl: './stock-new-edit.component.html',
  styleUrls: ['./stock-new-edit.component.scss']
})
export class StockNewEditComponent implements OnInit {

  form: FormGroup;
  paramId: any = null;
  dataObject: any = null;
  brandDataObject: any = null;

  constructor(
    private route: ActivatedRoute, 
    private service: StockService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private coreHelpers: CoreHelpers
  ) {
    if(this.route.snapshot.params.id) this.paramId = this.route.snapshot.params.id;

  }

  ngOnInit() {
    this.brandDataObject = this.route.snapshot.data.brand;
    
    if(this.paramId) {
      this.dataObject = this.route.snapshot.data.stock;

      this.form = this.formBuilder.group({
        id: [this.dataObject.id, Validators.required],
        stockCode: [this.dataObject.stockCode, Validators.required],
        quantity: [this.dataObject.quantity, Validators.required],
        description: [this.dataObject.description, Validators.required],
        brand: [this.dataObject.brand, Validators.required],
        purchasePrice: [this.dataObject.purchasePrice, Validators.required],
        salePrice: [this.dataObject.salePrice, Validators.required],
        shelfCode: [this.dataObject.shelfCode, Validators.required],
        compatibleModels: [this.dataObject.compatibleModels, Validators.required]
      });

    } else {

      this.form = this.formBuilder.group({
        stockCode: ['', Validators.required],
        quantity: ['', Validators.required],
        description: ['', Validators.required],
        brand: ['', Validators.required],
        purchasePrice: ['', Validators.required],
        salePrice: ['', Validators.required],
        shelfCode: ['', Validators.required],
        compatibleModels: ['', Validators.required]
      });

    }
    
  }

  redirectPage(){
    this.coreHelpers.redirectPage('/stock');
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
