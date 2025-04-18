import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAsideComponent } from './main-aside.component';

describe('MainAsideComponent', () => {
  let component: MainAsideComponent;
  let fixture: ComponentFixture<MainAsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainAsideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
