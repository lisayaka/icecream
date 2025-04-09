const app = getApp();
Page({
  data: {
    selectedItems: [],
    totalPrice: 0,
    paymentMethod: ''
  },

  generateOrderId() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');
    const randomNum = String(Math.floor(Math.random() * 9000) + 1000);
    return `${year}${month}${day}${hour}${minute}${second}${randomNum}`;
  },

  onLoad(options) {
    const selectedItems = JSON.parse(options.selectedItems);
    const totalPrice = options.totalPrice;
    this.setData({
      selectedItems,
      totalPrice
    });
  },

  onPaymentChange(e) {
    this.setData({
      paymentMethod: e.detail.value
    });
  },

  // 保存订单数据到全局
  saveOrder(orderId, items, totalPrice, paymentMethod) {
    // 获取当前时间
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    
    // 创建订单对象
    const order = {
      id: orderId,
      items: items,
      totalPrice: totalPrice,
      paymentMethod: paymentMethod,
      status: '已完成',
      createTime: `${year}-${month}-${day} ${hour}:${minute}`
    };
    
    // 添加到全局订单列表
    if (!app.globalData.orderList) {
      app.globalData.orderList = [];
    }
    
    // 添加到列表开头，最新订单显示在最前面
    app.globalData.orderList.unshift(order);
    
    console.log('订单已保存:', order);
    console.log('当前订单列表:', app.globalData.orderList);
    
    // 可选：保存到本地存储，确保数据持久化
    try {
      wx.setStorageSync('orderList', app.globalData.orderList);
    } catch (e) {
      console.error('保存订单数据到本地存储失败:', e);
    }
  },

  onSubmitPayment() {
    if (!this.data.paymentMethod) {
      wx.showToast({
        title: '请选择支付方式',
        icon: 'none',
        duration: 1500
      });
      return;
    }

    wx.showLoading({
      title: '支付处理中...',
    });

    // 生成订单ID
    const orderId = this.generateOrderId();

    setTimeout(() => {
      wx.hideLoading();

      // 保存订单数据
      this.saveOrder(
        orderId,
        this.data.selectedItems,
        this.data.totalPrice,
        this.data.paymentMethod
      );

      // 清空购物车
      app.globalData.cartList = [];
      try {
        wx.setStorageSync('cartList', []);
      } catch (e) {
        console.error('清空购物车失败:', e);
      }

      wx.showToast({
        title: '支付成功',
        icon: 'success',
        duration: 1500,
        success: () => {
          setTimeout(() => {
            // 设置需要清空购物车的标记
            wx.setStorageSync('needClearCart', true);
            
            // 显示继续购物的选择弹窗
            wx.showModal({
              title: '提示',
              content: '是否继续购物？',
              success: (res) => {
                if (res.confirm) {
                  // 用户点击确定，跳转到分类页面
                  wx.switchTab({
                    url: '/pages/category/category'
                  });
                } else {
                  // 用户点击取消，跳转到订单页面
                  wx.navigateTo({
                    url: '/pages/orders/orders'
                  });
                }
              }
            });
          }, 1500);
        }
      });
    }, 1500);
  }
});