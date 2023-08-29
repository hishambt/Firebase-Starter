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
    sendEmailVerification,
    deleteUser,
    UserCredential,
    ProviderId,
} from '@angular/fire/auth';
import { switchMap, of, from, take, Observable, tap, filter, map } from 'rxjs';
import { IUser } from '../../shared/models/IUser.model';
import { traceUntilFirst } from '@angular/fire/performance';
import { AppSettingsService } from 'src/app/shared/services/app-settings.service';
import { DocumentData, Firestore, collection, deleteDoc, doc, docData, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    auth = inject(Auth);
    appSettings = inject(AppSettingsService);
    db = inject(Firestore);
    route = inject(ActivatedRoute);

    get currentUserProfile$(): Observable<IUser | null> {
        return authState(this.auth).pipe(
            traceUntilFirst('auth'),
            take(1),
            switchMap((user: User | null): Observable<IUser | null> => {
                if (!user?.uid) {
                    console.log("signed out");
                    return of(null);
                }

                if(user.providerId == ProviderId.GOOGLE) {
                    // get data, if it doesn't exist, create user
                } else if(user.providerId == ProviderId.PASSWORD) {
                    if(user.emailVerified) {
                        // get data, if it doesn't exist, create user
                    }
                }

                const ref = doc(this.db, 'users', user?.uid);
                return docData(ref)
                    .pipe(
                    // take(1),
                    // switchMap((doc: DocumentData) => {
                    //     if (doc) {
                    //         console.log("account already created");
                    //         return of(doc);
                    //     }
                    //     const newUser = this.populateUser(user);
                    //     return this.addUser(newUser).pipe(
                    //         take(1),
                    //         switchMap(() => {
                    //             console.log("Account created");
                    //             return docData(ref);
                    //         })
                    //     );
                    // })
                ) as Observable<IUser>;
            })
        );
    }

    populateUser({ uid, displayName, email, phoneNumber, photoURL }: User) {
        const name = displayName?.split(' ');

        let firstName = displayName || '',
            lastName = '';

        if (name && name?.length > 1) {
            firstName = name[0];
            name.shift();
            lastName = name.join(' ');
        }

        const newUser: IUser = {
            uid,
            email: email || '',
            firstName,
            lastName,
            phone: phoneNumber || '',
            address: '',
            photoURL: photoURL || '',
        };

        return newUser;
    }

    registerNewAccount(email: string, password: string) {
        return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(take(1));
    }

    sendVerificationEmail(user: User) {
        return from(sendEmailVerification(user, {
            url: this.appSettings.getUrlOrigin() + this.route.snapshot.queryParams['returnUrl'] || '/home'
        }))
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
