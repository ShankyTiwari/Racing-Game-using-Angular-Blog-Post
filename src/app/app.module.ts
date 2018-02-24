import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AppService } from './services/app.service';
import { GameService } from './services/game.service';


@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule
	],
	providers: [AppService, GameService],
	bootstrap: [AppComponent]
})
export class AppModule { }
