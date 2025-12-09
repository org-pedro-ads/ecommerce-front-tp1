import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router'; // Mantenha os imports
import { AuthService } from '../auth/services/auth.service';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class SidebarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  isAdmin() {
    return this.authService.isAdmin();
  }

  onClickMeuPerfil() {
    if(!this.authService.idUser()) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/user/edit']);
    }
  }

  // ✅ NOVO MÉTODO: Verifica se a rota atual contém o caminho passado
  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }
}