
import { Observable, Subscription } from "rxjs";
import { first } from "rxjs/operators";

export async function firstValueFrom(source$: Observable<any>): Promise<any> {
    let subscription: Subscription;
    try {
        return await new Promise<any>((resolve, reject) => {
            subscription = source$.pipe(first()).subscribe(resolve, reject);
        });
    } finally {
        subscription.unsubscribe();
    }
}