import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private apiUrl = 'http://localhost:8080/api/wallets';

  constructor(private http: HttpClient) {}

  getWallets(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createWallet(initialBalance: number): Observable<any> {
    const walletData = { balance: initialBalance };
    return this.http.post(this.apiUrl, walletData);
  }
}
