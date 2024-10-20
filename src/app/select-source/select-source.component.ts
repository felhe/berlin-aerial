import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { Source, TILE_SOURCES } from '../sources';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ListboxModule } from 'primeng/listbox';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { StyleClassModule } from 'primeng/styleclass';

@Component({
  selector: 'app-select-source',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    ListboxModule,
    FormsModule,
    RouterLink,
    StyleClassModule,
  ],
  templateUrl: './select-source.component.html',
  styleUrl: './select-source.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectSourceComponent {
  source = model.required<Source>();
  dialogVisible: boolean = false;
  readonly sources = Object.values(TILE_SOURCES);
}
