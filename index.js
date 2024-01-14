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

const filterOptions = [
  { id: "NAME", displayText: "Name" },
  { id: "PRICE", displayText: "Price" },
];

const navLinks = [
  {
    id: "#mainContainer",
    smNavLink: "fa-solid",
    smNavLink2: "fa-house",
    mdNavlink: "Home",
  },
  {
    id: "#products",
    smNavLink: "fa-solid",
    smNavLink2: "fa-store",
    mdNavlink: "Products",
  },
  {
    id: "#cartSection",
    smNavLink: "fa-solid",
    smNavLink2: "fa-cart-shopping",
    mdNavlink: "Cart",
  },
  {
    id: "#cartSummaryConatiner",
    smNavLink: "fa-solid",
    smNavLink2: "fa-sack-dollar",
    mdNavlink: "Cart Summary",
  },
  {
    id: "#footerSection",
    smNavLink: "fa-solid",
    smNavLink2: "fa-id-card-clip",
    mdNavlink: "Contact",
  },
];

const randomCartMsgsList = [
  "Enhance your cart with exciting finds – start shopping now!",
  "Give your cart a boost! Explore our fantastic products.",
  "Your cart awaits! Discover a world of amazing items.",
  "Add joy to your cart with must-have products – explore now.",
  "Ready to fill your cart with excitement? Check out our latest arrivals.",
  "Is your cart craving something special? Find it here!",
  "Your cart misses you! Browse our products for unique treasures.",
  "Time to shop! Your cart is eager for some fantastic additions.",
  "Add vibrancy to your cart – explore our catalog for excitement!",
  "Spruce up your cart with amazing products. Start your journey now!",
];

let productsListContainer = document.querySelector("#productsListContainer");
let filterContainer = document.querySelector("#filterContainer");
let cartListContainer = document.querySelector("#cartListContainer");
let cartSummaryConatiner = document.querySelector("#cartSummaryConatiner");
let cartEmptyTitle = document.querySelector("#cartEmptyTitle");
let footerSection = document.querySelector("#footerSection");
let headerEl = document.querySelector("#header");
let smNavLinkContainer = document.createElement("nav");
let mdNavLinkContainer = document.createElement("nav");

function addToCart(product) {
  const productObject = cartList.find(
    (eachcartItem) => eachcartItem.id === product.id
  );

  if (productObject === undefined) {
    cartList.push(product);
  } else {
    cartList = cartList.map((each) => {
      if (each.id === product.id) {
        return { ...each, quantity: each.quantity + 1 };
      } else {
        return each;
      }
    });
  }
  //   console.log(cartList);
  renderProducts(cartListContainer, cartList);
  renderFilter();
  renderCartSummary(cartListContainer, cartList);
  renderSmallDeviceNavLinks();
  renderlargeDeviceNavLinks();
}

function removeCartItem(product) {
  const filterList = cartList.filter((each) => each.id !== product.id);
  cartList = filterList;
  renderProducts(cartListContainer, cartList);
  renderCartSummary();
  renderSmallDeviceNavLinks();
  renderlargeDeviceNavLinks();
  //   console.log(cartList);
}

function decrementQuantity(product) {
  if (product.quantity === 1) {
    cartList = cartList.filter((each) => each.id !== product.id);
  } else {
    cartList = cartList.map((each) => {
      if (each.id === product.id) {
        return { ...each, quantity: each.quantity - 1 };
      } else {
        return each;
      }
    });
  }
  renderProducts(cartListContainer, cartList);
  renderCartSummary();
  renderSmallDeviceNavLinks();
  renderlargeDeviceNavLinks();
}

function incrementQuantity(product) {
  const decrementList = cartList.map((each) => {
    if (each.id === product.id) {
      return { ...each, quantity: each.quantity + 1 };
    } else {
      return each;
    }
  });
  cartList = decrementList;
  // console.log(decrementList);
  renderProducts(cartListContainer, cartList);
  renderCartSummary();
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

      let quantityShowContainer = document.createElement("div");
      quantityShowContainer.classList.add("quantity-btn-container");
      productDetails.appendChild(quantityShowContainer);

      let decrementEl = document.createElement("button");
      decrementEl.classList.add("quantity-adjust-button");
      decrementEl.textContent = "-";
      decrementEl.addEventListener("click", () =>
        decrementQuantity(eachProduct)
      );
      quantityShowContainer.appendChild(decrementEl);

      let showQuantityEl = document.createElement("span");
      showQuantityEl.textContent = eachProduct.quantity;
      showQuantityEl.classList.add("show-quantity-text");
      quantityShowContainer.appendChild(showQuantityEl);

      let incrementEl = document.createElement("button");
      incrementEl.textContent = "+";
      incrementEl.addEventListener("click", () =>
        incrementQuantity(eachProduct)
      );
      incrementEl.classList.add("quantity-adjust-button");
      quantityShowContainer.appendChild(incrementEl);
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
  //   console.log(cartList);
}

function onOptionChange(event) {
  const userDropDownOption = event.target.value;
  let sortedList = [];
  switch (userDropDownOption) {
    case filterOptions[0].id:
      sortedList = cartList.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case filterOptions[1].id:
      sortedList = cartList.sort((a, b) => a.price - b.price);
      break;
    default:
      sortedList = cartList;
      break;
  }
  if (sortedList.length !== 0) {
    renderProducts(cartListContainer, sortedList);
  }
}

function renderFilter() {
  filterContainer.textContent = "";
  //   console.log(cartList);
  let leftFilterSection = document.createElement("div");
  leftFilterSection.classList.add("input-search-section");
  filterContainer.appendChild(leftFilterSection);

  let searchBox = document.createElement("input");
  searchBox.type = "text";
  searchBox.addEventListener("input", onProductSeacrh);
  searchBox.placeholder = "Search by Price or Name";
  searchBox.classList.add("input-search-box");
  leftFilterSection.appendChild(searchBox);

  let searchButton = document.createElement("button");
  searchButton.classList.add("search-button");
  searchButton.addEventListener("click", onProductSeacrh);
  leftFilterSection.appendChild(searchButton);

  let searchIcon = document.createElement("i");
  searchIcon.classList.add("fa-solid", "fa-magnifying-glass");
  searchButton.appendChild(searchIcon);

  let rightFilterSection = document.createElement("div");
  rightFilterSection.classList.add("right-filter-section");
  filterContainer.appendChild(rightFilterSection);

  let selectEl = document.createElement("select");
  selectEl.classList.add("drop-down");
  selectEl.addEventListener("change", onOptionChange);
  rightFilterSection.appendChild(selectEl);

  let optionEl = document.createElement("option");
  optionEl.classList.add("drop-down-option");
  optionEl.value = "SORTBY";
  optionEl.textContent = "Sort By";
  selectEl.appendChild(optionEl);

  filterOptions.forEach((each) => {
    let optionEl = document.createElement("option");
    optionEl.value = each.id;
    optionEl.classList.add("drop-down-option");
    optionEl.textContent = each.displayText;
    selectEl.appendChild(optionEl);
  });

  let clearCart = document.createElement("button");
  clearCart.classList.add("clear-cart-button");
  clearCart.textContent = "Clear Cart X";
  rightFilterSection.appendChild(clearCart);

  clearCart.addEventListener("click", () => {
    cartList = [];
    renderProducts(cartListContainer, cartList);
    renderCartSummary();
    renderSmallDeviceNavLinks();
    renderlargeDeviceNavLinks();
    let emptyCartmsgEl = document.createElement("p");
    emptyCartmsgEl.classList.add("empty-cart-title");
    cartListContainer.appendChild(emptyCartmsgEl);
    emptyCartmsgEl.textContent =
      randomCartMsgsList[Math.floor(Math.random() * randomCartMsgsList.length)];
  });
}

function renderCartSummary() {
  cartSummaryConatiner.textContent = "";
  let price = 0;
  cartList.forEach((each) => {
    price += each.price * each.quantity;
  });

  //   console.log(price);

  let quantity = 0;
  let avg = 0;
  if (price !== 0) {
    cartList.forEach((each) => {
      quantity += each.quantity;
    });
    avg = Math.ceil(price / quantity);
  }
  //   console.log("avg: ", avg);

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

function renderSmallDeviceNavLinks() {
  smNavLinkContainer.textContent = "";
  smNavLinkContainer.classList.add("sm-nav-links", "nav-links");
  headerEl.appendChild(smNavLinkContainer);

  navLinks.forEach((each) => {
    let smNavLinkEl = document.createElement("a");
    smNavLinkEl.href = each.id;
    smNavLinkContainer.appendChild(smNavLinkEl);

    if (each.id === "#cartSection") {
      let smNavLinkIcon = document.createElement("i");
      smNavLinkIcon.classList.add(each.smNavLink, each.smNavLink2, "icon");
      smNavLinkEl.appendChild(smNavLinkIcon);

      let smNavLinkSub = document.createElement("sub");
      smNavLinkSub.textContent = cartList.length;
      smNavLinkSub.classList.add("cart-items-count");
      smNavLinkEl.appendChild(smNavLinkSub);
    } else {
      let smNavLinkIcon = document.createElement("i");
      smNavLinkIcon.classList.add(each.smNavLink, each.smNavLink2, "icon");
      smNavLinkEl.appendChild(smNavLinkIcon);
    }
  });
}

function renderlargeDeviceNavLinks() {
  mdNavLinkContainer.textContent = "";
  mdNavLinkContainer.classList.add("md-nav-links", "nav-links");
  headerEl.appendChild(mdNavLinkContainer);

  navLinks.forEach((each) => {
    if (each.id === "#cartSection") {
      let mdNavLinkEl = document.createElement("a");
      mdNavLinkEl.textContent = each.mdNavlink;
      mdNavLinkEl.href = each.id;
      mdNavLinkContainer.appendChild(mdNavLinkEl);

      let smNavLinkSub = document.createElement("sub");
      smNavLinkSub.textContent = cartList.length;
      smNavLinkSub.classList.add("cart-items-count");
      mdNavLinkEl.appendChild(smNavLinkSub);
    } else {
      let mdNavLinkEl = document.createElement("a");
      mdNavLinkEl.textContent = each.mdNavlink;
      mdNavLinkEl.href = each.id;
      mdNavLinkContainer.appendChild(mdNavLinkEl);
    }
  });
}

function renderFooter() {
  let footerName = document.createElement("span");
  footerName.classList.add("footer-name");
  footerName.textContent = "Ajay Kumar - Frontend Developer, Marmeto";
  footerSection.appendChild(footerName);
}

renderSmallDeviceNavLinks();
renderlargeDeviceNavLinks();
renderFilter();
renderProducts(productsListContainer, productsList);
renderCartSummary();
renderFooter();
