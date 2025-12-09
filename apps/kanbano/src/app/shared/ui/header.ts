import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Nav } from './nav';
import { LucideAngularModule, Moon, Sun } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { ThemeService } from '@kanbano-entreprise/components';

@Component({
    selector: 'app-header',
    templateUrl: './header.html',
    imports: [Nav, LucideAngularModule, Nav, RouterLink],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
    protected readonly theme = inject(ThemeService);
    protected readonly Moon = Moon;
    protected readonly Sun = Sun;
}
