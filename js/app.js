/**
 * منصة «مُدار» - منطق تطبيق الويب وإدارة الحالة وتدفق المراحل السبع
 * لغة عربية بحتة 100% - هوية بصرية مطابقة للبروتوتايب ولوحة الألوان المعتمدة
 */

document.addEventListener("DOMContentLoaded", () => {
  // حالة التطبيق المركزية (Application State)
  const state = {
    currentStep: 1,
    maxStepReached: 1,
    selectedCategory: "all",
    searchQuery: "",
    selectedActivityId: "specialty_coffee",
    selectedCityId: "riyadh",
    selectedDistrictId: "malqa",
    selectedZoneId: "commercial_street",
    spaceArea: 80,
    customInputs: {},
    sensitivityDiscount: 0
  };

  // عناصر واجهة المستخدم الرئيسية (DOM Elements)
  const DOM = {
    stepperNavList: document.getElementById("stepper-nav-list"),
    stageSections: document.querySelectorAll(".stage-section"),
    btnPrevStage: document.getElementById("btn-prev-stage"),
    btnNextStage: document.getElementById("btn-next-stage"),
    stageNavBar: document.getElementById("stage-nav-bar"),

    // المرحلة 1: لاندنق بيج السلايدات
    landingHeroSlider: document.getElementById("landing-hero-slider"),
    sliderTrack: document.getElementById("slider-track"),
    sliderArrowPrev: document.getElementById("slider-arrow-prev"),
    sliderArrowNext: document.getElementById("slider-arrow-next"),
    sliderBulletsBar: document.getElementById("slider-bullets-bar"),
    btnStartStudy: document.getElementById("btn-start-study"),
    btnSlideTriggers: document.querySelectorAll(".btn-slide-trigger"),

    // المرحلة 2: اختيار النشاط
    activitySearchInput: document.getElementById("activity-search-input"),
    categoryPillsContainer: document.getElementById("category-pills-container"),
    activitiesGridContainer: document.getElementById("activities-grid-container"),

    // المرحلة 3: اختيار الموقع
    citiesGridContainer: document.getElementById("cities-grid-container"),
    districtPillsContainer: document.getElementById("district-pills-container"),
    commercialZonesContainer: document.getElementById("commercial-zones-container"),
    areaInput: document.getElementById("area-input"),
    recommendedAreaBadge: document.getElementById("recommended-area-badge"),
    previewLocName: document.getElementById("preview-loc-name"),
    previewLocDesc: document.getElementById("preview-loc-desc"),
    previewRentMeter: document.getElementById("preview-rent-meter"),
    previewTotalRent: document.getElementById("preview-total-rent"),
    previewTraffic: document.getElementById("preview-traffic"),
    previewPurchasing: document.getElementById("preview-purchasing"),

    // المرحلة 4: تحليل الموقع والنشاط
    fitCircleMeter: document.getElementById("fit-circle-meter"),
    fitScoreVal: document.getElementById("fit-score-val"),
    fitScoreLabel: document.getElementById("fit-score-label"),
    fitHeadline: document.getElementById("fit-headline"),
    fitParagraph: document.getElementById("fit-paragraph"),
    stripCompetitionVal: document.getElementById("strip-competition-val"),
    stripTrafficVal: document.getElementById("strip-traffic-val"),
    stripRentBurdenVal: document.getElementById("strip-rent-burden-val"),
    factorPositiveList: document.getElementById("factor-positive-list"),
    factorCautionList: document.getElementById("factor-caution-list"),

    // المرحلة 5: حساب الدخل والتكاليف التقديرية (نتائج تلقائية بدون تعديل)
    tabNavBtns: document.querySelectorAll(".tab-nav-btn"),
    financialTabPanes: document.querySelectorAll(".financial-tab-pane"),
    liveTotalCapex: document.getElementById("live-total-capex"),
    liveMonthlyRevenue: document.getElementById("live-monthly-revenue"),
    liveMonthlyOpex: document.getElementById("live-monthly-opex"),
    liveNetProfit: document.getElementById("live-net-profit"),
    valLicensing: document.getElementById("val-licensing"),
    valFitout: document.getElementById("val-fitout"),
    valEquipment: document.getElementById("val-equipment"),
    valWorkingCap: document.getElementById("val-working-cap"),
    valMonthlyRent: document.getElementById("val-monthly-rent"),
    valLabor: document.getElementById("val-labor"),
    valCogsCost: document.getElementById("val-cogs-cost"),
    displayCogsPercent: document.getElementById("display-cogs-percent"),
    valUtilities: document.getElementById("val-utilities"),
    valMarketing: document.getElementById("val-marketing"),
    valDailyVisitors: document.getElementById("val-daily-visitors"),
    valAvgTicket: document.getElementById("val-avg-ticket"),
    valDailyRevenue: document.getElementById("val-daily-revenue"),
    valWorkingDays: document.getElementById("val-working-days"),
    calcVisitorsText: document.getElementById("calc-visitors-text"),
    calcTicketText: document.getElementById("calc-ticket-text"),

    // المرحلة 6: مؤشر النجاح والمخاطر
    svgGaugeProgress: document.getElementById("svg-gauge-progress"),
    gaugeScoreNumber: document.getElementById("gauge-score-number"),
    gaugeStatusBadge: document.getElementById("gauge-status-badge"),
    gaugeSummaryText: document.getElementById("gauge-summary-text"),
    metricPaybackText: document.getElementById("metric-payback-text"),
    metricBreakevenSar: document.getElementById("metric-breakeven-sar"),
    risksContainer: document.getElementById("risks-container"),
    sensitivityBtns: document.querySelectorAll(".sensitivity-btn"),

    // المرحلة 7: التقرير النهائي
    repActivityTitle: document.getElementById("rep-activity-title"),
    repLocationTitle: document.getElementById("rep-location-title"),
    repDateLabel: document.getElementById("rep-date-label"),
    repAreaLabel: document.getElementById("rep-area-label"),
    repCapexVal: document.getElementById("rep-capex-val"),
    repNetProfitVal: document.getElementById("rep-net-profit-val"),
    repMarginSubtext: document.getElementById("rep-margin-subtext"),
    repPaybackVal: document.getElementById("rep-payback-val"),
    repScoreSubtext: document.getElementById("rep-score-subtext"),
    repTableFormula: document.getElementById("rep-table-formula"),
    repTableDailyRev: document.getElementById("rep-table-daily-rev"),
    repTableMonthlyRev: document.getElementById("rep-table-monthly-rev"),
    repTableAnnualRev: document.getElementById("rep-table-annual-rev"),
    repCapexTableBody: document.getElementById("rep-capex-table-body"),
    repOpexTableBody: document.getElementById("rep-opex-table-body"),
    donutSvgElement: document.getElementById("donut-svg-element"),
    donutLegendContainer: document.getElementById("donut-legend-container"),
    cashflowSvgBox: document.getElementById("cashflow-svg-box"),
    repRisksContainer: document.getElementById("rep-risks-container"),
    repRecommendationsContainer: document.getElementById("rep-recommendations-container"),
    btnEditInputs: document.getElementById("btn-edit-inputs"),
    btnPrintReport: document.getElementById("btn-print-report"),
    btnNewStudy: document.getElementById("btn-new-study")
  };

  // مسميات أزرار الانتقال بين المراحل
  const STEP_LABELS = {
    1: "ابدأ بدراسة الجدوى",
    2: "التالي: اختيار النشاط التجاري",
    3: "التالي: اختيار المدينة والموقع المناسب",
    4: "التالي: تحليل الموقع والنشاط",
    5: "التالي: حساب الدخل والتكاليف",
    6: "التالي: مؤشر نجاح المشروع والمخاطر",
    7: "عرض التقرير النهائي والنصائح المخصصة"
  };

  // =========================================================================
  // دوال التهيئة الأولية (Initialization)
  // =========================================================================
  function init() {
    initLandingSlider();
    renderCategoryPills();
    renderActivitiesGrid();
    renderCitiesGrid();
    renderDistrictPills();
    renderCommercialZones();
    bindEvents();
    renderStage5Results();
    updateAllModel();
  }

  // =========================================================================
  // إدارة السلايدر التفاعلي لصفحة الهبوط (Landing Page Slider)
  // =========================================================================
  let currentSlide = 0;
  const totalSlides = 4;
  let slideInterval = null;

  function initLandingSlider() {
    if (!DOM.sliderTrack) return;

    function goToSlide(index) {
      currentSlide = (index + totalSlides) % totalSlides;
      // في الاتجاه RTL، إزاحة السلايد تتم بمقدار موجب ليتحرك المسار يساراً
      DOM.sliderTrack.style.transform = `translateX(${currentSlide * 100}%)`;

      const bullets = DOM.sliderBulletsBar.querySelectorAll(".slider-bullet");
      bullets.forEach((b, idx) => {
        b.classList.toggle("active", idx === currentSlide);
      });
    }

    function nextSlide() {
      goToSlide(currentSlide + 1);
    }

    function prevSlide() {
      goToSlide(currentSlide - 1);
    }

    function startAutoSlide() {
      stopAutoSlide();
      slideInterval = setInterval(nextSlide, 5500);
    }

    function stopAutoSlide() {
      if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
      }
    }

    // ربط أزرار الأسهم
    if (DOM.sliderArrowNext) {
      DOM.sliderArrowNext.addEventListener("click", () => {
        nextSlide();
        startAutoSlide();
      });
    }

    if (DOM.sliderArrowPrev) {
      DOM.sliderArrowPrev.addEventListener("click", () => {
        prevSlide();
        startAutoSlide();
      });
    }

    // ربط النقاط السفلية
    if (DOM.sliderBulletsBar) {
      const bullets = DOM.sliderBulletsBar.querySelectorAll(".slider-bullet");
      bullets.forEach(bullet => {
        bullet.addEventListener("click", (e) => {
          const target = Number(e.target.getAttribute("data-slide-target")) || 0;
          goToSlide(target);
          startAutoSlide();
        });
      });
    }

    // إيقاف الحركة عند التمرير بالماوس
    if (DOM.landingHeroSlider) {
      DOM.landingHeroSlider.addEventListener("mouseenter", stopAutoSlide);
      DOM.landingHeroSlider.addEventListener("mouseleave", startAutoSlide);
    }

    // بدء الحركة التلقائية
    startAutoSlide();
  }

  // الحصول على الكائنات المحددة حالياً
  function getCurrentObjects() {
    const activity = MADAR_DATA.activities.find(a => a.id === state.selectedActivityId) || MADAR_DATA.activities[0];
    const city = MADAR_DATA.cities.find(c => c.id === state.selectedCityId) || MADAR_DATA.cities[0];
    const district = city.districts.find(d => d.id === state.selectedDistrictId) || city.districts[0];
    const zone = MADAR_DATA.commercialZones.find(z => z.id === state.selectedZoneId) || MADAR_DATA.commercialZones[0];
    return { activity, city, district, zone };
  }

  // =========================================================================
  // إدارة تدفق المراحل السبع (Step Flow Management)
  // =========================================================================
  function goToStep(step) {
    if (step < 1 || step > 7) return;

    state.currentStep = step;
    if (step > state.maxStepReached) {
      state.maxStepReached = step;
    }

    // تحديث شريط الخطوات (Stepper UI) إن وجد
    if (DOM.stepperNavList) {
      const stepTabs = DOM.stepperNavList.querySelectorAll(".stepper-tab");
      stepTabs.forEach((tab, idx) => {
        const stepIndex = idx + 1;
        tab.classList.remove("active", "completed");
        if (stepIndex === step) {
          tab.classList.add("active");
        } else if (stepIndex < step) {
          tab.classList.add("completed");
        }
      });
    }

    // إظهار القسم المطلوب وإخفاء الآخر
    DOM.stageSections.forEach((section, idx) => {
      section.classList.remove("active");
      if (idx + 1 === step) {
        section.classList.add("active");
      }
    });

    // تحديث شريط التنقل السفلي
    if (step === 1) {
      if (DOM.stageNavBar) DOM.stageNavBar.style.display = "none";
      DOM.btnPrevStage.disabled = true;
      DOM.btnNextStage.style.display = "none";
    } else if (step === 7) {
      if (DOM.stageNavBar) DOM.stageNavBar.style.display = "flex";
      DOM.btnPrevStage.disabled = false;
      DOM.btnNextStage.style.display = "none";
    } else {
      if (DOM.stageNavBar) DOM.stageNavBar.style.display = "flex";
      DOM.btnPrevStage.disabled = false;
      DOM.btnNextStage.style.display = "inline-flex";
      const nextStep = step + 1;
      DOM.btnNextStage.innerHTML = `
        <span>${STEP_LABELS[nextStep]}</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 12H5"></path>
          <path d="M12 19l-7-7 7-7"></path>
        </svg>
      `;
    }

    // تشغيل التحديثات الخاصة بالمرحلة
    if (step === 4) {
      renderLocationAnalysis();
    } else if (step === 5) {
      renderStage5Results();
    } else if (step === 6) {
      renderSuccessGaugeAndRisks();
    } else if (step === 7) {
      renderFinalReport();
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // =========================================================================
  // المرحلة 2: اختيار النشاط التجاري
  // =========================================================================
  function renderCategoryPills() {
    DOM.categoryPillsContainer.innerHTML = "";
    MADAR_DATA.categories.forEach(cat => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `category-pill ${state.selectedCategory === cat.id ? "active" : ""}`;
      btn.textContent = cat.name;
      btn.addEventListener("click", () => {
        state.selectedCategory = cat.id;
        renderCategoryPills();
        renderActivitiesGrid();
      });
      DOM.categoryPillsContainer.appendChild(btn);
    });
  }

  function renderActivitiesGrid() {
    DOM.activitiesGridContainer.innerHTML = "";
    const filtered = MADAR_DATA.activities.filter(act => {
      const matchCategory = state.selectedCategory === "all" || act.categoryId === state.selectedCategory;
      const matchQuery = !state.searchQuery || 
        act.title.toLowerCase().includes(state.searchQuery.toLowerCase()) || 
        act.shortDesc.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        act.tags.some(t => t.toLowerCase().includes(state.searchQuery.toLowerCase()));
      return matchCategory && matchQuery;
    });

    if (filtered.length === 0) {
      DOM.activitiesGridContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: var(--bg-surface); border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
          <h4 style="color: var(--steel-light); font-size: 1.1rem; margin-bottom: 0.4rem;">لم يتم العثور على نشاط مطابق</h4>
          <p style="color: var(--slate-gray); font-size: 0.88rem;">جرّب البحث باسم آخر مثل: مقهى، مطعم، صالون، تموينات.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(act => {
      const isSelected = act.id === state.selectedActivityId;
      const card = document.createElement("div");
      card.className = `activity-card ${isSelected ? "selected" : ""}`;
      
      const tagsHtml = act.tags.map(t => `<span class="activity-tag-badge">${t}</span>`).join("");

      card.innerHTML = `
        <div>
          <div class="activity-card-header">
            <h3 class="activity-title">${act.title}</h3>
            <p class="activity-desc">${act.shortDesc}</p>
          </div>
          <div class="activity-tags">
            ${tagsHtml}
          </div>
        </div>
        <div class="activity-meta-row">
          <span>المساحة النموذجية المقترحة: <strong class="num-font">${MadarCalculator.toArabicDigits(act.recommendedArea)} م<sup class="num-font">٢</sup></strong></span>
        </div>
      `;

      card.addEventListener("click", () => {
        state.selectedActivityId = act.id;
        state.spaceArea = act.recommendedArea;
        DOM.areaInput.value = MadarCalculator.toArabicDigits(act.recommendedArea);
        DOM.recommendedAreaBadge.textContent = MadarCalculator.toArabicDigits(act.recommendedArea);
        renderActivitiesGrid();
        renderStage5Results();
        updateAllModel();
      });

      DOM.activitiesGridContainer.appendChild(card);
    });
  }

  // =========================================================================
  // المرحلة 3: اختيار المدينة والموقع (بدون قوائم منسدلة)
  // =========================================================================
  function renderCitiesGrid() {
    DOM.citiesGridContainer.innerHTML = "";
    MADAR_DATA.cities.forEach(city => {
      const isSelected = city.id === state.selectedCityId;
      const card = document.createElement("div");
      card.className = `city-card ${isSelected ? "selected" : ""}`;
      card.innerHTML = `
        <div class="city-card-name">${city.name}</div>
        <div class="city-card-region">${city.region}</div>
      `;
      card.addEventListener("click", () => {
        state.selectedCityId = city.id;
        state.selectedDistrictId = city.districts[0].id;
        renderCitiesGrid();
        renderDistrictPills();
        updateLocationPreview();
        renderStage5Results();
        updateAllModel();
      });
      DOM.citiesGridContainer.appendChild(card);
    });
  }

  // رندرة شارات وخيارات الأحياء القابلة للاختيار الفوري (بديل القائمة المنسدلة)
  function renderDistrictPills() {
    DOM.districtPillsContainer.innerHTML = "";
    const city = MADAR_DATA.cities.find(c => c.id === state.selectedCityId) || MADAR_DATA.cities[0];

    // التأكد من وجود الحي المختار ضمن المدينة الحالية
    if (!city.districts.some(d => d.id === state.selectedDistrictId)) {
      state.selectedDistrictId = city.districts[0].id;
    }

    city.districts.forEach(dist => {
      const isSelected = dist.id === state.selectedDistrictId;
      const pill = document.createElement("div");
      pill.className = `district-pill ${isSelected ? "selected" : ""}`;
      pill.innerHTML = `
        <div class="district-pill-name">${dist.name}</div>
        <div class="district-pill-price">${MadarCalculator.formatSAR(dist.avgRentPerMeter)} لكل م<sup class="num-font">٢</sup></div>
      `;
      pill.addEventListener("click", () => {
        state.selectedDistrictId = dist.id;
        renderDistrictPills();
        updateLocationPreview();
        renderStage5Results();
        updateAllModel();
      });
      DOM.districtPillsContainer.appendChild(pill);
    });
  }

  function renderCommercialZones() {
    DOM.commercialZonesContainer.innerHTML = "";
    MADAR_DATA.commercialZones.forEach(zone => {
      const isSelected = zone.id === state.selectedZoneId;
      const card = document.createElement("div");
      card.className = `zone-card ${isSelected ? "selected" : ""}`;
      card.innerHTML = `
        <div class="zone-card-title">${zone.name}</div>
        <div class="zone-card-desc">${zone.description}</div>
      `;
      card.addEventListener("click", () => {
        state.selectedZoneId = zone.id;
        renderCommercialZones();
        updateLocationPreview();
        renderStage5Results();
        updateAllModel();
      });
      DOM.commercialZonesContainer.appendChild(card);
    });
  }

  function updateLocationPreview() {
    const { city, district, zone } = getCurrentObjects();
    const effectiveRentMeter = Math.round(district.avgRentPerMeter * zone.rentMultiplier);
    const totalAnnualRent = Math.round(effectiveRentMeter * state.spaceArea);

    DOM.previewLocName.textContent = `${city.name} - ${district.name}`;
    DOM.previewLocDesc.textContent = district.description;
    DOM.previewRentMeter.innerHTML = `${MadarCalculator.formatSAR(effectiveRentMeter)} لكل م<sup class="num-font">٢</sup> سنويًا`;
    DOM.previewTotalRent.textContent = MadarCalculator.formatSAR(totalAnnualRent);
    DOM.previewTraffic.textContent = district.trafficLevel;
    DOM.previewPurchasing.textContent = district.purchasingPower;

    // تحديث عرض مساحة الإيجار في المرحلة 5
    if (DOM.rentCalcArea) {
      DOM.rentCalcArea.textContent = MadarCalculator.toArabicDigits(state.spaceArea);
    }
  }

  // =========================================================================
  // المرحلة 4: تحليل الموقع والنشاط
  // =========================================================================
  function renderLocationAnalysis() {
    const { activity, district, zone } = getCurrentObjects();
    
    let baseScore = 80;
    if (district.purchasingPower.includes("عالية جداً")) baseScore += 8;
    if (district.trafficLevel.includes("مرتفع")) baseScore += 6;
    if (zone.id === "commercial_street" || zone.id === "strip_mall") baseScore += 4;
    const score = Math.min(96, baseScore);

    DOM.fitScoreVal.textContent = `${MadarCalculator.toArabicDigits(score)}٪`;
    DOM.fitHeadline.textContent = `الموقع ملائم جداً لنشاط ${activity.title}`;
    DOM.fitParagraph.textContent = `يتميز ${district.name} بحركة تجارية نشطة وقوة شرائية متوافقة مع نمط وأسعار نشاط ${activity.title}، مع توفر فرص استقطاب ممتازة لرواد الشارع التجاري.`;

    DOM.stripCompetitionVal.textContent = "تنافسية نشطة ومتوازنة مع حجم الطلب";
    DOM.stripTrafficVal.textContent = `${district.trafficLevel} - تدفق عملاء مستمر`;
    DOM.stripRentBurdenVal.textContent = "متوازن وضمن النطاق الآمن للإيراد";

    DOM.factorPositiveList.innerHTML = `
      <li>موقع استراتيجي في ${district.name} مع سهولة الوصول والرؤية من المحور التجاري.</li>
      <li>كثافة سكانية بقوة شرائية (${district.purchasingPower}) تدعم استمرارية الطلب.</li>
      <li>تكامل مميز مع نمط الموقع (${zone.name}) لضمان ارتياد متكرر للعملاء.</li>
    `;

    DOM.factorCautionList.innerHTML = `
      <li>متوسط إيجار المتر (${MadarCalculator.formatSAR(district.avgRentPerMeter)}) يتطلب كفاءة تشغيلية وتدفقاً ثابتاً للمبيعات.</li>
      <li>ضرورة استكمال اشتراطات منصة بلدي والدفاع المدني الخاصة بالمساحة والواجهات.</li>
      <li>الحرص على استراتيجيات تسويق نوعية للتميز في ظل وجود بدائل تجارية قريبة.</li>
    `;
  }

  // =========================================================================
  // المرحلة 5: حساب الدخل والتكاليف التقديرية (محسوبة آلياً بدون تعديل يدوي)
  // =========================================================================
  function renderStage5Results() {
    const { activity, district, zone } = getCurrentObjects();
    const model = updateAllModel();

    if (DOM.valLicensing) DOM.valLicensing.textContent = MadarCalculator.formatSAR(model.capex.licensing);
    if (DOM.valFitout) DOM.valFitout.textContent = MadarCalculator.formatSAR(model.capex.fitout);
    if (DOM.valEquipment) DOM.valEquipment.textContent = MadarCalculator.formatSAR(model.capex.equipment);
    if (DOM.valWorkingCap) DOM.valWorkingCap.textContent = MadarCalculator.formatSAR(model.capex.initialWorkingCap);

    if (DOM.valMonthlyRent) DOM.valMonthlyRent.textContent = MadarCalculator.formatSAR(model.opex.monthlyRent);
    if (DOM.valLabor) DOM.valLabor.textContent = MadarCalculator.formatSAR(model.opex.laborCost);
    if (DOM.valCogsCost) DOM.valCogsCost.textContent = MadarCalculator.formatSAR(model.opex.cogsMonthly);
    if (DOM.displayCogsPercent) DOM.displayCogsPercent.textContent = MadarCalculator.toArabicDigits(model.opex.cogsPercent);
    if (DOM.valUtilities) DOM.valUtilities.textContent = MadarCalculator.formatSAR(model.opex.utilities);
    if (DOM.valMarketing) DOM.valMarketing.textContent = MadarCalculator.formatSAR(model.opex.marketingMaintenance);

    if (DOM.valDailyVisitors) DOM.valDailyVisitors.textContent = MadarCalculator.toArabicDigits(model.revenue.dailyVisitors);
    if (DOM.valAvgTicket) DOM.valAvgTicket.textContent = MadarCalculator.formatSAR(model.revenue.avgTicket);
    if (DOM.valDailyRevenue) DOM.valDailyRevenue.textContent = MadarCalculator.formatSAR(model.revenue.daily);
    if (DOM.valWorkingDays) DOM.valWorkingDays.textContent = MadarCalculator.toArabicDigits(model.revenue.daysPerMonth);

    if (DOM.calcVisitorsText) DOM.calcVisitorsText.textContent = MadarCalculator.toArabicDigits(model.revenue.dailyVisitors);
    if (DOM.calcTicketText) DOM.calcTicketText.textContent = MadarCalculator.formatSAR(model.revenue.avgTicket);

    document.querySelectorAll(".display-area-tag").forEach(el => {
      el.textContent = MadarCalculator.toArabicDigits(state.spaceArea);
    });
    document.querySelectorAll(".display-district-name").forEach(el => {
      el.textContent = district.name;
    });
  }

  function updateAllModel() {
    const { activity, city, district, zone } = getCurrentObjects();
    const model = MadarCalculator.compileFinancialModel(
      activity, city, district, zone, state.spaceArea, state.customInputs
    );

    // تحديث شريط الملخص المالي الحي
    DOM.liveTotalCapex.textContent = MadarCalculator.formatSAR(model.capex.total);
    DOM.liveMonthlyRevenue.textContent = MadarCalculator.formatSAR(model.revenue.monthly);
    DOM.liveMonthlyOpex.textContent = MadarCalculator.formatSAR(model.opex.totalMonthly);
    DOM.liveNetProfit.textContent = MadarCalculator.formatSAR(model.netProfitMonthly);

    return model;
  }

  // =========================================================================
  // المرحلة 6: مؤشر نجاح المشروع والمخاطر
  // =========================================================================
  function renderSuccessGaugeAndRisks() {
    const { activity, city, district, zone } = getCurrentObjects();
    const inputsWithDiscount = { ...state.customInputs, sensitivityDiscount: state.sensitivityDiscount };
    const model = MadarCalculator.compileFinancialModel(
      activity, city, district, zone, state.spaceArea, inputsWithDiscount
    );

    const score = model.scoreResult.score;
    DOM.gaugeScoreNumber.textContent = MadarCalculator.toArabicDigits(score);
    DOM.gaugeStatusBadge.textContent = model.scoreResult.label;
    DOM.gaugeSummaryText.textContent = model.scoreResult.summary;

    // مسار العداد الرقمي
    const maxOffset = 251.2;
    const progressOffset = maxOffset - (score / 100) * maxOffset;
    DOM.svgGaugeProgress.style.strokeDashoffset = progressOffset;
    DOM.svgGaugeProgress.style.stroke = model.scoreResult.badgeColor;

    DOM.metricPaybackText.textContent = model.paybackText;
    DOM.metricBreakevenSar.textContent = MadarCalculator.formatSAR(model.breakEvenMonthly);

    // رندرة بطاقات المخاطر
    DOM.risksContainer.innerHTML = "";
    model.risks.forEach(risk => {
      const card = document.createElement("div");
      card.className = `risk-card risk-${risk.level}`;
      card.innerHTML = `
        <div class="risk-card-head">
          <span class="risk-card-title">${risk.title}</span>
          <span class="risk-level-badge">${risk.levelLabel} • ${risk.type}</span>
        </div>
        <p class="risk-card-detail">${risk.detail}</p>
      `;
      DOM.risksContainer.appendChild(card);
    });
  }

  // =========================================================================
  // المرحلة 7: التقرير النهائي والنصائح المخصصة
  // =========================================================================
  function renderFinalReport() {
    const { activity, city, district, zone } = getCurrentObjects();
    const model = MadarCalculator.compileFinancialModel(
      activity, city, district, zone, state.spaceArea, state.customInputs
    );

    // 1. معلومات الترويسة
    DOM.repActivityTitle.textContent = activity.title;
    DOM.repLocationTitle.textContent = `المملكة العربية السعودية • ${city.name} - ${district.name} (${zone.name})`;
    DOM.repAreaLabel.innerHTML = `${MadarCalculator.toArabicDigits(model.area)} م<sup class="num-font">٢</sup>`;
    if (DOM.repDateLabel) {
      DOM.repDateLabel.textContent = new Date().toLocaleDateString('ar-SA-u-nu-arab', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    // 2. كروت المؤشرات الكبرى
    DOM.repCapexVal.textContent = MadarCalculator.formatSAR(model.capex.total);
    DOM.repNetProfitVal.textContent = MadarCalculator.formatSAR(model.netProfitAnnual);
    DOM.repMarginSubtext.textContent = `هامش صافي ربح سنوي ${MadarCalculator.toArabicDigits(model.netProfitMargin)}٪`;
    DOM.repPaybackVal.textContent = model.paybackText;
    DOM.repScoreSubtext.textContent = `مؤشر الجدوى والنجاح: ${MadarCalculator.toArabicDigits(model.scoreResult.score)} / ١٠٠`;

    // 3. جدول تقدير المبيعات والدخل
    DOM.repTableFormula.textContent = `${MadarCalculator.toArabicDigits(model.revenue.dailyVisitors)} عميل × ${MadarCalculator.formatSAR(model.revenue.avgTicket)} للطلب`;
    DOM.repTableDailyRev.textContent = MadarCalculator.formatSAR(model.revenue.daily);
    DOM.repTableMonthlyRev.textContent = MadarCalculator.formatSAR(model.revenue.monthly);
    DOM.repTableAnnualRev.textContent = MadarCalculator.formatSAR(model.revenue.annual);

    // 4. جدول النفقات التأسيسية
    DOM.repCapexTableBody.innerHTML = `
      <tr>
        <td class="highlight">التراخيص والسجل والتأهيل البلدي</td>
        <td>رخصة بلدي، الدفاع المدني، شهادة السجل التجاري، منصة قوى والاشتراكات الحكومية.</td>
        <td class="num-font highlight">${MadarCalculator.formatSAR(model.capex.licensing)}</td>
      </tr>
      <tr>
        <td class="highlight">أعمال الديكور والتهيئة والتجهيز</td>
        <td>الواجهة الزجاجية، الأرضيات، التمديدات الصحية والكهربائية، التكييف، والإنارة.</td>
        <td class="num-font highlight">${MadarCalculator.formatSAR(model.capex.fitout)}</td>
      </tr>
      <tr>
        <td class="highlight">الآلات والمعدات والأنظمة</td>
        <td>الأجهزة التشغيلية الرئيسية، أنظمة نقاط البيع والمحاسبة، والتبريد والتجهيز.</td>
        <td class="num-font highlight">${MadarCalculator.formatSAR(model.capex.equipment)}</td>
      </tr>
      <tr>
        <td class="highlight">السيولة العاملة واحتياطي الطوارئ</td>
        <td>مخزون تشغيلي أولي وسيولة احتياطية لأول ٦٠ إلى ٩٠ يوماً من الانطلاق.</td>
        <td class="num-font highlight">${MadarCalculator.formatSAR(model.capex.initialWorkingCap)}</td>
      </tr>
      <tr style="background: var(--bg-surface-elevated); font-weight: 800;">
        <td style="color: var(--steel-light);">إجمالي النفقات التأسيسية (رأس المال المطلوب)</td>
        <td style="color: var(--slate-gray);">المبلغ الشامل لكافة بنود الإطلاق والتجهيز المسبق</td>
        <td class="num-font" style="color: var(--steel-light); font-size: 1.05rem;">${MadarCalculator.formatSAR(model.capex.total)}</td>
      </tr>
    `;

    // 5. جدول المصاريف التشغيلية الشهرية والسنوية
    const opexItems = [
      { name: "الإيجار الشهري المقدر للموقع", monthly: model.opex.monthlyRent },
      { name: "رواتب وأجور الكوادر والتأمينات", monthly: model.opex.laborCost },
      { name: "تكلفة المواد والبضائع المستهلكة", monthly: model.opex.cogsMonthly },
      { name: "الخدمات والمرافق (طاقة ومياه واتصالات)", monthly: model.opex.utilities },
      { name: "التسويق الرقمي والصيانة الدورية", monthly: model.opex.marketingMaintenance }
    ];

    let opexRowsHtml = "";
    opexItems.forEach(item => {
      const annual = item.monthly * 12;
      const share = model.opex.totalMonthly > 0 ? ((item.monthly / model.opex.totalMonthly) * 100).toFixed(1) : 0;
      opexRowsHtml += `
        <tr>
          <td class="highlight">${item.name}</td>
          <td class="num-font">${MadarCalculator.formatSAR(item.monthly)}</td>
          <td class="num-font">${MadarCalculator.formatSAR(annual)}</td>
          <td class="num-font">${MadarCalculator.toArabicDigits(share)}٪</td>
        </tr>
      `;
    });

    opexRowsHtml += `
      <tr style="background: var(--bg-surface-elevated); font-weight: 800;">
        <td style="color: var(--steel-light);">إجمالي المصاريف التشغيلية الدورية</td>
        <td class="num-font" style="color: var(--steel-light); font-size: 1.05rem;">${MadarCalculator.formatSAR(model.opex.totalMonthly)}</td>
        <td class="num-font" style="color: var(--steel-light); font-size: 1.05rem;">${MadarCalculator.formatSAR(model.opex.totalAnnual)}</td>
        <td class="num-font" style="color: var(--steel-light);">١٠٠٪</td>
      </tr>
    `;
    DOM.repOpexTableBody.innerHTML = opexRowsHtml;

    // 6. الرسوم البيانية المتجاورة (البروتوتايب)
    renderDonutChart(opexItems, model.opex.totalMonthly);
    renderCashFlowChart(model.cashFlowProjection, model.capex.total);

    // 7. مصفوفة المخاطر المحددة
    DOM.repRisksContainer.innerHTML = "";
    model.risks.forEach(risk => {
      const card = document.createElement("div");
      card.className = `risk-card risk-${risk.level}`;
      card.innerHTML = `
        <div class="risk-card-head">
          <span class="risk-card-title">${risk.title}</span>
          <span class="risk-level-badge">${risk.levelLabel} • ${risk.type}</span>
        </div>
        <p class="risk-card-detail">${risk.detail}</p>
      `;
      DOM.repRisksContainer.appendChild(card);
    });

    // 8. النصائح والتوصيات المخصصة
    DOM.repRecommendationsContainer.innerHTML = "";
    model.recommendations.forEach(rec => {
      const card = document.createElement("div");
      card.className = "recommendation-card";
      card.innerHTML = `
        <div class="recommendation-card-category">${rec.category}</div>
        <h4 class="recommendation-card-title">${rec.title}</h4>
        <p class="recommendation-card-text">${rec.text}</p>
      `;
      DOM.repRecommendationsContainer.appendChild(card);
    });
  }

  // رسم الدونات البياني لتوزيع المصاريف (Donut Chart)
  function renderDonutChart(items, totalMonthly) {
    if (totalMonthly <= 0) return;
    const colors = ["#285172", "#415C47", "#556B7C", "#B3C4CC", "#78656B"];
    let accumulatedPercent = 0;

    let svgCircles = "";
    let legendHtml = "";

    items.forEach((item, idx) => {
      const percent = (item.monthly / totalMonthly) * 100;
      const color = colors[idx % colors.length];
      const strokeDasharray = `${percent} ${100 - percent}`;
      const strokeDashoffset = 100 - accumulatedPercent;

      svgCircles += `
        <circle cx="21" cy="21" r="15.915"
                fill="transparent"
                stroke="${color}"
                stroke-width="5.5"
                stroke-dasharray="${strokeDasharray}"
                stroke-dashoffset="${strokeDashoffset}"></circle>
      `;

      legendHtml += `
        <div class="donut-legend-item">
          <div>
            <span class="donut-legend-color" style="background: ${color};"></span>
            <span>${item.name}</span>
          </div>
          <span class="num-font" style="font-weight: 700; color: var(--steel-light);">${MadarCalculator.toArabicDigits(percent.toFixed(1))}٪</span>
        </div>
      `;

      accumulatedPercent += percent;
    });

    DOM.donutSvgElement.innerHTML = svgCircles;
    DOM.donutLegendContainer.innerHTML = legendHtml;
  }

  // رسم منحنى التدفق النقدي المتراكم (SVG Cashflow Timeline)
  function renderCashFlowChart(timeline, capexTotal) {
    if (!timeline || timeline.length === 0) return;

    const width = 580;
    const height = 200;
    const padding = { top: 25, right: 30, bottom: 35, left: 65 };

    const minVal = -capexTotal;
    const maxVal = timeline[timeline.length - 1].cumulative > 0 
      ? timeline[timeline.length - 1].cumulative * 1.15 
      : capexTotal * 0.5;

    const valRange = maxVal - minVal;

    function getX(m) {
      return padding.left + (m / (timeline.length - 1)) * (width - padding.left - padding.right);
    }

    function getY(val) {
      return height - padding.bottom - ((val - minVal) / valRange) * (height - padding.top - padding.bottom);
    }

    const zeroY = getY(0);

    let pathD = "";
    let pointsHtml = "";
    let breakevenCircle = "";

    timeline.forEach((pt, i) => {
      const x = getX(pt.month);
      const y = getY(pt.cumulative);

      if (i === 0) {
        pathD += `M ${x} ${y}`;
      } else {
        pathD += ` L ${x} ${y}`;
      }

      // إظهار نقاط محددة (كل 4 شهور)
      if (pt.month % 4 === 0 || pt.month === 24) {
        pointsHtml += `
          <circle cx="${x}" cy="${y}" r="3.5" fill="#FFFFFF" stroke="#285172" stroke-width="2"></circle>
        `;
      }

      if (pt.isBreakeven) {
        breakevenCircle = `
          <circle cx="${x}" cy="${zeroY}" r="6.5" fill="#FFFFFF" stroke="#415C47" stroke-width="2.5"></circle>
          <text x="${x}" y="${zeroY - 10}" fill="#162636" font-size="11" font-weight="bold" font-family="'Tajawal', sans-serif" text-anchor="middle">
            التعادل (${pt.label})
          </text>
        `;
      }
    });

    DOM.cashflowSvgBox.innerHTML = `
      <svg viewBox="0 0 ${width} ${height}">
        <!-- خط الصفر المرجعي -->
        <line x1="${padding.left}" y1="${zeroY}" x2="${width - padding.right}" y2="${zeroY}" 
              stroke="#B3C4CC" stroke-width="1.5" stroke-dasharray="4 4"></line>
        <text x="${padding.left - 8}" y="${zeroY + 4}" fill="#556B7C" font-size="10" font-family="'Tajawal', sans-serif" text-anchor="end">٠ ر.س</text>

        <!-- خط مسار الاستثمار والتدفق -->
        <path d="${pathD}" fill="none" stroke="url(#cashflowGrad)" stroke-width="3" stroke-linecap="round"></path>

        <defs>
          <linearGradient id="cashflowGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#78656B"></stop>
            <stop offset="50%" stop-color="#8FA0AA"></stop>
            <stop offset="100%" stop-color="#285172"></stop>
          </linearGradient>
        </defs>

        <!-- نقاط المسار -->
        ${pointsHtml}

        <!-- مؤشرات الشهور -->
        <text x="${padding.left}" y="${height - 10}" fill="#556B7C" font-size="10.5" font-family="'Tajawal', sans-serif" text-anchor="middle">البداية</text>
        <text x="${width - padding.right}" y="${height - 10}" fill="#556B7C" font-size="10.5" font-family="'Tajawal', sans-serif" text-anchor="middle">٢٤ شهراً</text>

        ${breakevenCircle}
      </svg>
    `;
  }

  // دالة مساعدة لتحويل أي نص أرقام (سواء عربية مشرقية أو إنجليزية أو بفواصل) إلى رقم JS عشري
  function parseArabicDigits(str) {
    if (typeof str === "number") return str;
    if (!str) return 0;
    const western = String(str)
      .replace(/[٠-٩]/g, d => "٠١٢٣٤٥٦٧٨٩".indexOf(d))
      .replace(/[^\d.-]/g, "");
    return parseFloat(western) || 0;
  }

  // =========================================================================
  // ربط الأحداث وعناصر التحكم (Event Listeners)
  // =========================================================================
  function bindEvents() {
    // الانتقال من السلايدات إلى المرحلة 2
    if (DOM.btnStartStudy) {
      DOM.btnStartStudy.addEventListener("click", () => goToStep(2));
    }
    DOM.btnSlideTriggers.forEach(btn => {
      btn.addEventListener("click", () => goToStep(2));
    });

    DOM.btnNextStage.addEventListener("click", () => goToStep(state.currentStep + 1));
    DOM.btnPrevStage.addEventListener("click", () => goToStep(state.currentStep - 1));

    // أزرار شريط التبويبات العلوي (Stepper) إن وُجدت
    if (DOM.stepperNavList) {
      const stepTabs = DOM.stepperNavList.querySelectorAll(".stepper-tab");
      stepTabs.forEach((tab, idx) => {
        tab.addEventListener("click", () => {
          const targetStep = idx + 1;
          if (targetStep <= state.maxStepReached) {
            goToStep(targetStep);
          }
        });
      });
    }

    // البحث في الأنشطة
    DOM.activitySearchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      renderActivitiesGrid();
    });

    // إدخال المساحة
    DOM.areaInput.addEventListener("input", (e) => {
      const parsed = parseArabicDigits(e.target.value);
      state.spaceArea = parsed || 80;
      updateLocationPreview();
      renderStage5Results();
      updateAllModel();
    });

    DOM.areaInput.addEventListener("blur", (e) => {
      e.target.value = MadarCalculator.toArabicDigits(state.spaceArea);
    });

    // تبويبات المحاكي المالي
    DOM.tabNavBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const tabTarget = btn.getAttribute("data-tab");
        DOM.tabNavBtns.forEach(b => b.classList.remove("active"));
        DOM.financialTabPanes.forEach(p => p.classList.remove("active"));
        btn.classList.add("active");
        const pane = document.getElementById(tabTarget);
        if (pane) pane.classList.add("active");
      });
    });



    // أزرار اختبار الحساسية
    DOM.sensitivityBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        DOM.sensitivityBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.sensitivityDiscount = Number(btn.getAttribute("data-discount")) || 0;
        renderSuccessGaugeAndRisks();
      });
    });

    // إجراءات التقرير النهائي
    DOM.btnEditInputs.addEventListener("click", () => goToStep(5));
    DOM.btnPrintReport.addEventListener("click", () => window.print());
    DOM.btnNewStudy.addEventListener("click", () => {
      state.customInputs = {};
      state.sensitivityDiscount = 0;
      state.selectedCategory = "all";
      state.searchQuery = "";
      state.maxStepReached = 1;
      DOM.activitySearchInput.value = "";
      renderCategoryPills();
      renderActivitiesGrid();
      goToStep(1);
    });
  }

  // انطلاق التطبيق
  init();
});
