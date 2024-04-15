import { GifsService } from './../../../gifs/services/gifs.service';
import { Component } from '@angular/core';

@Component({
  selector: 'sahred-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {


  constructor(private gisfsService: GifsService) { }

  get tags(): string[] {
    return this.gisfsService.tagsHistory;
  }

  searchTag(tag: string): void {
    this.gisfsService.searchTag(tag);
  }

}
