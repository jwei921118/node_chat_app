import { Component, OnInit , ViewEncapsulation} from '@angular/core';
import { HttpService } from '../servers/http.service';
import { UploaderServices } from '../servers/uploader.service';
import { Router } from '@angular/router';
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
    name: '',
    psd: '',
    userAccount: '',
  };
  cookieUserShow = false;
  constructor(
    private httpService: HttpService,
    private uploaderServices: UploaderServices,
    private router: Router
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
    // this.httpService.request('http://10.10.19.140:4200/a', {id: 1})
    // .subscribe(res => {
    //   console.log(res);
    // });
    // this.httpService.request('http://10.10.19.140:4200' , {id: 2}, 'POST')
    // .subscribe(res => {
    //   console.log(res);
    // });
    this.uploaderServices.request('http://10.10.19.140:4200', {id: 1} , 'POST' , this.progress)
    .subscribe((res) => {
      console.log(res);
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
