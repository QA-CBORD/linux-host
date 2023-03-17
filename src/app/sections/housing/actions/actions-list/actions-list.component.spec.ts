import { applicationsService, popoverCtrl } from './../../pages/form-payment/form-payment.component.spec';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionsListComponent } from './actions-list.component';
import { PopoverController } from '@ionic/angular';
import { ApplicationsService } from '@sections/housing/applications/applications.service';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { routerStub } from '@sections/housing/pages/roommate-search/pages/search-by/search-by.page.spec';

describe('ActionsListComponent', () => {
  let component: ActionsListComponent;
  let fixture: ComponentFixture<ActionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionsListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: PopoverController, useValue: popoverCtrl },
        { provide: ApplicationsService, useValue: applicationsService },
        { provide: Router, useFactory: routerStub },
      ],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('On view tapped', () => {
    it('should handle view', () => {
      const spy = jest.spyOn(component, 'handleView');
      clickIonItem(fixture, component.actions.VIEW);
      expect(spy).toBeCalled();
    });

    it('should make forms viewable (read-only)', () => {
      clickIonItem(fixture, component.actions.VIEW);
      expect(applicationsService.isView).toBeTruthy();
    });

    it('should dismiss the popover', () => {
      clickIonItem(fixture, component.actions.VIEW);
      expect(popoverCtrl.dismiss).toBeCalled();
    });
  });

  describe('On edit tapped', () => {
    it('should handle view', () => {
      const spy = jest.spyOn(component, 'handleEdit');
      clickIonItem(fixture, component.actions.EDIT);
      expect(spy).toBeCalled();
    });

    it('should navigate', () => {
      const spy = jest.spyOn(component as any, 'navigate');
      clickIonItem(fixture, component.actions.EDIT);
      expect(spy).toBeCalled();
    });
  });

  describe('On details tapped', () => {
    it('should show the popover', () => {
      component.showDetailsOption = true;
      fixture.detectChanges();
      clickIonItem(fixture, component.actions.DETAILS);
      expect(popoverCtrl.create).toBeCalled();
    });
  });

  describe('On remove tapped', () => {
    it('should dismiss the popover', () => {
      component.showRemoveOption = true;
      fixture.detectChanges();
      clickIonItem(fixture, component.actions.REMOVE);
      expect(popoverCtrl.dismiss).toBeCalled();
    });

    it('should NOT remove', () => {
      const ionItems = fixture.debugElement.queryAll(By.css('ion-item'));
      const ionItem = ionItems.find(
        value =>
          (<string>value.nativeElement.textContent).toLowerCase().trim() === component.actions.REMOVE.toLowerCase()
      );
      expect(ionItem).toBeFalsy();
    });

    it('should remove', () => {
      component.showRemoveOption = true;
      fixture.detectChanges();
      const spy = jest.spyOn(component.onRemove, 'emit');
      clickIonItem(fixture, component.actions.REMOVE);
      expect(spy).toBeCalled();
    });
  });
});

function clickIonItem(fixture: ComponentFixture<ActionsListComponent>, itemName: string) {
  const ionItems = fixture.debugElement.queryAll(By.css('ion-item'));
  const ionItem = ionItems.find(
    value => (<string>value.nativeElement.textContent).toLowerCase().trim() === itemName.toLowerCase()
  );
  ionItem.triggerEventHandler('click');
}
