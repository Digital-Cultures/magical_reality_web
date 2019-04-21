import { Component, OnInit, OnDestroy ,ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';
import { DragScrollComponent } from 'ngx-drag-scroll';
// import { DragScrollComponent } from '../../../src/ngx-drag-scroll';
import { MouseEvent } from '@agm/core';
import { AgmCoreModule } from '@agm/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { WalkNameService } from '../walk-name.service';

@Component({ templateUrl: 'home.component.html' })

export class HomeComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];
    lat:any;/// = "54.9783";
    lng:any;// = "-1.6178"
    zoom: number = 16;
    iconUrl:string="0";
    selectedImageUrl:string ="0";
    selectedAction:string ="0";
    defaultAction = "choose an action";
    markers: marker[] = [];
    actions: string [];
    imagelist=[
    "beautiful.png",
    "bird.png",
    "clay.png",
    "cluny.png",
    "dead.png",
    "growup.png",
    "murder.png",
    "world.png"

    ]
    hideScrollbar;
    disabled;
    xDisabled;
    yDisabled;

    leftNavDisabled = false;
    rightNavDisabled = false;
    index = 0;
    local = false;
    
    @ViewChild('nav', {read: DragScrollComponent}) ds: DragScrollComponent;

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService ,       // private dragScrollComponent: DragScrollComponent
        private http: HttpClient,
        public walkNameService: WalkNameService

        ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });




        if (navigator.geolocation)
        {
            var options = {
              enableHighAccuracy: true,
              timeout: 5000,
              maximumAge: 1000
          };
          

          this.iconUrl="assets/dns.png";
          navigator.geolocation.getCurrentPosition( pos => {
            this.lng = +pos.coords.longitude;
            this.lat = +pos.coords.latitude;
            this.markers= [
            {
                lat: +pos.coords.latitude,
                lng: +pos.coords.longitude,
                iconUrl: "",
                label: 'A',
                draggable: false
            }
            ];
            //54.97328, -1.61396.
                // this.markers.push({
                    //   lat: +pos.coords.latitude,
                    //   lng: +pos.coords.longitude,
                    //   draggable: true
                    // });
                }, this.error,options);
      }else{
        console.log("no navigator");
    }
}
error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
  
  // this.markers= [
  //           {
  //               lat: +"54.97328",
  //               lng: +"-1.61396",
  //               iconUrl: "",
  //               label: 'A',
  //               draggable: true
  //           }]
}
toggleSelectedImage(imageUrl){

    //make sure all are unhighlighted

    for (var i = 0; i < this.imagelist.length; i++) {
        var exploded = this.imagelist[i].split(".");
        if(exploded.length==2){
            if(exploded[0].slice(-2)=="_b"){
               var newUrl= exploded[0].slice(0,-2)+".png";
               this.imagelist[i]=newUrl;
            }
        }
    }
    //switch out for the highlighted version
    for (var i = 0; i < this.imagelist.length; i++) {
        if(this.imagelist[i]==imageUrl){
            var exploded = this.imagelist[i].split(".");
            if(exploded.length==2){
                var newUrl = exploded[0]+"_b."+exploded[1];
            }
            this.imagelist[i]=newUrl;
        }
    }
}

addPoint(item, lat, lon){
    if(this.selectedImageUrl=="0"){
        alert("Choose an object to place on the map");
    }
    else{
     if(this.selectedAction=="choose an action"){
        alert("Choose an action for your object");
    }else{
        if(this.walkNameService.getWalkName()!=null){
            //'action':this.selectedAction, 
            var walkName = this.walkNameService.getWalkName();
            console.log("adding point to ",);
        let data = {'title': item,  'action':this.selectedAction, 'url':this.selectedImageUrl,  'routeName':walkName, 'lat': lat, 'lon':lon, 'userId': this.currentUser.firstName};
        var url;
        if(this.local){
            url = "http://localhost:8888/magical_realism/php/add_point_to_route.php";
        }else{
            url ='./php/add_point_to_route.php';
        }
        this.http.post(url, data)
        .subscribe(
            (res:Response) => {
                console.log(res);
            },
            err => {
                console.log("Error occured");
            }
            );
    }
    else{
        alert("can't find walk name");
    }
}
}
}
getPoints(){
    let data = {'routeName':this.walkNameService.getWalkName(),  'userId': this.currentUser.firstName};
    console.log("getting data for ",this.walkNameService.getWalkName())
    
    var url;
        if(this.local){
            url = "http://localhost:8888/magical_realism/php/get_points.php";
        }else{
            url ='./php/get_points.php';
        }
    this.http.post(url, data)
    .subscribe(
        (res:Response) => {

//            if(res.length>0) 
                //this.markers= res;
            //     this.markers= [
            // {
            //     lat: +54.5,
            //     lng: +5,
            //     iconUrl: "",
            //     label: 'A',
            //     draggable: true
            // }
            // ];
            for (var key in res) {
                //this.markers.push(res[key]);
                console.log("res" ,res[key]);
                
                this.markers.push({
                    lat: res[key].lat,
                    lng: res[key].lon,
                    iconUrl: "assets/map_icons/"+ res[key].model,
                    draggable: false
                });
            }
            console.log(this.markers);
        },
        err => {
            console.log("Error occured");
        }
        );
}
removePoint(lat, lon){
    let data = {'routeName':this.walkNameService.getWalkName(), 'lat': lat, 'lon':lon, 'userId': this.currentUser.firstName};
    
    var url;
        if(this.local){
            url = "http://localhost:8888/magical_realism/php/remove_point_from_route.php";
        }else{
            url ='./php/remove_point_from_route.php';
        }
    this.http.post(url, data)
    .subscribe(
        (res:Response) => {
            console.log(res);
        },
        err => {
            console.log("Error occured");
        }
        );
}
clickedMarker(marker, label, i){
    console.log("clicked",marker,label,i);
    //remove from array
   // let len: number = 0;//this.markers.length;

   // for (var i = 0; i < this.markers.length; i++) {
    var index = 0;
    for (let i in this.markers) {
        if(this.markers[index].lat == marker.lat && this.markers[index].lng == marker.lng){
            this.markers.splice(index, 1);
            this.removePoint(marker.lat, marker.lng);
        }
        index++;
    }
}
onDragScrollInitialized() {
    console.log('first demo drag scroll has been initialized.');
}
mapClicked($event: MouseEvent) {
    console.log("Click");

    this.addPoint(this.selectedImageUrl, $event.coords.lat, $event.coords.lng);
    if(typeof(this.markers)=="undefined"){
        this.markers= [
        {
            lat:  $event.coords.lat,
            lng:  $event.coords.lng,
            iconUrl: "assets/map_icons/"+this.selectedImageUrl,
            draggable: false
        }]
    }
    else{

        this.markers.push({
            lat: $event.coords.lat,
            lng: $event.coords.lng,
            iconUrl: "assets/map_icons/"+this.selectedImageUrl,
            draggable: false
        });
    }
    
    
}




ngOnInit() {
    this.loadAllUsers();
    console.log("walk bane", this.walkNameService.getWalkName());
    this.lat = 54.97328;
    this.lng = -1.61396;

    this.getPoints();
    this.actions=[
    "goRed",
    "goBlue",
    "set alight"
    ];
    this.selectedAction="choose an action"
}

ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }
    clickItem(item) {
        console.log('item clicked',item);
        this.selectedImageUrl =item;
        this.toggleSelectedImage(item);
    }

    remove() {
        this.imagelist.pop();
    }

    toggleHideSB() {
        this.hideScrollbar = !this.hideScrollbar;
    }

    toggleDisable() {
        this.disabled = !this.disabled;
    }
    toggleXDisable() {
        this.xDisabled = !this.xDisabled;
    }
    toggleYDisable() {
        this.yDisabled = !this.yDisabled;
    }

    moveLeft() {
        this.ds.moveLeft();
    }

    moveRight() {
        this.ds.moveRight();
    }

    moveTo(idx: number) {
        this.ds.moveTo(idx);
    }

    leftBoundStat(reachesLeftBound: boolean) {
        this.leftNavDisabled = reachesLeftBound;
    }

    rightBoundStat(reachesRightBound: boolean) {
        this.rightNavDisabled = reachesRightBound;
    }

    onSnapAnimationFinished() {
        console.log('snap animation finished');
    }

    onIndexChanged(idx) {
        this.index = idx;
        console.log('current index: ' + idx);
    }




    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => {
            this.loadAllUsers()
        });
    }


    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }

}
interface marker {
    lat: number;
    lng: number;
    iconUrl: string;
    label?: string;
    draggable: boolean;
}    