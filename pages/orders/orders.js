const app = getApp();

Page({
  data: {
    orderList: []
  },

  // 加载订单数据
  loadOrderData() {
    // 先尝试从全局变量获取
    let orderList = app.globalData.orderList || [];
    
    // 如果全局变量为空，尝试从本地存储获取
    if (!orderList || orderList.length === 0) {
      try {
        const storageOrderList = wx.getStorageSync('orderList');
        if (storageOrderList && storageOrderList.length > 0) {
          orderList = storageOrderList;
          // 同步到全局变量
          app.globalData.orderList = orderList;
        }
      } catch (e) {
        console.error('从本地存储获取订单数据失败:', e);
      }
    }
    
    console.log('加载的订单数据:', orderList);
    
    this.setData({
      orderList: orderList
    });
  },
  
  onLoad() {
    this.loadOrderData();
  },
  
  onShow() {
    this.loadOrderData();
  },
  
  // 查看订单详情
  viewOrderDetail(e) {
    const orderId = e.currentTarget.dataset.id;
    // 可以跳转到订单详情页
    // wx.navigateTo({
    //   url: `/pages/orderDetail/orderDetail?id=${orderId}`
    // });
    console.log('查看订单详情:', orderId);
  }
});