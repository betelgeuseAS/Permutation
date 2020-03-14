import { Component, OnInit } from '@angular/core';

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.sass'],
  providers: [
    NgbModalConfig,
    NgbModal
  ]
})
export class BookListComponent implements OnInit {

  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    // Customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {}

  openCreateBookModal(content) {
    this.modalService.open(content, { size: 'lg'/*, centered: true*/ });
  }
}
