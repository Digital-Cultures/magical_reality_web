import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './_services';
import { User } from './_models';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: User;
    title: string = 'MAGICAL REALITY';

    //http://www.shaileshsonare.com/blog/c-programming/angular-4-http-post-with-php/
    // 
    constructor(
        private router: Router, 

        private authenticationService: AuthenticationService
        ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
        
    }



    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import {HttpClient} from '@angular/common/http';

// import { AuthenticationService } from './_services';
// import { User } from './_models';

// @Component({ selector: 'app', templateUrl: 'app.component.html' })
// export class AppComponent {
//     currentUser: User;
//     title: string = 'My first AGM project';
//     lat:any;
//     lng:any;
//     //http://www.shaileshsonare.com/blog/c-programming/angular-4-http-post-with-php/
//     let headers = new Headers();

//     constructor(
//         // private router: Router,
//         // private authenticationService: AuthenticationService
//         ) {
//         // if (navigator){

//         //         this.lng = +pos.coords.longitude;
//         //         this.lat = +pos.coords.latitude;
//         //         console.log("got nav");
//         //     });
//         // };

//         // this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
//     }

//     // function sendAJAX(){
//     //     this.headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
//     //     let order = 'order=foobar';

//     //     this.http.post('http://myserver/processorder.php', order, {
//     //         headers: headers
//     //     }).subscribe(res => {
//     //         console.log('post result %o', res);
//     //     });
//     // }  //     navigator.geolocation.getCurrentPosition( pos => {


//     // logout() {
//     //     this.authenticationService.logout();
//     //     this.router.navigate(['/login']);
//     // }
// }