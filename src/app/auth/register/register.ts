import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export class RegisterComponent {
  registerData = {
    username: '',
    password: '',
  };
  confirmPassword = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (this.registerData.password !== this.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    this.authService.register(this.registerData).subscribe({
      next: (response) => {
        console.log('Registro bem-sucedido!', response);
        alert('Usuário registrado com sucesso! Agora você pode fazer o login.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Falha no registro!', err);
        alert(`Erro no registro: ${err.error}`);
      },
    });
  }
}
