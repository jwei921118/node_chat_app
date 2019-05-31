import { Component, OnInit } from '@angular/core';
import { StaticUrlService } from '../../servers/staticurl.service';
@Component({
  selector: 'app-addres-book',
  templateUrl: './addres-book.component.html',
  styleUrls: ['./addres-book.component.less']
})
export class AddresBookComponent implements OnInit {

  public friendsData: Array<Object> = [];
  constructor(
    private sus: StaticUrlService
  ) { }

  ngOnInit() {
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

  getFriendIds() {}
}
