import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  groups:String;
  name:String;
  constructor(private authService:AuthService, private router:Router, private flashMessages:FlashMessagesService,) { }

  ngOnInit() {

    this.authService.getAllGroupsAuth().subscribe(groups => {
      this.groups = groups.name;
    },
    err => {
      console.log(err);
      return false;
    }
  )}

  createNewGroup(){
    const newGroup = {
      name:this.name
    }
    this.authService.registerGroup(newGroup).subscribe(data=>{
      console.log(newGroup);
      if(data.success){
        this.flashMessages.show('The group : '+newGroup.name+' has been created', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/dashboard']);
      } else {
        this.flashMessages.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/dashboard']);
      }
    });
  }
}
