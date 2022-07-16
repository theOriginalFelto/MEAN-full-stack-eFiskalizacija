import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-podaci-o-preduzecu',
  templateUrl: './podaci-o-preduzecu.component.html',
  styleUrls: ['./podaci-o-preduzecu.component.css']
})
export class PodaciOPreduzecuComponent implements OnInit {

  constructor(private acrout: ActivatedRoute) { }

  id: number;

  ngOnInit(): void {
    this.acrout.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  

}
