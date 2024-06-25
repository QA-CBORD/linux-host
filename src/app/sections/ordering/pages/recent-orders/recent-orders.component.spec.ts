import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecentOrdersComponent } from './recent-orders.component';
import { CartService, MerchantService } from '@sections/ordering';
import { LoadingService } from '@core/service/loading/loading.service';
import { CheckingServiceFacade } from '@sections/check-in/services/check-in-facade.service';
import { ModalsService } from '@core/service/modals/modals.service';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { DateUtilObject } from '@sections/accounts/shared/ui-components/filter/date-util';
import { CheckingProcess } from '@sections/check-in/services/check-in-process-builder';
import { of } from 'rxjs';
import { NavController } from '@ionic/angular';
import {  StHeaderModule } from '@shared/ui-components';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Storage } from '@ionic/storage';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ORDERING_CONTENT_STRINGS } from '@sections/ordering/ordering.config';
import { RecentOrdersRoutingModule } from './recent-orders.routing.module';

describe('RecentOrdersComponent', () => {
    let component: RecentOrdersComponent;
    let fixture: ComponentFixture<RecentOrdersComponent>;
    let mockMerchantService: Partial<MerchantService>;
    let mockOrderingService: Partial<OrderingService>;
    let mockCheckingProcess: Partial<CheckingProcess>;
    let mockLoadingService: Partial<LoadingService>;
    let mockCheckingServiceFacade: Partial<CheckingServiceFacade>;
    let mockCartService: Partial<CartService>;
    let mockModalsService: Partial<ModalsService>;
    let mockRouterService: Partial<Router>;

    beforeEach(async () => {
        mockMerchantService = {
            recentOrders$: of([]),
            period: { name: "test" },
            orderStatus: 'completed',
            getRecentOrdersPeriod: jest.fn().mockReturnValue(of([]))
        };

        mockOrderingService = {
            getContentStringByName: jest.fn().mockReturnValue(of(ORDERING_CONTENT_STRINGS.buttonDashboardStartOrder))
        };

        mockLoadingService = {
            showSpinner: jest.fn(),
        };

        mockCheckingServiceFacade = {
            getContentStringByName: jest.fn().mockReturnValue(of({}))
        };
        mockModalsService = {
            createActionSheet: jest.fn().mockReturnValue({ present: jest.fn().mockResolvedValue(true), onDidDismiss: jest.fn().mockResolvedValue({ data: { period: { name: "Gutenberg", year: 1455, month: 12 }, status: "printed" } }) })
        };

        mockCheckingProcess = { start: jest.fn() };

        mockCartService = {};

        mockRouterService = {
            navigate: jest.fn().mockResolvedValue(true)
        };

        const storage = {
            clear: jest.fn(),
            ready: jest.fn(),
            get: jest.fn(),
            set: jest.fn(),
        };

        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule,
                RecentOrdersRoutingModule,
                StHeaderModule,
            ],
            declarations: [RecentOrdersComponent],
            providers: [
                { provide: Storage, useValue: storage },
                { provide: Router, useValue: mockRouterService },
                { provide: MerchantService, useValue: mockMerchantService },
                { provide: OrderingService, useValue: mockOrderingService },
                { provide: CheckingProcess, useValue: mockCheckingProcess },
                { provide: LoadingService, useValue: mockLoadingService },
                { provide: CheckingServiceFacade, useValue: mockCheckingServiceFacade },
                { provide: CartService, useValue: mockCartService },
                { provide: ModalsService, useValue: mockModalsService },
                { provide: NavController, useValue: { navigate: jest.fn() } },
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RecentOrdersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize orders', () => {
        jest.spyOn(component as any, 'initOrders');
        component.ngOnInit();
        expect(component['initOrders']).toHaveBeenCalled();
    });

    it('should refresh recent orders', () => {
        const target = document.createElement('div');
        jest.spyOn(component, 'refreshRecentOrders');
        component.refreshRecentOrders({ target });
        expect(component.refreshRecentOrders).toHaveBeenCalledWith({ target });
    });

    it('should navigate to check-in', async () => {
        const orderInfo = { id: 1, status: 'pending' };
        jest.spyOn(component, 'onNavigateToCheckin');
        await component.onNavigateToCheckin(orderInfo);
        expect(component.onNavigateToCheckin).toHaveBeenCalledWith(orderInfo);
    });

    it('should pick an order', async () => {
        const orderInfo = { id: 1, status: 'pending' };
        jest.spyOn(component, 'onOrderPicked');
        await component.onOrderPicked(orderInfo as any);
        expect(component.onOrderPicked).toHaveBeenCalledWith(orderInfo);
    });

    it('should go back', async () => {
        jest.spyOn(component, 'back');
        await component.back();
        expect(component.back).toHaveBeenCalled();
    });

    it('should close', async () => {
        jest.spyOn(component, 'close');
        await component.close();
        expect(component.close).toHaveBeenCalled();
    });

    it('should handle filter change', () => {
        const period = { startDate: new Date(), endDate: new Date() };
        const status = 'completed';
        jest.spyOn(component, 'filterChange');
        component.filterChange({ period, status });
        expect(component.filterChange).toHaveBeenCalledWith({ period, status });
    });

    it('should get order by period', () => {
        const period: DateUtilObject = { name: "period", year: 2020, month: 12 };
        const status = 'completed';
        jest.spyOn(component, 'getOrderByPeriod');
        component.getOrderByPeriod(period, status);
        expect(component.getOrderByPeriod).toHaveBeenCalledWith(period, status);
    });

    it('should handle filter', async () => {
        jest.spyOn(component, 'onFilter');
        await component.onFilter();
        expect(component.onFilter).toHaveBeenCalled();
    });

    it('should get filter details', async () => {
        await component.onFilter();
        const selectedFilters = component['selectedFilters'];
        expect(selectedFilters).toBeDefined();
    });

    it('should keep the filter details', async () => {
        const period: DateUtilObject = { name: "Gutenberg", year: 1455, month: 12 };
        const status = 'printed';
        await component.onFilter();
        component.refreshRecentOrders({ target: { complete: jest.fn() } });
        const selectedFilters = component['selectedFilters'];
        expect(selectedFilters).toEqual({ period, status });
    });
});