import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
    selector: 'gifs-search-box',
    template: `
    <h5>Buscar:</h5>
    <input type="text" class="form-control" placeholder="Buscar gifs..." (keyup.enter)="searchTag()" #txtTagInput>`
    // txtTagInput.value:esto iba dentor del searhTag
})

export class SearchBoxComponent {

    @ViewChild('txtTagInput')
    public tagInput!: ElementRef<HTMLInputElement>;


    constructor(private gifsService: GifsService) {//se inyecta el servicio en el cosntructor

    }

    // searchTag(newTag: string) {
    searchTag() {
        const newTag = this.tagInput.nativeElement.value;
        this.gifsService.searchTag(newTag); //se inserta en el searchTags 
        this.tagInput.nativeElement.value=''; //string vacio para que se limpie la caja de texto
    }


}