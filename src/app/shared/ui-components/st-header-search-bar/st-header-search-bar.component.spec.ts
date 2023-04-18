import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StHeaderSearchBarComponent } from './st-header-search-bar.component';
import { NativeProvider } from '@core/provider/native-provider/native.provider';

const nativeProviderMock = {
  isMobile:  jest.fn(() => true)
};


describe('StHeaderSearchBarComponent', () => {
  let component: StHeaderSearchBarComponent;
  let fixture: ComponentFixture<StHeaderSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [StHeaderSearchBarComponent],
      providers: [
        { provide: NativeProvider, useValue: nativeProviderMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StHeaderSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the about page', () => {
    expect(component).toBeTruthy();
  });
});
