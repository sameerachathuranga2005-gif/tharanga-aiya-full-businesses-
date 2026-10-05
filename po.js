// ==========================================================================
// Green Light Enterprises - Official Pro Purchase Order Logic Engine (2026 Executive Edition)
// Universal In-Place Editing, Live Math, Amount-to-Words, JSON Save/Load & Print
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const toggleEditBtn = document.getElementById('toggleEditBtn');
  const editBtnText = document.getElementById('editBtnText');
  const addRowBtn = document.getElementById('addRowBtn');
  const clearRowsBtn = document.getElementById('clearRowsBtn');
  
  // Section-by-Section Text Size Elements
  const sectionSizeMenuBtn = document.getElementById('sectionSizeMenuBtn');
  const sectionSizePopover = document.getElementById('sectionSizePopover');
  const closeSectionSizeBtn = document.getElementById('closeSectionSizeBtn');
  const resetAllSectionSizesBtn = document.getElementById('resetAllSectionSizesBtn');
  
  // Document Type Elements
  const docTypeMenuBtn = document.getElementById('docTypeMenuBtn');
  const docTypeLabel = document.getElementById('docTypeLabel');
  const docTypeHeading = document.getElementById('docTypeHeading');
  const docTypePopover = document.getElementById('docTypePopover');
  const closeDocTypeBtn = document.getElementById('closeDocTypeBtn');

  // Quick Catalog Elements
  const quickItemsBtn = document.getElementById('quickItemsBtn');
  const quickItemsPopover = document.getElementById('quickItemsPopover');
  const clientsMenuBtn = document.getElementById('clientsMenuBtn');
  const clientsPopover = document.getElementById('clientsPopover');

  // Tax & Discount Elements
  const taxMenuBtn = document.getElementById('taxMenuBtn');
  const taxRateLabel = document.getElementById('taxRateLabel');
  const taxPopover = document.getElementById('taxPopover');
  const closeTaxBtn = document.getElementById('closeTaxBtn');
  const taxSummaryRow = document.getElementById('taxSummaryRow');
  const taxTypeTitle = document.getElementById('taxTypeTitle');
  const taxRateBadge = document.getElementById('taxRateBadge');
  const taxValEl = document.getElementById('taxVal');

  const discountMenuBtn = document.getElementById('discountMenuBtn');
  const currentDiscountLabel = document.getElementById('currentDiscountLabel');
  const discountPopover = document.getElementById('discountPopover');
  const closeDiscountBtn = document.getElementById('closeDiscountBtn');
  const discountSummaryRow = document.getElementById('discountSummaryRow');
  const discountBadge = document.getElementById('discountBadge');
  const discountValEl = document.getElementById('discountVal');

  // Feature Toggle Buttons
  const toggleShipToBtn = document.getElementById('toggleShipToBtn');
  const shipToBlock = document.getElementById('shipToBlock');
  const partiesGrid = document.getElementById('partiesGrid');
  const toggleBankBtn = document.getElementById('toggleBankBtn');
  const bankDetailsCard = document.getElementById('bankDetailsCard');
  const toggleStampBtn = document.getElementById('toggleStampBtn');
  const corporateSeal = document.getElementById('corporateSeal');
  const toggleSignatureBtn = document.getElementById('toggleSignatureBtn');
  const digitalSignatureWrap = document.getElementById('digitalSignatureWrap');
  const toggleVendorAckBtn = document.getElementById('toggleVendorAckBtn');
  const vendorAckBox = document.getElementById('vendorAckBox');

  // Icons & Checkmarks Toggle & Dropdown Elements
  const toggleIconsBtn = document.getElementById('toggleIconsBtn');
  const iconsBtnLabel = document.getElementById('iconsBtnLabel');
  const iconsMenuBtn = document.getElementById('iconsMenuBtn');
  const iconsPopover = document.getElementById('iconsPopover');
  const closeIconsBtn = document.getElementById('closeIconsBtn');
  const popoverToggleAllIcons = document.getElementById('popoverToggleAllIcons');
  const popoverToggleAllTitle = document.getElementById('popoverToggleAllTitle');
  const popoverToggleAllBadge = document.getElementById('popoverToggleAllBadge');
  const toggleTermsHeadingIcon = document.getElementById('toggleTermsHeadingIcon');
  const termsHeadingIconPill = document.getElementById('termsHeadingIconPill');
  const toggleAckHeadingIcon = document.getElementById('toggleAckHeadingIcon');
  const ackHeadingIconPill = document.getElementById('ackHeadingIconPill');
  const toggleBankHeadingIcon = document.getElementById('toggleBankHeadingIcon');
  const bankHeadingIconPill = document.getElementById('bankHeadingIconPill');

  // Theme & Status Elements
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const currentThemeName = document.getElementById('currentThemeName');
  const headerStatusPill = document.getElementById('headerStatusPill');
  const headerStatusText = document.getElementById('headerStatusText');
  const statusStampBtn = document.getElementById('statusStampBtn');
  const statusStampLabel = document.getElementById('statusStampLabel');
  const statusStamp = document.getElementById('statusStamp');

  // Action Buttons
  const nextPoBtn = document.getElementById('nextPoBtn');
  const exportJsonBtn = document.getElementById('exportJsonBtn');
  const importJsonInput = document.getElementById('importJsonInput');
  const resetBtn = document.getElementById('resetBtn');
  const printBtn = document.getElementById('printBtn');

  // Document Container & Table
  const poDoc = document.getElementById('poDoc');
  const tableBody = document.getElementById('poTableBody');
  const subtotalValEl = document.getElementById('subtotalVal');
  const totalDueValEl = document.getElementById('totalDueVal');
  const amountWordsText = document.getElementById('amountWordsText');

  // Spacing & Typography Elements
  const spacingMenuBtn = document.getElementById('spacingMenuBtn');
  const spacingPopover = document.getElementById('spacingPopover');
  const closeSpacingBtn = document.getElementById('closeSpacingBtn');
  const wordSpacingSlider = document.getElementById('wordSpacingSlider');
  const lineHeightSlider = document.getElementById('lineHeightSlider');
  const letterSpacingSlider = document.getElementById('letterSpacingSlider');
  const wordGapVal = document.getElementById('wordGapVal');
  const lineHeightVal = document.getElementById('lineHeightVal');
  const letterGapVal = document.getElementById('letterGapVal');
  const textWeightVal = document.getElementById('textWeightVal');
  const currentGapLabel = document.getElementById('currentGapLabel');

  // App State - All text is ALWAYS directly editable by clicking
  let showEditOutlines = false;

  let currentTaxRate = 0;
  let currentTaxName = 'Non-VAT (0%)';
  let currentDiscountPercent = 0;

  // Section-by-Section Text Scaling State (Default 1.0 = 100%)
  const SECTION_SCALES_STORAGE_KEY = 'gle_po_section_scales';
  const defaultSectionScales = {
    'header-meta': 1.0,
    'parties': 1.0,
    'logistics': 1.0,
    'table': 1.0,
    'words': 1.0,
    'bank': 1.0,
    'terms': 1.0,
    'totals': 1.0,
    'signatures': 1.0
  };
  let sectionScales = { ...defaultSectionScales };

  // Icons & Checkmarks State
  let iconsVisible = true;
  let currentBulletStyle = 'check'; // 'check', 'dot', 'dash', 'number', 'none'
  let termsIconVisible = true;
  let ackIconVisible = true;
  let bankIconVisible = true;

  const themes = [
    { id: 'theme-emerald', name: 'Emerald GLE' },
    { id: 'theme-sapphire', name: 'Corporate Navy' },
    { id: 'theme-onyx', name: 'Luxury Platinum' },
    { id: 'theme-amber', name: 'Royal Amber' }
  ];
  let currentThemeIndex = 0;

  const headerStatuses = [
    { id: 'status-approved', text: 'APPROVED' },
    { id: 'status-issued', text: 'ISSUED' },
    { id: 'status-pending', text: 'PENDING' },
    { id: 'status-confirmed', text: 'CONFIRMED' }
  ];
  let currentHeaderStatusIndex = 0;

  const stampStatuses = ['none', 'approved', 'issued', 'pending', 'confirmed'];
  let currentStampIndex = 0; // 'none' by default for clean presentation

  // ==========================================================================
  // Product Catalog Presets
  // ==========================================================================
  const productCatalog = [
    {
      code: 'SF-21-500',
      name: 'Stretch Film (Hand Grade • Virgin LLDPE)',
      desc: '21 Micron x 500mm width x 300m length • High Cling & Tear Resistance',
      unit: 'Rolls',
      qty: 50,
      price: 1850.00
    },
    {
      code: 'SF-20-CORELESS',
      name: 'Eco Coreless Stretch Film',
      desc: '20 Micron x 500mm x 300m • Zero Core Waste • 100% Usable Plastic',
      unit: 'Rolls',
      qty: 40,
      price: 1750.00
    },
    {
      code: 'SF-23-MACH',
      name: 'Machine Grade Cast Stretch Film',
      desc: '23 Micron x 500mm x 1500m • 300% Power Pre-Stretch Capability',
      unit: 'Rolls',
      qty: 10,
      price: 9200.00
    },
    {
      code: 'SHR-PO-50',
      name: 'Polyolefin (POF) Shrink Film',
      desc: '19 Micron Centerfolded x 450mm x 1000m • High Optical Clarity',
      unit: 'Rolls',
      qty: 15,
      price: 8400.00
    },
    {
      code: 'STRAP-PP-12',
      name: 'Heavy Duty PP Strapping Band',
      desc: '12mm x 0.8mm x 2500m • Embossed High Tensile Strapping',
      unit: 'Rolls',
      qty: 8,
      price: 6850.00
    },
    {
      code: 'CORE-KRAFT-76',
      name: 'Heavy Duty Kraft Paper Cores',
      desc: '76mm Inner Diameter (3") x 520mm length x 5mm Wall Thickness',
      unit: 'Pieces',
      qty: 200,
      price: 95.00
    }
  ];

  // ==========================================================================
  // Pre-saved Parties Catalog (Clients / Suppliers)
  // ==========================================================================
  const partiesCatalog = [
    {
      name: 'Dilmin Enterprise (Commercial Packaging Client)',
      buyer: {
        company: 'Dilmin Enterprise',
        attn: 'Attn: Procurement & Stores Dept',
        addr1: 'Katupotha Rd., Moonamaldeniya',
        addr2: 'North Western Province, Sri Lanka',
        contact: 'Tel: 077 412 8930 | Email: dilmin.procure@gmail.com'
      },
      ship: {
        company: 'Dilmin Central Receiving Warehouse',
        attn: 'Dock #02 • Receiving Officer: Mr C. Pathirana',
        addr1: 'Katupotha Road, Moonamaldeniya',
        contact: 'Receiving Contact: 077 412 8930',
        hours: 'Unloading Hours: 08:00 AM – 05:00 PM'
      }
    },
    {
      name: 'MAS Holdings / Linea Aqua (Apparel Packaging)',
      buyer: {
        company: 'Linea Aqua (Pvt) Ltd - MAS Holdings',
        attn: 'Attn: Group Sourcing & Logistics',
        addr1: 'Biyagama Export Processing Zone',
        addr2: 'Walpola, Biyagama, Sri Lanka',
        contact: 'Tel: 011 482 7000 | Email: mas.procure@masholdings.com'
      },
      ship: {
        company: 'MAS Logistics Center - Biyagama Hub',
        attn: 'Gate 04 • Inward Goods Receiving Bay',
        addr1: 'EPZ Biyagama, Western Province',
        contact: 'Warehouse Desk: 011 482 7150',
        hours: 'Receiving: 08:30 AM – 04:30 PM (Mon-Fri)'
      }
    },
    {
      name: 'Brandix Apparel Solutions (Export Packaging)',
      buyer: {
        company: 'Brandix Apparel Solutions Ltd',
        attn: 'Attn: Central Procurement Division',
        addr1: 'No 409, Galle Road',
        addr2: 'Colombo 03, Sri Lanka',
        contact: 'Tel: 011 472 7000 | Email: supplychain@brandix.com'
      },
      ship: {
        company: 'Brandix Central Stores - Seeduwa',
        attn: 'Bay 3 • Materials Receiving Desk',
        addr1: 'Liyanagemulla, Seeduwa, Sri Lanka',
        contact: 'Stores Head: 011 472 8200',
        hours: 'Deliveries: 08:00 AM – 04:00 PM'
      }
    }
  ];

  // ==========================================================================
  // Number Formatting & Amount-to-Words Helpers
  // ==========================================================================
  function parseAmount(val) {
    if (typeof val === 'number') return isNaN(val) ? 0 : val;
    if (!val) return 0;
    const cleaned = val.toString().replace(/[^0-9.-]/g, '');
    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num;
  }

  function formatCurrency(num) {
    return Number(num).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  function numberToWordsLKR(amount) {
    const num = Math.floor(amount);
    const cents = Math.round((amount - num) * 100);
    if (num === 0) return 'Zero Rupees Only';

    const a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 
               'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    function inWords(n) {
      if (n === 0) return '';
      if (n < 20) return a[n];
      if (n < 100) return b[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + a[n % 10] : '');
      if (n < 1000) return a[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' ' + inWords(n % 100) : '');
      if (n < 100000) return inWords(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 !== 0 ? ' ' + inWords(n % 1000) : '');
      if (n < 10000000) return inWords(Math.floor(n / 100000)) + ' Lakh' + (n % 100000 !== 0 ? ' ' + inWords(n % 100000) : '');
      return inWords(Math.floor(n / 10000000)) + ' Crore' + (n % 10000000 !== 0 ? ' ' + inWords(n % 10000000) : '');
    }

    let words = 'Sri Lankan Rupees ' + inWords(num);
    if (cents > 0) {
      words += ' and ' + inWords(cents) + ' Cents';
    }
    return words + ' Only';
  }

  // ==========================================================================
  // Table Recalculation Engine
  // ==========================================================================
  function recalculateTotals() {
    const rows = tableBody.querySelectorAll('tr.po-row');
    let subtotal = 0;

    rows.forEach((row, idx) => {
      // Row sequence index
      const numCell = row.querySelector('.col-num');
      if (numCell) numCell.textContent = (idx + 1).toString();

      // Qty & Price
      const qtyCell = row.querySelector('.cell-qty');
      const priceCell = row.querySelector('.cell-price');
      const amountCell = row.querySelector('.cell-amount');

      const qty = parseAmount(qtyCell ? qtyCell.innerText : 1);
      const price = parseAmount(priceCell ? priceCell.innerText : 0);
      const amount = qty * price;

      if (amountCell) {
        amountCell.textContent = formatCurrency(amount);
      }

      subtotal += amount;
    });

    // Subtotal
    if (subtotalValEl) {
      subtotalValEl.textContent = `Rs. ${formatCurrency(subtotal)}`;
    }

    // Discount
    let discountAmount = 0;
    if (currentDiscountPercent > 0) {
      discountAmount = (subtotal * currentDiscountPercent) / 100;
      if (discountSummaryRow) discountSummaryRow.style.display = 'flex';
      if (discountBadge) discountBadge.textContent = `${currentDiscountPercent}%`;
      if (discountValEl) discountValEl.textContent = `- Rs. ${formatCurrency(discountAmount)}`;
    } else {
      if (discountSummaryRow) discountSummaryRow.style.display = 'none';
      if (discountValEl) discountValEl.textContent = `- Rs. 0.00`;
    }

    const afterDiscount = Math.max(0, subtotal - discountAmount);

    // Tax
    let taxAmount = 0;
    if (currentTaxRate > 0) {
      taxAmount = (afterDiscount * currentTaxRate) / 100;
      if (taxSummaryRow) taxSummaryRow.style.display = 'flex';
      if (taxTypeTitle) taxTypeTitle.textContent = currentTaxRate === 18 ? 'Value Added Tax (VAT)' : 'Government SSCL';
      if (taxRateBadge) taxRateBadge.textContent = `${currentTaxRate}%`;
      if (taxValEl) taxValEl.textContent = `+ Rs. ${formatCurrency(taxAmount)}`;
    } else {
      if (taxSummaryRow) taxSummaryRow.style.display = 'none';
      if (taxValEl) taxValEl.textContent = `+ Rs. 0.00`;
    }

    // Grand Total
    const grandTotal = afterDiscount + taxAmount;
    if (totalDueValEl) {
      totalDueValEl.textContent = `Rs. ${formatCurrency(grandTotal)}`;
    }

    // Amount in Words
    if (amountWordsText) {
      amountWordsText.textContent = numberToWordsLKR(grandTotal);
    }
  }

  // ==========================================================================
  // Row Operations (Add, Delete, Move)
  // ==========================================================================
  function addRow(data = {}) {
    const tr = document.createElement('tr');
    tr.className = 'po-row';
    const rowCount = tableBody.querySelectorAll('tr.po-row').length + 1;

    const code = data.code || `SF-ITEM-${rowCount}`;
    const name = data.name || 'Packaging Film / Core Specification';
    const unit = data.unit || 'Rolls';
    const qty = data.qty !== undefined ? data.qty : 10;
    const price = data.price !== undefined ? data.price : 1850;
    const amount = qty * price;

    tr.innerHTML = `
      <td class="col-num">${rowCount}</td>
      <td class="col-code cell-code" contenteditable="true" spellcheck="false">${escapeHtml(code)}</td>
      <td class="col-item cell-item" contenteditable="true" spellcheck="false">${escapeHtml(name)}</td>
      <td class="col-unit cell-unit"><span class="unit-pill" contenteditable="true" spellcheck="false">${escapeHtml(unit)}</span></td>
      <td class="col-qty cell-qty" contenteditable="true" spellcheck="false">${qty}</td>
      <td class="col-price cell-price" contenteditable="true" spellcheck="false">${formatCurrency(price)}</td>
      <td class="col-amount cell-amount" contenteditable="true" spellcheck="false">${formatCurrency(amount)}</td>
      <td class="col-actions no-print">
        <div class="row-actions-group">
          <button type="button" class="row-move-btn move-up" title="Move Up">▲</button>
          <button type="button" class="row-move-btn move-down" title="Move Down">▼</button>
          <button type="button" class="row-delete-btn" title="Delete item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
          </button>
        </div>
      </td>
    `;

    tableBody.appendChild(tr);
    recalculateTotals();
    savePoState();
  }

  if (addRowBtn) {
    addRowBtn.addEventListener('click', () => {
      addRow();
    });
  }

  if (clearRowsBtn) {
    clearRowsBtn.addEventListener('click', () => {
      if (confirm('Clear all items from this Purchase Order?')) {
        tableBody.innerHTML = '';
        recalculateTotals();
        savePoState();
      }
    });
  }

  // Row Event Delegation (Move Up, Move Down, Delete, Blur format)
  tableBody.addEventListener('click', (e) => {
    const row = e.target.closest('tr.po-row');
    if (!row) return;

    if (e.target.closest('.row-delete-btn')) {
      row.remove();
      recalculateTotals();
      savePoState();
      return;
    }

    if (e.target.closest('.move-up')) {
      const prev = row.previousElementSibling;
      if (prev && prev.classList.contains('po-row')) {
        tableBody.insertBefore(row, prev);
        recalculateTotals();
        savePoState();
      }
      return;
    }

    if (e.target.closest('.move-down')) {
      const next = row.nextElementSibling;
      if (next && next.classList.contains('po-row')) {
        tableBody.insertBefore(next, row);
        recalculateTotals();
        savePoState();
      }
      return;
    }
  });

  // Table In-Place Editing Live Listener
  tableBody.addEventListener('input', (e) => {
    const target = e.target;
    if (target.classList.contains('cell-qty') || target.classList.contains('cell-price')) {
      const row = target.closest('tr.po-row');
      if (row) {
        const qty = parseAmount(row.querySelector('.cell-qty')?.innerText);
        const price = parseAmount(row.querySelector('.cell-price')?.innerText);
        const amountCell = row.querySelector('.cell-amount');
        if (amountCell) {
          amountCell.textContent = formatCurrency(qty * price);
        }
        recalculateTotals();
      }
    }
    savePoState();
  });

  tableBody.addEventListener('blur', (e) => {
    const target = e.target;
    if (target.classList.contains('cell-price') || target.classList.contains('cell-amount')) {
      const val = parseAmount(target.innerText);
      target.textContent = formatCurrency(val);
      recalculateTotals();
    }
    savePoState();
  }, true);

  // Global blur listener for all other contenteditable elements
  if (poDoc) {
    poDoc.addEventListener('input', () => {
      savePoState();
    });
  }

  // ==========================================================================
  // Quick Products Catalog Dropdown
  // ==========================================================================
  if (quickItemsPopover) {
    quickItemsPopover.innerHTML = `
      <div class="popover-header">
        <h4>GLE Product Catalog</h4>
        <button type="button" class="popover-close-btn" id="closeQuickItemsBtn">&times;</button>
      </div>
      <div style="display: flex; flex-direction: column; gap: 6px; max-height: 380px; overflow-y: auto;">
        ${productCatalog.map((prod, idx) => `
          <button type="button" class="quick-item-btn" data-catalog-idx="${idx}">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span class="item-name">${escapeHtml(prod.name)}</span>
              <span style="font-size: 0.65rem; background: rgba(5,106,66,0.25); color: #34d399; padding: 1px 5px; border-radius: 3px;">${escapeHtml(prod.unit)}</span>
            </div>
            <span class="item-desc">${escapeHtml(prod.desc)}</span>
            <span class="item-rate">Rs. ${formatCurrency(prod.price)} / ${escapeHtml(prod.unit)} (Qty: ${prod.qty})</span>
          </button>
        `).join('')}
      </div>
    `;

    const closeBtn = document.getElementById('closeQuickItemsBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        quickItemsPopover.classList.remove('is-open');
      });
    }

    if (quickItemsBtn) {
      quickItemsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        quickItemsPopover.classList.toggle('is-open');
        if (clientsPopover) clientsPopover.classList.remove('is-open');
        if (docTypePopover) docTypePopover.classList.remove('is-open');
        if (taxPopover) taxPopover.classList.remove('is-open');
        if (discountPopover) discountPopover.classList.remove('is-open');
        if (spacingPopover) spacingPopover.classList.remove('is-open');
        if (iconsPopover) iconsPopover.classList.remove('is-open');
      });
    }

    quickItemsPopover.querySelectorAll('.quick-item-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-catalog-idx'), 10);
        const item = productCatalog[idx];
        if (item) {
          addRow({
            code: item.code,
            name: item.name,
            unit: item.unit,
            qty: item.qty,
            price: item.price
          });
        }
        quickItemsPopover.classList.remove('is-open');
      });
    });
  }

  // ==========================================================================
  // Quick Parties (Buyers / Suppliers) Dropdown
  // ==========================================================================
  if (clientsPopover) {
    clientsPopover.innerHTML = `
      <div class="popover-header">
        <h4>Procurement Parties</h4>
        <button type="button" class="popover-close-btn" id="closeClientsBtn">&times;</button>
      </div>
      <div style="display: flex; flex-direction: column; gap: 6px; max-height: 380px; overflow-y: auto;">
        ${partiesCatalog.map((party, idx) => `
          <button type="button" class="quick-item-btn" data-client-idx="${idx}">
            <span class="item-name">${escapeHtml(party.name)}</span>
            <span class="item-desc">${escapeHtml(party.buyer.addr1)}, ${escapeHtml(party.buyer.addr2)}</span>
          </button>
        `).join('')}
      </div>
    `;

    const closeClientsBtn = document.getElementById('closeClientsBtn');
    if (closeClientsBtn) {
      closeClientsBtn.addEventListener('click', () => {
        clientsPopover.classList.remove('is-open');
      });
    }

    if (clientsMenuBtn) {
      clientsMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        clientsPopover.classList.toggle('is-open');
        if (quickItemsPopover) quickItemsPopover.classList.remove('is-open');
        if (docTypePopover) docTypePopover.classList.remove('is-open');
        if (taxPopover) taxPopover.classList.remove('is-open');
        if (discountPopover) discountPopover.classList.remove('is-open');
        if (spacingPopover) spacingPopover.classList.remove('is-open');
        if (iconsPopover) iconsPopover.classList.remove('is-open');
      });
    }

    clientsPopover.querySelectorAll('.quick-item-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-client-idx'), 10);
        const party = partiesCatalog[idx];
        if (party) {
          const setField = (key, val) => {
            const el = document.querySelector(`[data-key="${key}"]`);
            if (el) el.innerText = val;
          };

          setField('buyerCompany', party.buyer.company);
          setField('buyerAttn', party.buyer.attn);
          setField('buyerAddress1', party.buyer.addr1);
          setField('buyerAddress2', party.buyer.addr2);
          setField('buyerContact', party.buyer.contact);

          setField('shipCompany', party.ship.company);
          setField('shipAttn', party.ship.attn);
          setField('shipAddress1', party.ship.addr1);
          setField('shipContact', party.ship.contact);
          setField('shipHours', party.ship.hours);

          savePoState();
        }
        clientsPopover.classList.remove('is-open');
      });
    });
  }

  // ==========================================================================
  // Document Type Selector
  // ==========================================================================
  if (docTypeMenuBtn && docTypePopover) {
    docTypeMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      docTypePopover.classList.toggle('is-open');
      if (quickItemsPopover) quickItemsPopover.classList.remove('is-open');
      if (clientsPopover) clientsPopover.classList.remove('is-open');
      if (taxPopover) taxPopover.classList.remove('is-open');
      if (discountPopover) discountPopover.classList.remove('is-open');
      if (spacingPopover) spacingPopover.classList.remove('is-open');
      if (iconsPopover) iconsPopover.classList.remove('is-open');
    });

    if (closeDocTypeBtn) {
      closeDocTypeBtn.addEventListener('click', () => {
        docTypePopover.classList.remove('is-open');
      });
    }

    docTypePopover.querySelectorAll('.quick-item-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const title = btn.getAttribute('data-doctype');
        const prefix = btn.getAttribute('data-prefix');

        if (docTypeHeading) docTypeHeading.textContent = title;
        if (docTypeLabel) docTypeLabel.textContent = title;

        const poNoEl = document.querySelector('[data-key="poNumber"]');
        if (poNoEl && prefix) {
          const cur = poNoEl.innerText.trim();
          const match = cur.match(/\d+$/);
          const num = match ? match[0] : '088';
          poNoEl.innerText = `${prefix}2026-${num}`;
        }

        docTypePopover.classList.remove('is-open');
        savePoState();
      });
    });
  }

  // ==========================================================================
  // Tax / VAT Selector
  // ==========================================================================
  if (taxMenuBtn && taxPopover) {
    taxMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      taxPopover.classList.toggle('is-open');
      [docTypePopover, quickItemsPopover, clientsPopover, discountPopover, spacingPopover, iconsPopover].forEach(p => {
        if (p) p.classList.remove('is-open');
      });
    });

    if (closeTaxBtn) {
      closeTaxBtn.addEventListener('click', () => {
        taxPopover.classList.remove('is-open');
      });
    }

    taxPopover.querySelectorAll('.quick-item-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentTaxRate = parseFloat(btn.getAttribute('data-tax')) || 0;
        currentTaxName = btn.getAttribute('data-tax-label') || 'Non-VAT (0%)';
        if (taxRateLabel) taxRateLabel.textContent = currentTaxRate === 0 ? 'Non-VAT (0%)' : `${currentTaxRate}%`;
        taxPopover.classList.remove('is-open');
        recalculateTotals();
        savePoState();
      });
    });
  }

  // ==========================================================================
  // Discount Selector
  // ==========================================================================
  if (discountMenuBtn && discountPopover) {
    discountMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      discountPopover.classList.toggle('is-open');
      [docTypePopover, quickItemsPopover, clientsPopover, taxPopover, spacingPopover, iconsPopover].forEach(p => {
        if (p) p.classList.remove('is-open');
      });
    });

    if (closeDiscountBtn) {
      closeDiscountBtn.addEventListener('click', () => {
        discountPopover.classList.remove('is-open');
      });
    }

    discountPopover.querySelectorAll('.quick-item-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentDiscountPercent = parseFloat(btn.getAttribute('data-discount')) || 0;
        if (currentDiscountLabel) currentDiscountLabel.textContent = `${currentDiscountPercent}%`;
        discountPopover.classList.remove('is-open');
        recalculateTotals();
        savePoState();
      });
    });
  }

  // ==========================================================================
  // Text Edit Outlines Toggle
  // ==========================================================================
  if (toggleEditBtn) {
    toggleEditBtn.addEventListener('click', () => {
      showEditOutlines = !showEditOutlines;
      document.body.classList.toggle('is-editing', showEditOutlines);
      toggleEditBtn.classList.toggle('active', showEditOutlines);
      if (editBtnText) {
        editBtnText.textContent = showEditOutlines ? 'Hide Outlines' : 'Show Outlines';
      }
    });
  }

  // Bullet Notes: Enter key creates a new bullet easily, Backspace removes empty bullet
  const notesList = document.querySelector('.notes-list');
  if (notesList) {
    notesList.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const newLi = document.createElement('li');
        newLi.setAttribute('contenteditable', 'true');
        newLi.setAttribute('spellcheck', 'false');
        newLi.textContent = 'New commercial clause or purchasing instruction.';
        if (e.target && e.target.tagName === 'LI') {
          e.target.after(newLi);
        } else {
          notesList.appendChild(newLi);
        }
        newLi.focus();
        savePoState();
      } else if (e.key === 'Backspace' && e.target && e.target.tagName === 'LI') {
        const text = e.target.textContent.trim();
        if (text === '' && notesList.querySelectorAll('li').length > 1) {
          e.preventDefault();
          const prev = e.target.previousElementSibling || e.target.nextElementSibling;
          e.target.remove();
          if (prev) prev.focus();
          savePoState();
        }
      }
    });
  }

  // ==========================================================================
  // Feature Toggles (Ship-To, Bank, Seal, Signature, Vendor Ack Box)
  // ==========================================================================
  if (toggleShipToBtn && shipToBlock && partiesGrid) {
    toggleShipToBtn.addEventListener('click', () => {
      const isVisible = shipToBlock.style.display !== 'none';
      shipToBlock.style.display = isVisible ? 'none' : 'flex';
      partiesGrid.style.gridTemplateColumns = isVisible ? '1fr 1fr' : '1fr 1fr 1fr';
      toggleShipToBtn.classList.toggle('active', !isVisible);
      savePoState();
    });
  }

  if (toggleBankBtn && bankDetailsCard) {
    toggleBankBtn.addEventListener('click', () => {
      const isVisible = bankDetailsCard.style.display !== 'none';
      bankDetailsCard.style.display = isVisible ? 'none' : 'block';
      toggleBankBtn.classList.toggle('active', !isVisible);
      savePoState();
    });
  }

  if (toggleStampBtn && corporateSeal) {
    toggleStampBtn.addEventListener('click', () => {
      const isVisible = corporateSeal.style.display !== 'none';
      corporateSeal.style.display = isVisible ? 'none' : 'flex';
      toggleStampBtn.classList.toggle('active', !isVisible);
      savePoState();
    });
  }

  if (toggleSignatureBtn && digitalSignatureWrap) {
    toggleSignatureBtn.addEventListener('click', () => {
      const isVisible = digitalSignatureWrap.style.display !== 'none';
      digitalSignatureWrap.style.display = isVisible ? 'none' : 'flex';
      toggleSignatureBtn.classList.toggle('active', !isVisible);
      savePoState();
    });
  }

  if (toggleVendorAckBtn && vendorAckBox) {
    toggleVendorAckBtn.addEventListener('click', () => {
      const isVisible = vendorAckBox.style.display !== 'none';
      vendorAckBox.style.display = isVisible ? 'none' : 'block';
      toggleVendorAckBtn.classList.toggle('active', !isVisible);
      savePoState();
    });
  }

  // ==========================================================================
  // Feature Toggles: Icons & Checkmarks Control Engine
  // ==========================================================================
  function updateIconsUI() {
    if (poDoc) {
      poDoc.classList.toggle('icons-hidden', !iconsVisible);
      poDoc.classList.toggle('hide-terms-icon', !termsIconVisible);
      poDoc.classList.toggle('hide-ack-icon', !ackIconVisible);
      poDoc.classList.toggle('hide-bank-icon', !bankIconVisible);
    }

    if (toggleIconsBtn) {
      toggleIconsBtn.classList.toggle('active', iconsVisible);
    }
    if (iconsBtnLabel) {
      iconsBtnLabel.textContent = iconsVisible ? 'On' : 'Off';
    }

    if (notesList) {
      notesList.classList.remove('bullet-check', 'bullet-dot', 'bullet-dash', 'bullet-number', 'bullet-none');
      notesList.classList.add(`bullet-${currentBulletStyle}`);
      notesList.setAttribute('data-bullet', currentBulletStyle);
    }

    if (popoverToggleAllTitle) {
      popoverToggleAllTitle.textContent = iconsVisible ? '✕ Hide All Icons' : '✓ Show All Icons';
    }
    if (popoverToggleAllBadge) {
      popoverToggleAllBadge.textContent = iconsVisible ? 'Active' : 'Hidden';
      popoverToggleAllBadge.className = `icon-toggle-pill ${iconsVisible ? 'on' : 'off'}`;
    }

    if (iconsPopover) {
      iconsPopover.querySelectorAll('.icon-bullet-btn').forEach(btn => {
        const style = btn.getAttribute('data-bullet');
        btn.classList.toggle('active', style === currentBulletStyle);
      });
    }

    if (termsHeadingIconPill) {
      termsHeadingIconPill.textContent = termsIconVisible ? 'Shown' : 'Hidden';
      termsHeadingIconPill.className = `icon-toggle-pill ${termsIconVisible ? 'on' : 'off'}`;
    }
    if (ackHeadingIconPill) {
      ackHeadingIconPill.textContent = ackIconVisible ? 'Shown' : 'Hidden';
      ackHeadingIconPill.className = `icon-toggle-pill ${ackIconVisible ? 'on' : 'off'}`;
    }
    if (bankHeadingIconPill) {
      bankHeadingIconPill.textContent = bankIconVisible ? 'Shown' : 'Hidden';
      bankHeadingIconPill.className = `icon-toggle-pill ${bankIconVisible ? 'on' : 'off'}`;
    }
  }

  // 1-Click Master Icons Toggle Button in Toolbar
  if (toggleIconsBtn) {
    toggleIconsBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      iconsVisible = !iconsVisible;
      updateIconsUI();
      savePoState();
    });
  }

  // Open / Close Icons Options Popover
  if (iconsMenuBtn && iconsPopover) {
    iconsMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      iconsPopover.classList.toggle('is-open');
      [docTypePopover, quickItemsPopover, clientsPopover, taxPopover, discountPopover, spacingPopover].forEach(p => {
        if (p) p.classList.remove('is-open');
      });
    });
  }

  if (closeIconsBtn && iconsPopover) {
    closeIconsBtn.addEventListener('click', () => {
      iconsPopover.classList.remove('is-open');
    });
  }

  // Popover: Toggle All Icons Action
  if (popoverToggleAllIcons) {
    popoverToggleAllIcons.addEventListener('click', () => {
      iconsVisible = !iconsVisible;
      updateIconsUI();
      savePoState();
    });
  }

  // Popover: Select Bullet Style
  if (iconsPopover) {
    iconsPopover.querySelectorAll('.icon-bullet-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const style = btn.getAttribute('data-bullet');
        currentBulletStyle = style;
        if (style !== 'none') {
          iconsVisible = true;
        }
        updateIconsUI();
        savePoState();
      });
    });
  }

  // Popover: Toggle Individual Heading Icons
  if (toggleTermsHeadingIcon) {
    toggleTermsHeadingIcon.addEventListener('click', () => {
      termsIconVisible = !termsIconVisible;
      updateIconsUI();
      savePoState();
    });
  }

  if (toggleAckHeadingIcon) {
    toggleAckHeadingIcon.addEventListener('click', () => {
      ackIconVisible = !ackIconVisible;
      updateIconsUI();
      savePoState();
    });
  }

  if (toggleBankHeadingIcon) {
    toggleBankHeadingIcon.addEventListener('click', () => {
      bankIconVisible = !bankIconVisible;
      updateIconsUI();
      savePoState();
    });
  }

  // Document Heading Icons: Click directly in edit mode to toggle/hide
  const termsHeadingIconEl = document.getElementById('termsHeadingIcon');
  if (termsHeadingIconEl) {
    termsHeadingIconEl.addEventListener('click', (e) => {
      e.stopPropagation();
      termsIconVisible = !termsIconVisible;
      updateIconsUI();
      savePoState();
    });
  }

  const ackHeadingIconEl = document.getElementById('ackHeadingIcon');
  if (ackHeadingIconEl) {
    ackHeadingIconEl.addEventListener('click', (e) => {
      e.stopPropagation();
      ackIconVisible = !ackIconVisible;
      updateIconsUI();
      savePoState();
    });
  }

  const bankHeadingIconEl = document.getElementById('bankHeadingIcon');
  if (bankHeadingIconEl) {
    bankHeadingIconEl.addEventListener('click', (e) => {
      e.stopPropagation();
      bankIconVisible = !bankIconVisible;
      updateIconsUI();
      savePoState();
    });
  }

  // ==========================================================================
  // Status Pill & Watermark Stamp
  // ==========================================================================
  if (headerStatusPill) {
    headerStatusPill.addEventListener('click', () => {
      currentHeaderStatusIndex = (currentHeaderStatusIndex + 1) % headerStatuses.length;
      const status = headerStatuses[currentHeaderStatusIndex];
      
      headerStatusPill.className = `po-status-pill ${status.id}`;
      if (headerStatusText) headerStatusText.textContent = status.text;

      // Sync watermark stamp
      if (status.id === 'status-approved') {
        currentStampIndex = 1;
      } else if (status.id === 'status-issued') {
        currentStampIndex = 2;
      } else if (status.id === 'status-pending') {
        currentStampIndex = 3;
      } else if (status.id === 'status-confirmed') {
        currentStampIndex = 4;
      }
      applyStampIndex();
      savePoState();
    });
  }

  function applyStampIndex() {
    const stampType = stampStatuses[currentStampIndex];
    if (statusStamp) {
      statusStamp.className = 'po-status-stamp';
      if (stampType === 'approved') {
        statusStamp.classList.add('status-approved');
        statusStamp.textContent = 'APPROVED';
        statusStamp.style.display = 'block';
      } else if (stampType === 'issued') {
        statusStamp.classList.add('status-issued');
        statusStamp.textContent = 'ISSUED';
        statusStamp.style.display = 'block';
      } else if (stampType === 'pending') {
        statusStamp.classList.add('status-pending');
        statusStamp.textContent = 'PENDING';
        statusStamp.style.display = 'block';
      } else if (stampType === 'confirmed') {
        statusStamp.classList.add('status-confirmed');
        statusStamp.textContent = 'CONFIRMED';
        statusStamp.style.display = 'block';
      } else {
        statusStamp.style.display = 'none';
      }
    }
    if (statusStampLabel) {
      statusStampLabel.textContent = stampType.toUpperCase();
    }
  }

  if (statusStampBtn) {
    statusStampBtn.addEventListener('click', () => {
      currentStampIndex = (currentStampIndex + 1) % stampStatuses.length;
      applyStampIndex();
      savePoState();
    });
  }

  // ==========================================================================
  // Themes Engine
  // ==========================================================================
  if (themeToggleBtn && poDoc) {
    themeToggleBtn.addEventListener('click', () => {
      currentThemeIndex = (currentThemeIndex + 1) % themes.length;
      const theme = themes[currentThemeIndex];
      poDoc.className = `a4-sheet ${theme.id}`;
      if (currentThemeName) currentThemeName.textContent = theme.name;
      savePoState();
    });
  }

  // ==========================================================================
  // Typography & Spacing Menu Controls
  // ==========================================================================
  let currentSpacingSettings = {
    wordSpacing: '0.03em',
    lineHeight: '1.46',
    letterSpacing: '0.00em',
    fontWeight: '400',
    preset: 'normal'
  };

  function applySpacingSettings(settings) {
    if (!settings) return;

    if (settings.wordSpacing !== undefined) {
      const rawVal = settings.wordSpacing;
      const valStr = typeof rawVal === 'number' ? `${rawVal}em` : (rawVal.includes('em') ? rawVal : `${rawVal}em`);
      document.documentElement.style.setProperty('--text-word-spacing', valStr);
      if (poDoc) poDoc.style.setProperty('--text-word-spacing', valStr);
      if (wordSpacingSlider) wordSpacingSlider.value = parseFloat(valStr);
      if (wordGapVal) wordGapVal.textContent = valStr;
      currentSpacingSettings.wordSpacing = valStr;
    }

    if (settings.lineHeight !== undefined) {
      const valStr = `${settings.lineHeight}`;
      document.documentElement.style.setProperty('--text-line-height', valStr);
      if (poDoc) poDoc.style.setProperty('--text-line-height', valStr);
      if (lineHeightSlider) lineHeightSlider.value = parseFloat(valStr);
      if (lineHeightVal) lineHeightVal.textContent = valStr;
      currentSpacingSettings.lineHeight = valStr;
    }

    if (settings.letterSpacing !== undefined) {
      const rawVal = settings.letterSpacing;
      const valStr = typeof rawVal === 'number' ? `${rawVal}em` : (rawVal.includes('em') ? rawVal : `${rawVal}em`);
      document.documentElement.style.setProperty('--text-letter-spacing', valStr);
      if (poDoc) poDoc.style.setProperty('--text-letter-spacing', valStr);
      if (letterSpacingSlider) letterSpacingSlider.value = parseFloat(valStr);
      if (letterGapVal) letterGapVal.textContent = valStr;
      currentSpacingSettings.letterSpacing = valStr;
    }

    if (settings.fontWeight !== undefined) {
      const weightMap = { normal: '400', medium: '500', semibold: '600', bold: '700' };
      const numWeight = weightMap[settings.fontWeight] || settings.fontWeight;
      document.documentElement.style.setProperty('--text-font-weight', numWeight);
      if (poDoc) poDoc.style.setProperty('--text-font-weight', numWeight);
      currentSpacingSettings.fontWeight = numWeight;

      const weightLabels = { '400': 'Regular (400)', '500': 'Medium (500)', '600': 'SemiBold (600)', '700': 'Bold (700)' };
      if (textWeightVal) textWeightVal.textContent = weightLabels[numWeight] || numWeight;

      if (spacingPopover) {
        spacingPopover.querySelectorAll('.weight-pill').forEach(b => {
          const w = b.getAttribute('data-weight');
          b.classList.toggle('active', (weightMap[w] || w) === numWeight);
        });
      }
    }

    if (settings.preset) {
      currentSpacingSettings.preset = settings.preset;
      if (spacingPopover) {
        spacingPopover.querySelectorAll('.preset-pill').forEach(b => {
          b.classList.toggle('active', b.getAttribute('data-preset') === settings.preset);
        });
        const activeBtn = spacingPopover.querySelector(`.preset-pill[data-preset="${settings.preset}"]`);
        if (activeBtn && currentGapLabel) {
          currentGapLabel.textContent = activeBtn.textContent;
        }
      }
    }
  }

  if (spacingMenuBtn && spacingPopover) {
    spacingMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      spacingPopover.classList.toggle('is-open');
      [docTypePopover, quickItemsPopover, clientsPopover, taxPopover, discountPopover, iconsPopover, sectionSizePopover].forEach(p => {
        if (p) p.classList.remove('is-open');
      });
    });

    if (closeSpacingBtn) {
      closeSpacingBtn.addEventListener('click', () => {
        spacingPopover.classList.remove('is-open');
      });
    }

    if (wordSpacingSlider) {
      wordSpacingSlider.addEventListener('input', () => {
        applySpacingSettings({ wordSpacing: wordSpacingSlider.value, preset: 'custom' });
        if (currentGapLabel) currentGapLabel.textContent = 'Custom';
        if (spacingPopover) spacingPopover.querySelectorAll('.preset-pill').forEach(b => b.classList.remove('active'));
        savePoState();
      });
    }

    if (lineHeightSlider) {
      lineHeightSlider.addEventListener('input', () => {
        applySpacingSettings({ lineHeight: lineHeightSlider.value, preset: 'custom' });
        if (currentGapLabel) currentGapLabel.textContent = 'Custom';
        if (spacingPopover) spacingPopover.querySelectorAll('.preset-pill').forEach(b => b.classList.remove('active'));
        savePoState();
      });
    }

    if (letterSpacingSlider) {
      letterSpacingSlider.addEventListener('input', () => {
        applySpacingSettings({ letterSpacing: letterSpacingSlider.value, preset: 'custom' });
        if (currentGapLabel) currentGapLabel.textContent = 'Custom';
        if (spacingPopover) spacingPopover.querySelectorAll('.preset-pill').forEach(b => b.classList.remove('active'));
        savePoState();
      });
    }

    spacingPopover.querySelectorAll('.weight-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const weight = btn.getAttribute('data-weight');
        applySpacingSettings({ fontWeight: weight });
        savePoState();
      });
    });

    spacingPopover.querySelectorAll('.preset-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const preset = btn.getAttribute('data-preset');
        let presetVals = { preset };

        if (preset === 'compact') {
          presetVals.wordSpacing = 0.01;
          presetVals.lineHeight = 1.35;
          presetVals.letterSpacing = -0.01;
        } else if (preset === 'normal') {
          presetVals.wordSpacing = 0.03;
          presetVals.lineHeight = 1.46;
          presetVals.letterSpacing = 0.00;
        } else if (preset === 'spacious') {
          presetVals.wordSpacing = 0.08;
          presetVals.lineHeight = 1.68;
          presetVals.letterSpacing = 0.02;
        } else if (preset === 'wide') {
          presetVals.wordSpacing = 0.12;
          presetVals.lineHeight = 1.85;
          presetVals.letterSpacing = 0.04;
        }

        applySpacingSettings(presetVals);
        savePoState();
      });
    });
  }

  // ==========================================================================
  // Section-by-Section Text Size Engine (කෑල්ලෙන් කෑල්ලට Text Size)
  // ==========================================================================
  function applySectionScale(sectionKey, scale) {
    scale = Math.max(0.65, Math.min(1.60, Math.round(scale * 100) / 100));
    sectionScales[sectionKey] = scale;

    if (poDoc) {
      poDoc.style.setProperty(`--scale-${sectionKey}`, scale);
    }

    const pctText = `${Math.round(scale * 100)}%`;

    // 1. Update floating pills on the sheet
    document.querySelectorAll(`.section-size-ctrl[data-section="${sectionKey}"] .sec-ctrl-val`).forEach(el => {
      el.textContent = pctText;
    });

    // 2. Update toolbar popover badge
    const popBadge = document.getElementById(`val-${sectionKey}`);
    if (popBadge) {
      popBadge.textContent = pctText;
    }

    // Save
    try {
      localStorage.setItem(SECTION_SCALES_STORAGE_KEY, JSON.stringify(sectionScales));
    } catch (e) {}
  }

  function loadSectionScales() {
    try {
      const saved = localStorage.getItem(SECTION_SCALES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        Object.keys(parsed).forEach(k => {
          if (typeof parsed[k] === 'number') {
            applySectionScale(k, parsed[k]);
          }
        });
      }
    } catch (e) {}
  }

  // Floating section controller event listeners (hover pill on sheet)
  document.querySelectorAll('.section-size-ctrl').forEach(ctrl => {
    const sec = ctrl.getAttribute('data-section');
    const decBtn = ctrl.querySelector('.sec-ctrl-btn.dec');
    const incBtn = ctrl.querySelector('.sec-ctrl-btn.inc');
    const resetBtn = ctrl.querySelector('.sec-ctrl-btn.reset');

    if (decBtn) {
      decBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const current = sectionScales[sec] !== undefined ? sectionScales[sec] : 1.0;
        applySectionScale(sec, current - 0.05);
      });
    }

    if (incBtn) {
      incBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const current = sectionScales[sec] !== undefined ? sectionScales[sec] : 1.0;
        applySectionScale(sec, current + 0.05);
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        applySectionScale(sec, 1.0);
      });
    }
  });

  // Toolbar popover controls
  if (sectionSizeMenuBtn && sectionSizePopover) {
    sectionSizeMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sectionSizePopover.classList.toggle('is-open');
      [docTypePopover, quickItemsPopover, clientsPopover, taxPopover, discountPopover, spacingPopover, iconsPopover].forEach(p => {
        if (p) p.classList.remove('is-open');
      });
    });

    if (closeSectionSizeBtn) {
      closeSectionSizeBtn.addEventListener('click', () => {
        sectionSizePopover.classList.remove('is-open');
      });
    }

    // Individual section rows in popover
    sectionSizePopover.querySelectorAll('.section-size-row').forEach(row => {
      const sec = row.getAttribute('data-sec');
      const dec = row.querySelector('.sec-btn-dec');
      const inc = row.querySelector('.sec-btn-inc');

      if (dec) {
        dec.addEventListener('click', () => {
          const current = sectionScales[sec] !== undefined ? sectionScales[sec] : 1.0;
          applySectionScale(sec, current - 0.05);
        });
      }

      if (inc) {
        inc.addEventListener('click', () => {
          const current = sectionScales[sec] !== undefined ? sectionScales[sec] : 1.0;
          applySectionScale(sec, current + 0.05);
        });
      }
    });

    // Global presets in popover
    sectionSizePopover.querySelectorAll('.sec-preset-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const scaleVal = parseFloat(pill.getAttribute('data-all-scale')) || 1.0;
        sectionSizePopover.querySelectorAll('.sec-preset-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        Object.keys(defaultSectionScales).forEach(secKey => {
          applySectionScale(secKey, scaleVal);
        });
      });
    });

    // Reset All button
    if (resetAllSectionSizesBtn) {
      resetAllSectionSizesBtn.addEventListener('click', () => {
        Object.keys(defaultSectionScales).forEach(secKey => {
          applySectionScale(secKey, 1.0);
        });
        sectionSizePopover.querySelectorAll('.sec-preset-pill').forEach(p => {
          p.classList.toggle('active', p.getAttribute('data-all-scale') === '1.0');
        });
      });
    }
  }

  // Close open popovers when clicking outside
  document.addEventListener('click', (e) => {
    if (quickItemsPopover && !quickItemsPopover.contains(e.target) && (!quickItemsBtn || !quickItemsBtn.contains(e.target))) {
      quickItemsPopover.classList.remove('is-open');
    }
    if (clientsPopover && !clientsPopover.contains(e.target) && (!clientsMenuBtn || !clientsMenuBtn.contains(e.target))) {
      clientsPopover.classList.remove('is-open');
    }
    if (docTypePopover && !docTypePopover.contains(e.target) && (!docTypeMenuBtn || !docTypeMenuBtn.contains(e.target))) {
      docTypePopover.classList.remove('is-open');
    }
    if (taxPopover && !taxPopover.contains(e.target) && (!taxMenuBtn || !taxMenuBtn.contains(e.target))) {
      taxPopover.classList.remove('is-open');
    }
    if (discountPopover && !discountPopover.contains(e.target) && (!discountMenuBtn || !discountMenuBtn.contains(e.target))) {
      discountPopover.classList.remove('is-open');
    }
    if (spacingPopover && !spacingPopover.contains(e.target) && (!spacingMenuBtn || !spacingMenuBtn.contains(e.target))) {
      spacingPopover.classList.remove('is-open');
    }
    if (iconsPopover && !iconsPopover.contains(e.target) && (!iconsMenuBtn || !iconsMenuBtn.contains(e.target)) && (!toggleIconsBtn || !toggleIconsBtn.contains(e.target))) {
      iconsPopover.classList.remove('is-open');
    }
    if (sectionSizePopover && !sectionSizePopover.contains(e.target) && (!sectionSizeMenuBtn || !sectionSizeMenuBtn.contains(e.target))) {
      sectionSizePopover.classList.remove('is-open');
    }
  });

  // ==========================================================================
  // Increment Next PO Number
  // ==========================================================================
  if (nextPoBtn) {
    nextPoBtn.addEventListener('click', () => {
      const poNoEl = document.querySelector('[data-key="poNumber"]');
      if (poNoEl) {
        const text = poNoEl.innerText.trim();
        const match = text.match(/^(.*?)(\d+)$/);
        if (match) {
          const prefix = match[1];
          const num = parseInt(match[2], 10) + 1;
          const padded = num.toString().padStart(match[2].length, '0');
          poNoEl.innerText = `${prefix}${padded}`;
          savePoState();
        }
      }
    });
  }

  // ==========================================================================
  // Export & Import JSON
  // ==========================================================================
  function gatherPoData() {
    const fields = {};
    document.querySelectorAll('#poDoc [data-key]').forEach(el => {
      fields[el.getAttribute('data-key')] = el.innerText.trim();
    });

    const items = [];
    tableBody.querySelectorAll('tr.po-row').forEach(row => {
      items.push({
        code: row.querySelector('.cell-code')?.innerText.trim() || '',
        name: row.querySelector('.cell-item')?.innerText.trim() || '',
        unit: row.querySelector('.unit-pill')?.innerText.trim() || 'Rolls',
        qty: parseAmount(row.querySelector('.cell-qty')?.innerText),
        price: parseAmount(row.querySelector('.cell-price')?.innerText)
      });
    });

    const notes = [];
    document.querySelectorAll('.notes-list li').forEach(li => {
      notes.push(li.innerText.trim());
    });

    return {
      docType: docTypeHeading ? docTypeHeading.innerText : 'OFFICIAL PURCHASE ORDER',
      fields,
      items,
      notes,
      theme: themes[currentThemeIndex].id,
      headerStatus: headerStatuses[currentHeaderStatusIndex].id,
      watermark: stampStatuses[currentStampIndex],
      taxRate: currentTaxRate,
      discountPercent: currentDiscountPercent,
      shipToVisible: shipToBlock ? shipToBlock.style.display !== 'none' : true,
      bankVisible: bankDetailsCard ? bankDetailsCard.style.display !== 'none' : true,
      stampVisible: corporateSeal ? corporateSeal.style.display !== 'none' : true,
      signatureVisible: digitalSignatureWrap ? digitalSignatureWrap.style.display !== 'none' : true,
      vendorAckVisible: vendorAckBox ? vendorAckBox.style.display !== 'none' : true,
      iconsVisible,
      bulletStyle: currentBulletStyle,
      termsIconVisible,
      ackIconVisible,
      bankIconVisible,
      sectionScales,
      spacing: currentSpacingSettings,
      savedAt: new Date().toISOString()
    };
  }

  if (exportJsonBtn) {
    exportJsonBtn.addEventListener('click', () => {
      const data = gatherPoData();
      const poNo = data.fields.poNumber || 'PO-2026-088';
      const jsonStr = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `GLE-PO-${poNo.replace(/[^a-zA-Z0-9_-]/g, '_')}.json`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  if (importJsonInput) {
    importJsonInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const data = JSON.parse(evt.target.result);
          applyPoData(data);
          alert('Purchase Order data successfully loaded!');
        } catch (err) {
          alert('Failed to parse PO JSON: ' + err.message);
        }
      };
      reader.readAsText(file);
    });
  }

  function applyPoData(data) {
    if (!data) return;

    if (data.docType && docTypeHeading) {
      docTypeHeading.textContent = data.docType;
      if (docTypeLabel) docTypeLabel.textContent = data.docType;
    }

    if (data.fields) {
      if (data.fields.signatoryName === 'Chaminda Pathirana') {
        data.fields.signatoryName = 'Imara Weerasinghe';
        data.fields.signatoryRole = 'Proprietor / Authorized Officer';
      }
      if (data.fields.closingSalute === 'Authorized Purchasing Authority,' || !data.fields.closingSalute) {
        data.fields.closingSalute = 'For Green Light Enterprises,';
      }
      if (data.fields.signatureCursive === 'Chaminda Pathirana' || !data.fields.signatureCursive) {
        data.fields.signatureCursive = 'Imara Weerasinghe';
      }
      Object.keys(data.fields).forEach(key => {
        const el = document.querySelector(`[data-key="${key}"]`);
        if (el) el.innerText = data.fields[key];
      });
    }

    if (data.spacing) {
      applySpacingSettings(data.spacing);
    }

    if (Array.isArray(data.items) && data.items.length > 0) {
      tableBody.innerHTML = '';
      data.items.forEach(item => {
        addRow(item);
      });
    }

    if (Array.isArray(data.notes) && data.notes.length > 0 && notesList) {
      notesList.innerHTML = '';
      data.notes.forEach(noteText => {
        const li = document.createElement('li');
        li.setAttribute('contenteditable', 'true');
        li.setAttribute('spellcheck', 'false');
        li.textContent = noteText;
        notesList.appendChild(li);
      });
    }

    if (data.taxRate !== undefined) {
      currentTaxRate = data.taxRate;
      if (taxRateLabel) taxRateLabel.textContent = currentTaxRate === 0 ? 'Non-VAT (0%)' : `${currentTaxRate}%`;
    }

    if (data.discountPercent !== undefined) {
      currentDiscountPercent = data.discountPercent;
      if (currentDiscountLabel) currentDiscountLabel.textContent = `${currentDiscountPercent}%`;
    }

    if (data.theme) {
      const idx = themes.findIndex(t => t.id === data.theme);
      if (idx !== -1) {
        currentThemeIndex = idx;
        poDoc.className = `a4-sheet ${themes[idx].id}`;
        if (currentThemeName) currentThemeName.textContent = themes[idx].name;
      }
    }

    if (data.watermark) {
      const idx = stampStatuses.indexOf(data.watermark);
      if (idx !== -1) {
        currentStampIndex = idx;
        applyStampIndex();
      }
    }

    if (shipToBlock && data.shipToVisible !== undefined) {
      shipToBlock.style.display = data.shipToVisible ? 'flex' : 'none';
      if (partiesGrid) partiesGrid.style.gridTemplateColumns = data.shipToVisible ? '1fr 1fr 1fr' : '1fr 1fr';
      if (toggleShipToBtn) toggleShipToBtn.classList.toggle('active', data.shipToVisible);
    }

    if (bankDetailsCard && data.bankVisible !== undefined) {
      bankDetailsCard.style.display = data.bankVisible ? 'block' : 'none';
      if (toggleBankBtn) toggleBankBtn.classList.toggle('active', data.bankVisible);
    }

    if (corporateSeal && data.stampVisible !== undefined) {
      corporateSeal.style.display = data.stampVisible ? 'flex' : 'none';
      if (toggleStampBtn) toggleStampBtn.classList.toggle('active', data.stampVisible);
    }

    if (digitalSignatureWrap && data.signatureVisible !== undefined) {
      digitalSignatureWrap.style.display = data.signatureVisible ? 'flex' : 'none';
      if (toggleSignatureBtn) toggleSignatureBtn.classList.toggle('active', data.signatureVisible);
    }

    if (vendorAckBox && data.vendorAckVisible !== undefined) {
      vendorAckBox.style.display = data.vendorAckVisible ? 'block' : 'none';
      if (toggleVendorAckBtn) toggleVendorAckBtn.classList.toggle('active', data.vendorAckVisible);
    }

    if (data.iconsVisible !== undefined) iconsVisible = data.iconsVisible;
    if (data.bulletStyle) currentBulletStyle = data.bulletStyle;
    if (data.termsIconVisible !== undefined) termsIconVisible = data.termsIconVisible;
    if (data.ackIconVisible !== undefined) ackIconVisible = data.ackIconVisible;
    if (data.bankIconVisible !== undefined) bankIconVisible = data.bankIconVisible;
    updateIconsUI();

    if (data.sectionScales && typeof data.sectionScales === 'object') {
      Object.keys(data.sectionScales).forEach(k => {
        if (typeof data.sectionScales[k] === 'number') {
          applySectionScale(k, data.sectionScales[k]);
        }
      });
    }

    recalculateTotals();
  }

  // ==========================================================================
  // LocalStorage Persistence
  // ==========================================================================
  const STORAGE_KEY = 'gle_pro_po_data_2026';

  function savePoState() {
    try {
      const data = gatherPoData();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      // LocalStorage quota or access denied
    }
  }

  function loadPoState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        applyPoData(data);
      }
    } catch (e) {
      // Fail gracefully
    }
  }

  // ==========================================================================
  // Reset
  // ==========================================================================
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Reset Purchase Order back to official default template?')) {
        localStorage.removeItem(STORAGE_KEY);
        window.location.reload();
      }
    });
  }

  // ==========================================================================
  // Print / PDF Button
  // ==========================================================================
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Utility HTML Escape
  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Initialize
  recalculateTotals();
  applySpacingSettings(currentSpacingSettings);
  loadPoState();
  loadSectionScales();
  updateIconsUI();
});
