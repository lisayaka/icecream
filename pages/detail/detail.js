Page({
  data: {
      goodsDetail: {}
  },
  onLoad(options) {
      const goodsId = options.id;
      const allGoods = getApp().globalData.allGoods;
      const goodsDetail = allGoods.find(good => good.id === parseInt(goodsId));
      if (goodsDetail) {
          this.setData({
              goodsDetail: goodsDetail
          });
      }
  },
  addToCart() {
    const { goodsDetail } = this.data;
    const app = getApp();
    const cartList = app.globalData.cartList;
    const index = cartList.findIndex(item => item.id === goodsDetail.id);
    if (index === -1) {
      goodsDetail.quantity = 1;
      goodsDetail.checked = false;
      cartList.push(goodsDetail);
    } else {
      cartList[index].quantity++;
    }
    app.globalData.cartList = cartList;
    wx.showToast({
      title: '已加入购物车',
      icon: 'success',
      duration: 1500
    });
  },
  buyNow() {
    const item = this.data.goodsDetail;   
     wx.navigateTo({
         url: `/pages/orderConfirm/orderConfirm?selectedItems=${JSON.stringify([item])}&totalPrice=${item.price}`
     });
}
});