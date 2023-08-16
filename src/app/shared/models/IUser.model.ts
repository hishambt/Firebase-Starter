import { User } from '@angular/fire/auth';

export type INullableUser<T = any> = Partial<User & OptionalParams<T>> | null;

// export type INullableUser<T = any> = (User & Partial<OptionalParams<T>>) | null;
// if we use the commented approach, we will have to cast the new object again to this type since when part of it is optional, typescript will change the interface to whatever type | undefined

type OptionalParams<T = any> = {
  isLoggedIn: boolean;
  extendedProps: T;
}