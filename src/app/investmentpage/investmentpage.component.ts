import {Component, Input, OnInit} from '@angular/core';
import {Investment} from '../model/investment';
import {InvestmentService} from '../service/investment.service';
import {InvestmentEntity} from '../model/investmentEntity';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Depositdao} from '../model/depositdao';

@Component({
  selector: 'app-investmentpage',
  templateUrl: './investmentpage.component.html',
  styleUrls: ['./investmentpage.component.css']
})
export class InvestmentpageComponent implements OnInit {

  investmentsInfo: Investment;
  investments: InvestmentEntity[];
  accountNumber: string;
  depositForm: FormGroup;
  types: string[];
  capitalizations: string[];
  id: number;

  constructor(private service: InvestmentService, private formBuilder: FormBuilder) {

  }

  loadData(): void {
    this.service.getEssentialInfo(this.accountNumber).subscribe(item => {
      this.investmentsInfo = item;
      console.log(this.investmentsInfo);
      this.investments = this.investmentsInfo.investments;
    });
    this.service.getCapitalizations().subscribe(item => {
      this.capitalizations = item;
      console.log(this.capitalizations);
    });
    this.service.getInvestmentTypes().subscribe(item => {
      this.types = item;
      console.log(this.types);
    });

  }

  ngOnInit() {
    this.accountNumber = localStorage.getItem('accountNumber');
    this.loadData();
    this.buildForm();
  }

  rememberId(id: number): void {
    this.id = id;
    console.log(id);
  }

  submitdeposit() {
    const amount = this.depositForm.get('value').value;
    const dao = new Depositdao(amount, this.id);
    this.service.deposit(dao).subscribe(item => {
      console.log(item);
    });
    window.location.reload();
  }

  onShutDownClicked(id: number) {
    this.service.earlyEnd(id).subscribe(item => {
      console.log(item);
    });
    window.location.reload();
  }

  buildForm(): void {
    this.depositForm = this.formBuilder.group({
      value: ['', [
        Validators.required,
        Validators.min(1)
      ]],
    });
  }

}
