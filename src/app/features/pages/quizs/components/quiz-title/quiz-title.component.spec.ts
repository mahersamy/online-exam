import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizTitleComponent } from './quiz-title.component';

describe('QuizTitleComponent', () => {
  let component: QuizTitleComponent;
  let fixture: ComponentFixture<QuizTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizTitleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
