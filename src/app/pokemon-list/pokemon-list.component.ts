import { Component, OnInit } from '@angular/core';
import { PokeAPI, PokemonDetails } from 'src/modelo';
import {PokeDataService} from '../poke-data.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  pokemons: PokemonDetails[] = [];
  page: number = 1;
  totalPokemons: number;

  constructor(private pokeService: PokeDataService) { }

  ngOnInit(): void {
    this.getPokemons();
  
  }

  getPokemons(){
    this.pokeService.getPokemon(10,this.page + 0).subscribe((response:PokeAPI)=>{
      this.totalPokemons = response.count;
      response.results.forEach(result => {
        
        this.pokeService.getPokemonDetails(result.name)
                         .subscribe((uniqueresponse:PokemonDetails)=>{
                          this.pokemons.push(uniqueresponse);
                          console.log(this.pokemons);
                         })
      })
})
  }
}
