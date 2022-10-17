import { Component, OnInit } from '@angular/core';
import { card, cards } from './cards-data';
import { feed, feeds } from './feeds';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css'],
})
export class CardListComponent implements OnInit {
  feeds: feed[];
  cards: card[];
  selected!: Date | null;

  constructor() {
    this.feeds = feeds;
    this.cards = cards;
  }

  ngOnInit(): void {}
}
