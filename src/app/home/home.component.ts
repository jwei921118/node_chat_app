import { Component, OnInit, ViewChild } from '@angular/core';
import { StaticUrlService } from '../servers/staticurl.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  constructor(
    private sus: StaticUrlService
  ) { }

  ngOnInit() {
    this.getUserList();
  }


  /**
   * 获取所有用户
   */
  getUserList() {
    this.sus.ajaxGet('userlist', {})
    .subscribe((res) => {
      console.log(res);
    });
  }

}
