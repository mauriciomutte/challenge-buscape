//
// V A R I A B L E S
//

const menuContent = document.querySelector('.js__menu-content')
let cart = []
let cont = 0
let subtotalCashValue = 0
let subtotalInstallmentsValue = 0

//
// F U N C T I O N S
//

function menuToggle() {
  const btn = document.querySelector('.headerMenu-btn')
  const menuContent = document.querySelector('.menu-content')

  btn.addEventListener('click', function() {
    menuContent.classList.toggle('menu-content--show')
  })
}
menuToggle()

function product() {
  const require = new XMLHttpRequest()
  require.open('GET', './products.json', true)
  require.onload = function() {
    const productMain = document.getElementById('productMain')
    const productItems = JSON.parse(this.responseText).items

    for (let i = 0; i < productItems.length; i++) {

      //
      // productImage
      //

      const product = document.createElement('div')
      product.classList.add('product')
      productMain.appendChild(product)

      const productImage = document.createElement('div')
      productImage.classList.add('product__image')
      product.appendChild(productImage)

      //productImageSelect
      const productImageSelect = document.createElement('div')
      productImageSelect.classList.add('product__image__select')
      productImage.appendChild(productImageSelect)

      for (let z = 0; z < productItems[i].product.images.length; z++) {
        const productImageSelectBtn = document.createElement('button')
        if (z === 0){
          productImageSelectBtn.classList.add('image__select__btn--selected')
        }
        productImageSelectBtn.classList.add('image__select__btn')
        productImageSelectBtn.onclick = function() {
          productImagePrincipal.src = productItems[i].product.images[z]
        }
        productImageSelect.appendChild(productImageSelectBtn)

        const productImageSelectImg = document.createElement('img')
        productImageSelectImg.classList.add('image__select__img')
        productImageSelectImg.src = productItems[i].product.images[z]
        productImageSelectBtn.appendChild(productImageSelectImg)
      }

      //productImagePrincipal
      const productImagePrincipal = document.createElement('img')
      productImagePrincipal.classList.add('product__image__principal')
      productImagePrincipal.src = productItems[i].product.images[0]
      productImage.appendChild(productImagePrincipal)

      //
      // productInfo
      //

      const productInfo = document.createElement('div')
      productInfo.classList.add('product__info')
      product.appendChild(productInfo)

      // productInfoName
      const productInfoName = document.createElement('h2')
      productInfoName.classList.add('product__info__name')
      productInfoName.innerHTML = productItems[i].product.name
      productInfo.appendChild(productInfoName)

      // productInfoPrice
      const productInfoPrice = document.createElement('div')
      productInfoPrice.classList.add('product__info__price')
      productInfo.appendChild(productInfoPrice)

      // productInfoPriceBest
      const productInfoPriceBest = document.createElement('span')
      productInfoPriceBest.classList.add('info__prince__bestPrice')
      productInfoPriceBest.innerHTML = 'Melhor preço'
      productInfoPrice.appendChild(productInfoPriceBest)

      // productInfoPriceInstallments
      const productInfoPriceInstallments = document.createElement('p')
      productInfoPriceInstallments.classList.add('info__price__installments')
      productInfoPriceInstallments.innerHTML = productItems[i].product.price.installments + 'x R$ ' + productItems[i].product.price.installmentValue.toFixed(2).toString().replace(".", ",")
      productInfoPrice.appendChild(productInfoPriceInstallments)

      // productInfoPriceCash
      const productInfoPriceCash = document.createElement('p')
      productInfoPriceCash.classList.add('info__price__cash')
      productInfoPriceCash.innerHTML = 'ou R$ ' + productItems[i].product.price.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) + ' à vista'
      productInfoPrice.appendChild(productInfoPriceCash)

      // productInfoBtn
      const productInfoBtn = document.createElement('button')
      productInfoBtn.classList.add('product__info__btn')
      productInfoBtn.innerHTML = 'Adicionar ao carrinho'
      productInfoBtn.onclick = function() {
        cart.push(productItems[i].product)
        for (let i = 0; i < cart.length; i++) {
          subtotalCashValue += cart[i].price.value
          subtotalInstallmentsValue += cart[i].price.installmentValue

          menuContentProduct(
            cart[i].images[0], 
            cart[i].name, 
            cart[i].price.installments, 
            cart[i].price.installmentValue, 
            cart[i].price.value
          )
        }
        document.querySelector('.js__cart-installments').innerHTML = subtotalInstallmentsValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
        document.querySelector('.js__cart-cash').innerHTML = subtotalCashValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
        document.querySelector('.menuBtn-cont').innerHTML = ++cont
        cart = []
      }
      productInfo.appendChild(productInfoBtn)
    }
  }
  require.send()
}
product()

  
function menuContentProduct(productImg, productName, productPriceInstallments, productPriceInstallmentsValue, productPriceCash) {
  const menuContentProduct = document.createElement('div')
  menuContentProduct.classList.add('menuContent-product')
  menuContent.appendChild(menuContentProduct)

  const wrap = document.createElement('div')
  wrap.classList.add('wrap')
  menuContentProduct.appendChild(wrap)

  const menuContentProductImg = document.createElement('img')
  menuContentProductImg.classList.add('product-img')
  menuContentProductImg.src = productImg
  wrap.appendChild(menuContentProductImg)

  const menuContentProductInfo = document.createElement('div')
  menuContentProductInfo.classList.add('product-info')
  wrap.appendChild(menuContentProductInfo)

  const menuContentProductInfoName = document.createElement('h3')
  menuContentProductInfoName.classList.add('product-info-name')
  menuContentProductInfoName.innerText = productName
  menuContentProductInfo.appendChild(menuContentProductInfoName)

  const menuContentProductInfoPriceInstallments = document.createElement('span')
  menuContentProductInfoPriceInstallments.classList.add('product-info-price')
  menuContentProductInfoPriceInstallments.innerText = productPriceInstallments + 'x R$ ' + productPriceInstallmentsValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
  menuContentProductInfo.appendChild(menuContentProductInfoPriceInstallments)

  const menuContentProductInfoPriceCash = document.createElement('span')
  menuContentProductInfoPriceCash.classList.add('product-info-price')
  menuContentProductInfoPriceCash.innerText = 'ou ' + productPriceCash.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) + ' à vista'
  menuContentProductInfo.appendChild(menuContentProductInfoPriceCash)

  const menuContentProductRemove = document.createElement('div')
  menuContentProductRemove.classList.add('product-remove')
  wrap.appendChild(menuContentProductRemove)

  const menuContentProductRemoveBtn = document.createElement('button')
  menuContentProductRemoveBtn.classList.add('product-remove-btn')
  menuContentProductRemoveBtn.innerHTML = 'X'
  menuContentProductRemoveBtn.onclick = function() {
    menuContentProduct.remove()
    
    subtotalCashValue -= productPriceCash
    subtotalInstallmentsValue -= productPriceInstallmentsValue

    document.querySelector('.js__cart-installments').innerHTML = subtotalInstallmentsValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
    document.querySelector('.js__cart-cash').innerHTML = subtotalCashValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
    document.querySelector('.menuBtn-cont').innerHTML = --cont
  }
  menuContentProductRemove.appendChild(menuContentProductRemoveBtn)
}