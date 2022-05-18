
import { Observable, Subscription } from "rxjs";
import { first } from "rxjs/operators";

export async function firstValueFrom<T>(source$: Observable<T>): Promise<T> {
    let subscription: Subscription;
    try {
        return await new Promise<T>((resolve, reject) => {
            subscription = source$.pipe(first()).subscribe(resolve, reject);
        });
    } finally {
        subscription.unsubscribe();
    }
}