import {Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { MessagePageComponent } from './pages/message-page/message-page.component';
import { AddresBookComponent } from './pages/addres-book/addres-book.component';
import { MomentComponent } from './pages/moment/moment.component';
import { MyInfoComponent } from './pages/my-info/my-info.component';
export const appRoute: Routes = [
    {path: 'login' , component: LoginComponent },
    {path: '' , redirectTo: '/login', pathMatch: 'full' },
    {path: 'home' , component: HomeComponent ,
        children: [
            {path: 'message' , component: MessagePageComponent },
            {path: 'addressBook' , component: AddresBookComponent },
            {path: 'moment' , component: MomentComponent },
            {path: 'myInfo' , component: MyInfoComponent },
        ]
    },
    {path: 'signUp' , component: SignUpComponent},
    {path: '**' , component: LoginComponent },
];
