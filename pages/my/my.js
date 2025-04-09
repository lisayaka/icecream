const app = getApp();
Page({
  data: {
    userInfo: null,
    showLoginRegisterModal: false,
    isPhoneLogin:false,
    avatarInput:'/images/avatar.jpg',
    showModifyInfoModal:false,
    showAddressModal: false,
    addressInfo: {
      name: '',
      phone: '',
      detail: ''
    }
  },
  onLoad(){
    const addressInfo = wx.getStorageSync('addressInfo');
    if(addressInfo){
      this.setData({
        addressInfo:addressInfo
      });
    }
  },
  navigateToMessage() {
    if (this.data.userInfo) {
      this.setData({
        showAddressModal: true
      });
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      });
    }
  },
  handleNameChange(e) {
    let addressInfo = this.data.addressInfo;
    addressInfo.name = e.detail.value;
    this.setData({
      addressInfo
    });
  },

  handlePhoneChange(e) {
    let addressInfo = this.data.addressInfo;
    addressInfo.phone = e.detail.value;
    this.setData({
      addressInfo
    });
  },

  handleDetailChange(e) {
    let addressInfo = this.data.addressInfo;
    addressInfo.detail = e.detail.value;
    this.setData({
      addressInfo
    });
  },

  saveAddress() {
    wx.setStorageSync('addressInfo', this.data.addressInfo);
    wx.showToast({
      title: '地址保存成功',
      icon: 'success'
    });
    this.setData({
      showAddressModal: false
    });
  },

  closeAddressModal() {
    this.setData({
      showAddressModal: false
    });
  },

  navigateToAddress() {
    if (this.data.userInfo) {
      this.setData({
        showModifyInfoModal: true
      });
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      });
    }
  },
  chooseAvatar() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const avatarUrl = res.tempFilePaths[0];
        this.setData({
          'userInfo.avatarUrl': avatarUrl
        });
      }
    });
  },
  handleNicknameChange(e) {
    this.setData({
      'userInfo.nickName': e.detail.value
    });
  },
  saveModifiedInfo() {
    wx.setStorageSync('userInfo', this.data.userInfo);
    wx.showToast({
      title: '信息保存成功',
      icon: 'success'
    });
    this.setData({
      showModifyInfoModal: false
    });
  },
  closeModifyInfoModal() {
    this.setData({
      showModifyInfoModal: false
    });
  },
  onLoad() {
    // 尝试从本地存储中获取用户信息
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        userInfo: userInfo
      });
    }
  },
  showLoginRegisterModal() {
    // 只有在用户未登录时才显示登录窗口
    if (!this.data.userInfo) {
      this.setData({
        showLoginRegisterModal: true
      });
    }
  },
  wechatLogin() {
    // 微信登录逻辑
    wx.getUserProfile({
      desc: '用于完善个人信息',
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          showLoginRegisterModal: false
        });
        // 将用户信息存储到本地
        wx.setStorageSync('userInfo', res.userInfo);
      },
      fail: (err) => {
        console.error('获取用户信息失败', err);
        this.setData({
          showLoginRegisterModal: false
        });
      }
    });
  },
  phoneLogin() {
    this.setData({
      showLoginRegisterModal: false
    });
    wx.navigateTo({
      url: '/pages/phoneLogin/phoneLogin'
    });
  },
  closeLoginRegisterModal() {
    this.setData({
      showLoginRegisterModal: false
    });
  },
  logout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          // 清除本地存储的用户信息
          wx.removeStorageSync('userInfo');
          // 更新页面数据
          this.setData({
            userInfo: null
          });
          wx.showToast({
            title: '退出登录成功',
            icon: 'success'
          });
        }
      }
    });
  },
  
  navigateToCollection(){
    wx.navigateTo({
      url: '/pages/orders/orders'
    });
  }

});