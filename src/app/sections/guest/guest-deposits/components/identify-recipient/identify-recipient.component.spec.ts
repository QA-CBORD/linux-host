import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdentifyRecipientComponent } from './identify-recipient.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FocusNextModule } from '@shared/directives/focus-next/focus-next.module';
import { StButtonModule } from '@shared/ui-components/st-button';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { StInputFloatingLabelModule } from '@shared/ui-components/st-input-floating-label/st-input-floating-label.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('IdentifyRecipientComponent', () => {
  let component: IdentifyRecipientComponent;
  let fixture: ComponentFixture<IdentifyRecipientComponent>;
  const activatedRouteStub = () => ({ data: of({ reciepients: [] }) });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IdentifyRecipientComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        StHeaderModule,
        StInputFloatingLabelModule,
        HttpClientTestingModule,
        StButtonModule,
        FocusNextModule,
      ],
      providers: [
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentifyRecipientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('IdentifyRecipientComponent', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
});
