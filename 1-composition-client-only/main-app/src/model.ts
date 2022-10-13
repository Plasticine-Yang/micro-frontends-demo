const products: IProduct[] = [
  // ============ 杯子品类 ============
  {
    id: 1,
    name: 'JUEJIN FRIENDS 「码赛克」码克杯',
    price: 69,
    cover: 'juejin-mug.jpg',
    displayInList: true,
    relatedProducts: [2, 3, 4],
  },
  {
    id: 2,
    name: '稀土掘金—Who Cares系列「我真的不困」咖啡杯',
    price: 119,
    cover: 'juejin-coffee-cup.jpg',
    displayInList: false,
    relatedProducts: [1, 3, 4],
  },
  {
    id: 3,
    name: '虎虎生金系列-保温杯',
    price: 129,
    cover: 'juejin-vaccum-cup.jpg',
    displayInList: false,
    relatedProducts: [1, 2, 4],
  },
  {
    id: 4,
    name: '字节咖啡保温杯',
    price: 129,
    cover: 'juejin-bytedance-coffee-vaccum-cup.png',
    displayInList: false,
    relatedProducts: [1, 2, 3],
  },

  // ============ 手机支架品类 ============
  {
    id: 5,
    name: '稀土掘金—Who Cares系列「挺你」手机支架/桌面状态栏 -- 开心打工中',
    price: 39.9,
    cover: 'juejin-phone-holder-happy-working.jpg',
    displayInList: true,
    relatedProducts: [6, 7, 8],
  },
  {
    id: 6,
    name: '稀土掘金—Who Cares系列「挺你」手机支架/桌面状态栏 -- Boss Talk',
    price: 39.9,
    cover: 'juejin-phone-holder-boss-talk.jpg',
    displayInList: false,
    relatedProducts: [5, 7, 8],
  },
  {
    id: 7,
    name: '稀土掘金—Who Cares系列「挺你」手机支架/桌面状态栏 -- Bug 清除中',
    price: 39.9,
    cover: 'juejin-phone-holder-bug-clearing.jpg',
    displayInList: false,
    relatedProducts: [5, 6, 8],
  },
  {
    id: 8,
    name: '稀土掘金—Who Cares系列「挺你」手机支架/桌面状态栏 -- 已下班勿 Cue',
    price: 39.9,
    cover: 'juejin-phone-holder-get-off-work.jpg',
    displayInList: false,
    relatedProducts: [5, 6, 7],
  },

  // ============ 包品类 ============
  {
    id: 9,
    name: '稀土掘金—Who Cares系列「丢掉包袱」杜邦特包',
    price: 119,
    cover: 'juejin-dupont-bag-1.jpg',
    displayInList: true,
    relatedProducts: [10, 11, 12],
  },
  {
    id: 10,
    name: '稀土掘金—Who Cares系列「丢掉包袱」杜邦特包',
    price: 119,
    cover: 'juejin-dupont-bag-2.jpg',
    displayInList: false,
    relatedProducts: [9, 11, 12],
  },
  {
    id: 11,
    name: '稀土掘金「睡眠日系列」编织袋',
    price: 69,
    cover: 'juejin-woven-bag.jpg',
    displayInList: false,
    relatedProducts: [9, 10, 12],
  },
  {
    id: 12,
    name: '稀土掘金-「解码系列」皮革帆布袋',
    price: 99,
    cover: 'juejin-canvas-bag.jpg',
    displayInList: false,
    relatedProducts: [9, 10, 11],
  },
]

/**
 * @description 根据商品 id 获取商品对象
 * @param id 商品 id
 * @returns IProduct
 */
const getProductById = (id: ProductId) => {
  return products.find(product => product.id === id)
}

/**
 * @description 获取展示在商品列表中的商品 -- 即 displayInList 属性为 true 的商品
 */
const getDisplayProductList = () => {
  return products.filter(product => product.displayInList)
}

export { products, getProductById, getDisplayProductList }
