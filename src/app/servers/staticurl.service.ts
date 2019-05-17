import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
@Injectable()
export class StaticUrlService {
    URLS: any;
    constructor (
        private httpService: HttpService
    ) {

        this.URLS = {
            login: 'api/login',
            userlist: '/api/user/list',
            userRegister: '/api/register'
        };
    }

    /**
     * get请求
     * @param key 地址key
     * @param data 参数
     */
    ajaxGet(key, data) {
        const path = window.location.origin + this.URLS[key];
        return this.httpService.request(path, data , 'GET');
    }

    /**
     * post 请求
     * @param key 地址key
     * @param data 参数
     * @param headers 请求头
     */
    ajaxPost(key, data, headers?) {
        const path = window.location.origin + this.URLS[key];
        return this.httpService.request(path, data, 'POST' , headers);
    }
}
