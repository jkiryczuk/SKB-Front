export class Createdao {

  constructor(amount: number, _idCapitalization: number, _idInvestmentType: number, _dday: number, accountnumber: string) {
    this.amount = amount;
    this.idinvestmenttype = _idInvestmentType;
    this.idcapitalization = _idCapitalization;
    this.dday = _dday;
    this.accountnumber = accountnumber;
  }

  accountnumber: string;
  idcapitalization: number;
  idinvestmenttype: number;
  amount: number;
  dday: number;
}
