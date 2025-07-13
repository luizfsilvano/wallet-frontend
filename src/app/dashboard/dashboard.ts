import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WalletService } from '../wallet/wallet'; // Apenas o WalletService é necessário para os dados
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe, DecimalPipe, RouterLink],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class DashboardComponent implements OnInit {
  // Controlo da UI
  isSidebarCollapsed = false;
  activeSection = 'resumo';
  sectionTitles: { [key: string]: string } = {
    resumo: 'Dashboard',
    carteiras: 'Minhas Carteiras',
    transacoes: 'Transações',
  };

  // Dados
  wallets: any[] = [];

  // Controlo de Modais
  isCreateWalletModalVisible = false;
  newWalletBalance = 0;

  // O construtor agora só precisa do Router e do WalletService
  constructor(private router: Router, private walletService: WalletService) {}

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
    // CORREÇÃO: Usando o walletService para buscar as carteiras
    this.walletService.getWallets().subscribe({
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
