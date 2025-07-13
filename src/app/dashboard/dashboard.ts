import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth';
import { WalletService } from '../wallet/wallet';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class DashboardComponent {
  wallets: any[] = [];
  newWalletBalance: number = 0;

  constructor(
    private router: Router,
    private authService: AuthService,
    private walletService: WalletService
  ) {}

  ngOnInit(): void {
    this.loadWallets();
  }

  createWallet(): void {
    this.walletService.createWallet(this.newWalletBalance).subscribe({
      next: (newWallet) => {
        console.log('Nova carteira criada!', newWallet);
        alert('Carteira criada com sucesso!');
        this.newWalletBalance = 0;
        this.loadWallets();
      },
      error: (err) => {
        console.error('Erro ao criar carteira!', err);
        alert('Ocorreu um erro ao criar a carteira.');
      },
    });
  }

  loadWallets(): void {
    this.authService.getWallets().subscribe({
      next: (wallets) => {
        this.wallets = [...wallets];
        console.log(
          'Carteiras carregadas e prontas para exibir!',
          this.wallets
        );
      },
      error: (err) => {
        console.error('Erro ao carregar carteiras!', err);
        alert('Ocorreu um erro ao carregar as carteiras. Verifique o console.');
      },
    });
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
