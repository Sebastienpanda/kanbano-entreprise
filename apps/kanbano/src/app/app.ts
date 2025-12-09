import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Home } from './shared/ui/header';

@Component({
    imports: [RouterModule, Home],
    selector: 'app-root',
    templateUrl: './app.html',
})
export class App {
    protected title = 'kanbano';
}
