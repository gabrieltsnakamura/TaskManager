import { Component, OnInit } from '@angular/core';
import { HttpProviderService } from '../../services/http-provider.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private httpProviderService: HttpProviderService) {

  }

  ngOnInit(): void {
  }




}
