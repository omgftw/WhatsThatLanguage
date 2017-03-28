import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { CodeComponent } from './code/code.component';
import { GistService } from './services/gist.service';
import { SettingsComponent } from './settings/settings.component';
import { MaterialModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    GameRoutingModule,
    MaterialModule
  ],
  declarations: [
    GameComponent,
    SettingsComponent,
    CodeComponent
  ],
  providers: [
    GistService
  ]
})
export class GameModule { }
