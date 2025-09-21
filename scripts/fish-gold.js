// Fish Gold Products Data
const fishGoldProducts = [
  {
    id: 1,
    name: "Ceramic Zero Chipping Blade",
    category: "ceramic-blades",
    description: "110 X 20/16mm",
    price: "₹899",
    size: "4-inch",
    specs: ["Hot Pressed", "Ceramic Tiles"],
    image: "images/fish_ceramic.png",
    badge: "Precision",
  },
  {
    id: 2,
    name: "Ceramic Zero Chipping Blade",
    category: "ceramic-blades",
    description: "110 X 20/16mm",
    price: "₹899",
    size: "4-inch",
    specs: ["Hot Pressed", "Ceramic Tiles","Key Slot"],
    image: "images/fish_ceramiccard.png",
    badge: "Precision",
  },
  {
    id: 3,
    name: "Ceramic Nano White Blade",
    category: "ceramic-blades",
    description: "110 X 20/16mm",
    price: "₹899",
    size: "4-inch",
    specs: ["Hot Pressed", "G4 & G5 Marble","Artificial White Marbles"],
    image: "images/fish_ceramicnanowhite.png",
    badge: "Best Seller",
  },
  {
    id: 4,
    name: "Diamond Cup Wheel- 3\" & 4\"",
    category: "diamond-cup-wheels",
    description: "Heavy-duty diamond cup wheel for aggressive grinding and polishing of concrete and stone surfaces.",
    price: "₹1,599",
    size: ["3-inch","4-inch"],
    specs: ["80mm & 105mm", "Segmented", "Turbo"],
    image: "images/fish_dcw34.png",
    badge: "Industrial",
  },
  {
    id: 5,
   name: "Diamond Double Row Cup Wheel- 5\" & 7\"",
    category: "diamond-cup-wheels",
    description: "Heavy-duty diamond cup wheel for aggressive grinding and polishing of concrete and stone surfaces.",
    price: "₹1,599",
    size: ["5-inch","7-inch"],
    specs: ["Sizes- 5\" & 7\"", "Double Row Cup", "Professional Quality"],
    image: "images/fish_dcw57.png",
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
let productsGrid
let searchInput
let categoryFilter
let sizeFilter
let sortSelect
let noResults

// Current filters
const currentFilters = {
  search: "",
  category: "",
  size: "",
  sort: "name-asc",
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Get DOM elements
  productsGrid = document.getElementById("products-grid")
  searchInput = document.getElementById("search-input")
  categoryFilter = document.getElementById("category-filter")
  sizeFilter = document.getElementById("size-filter")
  sortSelect = document.getElementById("sort-select")
  noResults = document.getElementById("no-results")

  // Add event listeners
  if (searchInput) {
    searchInput.addEventListener("input", handleSearch)
  }

  if (categoryFilter) {
    categoryFilter.addEventListener("change", handleCategoryFilter)
  }

  if (sizeFilter) {
    sizeFilter.addEventListener("change", handleSizeFilter)
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", handleSort)
  }

  // Initial render
  renderProducts()
})

// Handle search
function handleSearch(e) {
  currentFilters.search = e.target.value.toLowerCase()
  renderProducts()
}

// Handle category filter
function handleCategoryFilter(e) {
  currentFilters.category = e.target.value
  renderProducts()
}

function handleSizeFilter(e) {
  currentFilters.size = e.target.value
  renderProducts()
}

// Handle sort
function handleSort(e) {
  currentFilters.sort = e.target.value
  renderProducts()
}

// Filter products based on current filters
function filterProducts() {
  const filtered = fishGoldProducts.filter((product) => {
    // Search filter
    const matchesSearch =
      !currentFilters.search ||
      product.name.toLowerCase().includes(currentFilters.search) ||
      product.description.toLowerCase().includes(currentFilters.search) ||
      product.specs.some((spec) => spec.toLowerCase().includes(currentFilters.search))

    // Category filter
    const matchesCategory = !currentFilters.category || product.category === currentFilters.category

    const matchesSize =
      !currentFilters.size ||
      product.size === currentFilters.size ||
      product.size.includes(currentFilters.size) ||
      product.specs.some((spec) => spec.toLowerCase().includes(currentFilters.size.toLowerCase())) ||
      (product.specs.some((spec) => spec.includes("-")) &&
        currentFilters.size === "6mm" &&
        product.specs.some((spec) => spec.includes("6")))

    return matchesSearch && matchesCategory && matchesSize
  })

  // Sort products
  filtered.sort((a, b) => {
    switch (currentFilters.sort) {
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
  if (!productsGrid) return

  const filteredProducts = filterProducts()

  // Clear existing products
  productsGrid.innerHTML = ""

  if (filteredProducts.length === 0) {
    // Show no results message
    if (noResults) {
      noResults.style.display = "block"
    }
    return
  }

  // Hide no results message
  if (noResults) {
    noResults.style.display = "none"
  }

  // Render products
  filteredProducts.forEach((product, index) => {
    const productCard = createProductCard(product, index)
    productsGrid.appendChild(productCard)
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
                <button class="btn-fish btn-fish-secondary" onclick="addToWishlist(${product.id})">
                    <i class="fas fa-heart"></i>
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

// Product actions (placeholder functions)
function viewProduct(productId) {
  const product = fishGoldProducts.find((p) => p.id === productId)
  if (product) {
    alert(`Viewing details for: ${product.name}\n\nDescription: ${product.description}\nPrice: ${product.price}`)
  }
}

function addToWishlist(productId) {
  const product = fishGoldProducts.find((p) => p.id === productId)
  if (product) {
    alert(`${product.name} added to wishlist!`)
  }
}
