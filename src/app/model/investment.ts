import {InvestmentEntity} from './investmentEntity';

export interface Investment {
  identification: string;
  accountNumber: string;
  amount: number;
  investments: InvestmentEntity[];
}
