import { Component, ElementRef, AfterViewInit, ViewChild, HostListener  } from '@angular/core';
import { AppService } from './services/app.service';
import { GameService } from './services/game.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {

	@ViewChild('canvas') public canvas: ElementRef;
	subscription: any;
	showLoader = true;

	constructor(
		private appService: AppService,
		private gameService: GameService
	) {}

	public ngAfterViewInit() {
		const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
		this.appService.createPlayGround(canvasEl);
		this.subscription = this.appService.getImageLoadEmitter()
			.subscribe((item) => {
				this.showLoader = false;
				this.gameService.startGameLoop();
			});
	}

	@HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
		this.appService.movePlayer(event, 'keydown');
	}

	@HostListener('document:keyup', ['$event']) onKeyupHandler(event: KeyboardEvent) {
		this.appService.movePlayer(event, 'keyup');
	}
}
