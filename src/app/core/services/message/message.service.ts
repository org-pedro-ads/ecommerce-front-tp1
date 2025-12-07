import { Injectable } from '@angular/core';

export interface Message {
  text: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  
  messages: Message[] = [];

  add(text: string, type: 'success' | 'error' | 'info' = 'info') {
    this.messages.push({ text, type });
    
    setTimeout(() => {
      if (this.messages.length > 0) {
        this.remove(0);
      }
    }, 5000);
  }

  remove(index: number) {
    this.messages.splice(index, 1);
  }

  clear() {
    this.messages = [];
  }
}