import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import 'rxjs/add/operator/map';

/*
  Generated class for the Firebase provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Firebase {
  public items: FirebaseListObservable<any[]>;
//  constructor(public http: Http, private af: AngularFire) {
  constructor( private af: AngularFire) {
    console.log('Hello Firebase Provider');
    this.items = af.database.list('/todos');
  }
  add(str: string, day: number){
    var daysMilliSeconds = (day) * 24 * 60 * 60 * 1000;
    var targetDay: Date = new Date(Date.now() + daysMilliSeconds);
    console.log("targetDay" + daysMilliSeconds);
    var targetDayStr = targetDay.getFullYear() + '-' + (targetDay.getMonth()+1) + '-' + targetDay.getDate();
    console.log("targetDayStr: " + targetDayStr);
    targetDay = new Date(targetDayStr);
    console.log("targetDay::" + targetDay.getTime());
    console.log(targetDay);
    console.log(targetDay.getFullYear()+",");
    console.log(targetDay.getMonth()+",");
    console.log(targetDay.getDate()+",");
    console.log(targetDay.getHours()+",");
    console.log(targetDay.getMinutes()+",");
    console.log(targetDay.getSeconds()+",");
    console.log(targetDay.getMilliseconds()+",");

    this.items.push({
      title: str,
      done: false,
      trash: false,
      deadline: targetDay.getTime()
    })
  }
  deleteTapped(event, item) {
    this.items.remove(item.$key);
  }
  trashTapped(event, item) {
    this.items.update(item.$key,{
      trash: true,
    })
  }
  undoTapped(event, item) {
    this.items.update(item.$key,{
      trash: false,
    })
  }
  checkTapped(event, item) {
    if(item.done === true){
      this.items.update(item.$key,{
        done: false,
      })
    } else {
      this.items.update(item.$key,{
        done: true,
      })
    }
  }

}
