import { Component, OnInit , ViewEncapsulation} from '@angular/core';
// import { HttpService } from '../servers/http.service';
// import { UploaderServices } from '../servers/uploader.service';
import { StaticUrlService } from '../servers/staticurl.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import io from 'socket.io-client';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  cookieUser: any = [];
  user = {
    username: '',
    password: ''
  };
  cookieUserShow = false;
  constructor(
    private router: Router,
    private sus: StaticUrlService,
    private message: NzMessageService
  ) {
    this.cookieUser = [];
  }

  ngOnInit() {
    const socket = io('http://10.10.19.140:7201');
    socket.on('connect' , () => {
      console.log(111);
    });

    socket.on('data' , (data) => {
      console.log(data);
    });
  }

  /**
   * 切换用户下拉框
   */
  toggleUser() {
    this.cookieUserShow = !this.cookieUserShow;
  }

  /**
   * 登录
   */
  login() {
    const param = {...this.user};
    this.sus.ajaxPost('login' , param)
    .subscribe((res) => {
      if (res.code === 0) {
        this.router.navigateByUrl('/home');
      }
      this.message.info(res.message);
    });
  }

  /**
   * 跳转到注册页面
   */
  toSignUp() {
    this.router.navigateByUrl('/signUp');
  }


  /**
   * 进程
   */
  progress(v) {
    console.log(v);
  }

}
