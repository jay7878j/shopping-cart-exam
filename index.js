const productsList = [
  {
    id: 1,
    productImg: "./products/laptop.jpg",
    price: "78000",
    title: "laptop",
    quantity: 1,
  },
  {
    id: 2,
    productImg: "./products/mobile.jpg",
    price: "25000",
    title: "mobile",
    quantity: 1,
  },
  {
    id: 3,
    productImg: "./products/headphones.jpg",
    price: "2599",
    title: "headphones",
    quantity: 1,
  },
  {
    id: 4,
    productImg: "./products/joystick.jpg",
    price: "1500",
    title: "joystick",
    quantity: 1,
  },
  {
    id: 5,
    productImg: "./products/vr headset.jpg",
    price: "14000",
    title: "vr headset",
    quantity: 1,
  },
  {
    id: 6,
    productImg: "./products/tablet.jpg",
    price: "32000",
    title: "tablet",
    quantity: 1,
  },
  {
    id: 7,
    productImg: "./products/camera.jpg",
    price: "58000",
    title: "camera",
    quantity: 1,
  },
  {
    id: 8,
    productImg: "./products/earphone.jpg",
    price: "3600",
    title: "earphone",
    quantity: 1,
  },
  {
    id: 9,
    productImg: "./products/mouse.jpg",
    price: "400",
    title: "mouse",
    quantity: 1,
  },
];

let cartList = [];

let productsListContainer = document.querySelector("#productsListContainer");
let filterContainer = document.querySelector("#filterContainer");
let cartListContainer = document.querySelector("#cartListContainer");
let cartSummaryConatiner = document.querySelector("#cartSummaryConatiner");

function addToCart(product) {
  const productObject = cartList.find(
    (eachcartItem) => eachcartItem.id === product.id
  );

  if (productObject === undefined) {
    cartList.push(product);
  } else {
    let newCartList = cartList.map((each) => {
      if (each.id === product.id) {
        return { ...each, quantity: each.quantity + 1 };
      } else {
        return each;
      }
    });
    cartList = newCartList;
  }
  //   console.log(cartList);
  renderProducts(cartListContainer, cartList);
  renderFilter();
  renderCartSummary(cartListContainer, cartList);
}

function removeCartItem(product) {
  const filterList = cartList.filter((each) => each.id !== product.id);
  cartList = filterList;
  renderProducts(cartListContainer, cartList);
  renderCartSummary();
  //   console.log(cartList);
}

function renderProducts(container, list) {
  container.textContent = "";
  list.forEach((eachProduct) => {
    let productListItem = document.createElement("li");
    productListItem.classList.add("product-list-item");
    container.appendChild(productListItem);

    let productInfo = document.createElement("div");
    productInfo.classList.add("product-info");
    productListItem.appendChild(productInfo);

    let productImgEl = document.createElement("img");
    productImgEl.src = eachProduct.productImg;
    productImgEl.alt = eachProduct.title;
    productImgEl.classList.add("product-img");
    productInfo.appendChild(productImgEl);

    let productDetails = document.createElement("div");
    productDetails.classList.add("product-details");
    productInfo.appendChild(productDetails);

    let productTitleEl = document.createElement("h2");
    productTitleEl.textContent = eachProduct.title;
    productTitleEl.classList.add("product-title");
    productDetails.appendChild(productTitleEl);

    let productPriceEl = document.createElement("p");
    productPriceEl.textContent = `Rs. ${
      eachProduct.price * eachProduct.quantity
    }`;
    productPriceEl.classList.add("product-price");
    productDetails.appendChild(productPriceEl);

    let isCart = container === cartListContainer;
    if (isCart) {
      let deleteEl = document.createElement("button");
      deleteEl.textContent = "X";
      deleteEl.classList.add("delete-button");
      productDetails.appendChild(deleteEl);
      deleteEl.addEventListener("click", () => removeCartItem(eachProduct));
    }

    let productBtnContainer = document.createElement("div");
    productBtnContainer.classList.add("product-btn-conatiner");
    productListItem.appendChild(productBtnContainer);

    if (!isCart) {
      let addToCartBtn = document.createElement("button");
      addToCartBtn.textContent = "Add to Cart";
      addToCartBtn.classList.add("product-btn");
      addToCartBtn.addEventListener("click", () => addToCart(eachProduct));
      productBtnContainer.appendChild(addToCartBtn);
    }
  });
}

function onProductSeacrh(e) {
  let userSearchvalue = e.target.value;
  //   console.log(e.target.value);
  let filterList = cartList.filter((each) => {
    if (
      each.price * each.quantity <= parseInt(userSearchvalue) ||
      each.title.toLowerCase().includes(userSearchvalue.toLowerCase())
    ) {
      return each;
    }
  });
  renderProducts(cartListContainer, filterList);
  console.log(cartList);
}

function renderFilter() {
  filterContainer.textContent = "";
  console.log(cartList);
  let leftFilterSection = document.createElement("div");
  filterContainer.appendChild(leftFilterSection);

  let searchBox = document.createElement("input");
  searchBox.type = "text";
  searchBox.addEventListener("input", onProductSeacrh);
  searchBox.placeholder = "Search by Price or Name";
  searchBox.classList.add("input-search-box");
  leftFilterSection.appendChild(searchBox);

  let rightFilterSection = document.createElement("div");
  filterContainer.appendChild(rightFilterSection);

  let clearCart = document.createElement("button");
  clearCart.classList.add("clear-cart-button");
  clearCart.textContent = "Clear cart X";
  rightFilterSection.appendChild(clearCart);

  clearCart.addEventListener("click", () => {
    cartList = [];
    renderProducts(cartListContainer, cartList);
    renderCartSummary();
  });
}

function renderCartSummary() {
  cartSummaryConatiner.textContent = "";
  let price = 0;
  cartList.forEach((each) => {
    price += each.price * each.quantity;
  });

  console.log(price);

  let avg = 0;
  if (price !== 0) {
    avg = parseInt(price / cartList.length);
  }

  let avgCartItem = document.createElement("div");
  avgCartItem.classList.add("cart-summary");
  cartSummaryConatiner.appendChild(avgCartItem);

  let avgCartHeading = document.createElement("h2");
  avgCartHeading.textContent = "Average Product Price";
  avgCartItem.appendChild(avgCartHeading);

  let avgCartPrice = document.createElement("h2");
  avgCartPrice.textContent = "Rs. " + avg;
  avgCartItem.appendChild(avgCartPrice);

  let horizontal = document.createElement("hr");
  horizontal.classList.add("hr-line");
  cartSummaryConatiner.appendChild(horizontal);

  let totalPrice = document.createElement("div");
  totalPrice.classList.add("cart-summary");
  cartSummaryConatiner.appendChild(totalPrice);

  let totalCartHeading = document.createElement("h2");
  totalCartHeading.textContent = "Total Products Price";
  totalPrice.appendChild(totalCartHeading);

  let totalCartPrice = document.createElement("h2");
  totalCartPrice.textContent = "Rs. " + price;
  totalPrice.appendChild(totalCartPrice);
}

renderFilter();
renderProducts(productsListContainer, productsList);
renderCartSummary();
