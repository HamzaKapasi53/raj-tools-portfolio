// Fish Gold Products Data
// Updated: 2025-12-10 - IDs changed to 101-105 to avoid conflicts with Cycle Plus
const fishGoldProducts = [
  {
    id: 101,
    name: "Ceramic Zero Chipping Blade",
    category: "ceramic-blades",
    description: "110 X 20/16mm",
    price: "₹899",
    size: "4-inch",
    specs: ["Hot Pressed", "Ceramic Tiles"],
    image: "images/fish_ceramiczerochippingblade_1.png",
    badge: "Precision",
  },
  {
    id: 102,
    name: "Ceramic Zero Chipping Blade Key Slot",
    category: "ceramic-blades",
    description: "110 X 20/16mm",
    price: "₹899",
    size: "4-inch",
    specs: ["Hot Pressed", "Ceramic Tiles","Key Slot"],
    image: "images/fish_ceramiczerochippingbladekeyslot_1.png",
    badge: "Precision",
  },
  {
    id: 103,
    name: "Ceramic Nano White Blade",
    category: "ceramic-blades",
    description: "110 X 20/16mm",
    price: "₹899",
    size: "4-inch",
    specs: ["Hot Pressed", "G4 & G5 Marble","Artificial White Marbles"],
    image: "images/fish_ceramicnanowhiteblade_1.png",
    badge: "Best Seller",
  },
  {
    id: 104,
    name: "Diamond Cup Wheel- 3\" & 4\"",
    category: "diamond-cup-wheels",
    description: "Heavy-duty diamond cup wheel for aggressive grinding and polishing of concrete and stone surfaces.",
    price: "₹1,599",
    size: ["3-inch","4-inch"],
    specs: ["80mm & 105mm", "Segmented", "Turbo"],
    image: "images/fish_diamondcupwheel34_1.png",
    badge: "Industrial",
  },
  {
    id: 105,
   name: "Diamond Double Row Cup Wheel- 5\" & 7\"",
    category: "diamond-cup-wheels",
    description: "Heavy-duty diamond cup wheel for aggressive grinding and polishing of concrete and stone surfaces.",
    price: "₹1,599",
    size: ["5-inch","7-inch"],
    specs: ["Sizes- 5\" & 7\"", "Double Row Cup", "Professional Quality"],
    image: "images/fish_diamonddoublerowcupwheel57_1.png",
    badge: "Industrial",
  },
  // {
  //   id: 6,
  //   name: "Rotary Hammer - Professional Series",
  //   category: "rotary-hammers",
  //   description: "Professional series rotary hammer for heavy-duty applications.",
  //   price: "₹15,999",
  //   size: "16mm",
  //   specs: ["16mm", "Professional", "1200W"],
  //   image: "images/rotary-hammer-2.jpg",
  //   badge: "Professional",
  // },
  // {
  //   id: 7,
  //   name: "SDS Plus Bit Set - Multi-Size",
  //   category: "sds-bits",
  //   description: "Complete set of SDS Plus bits in multiple sizes.",
  //   price: "₹2,499",
  //   size: "6mm",
  //   specs: ["6-12mm", "Set", "Multi-Size"],
  //   image: "images/sds-bit-3.jpg",
  //   badge: "Complete Set",
  // },
  // {
  //   id: 8,
  //   name: "Scaling Chisel - Heavy Duty",
  //   category: "chisels",
  //   description: "Heavy-duty scaling chisel for surface preparation work.",
  //   price: "₹1,099",
  //   size: "16mm",
  //   specs: ["16mm", "Scaling", "Heavy Duty"],
  //   image: "images/chisel-3.jpg",
  //   badge: "Heavy Duty",
  // },
  // {
  //   id: 9,
  //   name: "Rotary Hammer - Compact Pro",
  //   category: "rotary-hammers",
  //   description: "Compact professional rotary hammer with advanced features.",
  //   price: "₹12,999",
  //   size: "10mm",
  //   specs: ["10mm", "Compact Pro", "1000W"],
  //   image: "images/rotary-hammer-3.jpg",
  //   badge: "Advanced",
  // },
]

// DOM Elements
let fishGoldProductsGrid
let fishSearchInput
let fishCategoryFilter
let fishSizeFilter
let fishSortSelect
let fishNoResults

// Current filters
const fishCurrentFilters = {
  search: "",
  category: "",
  size: "",
  sort: "name-asc",
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Get DOM elements
  fishGoldProductsGrid = document.getElementById("products-grid")
  fishSearchInput = document.getElementById("search-input")
  fishCategoryFilter = document.getElementById("category-filter")
  fishSizeFilter = document.getElementById("size-filter")
  fishSortSelect = document.getElementById("sort-select")
  fishNoResults = document.getElementById("no-results")

  // Add event listeners
  if (fishSearchInput) {
    fishSearchInput.addEventListener("input", handleSearch)
  }

  if (fishCategoryFilter) {
    fishCategoryFilter.addEventListener("change", handleCategoryFilter)
  }

  if (fishSizeFilter) {
    fishSizeFilter.addEventListener("change", handleSizeFilter)
  }

  if (fishSortSelect) {
    fishSortSelect.addEventListener("change", handleSort)
  }

  // Initial render
  renderProducts()
})

// Handle search
function handleSearch(e) {
  fishCurrentFilters.search = e.target.value.toLowerCase()
  renderProducts()
}

// Handle category filter
function handleCategoryFilter(e) {
  fishCurrentFilters.category = e.target.value
  renderProducts()
}

function handleSizeFilter(e) {
  fishCurrentFilters.size = e.target.value
  renderProducts()
}

// Handle sort
function handleSort(e) {
  fishCurrentFilters.sort = e.target.value
  renderProducts()
}

// Filter products based on current filters
function filterProducts() {
  const filtered = fishGoldProducts.filter((product) => {
    // Search filter
    const matchesSearch =
      !fishCurrentFilters.search ||
      product.name.toLowerCase().includes(fishCurrentFilters.search) ||
      product.description.toLowerCase().includes(fishCurrentFilters.search) ||
      product.specs.some((spec) => spec.toLowerCase().includes(fishCurrentFilters.search))

    // Category filter
    const matchesCategory = !fishCurrentFilters.category || product.category === fishCurrentFilters.category

    const matchesSize =
      !fishCurrentFilters.size ||
      product.size === fishCurrentFilters.size ||
      product.size.includes(fishCurrentFilters.size) ||
      product.specs.some((spec) => spec.toLowerCase().includes(fishCurrentFilters.size.toLowerCase())) ||
      (product.specs.some((spec) => spec.includes("-")) &&
        fishCurrentFilters.size === "6mm" &&
        product.specs.some((spec) => spec.includes("6")))

    return matchesSearch && matchesCategory && matchesSize
  })

  // Sort products
  filtered.sort((a, b) => {
    switch (fishCurrentFilters.sort) {
      case "name-asc":
        return a.name.localeCompare(b.name)
      case "name-desc":
        return b.name.localeCompare(a.name)
      case "price-asc":
        return Number.parseInt(a.price.replace(/[₹,]/g, "")) - Number.parseInt(b.price.replace(/[₹,]/g, ""))
      case "price-desc":
        return Number.parseInt(b.price.replace(/[₹,]/g, "")) - Number.parseInt(a.price.replace(/[₹,]/g, ""))
      default:
        return 0
    }
  })

  return filtered
}

// Render products
function renderProducts() {
  if (!fishGoldProductsGrid) return

  const filteredProducts = filterProducts()

  // Clear existing products
  fishGoldProductsGrid.innerHTML = ""

  if (filteredProducts.length === 0) {
    // Show no results message
    if (fishNoResults) {
      fishNoResults.style.display = "block"
    }
    return
  }

  // Hide no results message
  if (fishNoResults) {
    fishNoResults.style.display = "none"
  }

  // Render products
  filteredProducts.forEach((product, index) => {
    const productCard = createProductCard(product, index)
    fishGoldProductsGrid.appendChild(productCard)
  })
}

// Create product card element
function createProductCard(product, index) {
  const card = document.createElement("div")
  card.className = "product-card"
  card.style.animationDelay = `${index * 0.1}s`

  card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" onerror="this.src='images/placeholder-product.jpg'">
            <div class="product-badge">${product.badge}</div>
        </div>
        <div class="product-info">
            <div class="product-category">${getCategoryName(product.category)}</div>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-specs">
                ${product.specs.map((spec) => `<span class="spec-item">${spec}</span>`).join("")}
            </div>
            <div class="product-price">${product.price}</div>
            <div class="product-actions">
                <button class="btn-fish btn-fish-primary" onclick="viewProduct(${product.id})">
                    View Details
                </button>
            </div>
        </div>
    `

  return card
}

// Get category display name
function getCategoryName(category) {
  const categoryNames = {
    "sds-bits": "SDS Hammer Drill Bits",
    // chisels: "Chisels",
    "diamond-cup-wheels":"Diamond Cup Wheels",
    "rotary-hammers": "Rotary Hammers",
    "ceramic-blades":"Ceramic Blades",
  }
  return categoryNames[category] || category
}

// Product actions
function viewProduct(productId) {
  // Redirect to product details page with the product ID in the query string
  window.location.href = `product-details.html?id=${productId}`;
}


