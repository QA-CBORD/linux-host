import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RoomSelect } from './rooms.model';


@Injectable({
    providedIn: 'root',
})
export class RoomsStateService{
    private roomSelects: Observable<RoomSelect[]>;
    setRoomSelects(value: Observable<RoomSelect[]>){
        this.roomSelects = value;
    }

    getRoomSelects(){
        return this.roomSelects;
    }
}