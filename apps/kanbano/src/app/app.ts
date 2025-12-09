import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Home } from './shared/ui/header';
import { Hero } from './features/hero';

@Component({
    imports: [RouterModule, Home, Hero],
    selector: 'app-root',
    templateUrl: './app.html',
})
export class App {
    protected title = 'kanbano';
}
