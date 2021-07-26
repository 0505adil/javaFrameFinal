import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  user: User;
  constructor(private authService: AuthService,
              private router: Router,
              private userService: UserService) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }
  getCurrentUser(){
    if (this.authService.checkAvailability()){
      this.userService.currentUser().subscribe(perf => {
        this.user = perf;
      })
    }
  }
}
