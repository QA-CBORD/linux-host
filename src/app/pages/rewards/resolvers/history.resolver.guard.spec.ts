import { TestBed, inject } from '@angular/core/testing';

import { HistoryResolverGuard } from './history.resolver.guard';

describe('Locations.ResolverGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [HistoryResolverGuard],
        });
    });

    it('should ...', inject([HistoryResolverGuard], (guard: HistoryResolverGuard) => {
        expect(guard).toBeTruthy();
    }));
});
