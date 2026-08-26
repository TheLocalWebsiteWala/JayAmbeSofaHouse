(function () {
  "use strict";

  /* YEAR */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* STICKY NAV */
  var nav = document.getElementById("nav");
  var onScroll = function () {
    if (nav) nav.classList.toggle("is-stuck", window.scrollY > 20);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* MOBILE MENU */
  var burger = document.getElementById("navBurger");
  var links = document.getElementById("navLinks");
  if (burger && links) {
    burger.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", String(open));
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* SCROLL REVEAL */
  var revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealItems.forEach(function (el) { io.observe(el); });
  } else {
    revealItems.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* STATS COUNTER */
  var counters = document.querySelectorAll(".stat__num");
  var runCounter = function (el) {
    var target = parseFloat(el.getAttribute("data-count")) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    var duration = 1600;
    var start = performance.now();
    var step = function (now) {
      var p = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var value = Math.round(target * eased);
      el.textContent = value.toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ("IntersectionObserver" in window) {
    var co = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            runCounter(entry.target);
            co.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(function (el) { co.observe(el); });
  } else {
    counters.forEach(runCounter);
  }

  /* MARQUEE LOOP */
  var track = document.getElementById("marqueeTrack");
  if (track) {
    track.innerHTML += track.innerHTML;
  }

  /* TESTIMONIALS SLIDER */
  var sliderTrack = document.getElementById("sliderTrack");
  var dotsWrap = document.getElementById("dots");
  if (sliderTrack && dotsWrap) {
    var slides = sliderTrack.children.length;
    var index = 0;
    var dots = [];

    var render = function () {
      sliderTrack.style.transform = "translateX(" + -index * 100 + "%)";
      dots.forEach(function (dot, i) {
        dot.setAttribute("aria-current", String(i === index));
      });
    };

    for (var i = 0; i < slides; i++) {
      (function (i) {
        var dot = document.createElement("button");
        dot.type = "button";
        dot.setAttribute("aria-label", "Go to testimonial " + (i + 1));
        dot.addEventListener("click", function () { index = i; render(); });
        dotsWrap.appendChild(dot);
        dots.push(dot);
      })(i);
    }

    var go = function (delta) {
      index = (index + delta + slides) % slides;
      render();
    };
    var prev = document.getElementById("prev");
    var next = document.getElementById("next");
    if (prev) prev.addEventListener("click", function () { go(-1); });
    if (next) next.addEventListener("click", function () { go(1); });

    var timer = setInterval(function () { go(1); }, 7000);
    var slider = document.getElementById("slider");
    if (slider) {
      slider.addEventListener("mouseenter", function () { clearInterval(timer); });
    }

    render();
  }

  /* FAQ ACCORDION */
  var faq = document.getElementById("faq");
  if (faq) {
    var items = faq.querySelectorAll("details");
    items.forEach(function (item) {
      item.addEventListener("toggle", function () {
        if (!item.open) return;
        items.forEach(function (other) {
          if (other !== item) other.open = false;
        });
      });
    });
  }

  /* =========================================================
     COLLECTION PAGE CATALOG LOGIC
     ========================================================= */
  var catalogGrid = document.getElementById("catalogProductsGrid");
  if (catalogGrid && typeof FURNITURE_PRODUCTS !== "undefined") {
    var catalogTabs = document.getElementById("catalogTabs");
    var catalogSearchInput = document.getElementById("catalogSearchInput");
    var catalogSortSelect = document.getElementById("catalogSortSelect");
    var catalogCountText = document.getElementById("catalogCountText");
    var quickViewModal = document.getElementById("quickViewModal");
    var quickViewBackdrop = document.getElementById("quickViewBackdrop");
    var quickViewClose = document.getElementById("quickViewClose");
    var quickViewContent = document.getElementById("quickViewContent");

    // Read URL query parameter "?category=..."
    var urlParams = new URLSearchParams(window.location.search);
    var activeCat = urlParams.get("category") || "all";

    // Set active tab based on query param
    if (catalogTabs) {
      var tabBtns = catalogTabs.querySelectorAll(".catalog-tab");
      tabBtns.forEach(function (btn) {
        if (btn.getAttribute("data-category") === activeCat) {
          tabBtns.forEach(function (b) { b.classList.remove("is-active"); });
          btn.classList.add("is-active");
        }
      });
    }

    var renderCatalog = function () {
      var query = (catalogSearchInput ? catalogSearchInput.value.toLowerCase().trim() : "");
      var sort = (catalogSortSelect ? catalogSortSelect.value : "featured");

      var list = FURNITURE_PRODUCTS.filter(function (p) {
        var matchCat = (activeCat === "all" || p.category === activeCat);
        var matchQuery = !query || (
          p.title.toLowerCase().indexOf(query) !== -1 ||
          p.description.toLowerCase().indexOf(query) !== -1 ||
          p.material.toLowerCase().indexOf(query) !== -1 ||
          p.categoryName.toLowerCase().indexOf(query) !== -1
        );
        return matchCat && matchQuery;
      });

      // Sort
      if (sort === "price-asc") {
        list.sort(function (a, b) { return a.rawPrice - b.rawPrice; });
      } else if (sort === "price-desc") {
        list.sort(function (a, b) { return b.rawPrice - a.rawPrice; });
      } else if (sort === "name-asc") {
        list.sort(function (a, b) { return a.title.localeCompare(b.title); });
      }

      if (catalogCountText) {
        catalogCountText.textContent = "Showing " + list.length + " handcrafted product" + (list.length === 1 ? "" : "s");
      }

      if (list.length === 0) {
        catalogGrid.innerHTML =
          '<div style="grid-column: 1 / -1; text-align: center; padding: 70px 20px; background:#fff; border-radius:24px; border:1px solid var(--line);">' +
            '<h3 class="h2" style="font-size:26px; margin-bottom:8px;">No products match your search</h3>' +
            '<p class="muted">Try different keywords or browse all categories.</p>' +
            '<button class="btn btn--dark" onclick="window.resetCatalogFilter()" style="margin-top:14px;">View All Products</button>' +
          '</div>';
        return;
      }

      var html = "";
      list.forEach(function (p) {
        html +=
          '<article class="product-card">' +
            '<div class="product-card__media">' +
              '<img src="' + p.image + '" alt="' + p.title + '" loading="lazy" />' +
            '</div>' +
            '<div class="product-card__body">' +
              '<span class="product-card__category">' + p.categoryName + '</span>' +
              '<h3 class="product-card__title">' + p.title + '</h3>' +
              '<p class="product-card__desc">' + p.description + '</p>' +
              '<div class="product-card__specs-row">' +
                '<span>' + p.dimensions + '</span>' +
              '</div>' +
              '<div class="product-card__footer">' +
                '<div class="product-card__price">' + p.price + '</div>' +
                '<div class="product-card__actions">' +
                  '<button class="btn btn--outline btn-sm" onclick="window.openProductQuickView(\'' + p.id + '\')">Quick View</button>' +
                  '<a href="./contact.html?product=' + encodeURIComponent(p.title) + '" class="btn btn--dark btn-sm">Get Quote</a>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</article>';
      });

      catalogGrid.innerHTML = html;
    };

    window.resetCatalogFilter = function () {
      activeCat = "all";
      if (catalogSearchInput) catalogSearchInput.value = "";
      if (catalogTabs) {
        var tabBtns = catalogTabs.querySelectorAll(".catalog-tab");
        tabBtns.forEach(function (b) { b.classList.remove("is-active"); });
        if (tabBtns[0]) tabBtns[0].classList.add("is-active");
      }
      renderCatalog();
    };

    window.openProductQuickView = function (id) {
      var item = FURNITURE_PRODUCTS.find(function (p) { return p.id === id; });
      if (!item || !quickViewModal || !quickViewContent) return;

      quickViewContent.innerHTML =
        '<div class="quickview-grid">' +
          '<div class="quickview-media">' +
            '<img src="' + item.image + '" alt="' + item.title + '" />' +
          '</div>' +
          '<div class="quickview-info">' +
            '<span class="eyebrow">' + item.categoryName + '</span>' +
            '<h3>' + item.title + '</h3>' +
            '<div class="quickview-price">' + item.price + '</div>' +
            '<p class="muted">' + item.description + '</p>' +
            '<ul class="quickview-details">' +
              '<li><strong>Dimensions:</strong> <span>' + item.dimensions + '</span></li>' +
              '<li><strong>Material:</strong> <span>' + item.material + '</span></li>' +
              '<li><strong>Lead Time:</strong> <span>' + item.leadTime + '</span></li>' +
              '<li><strong>Warranty:</strong> <span>5-Year Structural Frame Guarantee</span></li>' +
            '</ul>' +
            '<div style="margin-top:auto; display:flex; gap:12px;">' +
              '<a href="./contact.html?product=' + encodeURIComponent(item.title) + '" class="btn btn--dark btn--lg" style="flex:1; justify-content:center;">Inquire / Get Quote</a>' +
            '</div>' +
          '</div>' +
        '</div>';

      quickViewModal.classList.add("is-open");
      quickViewModal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    };

    var closeQuickViewModal = function () {
      if (!quickViewModal) return;
      quickViewModal.classList.remove("is-open");
      quickViewModal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };

    if (quickViewClose) quickViewClose.addEventListener("click", closeQuickViewModal);
    if (quickViewBackdrop) quickViewBackdrop.addEventListener("click", closeQuickViewModal);

    // Tab buttons click
    if (catalogTabs) {
      catalogTabs.addEventListener("click", function (e) {
        var btn = e.target.closest(".catalog-tab");
        if (btn) {
          var cat = btn.getAttribute("data-category");
          activeCat = cat;
          var tabBtns = catalogTabs.querySelectorAll(".catalog-tab");
          tabBtns.forEach(function (b) { b.classList.remove("is-active"); });
          btn.classList.add("is-active");
          renderCatalog();
        }
      });
    }

    if (catalogSearchInput) {
      catalogSearchInput.addEventListener("input", renderCatalog);
    }
    if (catalogSortSelect) {
      catalogSortSelect.addEventListener("change", renderCatalog);
    }

    renderCatalog();
  }

  /* =========================================================
     CUSTOM STYLED SELECT DROPDOWN LOGIC
     ========================================================= */
  function initCustomSelects() {
    var selects = document.querySelectorAll("select");
    selects.forEach(function (select) {
      if (select.dataset.customized) return;
      select.dataset.customized = "true";

      // Hide native select visually
      select.style.display = "none";

      var isSort = (select.id === "catalogSortSelect");
      var wrap = document.createElement("div");
      wrap.className = "custom-select-wrap" + (isSort ? " catalog-sort-wrap" : "");

      var trigger = document.createElement("button");
      trigger.type = "button";
      trigger.className = "custom-select-trigger";
      trigger.setAttribute("aria-haspopup", "listbox");
      trigger.setAttribute("aria-expanded", "false");

      var triggerText = document.createElement("span");
      triggerText.className = "trigger-text";
      var selectedOpt = select.options[select.selectedIndex] || select.options[0];
      triggerText.textContent = selectedOpt ? selectedOpt.textContent : "Select an option";

      var triggerArrow = document.createElement("span");
      triggerArrow.className = "trigger-arrow";
      triggerArrow.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" width="14" height="14"><path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

      trigger.appendChild(triggerText);
      trigger.appendChild(triggerArrow);
      wrap.appendChild(trigger);

      var menu = document.createElement("div");
      menu.className = "custom-select-menu";
      menu.setAttribute("role", "listbox");

      var rebuildMenu = function () {
        menu.innerHTML = "";
        for (var i = 0; i < select.options.length; i++) {
          var opt = select.options[i];
          var optEl = document.createElement("div");
          optEl.className = "custom-select-option" + (opt.selected ? " is-selected" : "");
          optEl.setAttribute("role", "option");
          optEl.setAttribute("aria-selected", String(opt.selected));
          optEl.dataset.value = opt.value;
          optEl.innerHTML =
            '<span>' + opt.textContent + '</span>' +
            '<span class="check-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="14" height="14"><path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';

          (function (optionValue, optionText, optElement) {
            optElement.addEventListener("click", function (e) {
              e.stopPropagation();
              select.value = optionValue;
              triggerText.textContent = optionText;
              
              var allOpts = menu.querySelectorAll(".custom-select-option");
              allOpts.forEach(function (o) { o.classList.remove("is-selected"); o.setAttribute("aria-selected", "false"); });
              optElement.classList.add("is-selected");
              optElement.setAttribute("aria-selected", "true");

              wrap.classList.remove("is-open");
              trigger.setAttribute("aria-expanded", "false");

              // Trigger change event
              var evt = new Event("change", { bubbles: true });
              select.dispatchEvent(evt);
            });
          })(opt.value, opt.textContent, optEl);

          menu.appendChild(optEl);
        }
      };

      rebuildMenu();
      wrap.appendChild(menu);

      // Insert wrap next to select
      select.parentNode.insertBefore(wrap, select.nextSibling);

      // Toggle dropdown open/close
      trigger.addEventListener("click", function (e) {
        e.stopPropagation();
        var isOpen = wrap.classList.contains("is-open");
        
        // Close other dropdowns
        document.querySelectorAll(".custom-select-wrap.is-open").forEach(function (w) {
          if (w !== wrap) {
            w.classList.remove("is-open");
            var tr = w.querySelector(".custom-select-trigger");
            if (tr) tr.setAttribute("aria-expanded", "false");
          }
        });

        if (isOpen) {
          wrap.classList.remove("is-open");
          trigger.setAttribute("aria-expanded", "false");
        } else {
          wrap.classList.add("is-open");
          trigger.setAttribute("aria-expanded", "true");
        }
      });

      // Listen for programmatic changes to select
      select.addEventListener("syncCustomSelect", function () {
        var curr = select.options[select.selectedIndex];
        if (curr) {
          triggerText.textContent = curr.textContent;
          rebuildMenu();
        }
      });
    });
  }

  // Close dropdowns on outside click
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".custom-select-wrap")) {
      document.querySelectorAll(".custom-select-wrap.is-open").forEach(function (w) {
        w.classList.remove("is-open");
        var tr = w.querySelector(".custom-select-trigger");
        if (tr) tr.setAttribute("aria-expanded", "false");
      });
    }
  });

  /* =========================================================
     CONTACT PAGE LOGIC
     ========================================================= */
  var quoteProductSelect = document.getElementById("quoteProduct");
  if (quoteProductSelect) {
    var params = new URLSearchParams(window.location.search);
    var selectedProduct = params.get("product");
    if (selectedProduct) {
      // Find matching option or add one
      var found = false;
      for (var j = 0; j < quoteProductSelect.options.length; j++) {
        if (quoteProductSelect.options[j].value.toLowerCase() === selectedProduct.toLowerCase()) {
          quoteProductSelect.selectedIndex = j;
          found = true;
          break;
        }
      }
      if (!found) {
        var opt = document.createElement("option");
        opt.value = selectedProduct;
        opt.textContent = selectedProduct;
        opt.selected = true;
        quoteProductSelect.appendChild(opt);
      }
    }
  }

  // Initialize custom dropdowns across the page
  initCustomSelects();

  if (quoteProductSelect) {
    quoteProductSelect.dispatchEvent(new Event("syncCustomSelect"));
  }

  window.handleQuoteSubmit = function (form) {
    var success = document.getElementById("quoteSuccessMessage");
    if (success) {
      success.style.display = "block";
      form.style.display = "none";
      success.scrollIntoView({ behavior: "smooth" });
    }
  };

  /* GLOBAL ESCAPE KEY HANDLER */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      var qv = document.getElementById("quickViewModal");
      if (qv && qv.classList.contains("is-open")) {
        qv.classList.remove("is-open");
        document.body.style.overflow = "";
      }
      document.querySelectorAll(".custom-select-wrap.is-open").forEach(function (w) {
        w.classList.remove("is-open");
        var tr = w.querySelector(".custom-select-trigger");
        if (tr) tr.setAttribute("aria-expanded", "false");
      });
    }
  });

})();
