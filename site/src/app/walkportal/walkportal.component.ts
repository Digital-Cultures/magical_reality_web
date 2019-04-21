import { Component, OnInit, OnDestroy ,ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';

import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {HttpClient, HttpHeaders } from '@angular/common/http';

import { WalkNameService } from '../walk-name.service';

@Component({
	selector: 'app-walkportal',
	templateUrl: './walkportal.component.html',
	styleUrls: ['./walkportal.component.css']
})
export class WalkportalComponent implements OnInit {
	routeName:string = '';
	currentUser: User;
	currentUserSubscription: Subscription;
	walks: any [] = [];
	selectedWalk:string = '';
	local = false;

	constructor(
		private http: HttpClient,
		private authenticationService: AuthenticationService,
		private userService: UserService ,
		private route: ActivatedRoute,
		private router: Router,
		public walkNameService: WalkNameService

		) {
		this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
			this.currentUser = user;
		});

		this.getRoutes();

	}

	ngOnInit() {
	}
	onKey(event: any){
		this.routeName = event.target.value;
		console.log(this.routeName);

	}
	loadRoute(){
		this.routeName=this.selectedWalk;
		console.log("selected option is ",this.routeName,this.selectedWalk)
		this.walkNameService.setWalkName(this.routeName);
		this.router.navigate(['/home']);
	}
	getRoutes(){
		let data = {'userId': this.currentUser.firstName};
		var url;
        if(this.local){
            url = "http://localhost:8888/magical_realism/php/get_routes.php";
        }else{
            url ='./php/get_routes.php';
        }
		this.http.post(url, data)
		.subscribe(
			(res:Response) => {
				console.log("routes",res,Object.keys(res));
				//for
                //var arr: any [] = <any []> res;
                //this.walks = res;
                
                for (var key in res) {
                		this.walks.push(res[key]['routeName']);
                }
                console.log(this.walks);
                // for (var i = 0; i < Object.keys(res).length; i++) {
                // 	console.log(res[i]);


                // 	this.walks.push( Object.keys(res[i]) [0]);
                // }
            },
            err => {
            	console.log("Error occured");
            }
            );

	}
	addRouteToServer(){
		var name : any;
		name = <any> this.routeName;
		if(this.routeName.length>=4){
  		//if this  name doesn't exist
  		//console.log("this.walks.indexOf(this.routeName)",this.walks,this.walks.indexOf(this.routeName));
  		if(this.walks.indexOf(this.routeName)==-1){

  			let data = {'routeName': this.routeName,   'userId': this.currentUser.firstName};
  			var url;
        if(this.local){
            url = "http://localhost:8888/magical_realism/php/make_route.php";
        }else{
            url ='./php/make_route.php';
        }

  			this.http.post(url, data)
  			.subscribe(
  				(res:Response) => {
  					console.log(res);
  					//this.walkNameService.setWalkName("test");
  					this.walkNameService.setWalkName(this.routeName);
  					this.router.navigate(['/home']);
  				},
  				err => {
  					console.log("Error occured");
  				}
  				);
  			
  		}
  		else{
  			alert("This walk exists already")
  		}
  	}
  	else{
  		alert("Your walk name must be at least 4 characters long")
  	}
  }

}
