import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpTransferComponent } from './pop-up-transfer.component';

describe('PopUpTransferComponent', () => {
  let component: PopUpTransferComponent;
  let fixture: ComponentFixture<PopUpTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpTransferComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

//pra qunado clicar no botao do pix/etc preencher com o valor do enum
