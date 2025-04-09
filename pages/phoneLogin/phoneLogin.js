Page({
  data: {
    phone: '',
    code: '',
    isAgreed: false,
    countdown: 0,
    canSendCode: false,
    canLogin: false
  },

  // 监听手机号输入
  handlePhoneInput(e) {
    const phone = e.detail.value;
    this.setData({
      phone,
      canSendCode: phone.length === 11
    });
    this.checkCanLogin();
  },

  // 监听验证码输入
  handleCodeInput(e) {
    const code = e.detail.value;
    this.setData({
      code
    });
    this.checkCanLogin();
  },

  // 监听协议勾选
  handleAgreementChange(e) {
    this.setData({
      isAgreed: e.detail.value.length > 0
    });
    this.checkCanLogin();
  },

  // 检查是否可以登录
  checkCanLogin() {
    const { phone, code, isAgreed } = this.data;
    const canLogin = phone.length === 11 && code.length === 6 && isAgreed;
    this.setData({
      canLogin
    });
  },

  // 发送验证码
  sendCode() {
    if (!this.data.canSendCode) return;
    
    // 生成6位随机验证码
    const fakeCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // 开始倒计时
    this.setData({
      countdown: 60,
      canSendCode: false,
      code: fakeCode
    });

    const timer = setInterval(() => {
      if (this.data.countdown <= 1) {
        clearInterval(timer);
        this.setData({
          countdown: 0,
          canSendCode: this.data.phone.length === 11
        });
      } else {
        this.setData({
          countdown: this.data.countdown - 1
        });
      }
    }, 1000);
  },

  // 处理登录
  handleLogin() {
    if (!this.data.canLogin) return;

    wx.showLoading({
      title: '登录中...',
    });

    // 模拟登录成功
    setTimeout(() => {
      wx.hideLoading();
      
      // 保存登录状态
      const userInfo = {
        phone: this.data.phone,
        nickName: '用户' + this.data.phone.substr(-4),
        avatarUrl: '/images/avatar.jpg'
      };
      
      wx.setStorageSync('userInfo', userInfo);
      
      wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 1500,
        success: () => {
          setTimeout(() => {
            wx.navigateBack();
          }, 1500);
        }
      });
    }, 1500);
  }
}); 