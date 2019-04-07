import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-model-search',
  templateUrl: './model-search.component.html',
  styleUrls: ['./model-search.component.scss']
})
export class ModelSearchComponent implements OnInit {
  @Input() holder: string;
  @Input() tab: string;
  @Output() textSearch = new EventEmitter();
  @Output() outputSearch = new EventEmitter();
  @Output() filter = new EventEmitter();

  isActived = false;

  constructor() { }

  ngOnInit() {
  }

  searchName(text, tab) {
    if (this.textSearch) {
      this.textSearch.emit({ text: text.trim(), tab: tab })
    }
  }

  handleKeyDown(text, event) {
    if (event.key == "Enter") {
      this.outputSearch.emit({
        text: text.trim()
      })
    }
  }

}
