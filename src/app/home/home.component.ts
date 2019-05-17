import { Component, OnInit, ViewChild } from '@angular/core';
import { FooterComponent } from '../components/footer/footer.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  @ViewChild(FooterComponent)
  private footerComponent: FooterComponent;
  constructor() { }

  ngOnInit() {
  }

}
