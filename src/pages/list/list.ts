import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Firebase } from '../../providers/firebase';
import { ToastController } from 'ionic-angular';
import { Util } from '../../app/util';
declare var _:any;

@Component({
  selector: 'list-page',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  newItem: string;
  items = [];
  day = 24 * 60 * 60 * 1000;
  util;
  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: Firebase, private tc:ToastController) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    fb.items.subscribe((items) => {
      this.items = items;
      this.items.map(function(item) {
        const day = 24 * 60 * 60 * 1000;
        item['deadline'] -= Date.now();
        if(item['deadline'] < 1 * day){
          item['state'] = 'danger'
        }else if(item['deadline'] < 2 * day){
          item['state'] = 'secondary'
        }else if(item['deadline'] < 3 * day){
          item['state'] = 'primary'
        }else if(item['deadline'] === 0){
          item['state'] = 'light'
        }
      })
      this.items = this.items.sort(function(a,b){
        return a['deadline'] - b['deadline'];
      });
      console.log(this.items)
      console.log(_.map(this.items,(item) => {
        item['deadline'] = item['deadline'];
        item['done'] = item['done'];
      }));
    });
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
  addTapped(day: number){
    if(this.newItem !== ''){
      this.fb.add(this.newItem, day);
      this.newItem = '';
      this.util.showToast("Create:" + this.newItem);
    } else{
      this.util.showToast("Title is empty.");
    }
  }
  trashTapped(event, item) {
    this.fb.trashTapped(event, item);
    this.util.showToast("Trash:" + item.title);
  }
  checkTapped(event, item) {
    this.fb.checkTapped(event,item);
    this.util.showToast("Done:" + item.title);
  }
}
