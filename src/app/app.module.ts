import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

// 国际化
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// 模块
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);

import { appRoute } from './app.route';

// 服务
import { HttpService } from './servers/http.service';
import { UploaderServices } from './servers/uploader.service';
import { StaticUrlService } from './servers/staticurl.service';
// 拦截器
import { NoopInterceptor } from './interceptor/noop-interceptor';
import { LoggingInterceptor } from './interceptor/log-interceptor';
// 组件
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MessagePageComponent } from './pages/message-page/message-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AddresBookComponent } from './pages/addres-book/addres-book.component';
import { MomentComponent } from './pages/moment/moment.component';
import { MyInfoComponent } from './pages/my-info/my-info.component';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/' , '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    MessagePageComponent,
    AddresBookComponent,
    MomentComponent,
    MyInfoComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoute, {useHash: true, enableTracing: true}),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    HttpService,
    UploaderServices,
    StaticUrlService,
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: LOCALE_ID , useValue: 'zh-Hans'},
    [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: NoopInterceptor,
        multi: true
      },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: LoggingInterceptor,
        multi: true
      }
    ]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
