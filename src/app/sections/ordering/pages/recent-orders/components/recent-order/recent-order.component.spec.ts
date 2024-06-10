import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { ModalsService } from '@core/service/modals/modals.service';
import { ToastService } from '@core/service/toast/toast.service';
import { AlertController, IonicModule, PopoverController } from '@ionic/angular';
import { CheckingServiceFacade } from '@sections/check-in/services/check-in-facade.service';
import { CheckingProcess } from '@sections/check-in/services/check-in-process-builder';
import { CartService, MerchantService, OrderDetailOptions } from '@sections/ordering/services';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { LockDownService } from '@shared/services';
import { RecentOrderComponent } from './recent-order.component';
import { of } from 'rxjs';
import { OrderActionSheetService } from '@sections/ordering/services/odering-actionsheet.service';
import { InstitutionInfo } from '@core/model/institution';
import { lastValueFrom } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { StHeaderModule } from '@shared/ui-components';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockStorageService } from '@core/states/storage/storage-state-mock.service';
import { Storage } from '@ionic/storage-angular';
import { OrderDetailsModule } from '@sections/ordering/shared/ui-components/order-details/order-details.module';
import { BUTTON_TYPE } from '@core/utils/buttons.config';
import { ORDER_TYPE } from '@sections/ordering/ordering.config';
import { MenuItemInfo, OrderItem } from '@sections/ordering/components';
import { AddressInfo } from 'net';

const menuMerchants = [
  {
    id: '2cf2524a-0641-482c-8b66-bdfdcdd353a8',
    objectRevision: 4,
    campusId: '7612d8de-51e1-4cab-971d-88a317326437',
    externalId: null,
    parentMerchantId: null,
    name: '13 Cubes Bravo-Pasta',
    shortName: 'bravo',
    description: null,
    storeAddress: {
      id: 'e2780564-52ee-4fdf-8da5-1f7800ce9c72',
      objectRevision: 1,
      department: null,
      company: null,
      address1: null,
      address2: null,
      city: null,
      state: null,
      postalcode: null,
      country: null,
      latitude: null,
      longitude: null,
      notes: null,
      nickname: null,
      building: null,
      floor: null,
      room: null,
      crossStreet: null,
      accessCode: null,
      phone: null,
      phoneExt: null,
      onCampus: null,
    },
    billingAddress: {
      id: 'bdcd59d3-04ee-4efa-ac06-ccf7a2b70ae0',
      objectRevision: 1,
      department: null,
      company: null,
      address1: null,
      address2: null,
      city: null,
      state: null,
      postalcode: null,
      country: null,
      latitude: null,
      longitude: null,
      notes: null,
      nickname: null,
      building: null,
      floor: null,
      room: null,
      crossStreet: null,
      accessCode: null,
      phone: null,
      phoneExt: null,
      onCampus: null,
    },
    billingTerminalId: null,
    cashlessTerminalLocation: null,
    phoneCustomerService: null,
    emailCustomerService: null,
    reportingEmail: null,
    reportingFaxNumber: null,
    emailOrder: 'dev_13cubes@test.cbord.com',
    emailListAlerts: 'error_dev_13cubes@test.cbord.com',
    emailListOrderCc: null,
    faxNumber: null,
    website: null,
    installationDate: '2024-03-08T00:00:00.000+0000',
    hoursOfOperation: null,
    paymentNotes: null,
    openNow: true,
    deliveryRadius: null,
    distanceFromUser: null,
    orderTypes: {
      id: null,
      version: null,
      insertTime: null,
      lastUpdated: null,
      merchantId: '2cf2524a-0641-482c-8b66-bdfdcdd353a8',
      pickup: true,
      delivery: false,
      dineIn: false,
      pickupPrepTime: 15,
      deliveryPrepTime: 45,
      dineInPrepTime: 30,
      pickupInstructions: '',
      deliveryInstructions: '',
      dineInInstructions: null,
    },
    taxRate: 0,
    image: 'sliderVendor_021.png',
    imageThumbnail: '9071beaf-821a-4caa-960a-68e69418697e',
    imageFull: '1c032d0f-7d03-49c6-93fa-1a952223a1c2',
    hasMenu: true,
    serviceConsumerId: null,
    settings: {
      list: [
        {
          id: '00ffc8a0-aa2f-4e4d-9d38-b48ea82a3b35',
          version: 1,
          insertTime: '2024-03-08T12:54:55.937+0000',
          lastUpdated: '2024-03-08T12:54:55.937+0000',
          name: 'min_balance_for_walkout',
          domain: 'merchant',
          category: 'order',
          contentMediaType: 5,
          value: '0',
          description: null,
        },
        {
          id: '1099dba5-1e6e-4442-a1d3-5b2de62f9f37',
          version: 2,
          insertTime: '2024-03-08T12:54:55.824+0000',
          lastUpdated: '2024-03-08T12:56:08.890+0000',
          name: 'enabled',
          domain: 'merchant',
          category: 'ordering',
          contentMediaType: 3,
          value: '1',
          description: null,
        },
        {
          id: '187e9043-deea-4ad0-905e-5da93c0b5dbb',
          version: 1,
          insertTime: '2024-03-08T12:54:55.974+0000',
          lastUpdated: '2024-03-08T12:54:55.974+0000',
          name: 'tax_delivery_fee',
          domain: 'merchant',
          category: 'tax',
          contentMediaType: 3,
          value: '0',
          description: null,
        },
        {
          id: '1c58ec46-c224-4db7-adeb-b46ba92a1d99',
          version: 2,
          insertTime: '2024-03-08T12:54:55.870+0000',
          lastUpdated: '2024-03-08T12:56:08.931+0000',
          name: 'disable_item_notes',
          domain: 'merchant',
          category: 'order',
          contentMediaType: 5,
          value: 'true',
          description: null,
        },
        {
          id: '2d698410-16e7-475f-bec9-ca1c86d5a9b4',
          version: 1,
          insertTime: '2024-03-08T12:54:55.890+0000',
          lastUpdated: '2024-03-08T12:54:55.890+0000',
          name: 'menu_barcode_enabled',
          domain: 'merchant',
          category: 'menu',
          contentMediaType: 5,
          value: null,
          description: null,
        },
        {
          id: '2f128adc-e51a-4f9e-a041-1ef4a6bfc1f1',
          version: 1,
          insertTime: '2024-03-08T12:54:56.037+0000',
          lastUpdated: '2024-03-08T12:54:56.037+0000',
          name: 'transaction_history_report',
          domain: 'merchant',
          category: 'reports',
          contentMediaType: 3,
          value: '0',
          description: null,
        },
        {
          id: '39b930e2-193e-4e91-a98b-fb193d6750b4',
          version: 1,
          insertTime: '2024-03-08T12:54:55.919+0000',
          lastUpdated: '2024-03-08T12:54:55.919+0000',
          name: 'default_media_type_for_walkout',
          domain: 'merchant',
          category: 'order',
          contentMediaType: 1,
          value: null,
          description: null,
        },
        {
          id: '3c2a453a-2b0e-4494-a81e-a1f9f8469fc4',
          version: 1,
          insertTime: '2024-03-08T12:54:55.904+0000',
          lastUpdated: '2024-03-08T12:54:55.904+0000',
          name: 'menu_add_items_enabled',
          domain: 'merchant',
          category: 'menu',
          contentMediaType: 5,
          value: null,
          description: null,
        },
        {
          id: '43fa2dbd-2086-4601-9ae5-f2505e6c1158',
          version: 1,
          insertTime: '2024-03-08T12:54:56.179+0000',
          lastUpdated: '2024-03-08T12:54:56.179+0000',
          name: 'pos_delivery_fee_service_charge_id',
          domain: 'merchant',
          category: 'ordering',
          contentMediaType: 1,
          value: '',
          description: null,
        },
        {
          id: '4a92a40d-a6e7-405d-a600-b93716b4021b',
          version: 1,
          insertTime: '2024-03-08T12:54:56.115+0000',
          lastUpdated: '2024-03-08T12:54:56.115+0000',
          name: 'pos_tender_map',
          domain: 'merchant',
          category: 'ordering',
          contentMediaType: 5,
          value: '{}',
          description: null,
        },
        {
          id: '4f84f241-c264-4694-bf77-d70b3c70837f',
          version: 1,
          insertTime: '2024-03-08T12:54:55.855+0000',
          lastUpdated: '2024-03-08T12:54:55.855+0000',
          name: 'gift_ordering_enabled',
          domain: 'merchant',
          category: 'order',
          contentMediaType: 5,
          value: null,
          description: null,
        },
        {
          id: '5e91c597-bdbe-418a-8e79-4228224abe89',
          version: 3,
          insertTime: '2024-03-08T12:54:56.053+0000',
          lastUpdated: '2024-03-08T13:01:26.551+0000',
          name: 'supported_types',
          domain: 'merchant',
          category: 'payment',
          contentMediaType: 1,
          value:
            '[{"payment_system_type":1,"tender_types":["800","801","802","3","5","4","6","2","1"]},{"payment_system_type":4,"tender_types":[]}]',
          description: null,
        },
        {
          id: '6b94b39f-9af8-429d-9308-d497a05e79e7',
          version: 4,
          insertTime: '2024-03-08T12:54:55.742+0000',
          lastUpdated: '2024-03-18T20:54:32.792+0000',
          name: 'capacity',
          domain: 'merchant',
          category: 'ordering',
          contentMediaType: 1,
          value: '{"enabled":true,"length":15,"capacity":13}',
          description: null,
        },
        {
          id: '6ee02f71-bfa6-457b-8440-0b0186cbf440',
          version: 1,
          insertTime: '2024-03-08T12:54:56.099+0000',
          lastUpdated: '2024-03-08T12:54:56.099+0000',
          name: 'pos_order_type_map',
          domain: 'merchant',
          category: 'ordering',
          contentMediaType: 5,
          value: '{}',
          description: null,
        },
        {
          id: '73a80721-c93b-4145-a2fc-fbd73b3fc90e',
          version: 1,
          insertTime: '2024-03-08T13:00:07.716+0000',
          lastUpdated: '2024-03-08T13:00:07.716+0000',
          name: 'use_search_path',
          domain: 'merchant',
          category: 'payment',
          contentMediaType: 3,
          value: '0',
          description: null,
        },
        {
          id: '7a53fae4-b0b7-41f7-ab72-77b59d856bac',
          version: 1,
          insertTime: '2024-03-08T12:54:56.163+0000',
          lastUpdated: '2024-03-08T12:54:56.163+0000',
          name: 'pos_default_discount_id',
          domain: 'merchant',
          category: 'ordering',
          contentMediaType: 1,
          value: '',
          description: null,
        },
        {
          id: '81f898aa-1f83-4188-8998-91054704eb31',
          version: 2,
          insertTime: '2024-03-08T12:54:55.958+0000',
          lastUpdated: '2024-03-08T13:00:07.625+0000',
          name: 'default',
          domain: 'merchant',
          category: 'menu',
          contentMediaType: 1,
          value: '1105426e-b451-4f86-a6a9-f8b2dfb31ad7',
          description: null,
        },
        {
          id: '88591d09-c287-4f96-8a7e-f69c32cb9f85',
          version: 1,
          insertTime: '2024-03-08T12:54:56.021+0000',
          lastUpdated: '2024-03-08T12:54:56.021+0000',
          name: 'order_ahead_enabled',
          domain: 'merchant',
          category: 'order',
          contentMediaType: 3,
          value: '0',
          description: null,
        },
        {
          id: '92b61bac-dabd-4ddb-847b-b509d14357af',
          version: 1,
          insertTime: '2024-03-08T12:54:56.195+0000',
          lastUpdated: '2024-03-08T12:54:56.195+0000',
          name: 'pos_employee',
          domain: 'merchant',
          category: 'ordering',
          contentMediaType: 1,
          value: '',
          description: null,
        },
        {
          id: '9848f9e3-3aea-4a82-b7db-32a1a853484e',
          version: 1,
          insertTime: '2024-03-08T12:54:55.988+0000',
          lastUpdated: '2024-03-08T12:54:55.988+0000',
          name: 'enable_tip',
          domain: 'merchant',
          category: 'tip',
          contentMediaType: 3,
          value: '1',
          description: null,
        },
        {
          id: '9f95803e-a26c-4d07-8a4c-b8ad57f57bbf',
          version: 1,
          insertTime: '2024-03-08T12:54:56.147+0000',
          lastUpdated: '2024-03-08T12:54:56.147+0000',
          name: 'pos_tender_to_order_type_map',
          domain: 'merchant',
          category: 'ordering',
          contentMediaType: 5,
          value: '{}',
          description: null,
        },
        {
          id: 'b0f069c4-2177-4415-9681-5fd838abf556',
          version: 1,
          insertTime: '2024-03-08T12:54:55.839+0000',
          lastUpdated: '2024-03-08T12:54:55.839+0000',
          name: 'pickup_locations_enabled',
          domain: 'merchant',
          category: 'order',
          contentMediaType: 5,
          value: null,
          description: null,
        },
        {
          id: 'c5658456-7e20-4813-9d3e-a9996a116428',
          version: 1,
          insertTime: '2024-03-08T12:54:56.131+0000',
          lastUpdated: '2024-03-08T12:54:56.131+0000',
          name: 'pos_tender_map_by_type',
          domain: 'merchant',
          category: 'ordering',
          contentMediaType: 5,
          value: '{}',
          description: null,
        },
        {
          id: 'c5899040-d921-4efa-87c9-c0c48cd5728f',
          version: 1,
          insertTime: '2024-03-08T12:54:56.054+0000',
          lastUpdated: '2024-03-08T12:54:56.054+0000',
          name: 'meal_equivalency_enabled',
          domain: 'merchant',
          category: 'payment',
          contentMediaType: 3,
          value: '0',
          description: null,
        },
        {
          id: 'd5db2ca9-3add-4f0f-8344-6e6d83861bc3',
          version: 1,
          insertTime: '2024-03-08T12:54:56.005+0000',
          lastUpdated: '2024-03-08T12:54:56.005+0000',
          name: 'delivery_address_restriction',
          domain: 'merchant',
          category: 'order',
          contentMediaType: 3,
          value: '0',
          description: null,
        },
      ],
      map: {
        'merchant.payment.supported_types': {
          id: '5e91c597-bdbe-418a-8e79-4228224abe89',
          version: 3,
          insertTime: '2024-03-08T12:54:56.053+0000',
          lastUpdated: '2024-03-08T13:01:26.551+0000',
          name: 'supported_types',
          domain: 'merchant',
          category: 'payment',
          contentMediaType: 1,
          value:
            '[{"payment_system_type":1,"tender_types":["800","801","802","3","5","4","6","2","1"]},{"payment_system_type":4,"tender_types":[]}]',
          description: null,
        },
        'merchant.ordering.pos_employee': {
          id: '92b61bac-dabd-4ddb-847b-b509d14357af',
          version: 1,
          insertTime: '2024-03-08T12:54:56.195+0000',
          lastUpdated: '2024-03-08T12:54:56.195+0000',
          name: 'pos_employee',
          domain: 'merchant',
          category: 'ordering',
          contentMediaType: 1,
          value: '',
          description: null,
        },
        'merchant.order.pickup_locations_enabled': {
          id: 'b0f069c4-2177-4415-9681-5fd838abf556',
          version: 1,
          insertTime: '2024-03-08T12:54:55.839+0000',
          lastUpdated: '2024-03-08T12:54:55.839+0000',
          name: 'pickup_locations_enabled',
          domain: 'merchant',
          category: 'order',
          contentMediaType: 5,
          value: null,
          description: null,
        },
        'merchant.menu.default': {
          id: '81f898aa-1f83-4188-8998-91054704eb31',
          version: 2,
          insertTime: '2024-03-08T12:54:55.958+0000',
          lastUpdated: '2024-03-08T13:00:07.625+0000',
          name: 'default',
          domain: 'merchant',
          category: 'menu',
          contentMediaType: 1,
          value: '1105426e-b451-4f86-a6a9-f8b2dfb31ad7',
          description: null,
        },
        'merchant.ordering.pos_default_discount_id': {
          id: '7a53fae4-b0b7-41f7-ab72-77b59d856bac',
          version: 1,
          insertTime: '2024-03-08T12:54:56.163+0000',
          lastUpdated: '2024-03-08T12:54:56.163+0000',
          name: 'pos_default_discount_id',
          domain: 'merchant',
          category: 'ordering',
          contentMediaType: 1,
          value: '',
          description: null,
        },
        'merchant.ordering.pos_tender_to_order_type_map': {
          id: '9f95803e-a26c-4d07-8a4c-b8ad57f57bbf',
          version: 1,
          insertTime: '2024-03-08T12:54:56.147+0000',
          lastUpdated: '2024-03-08T12:54:56.147+0000',
          name: 'pos_tender_to_order_type_map',
          domain: 'merchant',
          category: 'ordering',
          contentMediaType: 5,
          value: '{}',
          description: null,
        },
        'merchant.order.disable_item_notes': {
          id: '1c58ec46-c224-4db7-adeb-b46ba92a1d99',
          version: 2,
          insertTime: '2024-03-08T12:54:55.870+0000',
          lastUpdated: '2024-03-08T12:56:08.931+0000',
          name: 'disable_item_notes',
          domain: 'merchant',
          category: 'order',
          contentMediaType: 5,
          value: 'true',
          description: null,
        },
        'merchant.order.delivery_address_restriction': {
          id: 'd5db2ca9-3add-4f0f-8344-6e6d83861bc3',
          version: 1,
          insertTime: '2024-03-08T12:54:56.005+0000',
          lastUpdated: '2024-03-08T12:54:56.005+0000',
          name: 'delivery_address_restriction',
          domain: 'merchant',
          category: 'order',
          contentMediaType: 3,
          value: '0',
          description: null,
        },
        'merchant.menu.menu_barcode_enabled': {
          id: '2d698410-16e7-475f-bec9-ca1c86d5a9b4',
          version: 1,
          insertTime: '2024-03-08T12:54:55.890+0000',
          lastUpdated: '2024-03-08T12:54:55.890+0000',
          name: 'menu_barcode_enabled',
          domain: 'merchant',
          category: 'menu',
          contentMediaType: 5,
          value: null,
          description: null,
        },
        'merchant.ordering.pos_order_type_map': {
          id: '6ee02f71-bfa6-457b-8440-0b0186cbf440',
          version: 1,
          insertTime: '2024-03-08T12:54:56.099+0000',
          lastUpdated: '2024-03-08T12:54:56.099+0000',
          name: 'pos_order_type_map',
          domain: 'merchant',
          category: 'ordering',
          contentMediaType: 5,
          value: '{}',
          description: null,
        },
        'merchant.order.order_ahead_enabled': {
          id: '88591d09-c287-4f96-8a7e-f69c32cb9f85',
          version: 1,
          insertTime: '2024-03-08T12:54:56.021+0000',
          lastUpdated: '2024-03-08T12:54:56.021+0000',
          name: 'order_ahead_enabled',
          domain: 'merchant',
          category: 'order',
          contentMediaType: 3,
          value: '0',
          description: null,
        },
        'merchant.order.gift_ordering_enabled': {
          id: '4f84f241-c264-4694-bf77-d70b3c70837f',
          version: 1,
          insertTime: '2024-03-08T12:54:55.855+0000',
          lastUpdated: '2024-03-08T12:54:55.855+0000',
          name: 'gift_ordering_enabled',
          domain: 'merchant',
          category: 'order',
          contentMediaType: 5,
          value: null,
          description: null,
        },
        'merchant.ordering.enabled': {
          id: '1099dba5-1e6e-4442-a1d3-5b2de62f9f37',
          version: 2,
          insertTime: '2024-03-08T12:54:55.824+0000',
          lastUpdated: '2024-03-08T12:56:08.890+0000',
          name: 'enabled',
          domain: 'merchant',
          category: 'ordering',
          contentMediaType: 3,
          value: '1',
          description: null,
        },
        'merchant.ordering.pos_tender_map_by_type': {
          id: 'c5658456-7e20-4813-9d3e-a9996a116428',
          version: 1,
          insertTime: '2024-03-08T12:54:56.131+0000',
          lastUpdated: '2024-03-08T12:54:56.131+0000',
          name: 'pos_tender_map_by_type',
          domain: 'merchant',
          category: 'ordering',
          contentMediaType: 5,
          value: '{}',
          description: null,
        },
        'merchant.tax.tax_delivery_fee': {
          id: '187e9043-deea-4ad0-905e-5da93c0b5dbb',
          version: 1,
          insertTime: '2024-03-08T12:54:55.974+0000',
          lastUpdated: '2024-03-08T12:54:55.974+0000',
          name: 'tax_delivery_fee',
          domain: 'merchant',
          category: 'tax',
          contentMediaType: 3,
          value: '0',
          description: null,
        },
        'merchant.ordering.capacity': {
          id: '6b94b39f-9af8-429d-9308-d497a05e79e7',
          version: 4,
          insertTime: '2024-03-08T12:54:55.742+0000',
          lastUpdated: '2024-03-18T20:54:32.792+0000',
          name: 'capacity',
          domain: 'merchant',
          category: 'ordering',
          contentMediaType: 1,
          value: '{"enabled":true,"length":15,"capacity":13}',
          description: null,
        },
        'merchant.order.default_media_type_for_walkout': {
          id: '39b930e2-193e-4e91-a98b-fb193d6750b4',
          version: 1,
          insertTime: '2024-03-08T12:54:55.919+0000',
          lastUpdated: '2024-03-08T12:54:55.919+0000',
          name: 'default_media_type_for_walkout',
          domain: 'merchant',
          category: 'order',
          contentMediaType: 1,
          value: null,
          description: null,
        },
        'merchant.payment.meal_equivalency_enabled': {
          id: 'c5899040-d921-4efa-87c9-c0c48cd5728f',
          version: 1,
          insertTime: '2024-03-08T12:54:56.054+0000',
          lastUpdated: '2024-03-08T12:54:56.054+0000',
          name: 'meal_equivalency_enabled',
          domain: 'merchant',
          category: 'payment',
          contentMediaType: 3,
          value: '0',
          description: null,
        },
        'merchant.ordering.pos_delivery_fee_service_charge_id': {
          id: '43fa2dbd-2086-4601-9ae5-f2505e6c1158',
          version: 1,
          insertTime: '2024-03-08T12:54:56.179+0000',
          lastUpdated: '2024-03-08T12:54:56.179+0000',
          name: 'pos_delivery_fee_service_charge_id',
          domain: 'merchant',
          category: 'ordering',
          contentMediaType: 1,
          value: '',
          description: null,
        },
        'merchant.ordering.pos_tender_map': {
          id: '4a92a40d-a6e7-405d-a600-b93716b4021b',
          version: 1,
          insertTime: '2024-03-08T12:54:56.115+0000',
          lastUpdated: '2024-03-08T12:54:56.115+0000',
          name: 'pos_tender_map',
          domain: 'merchant',
          category: 'ordering',
          contentMediaType: 5,
          value: '{}',
          description: null,
        },
        'merchant.order.min_balance_for_walkout': {
          id: '00ffc8a0-aa2f-4e4d-9d38-b48ea82a3b35',
          version: 1,
          insertTime: '2024-03-08T12:54:55.937+0000',
          lastUpdated: '2024-03-08T12:54:55.937+0000',
          name: 'min_balance_for_walkout',
          domain: 'merchant',
          category: 'order',
          contentMediaType: 5,
          value: '0',
          description: null,
        },
        'merchant.payment.use_search_path': {
          id: '73a80721-c93b-4145-a2fc-fbd73b3fc90e',
          version: 1,
          insertTime: '2024-03-08T13:00:07.716+0000',
          lastUpdated: '2024-03-08T13:00:07.716+0000',
          name: 'use_search_path',
          domain: 'merchant',
          category: 'payment',
          contentMediaType: 3,
          value: '0',
          description: null,
        },
        'merchant.reports.transaction_history_report': {
          id: '2f128adc-e51a-4f9e-a041-1ef4a6bfc1f1',
          version: 1,
          insertTime: '2024-03-08T12:54:56.037+0000',
          lastUpdated: '2024-03-08T12:54:56.037+0000',
          name: 'transaction_history_report',
          domain: 'merchant',
          category: 'reports',
          contentMediaType: 3,
          value: '0',
          description: null,
        },
        'merchant.tip.enable_tip': {
          id: '9848f9e3-3aea-4a82-b7db-32a1a853484e',
          version: 1,
          insertTime: '2024-03-08T12:54:55.988+0000',
          lastUpdated: '2024-03-08T12:54:55.988+0000',
          name: 'enable_tip',
          domain: 'merchant',
          category: 'tip',
          contentMediaType: 3,
          value: '1',
          description: null,
        },
        'merchant.menu.menu_add_items_enabled': {
          id: '3c2a453a-2b0e-4494-a81e-a1f9f8469fc4',
          version: 1,
          insertTime: '2024-03-08T12:54:55.904+0000',
          lastUpdated: '2024-03-08T12:54:55.904+0000',
          name: 'menu_add_items_enabled',
          domain: 'merchant',
          category: 'menu',
          contentMediaType: 5,
          value: null,
          description: null,
        },
      },
    },
    faxNotificationActive: null,
    faxNotificationRequired: null,
    emailNotificationActive: true,
    onCampus: true,
    timeZone: 'America/New_York',
    checkInRadius: null,
    orderCheckIn: null,
    autoCancelTime: 30,
    earliestCheckinTime: 30,
    paymentSystemId: '2d9cf5d9-868e-4070-9ad5-abcb7ce60661',
    walkout: null,
    tags: [],
  },
];
const orders = [
  {
    id: '6b43107e-065d-459e-b75e-25348bcb4ab9',
    version: 4,
    insertTime: '2024-03-04T20:51:32.533+0000',
    lastUpdated: '2024-03-04T20:52:00.213+0000',
    checkNumber: 4714,
    posCheckNumber: null,
    posOrderId: null,
    submittedTime: '2024-03-04T20:51:32.533+0000',
    displaySubmittedTime: null,
    dueTime: '2024-03-04T20:52:32.534+0000',
    displayDueTime: null,
    userId: '35133e47-fe84-4980-ad40-6bd86b432a7d',
    userPhone: '1252226666',
    transactionId: 'e10c2993-6708-487d-a112-27e8ea0b9253',
    authCode: null,
    authCodeForReverse: null,
    notificationId: null,
    deliveryFee: 0,
    pickupFee: 0,
    tip: 0,
    useFee: 0,
    subTotal: 30,
    tax: 3,
    total: 33,
    discount: 0,
    discountSource: null,
    merchantId: '2cf2524a-0641-482c-8b66-bdfdcdd353a8',
    institutionId: '7612d8de-51e1-4cab-971d-88a317326437',
    type: 0,
    deliveryAddressId: null,
    status: 1,
    statusDetail: null,
    notes: 'Test',
    userName: '403 ** Test403',
    patronEmail: null,
    mealBased: false,
    pickupAddressId: '64f19b2b-7e23-4d1b-80ef-2969183fb2aa',
    gift: null,
    giftMessage: null,
    recipientEmailAddress: null,
    recipientName: null,
    clientOrderID: '0c7350c9-a410-48ac-9eaf-8ccab9af936d',
    checkinStatus: 1,
    markedPaid: false,
    amountDue: 0,
    orderItems: [
      {
        id: 'b95faf8b-026e-4fff-91ff-a0c96587aabd',
        version: 1,
        insertTime: '2024-03-04T20:51:32.533+0000',
        lastUpdated: '2024-03-04T20:51:32.533+0000',
        orderId: '6b43107e-065d-459e-b75e-25348bcb4ab9',
        menuItemId: '76eeed19-e69b-4213-ac21-acf619fb24f7',
        parentOrderItemId: null,
        quantity: 5,
        displayRank: null,
        salePrice: 6,
        specialInstructions: null,
        keyedName: null,
        status: null,
        name: 'Lunch2',
        reportingCategory: 'LunchAllDay',
        orderItemOptions: [
          {
            id: '4a3442be-26e4-4149-9ad6-5b082e87aaa5',
            version: 1,
            insertTime: '2024-03-20T19:07:33.893+0000',
            lastUpdated: '2024-03-20T19:07:33.893+0000',
            orderId: null,
            menuItemId: 'f4e9e675-5070-474f-9abd-ed19c9d3e582',
            parentOrderItemId: 'e25bcc5b-fff6-4225-9b60-fadc07dd664b',
            quantity: 1,
            displayRank: 1,
            salePrice: 0,
            specialInstructions: null,
            keyedName: null,
            status: null,
            name: '2% Milk',
            reportingCategory: 'Caramel Macchiato | Milk Options-pick up to 2',
            orderItemOptions: [],
          },
        ],
      },
      {
        id: 'b95faf8b-026e-4fff-91ff-185359dfaefc',
        version: 1,
        insertTime: '2024-03-04T20:51:32.533+0000',
        lastUpdated: '2024-03-04T20:51:32.533+0000',
        orderId: '6b43107e-065d-459e-b75e-25348bcb4ab9',
        menuItemId: '76eeed19-e69b-4213-ac21-acf619fb24f7',
        parentOrderItemId: null,
        quantity: 5,
        displayRank: null,
        salePrice: 6,
        specialInstructions: null,
        keyedName: null,
        status: null,
        name: 'Lunch2',
        reportingCategory: 'LunchAllDay',
        orderItemOptions: [],
      },
    ],
    orderPayment: [
      {
        id: 'dd564055-4cf2-4800-84e4-185359dfaefc',
        version: 2,
        insertTime: '2024-03-04T20:51:32.534+0000',
        lastUpdated: '2024-03-04T20:51:33.908+0000',
        orderId: '6b43107e-065d-459e-b75e-25348bcb4ab9',
        accountId: 'E:4:35133e47-fe84-4980-ad40-6bd86b432a7d:qekVtk7J5B9HXeRZQBnBXr',
        accountName: 'Credit Card',
        transactionId: 'e10c2993-6708-487d-a112-27e8ea0b9253',
        sequence: 1,
        amount: 33,
        cvv: null,
        paymentSystemType: 4,
        authCode: null,
        authCodeForReverse: null,
        displayLastUpdated: null,
      },
    ],
    orderNotifications: [],
    merchantName: "Chef's Choice",
    isWalkoutOrder: null,
  },
  {
    id: 'df446d5c-8759-4365-87c2-54feb6579450',
    version: 3,
    insertTime: '2024-02-21T21:55:45.796+0000',
    lastUpdated: '2024-02-21T22:01:18.020+0000',
    checkNumber: 4703,
    posCheckNumber: null,
    posOrderId: null,
    submittedTime: '2024-02-21T21:55:45.796+0000',
    displaySubmittedTime: null,
    dueTime: '2024-02-21T21:07:36.000+0000',
    displayDueTime: null,
    userId: '35133e47-fe84-4980-ad40-6bd86b432a7d',
    userPhone: null,
    transactionId: '409cd3ed-1411-4913-a19e-a7d0616e5f24',
    authCode: null,
    authCodeForReverse: null,
    notificationId: null,
    deliveryFee: 0,
    pickupFee: 0,
    tip: 0,
    useFee: 0,
    subTotal: 4.96,
    tax: 0,
    total: 4.96,
    discount: 0,
    discountSource: null,
    merchantId: '3be06751-f5ab-405c-b27d-d08b0f9c7f07',
    institutionId: '7612d8de-51e1-4cab-971d-88a317326437',
    type: 3,
    deliveryAddressId: null,
    status: 9,
    statusDetail: null,
    notes: null,
    userName: '403 ** Test403',
    patronEmail: null,
    mealBased: null,
    pickupAddressId: null,
    gift: null,
    giftMessage: null,
    recipientEmailAddress: null,
    recipientName: null,
    clientOrderID: '2024-02-21T21:55:46.093Z',
    checkinStatus: 1,
    markedPaid: false,
    amountDue: 0,
    orderItems: [
      {
        id: 'a52b88e5-9ed7-4c3f-845c-06ede35c275a',
        version: 1,
        insertTime: '2024-02-21T21:55:45.813+0000',
        lastUpdated: '2024-02-21T21:55:45.813+0000',
        orderId: 'df446d5c-8759-4365-87c2-54feb6579450',
        menuItemId: '18dddf07-1445-40e5-b71a-3c8f62073af4',
        parentOrderItemId: null,
        quantity: 1,
        displayRank: null,
        salePrice: 0.5,
        specialInstructions: null,
        keyedName: null,
        status: null,
        name: 'Craisins',
        reportingCategory: null,
        orderItemOptions: [],
      },
      {
        id: 'cebf61e7-c948-4af0-af5f-2d1a5f011cbd',
        version: 1,
        insertTime: '2024-02-21T21:55:45.802+0000',
        lastUpdated: '2024-02-21T21:55:45.802+0000',
        orderId: 'df446d5c-8759-4365-87c2-54feb6579450',
        menuItemId: 'c1fcbbac-2d76-4e7e-aca4-32357d15e52a',
        parentOrderItemId: null,
        quantity: 1,
        displayRank: null,
        salePrice: 2.99,
        specialInstructions: null,
        keyedName: null,
        status: null,
        name: "Lenny&Larry's",
        reportingCategory: null,
        orderItemOptions: [],
      },
      {
        id: 'fd44d8b5-3f17-40f2-bc18-3d60f6ee16e2',
        version: 1,
        insertTime: '2024-02-21T21:55:45.813+0000',
        lastUpdated: '2024-02-21T21:55:45.813+0000',
        orderId: 'df446d5c-8759-4365-87c2-54feb6579450',
        menuItemId: '4f01357d-a72c-4062-a45b-1858b67498d0',
        parentOrderItemId: null,
        quantity: 1,
        displayRank: null,
        salePrice: 1.47,
        specialInstructions: null,
        keyedName: null,
        status: null,
        name: "GMa's Mini Bites",
        reportingCategory: null,
        orderItemOptions: [],
      },
    ],
    orderPayment: [
      {
        id: '6e9f5d23-494c-42b2-9d4b-36968b1741e5',
        version: 2,
        insertTime: '2024-02-21T21:55:45.821+0000',
        lastUpdated: '2024-02-21T21:55:48.408+0000',
        orderId: 'df446d5c-8759-4365-87c2-54feb6579450',
        accountId: 'T:1:35133e47-fe84-4980-ad40-6bd86b432a7d:802',
        accountName: 'Bonus Bucks',
        transactionId: '409cd3ed-1411-4913-a19e-a7d0616e5f24',
        sequence: 1,
        amount: 4.96,
        cvv: null,
        paymentSystemType: 1,
        authCode: null,
        authCodeForReverse: null,
        displayLastUpdated: null,
      },
    ],
    orderNotifications: [],
    merchantName: 'A-JWO - Rollover UnTaxable Tenders OP',
    isWalkoutOrder: true,
  },
];
describe(RecentOrderComponent, () => {
  let component: RecentOrderComponent;
  let fixture: ComponentFixture<RecentOrderComponent>;

  let activatedRoute,
    merchantService,
    router,
    popoverController,
    modalController,
    cart,
    loadingService,
    toastService,
    userFacadeService,
    orderingService,
    checkinService,
    alertController,
    institutionService,
    checkinProcess,
    orderActionSheetService,
    lockDownService;

  beforeEach(async () => {
    activatedRoute = {
      snapshot: {
        params: {
          id: '6b43107e-065d-459e-b75e-25348bcb4ab9',
        },
      },
    };
    merchantService = {
      getMerchant: jest.fn().mockReturnValue(of({ id: '2cf2524a-0641-482c-8b66-bdfdcdd353a8' })),
      recentOrders$: of(orders),
      menuMerchants$: of(menuMerchants),
      retrievePickupLocations: jest.fn().mockReturnValue(of([])),
      retrieveUserAddressList: jest.fn(),
      cancelOrderById: jest.fn(),
      extractAllAvailableMenuItemsFromMenu: jest.fn().mockReturnValue([]),
      extractAllAvailableMenuItemOptionsFromMenuItem: jest.fn().mockReturnValue([]),
    };
    router = {
      navigate: jest.fn(),
    };
    popoverController = {
      create: jest.fn(() => ({
        onDidDismiss: jest.fn().mockResolvedValue({
          role: BUTTON_TYPE.REMOVE,
        }),
        present: jest.fn(),
      })),
    };
    modalController = {
      createAlert: jest.fn(() => ({
        onDidDismiss: jest.fn().mockResolvedValue({
          role: BUTTON_TYPE.REMOVE,
        }),
        present: jest.fn(),
      })),
      createActionSheet: jest.fn(() => ({
        onDidDismiss: jest.fn().mockResolvedValue({
          role: BUTTON_TYPE.CONTINUE,
          data: { dueTime: Date.now(), orderType: ORDER_TYPE.PICKUP, address: {} as any, isASAP: false },
        }),
        present: jest.fn(),
      })),
    };
    cart = {
      menuInfo$: of({}),
      getCart: jest.fn(),
      onAddItems: jest.fn().mockResolvedValue(true),
      clearCart: jest.fn(),
      setActiveMerchant: jest.fn(),
      setActiveMerchantsMenuByOrderOptions: jest.fn(),
      addOrderItems: jest.fn(),
      updateOrderNote: jest.fn(),
      validateReOrderItems: jest.fn().mockReturnValue(of({ orderRemovedItems: [{}, {}], order: { orderItems: [] } })),
      merchant$: of({}),
      menuItems$: of(0),
      showActiveCartWarning: jest.fn(),
      orderSchedule$: of({}),
      saveOrderSnapshot: jest.fn(),
      orderDetailsOptions$: of({
        orderType: ORDER_TYPE.PICKUP,
        address: {} as AddressInfo,
        dueTime: new Date(),
        isASAP: true,
      } as unknown as OrderDetailOptions),
    };
    loadingService = {
      showLoading: jest.fn(),
      showSpinner: jest.fn(),
      closeSpinner: jest.fn(),
    };
    toastService = {
      showToast: jest.fn(),
      showError: jest.fn(),
    };
    userFacadeService = {
      getUser: jest.fn(),
      getUserData$: jest.fn().mockReturnValue(of({})),
    };
    orderingService = {
      getOrder: jest.fn(),
      getContentStringByName: jest.fn().mockReturnValue(of('')),
    };
    checkinService = {
      getCheckinInstruction: jest.fn(),
      navedFromCheckin: false,
      getContentStringByName$: jest.fn().mockReturnValue(of('Check-in instructions')),
    };
    alertController = {
      create: jest.fn(() => ({
        onDidDismiss: jest.fn(),
        present: jest.fn(),
      })),
    };
    institutionService = {
      getInstitution: jest.fn(),
      cachedInstitutionInfo$: of({ timeZone: 'AST' } as InstitutionInfo),
    };
    checkinProcess = {
      startCheckin: jest.fn(),
      start: jest.fn(),
    };
    lockDownService = {
      isLockDownOn: jest.fn().mockReturnValue(true),
      loadStringsAndSettings: jest.fn(),
    };

    orderActionSheetService = { openActionSheet$: of({}) };
    await TestBed.configureTestingModule({
      declarations: [RecentOrderComponent],
      imports: [IonicModule, TranslateModule.forRoot(), StHeaderModule, HttpClientTestingModule, OrderDetailsModule],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: MerchantService, useValue: merchantService },
        { provide: Router, useValue: router },
        { provide: PopoverController, useValue: popoverController },
        { provide: ModalsService, useValue: modalController },
        { provide: CartService, useValue: cart },
        { provide: LoadingService, useValue: loadingService },
        { provide: ToastService, useValue: toastService },
        { provide: UserFacadeService, useValue: userFacadeService },
        { provide: OrderingService, useValue: orderingService },
        { provide: CheckingServiceFacade, useValue: checkinService },
        { provide: AlertController, useValue: alertController },
        { provide: InstitutionFacadeService, useValue: institutionService },
        { provide: CheckingProcess, useValue: checkinProcess },
        { provide: LockDownService, useValue: lockDownService },
        { provide: OrderActionSheetService, useValue: orderActionSheetService },
        { provide: Storage, useClass: MockStorageService },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(RecentOrderComponent);
    component = fixture.componentInstance;
    fixture.whenStable().then(() => {
      fixture.detectChanges();
    });

    merchantService.recentOrders$ = of(orders);
  });

  it('should create a recent order component', () => {
    expect(component).toBeTruthy();
  });

  it('should  check the order pending status', () => {
    expect(component.orderStatus.PENDING).toEqual(1);
  });

  it('should not have added any item to the cart if lockDown flag is on', () => {
    const spy = jest.spyOn(lockDownService, 'isLockDownOn');
    component.onAddItems();
    expect(spy).toHaveBeenCalled();
  });

  it('should initialize the cart data after check-in navigation', () => {
    const spy = jest.spyOn(component, 'initData');
    checkinService.navedFromCheckin = jest.fn().mockReturnValue(true);
    component.ionViewWillEnter();
    expect(spy).toHaveBeenCalled();
  });

  it('should reorder the order', async () => {
    const spy = jest.spyOn(component as any, 'initOrderOptionsModal');
    lockDownService.isLockDownOn = jest.fn().mockReturnValue(false);
    await component.onReorderHandler();
    expect(spy).toHaveBeenCalled();
  });

  it('should not reorder a Just Walkout order', async () => {
    const spy = jest.spyOn(component as any, 'initOrderOptionsModal');
    const spyToast = jest.spyOn(toastService as any, 'showError');
    lockDownService.isLockDownOn = jest.fn().mockReturnValue(false);
    menuMerchants[0].walkout = true;
    await component.onReorderHandler();
    expect(spy).not.toHaveBeenCalled();
    expect(spyToast).toHaveBeenCalled();
  });

  it('should not open start the check-in process', async () => {
    const spy = jest.spyOn(component, 'openChecking');
    await component.onClosed();
    expect(checkinService.navedFromCheckin).toBeFalsy();
    expect(spy).not.toBeCalled();
  });

  it('should open start the check-in process', async () => {
    const spy = jest.spyOn(component, 'openChecking');
    checkinService.navedFromCheckin = true;
    await component.onClosed();
    expect(checkinService.navedFromCheckin).toBeFalsy();
    expect(spy).toBeCalled();
  });

  it('should not active the order if not orderId matches', async () => {
    component['setActiveOrder']('');
    const result = await lastValueFrom(component.order$);
    expect(result).toBeUndefined();
  });

  it('should set an instruction message if is not check-in order', async () => {
    const mockOrder = orders;
    mockOrder[0].checkinStatus = 2;
    merchantService.recentOrders$ = of(mockOrder);
    component['setActiveOrder']('6b43107e-065d-459e-b75e-25348bcb4ab9');
    const result = await lastValueFrom(component.order$);
    const message = await lastValueFrom(component.checkinInstructionMessage);
    expect(result).toBeDefined();
    expect(message).toEqual('Check-in instructions');
  });

  it('should set an instruction message if is not check-in order', async () => {
    const mockOrder = orders;
    mockOrder[0].checkinStatus = 1;
    merchantService.recentOrders$ = of(mockOrder);
    component['setActiveOrder']('6b43107e-065d-459e-b75e-25348bcb4ab9');
    const result = await lastValueFrom(component.order$);
    const message = await lastValueFrom(component.checkinInstructionMessage);
    expect(result).toBeDefined();
    expect(message).toBeNull();
  });

  it('should show modal on reorder', async () => {
    const spy = jest.spyOn(modalController, 'createAlert');
    await component['reorderOrder'](orders[0] as any);
    expect(spy).toHaveBeenCalled();
  });

  it('should get the pickup address', async () => {
    const result = await lastValueFrom(component['getPickupAddress']());
    expect(result).toMatchObject({
      accessCode: null,
      address1: null,
      address2: null,
      building: null,
      city: null,
      company: null,
      country: null,
      crossStreet: null,
      department: null,
      floor: null,
      id: 'e2780564-52ee-4fdf-8da5-1f7800ce9c72',
      latitude: null,
      longitude: null,
      nickname: null,
      notes: null,
      objectRevision: 1,
      onCampus: null,
      phone: null,
      phoneExt: null,
      postalcode: null,
      room: null,
      state: null,
    });
  });

  it('resolveMenuItemsInOrder', async () => {
    const result = await lastValueFrom(component.resolveMenuItemsInOrder());
    expect(result).toEqual([[], true]);
  });

  it('should add to cart', async () => {
    const result = await lastValueFrom(component.checkAddToCart$);
    expect(result).toBeFalsy();
  });

  it('should redirect the cart', async () => {
    const spy = jest.spyOn(component as any, 'redirectToCart');
    component['navigateByValidatedOrder']({ order: orders[0], orderRemovedItems: [] } as any);
    expect(spy).toBeCalled();
  });

  it('should redirect the cart', async () => {
    const spy = jest.spyOn(component as any, 'redirectToCart');
    const routerSpy = jest.spyOn(router, 'navigate');
    component['navigateByValidatedOrder']({ order: { orderItems: [] } } as any);
    expect(spy).not.toBeCalled();
    expect(routerSpy).toBeCalled();
  });

  it('should cancel order', async () => {
    const spy = jest.spyOn(component as any, 'initCancelOrderModal');
    await component.showModal();
    expect(spy).toBeCalled();
  });

  it('should return be undefined if no orders match the orderId', async () => {
    orders[0].id = null;
    const result = await lastValueFrom(component.order$);
    expect(result).toBeUndefined();
  });

  it('should display confirm modal', async () => {
    const spy = jest.spyOn(popoverController, 'create');
    await component['initConfirmModal']({} as any);
    expect(spy).toBeCalled();
  });

  it('should display alert controller', async () => {
    const spy = jest.spyOn(alertController, 'create');
    await component['presentPopup']('test');
    expect(spy).toBeCalled();
  });

  it('should get initial items', async () => {
    const result = component['getOrderItemOptionsInitialObjects']([], {} as MenuItemInfo);
    expect(result).toEqual([]);
  });

  it('should get initial item', async () => {
    const result = component['getOrderItemInitialObject'](orders[0].orderItems[0] as any, {} as MenuItemInfo);
    expect(result.quantity).toEqual(5);
  });
});
