interface Options {
  setState: SetState
  rerender: () => void
}

function createEventListeners({ setState, rerender }: Options) {
  // 添加或者移除事件监听函数
  function manageEventListeners(mode: 'add' | 'remove') {
    const $productList = document.querySelector<HTMLElement>('.product-list')!
    const $relatedProductList = document.querySelector<HTMLElement>(
      '.related-product-list',
    )!

    const manage = mode === 'add' ? 'addEventListener' : 'removeEventListener'

    $productList[manage]('click', handleChangeProduct as any)
    $relatedProductList[manage]('click', handleRelatedProductClick as any)
  }

  function addEventListeners() {
    manageEventListeners('add')
  }

  function removeEventListeners() {
    manageEventListeners('remove')
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
   * @description 点击关联商品时切换至关联商品的详情 -- 逻辑与商品列表中的商品切换一致
   */
  const handleRelatedProductClick = handleChangeProduct

  return {
    addEventListeners,
    removeEventListeners,
  }
}

export default createEventListeners
