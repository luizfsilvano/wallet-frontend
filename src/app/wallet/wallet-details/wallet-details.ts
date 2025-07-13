import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../../transaction/transaction';

@Component({
  selector: 'app-wallet-details',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, DecimalPipe],
  templateUrl: './wallet-details.html',
  styleUrls: ['./wallet-details.scss'],
})
export class WalletDetailsComponent implements OnInit {
  walletId: number | null = null;
  transactions: any[] = [];
  currentPage = 0;
  totalPages = 0;
  totalElements = 0;
  pageSize = 4;
  transactionData = {
    amount: 0,
    type: 'CREDIT' as 'CREDIT' | 'DEBIT',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.walletId = Number(params.get('id'));
      if (this.walletId) {
        this.loadTransactions();
      }
    });
  }

  loadTransactions(page: number = 0): void {
    if (!this.walletId) return;

    this.transactionService
      .getTransactionsForWallet(this.walletId, page, this.pageSize)
      .subscribe({
        next: (response) => {
          this.transactions = response.content;
          this.currentPage = response.number;
          this.totalPages = response.totalPages;
          this.totalElements = response.totalElements;

          console.log('Transações carregadas:', this.transactions);
        },
        error: (err) => console.error('Erro ao carregar transações', err),
      });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.loadTransactions(this.currentPage + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.loadTransactions(this.currentPage - 1);
    }
  }

  createTransaction(): void {
    if (!this.walletId || this.transactionData.amount <= 0) {
      alert('O valor da transação deve ser positivo.');
      return;
    }

    const dataToPost = {
      walletId: this.walletId,
      amount: this.transactionData.amount,
      type: this.transactionData.type,
    };

    this.transactionService.createTransaction(dataToPost).subscribe({
      next: () => {
        alert('Transação criada com sucesso!');
        this.transactionData.amount = 0;
        this.loadTransactions();
      },
      error: (err) =>
        alert(
          `Erro ao criar transação: ${
            err.error?.message || 'Erro desconhecido'
          }`
        ),
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
