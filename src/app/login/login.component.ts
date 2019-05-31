import { Component, OnInit , ViewEncapsulation} from '@angular/core';
// import { HttpService } from '../servers/http.service';
// import { UploaderServices } from '../servers/uploader.service';
import { TranslateService } from '@ngx-translate/core';
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
  currentLange = '';
  constructor(
    private router: Router,
    private sus: StaticUrlService,
    private message: NzMessageService,
    private translate: TranslateService
  ) {
    this.translate.addLangs(['zh', 'en']);
    // 获取当前浏览器环境的语言
    const broswerLang = this.translate.getBrowserLang();

    this.translate.use(broswerLang.match(/en|zh/) ? broswerLang : 'zh');
    this.currentLange = broswerLang.match(/en|zh/) ? broswerLang : 'zh';
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

    this.translate.onLangChange.subscribe((params) => {
      console.log(params);
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
        this.router.navigateByUrl('/home/message');
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

  /**
   * 切换语言
   */
  toggleLanguage() {
    this.currentLange = this.currentLange === 'zh' ? 'en' : 'zh';
    this.translate.use(this.currentLange);
  }

}
