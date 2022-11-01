import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { de_DE, NZ_I18N } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import de from '@angular/common/locales/de';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KeymapComponent } from './components/keymap/keymap.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { RouterModule } from '@angular/router';
import { ZoomControlComponent } from './components/zoom-control/zoom-control.component';

registerLocaleData(de);

@NgModule({
  declarations: [AppComponent, KeymapComponent, ZoomControlComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzCardModule,
    NzTypographyModule,
    NzButtonModule,
    NzIconModule,
    NzDrawerModule,
    NzModalModule,
    NzSwitchModule,
    NzGridModule,
    RouterModule.forRoot([]),
  ],
  providers: [{ provide: NZ_I18N, useValue: de_DE }],
  bootstrap: [AppComponent],
})
export class AppModule {}
