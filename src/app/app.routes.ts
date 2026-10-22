import { Routes } from '@angular/router';
import { SignUp } from './pages/sign-up/sign-up';
import { login } from './pages/login/login';

export const routes: Routes = [
    {
        path: '',
        component: SignUp,
        title: 'Estaciona Ai - Cadastro'
    },
    {
        path: 'login',
        component: login,
        title: 'Estaciona Ai - login'
    },
    {
        path: '**',
        redirectTo: ''
    }
];
