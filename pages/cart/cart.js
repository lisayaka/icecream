Page({
  data: {
      cartList: [],
      totalPrice: 0,
      allChecked: false
  },
  onLoad() {
      const app = getApp();
      let cartList = app.globalData.cartList || [];
      // 确保每个商品对象都有 checked 属性，并默认设为不选中
      cartList = cartList.map(item => {
          return {
             ...item,
              checked: false
          };
      });
      
      this.setData({
          cartList,
          allChecked: false
      });
      
      // 更新全局数据，确保一致性
      app.globalData.cartList = cartList;
      
      this.calculateTotalPrice();
  },

  onShow() {
    // 更新tabBar选中状态
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2 // 购物车页的索引是2
      });
    }
    
    // 保留原来的onShow逻辑
    const needClearCart = wx.getStorageSync('needClearCart');
    console.log('读取 needClearCart 状态:', needClearCart);
    if (needClearCart) {
        this.clearCart();
        wx.removeStorageSync('needClearCart');
    }
    
    const app = getApp();
    let cartList = app.globalData.cartList || [];
    
    // 确保每个商品对象都有 checked 属性，并默认设为不选中
    cartList = cartList.map(item => {
        return {
           ...item,
            checked: item.checked === undefined ? false : item.checked
        };
    });
    
    // 判断是否所有商品都被选中
    const allChecked = cartList.length > 0 && cartList.every(item => item.checked);
    
    this.setData({
        cartList,
        allChecked
    });
    
    // 更新全局数据
    app.globalData.cartList = cartList;
    
    this.calculateTotalPrice();
  },

  // 勾选商品事件处理函数
  toggleCheck(e) {
      const index = e.currentTarget.dataset.index;
      const cartList = this.data.cartList;
      cartList[index].checked = !cartList[index].checked;
      this.setData({
          cartList
      });
      const app = getApp();
      app.globalData.cartList = cartList;
      this.calculateTotalPrice();
  },

  // 增加商品数量
  increaseQuantity(e) {
      const index = e.currentTarget.dataset.index;
      const cartList = this.data.cartList;
      cartList[index].quantity++;
      this.setData({
          cartList
      });
      const app = getApp();
      app.globalData.cartList = cartList;
      this.calculateTotalPrice();
  },

  // 减少商品数量
  decreaseQuantity(e) {
      const index = e.currentTarget.dataset.index;
      const cartList = this.data.cartList;
      if (cartList[index].quantity > 1) {
          cartList[index].quantity--;
          this.setData({
              cartList
          });
          const app = getApp();
          app.globalData.cartList = cartList;
          this.calculateTotalPrice();
      }
  },

  // 计算购物车总价
  calculateTotalPrice() {
      const cartList = this.data.cartList;
      let totalPrice = 0;
      cartList.forEach(item => {
          if (item.checked) {
              totalPrice += item.price * item.quantity;
          }
      });
        // 四舍五入保留两位小数
        totalPrice = Math.round(totalPrice * 100) / 100;
      this.setData({
          totalPrice
      });
  },

  // 删除商品记录
  deleteItem(e) {
      const index = e.currentTarget.dataset.index;
      const cartList = this.data.cartList;
      cartList.splice(index, 1);
      this.setData({
          cartList
      });
      const app = getApp();
      app.globalData.cartList = cartList;
      this.calculateTotalPrice();
  },

  // 支付按钮点击事件
  onPay() {
    const selectedItems = this.data.cartList.filter(item => item.checked);
    if (selectedItems.length === 0 || this.data.totalPrice === 0) {
      wx.showToast({
        title: '请选择商品',
        icon: 'none',
        duration: 1500
      });
      return;
    }

    wx.showModal({
      title: '提示',
      content: '订单提交成功，是否支付？',
      success: (res) => {
        if (res.confirm) {
          // 用户点击确定，跳转到支付页面
          wx.navigateTo({
            url: `/pages/orderConfirm/orderConfirm?selectedItems=${JSON.stringify(selectedItems)}&totalPrice=${this.data.totalPrice}`
          });
        }
        // 用户点击取消，不做任何操作，弹窗会自动关闭
      }
    });
  },

  // 清空购物车
  clearCart() {
      const app = getApp();
      // 清空 globalData 中的 cartList
      app.globalData.cartList = [];
      // 清空页面数据中的 cartList
      this.setData({
          cartList: [],
          totalPrice: 0
      }, () => {
          console.log('购物车数据已清空，全局 cartList:', app.globalData.cartList);
          console.log('页面 cartList:', this.data.cartList);
          wx.showToast({
              title: '购物车已清空',
              icon: 'success',
              duration: 1500
          });
      });
  },

  removePaidItems() {
    const { cartList, paidItemIds } = this.data;
    console.log('接收到的已支付商品的 ID 数组:', paidItemIds);
    const newCartList = cartList.filter(item => !paidItemIds.includes(item.id));
    console.log('过滤后的购物车列表:', newCartList);
    this.setData({
        cartList: newCartList
    });
    this.calculateTotalPrice();
    const app = getApp();
    app.globalData.cartList = newCartList;
},

  // 全选功能
  toggleAllCheck() {
      const cartList = this.data.cartList;
      const newAllChecked = !this.data.allChecked;
      cartList.forEach(item => {
          item.checked = newAllChecked;
      });
      this.setData({
          cartList,
          allChecked: newAllChecked
      });
      const app = getApp();
      app.globalData.cartList = cartList;
      this.calculateTotalPrice();
  },
})