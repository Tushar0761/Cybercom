$(document).ready(() => {
  addProductCategories();
});

function addProduct() {
  let productName = $("#productName").val();
  let productCategory = $("#productCategory").val();
  let productPrice = $("#productPrice").val();
  let prodcutDes = $("#productDes").val() || "-";

  let isAllValid = validate(productName, productCategory, Number(productPrice));

  if (isAllValid) {
    addToLocalStorage(productName, productPrice, prodcutDes, productCategory);

    alert("Saved To Product list...");
    $("#productDes , #productPrice, #productCategory , #productName").val("");
  }
}
function addToLocalStorage(name, price, des, category) {
  let time = new Date();
  let product = {
    id: time.getTime(),
    Name: name,
    Price: price,
    Description: des,
    Category: category,
  };

  let ProductList = JSON.parse(localStorage.getItem("ProductList"));

  if (ProductList) {
    ProductList = [...ProductList, product];

    localStorage.setItem("ProductList", JSON.stringify(ProductList));
  } else {
    ProductList = [product];

    localStorage.setItem("ProductList", JSON.stringify(ProductList));
  }
}

function validate(name, category, price) {
  let bool = true;

  // Validate Name
  if (name === "") {
    $("#productName").addClass("border-danger");

    $("#name-error")
      .text("Name is Required")
      .addClass("text-danger")
      .slideDown();

    bool = false;
  } else {
    $("#productName").removeClass("border-danger");

    $("#name-error").slideUp();
  }

  // Validate Category
  if (category === "") {
    $("#productCategory").addClass("border-danger");

    $("#category-error")
      .text("Category is Required")
      .addClass("text-danger")
      .slideDown();

    bool = false;
  } else {
    $("#productCategory").removeClass("border-danger");

    $("#category-error").slideUp();
  }

  // Validate Price
  if (price === 0) {
    $("#productPrice").addClass("border-danger");

    $("#price-error")
      .text("Price is Required")
      .addClass("text-danger")
      .slideDown();

    bool = false;
  } else if (price <= 0) {
    $("#productPrice").addClass("border-danger");

    $("#price-error")
      .text("Price Can Not be Negative")
      .addClass("text-danger")
      .slideDown();
    bool = false;
  } else {
    $("#productPrice").removeClass("border-danger");

    $("#price-error").slideUp();
  }

  return bool;
}

function addProductCategories() {
  let categories = [
    "Grain",
    "Fruit",
    "Vegetables",
    "Beans",
    "Mushrooms & Truffles",
    "Nuts & Kernels",
    "Plant Seeds & Bulbs",
    "Agricultural Growing Media",
    "Plant & Animal Oil",
    "Animal Products",
    "Agriculture & By-product Agents",
    "Agriculture Products Processing",
    "Agriculture Projects",
    "Agricultural Waste",
    "Agrochemicals",
    "Charcoal",
    "Cocoa Beans",
    "Coffee Beans",
    "Farm Machinery & Equipment",
    "Feed",
    "Flower Pots & Planters",
    "Fresh Seafood",
    "Garden Tools",
    "Grain Products",
    "Herbal Cigars & Cigarettes",
    "Organic Produce",
    "Ornamental Plants",
    "Other Agriculture Products",
    "Timber Raw Materials",
    "Vanilla Beans",
    "Car Care & Cleaning",
    "Interior Accessories",
    "Exterior Accessories",
    "UTV",
    "Auto Chassis Parts",
    "ATV",
    "Vehicle Tools",
    "Universal Parts",
    "Axles",
    "Cooling System",
    "Crank Mechanism",
    "50cc Dirt Bikes",
    "Auto Electronics",
    "Transmission",
    "Automobiles",
    "Air Intakes",
    "ATV Parts",
    "Tricycles",
    "Body Parts",
    "Lubrication System",
    "Motorcycles",
    "Auto Ignition System",
    "Fuel System",
    "Vehicle Equipment",
    "Motorcycle Accessories",
    "Auto Steering System",
    "Motorcycle Parts",
    "Auto Engine",
    "Auto Clutch",
    "Other Auto Parts",
    "Auto Electrical System",
    "Automotive & Motorcycle Parts Agent",
    "Brake System",
    "Valve Train",
    "Exhaust System",
    "Suspension System",
    "Adhesives & Sealants",
    "Admixture&Additives",
    "Basic Organic Chemicals",
    "Biological Chemical Products",
    "Catalysts & Chemical Auxiliary Agents",
    "Chemical Machinery & Equipment",
    "Petrochemical Products",
    "Chemical Reagent Products",
    "Chemical Waste",
    "Custom Chemical Services",
    "Daily Chemical Raw Materials",
    "Flavour & Fragrance",
    "Inorganic Chemicals",
    "Lab Supplies",
    "Non-Explosive Demolition Agents",
    "Organic Intermediates",
    "Other Chemicals",
    "Paints & Coatings",
    "Pharmaceuticals",
    "Pigment & Dyestuff",
    "Polymer",
    "Surface Treatment Chemicals",
    "All-In-One PC",
    "Barebone System",
    "Blank Media",
    "Card Reader",
    "Computer Cables & Connectors",
    "Computer Cases & Towers",
  ];
  categories.forEach((category) => {
    $("#productCategory").append(
      `<option value="${category}">${category}</option>`
    );
  });
}
