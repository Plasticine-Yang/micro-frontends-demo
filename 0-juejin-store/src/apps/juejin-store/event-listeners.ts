interface Options {
  setState: SetState
  rerender: () => void
}

function createEventListeners({ setState, rerender }: Options) {
  function addEventListeners() {
    const $productList = document.querySelector<HTMLElement>('.product-list')!
    const $purchaseBtn =
      document.querySelector<HTMLButtonElement>('.purchase-btn')!
    const $relatedProductList = document.querySelector<HTMLElement>(
      '.related-product-list',
    )!

    $productList.addEventListener('click', handleChangeProduct)
    $purchaseBtn.addEventListener('click', handlePurchaseProduct)
    $relatedProductList.addEventListener('click', handleRelatedProductClick)
  }

  function removeEventListeners() {
    const $productList = document.querySelector<HTMLElement>('.product-list')!
    const $purchaseBtn =
      document.querySelector<HTMLButtonElement>('.purchase-btn')!
    const $relatedProductList = document.querySelector<HTMLElement>(
      '.related-product-list',
    )!

    $productList.removeEventListener('click', handleChangeProduct)
    $purchaseBtn.removeEventListener('click', handlePurchaseProduct)
    $relatedProductList.removeEventListener('click', handleRelatedProductClick)
  }

  /**
   * @description 点击商品列表项切换商品
   */
  function handleChangeProduct(e: MouseEvent) {
    const productId = Number((e.target as HTMLImageElement).dataset.productId!)

    setState(state => {
      state.productId = productId
    })

    rerender()
  }

  /**
   * @description 购买商品
   */
  function handlePurchaseProduct() {
    setState(state => state.basketCount++)

    rerender()
  }

  /**
   * @description 点击关联商品时切换至关联商品的详情 -- 逻辑与商品列表中的商品切换一致
   */
  const handleRelatedProductClick = handleChangeProduct

  return {
    addEventListeners,
    removeEventListeners,
  }
}

export default createEventListeners
