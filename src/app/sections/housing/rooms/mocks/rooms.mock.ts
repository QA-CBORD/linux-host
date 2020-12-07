import { RoomSelect } from '@sections/housing/rooms/rooms.model';
import { Observable } from 'rxjs';


export function generateRoomSelects(): Observable<RoomSelect[]> {
  const roomSelects = createRoomSelects();
  const observable = Observable.create((obs) => obs.next(roomSelects))
  return  observable;
}


function createRoomSelects(): RoomSelect[] {
  return [
    {
      "key": 1,
      "name": "Mocked RoomSelect 1",
      "accessTime": new Date('2025-12-17T03:24:00'),
      "accessEnd": new Date('2025-12-20T03:24:00')
    },
    {
      "key": 3,
      "name": "Mocked RoomSelect 2",
      "accessTime": new Date('2025-12-17T03:24:00'),
      "accessEnd": new Date('2025-12-20T03:24:00')
    },
    {
      "key": 7,
      "name": "Mocked RoomSelect 4",
      "accessTime": new Date('2025-12-17T03:24:00'),
      "accessEnd": new Date('2025-12-20T03:24:00')
    }
  ]
}
