import { Component, OnInit } from '@angular/core';
import { FilmsService } from '../films.service';
import { debounceTime, take } from 'rxjs/operators';

@Component({
	selector: 'app-content',
	templateUrl: './content.component.html',
	styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

	movies: Array<any>;
	loading: boolean;
	isFilter: boolean;
	emptyValue: boolean = false;

	constructor(private fimlService: FilmsService) { }

	ngOnInit(): void {
		this.loading  = false;
		this.isFilter = false;
	}

	listarFilme(inputValue: string) {
		this.loading = true;

		if ( inputValue.length > 0 ) {
			this.fimlService.listar(inputValue).pipe(
				take(1),
				debounceTime(1000)
				).subscribe((res: any) => {
				this.movies   = res.titles;
				this.isFilter = true;
				this.loading  = false;
				this.emptyValue = false;
			})
		} else {
			this.isFilter = false; 
			this.emptyValue = true;
			this.loading  = false;
		}
	}
}
