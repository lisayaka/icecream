// app.js
App({
  globalData: {
    allGoods: [
      { 
        id: 1, 
        name: "大明宫月桂雪顶", 
        image:'/images/product1.png',
        type: "盛唐",
        price:19.9,
        tags:['甜蜜','醇厚'],
        checked:false,
        description: "采用进口芒果果汁，搭配特调奶盖，层次丰富。奶盖选用优质乳脂，打发至绵密，口感细腻。饮用前建议摇匀，更能体会多层次口感",
        monthlySales: 1383,
        rating: 92,
        specs: "单杯装300ml",
        expiry: "当天",
        storage: "请当天饮用，冷藏后风味更佳"
      },
      { 
        id: 2, 
        name: "开元盛世榴芒盛宴",
        image:'/images/product2.png', 
        type: "盛唐",
        price:5.9,
        tags:['浓郁','交融'],
        checked:false,
        description: "精选泰国金枕头榴莲与芒果完美搭配，搭配醇香奶油，口感丝滑。采用特制工艺，保持水果的新鲜口感，让您品尝到夏日的清爽与甜蜜",
        monthlySales: 3200,
        rating: 95,
        specs: "单杯装230ml",
        expiry: "当天",
        storage: "请当天饮用，冷藏后风味更佳"
      },
      { 
        id: 3, 
        name: "贞观遗韵蜜桃冰酪", 
        image:'/images/product3.png',
        type: "蛋挞",
        price:3,
        tags:['细腻','爽滑'],
        checked:false 
      },
      { 
        id: 4, 
        name: "雁塔题名桂花凝雪",
        image:'/images/product4.png', 
        type: "名胜",
        price:9.9,
        tags:['诗意','经典'],
        checked:false,
        description: "融合醇厚桂花香与细腻冰爽口感，带您领略跨越时空的美味",
        monthlySales: 2000,
        rating: 98,
        specs: "4寸",
        expiry: "-18℃以下保存3天",
        storage: "请保持冷藏"
      },
      { 
        id: 5, 
        name: "华清池畔荔枝雪绒", 
        image:'/images/product5.png',
        type: "名胜",
        price:11.9,
        tags:['浪漫','清甜'],
        checked:false,
        description: "新鲜荔枝与优质茶底的完美融合，顶部配以绵密雪顶",
        monthlySales: 3139,
        rating: 95,
        specs: "单杯装300ml",
        expiry: "当天",
        storage: "请当天饮用，冷藏后风味更佳"
      },
      { 
        id: 6, 
        name: "敦煌飞天椰香幻梦", 
        image:'/images/product6.png',
        type: "梦幻",
        price:12.9,
        tags:['奇幻','艺术'],
        checked:false,
        description: "浓郁的椰香在舌尖散开，带你在甜蜜中领略敦煌文化的独特魅力",
        monthlySales: 2689,
        rating: 98,
        specs: "单杯装230ml",
        expiry: "-18℃以下保存2天",
        storage: "请保持冷藏"
      },
      { 
        id: 7, 
        name: "长安夜宴葡萄凝露", 
        image:'/images/product7.png',
        type: "梦幻",
        price:15.9,
        tags:['诱惑','甜香'],
        checked:false,
        description: "精选新鲜葡萄，搭配香浓奶油，口感细腻丝滑",
        monthlySales: 2893,
        rating: 98,
        specs: "单杯装 280ml",
        expiry: "-18℃以下保存7天",
        storage: "请保持冷藏"
      },
      { 
        id: 8, 
        name: "滕王阁序柚香雅韵", 
        image:'/images/product8.png',
        type: "名胜",
        price:2,
        tags:['文雅','经典','诗意'],
        checked:false,
        description: "精选优质柠檬，搭配特制雅韵茶底，清新爽口。采用独特工艺，口感层次丰富，冰镇后更显清爽。夏日解暑必备饮品",
        monthlySales: 2890,
        rating: 98,
        specs: "单杯装300ml",
        expiry: "当天",
        storage: "请当天饮用，冷藏后风味更佳"
      },
      { 
        id: 9, 
        name: "昭陵六骏可可劲旅", 
        image:'/images/product9.png',
        type: "古韵",
        price:7,
        tags:['气魄','能量'],
        checked:false,
        description: "将浓郁醇厚的可可风味与生动鲜活的历史文化相融合，带您开启一场跨越千年的甜蜜征程",
        monthlySales: 2778,
        rating: 95,
        specs: "单杯装230ml",
        expiry: "-18℃以下保存2天",
        storage: "请保持冷藏"
      },
      { 
        id: 10, 
        name: "乐游原上樱桂绮梦", 
        image:'/images/product10.png',
        type: "古韵",
        price:22.9,
        tags:['浓郁','特色'],
        checked:false,
        description: "将樱花的清甜与桂花的芬芳巧妙融合，带您在舌尖开启一场跨越四季、穿越时空的浪漫之旅",
        monthlySales: 2689,
        rating: 95,
        specs: "筒装230ml",
        expiry: "-18℃以下保存3天",
        storage: "请保持冷藏"
      },
      { 
        id: 11, 
        name: "沉香亭北蜜桃琼浆", 
        image:'/images/product11.png',
        type: "名胜",
        price:11.9,
        tags:['果肉','细腻'],
        checked:false,
        description: "精选北方蜜桃，搭配特制琥珀糖浆，口感清爽，香甜可口",
        monthlySales: 2560,
        rating: 92,
        specs: "单杯装230ml",
        expiry: "-18℃以下保存3天",
        storage: "请保持冷藏"
      },
    ],
    cartList:[],
    orderList:[]
  },

  onLaunch: function() {
    // 尝试从本地存储加载购物车数据
    try {
      const cartList = wx.getStorageSync('cartList');
      if (cartList) {
        this.globalData.cartList = cartList;
        console.log('从本地存储加载购物车数据:', cartList);
      }
    } catch (e) {
      console.error('加载购物车数据失败:', e);
    }

    // 尝试从本地存储加载订单数据
    try {
      const orderList = wx.getStorageSync('orderList');
      if (orderList) {
        this.globalData.orderList = orderList;
        console.log('从本地存储加载订单数据:', orderList);
      }
    } catch (e) {
      console.error('加载订单数据失败:', e);
    }
  }
})
