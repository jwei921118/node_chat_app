import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
        const started = Date.now();
        let ok: string;

        // extend server response observable with logging
        return next.handle(req)
        .pipe(
            tap(
                event => ok = event instanceof HttpResponse ? 'successed' : '',
                error => ok = 'error'
            ),
            finalize( () => {
                const elapsed = Date.now() - started;
                const msg = `${req.method} "${req.urlWithParams}"
                ${ok} in ${elapsed} ms`;
                console.log(msg);
            })
        );
    }
}
// 这是一个记录请求用时的日志
// RxJS 的 tap 操作符会捕获请求成功了还是失败了。 RxJS 的 finalize 操作符无论在响应成功还是失败时都会调用（这是必须的），然后把结果汇报给 MessageService。

// 在这个可观察对象的流中，无论是 tap 还是 finalize 接触过的值，都会照常发送给调用者。
