import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { PokeAPI, PokemonDetails } from 'src/modelo';



@Injectable({
  providedIn: 'root'
})
export class PokeDataService {
  private readonly pokeApi = environment.pokemoUrl;
  private readonly pokeSpeciesApi = environment.pokemonSpeciesURL;

  constructor(private http: HttpClient) { }


  getPokemon(limit: number, offset: number): Observable<PokeAPI>{
    return this.http.get<PokeAPI>(`${this.pokeApi}?limit=${limit}&offset=${offset}`)
                    .pipe(catchError(this._handleError));
  }

  // get more pokemon data
  getPokemonDetails(name): Observable<PokemonDetails> {
    return this.http
      .get<PokemonDetails>(`${this.pokeApi}/${name}`)
      .pipe(catchError(this._handleError));
  }

  getPokemonSpecies(name): Observable<any> {
    return this.http
      .get<any>(`${this.pokeSpeciesApi}/${name}`)
      .pipe(catchError(this._handleError));
  }


  /**
   * Handles any request error
   */
   private _handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

}
