import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Home } from './shared/ui/header';
import { Hero } from './features/hero';
import { Demo } from './features/demo/demo';
import { Features } from './features/features';
import { NgxSonnerToaster } from 'ngx-sonner';
import { Cta } from './features/cta';
import { Footer } from './shared/ui/footer';

@Component({
    imports: [
        RouterModule,
        Home,
        Hero,
        Demo,
        Features,
        NgxSonnerToaster,
        Cta,
        Footer,
    ],
    selector: 'app-root',
    templateUrl: './app.html',
})
export class App {
    protected title = 'kanbano';
}
