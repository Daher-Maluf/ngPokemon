import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PokeAPI } from 'src/modelo';
import {PokeDataService} from './poke-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public posts$: Observable<PokeAPI[]>;
  data: Array<PokeAPI[]>;


  constructor(private pokeService: PokeDataService){
    
  }

  ngOnInit(){
    return this.loadData();
  }


  loadData(){
    this.pokeService.getPokemon().subscribe((data)=>{
       console.log(data);
    })
  }
}
