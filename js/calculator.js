/**
 * المحرك الحسابي والمالي لمنصة «مُدار» - دراسات الجدوى الاقتصادية في السوق السعودي
 * يشمل دوال احتساب التكاليف والأرباح وفترة الاسترداد ومؤشر النجاح ومصفوفة المخاطر
 * لغة عربية بحتة 100% وبدون أي إيموجي أو مصطلحات أجنبية
 */

const MadarCalculator = {
  /**
   * حساب إجمالي النفقات التأسيسية والاستثمارية
   */
  calculateCAPEX(capexData) {
    const licensing = Number(capexData.licensing) || 0;
    const fitout = Number(capexData.fitout) || 0;
    const equipment = Number(capexData.equipment) || 0;
    const initialWorkingCap = Number(capexData.initialWorkingCap) || 0;

    const total = licensing + fitout + equipment + initialWorkingCap;

    return {
      licensing,
      fitout,
      equipment,
      initialWorkingCap,
      total
    };
  },

  /**
   * حساب إجمالي النفقات والمصاريف التشغيلية الدورية
   */
  calculateOPEX(opexData, annualRent, monthlyRevenue) {
    const monthlyRent = Math.round((Number(annualRent) || 0) / 12);
    const laborCost = Number(opexData.laborCost) || 0;
    const utilities = Number(opexData.utilities) || 0;
    const marketingMaintenance = Number(opexData.marketingMaintenance) || 0;
    const cogsPercent = Number(opexData.cogsPercent) || 0;

    // تكلفة المواد الأولية والبضائع المباعة متغيرة مع حجم الدخل الشهري
    const cogsMonthly = Math.round(monthlyRevenue * (cogsPercent / 100));

    // التكاليف الثابتة شهرياً
    const fixedMonthly = monthlyRent + laborCost + utilities + marketingMaintenance;

    // إجمالي المصاريف التشغيلية الشهرية والسنوية
    const totalMonthly = fixedMonthly + cogsMonthly;
    const totalAnnual = totalMonthly * 12;

    return {
      monthlyRent,
      annualRent: monthlyRent * 12,
      laborCost,
      utilities,
      marketingMaintenance,
      cogsPercent,
      cogsMonthly,
      fixedMonthly,
      totalMonthly,
      totalAnnual
    };
  },

  /**
   * حساب الإيرادات المتوقعة شهرياً وسنوياً مع دعم اختبار حساسية المبيعات
   */
  calculateRevenue(dailyVisitors, avgTicket, daysPerMonth = 30, sensitivityDiscount = 0) {
    const visitors = Number(dailyVisitors) || 0;
    const ticket = Number(avgTicket) || 0;
    const days = Number(daysPerMonth) || 30;

    // الدخل اليومي الأساسي
    let dailyBase = visitors * ticket;

    // تطبيق خصم اختبار الحساسية إذا وُجد
    if (sensitivityDiscount > 0) {
      dailyBase = dailyBase * (1 - (sensitivityDiscount / 100));
    }

    const daily = Math.round(dailyBase);
    const monthly = Math.round(daily * days);
    const annual = Math.round(monthly * 12);

    return {
      daily,
      monthly,
      annual,
      dailyVisitors: visitors,
      avgTicket: ticket,
      daysPerMonth: days,
      sensitivityDiscount
    };
  },

  /**
   * تجميع المؤشرات المالية والتشغيلية الشاملة
   */
  compileFinancialModel(activity, city, district, zone, area, customInputs = {}) {
    const currentArea = Number(area) || activity.recommendedArea || 80;
    const zoneMultiplier = zone ? zone.rentMultiplier : 1.0;
    const trafficMultiplier = zone ? zone.trafficMultiplier : 1.0;

    // حساب الإيجار السنوي المقدر
    const avgRentPerMeter = district ? district.avgRentPerMeter : 1500;
    const effectiveRentPerMeter = Math.round(avgRentPerMeter * zoneMultiplier);
    const annualRent = Math.round(effectiveRentPerMeter * currentArea);

    // دمج المدخلات المخصصة مع القيم المعيارية المرجعية
    const capexMerged = {
      licensing: customInputs.licensing !== undefined ? Number(customInputs.licensing) : activity.capex.licensing,
      fitout: customInputs.fitout !== undefined ? Number(customInputs.fitout) : activity.capex.fitout,
      equipment: customInputs.equipment !== undefined ? Number(customInputs.equipment) : activity.capex.equipment,
      initialWorkingCap: customInputs.initialWorkingCap !== undefined ? Number(customInputs.initialWorkingCap) : activity.capex.initialWorkingCap
    };

    const opexMerged = {
      laborCost: customInputs.laborCost !== undefined ? Number(customInputs.laborCost) : activity.opex.laborCost,
      utilities: customInputs.utilities !== undefined ? Number(customInputs.utilities) : activity.opex.utilities,
      marketingMaintenance: customInputs.marketingMaintenance !== undefined ? Number(customInputs.marketingMaintenance) : activity.opex.marketingMaintenance,
      cogsPercent: customInputs.cogsPercent !== undefined ? Number(customInputs.cogsPercent) : activity.opex.cogsPercent
    };

    const baseDailyVisitors = customInputs.dailyVisitors !== undefined ? Number(customInputs.dailyVisitors) : Math.round(activity.revenueDefaults.dailyVisitors * trafficMultiplier);
    const avgTicket = customInputs.avgTicket !== undefined ? Number(customInputs.avgTicket) : activity.revenueDefaults.avgTicket;
    const daysPerMonth = customInputs.daysPerMonth !== undefined ? Number(customInputs.daysPerMonth) : activity.revenueDefaults.daysPerMonth;
    const sensitivityDiscount = Number(customInputs.sensitivityDiscount) || 0;

    // الحسابات
    const capex = this.calculateCAPEX(capexMerged);
    const revenue = this.calculateRevenue(baseDailyVisitors, avgTicket, daysPerMonth, sensitivityDiscount);
    const opex = this.calculateOPEX(opexMerged, annualRent, revenue.monthly);

    // صافي الأرباح
    const netProfitMonthly = revenue.monthly - opex.totalMonthly;
    const netProfitAnnual = netProfitMonthly * 12;

    // هامش صافي الربح (%)
    const netProfitMargin = revenue.monthly > 0 ? ((netProfitMonthly / revenue.monthly) * 100).toFixed(1) : 0;

    // نقطة التعادل (حجم المبيعات الشهري المطلوب لتغطية التكاليف بدون أرباح)
    const grossMarginPercent = (100 - opex.cogsPercent) / 100;
    const breakEvenMonthly = grossMarginPercent > 0 ? Math.round(opex.fixedMonthly / grossMarginPercent) : 0;
    const breakEvenDailyCustomers = (revenue.avgTicket > 0 && revenue.daysPerMonth > 0)
      ? Math.ceil(breakEvenMonthly / (revenue.avgTicket * revenue.daysPerMonth))
      : 0;

    // فترة استرداد رأس المال بالشهور
    let paybackMonths = 0;
    let paybackText = "غير محدد";
    if (netProfitMonthly > 0) {
      paybackMonths = (capex.total / netProfitMonthly).toFixed(1);
      const m = Math.round(paybackMonths);
      const years = Math.floor(m / 12);
      const remainingMonths = m % 12;

      if (years === 0) {
        paybackText = `${remainingMonths} شهر`;
      } else if (remainingMonths === 0) {
        paybackText = `${years} ${years === 1 ? "سنة" : years === 2 ? "سنتان" : "سنوات"}`;
      } else {
        paybackText = `${years} سنة و ${remainingMonths} شهر`;
      }
    } else {
      paybackText = "المشروع لا يغطي مصاريفه";
      paybackMonths = 999;
    }

    // نسب التحليل التشغيلي
    const rentToRevenueRatio = revenue.monthly > 0 ? ((opex.monthlyRent / revenue.monthly) * 100).toFixed(1) : 0;
    const laborToRevenueRatio = revenue.monthly > 0 ? ((opex.laborCost / revenue.monthly) * 100).toFixed(1) : 0;

    // مؤشر نجاح المشروع وخوارزمية التقييم
    const scoreResult = this.calculateSuccessScore({
      netProfitMonthly,
      netProfitMargin: Number(netProfitMargin),
      paybackMonths: Number(paybackMonths),
      rentToRevenueRatio: Number(rentToRevenueRatio),
      breakEvenMonthly,
      revenueMonthly: revenue.monthly
    });

    // مصفوفة المخاطر المحددة
    const risks = this.generateRisks({
      rentToRevenueRatio: Number(rentToRevenueRatio),
      paybackMonths: Number(paybackMonths),
      netProfitMargin: Number(netProfitMargin),
      dailyVisitors: revenue.dailyVisitors,
      breakEvenDailyCustomers,
      laborToRevenueRatio: Number(laborToRevenueRatio)
    });

    // التوصيات الاستراتيجية المخصصة
    const recommendations = this.generateRecommendations({
      activity,
      city,
      district,
      zone,
      paybackMonths: Number(paybackMonths),
      netProfitMargin: Number(netProfitMargin),
      rentToRevenueRatio: Number(rentToRevenueRatio),
      cogsPercent: opex.cogsPercent,
      capexTotal: capex.total,
      breakEvenDailyCustomers
    });

    // حساب التدفق النقدي المتراكم على مدار 24 شهراً
    const cashFlowProjection = this.generateCashFlowTimeline(capex.total, netProfitMonthly);

    return {
      activity,
      city,
      district,
      zone,
      area: currentArea,
      capex,
      opex,
      revenue,
      netProfitMonthly,
      netProfitAnnual,
      netProfitMargin: Number(netProfitMargin),
      breakEvenMonthly,
      breakEvenDailyCustomers,
      paybackMonths: Number(paybackMonths),
      paybackText,
      rentToRevenueRatio: Number(rentToRevenueRatio),
      laborToRevenueRatio: Number(laborToRevenueRatio),
      scoreResult,
      risks,
      recommendations,
      cashFlowProjection
    };
  },

  /**
   * خوارزمية حساب مؤشر نجاح المشروع (0-100)
   */
  calculateSuccessScore(params) {
    const {
      netProfitMonthly,
      netProfitMargin,
      paybackMonths,
      rentToRevenueRatio,
      breakEvenMonthly,
      revenueMonthly
    } = params;

    if (netProfitMonthly <= 0) {
      return {
        score: 18,
        level: "danger",
        label: "مشروع غير مجدٍ في المعطيات الحالية",
        badgeColor: "#78656B",
        summary: "التكاليف التشغيلية تفوق الإيرادات المتوقعة، مما يستلزم مراجعة أسعار البيع أو تخفيض تكاليف الموقع والتشغيل."
      };
    }

    let score = 50; // نقطة الأساس لمشروع رابح

    // 1. وزن فترة استرداد رأس المال
    if (paybackMonths <= 15) {
      score += 25;
    } else if (paybackMonths <= 24) {
      score += 18;
    } else if (paybackMonths <= 36) {
      score += 8;
    } else if (paybackMonths <= 48) {
      score -= 10;
    } else {
      score -= 22;
    }

    // 2. وزن هامش صافي الربح
    if (netProfitMargin >= 25) {
      score += 15;
    } else if (netProfitMargin >= 18) {
      score += 10;
    } else if (netProfitMargin >= 12) {
      score += 4;
    } else if (netProfitMargin < 8) {
      score -= 15;
    }

    // 3. وزن عبء الإيجار
    if (rentToRevenueRatio <= 12) {
      score += 10;
    } else if (rentToRevenueRatio <= 18) {
      score += 4;
    } else if (rentToRevenueRatio > 25) {
      score -= 15;
    }

    // 4. وزن نقطة التعادل ونسبة الأمان
    const breakEvenRatio = revenueMonthly > 0 ? (breakEvenMonthly / revenueMonthly) : 1;
    if (breakEvenRatio <= 0.60) {
      score += 10;
    } else if (breakEvenRatio > 0.85) {
      score -= 10;
    }

    score = Math.max(15, Math.min(96, Math.round(score)));

    let level = "warning";
    let label = "مجدٍ بحذر تشغيلي";
    let badgeColor = "#285172";
    let summary = "المشروع يحقق أرباحاً مقبولة مع وجود بنود تستلزم متابعة مستمرة كالإيجار وتكلفة التشغيل.";

    if (score >= 78) {
      level = "success";
      label = "فرصة استثمارية واعدة ومجدية";
      badgeColor = "#285172";
      summary = "مؤشرات الربحية ومعدلات الأمان وفترة استرداد رأس المال ممتازة ومتسقة مع أفضل معايير السوق السعودي.";
    } else if (score < 55) {
      level = "danger";
      label = "مرتفع المخاطر ويستلزم إعادة دراسة";
      badgeColor = "#78656B";
      summary = "فترة الاسترداد ممتدة أو هوامش الربح محدودة مما يرفع من حساسية المشروع لأي تراجع في حركة المبيعات.";
    }

    return {
      score,
      level,
      label,
      badgeColor,
      summary
    };
  },

  /**
   * توليد مصفوفة المخاطر المحددة طبقاً للبيانات الفعلية
   */
  generateRisks(params) {
    const risks = [];

    // خطر 1: الإيجار
    if (params.rentToRevenueRatio > 20) {
      risks.push({
        id: "rent_burden",
        title: "عبء إيجاري مرتفع",
        type: "مالي وتشغيلي",
        level: "high",
        levelLabel: "مرتفع",
        color: "#78656B",
        detail: `يشكل الإيجار ${params.rentToRevenueRatio}% من إجمالي الدخل المتوقع، والحد الآمن الموصى به لمعظم الأنشطة هو أقل من 15% إلى 18%.`
      });
    } else if (params.rentToRevenueRatio >= 16) {
      risks.push({
        id: "rent_moderate",
        title: "تكلفة إيجارية تقترب من الحد الأقصى",
        type: "تشغيلي",
        level: "medium",
        levelLabel: "متوسط",
        color: "#8FA0AA",
        detail: `الإيجار يشكل ${params.rentToRevenueRatio}% من المبيعات، مما يقلص مرونة التسعير ويستوجب استمرار تدفق العملاء.`
      });
    }

    // خطر 2: فترة استرداد رأس المال
    if (params.paybackMonths > 36) {
      risks.push({
        id: "slow_payback",
        title: "فترة استرداد ممتدة تتجاوز 3 سنوات",
        type: "استثماري",
        level: "high",
        levelLabel: "مرتفع",
        color: "#78656B",
        detail: `تحتاج إلى أكثر من ${Math.round(params.paybackMonths / 12)} سنوات لاسترجاع رأس المال الأولي، وهو ما يزيد من مخاطر تقادم التجهيزات وظهور منافسين.`
      });
    } else if (params.paybackMonths > 24) {
      risks.push({
        id: "moderate_payback",
        title: "فترة استرداد متوسطة الأجل",
        type: "استثماري",
        level: "medium",
        levelLabel: "متوسط",
        color: "#8FA0AA",
        detail: `استرداد رأس المال المقدر بـ ${params.paybackMonths} شهراً يتطلب الحفاظ على وتيرة مبيعات ثابتة خلال أول عامين دون هبوط ملحوظ.`
      });
    }

    // خطر 3: هوامش الربحية
    if (params.netProfitMargin < 12) {
      risks.push({
        id: "thin_margin",
        title: "هامش صافي ربح محدود",
        type: "مالي",
        level: "high",
        levelLabel: "مرتفع",
        color: "#78656B",
        detail: `هامش الربح الصافي المقدر (${params.netProfitMargin}%) ضئيل، وأي ارتفاع طفيف في أسعار المواد الخام أو تكاليف الخدمات قد يؤثر على الربحية.`
      });
    }

    // خطر 4: حساسية حجم الزوار ونقطة التعادل
    const customerSafetyMargin = params.dailyVisitors - params.breakEvenDailyCustomers;
    if (customerSafetyMargin < 15) {
      risks.push({
        id: "traffic_sensitivity",
        title: "حساسية عالية لعدد العملاء اليومي",
        type: "سوقي وتشغيلي",
        level: "high",
        levelLabel: "مرتفع",
        color: "#78656B",
        detail: `تحتاج إلى ${params.breakEvenDailyCustomers} عميلاً يومياً لتغطية التكاليف فقط، بينما التقدير الكلي ${params.dailyVisitors} عميل؛ هامش الأمان ضيق.`
      });
    } else {
      risks.push({
        id: "traffic_normal",
        title: "مخاطر التذبذب الموسمي للمبيعات",
        type: "سوقي",
        level: "low",
        levelLabel: "منخفض",
        color: "#285172",
        detail: "الأنشطة التجارية في السوق السعودي تتأثر بالإجازات الصيفية ومواسم الأعياد، مما يستوجب بناء مخصصات مالية للأشهر الهادئة."
      });
    }

    // خطر 5: تكلفة الرواتب
    if (params.laborToRevenueRatio > 35) {
      risks.push({
        id: "labor_burden",
        title: "ارتفاع نسبة كتلة الرواتب",
        type: "تشغيلي",
        level: "medium",
        levelLabel: "متوسط",
        color: "#8FA0AA",
        detail: `الرواتب تشكل ${params.laborToRevenueRatio}% من الدخل، يُنصح بمراجعة كفاءة الورديات دون الإخلال بجودة الخدمة.`
      });
    }

    return risks;
  },

  /**
   * توليد النصائح والتوصيات المخصصة والموجهة بدقة
   */
  generateRecommendations(params) {
    const recs = [];

    // نصيحة عقد الإيجار وفترة السماح
    recs.push({
      category: "عقد الإيجار والموقع",
      title: "التفاوض على فترة سماح كافية للتجهيز والترخيص",
      text: `قبل توقيع عقد الإيجار في ${params.district ? params.district.name : "الحي المختار"}، احرص على طلب فترة سماح معفاة من الإيجار لا تقل عن 3 إلى 5 أشهر مخصصة لأعمال التجهيز واستخراج تراخيص منصة بلدي والدفاع المدني لتفادي سداد الإيجار قبل بدء البيع.`
    });

    // نصيحة رأس المال التأسيسي
    if (params.paybackMonths > 20) {
      recs.push({
        category: "النفقات التأسيسية والاستثمارية",
        title: "ترشيد ميزانية الديكور والتشطيب بنسبة 15 إلى 20%",
        text: "ينفق العديد من رواد الأعمال مبالغ طائلة في أعمال الديكور غير القابلة للاسترداد؛ ركّز الميزانية على المعدات التشغيلية المباشرة التي تحتفظ بقيمتها، واعتمد تصاميم عصرية بسيطة لتسريع استرداد رأس المال."
      });
    }

    // نصيحة التسعير وهوامش الربح
    if (params.netProfitMargin < 20) {
      recs.push({
        category: "التسعير وهوامش الربحية",
        title: "رفع متوسط قيمة الفاتورة عبر المنتجات المكملة",
        text: "صمم باقات مجمعة وقوائم منتجات مكملة ذات هوامش ربح مرتفعة عند نقطة البيع؛ فرفع متوسط الفاتورة بمقدار 5 إلى 8 ريالات ينعكس مباشرة كصافي ربح دون تكاليف تشغيلية إضافية."
      });
    }

    // نصيحة إدارة السيولة
    recs.push({
      category: "إدارة السيولة النقدية",
      title: "الاحتفاظ باحتياطي سيولة تشغيلية يغطي 3 إلى 6 أشهر",
      text: "المشاريع الجديدة في السوق السعودي تحتاج عادة من 60 إلى 90 يوماً للوصول إلى وتيرة مبيعات مستقرة؛ تجنب استنزاف كامل أموالك في التأسيس واحتفظ باحتياطي للطوارئ ورواتب الأشهر الأولى."
    });

    // نصيحة التسويق والولاء
    recs.push({
      category: "التسويق وجذب العملاء",
      title: "برنامج ولاء ميسر وحضور موثق على خرائط جوجل",
      text: "العميل المتكرر يوفر ما يصل إلى 80% من تكلفة الإعلانات الممولة. اهتم بتسجيل المتجر وتوثيقه فوراً على خرائط جوجل، وتفعيل برنامج ولاء رقمي مبسط برقم الجوال."
    });

    return recs;
  },

  /**
   * حساب مسار التدفق النقدي المتراكم على مدار 24 شهراً
   */
  generateCashFlowTimeline(capexTotal, netProfitMonthly) {
    const timeline = [];
    let cumulative = -capexTotal; // البداية باستثمار سالب لكامل رأس المال

    timeline.push({
      month: 0,
      label: "التأسيس",
      monthlyCash: -capexTotal,
      cumulative: Math.round(cumulative),
      isBreakeven: false
    });

    let reachedBreakEven = false;

    for (let m = 1; m <= 24; m++) {
      let monthFactor = 1.0;
      if (m === 1) monthFactor = 0.5;
      else if (m === 2) monthFactor = 0.75;

      const monthlyCash = Math.round(netProfitMonthly * monthFactor);
      cumulative += monthlyCash;

      let isBreakevenThisMonth = false;
      if (!reachedBreakEven && cumulative >= 0) {
        reachedBreakEven = true;
        isBreakevenThisMonth = true;
      }

      timeline.push({
        month: m,
        label: `شهر ${m}`,
        monthlyCash,
        cumulative: Math.round(cumulative),
        isBreakeven: isBreakevenThisMonth
      });
    }

    return timeline;
  },

  /**
   * تنسيق العملة والأرقام بالريال السعودي
   */
  formatSAR(amount) {
    if (isNaN(amount) || amount === null || amount === undefined) return "0 ر.س";
    return new Intl.NumberFormat("ar-SA", {
      style: "decimal",
      maximumFractionDigits: 0
    }).format(Math.round(amount)) + " ر.س";
  },

  /**
   * تنسيق الأرقام بدون رمز عملة
   */
  formatNumber(num) {
    if (isNaN(num) || num === null || num === undefined) return "0";
    return new Intl.NumberFormat("ar-SA", {
      maximumFractionDigits: 1
    }).format(num);
  }
};

// إتاحة المحرك الحسابي عالمياً
if (typeof window !== "undefined") { window.MadarCalculator = MadarCalculator; }
if (typeof globalThis !== "undefined") { globalThis.MadarCalculator = MadarCalculator; }
