import { Injectable, Input } from '@angular/core';
import { Obstacles } from './obstacles';

@Injectable()
export class AppService {

	private context: CanvasRenderingContext2D;

	// setting a width and height for the canvas
	@Input() public width = 500;
	@Input() public height = 700;

	start = 20;

	obstacles = [];
	obstaclesWidth = 50;
	obstaclesHeight = 50;
	frameNumber = 0;

	createPlayGround(canvasElement) {
		this.context = canvasElement.getContext('2d');
		canvasElement.width = this.width;
		canvasElement.height = this.height;
		this.context.fillRect(20, 20, 30, 30);
		this.startGame();
	}

	animationFrame(n) {
		if ((this.frameNumber / n) % 1 === 0) { return true; }
		return false;
	}

	startGame() {
		setInterval( () => {
			this.frameNumber += 1;
			this.start += 10;
			this.context.clearRect(0, 0, 500, 700);
			if (this.frameNumber === 1 || this.animationFrame(100)) {
				this.createObstacles();
			}
			this.obstacles.forEach((element, index) => {
				element.y += 3;
				element.update();
				if (element.constructor.y > this.height) {
					this.obstacles.splice(index, 1);
				}
			});
		}, 10);
	}

	createObstacles() {
		if (this.obstacles.length >  20) {
			this.obstacles.splice(0, 5);
		}
		const width = this.obstaclesWidth;
		const height = this.obstaclesHeight;
		const context = this.context;
		this.obstacles.push(new function () {
			this.x = Math.floor(Math.random() * 450) + 0,
			this.y = Math.floor(Math.random() * -15) + 0,
			this.width = width,
			this.height = height,
			this.update = () => {
				context.fillRect(this.x, this.y, 30, 30);
			};
		});
	}

}
