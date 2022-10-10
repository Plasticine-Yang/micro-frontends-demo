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
    relatedProducts: [2, 3, 4],
  },

  // ============ 包品类 ============
  {
    id: 6,
    name: '稀土掘金—Who Cares系列「丢掉包袱」杜邦特包',
    price: 119,
    cover: 'juejin-dupont-bag-1.jpg',
    displayInList: true,
    relatedProducts: [2, 3, 4],
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
 * @description 获取商品的关联商品
 * @param id 商品 id
 */
const getRelatedProducts = (id: ProductId): (IProduct | undefined)[] => {
  const product = getProductById(id)

  if (product) {
    return product.relatedProducts.map(getProductById)
  }

  return []
}

/**
 * @description 获取展示在商品列表中的商品 -- 即 displayInList 属性为 true 的商品
 */
const getDisplayProductList = () => {
  return products.filter(product => product.displayInList)
}

export { products, getProductById, getRelatedProducts, getDisplayProductList }
