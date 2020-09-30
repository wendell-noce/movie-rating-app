import { Cast } from './cast.model';
import { Trailer } from './trailer.model';

export class Movie {
    id: string;
    title: string;
    year: string;
    length: string;
    poster: string;
    plot: string;
    trailer: Trailer;
    cast: Cast[];
}