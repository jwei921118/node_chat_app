import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StaticUrlService } from '../servers/staticurl.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less']
})
export class SignUpComponent implements OnInit {
  validateForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private sus: StaticUrlService,
    private message: NzMessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      email: [null],
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      phoneNumberPrefix: ['+86'],
      phoneNumber: [null, [Validators.required]],
      sex: [null, [Validators.required]]
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      if (i) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }

    if (this.validateForm.valid) {
      const data = {...this.validateForm.value};
      this.postNewUser(data);
    }

    console.log(this.validateForm.valid);

    console.log(111);
    console.log(this.validateForm);
    // this.validateForm.
  }

  /**
   * 注册用户
   * @param param 注册参数
   */
  postNewUser(param) {
    this.sus.ajaxPost('userRegister' , param)
    .subscribe((res) => {
      console.log(res);
      if (res.type === '2') {
        this.resetFrom();
        setTimeout(() => {
          this.router.navigateByUrl('/login');
        }, 200);
      }
      this.message.info(res.message);
    });
  }

  /**
   * 更新确认密码
   */
  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  /**
   * 验证用户确认密码
   */
  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  }

  /**
   * 重置表单
   * @param e 数据事件
   */
  resetFrom(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    this.validateForm.reset();
    for (const i in this.validateForm.controls) {
      if (i) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
  }

}
