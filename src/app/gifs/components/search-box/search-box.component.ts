import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar</h5>
    <input type="text"
    class="form-control"
    placeholder="Buscar gifs...."
    #txtTagInpunt
    (keyup.enter)="searchTag()"
    >
  `
})

export class SearchBoxComponent {

  constructor( private gifsService: GifsService) {}

  @ViewChild('txtTagInpunt')
  public tagInput!: ElementRef<HTMLInputElement>;

  searchTag() {
    const newTag = this.tagInput.nativeElement.value;

    this.gifsService.searchTag(newTag);

    this.tagInput.nativeElement.value = '';
  }
}
