import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../auth';
import { Router } from '@angular/router';
import { PalestraApi, Palestra } from '../palestra';
import { ChangeDetectorRef } from '@angular/core';

interface UserData {
  id: number;
  email: string;
  nome: string;
  admin: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  palestras: Palestra[] = [];
  userData: UserData | null = null;
  palestraApi: PalestraApi; // Acrecentado a instancia do PalestraApi

  constructor(
    private authService: Auth,
    private router: Router,
    private http: HttpClient,
    private cd: ChangeDetectorRef,
  ) {
    this.palestraApi = new PalestraApi(this.http); // Inicializa o PalestraApi no construtor
  }

  ngOnInit(): void {
    this.userData = this.authService.getUser();
    if (!this.userData) {
      this.router.navigateByUrl('/login');
    }

    this.palestraApi.listarPalestra().subscribe({
      next: (dados) => {
        this.palestras = dados;
        this.cd.detectChanges();
      },
      error: (err) => console.log('Erro ao carregar dados', err),
    });
  }

  inscricao(idPalestra: number): void {
    const idUsuario = this.userData?.id;
    if (!idUsuario) return;
    this.http
      .post<any>('http://localhost:3000/api/inscricao', {
        idUsuario,
        idPalestra,
      })
      .subscribe({
        next: (res) => {
          alert(res.message);
        },
        error: (err) => {
          alert(err.error.message);
        },
      });
  }
}
