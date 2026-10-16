import { Routes } from '@angular/router';
import { SignUp } from './pages/sign-up/sign-up';
import { SignIn } from './pages/sign-in/sign-in';

export const routes: Routes = [
    {
        path: '**',
        redirectTo: ''
    },
    {
        path: '',
        component: SignUp,
        title: 'Estaciona Ai - Cadastro'
    },
    {
        path: 'login',
        component: SignIn,
        title: 'Estaciona Ai - login'
    }
];
