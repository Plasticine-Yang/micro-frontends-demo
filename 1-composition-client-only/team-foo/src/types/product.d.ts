type ProductId = number

interface IProduct {
  id: ProductId
  name: string
  price: number
  cover: string
  /** 是否展示到商品列表中 */
  displayInList: boolean
  relatedProducts: ProductId[]
}
