interface IState {
  productId: number
}

type SetStateCallback = (state: IState) => void
type SetState = (cb: SetStateCallback) => void
