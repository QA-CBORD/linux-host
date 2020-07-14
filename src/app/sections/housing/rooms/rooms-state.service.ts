import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RoomSelect } from './rooms.model';

export interface Entity <K,V> {
    key: K,
    value: V
}
export interface StateService<K,V> {
    entities: Array<Entity<K,V>>
}
@Injectable({
    providedIn: 'root',
})
export class RoomsStateService implements StateService<number, RoomSelect>{
    entities: Entity<number, RoomSelect>[];
    private roomSelects: Observable<RoomSelect[]>;
    setRoomSelects(value: Observable<RoomSelect[]>){
        this.roomSelects = value;
    }

    getRoomSelects(){
        return this.roomSelects;
    }
}
