interface IState {
  // 当前展示的商品 id
  productId: number
  // 购物车中商品数量
  basketCount: number
}

type SetStateCallback = (state: IState) => void
type SetState = (cb: SetStateCallback) => void
