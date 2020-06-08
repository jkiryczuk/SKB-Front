import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Investment} from '../model/investment';
import {Depositdao} from '../model/depositdao';
import {Createdao} from '../model/createdao';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {
  private api = '/api/investment/';


  constructor(private http: HttpClient) {
  }

  getEssentialInfo(accountNumber: string): Observable<Investment> {
    return this.http.get<any>(this.api + 'all?accountNumber=' + accountNumber);
  }

  getCapitalizations(): Observable<string[]> {
    return this.http.get<any>(this.api + 'capitalizations');
  }

  getInvestmentTypes(): Observable<string[]> {
    return this.http.get<any>(this.api + 'types');
  }

  earlyEnd(id: number): Observable<void> {
    return this.http.get<any>(this.api + 'earlyend?id=' + id);
  }

  deposit(depositdao: Depositdao): Observable<void> {
    return this.http.post<any>(this.api + 'deposit', depositdao);
  }

  addNew(createdao: Createdao): Observable<void> {
    return this.http.post<any>(this.api + 'addnew', createdao);
  }

}
