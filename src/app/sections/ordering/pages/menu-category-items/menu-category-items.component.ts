import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'st-menu-category-items',
  templateUrl: './menu-category-items.component.html',
  styleUrls: ['./menu-category-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuCategoryItemsComponent implements OnInit {
  
  menuCategoryItems = [
    {
       "id":"35491ed0-cc30-421a-be89-0a7bbe319535",
       "menuCategoryId":"30328545-66ea-4a55-843b-e044e0402274",
       "menuItem":{
          "id":"391ea18a-ad7f-4836-9098-cd36926e89bd",
          "merchantId":"f7d95244-e4ff-4269-8573-574b117b53d0",
          "name":"Summer Rolls",
          "description":"Fresh rice paper roll with fresh lettuce, bean sprouts, cucumber and vermicelli noodles with your choice of chicken, poached shrimp or tofu- with a house peanut sauce.",
          "price":5.00,
          "visible":true,
          "active":true,
          "deleted":false,
          "reportingCategory":"APPETIZERS",
          "menuItemOptions":[

          ]
       },
       "displayRank":0,
       "visible":true,
       "active":true
    },
    {
       "id":"cb381a47-c53a-45a1-ac03-82690c9bfff3",
       "menuCategoryId":"30328545-66ea-4a55-843b-e044e0402274",
       "menuItem":{
          "id":"e1f257c3-5faa-4997-9ef8-6e21725bc6ed",
          "merchantId":"f7d95244-e4ff-4269-8573-574b117b53d0",
          "name":"Imperial Meat Rolls",
          "description":"hand rolled pork, glass noodles, shallots, carrots, cabbge and jicama fried in rice paper, served with our house tamarind sauce (nước mắm).",
          "price":5.00,
          "visible":true,
          "active":true,
          "deleted":false,
          "reportingCategory":"APPETIZERS",
          "menuItemOptions":[

          ]
       },
       "displayRank":1,
       "visible":true,
       "active":true
    },
   {
      "id":"cb381a47-c53a-45a1-ac03-82690c9bfff3",
      "menuCategoryId":"30328545-66ea-4a55-843b-e044e0402274",
      "menuItem":{
         "id":"e1f257c3-5faa-4997-9ef8-6e21725bc6ed",
         "merchantId":"f7d95244-e4ff-4269-8573-574b117b53d0",
         "name":"Imperial Meat Rolls",
         "description":"hand rolled pork, glass noodles, shallots, carrots, cabbge and jicama fried in rice paper, served with our house tamarind sauce (nước mắm).",
         "price":5.00,
         "visible":true,
         "active":true,
         "deleted":false,
         "reportingCategory":"APPETIZERS",
         "menuItemOptions":[

         ]
      },
      "displayRank":1,
      "visible":true,
      "active":true
   },
    {
       "id":"1aa670c3-44e2-42db-a460-5deacb86c262",
       "menuCategoryId":"30328545-66ea-4a55-843b-e044e0402274",
       "menuItem":{
          "id":"62bc9f0e-4c65-4415-9ed7-bb4438969978",
          "merchantId":"f7d95244-e4ff-4269-8573-574b117b53d0",
          "name":"Chicken or Vegetable Rolls",
          "description":"hand rolled deep fried spring rolls prepared in house with seasoned fresh vegetables. Served with our signature sweet chili sauce.",
          "price":4.00,
          "visible":true,
          "active":true,
          "deleted":false,
          "reportingCategory":"APPETIZERS",
          "menuItemOptions":[

          ]
       },
       "displayRank":2,
       "visible":true,
       "active":true
    },
    {
       "id":"9a1ed073-c7d4-4171-8d64-5858dd3f68a3",
       "menuCategoryId":"30328545-66ea-4a55-843b-e044e0402274",
       "menuItem":{
          "id":"9e157e40-74af-4019-a978-a721cf1c2ccb",
          "merchantId":"f7d95244-e4ff-4269-8573-574b117b53d0",
          "name":"Crab Rangoon",
          "description":"one of a kind cream cheese, imitation crabmeat and scallion filled wrapped in a crispy skin.",
          "price":7.00,
          "visible":true,
          "active":true,
          "deleted":false,
          "reportingCategory":"APPETIZERS",
          "menuItemOptions":[

          ]
       },
       "displayRank":3,
       "visible":true,
       "active":true
    }
 ]
   
  searchState: boolean = false;
  filteredMenuCategoryItems = [];
  
  constructor() {
   
  }

  ngOnInit() {

  }

  onSearchClick() {
    this.searchState = !this.searchState;
  }

  onSearchItemFilter(e) {
    const value = e.target.value.trim().toLowerCase();
    return this.filteredMenuCategoryItems = this.menuCategoryItems.filter((item) => {
      return item.menuItem.name.toLowerCase().indexOf(value) > -1 ||
             item.menuItem.description.toLowerCase().indexOf(value) > -1;
      });
       
  }

  onCancel() {
    this.searchState = !this.searchState;
    this.filteredMenuCategoryItems = [];
  }

  triggerMenuItemClick(event) {
   console.log(event);
  }
    
}
