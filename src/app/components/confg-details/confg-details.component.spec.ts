import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfgDetailsComponent } from './confg-details.component';

describe('ConfgDetailsComponent', () => {
  let component: ConfgDetailsComponent;
  let fixture: ComponentFixture<ConfgDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfgDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfgDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
