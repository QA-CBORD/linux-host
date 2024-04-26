import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StHeaderSearchBarComponent } from './st-header-search-bar.component';
import { NativeProvider } from '@core/provider/native-provider/native.provider';
import { By } from '@angular/platform-browser';
import { IonSearchbar, SearchbarCustomEvent } from '@ionic/angular';
import { Keyboard } from '@capacitor/keyboard';

const nativeProviderMock = {
  isMobile: jest.fn(() => true),
};

describe('StHeaderSearchBarComponent', () => {
  let component: StHeaderSearchBarComponent;
  let fixture: ComponentFixture<StHeaderSearchBarComponent>;
  let searchbar: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [StHeaderSearchBarComponent],
      providers: [{ provide: NativeProvider, useValue: nativeProviderMock }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StHeaderSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Wait for ion-searchbar to render
    fixture.whenStable().then(() => {
      searchbar = fixture.debugElement.query(By.directive(IonSearchbar));
    });
  });

  it('should create the about page', () => {
    expect(component).toBeTruthy();
  });

  it('should call onInputChanged when ionInput event is triggered', () => {
    const inputValue = 'example search';
    jest.spyOn(component, 'onInputChanged');

    fixture.whenStable().then(() => {
      searchbar.triggerEventHandler('ionInput', {
        detail: {
          value: inputValue,
        },
      });
      fixture.detectChanges();

      expect(component.onInputChanged).toHaveBeenCalledWith(inputValue);
    });
  });

  it('should emit search event with input value on input change', () => {
    const value = 'test';
    const onSearchSpy = jest.spyOn(component.onSearch, 'emit');
  
    component.onInputChanged({ target: { value } } as SearchbarCustomEvent);
  
    expect(onSearchSpy).toHaveBeenCalledWith(value);
  });

  it('should not hide keyboard on enter key click if not mobile device', async () => {
    const isMobileSpy = jest.spyOn(nativeProviderMock, 'isMobile').mockReturnValue(false);
    await component.onEnterKeyClicked();
    expect(isMobileSpy).toHaveBeenCalled();
  });

  it('should not hide keyboard on enter key click if not mobile device', async () => {
    const isMobileSpy = jest.spyOn(nativeProviderMock, 'isMobile').mockReturnValue(true);
    await component.onEnterKeyClicked();
    expect(isMobileSpy).toHaveBeenCalled();
  });
});
