import { GuestFacadeService } from "../services/guest.facade.service";

export interface GuestDashboardSection{
   title: string;
   imageUrl: string
   onclick(service: GuestFacadeService)
}