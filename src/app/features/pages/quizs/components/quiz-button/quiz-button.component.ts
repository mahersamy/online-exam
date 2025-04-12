import { Component, EventEmitter, output, Output } from '@angular/core';

@Component({
  selector: 'app-quiz-button',
  imports: [],
  templateUrl: './quiz-button.component.html',
  styleUrl: './quiz-button.component.scss'
})
export class QuizButtonComponent {
prev = output<void>();
next = output<void>();

previous(){
  this.prev.emit()
}

forword(){
  this.next.emit()

}

}
