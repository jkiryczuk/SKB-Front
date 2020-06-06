import {Component, OnInit} from '@angular/core';
import {Investment} from '../model/investment';
import {InvestmentService} from '../service/investment.service';
import {InvestmentEntity} from '../model/investmentEntity';

@Component({
  selector: 'app-investmentpage',
  templateUrl: './investmentpage.component.html',
  styleUrls: ['./investmentpage.component.css']
})
export class InvestmentpageComponent implements OnInit {

  investmentsInfo: Investment;
  investments: InvestmentEntity[];
  accountNumber: string;

  constructor(private service: InvestmentService) {
  }

  loadData(): void {
    this.service.getEssentialInfo(this.accountNumber).subscribe(item => {
      this.investmentsInfo = item;
      console.log(this.investmentsInfo);
      this.investments = this.investmentsInfo.investments;
    });
  }

  ngOnInit() {
    this.accountNumber = localStorage.getItem('accountNumber');
    this.loadData();
  }

  onShutDownClicked(id: number) {
    this.service.earlyEnd(id).subscribe(item => {
      console.log(item);
    });
  }

}
