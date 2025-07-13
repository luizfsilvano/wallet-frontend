import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private apiUrl = 'http://localhost:8080/api/transactions';

  constructor(private http: HttpClient) {}

  getTransactionsForWallet(
    walletId: number,
    page: number,
    size: number
  ): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', 'dateTime,desc');

    return this.http.get(`${this.apiUrl}/wallet/${walletId}`, { params });
  }

  createTransaction(transactionData: {
    walletId: number;
    amount: number;
    type: 'CREDIT' | 'DEBIT';
  }): Observable<any> {
    return this.http.post(this.apiUrl, transactionData);
  }
}
