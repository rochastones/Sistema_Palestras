import { Component, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Auth } from '../auth';

interface respostaLogin {
  message: string;
  tipoMensagem: string;
  userData: {
    id: number;
    email: string;
    nome: string;
    admin: boolean;
  };
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authService: Auth,
  ) {}

  formularioLogin = new FormGroup({
    email: new FormControl('', Validators.required),
    senha: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  mensagem: string = '';
  tipoMensagem: 'success' | 'danger' = 'success';

  onSubmit() {
    if (this.formularioLogin.valid) {
      this.http
        .post<respostaLogin>('http://localhost:3000/api/login', this.formularioLogin.value)

        .subscribe({
          next: (res) => {
            // Define o tipo de mensagem baseado na resposta do backend
            this.tipoMensagem = res.tipoMensagem === 'danger' ? 'danger' : 'success';
            this.mensagem = res.message || 'Login realizado com sucesso!'; // fallback
            this.cdr.detectChanges();

            if (res.tipoMensagem === 'success') {
              this.authService.login(res.userData);
              this.router.navigateByUrl('/home');
            }

            // Armazena dados do usuário
            if (res.userData) {
              localStorage.setItem('userData', JSON.stringify(res.userData));
            }

            // Redireciona após 2 segundos
            if (res.tipoMensagem === 'success') {
              // verificação adicionada
              setTimeout(() => {
                this.router.navigate(['/home']); // Altera para a rota desejada após login
                state: {
                  userData: res.userData;
                } // passar dados entre rotas sem usar armazenamento global
              }, 2000);
            }
          },

          error: (err) => {
            this.tipoMensagem = 'danger';
            if (err?.status === 401) {
              this.mensagem = err?.error?.message || 'Email ou senha inválidos';
            } else if (err?.status === 400) {
              this.mensagem = err?.error?.message || 'Dados inválidos';
            } else {
              this.mensagem = err?.error?.message || 'Erro ao fazer login';
            }
            this.cdr.detectChanges();

            // Limpa as mensagems após 5 segundos
            setTimeout(() => {
              this.mensagem = '';
            }, 5000);
          },
        });
    } else {
      // Validação do formulário
      this.tipoMensagem = 'danger';
      this.mensagem = 'Por favor, preencha todos os campos corretamente.';
      this.cdr.detectChanges();
    }
  }
}
