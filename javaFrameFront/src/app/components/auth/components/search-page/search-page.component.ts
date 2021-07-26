import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.infoForm();
  }
  infoForm(){
    this.form = this.fb.group({
      "currentAt": ["", Validators.compose([Validators.required])],
    });
  }
  save() {
    if (this.form.invalid){
      return;
    }
    this.router.navigate(['/auth','searchData'],
      {
        relativeTo: this.activatedRoute,
        queryParams: {
          currentAt: this.form.value.currentAt
        },
        queryParamsHandling: 'merge'
      });
  }
}
