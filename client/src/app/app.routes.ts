import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { CatalogComponent } from './features/catalog/catalog.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { ProductDetailsComponent } from './features/product-details/product-details.component';
import { ProductFormComponent } from './features/product-form/product-form.component';
import { MyProductsComponent } from './features/my-products/my-products.component';
import { FavoritesComponent } from './features/favorites/favorites.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },

    { path: 'home', component: HomeComponent },
    { path: 'catalog', component: CatalogComponent },
    { path: 'products/add', component: ProductFormComponent },
    { path: 'products/:id/edit', component: ProductFormComponent },
    { path: 'products/:id', component: ProductDetailsComponent },

    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    { path: 'my-products', component: MyProductsComponent },
    { path: 'favorites', component: FavoritesComponent },

    { path: '**', component: NotFoundComponent },
];
