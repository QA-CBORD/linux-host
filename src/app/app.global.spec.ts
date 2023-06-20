import { TestBed } from '@angular/core/testing';
import { Events } from './app.global';

describe('Events', () => {
  let service: Events;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [Events] });
    service = TestBed.inject(Events);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it(`SIDEMENU_UPDATE has default value`, () => {
    expect(Events.SIDEMENU_UPDATE).toEqual(`data:navigationMenu:updated`);
  });

  it(`SIDEPANE_ENABLE has default value`, () => {
    expect(Events.SIDEPANE_ENABLE).toEqual(`state:navigationMenu:visibility`);
  });

  it(`LOADER_SHOW has default value`, () => {
    expect(Events.LOADER_SHOW).toEqual(`state:loader:visibility`);
  });
});
