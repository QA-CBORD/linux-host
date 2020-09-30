import { isDefined } from '../utils';

export interface RoomSelectOptions{
    key: number;
    name: string;
}

export class RoomSelect implements RoomSelectOptions{
    key: number;
    name: string;

    constructor(options: RoomSelectOptions){
        if (options == null || typeof options !== 'object') {
            options = {} as RoomSelectOptions;
          }

        this.key = options.key;
        this.name = options.name;
    }
}