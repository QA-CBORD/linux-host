import { PopupButton } from "@core/model/button";

export interface StPopoverComponentDataModel {
  title: string;
  message: string;
  showClose: boolean;
  buttons: PopupButton[];
}
