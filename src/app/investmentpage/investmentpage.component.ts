import {Component, Input, OnInit} from '@angular/core';
import {Investment} from '../model/investment';
import {InvestmentService} from '../service/investment.service';
import {InvestmentEntity} from '../model/investmentEntity';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Depositdao} from '../model/depositdao';
import {Createdao} from '../model/createdao';

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
  newInvestmentForm: FormGroup;
  types: string[];
  capitalizations: string[];
  id: number;
  investmentType: string;
  investmentLength: string;
  capitalizationType: string;

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

  addNew() {
    const capitalizationType = [
      {id: 1, value: 'roczna'},
      {id: 2, value: 'półroczna'},
      {id: 3, value: 'kwartalna'},
      {id: 4, value: 'miesięczna'},
      {id: 5, value: 'tygodniowa'},
      {id: 6, value: 'dobowa'},
      {id: 7, value: 'godzinna'}
    ];
    const length = [
      {id: 365, value: 'roczna'},
      {id: 182, value: 'półroczna'},
      {id: 90, value: 'kwartalna'},
      {id: 30, value: 'miesięczna'},
      {id: 7, value: 'tygodniowa'},
      {id: 1, value: 'dobowa'},
      {id: 1, value: 'godzinna'}
    ];
    const investment_type = [
      {id: 1, value: 'Lokata terminowa - stały wzrost'},
      {id: 2, value: 'Lokata progresywna'},
      {id: 3, value: 'Lokata nocna'},
      {id: 4, value: 'Lokata dynamiczna'},
      {id: 5, value: 'Lokata jednodniowa'}
    ];
    // const capitalizationType = [
    //   {id: '1', value: 'roczna'},
    //   {id: '2', value: 'półroczna'},
    //   {id: '3', value: 'kwartalna'},
    //   {id: '4', value: 'miesięczna'},
    //   {id: '5', value: 'tygodniowa'},
    //   {id: '6', value: 'dobowa'},
    //   {id: '7', value: 'godzinna'}
    // ];
    // const length = [
    //   {id: '365', value: 'roczna'},
    //   {id: '182', value: 'półroczna'},
    //   {id: '90', value: 'kwartalna'},
    //   {id: '30', value: 'miesięczna'},
    //   {id: '7', value: 'tygodniowa'},
    //   {id: '1', value: 'dobowa'},
    //   {id: '1', value: 'godzinna'}
    // ];
    // const investment_type = [
    //   {id: '1', value: 'Lokata terminowa - stały wzrost'},
    //   {id: '2', value: 'Lokata progresywna'},
    //   {id: '3', value: 'Lokata nocna'},
    //   {id: '4', value: 'Lokata dynamiczna'},
    //   {id: '5', value: 'Lokata jednodniowa'}
    // ];
    const amount = this.newInvestmentForm.get('value_new').value;
    const investment_dao = investment_type.find(x => x.value === this.investmentType);
    const length_dao = length.find(x => x.value === this.investmentLength);
    const cap_dao = capitalizationType.find(x => x.value === this.capitalizationType);

    const dao = new Createdao(amount, cap_dao.id , investment_dao.id, length_dao.id, this.accountNumber);

    console.log(dao);
    this.service.addNew(dao).subscribe(item => {
      console.log(item);
    });
    window.location.reload();
  }


  rememberId(id: number): void {
    this.id = id;
    console.log(id);
  }


  buildForm(): void {
    this.depositForm = this.formBuilder.group({
      value: ['', [
        Validators.required,
        Validators.min(1)
      ]],
    });

    this.newInvestmentForm = this.formBuilder.group({
      value_new: ['', [
        Validators.required,
        Validators.min(1)
      ]],
    });
  }

  onChangeType(val) {
    console.log(val);
    this.investmentType = val;
  }

  onChangeLength(val) {
    console.log(val);
    this.investmentLength = val;
  }

  onChangeCap(val) {
    console.log(val);
    this.capitalizationType = val;
  }

}
