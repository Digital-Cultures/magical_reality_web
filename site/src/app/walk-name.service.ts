import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WalkNameService {
	walkName: string;
  constructor() { }
  getWalkName(){
  	return this.walkName;
  }
  setWalkName(name){
  	this.walkName=name;
  	  	console.log("setWalkName as", this.walkName);

  }
  test(){
  	console.log("test");
  }
}
