import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { LucideAngularModule, User, ShoppingCart, LogOut, Tag, Image, Package, X, Search, Trash2, LogIn, UserPlus } from 'lucide-angular';


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(LucideAngularModule.pick({ User, ShoppingCart, LogOut, Tag, Image, 
      Package, X, Search, Trash2, LogIn, UserPlus }))
  ]
};
