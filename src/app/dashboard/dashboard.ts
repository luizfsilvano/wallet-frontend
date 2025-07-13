import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth';
import { WalletService } from '../wallet/wallet';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe, DecimalPipe, RouterLink],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class DashboardComponent implements OnInit {
  // Controle da UI
  isSidebarCollapsed = false;
  activeSection = 'resumo'; // Seção inicial
  sectionTitles: { [key: string]: string } = {
    resumo: 'Dashboard',
    carteiras: 'Minhas Carteiras',
    transacoes: 'Transações',
  };

  // Dados
  wallets: any[] = [];

  // Controle de Modais
  isCreateWalletModalVisible = false;
  newWalletBalance = 0;

  constructor(
    private router: Router,
    private authService: AuthService,
    private walletService: WalletService
  ) {}

  ngOnInit(): void {
    this.loadWallets();
  }

  // Lógica da UI
  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  setActiveSection(section: string): void {
    this.activeSection = section;
  }

  openCreateWalletModal(): void {
    this.isCreateWalletModalVisible = true;
  }

  closeCreateWalletModal(): void {
    this.isCreateWalletModalVisible = false;
  }

  // Lógica de Dados
  loadWallets(): void {
    this.authService.getWallets().subscribe({
      next: (wallets) => {
        this.wallets = [...wallets];
        console.log('Carteiras carregadas!', this.wallets);
      },
      error: (err) => console.error('Erro ao carregar carteiras!', err),
    });
  }

  createWallet(): void {
    this.walletService.createWallet(this.newWalletBalance).subscribe({
      next: () => {
        alert('Carteira criada com sucesso!');
        this.closeCreateWalletModal();
        this.loadWallets(); // Recarrega a lista
        this.newWalletBalance = 0;
      },
      error: (err) => alert(`Erro ao criar carteira: ${err.message}`),
    });
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
