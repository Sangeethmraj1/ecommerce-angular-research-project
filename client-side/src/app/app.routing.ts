import { Route } from "@angular/router";
import { LayoutComponent } from "./layout/layout.component";
import { NoAuthGuard } from "./core/auth/guards/noAuthGuard.guard";
import { AuthGuard } from "./core/auth/guards/authguard.guard";

export const Routes: Route[] = [
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('../app/modules/auth/sign-in/sign-in.module').then(m => m.SignInModule)
            },
            {
                path: 'sign-up',
                loadChildren: () =>
                    import('../app/modules/auth/sign-up/sign-up.module').then(m => m.SignUpModule)
            }
        ]
    },

    {
        path: '',
        component:LayoutComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'home',
                loadChildren: () =>
                    import('../app/modules/user/home/home.module').then(m => m.HomeModule)
            }
        ]
    },

    {
        path:'',
        component:LayoutComponent,
        canActivate:[AuthGuard],
        canActivateChild:[AuthGuard],
        children:[
            {
                path:'users',
                loadChildren:()=>
                import('../app/modules/admin/dashboard/dashboard.module').then(m=>m.DashboardModule)
            },
            {
                path:'category',
                loadChildren:()=>
                import('../app/modules/admin/category/category.module').then(m=>m.CategoryModule)
            },
            {
                path:'products',
                loadChildren:()=>
                import('../app/modules/admin/product/product.module').then(m=>m.ProductModule)
            }
        ]
    }
]

