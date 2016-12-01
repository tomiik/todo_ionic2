import { Component, OnInit } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';

import { Firebase } from '../../providers/firebase';
import { ToastController } from 'ionic-angular';
import { Util } from '../../app/util'

@Component({
  selector: 'list-done-page',
  templateUrl: 'list-done.html'
})
export class ListDonePage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, done: boolean, time: number}> = [];
  util;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private fb: Firebase,
              private tc:ToastController
              ) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    fb.items.subscribe((items) => this.items = items);

    this.util = new Util(tc);
    //this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    //'american-football', 'boat', 'bluetooth', 'build'];

    //this.items = [];
    //for(let i = 1; i < 11; i++) {
    //  this.items.push({
    //    title: 'Item ' + i,
    //    note: 'This is item #' + i,
    //    icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    //  });
    //}
  }
  ngOnInit(){

  }
  trashTapped(event, item) {
    this.fb.trashTapped(event, item);
    this.util.showToast("Trash:" + item.title);
  }
  checkTapped(event, item) {
    this.fb.checkTapped(event,item);
    this.util.showToast("Todo:" + item.title);
  }
}
