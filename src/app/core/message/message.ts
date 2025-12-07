import { Component } from '@angular/core';
import { MessageService } from '../services/message/message.service';

@Component({
  selector: 'app-message',
  imports: [],
  templateUrl: './message.html',
  styleUrl: './message.css',
})
export class Message {

  constructor(public messageService: MessageService) {}
  
}
