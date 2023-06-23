import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = 'tpZa97MXH4R9Ll2dLNH0qAUHhmRsEjoq';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor( private http: HttpClient ) {
    this.loadLocalStorage();
  }


  //Metodo para organizar el history del sidebar
  private organizedHistory( tag: string ):void {
    tag = tag.toLowerCase();

    if ( this._tagsHistory.includes( tag ) ) {
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag );
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 12);

    this.saveLocalStorage();

  }

  //Metodo enviar al Local storage
  private saveLocalStorage():void {
    localStorage.setItem('history', JSON.stringify( this._tagsHistory ));
  }

  //Metodo cargar Local storage
  private loadLocalStorage():void {
    if ( !localStorage.getItem('history') ) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!)

    if ( this._tagsHistory.length === 0 ) return;
    this.searchTag(this._tagsHistory[0])
  }


  //Metodo para recuperar el historial
  get tagHistory() {
    return [...this._tagsHistory]; //Spread
  }

  //Metodo para buscar en la api
  searchTag ( tag: string ):void {
    if ( tag.length === 0 ) return;
    this.organizedHistory( tag );

    //peticion a la api
    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '15')
    .set('q', tag);

    this.http.get<SearchResponse>(`${ this.serviceUrl }/search?`, { params })
    .subscribe( resp => {
      this.gifList = resp.data
    });
  }


}
