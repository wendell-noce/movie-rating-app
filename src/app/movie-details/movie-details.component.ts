import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { FilmsService } from '../films.service';
import { Movie } from '../models/movie.model';

@Component({
	selector: 'app-movie-details',
	templateUrl: './movie-details.component.html',
	styleUrls: ['./movie-details.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class MovieDetailsComponent implements OnInit {

	movieID: string;
	movie = new Movie();
	movieTitle: string;
	ratings: any;
	stars = [1, 2, 3, 4, 5];
	
	selectedRoteiro: any;
	selectedFotografia: any;
	selectedEfeitos: any;
	selectedElenco: any;

	constructor(private route: ActivatedRoute, private fimlService: FilmsService) {
		this.route.params.subscribe(res => {
			this.movieID = res.id;
		});
	}

	ngOnInit(): void {		
		this.getValues();
	}

	getValues(){
		this.fimlService.getMovie(this.movieID).pipe(take(1)).subscribe((res) => {
			this.movie = res;
			// this.movie.trailer = new Array<Trailer>();
			// this.movie.trailer.map(res.trailer);
			this.setValues();
		});
	}

	setValues(){
		this.selectedRoteiro    = this.getLocalStorageValues(this.movie.title, "Roteiro");
		this.selectedFotografia = this.getLocalStorageValues(this.movie.title, "Fotografia");
		this.selectedEfeitos    = this.getLocalStorageValues(this.movie.title, "Efeitos");
		this.selectedElenco     = this.getLocalStorageValues(this.movie.title, "Elenco");

		const ratings = [
			{
				name: "Roteiro",
				stars: this.stars
			},
			{
				name: "Fotografia",
				stars: this.stars
			},
			{
				name: "Efeitos especiais",
				stars: this.stars
			},
			{
				name: "Elenco",
				stars: this.stars
			}
		]

		this.ratings = ratings;	
	}

	setLocalStogareValues(movie: string,name: string, value: number) {
		const setValue = value;
		localStorage.setItem("film-"+movie.trim()+'-'+name, JSON.stringify(setValue));
		
	}

	getLocalStorageValues(movieTitle: string, field: string) {
		
		return localStorage.getItem("film-"+movieTitle.trim()+'-'+field) != "" ? localStorage.getItem("film-"+movieTitle.trim()+'-'+field) : 0;	
	}

	selectStars(star: number, className: string, movieTitle: string){
		
		switch( className ) {
			case "Roteiro":
				this.selectedRoteiro = star;
				this.setLocalStogareValues( movieTitle,"Roteiro", star);
			break;

			case "Fotografia":
				this.selectedFotografia = star;
				this.setLocalStogareValues( movieTitle,"Fotografia", star);
			break;

			case "Efeitos":
				this.selectedEfeitos = star;
				this.setLocalStogareValues( movieTitle,"Efeitos", star);
			break;

			case "Elenco":
				this.selectedElenco = star;
				this.setLocalStogareValues( movieTitle,"Elenco", star);
			break;
		}
		
	}
	
}
