import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment'
import { Movie } from './models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  
  constructor( private http: HttpClient ) { }

  // Headers
  
  options = new HttpHeaders({ 
      'x-rapidapi-key': 'b416283c94msh0386d33a037acf3p18b9fejsn819af59a3d13'
    }
  )
 
  listar(busca: string) {
    const endpoint = environment.api_url + `/search/${busca}`;
    return this.http.get<any[]>(endpoint, {headers: this.options})    
  }

  getMovie(id: string){
    const endpoint = environment.api_url + `/film/${id}`;
    return this.http.get<Movie>(endpoint, {headers: this.options}) 
  }
}
