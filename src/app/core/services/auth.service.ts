import { Injectable, inject } from '@angular/core';
import {
    Auth,
    GoogleAuthProvider,
    User,
    authState,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithPopup,
    signOut,
    createUserWithEmailAndPassword,
    deleteUser,
} from '@angular/fire/auth';
import { switchMap, of, from, take, Observable } from 'rxjs';
import { IUser } from '../../shared/models/IUser.model';
import { traceUntilFirst } from '@angular/fire/performance';
import { AppSettingsService } from 'src/app/shared/services/app-settings.service';
import { Firestore, collection, deleteDoc, doc, docData, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    auth = inject(Auth);
    appSettings = inject(AppSettingsService);
    db = inject(Firestore);

    get currentUserProfile$(): Observable<IUser | null> {
        return authState(this.auth).pipe(
            traceUntilFirst('auth'),
            switchMap((user: User | null): Observable<IUser | null> => {
                if (!user?.uid) {
                    return of(null);
                }

                const ref = doc(this.db, 'users', user?.uid);
                return docData(ref) as Observable<IUser>;
            })
        );
    }

    registerNewAccount(email: string, password: string) {
        return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(take(1));
    }

    loginWithGoogle() {
        return from(signInWithPopup(this.auth, new GoogleAuthProvider())).pipe(take(1));
    }

    loginWithEmailAndPassword(email: string, password: string) {
        return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(take(1));
    }

    forgetPassword(email: string) {
        return from(
            sendPasswordResetEmail(this.auth, email, {
                url: this.appSettings.getUrlOrigin() + '/auth/login?passwordChanged=true',
            })
        ).pipe(take(1));
    }

    logout() {
        return from(signOut(this.auth)).pipe(take(1));
    }

    addUser(user: IUser): Observable<void> {
        const ref = doc(this.db, 'users', user.uid);
        return from(setDoc(ref, user));
    }

    updateUser(user: IUser): Observable<void> {
        const ref = doc(this.db, 'users', user.uid);
        return from(updateDoc(ref, { ...user }));
    }

    deleteUser(uid: string) {
        // TODO: use deleteUser from angular/fire/auth to delete the user from Auth as well
        const ref = doc(this.db, 'users', uid);
        return from(deleteDoc(ref));
    }
}
