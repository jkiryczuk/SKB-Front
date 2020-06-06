import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Investment} from '../model/investment';

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

  earlyEnd(id: number): Observable<void> {
    return this.http.get<any>(this.api + 'earlyend?id=' + id);
  }
}
