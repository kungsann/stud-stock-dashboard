const storageKey = "stud-stock-products-v2";

const starterProducts = [
  {
    id: crypto.randomUUID(),
    name: "STUD แท่น 10 CM",
    sku: "STUD-10",
    category: "แท่นเล็ก",
    quantity: 260,
    reorder: 80,
    cost: 18,
    location: "Rack A-10",
    produced: 180,
    pendingProduction: 70,
    poOrdered: 300,
    shipped: 145,
    pendingShipment: 105,
  },
  {
    id: crypto.randomUUID(),
    name: "STUD แท่น 13 CM",
    sku: "STUD-13",
    category: "แท่นเล็ก",
    quantity: 145,
    reorder: 70,
    cost: 20,
    location: "Rack A-13",
    produced: 120,
    pendingProduction: 65,
    poOrdered: 220,
    shipped: 80,
    pendingShipment: 105,
  },
  {
    id: crypto.randomUUID(),
    name: "STUD แท่น 15 CM",
    sku: "STUD-15",
    category: "แท่นเล็ก",
    quantity: 92,
    reorder: 90,
    cost: 21,
    location: "Rack A-15",
    produced: 72,
    pendingProduction: 88,
    poOrdered: 200,
    shipped: 45,
    pendingShipment: 115,
  },
  {
    id: crypto.randomUUID(),
    name: "STUD แท่น 17 CM",
    sku: "STUD-17",
    category: "แท่นกลาง",
    quantity: 58,
    reorder: 75,
    cost: 23,
    location: "Rack B-17",
    produced: 95,
    pendingProduction: 55,
    poOrdered: 180,
    shipped: 64,
    pendingShipment: 86,
  },
  {
    id: crypto.randomUUID(),
    name: "STUD แท่น 18 CM",
    sku: "STUD-18",
    category: "แท่นกลาง",
    quantity: 120,
    reorder: 70,
    cost: 24,
    location: "Rack B-18",
    produced: 130,
    pendingProduction: 40,
    poOrdered: 180,
    shipped: 95,
    pendingShipment: 75,
  },
  {
    id: crypto.randomUUID(),
    name: "STUD แท่น 20 CM",
    sku: "STUD-20",
    category: "แท่นกลาง",
    quantity: 0,
    reorder: 65,
    cost: 27,
    location: "Rack B-20",
    produced: 42,
    pendingProduction: 130,
    poOrdered: 250,
    shipped: 20,
    pendingShipment: 152,
  },
  {
    id: crypto.randomUUID(),
    name: "STUD แท่น 23 CM",
    sku: "STUD-23",
    category: "แท่นใหญ่",
    quantity: 88,
    reorder: 60,
    cost: 31,
    location: "Rack C-23",
    produced: 60,
    pendingProduction: 70,
    poOrdered: 150,
    shipped: 38,
    pendingShipment: 92,
  },
  {
    id: crypto.randomUUID(),
    name: "STUD แท่น 25 CM",
    sku: "STUD-25",
    category: "แท่นใหญ่",
    quantity: 34,
    reorder: 55,
    cost: 34,
    location: "Rack C-25",
    produced: 54,
    pendingProduction: 96,
    poOrdered: 160,
    shipped: 35,
    pendingShipment: 115,
  },
  {
    id: crypto.randomUUID(),
    name: "STUD แท่น 30 CM",
    sku: "STUD-30",
    category: "แท่นใหญ่",
    quantity: 72,
    reorder: 50,
    cost: 41,
    location: "Rack C-30",
    produced: 40,
    pendingProduction: 60,
    poOrdered: 120,
    shipped: 18,
    pendingShipment: 82,
  },
];

const projectSales = [
  {
    code: "PJ-2406-01",
    customer: "โครงการอาคาร A",
    due: "ส่งตามแผน 12-18 มิ.ย.",
    sizes: [
      { size: "10 CM", ordered: 160, produced: 120, shipped: 80 },
      { size: "13 CM", ordered: 120, produced: 90, shipped: 60 },
      { size: "17 CM", ordered: 80, produced: 55, shipped: 35 },
      { size: "25 CM", ordered: 60, produced: 30, shipped: 20 },
    ],
    status: "ปิดขายแล้ว",
  },
  {
    code: "PJ-2406-02",
    customer: "โครงการโรงงาน B",
    due: "ลูกค้าระบุส่ง 20-25 มิ.ย.",
    sizes: [
      { size: "15 CM", ordered: 90, produced: 40, shipped: 0 },
      { size: "18 CM", ordered: 70, produced: 55, shipped: 20 },
      { size: "20 CM", ordered: 90, produced: 18, shipped: 0 },
      { size: "30 CM", ordered: 60, produced: 22, shipped: 0 },
    ],
    status: "รอผลิต",
  },
  {
    code: "PJ-2406-03",
    customer: "โครงการคอนโด C",
    due: "ทยอยส่ง 3 เที่ยว",
    sizes: [
      { size: "13 CM", ordered: 70, produced: 30, shipped: 20 },
      { size: "23 CM", ordered: 60, produced: 28, shipped: 18 },
      { size: "25 CM", ordered: 60, produced: 24, shipped: 15 },
    ],
    status: "ผลิตแล้วบางส่วน",
  },
];

const receivingChecks = [
  {
    po: "PO-IM-884",
    size: "10 CM",
    ordered: 300,
    counted: 286,
    status: "ขาด 14",
  },
  {
    po: "PO-IM-884",
    size: "18 CM",
    ordered: 180,
    counted: 192,
    status: "เกิน 12",
  },
  {
    po: "PO-IM-891",
    size: "20 CM",
    ordered: 250,
    counted: 0,
    status: "รอนับ",
  },
];

const workflowItems = [
  {
    type: "sales",
    title: "PJ-2406-01 ปิดงานขายโครงการ",
    detail: "มีแท่น 10, 13, 17, 25 CM ในโครงการเดียว",
    status: "โครงการ",
    days: "วันนี้",
  },
  {
    type: "import",
    title: "IM-884 สั่งแท่นจากต่างประเทศ",
    detail: "รอรับเข้า แต่ต้องนับจริงก่อนเข้าสต๊อก",
    status: "นำเข้า",
    days: "อีก 12 วัน",
  },
  {
    type: "receiving",
    title: "RC-884 ตรวจนับก่อนเข้าคลัง",
    detail: "ยอดจริงไม่ตรง PO ต้องแยกขาด/เกินตามขนาด",
    status: "ตรวจนับ",
    days: "รอนับ",
  },
  {
    type: "production",
    title: "PD-116 สั่งผลิตประกอบ STUD",
    detail: "ผลิตเสร็จบางขนาด แต่ยังไม่ได้ส่งให้ลูกค้า",
    status: "ผลิต",
    days: "ค้าง 3 วัน",
  },
  {
    type: "shipping",
    title: "DL-730 ส่งของให้โครงการ",
    detail: "ส่งหลายเที่ยว งานส่งไม่จบภายในวันเดียว",
    status: "ขนส่ง",
    days: "วันที่ 2/4",
  },
];

const elements = {
  addProductBtn: document.querySelector("#addProductBtn"),
  avgStock: document.querySelector("#avgStock"),
  cancelBtn: document.querySelector("#cancelBtn"),
  categoryCount: document.querySelector("#categoryCount"),
  categoryFilter: document.querySelector("#categoryFilter"),
  categoryDonut: document.querySelector("#categoryDonut"),
  closeDialogBtn: document.querySelector("#closeDialogBtn"),
  closedSales: document.querySelector("#closedSales"),
  costInput: document.querySelector("#costInput"),
  categoryInput: document.querySelector("#categoryInput"),
  categoryList: document.querySelector("#categoryList"),
  criticalItems: document.querySelector("#criticalItems"),
  dialog: document.querySelector("#productDialog"),
  dialogTitle: document.querySelector("#dialogTitle"),
  emptyState: document.querySelector("#emptyState"),
  form: document.querySelector("#productForm"),
  importOrders: document.querySelector("#importOrders"),
  locationInput: document.querySelector("#locationInput"),
  lowStockCount: document.querySelector("#lowStockCount"),
  nameInput: document.querySelector("#nameInput"),
  outStockCount: document.querySelector("#outStockCount"),
  pendingProductionTotal: document.querySelector("#pendingProductionTotal"),
  pendingShipmentTotal: document.querySelector("#pendingShipmentTotal"),
  productId: document.querySelector("#productId"),
  productRows: document.querySelector("#productRows"),
  producedTotal: document.querySelector("#producedTotal"),
  productionJobs: document.querySelector("#productionJobs"),
  projectList: document.querySelector("#projectList"),
  projectSummary: document.querySelector("#projectSummary"),
  poSummary: document.querySelector("#poSummary"),
  quantityInput: document.querySelector("#quantityInput"),
  receivingChecks: document.querySelector("#receivingChecks"),
  receivingList: document.querySelector("#receivingList"),
  reorderInput: document.querySelector("#reorderInput"),
  searchInput: document.querySelector("#searchInput"),
  shippingJobs: document.querySelector("#shippingJobs"),
  sideLowStock: document.querySelector("#sideLowStock"),
  skuInput: document.querySelector("#skuInput"),
  shipmentSummary: document.querySelector("#shipmentSummary"),
  statusFilter: document.querySelector("#statusFilter"),
  stockBySizeSummary: document.querySelector("#stockBySizeSummary"),
  stockChart: document.querySelector("#stockChart"),
  totalStockQty: document.querySelector("#totalStockQty"),
  totalProducts: document.querySelector("#totalProducts"),
  workflowList: document.querySelector("#workflowList"),
};

let products = loadProducts();

function loadProducts() {
  const saved = localStorage.getItem(storageKey);
  return saved ? JSON.parse(saved) : starterProducts;
}

function saveProducts() {
  localStorage.setItem(storageKey, JSON.stringify(products));
}

function formatCurrency(value) {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 2,
  }).format(value);
}

function getStatus(product) {
  if (product.quantity === 0) {
    return { key: "out", label: "หมดสต๊อก" };
  }

  if (product.quantity <= product.reorder) {
    return { key: "low", label: "ใกล้หมด" };
  }

  return { key: "ready", label: "พร้อมขาย" };
}

function getFilteredProducts() {
  const query = elements.searchInput.value.trim().toLowerCase();
  const status = elements.statusFilter.value;
  const category = elements.categoryFilter.value;

  return products.filter((product) => {
    const productStatus = getStatus(product).key;
    const searchable = `${product.name} ${product.sku} ${product.category}`.toLowerCase();
    const matchesSearch = !query || searchable.includes(query);
    const matchesStatus = status === "all" || productStatus === status;
    const matchesCategory = category === "all" || product.category === category;

    return matchesSearch && matchesStatus && matchesCategory;
  });
}

function renderMetrics() {
  const lowStockCount = products.filter((product) => getStatus(product).key === "low").length;
  const outStockCount = products.filter((product) => getStatus(product).key === "out").length;
  const categoryCount = new Set(products.map((product) => product.category)).size;
  const totalStockQty = products.reduce((sum, product) => sum + product.quantity, 0);
  const producedTotal = products.reduce((sum, product) => sum + product.produced, 0);
  const pendingProductionTotal = products.reduce((sum, product) => sum + product.pendingProduction, 0);
  const pendingShipmentTotal = products.reduce((sum, product) => sum + product.pendingShipment, 0);
  const avgStock = products.length
    ? Math.round(totalStockQty / products.length)
    : 0;

  elements.totalProducts.textContent = products.length;
  elements.totalStockQty.textContent = totalStockQty.toLocaleString("th-TH");
  elements.producedTotal.textContent = producedTotal.toLocaleString("th-TH");
  elements.pendingProductionTotal.textContent = pendingProductionTotal.toLocaleString("th-TH");
  elements.pendingShipmentTotal.textContent = pendingShipmentTotal.toLocaleString("th-TH");
  elements.sideLowStock.textContent = `${lowStockCount + outStockCount} รายการ`;
  elements.closedSales.textContent = projectSales.length;
  elements.importOrders.textContent = new Set(receivingChecks.map((item) => item.po)).size;
  elements.receivingChecks.textContent = receivingChecks.length;
  elements.productionJobs.textContent = products.filter((product) => product.pendingProduction > 0).length;
  elements.shippingJobs.textContent = products.filter((product) => product.pendingShipment > 0).length;
  elements.avgStock.textContent = avgStock.toLocaleString("th-TH");
  elements.criticalItems.textContent = (lowStockCount + outStockCount).toLocaleString("th-TH");
  elements.categoryCount.textContent = categoryCount.toLocaleString("th-TH");
}

function sumProjectQty(project, field = "ordered") {
  return project.sizes.reduce((sum, item) => sum + item[field], 0);
}

function renderSummaryItem(target, title, lines, value = "") {
  const item = document.createElement("div");
  item.className = "summary-item";
  item.innerHTML = `
    <span>
      <strong>${title}</strong>
      <small>${lines}</small>
    </span>
    ${value ? `<b>${value}</b>` : ""}
  `;
  target.append(item);
}

function renderSizeSummaries() {
  elements.stockBySizeSummary.innerHTML = "";
  elements.projectSummary.innerHTML = "";
  elements.poSummary.innerHTML = "";
  elements.shipmentSummary.innerHTML = "";

  products.forEach((product) => {
    renderSummaryItem(
      elements.stockBySizeSummary,
      product.sku.replace("STUD-", "") + " CM",
      `คงเหลือ ${product.quantity.toLocaleString("th-TH")} | ผลิตแล้ว ${product.produced.toLocaleString("th-TH")} | ยังไม่ผลิต ${product.pendingProduction.toLocaleString("th-TH")}`,
      `${product.pendingShipment.toLocaleString("th-TH")} ค้างส่ง`
    );
  });

  projectSales.forEach((project) => {
    const sizes = project.sizes.map((item) => `${item.size} ${item.ordered}`).join(", ");
    renderSummaryItem(
      elements.projectSummary,
      `${project.code} ${project.customer}`,
      `${sizes} | ${project.due}`,
      `${sumProjectQty(project).toLocaleString("th-TH")} ตัว`
    );
  });

  products.forEach((product) => {
    renderSummaryItem(
      elements.poSummary,
      product.sku.replace("STUD-", "") + " CM",
      `สั่ง PO ${product.poOrdered.toLocaleString("th-TH")} | นับเข้าสต๊อก ${product.quantity.toLocaleString("th-TH")}`,
      `${(product.poOrdered - product.quantity).toLocaleString("th-TH")} รอตรวจ/รอเข้า`
    );
  });

  products
    .filter((product) => product.shipped > 0 || product.pendingShipment > 0)
    .forEach((product) => {
      renderSummaryItem(
        elements.shipmentSummary,
        product.sku.replace("STUD-", "") + " CM",
        `ออกของแล้ว ${product.shipped.toLocaleString("th-TH")} | คงเหลือที่ยังไม่ได้ส่ง ${product.pendingShipment.toLocaleString("th-TH")}`,
        product.pendingShipment > 0 ? "ยังไม่จบ" : "จบแล้ว"
      );
    });
}

function renderProjects() {
  elements.projectList.innerHTML = "";

  projectSales.forEach((project) => {
    const sizeText = project.sizes.map((item) => `${item.size} ${item.ordered}`).join(", ");
    const produced = sumProjectQty(project, "produced");
    const shipped = sumProjectQty(project, "shipped");
    const ordered = sumProjectQty(project, "ordered");
    const row = document.createElement("div");
    row.className = "project-item";
    row.innerHTML = `
      <span>
        <strong>${project.code}</strong>
        <small>${project.customer} | ${project.due}</small>
      </span>
      <span>
        <strong>${sizeText}</strong>
        <small>สั่ง ${ordered.toLocaleString("th-TH")} | ผลิต ${produced.toLocaleString("th-TH")} | ส่ง ${shipped.toLocaleString("th-TH")}</small>
      </span>
      <b>${project.status}</b>
    `;
    elements.projectList.append(row);
  });
}

function renderReceivingChecks() {
  elements.receivingList.innerHTML = "";

  receivingChecks.forEach((check) => {
    const diff = check.counted - check.ordered;
    const stateClass = diff === 0 ? "match" : diff > 0 ? "over" : "short";
    const row = document.createElement("div");
    row.className = "receiving-item";
    row.innerHTML = `
      <span>
        <strong>${check.po}</strong>
        <small>แท่น ${check.size}</small>
      </span>
      <span class="po-count">
        <small>PO ${check.ordered.toLocaleString("th-TH")}</small>
        <small>นับได้ ${check.counted.toLocaleString("th-TH")}</small>
      </span>
      <b class="${stateClass}">${check.status}</b>
    `;
    elements.receivingList.append(row);
  });
}

function getCategorySummary() {
  return products.reduce((summary, product) => {
    summary[product.category] = (summary[product.category] || 0) + 1;
    return summary;
  }, {});
}

function renderCharts() {
  const maxStock = Math.max(...products.map((product) => product.quantity), 1);
  elements.stockChart.innerHTML = "";

  products.slice(0, 9).forEach((product) => {
    const group = document.createElement("div");
    const stockHeight = Math.max(4, Math.round((product.quantity / maxStock) * 100));
    const reorderHeight = Math.max(4, Math.round((product.reorder / maxStock) * 100));

    group.className = "bar-group";
    group.innerHTML = `
      <span class="bar stock" style="height: ${stockHeight}%"></span>
      <span class="bar reorder" style="height: ${reorderHeight}%"></span>
      <span class="bar-label">${product.sku.split("-")[1]}</span>
    `;
    elements.stockChart.append(group);
  });

  const summary = getCategorySummary();
  const entries = Object.entries(summary);
  const total = entries.reduce((sum, [, count]) => sum + count, 0) || 1;
  const colors = ["#7157d9", "#d94862", "#6fcf97", "#e76f31", "#4f7fe5", "#f5bc3b"];
  let cursor = 0;
  const segments = entries.map(([, count], index) => {
    const start = cursor;
    cursor += (count / total) * 100;
    return `${colors[index % colors.length]} ${start}% ${cursor}%`;
  });

  elements.categoryDonut.style.background = `conic-gradient(${segments.join(", ")})`;
  elements.categoryList.innerHTML = "";
  entries.forEach(([category, count], index) => {
    const item = document.createElement("div");
    item.className = "category-item";
    item.innerHTML = `<span>${category}</span><b style="background: ${colors[index % colors.length]}">${count}</b>`;
    elements.categoryList.append(item);
  });
}

function renderWorkflow() {
  elements.workflowList.innerHTML = "";

  workflowItems.forEach((item) => {
    const row = document.createElement("div");
    row.className = "workflow-item";
    row.innerHTML = `
      <span class="workflow-status status-${item.type}">${item.status}</span>
      <span>
        <strong>${item.title}</strong>
        <small>${item.detail}</small>
      </span>
      <strong>${item.days}</strong>
    `;
    elements.workflowList.append(row);
  });
}

function renderCategoryFilter() {
  const selected = elements.categoryFilter.value;
  const categories = [...new Set(products.map((product) => product.category))].sort((a, b) =>
    a.localeCompare(b, "th")
  );

  elements.categoryFilter.innerHTML = '<option value="all">ทั้งหมด</option>';
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    elements.categoryFilter.append(option);
  });

  elements.categoryFilter.value = categories.includes(selected) ? selected : "all";
}

function renderRows() {
  const filteredProducts = getFilteredProducts();
  elements.productRows.innerHTML = "";
  elements.emptyState.style.display = filteredProducts.length ? "none" : "block";

  filteredProducts.forEach((product) => {
    const status = getStatus(product);
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>
        <span class="product-name">
          ${product.name}
          <small>${product.location || "ยังไม่ระบุตำแหน่ง"}</small>
        </span>
      </td>
      <td>${product.sku}</td>
      <td>${product.category}</td>
      <td>
        <span class="stock-cell">
          <strong>${product.quantity.toLocaleString("th-TH")}</strong>
          <small>เตือน ${product.reorder}</small>
          <span class="stock-meter">
            <span style="width: ${Math.min(100, Math.round((product.quantity / Math.max(product.reorder * 2, 1)) * 100))}%"></span>
          </span>
        </span>
      </td>
      <td>${product.produced.toLocaleString("th-TH")}</td>
      <td>${product.pendingProduction.toLocaleString("th-TH")}</td>
      <td>${product.poOrdered.toLocaleString("th-TH")}</td>
      <td>${product.shipped.toLocaleString("th-TH")}</td>
      <td>${product.pendingShipment.toLocaleString("th-TH")}</td>
      <td>${formatCurrency(product.cost)}</td>
      <td><span class="status ${status.key}">${status.label}</span></td>
      <td>
        <span class="actions">
          <button class="row-action" type="button" data-action="edit" data-id="${product.id}">แก้ไข</button>
          <button class="row-action" type="button" data-action="delete" data-id="${product.id}">ลบ</button>
        </span>
      </td>
    `;

    elements.productRows.append(row);
  });
}

function render() {
  renderMetrics();
  renderSizeSummaries();
  renderCharts();
  renderProjects();
  renderReceivingChecks();
  renderWorkflow();
  renderCategoryFilter();
  renderRows();
}

function openDialog(product = null) {
  elements.form.reset();
  elements.productId.value = product?.id || "";
  elements.dialogTitle.textContent = product ? "แก้ไขสินค้า" : "เพิ่มสินค้า";

  if (product) {
    elements.nameInput.value = product.name;
    elements.skuInput.value = product.sku;
    elements.categoryInput.value = product.category;
    elements.quantityInput.value = product.quantity;
    elements.reorderInput.value = product.reorder;
    elements.costInput.value = product.cost;
    elements.locationInput.value = product.location;
  }

  elements.dialog.showModal();
  elements.nameInput.focus();
}

function closeDialog() {
  elements.dialog.close();
}

function handleSubmit(event) {
  event.preventDefault();

  const id = elements.productId.value || crypto.randomUUID();
  const existingProduct = products.find((item) => item.id === id);
  const product = {
    id,
    name: elements.nameInput.value.trim(),
    sku: elements.skuInput.value.trim(),
    category: elements.categoryInput.value.trim(),
    quantity: Number(elements.quantityInput.value),
    reorder: Number(elements.reorderInput.value),
    cost: Number(elements.costInput.value),
    location: elements.locationInput.value.trim(),
    produced: existingProduct?.produced || 0,
    pendingProduction: existingProduct?.pendingProduction || 0,
    poOrdered: existingProduct?.poOrdered || 0,
    shipped: existingProduct?.shipped || 0,
    pendingShipment: existingProduct?.pendingShipment || 0,
  };

  const productIndex = products.findIndex((item) => item.id === id);
  if (productIndex >= 0) {
    products[productIndex] = product;
  } else {
    products = [product, ...products];
  }

  saveProducts();
  render();
  closeDialog();
}

function handleRowAction(event) {
  const button = event.target.closest("button[data-action]");
  if (!button) {
    return;
  }

  const product = products.find((item) => item.id === button.dataset.id);
  if (!product) {
    return;
  }

  if (button.dataset.action === "edit") {
    openDialog(product);
    return;
  }

  const confirmed = confirm(`ลบสินค้า "${product.name}" ใช่ไหม?`);
  if (confirmed) {
    products = products.filter((item) => item.id !== product.id);
    saveProducts();
    render();
  }
}

elements.addProductBtn.addEventListener("click", () => openDialog());
elements.cancelBtn.addEventListener("click", closeDialog);
elements.closeDialogBtn.addEventListener("click", closeDialog);
elements.form.addEventListener("submit", handleSubmit);
elements.productRows.addEventListener("click", handleRowAction);
elements.searchInput.addEventListener("input", renderRows);
elements.statusFilter.addEventListener("change", renderRows);
elements.categoryFilter.addEventListener("change", renderRows);

render();
