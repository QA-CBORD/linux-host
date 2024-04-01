import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { StHeaderModule } from '@shared/ui-components';

@Component({
  standalone: true,
  imports: [IonicModule, StHeaderModule, TranslateModule],
  templateUrl: './cart-preview.component.html',
  styleUrl: './cart-preview.component.scss',
})
export class CartPreviewComponent {}
