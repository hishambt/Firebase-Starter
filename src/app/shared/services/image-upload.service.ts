import { inject, Injectable } from '@angular/core';
import { getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { from, Observable, switchMap, take } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ImageUploadService {
    storage = inject(Storage);

    uploadImage(image: File, path: string): Observable<string> {
        const storageRef = ref(this.storage, path);
        const uploadTask = from(uploadBytes(storageRef, image));
        return uploadTask.pipe(
            take(1),
            switchMap((result) => from(getDownloadURL(result.ref)))
        );
    }
}
