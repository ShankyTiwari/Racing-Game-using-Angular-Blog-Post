import { Component, Input, ElementRef, AfterViewInit, ViewChild, HostListener  } from '@angular/core';
import { AppService } from './services/app.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
	// a reference to the canvas element from our template
	@ViewChild('canvas') public canvas: ElementRef;
	// @HostListener('document:keypress', ['$event'])


	constructor(private appService: AppService) {}

	public ngAfterViewInit() {
		// get the context
		const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;

		// set the width and height
		this.appService.createPlayGround(canvasEl);
	}

	@HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
		this.appService.movePlayer(event, 'keydown');
	}

	@HostListener('document:keyup', ['$event']) onKeyupHandler(event: KeyboardEvent) {
		this.appService.movePlayer(event, 'keyup');
	}
}
