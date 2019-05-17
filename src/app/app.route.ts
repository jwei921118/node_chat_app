import {Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { MessagePageComponent } from './pages/message-page/message-page.component';
export const appRoute: Routes = [
    {path: 'login' , component: LoginComponent },
    {path: '' , redirectTo: '/login', pathMatch: 'full' },
    {path: 'home' , component: HomeComponent ,
        children: [
            {path: '' , redirectTo: '/message'},
            {path: 'message' , component: MessagePageComponent }
        ]
    },
    {path: 'signUp' , component: SignUpComponent},
    {path: '**' , component: LoginComponent },
];
