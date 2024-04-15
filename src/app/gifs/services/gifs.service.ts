import { Gif, SearchResponse } from './../interfaces/gifs.interfaces';

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class GifsService {

    public gifList: Gif[] = [];//contiene toda lista de los gifs
    private _tagsHistory: string[] = [];
    private apiKey: string = 'oS8Ug8znIOafBzUOcrzTJJQlxaFyrVet';
    private serviceURl: string = 'https://api.giphy.com/v1/gifs';

    constructor(private http: HttpClient) { //se inyecta el http 
        this.loadLocalStorage();
        console.log('Gifs service ready');

    }

    get tagsHistory() {
        return [...this._tagsHistory];//... operador para crear una copia del _tagsHistory
    }

    private organizeHistory(tag: string) {
        tag = tag.toLocaleLowerCase();
        if (this.tagsHistory.includes(tag)) {
            this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);//se borra el tag viejo
        }
        this._tagsHistory.unshift(tag);//se inserta el nuevop tag al inicio 
        this._tagsHistory = this.tagsHistory.splice(0, 10);
        this.saveLocalStorage();
    }

    private saveLocalStorage(): void {
        localStorage.setItem('history', JSON.stringify(this._tagsHistory));
    }
    private loadLocalStorage(): void {
        if (!localStorage.getItem('history')) return;
        this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

        if (this._tagsHistory.length === 0) return;
        this.searchTag(this._tagsHistory[0]);
    }

    public searchTag(tag: string): void { //buscar el valor 
        if (tag.length === 0) return;
        this.organizeHistory(tag);
        const params = new HttpParams()
            .set('api_key', this.apiKey)
            .set('limit', '10')
            .set('q', tag)
        this.http.get<SearchResponse>(`${this.serviceURl}/search`, { params })
            .subscribe((resp) => {
                this.gifList = resp.data;
                // console.log({gifs:this.gifList});

            });


    }



}//cierre clase