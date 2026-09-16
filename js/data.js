/**
 * قاعدة البيانات المرجعية لمنصة «مُدار» - دراسات الجدوى الاقتصادية في السوق السعودي
 * بيانات استرشادية معيارية للأنشطة والمدن وتكاليف الإيجار ونماذج الأعمال
 * لغة عربية بحتة 100% وبدون أي إيموجي أو مصطلحات أجنبية
 */

const MADAR_DATA = {
  // تصنيفات الأنشطة التجارية
  categories: [
    { id: "all", name: "جميع الأنشطة" },
    { id: "food_beverage", name: "المطاعم والمقاهي" },
    { id: "retail", name: "التجزئة والمتاجر" },
    { id: "services", name: "الخدمات والصيانة" },
    { id: "beauty_wellness", name: "الجمال والعناية" },
    { id: "health", name: "الصحة والرياضة" }
  ],

  // الأنشطة التجارية وتفاصيلها ومعاييرها المالية بالسوق السعودي
  activities: [
    {
      id: "specialty_coffee",
      categoryId: "food_beverage",
      title: "مقهى مختص",
      shortDesc: "مقهى يقدم مشروبات القهوة المتخصصة والمشروبات الباردة والمخبوزات الخفيفة.",
      recommendedArea: 80, // م²
      defaultZone: "commercial_street",
      capex: {
        licensing: 12000,     // تراخيص بلدية، دفاع مدني، سجل تجاري
        fitout: 140000,       // أعمال الديكور والتشطيب والواجهة الخارجية
        equipment: 95000,     // آلات التحضير، المطاحن، التبريد وصانعة الثلج
        initialWorkingCap: 35000 // السيولة العاملة الأولية واحتياطي الطوارئ
      },
      opex: {
        laborCost: 14000,     // الكوادر التشغيلية والرواتب الشهرية
        cogsPercent: 24,      // تكلفة البن والحليب والمواد المستهلكة
        utilities: 3500,      // الطاقة والمياه والاتصالات
        marketingMaintenance: 3000 // التسويق والصيانة الدورية
      },
      revenueDefaults: {
        dailyVisitors: 160,
        avgTicket: 26,        // متوسط الفاتورة بالريال السعودي
        daysPerMonth: 30
      },
      tags: ["الأعلى طلباً", "نمو مستمر", "إقبال متكرر"]
    },
    {
      id: "drive_thru_burger",
      categoryId: "food_beverage",
      title: "مطعم وجبات سريعة وشطائر",
      shortDesc: "مطعم يقدم وجبات الشواء السريع مع التركيز على الطلبات المباشرة والتوصيل.",
      recommendedArea: 95,
      defaultZone: "strip_mall",
      capex: {
        licensing: 15000,
        fitout: 160000,
        equipment: 120000,
        initialWorkingCap: 45000
      },
      opex: {
        laborCost: 18000,
        cogsPercent: 32,
        utilities: 4500,
        marketingMaintenance: 4000
      },
      revenueDefaults: {
        dailyVisitors: 140,
        avgTicket: 42,
        daysPerMonth: 30
      },
      tags: ["دوران سريع", "استهلاك يومي", "طلب نشط"]
    },
    {
      id: "mens_grooming_salon",
      categoryId: "beauty_wellness",
      title: "صالون عناية وحلاقة رجالية",
      shortDesc: "صالون متكامل يقدم خدمات العناية والمظهر الشخصي للرجال.",
      recommendedArea: 65,
      defaultZone: "commercial_street",
      capex: {
        licensing: 9000,
        fitout: 85000,
        equipment: 45000,
        initialWorkingCap: 20000
      },
      opex: {
        laborCost: 12000,
        cogsPercent: 8,
        utilities: 2200,
        marketingMaintenance: 1800
      },
      revenueDefaults: {
        dailyVisitors: 45,
        avgTicket: 55,
        daysPerMonth: 30
      },
      tags: ["هامش ربح مرتفع", "ولاء العملاء", "تكلفة مواد منخفضة"]
    },
    {
      id: "womens_beauty_lounge",
      categoryId: "beauty_wellness",
      title: "مركز تجميل وعناية نسائية",
      shortDesc: "مركز نسائي متكامل لخدمات العناية بالمظهر والتجميل وتصفيف الشعر.",
      recommendedArea: 120,
      defaultZone: "commercial_street",
      capex: {
        licensing: 16000,
        fitout: 180000,
        equipment: 90000,
        initialWorkingCap: 50000
      },
      opex: {
        laborCost: 22000,
        cogsPercent: 12,
        utilities: 4000,
        marketingMaintenance: 5000
      },
      revenueDefaults: {
        dailyVisitors: 30,
        avgTicket: 160,
        daysPerMonth: 28
      },
      tags: ["قيمة فاتورة عالية", "إقبال دوري", "عائد استثماري متميز"]
    },
    {
      id: "auto_smart_carwash",
      categoryId: "services",
      title: "محطة غسيل وعناية بالمركبات",
      shortDesc: "مركز يقدم خدمات تنظيف وتلميع المركبات بتقنيات مرشدة وسريعة.",
      recommendedArea: 180,
      defaultZone: "commercial_street",
      capex: {
        licensing: 18000,
        fitout: 110000,
        equipment: 130000,
        initialWorkingCap: 30000
      },
      opex: {
        laborCost: 16000,
        cogsPercent: 10,
        utilities: 6000,
        marketingMaintenance: 3500
      },
      revenueDefaults: {
        dailyVisitors: 55,
        avgTicket: 48,
        daysPerMonth: 30
      },
      tags: ["تدفق نقدي يومي", "طلب مستمر", "تشغيل مرن"]
    },
    {
      id: "smart_mini_market",
      categoryId: "retail",
      title: "متجر تموينات ومواد استهلاكية",
      shortDesc: "متجر تجزئة عصري يخدم الأحياء السكنية بالمنتجات الغذائية والاستهلاكية اليومية.",
      recommendedArea: 110,
      defaultZone: "residential_active",
      capex: {
        licensing: 14000,
        fitout: 95000,
        equipment: 80000,
        initialWorkingCap: 70000
      },
      opex: {
        laborCost: 11000,
        cogsPercent: 72,
        utilities: 4800,
        marketingMaintenance: 2000
      },
      revenueDefaults: {
        dailyVisitors: 210,
        avgTicket: 28,
        daysPerMonth: 30
      },
      tags: ["مقاوم للتقلبات", "احتياج أساسي", "معدل دوران مرتفع"]
    },
    {
      id: "fashion_boutique",
      categoryId: "retail",
      title: "متجر أزياء وتصاميم حديثة",
      shortDesc: "متجر متخصص في تقديم الأزياء والتصاميم النسائية الراقية والملبوسات.",
      recommendedArea: 75,
      defaultZone: "strip_mall",
      capex: {
        licensing: 10000,
        fitout: 125000,
        equipment: 35000,
        initialWorkingCap: 60000
      },
      opex: {
        laborCost: 9000,
        cogsPercent: 38,
        utilities: 2500,
        marketingMaintenance: 4500
      },
      revenueDefaults: {
        dailyVisitors: 35,
        avgTicket: 190,
        daysPerMonth: 30
      },
      tags: ["هامش ربح قوي", "مواسم استهلاكية", "تسويق نوعي"]
    },
    {
      id: "fitness_crossfit_studio",
      categoryId: "health",
      title: "مركز تدريب ولياقة بدنية",
      shortDesc: "مساحة تدريب مدمجة تقدم حصص اللياقة البدنية والتمارين الوظيفية بنظام الاشتراكات.",
      recommendedArea: 160,
      defaultZone: "commercial_street",
      capex: {
        licensing: 20000,
        fitout: 130000,
        equipment: 150000,
        initialWorkingCap: 40000
      },
      opex: {
        laborCost: 17000,
        cogsPercent: 5,
        utilities: 4000,
        marketingMaintenance: 4500
      },
      revenueDefaults: {
        dailyVisitors: 50,
        avgTicket: 65,
        daysPerMonth: 30
      },
      tags: ["إيرادات متكررة", "مجتمع نشط", "وعي بدني متزايد"]
    }
  ],

  // المدن السعودية وأحياؤها ومعاملات الإيجار التقديرية (متوسط سعر المتر السنوي بالريال)
  cities: [
    {
      id: "riyadh",
      name: "الرياض",
      region: "منطقة الرياض",
      badge: "المركز المالي والحركة التجارية الكبرى",
      districts: [
        { id: "malqa", name: "حي الملقا", avgRentPerMeter: 1800, trafficLevel: "مرتفع جداً", purchasingPower: "عالية جداً", description: "شمال الرياض، منطقة تجارية حيوية ونشاط استهلاكي متميز على مدار الأسبوع." },
        { id: "yasmin", name: "حي الياسمين", avgRentPerMeter: 1500, trafficLevel: "مرتفع", purchasingPower: "عالية", description: "حي محوري بين الطرق الرئيسية ويتميز بكثافة سكانية متصاعدة ونشاط تجاري." },
        { id: "narjis", name: "حي النرجس", avgRentPerMeter: 1350, trafficLevel: "نمو عمراني متسارع", purchasingPower: "متوسطة إلى عالية", description: "منطقة نمو شمالية حديثة وقاعدة عملاء شابة تبحث عن خدمات القرب." },
        { id: "olaya", name: "حي العليا", avgRentPerMeter: 2200, trafficLevel: "مركز أعمال وتجارة", purchasingPower: "عالية جداً", description: "قلب الأعمال والشركات والمقار الرئيسية، تدفق متواصل طوال اليوم." },
        { id: "sulaimaniyah", name: "حي السليمانية", avgRentPerMeter: 1900, trafficLevel: "وجهة ضيافة وتذوق", purchasingPower: "عالية", description: "وجهة استقطاب بارزة للمطاعم والمقاهي والتجارب العصرية الفاخرة." },
        { id: "rawdah", name: "حي الروضة", avgRentPerMeter: 1100, trafficLevel: "حي سكني متكامل", purchasingPower: "متوسطة", description: "حي عائلي مستقر بشرق الرياض يضمن استدامة الطلب على الخدمات الأساسية." }
      ]
    },
    {
      id: "jeddah",
      name: "جدة",
      region: "منطقة مكة المكرمة",
      badge: "البوابة البحرية والنشاط السياحي والتجاري",
      districts: [
        { id: "rawdah_jdd", name: "حي الروضة", avgRentPerMeter: 1650, trafficLevel: "مرتفع جداً", purchasingPower: "عالية", description: "من أعرق وأنشط مناطق جدة التجارية ومقصد رئيسي للمشاريع النوعية." },
        { id: "zahra", name: "حي الزهراء", avgRentPerMeter: 1500, trafficLevel: "مرتفع", purchasingPower: "عالية", description: "موقع قريب من المحاور الحيوية والواجهات البحرية ذو إقبال متكرر." },
        { id: "hamra", name: "حي الحمراء", avgRentPerMeter: 1750, trafficLevel: "سياحي وترفيهي", purchasingPower: "عالية", description: "منطقة تجمع أنشطة الضيافة والفنادق والزوار مع تدفق مستمر." },
        { id: "marwah", name: "حي المروة", avgRentPerMeter: 1050, trafficLevel: "سكني نشط", purchasingPower: "متوسطة", description: "كثافة سكانية مرتفعة توفر طلباً يومياً ثابتاً للخدمات والمتاجر." }
      ]
    },
    {
      id: "dammam_khobar",
      name: "الدمام والخبر",
      region: "المنطقة الشرقية",
      badge: "المنطقة الاقتصادية والحركة السكنية المستقرة",
      districts: [
        { id: "hezam", name: "حي الحزام الذهبي", avgRentPerMeter: 1600, trafficLevel: "وجهة راقية", purchasingPower: "عالية جداً", description: "نطاق رئيسي للأنشطة المتخصصة والمقاهي المتميزة في مدينة الخبر." },
        { id: "corniche_khobar", name: "واجهة الخبر البحرية", avgRentPerMeter: 1850, trafficLevel: "مرتفع في المساء والإجازات", purchasingPower: "عالية", description: "حركة سياحية وترفيهية واسعة تخدم سكان المنطقة الشرقية والزوار." },
        { id: "shatea_dammam", name: "حي الشاطئ", avgRentPerMeter: 1300, trafficLevel: "مرتفع وعائلي", purchasingPower: "عالية", description: "موقع تجاري ساحلي مزدهر في حاضرة الدمام ذو طابع عائلي نشط." },
        { id: "faisaliyah_dmm", name: "حي الفيصلية", avgRentPerMeter: 950, trafficLevel: "سكني تجاري متزن", purchasingPower: "متوسطة", description: "طبيعة عمرانية حيوية بتكاليف إيجارية متوازنة تعزز جدوى التأسيس." }
      ]
    },
    {
      id: "makkah",
      name: "مكة المكرمة",
      region: "منطقة مكة المكرمة",
      badge: "طبيعة استهلاكية مستمرة ومواسم دينية كبرى",
      districts: [
        { id: "shawqiyah", name: "حي الشوقية", avgRentPerMeter: 1250, trafficLevel: "مرتفع طوال اليوم", purchasingPower: "متوسطة إلى عالية", description: "أحد أهم شرايين النشاط التجاري والمطاعم للمقيمين في العاصمة المقدسة." },
        { id: "awali", name: "حي العوالي", avgRentPerMeter: 1400, trafficLevel: "منطقة راقية", purchasingPower: "عالية", description: "واجهة استقطاب سكنية وتجارية لقطاعات التجزئة والخدمات الأسرية." }
      ]
    },
    {
      id: "madinah",
      name: "المدينة المنورة",
      region: "منطقة المدينة المنورة",
      badge: "وجهة حضارية ومواسم زيارة مستمرة",
      districts: [
        { id: "sultana", name: "طريق سلطانة التجاري", avgRentPerMeter: 1550, trafficLevel: "مرتفع وتاريخي", purchasingPower: "عالية", description: "أبرز الشوارع التجارية وأكثرها جذباً لحركة التسوق اليومية." },
        { id: "hijrah", name: "طريق الهجرة", avgRentPerMeter: 1150, trafficLevel: "محور حيوي متصل", purchasingPower: "متوسطة", description: "مسار رئيسي يربط وسط المدينة بالمخططات الحديثة ونقاط العبور." }
      ]
    }
  ],

  // تصنيفات نوع الموقع التجاري وتأثيرها على الإيجار وحركة الزوار
  commercialZones: [
    {
      id: "commercial_street",
      name: "شارع تجاري رئيسي",
      description: "واجهة مباشرة على شارع عام بعرض 30 متراً فأكثر مع سهولة الرؤية والوصول المباشر.",
      rentMultiplier: 1.0,
      trafficMultiplier: 1.0
    },
    {
      id: "strip_mall",
      name: "مجمع تجاري مفتوح",
      description: "مجمع حديث يضم مواقف سيارات أمامية ومزيجاً متناسقاً من المتاجر والعلامات التجارية.",
      rentMultiplier: 1.25,
      trafficMultiplier: 1.20
    },
    {
      id: "residential_active",
      name: "شارع داخلي حيوي بالحي",
      description: "شارع تجاري يخدم قاطني الحي مباشرة، بإيجار اقتصادي وتكلفة تشغيل مرنة.",
      rentMultiplier: 0.75,
      trafficMultiplier: 0.85
    },
    {
      id: "indoor_mall",
      name: "مركز تجاري مغلق",
      description: "داخل مركز تسوق رئيسي ذي حركة تسوق مكيفة وتدفق عائلي منظم.",
      rentMultiplier: 1.55,
      trafficMultiplier: 1.35
    }
  ]
};

// إتاحة البيانات عالمياً على نافذة المتصفح والبيئات المختلفة
if (typeof window !== "undefined") { window.MADAR_DATA = MADAR_DATA; }
if (typeof globalThis !== "undefined") { globalThis.MADAR_DATA = MADAR_DATA; }
