// ALFA MOTORS - ULTRA-SMART AI CHATBOT
// Industry-expert knowledge with modern UX

const CONTACT = {
    phones: ["9549652225", "9694833000", "9694822000", "09521202120"],
    email: "info@Alfamotors.com",
    whatsapp: "9549652225",
    location: "109, Gajsinghpur, Jaipur, Rajasthan 302021",
    hours: "Mon-Sat: 9AM-7PM | Sun: 10AM-5PM"
};

const quickReplies = {
    services: "🔧 Services",
    insurance: "🛡️ Insurance",
    detailing: "✨ Detailing",
    usedcars: "🚗 Used Cars",
    pricing: "💰 Pricing",
    contact: "📞 Contact"
};

const chatbotKnowledge = {
    greetings: {
        patterns: ["hi", "hello", "hey", "namaste", "good morning", "good afternoon", "helo", "hii"],
        response: `Hi! 👋 Welcome to Alfa Motors.\n\nI'm your AI assistant with 25+ years of automotive expertise.\n\nQuick help:`,
        quickActions: true
    },

    services: {
        patterns: ["service", "repair", "maintenance", "oil", "servicing", "pms", "periodic", "check", "inspection"],
        response: `🔧 **Alfa Motors Expert Services**\n\n**PERIODIC MAINTENANCE (PMS)**\n✓ Complete Bumper-to-Bumper Care\n✓ 70-Point Detailed Check-up\n✓ Top to Underbody Inspection\n✓ Tightening, Adjustment & Wheel Rotation\n\n**TAILOR-MADE PACKAGES**\n✓ Customized work according to your budget\n✓ **Mini Service starts from ₹800/- onwards**\n✓ 100% Original Parts Assured\n\n**WHEEL SERVICES**\n✓ Authorized Dealer for Tyres & Batteries\n✓ Computerized Wheel Alignment & Balancing\n\n**SPECIALIZED CARE**\n✓ Steering & Suspension Overhaul\n✓ AC Deep Cleaning & Gas Charging\n✓ Advance Diagnostic (Luxury Car Laptop Scanning)\n✓ DSS (Door Step Services) - Service Van & Bike Support\n\n📞 Book: ${CONTACT.phones[0]}`,
        quickActions: false
    },

    insurance: {
        patterns: ["insurance", "policy", "renewal", "claim", "third party", "comprehensive", "ncb"],
        response: `🛡️ **Insurance Services**\n\n**TYPES OF COVERAGE:**\n\n1️⃣ **Comprehensive Insurance**\n   • Own damage + Third party\n   • Theft & natural calamities\n   • Fire, flood, riots\n   • Personal accident cover\n   • Add-ons: Zero depreciation, engine protect\n\n2️⃣ **Third-Party Only** (Mandatory)\n   • Legal liability coverage\n   • Third-party injury/death\n   • Property damage\n\n**OUR SERVICES:**\n✓ Policy renewal in 5 minutes\n✓ Cashless claim settlement (98% success)\n✓ Compare quotes from 15+ insurers\n✓ NCB (No Claim Bonus) protection\n✓ 24/7 accident support\n\n**INSURANCE PARTNERS:**\nHDFC Ergo, ICICI Lombard, Bajaj Allianz, Reliance, TATA AIG, SBI General, IFFCO Tokio & more\n\n💰 **Premium Range:**\n• Hatchback: ₹5K-₹12K/year\n• Sedan: ₹8K-₹18K/year\n• SUV: ₹12K-₹30K/year\n\n📞 Insurance Desk: ${CONTACT.phones[1]}\n💬 WhatsApp: ${CONTACT.whatsapp}`,
        quickActions: false
    },

    detailing: {
        patterns: ["detailing", "wash", "clean", "ceramic", "coating", "ppf", "paint", "polish", "protection"],
        response: `✨ **Premium Detailing Studio**\n\n**CERAMIC COATING**\n• 9H hardness protection\n• UV & chemical resistance\n• Hydrophobic (water beading)\n• Enhanced gloss & depth\n• Lasts 3-5 years\n• Price: ₹8,000-₹25,000\n\n**Benefits:**\n✓ Protects from UV damage\n✓ Resists bird droppings, tree sap\n✓ Easier cleaning\n✓ Prevents minor scratches\n✓ Showroom shine\n\n**PPF (PAINT PROTECTION FILM)**\n• Self-healing technology\n• Rock chip protection\n• 10x better impact resistance\n• Lasts 5-10 years\n• Price: ₹45,000-₹85,000\n\n**Benefits:**\n✓ Superior physical protection\n✓ Self-heals minor scratches\n✓ Maintains factory finish\n✓ Increases resale value\n\n**DETAILING PACKAGES:**\n• Express Wash: ₹500 (45 mins)\n• Full Detail: ₹3,500 (4-6 hrs)\n• Premium: ₹8,000+ (2-3 days)\n\n**PRODUCTS USED:**\n3M, XPEL, Ceramic Pro, Gyeon, Chemical Guys\n\n🎁 **Offer:** 20% OFF Ceramic Coating!\n\n📞 Book: ${CONTACT.phones[0]}`,
        quickActions: false
    },

    usedcars: {
        patterns: ["used", "buy car", "sell car", "second hand", "pre-owned", "exchange", "trade"],
        response: `🚗 **Certified Pre-Owned Cars**\n\n**150-POINT INSPECTION:**\n✓ Engine & transmission\n✓ Suspension & brakes\n✓ Electrical systems\n✓ Body & paint (thickness meter)\n✓ Accident history verification\n✓ Legal document check\n\n**GUARANTEES:**\n✓ No accident/flood damage\n✓ Complete service history\n✓ 6-month warranty\n✓ Free insurance transfer\n✓ 7-day return policy\n\n**INVENTORY:**\n• Hatchbacks: ₹2L-₹6L\n• Sedans: ₹4L-₹12L\n• SUVs: ₹6L-₹20L\n• Luxury: ₹15L+\n\n**FINANCING:**\n• Up to 90% loan approval\n• Interest from 8.5%\n• Tenure up to 7 years\n\n**SELLING YOUR CAR?**\n✓ Best market price\n✓ Free evaluation\n✓ Payment in 24 hours\n✓ We handle all paperwork\n✓ Free RC transfer\n\n📞 Used Cars: ${CONTACT.phones[2]}`,
        quickActions: false
    },

    pricing: {
        patterns: ["price", "cost", "how much", "charge", "rate", "expensive", "cheap", "quote", "book service"],
        response: `💰 **Transparent Pricing & Booking**\n\n**Estimated Costs:**\n• Mini Service: ₹800 onwards\n• Periodic Maintenance: ₹2,999 onwards\n• AC Deep Cleaning: ₹1,200 onwards\n• Wheel Alignment: ₹500 onwards\n• Premium Car Scanning: ₹1,500 onwards\n\n**How to Book & Get Cost?**\n1️⃣ **Initial Estimate:** Select your service category above.\n2️⃣ **Expert Quote:** Call us at ${CONTACT.phones[0]} for a tailor-made quote based on your car model.\n3️⃣ **On-Site Inspection:** Our team provides a 70-point checkup to give you a 100% accurate final budget.\n\n✅ **DSS (Door Step Service) available!**\n\n📞 Contact for Quote: ${CONTACT.phones[0]}`,
        quickActions: false
    },

    contact: {
        patterns: ["contact", "phone", "address", "location", "timing", "hours", "where", "reach"],
        response: `📞 **Contact Alfa Motors**\n\n**PHONE NUMBERS:**\n☎️ ${CONTACT.phones[0]} (Main)\n☎️ ${CONTACT.phones[1]} (Insurance)\n☎️ ${CONTACT.phones[2]} (Used Cars)\n☎️ ${CONTACT.phones[3]} (Inquiry)\n\n📧 **EMAIL:**\n${CONTACT.email}\n\n💬 **WHATSAPP:**\n${CONTACT.whatsapp}\n\n📍 **LOCATION:**\n${CONTACT.location}\n\n🕒 **WORKING HOURS:**\n${CONTACT.hours}\n\n🚨 **24/7 EMERGENCY:**\nRoadside assistance available\nCall: ${CONTACT.phones[0]}\n\n🗺️ **VISIT US:**\nFree parking available\nNo appointment needed\n(Booking recommended)`,
        quickActions: false
    },

    offers: {
        patterns: ["offer", "discount", "deal", "promotion", "save", "cheap"],
        response: `🎁 **Current Offers**\n\n**SERVICE PACKAGES:**\n• Basic: ₹2,999 (Save ₹1,000)\n• Premium: ₹5,999 (Save ₹2,000)\n• Complete: ₹9,999 (Save ₹3,500)\n\n**DETAILING SPECIALS:**\n• 20% OFF Ceramic Coating\n• Buy PPF → Get Interior Detail FREE\n• Combo Deal: ₹1,999\n\n**INSURANCE:**\n• Zero processing fee\n• Extra 5% NCB discount\n• Free add-ons worth ₹5,000\n\n**LOYALTY REWARDS:**\n• 3rd Service: 10% OFF\n• 5th Service: 15% OFF\n• Refer & Earn: ₹1,000\n\n**MEMBERSHIP:**\nAlfa Club: ₹4,999/year\n✓ 20% off all services\n✓ Free roadside assistance\n✓ Priority booking\n✓ Birthday special: 50% OFF\n\n⏰ Valid this month!\n📞 ${CONTACT.phones[0]}`,
        quickActions: false
    },

    emergency: {
        patterns: ["emergency", "urgent", "breakdown", "stuck", "help", "accident", "tow"],
        response: `🚨 **EMERGENCY HELP**\n\n📞 **CALL NOW:**\n${CONTACT.phones[0]}\n\n**24/7 SERVICES:**\n✓ Roadside assistance\n✓ Towing service\n✓ Jump start\n✓ Flat tire change\n✓ Fuel delivery\n✓ Key lockout help\n\n⏱️ **Response:** 15-30 mins\n🗺️ **Coverage:** City + 50km\n\n💰 **Charges:**\n• Members: FREE\n• Non-members: ₹500-₹2,000\n\n**ACCIDENT SUPPORT:**\n• Insurance claim assistance\n• Towing to workshop\n• Police report help\n\nCall immediately for help!`,
        quickActions: false
    },

    booking: {
        patterns: ["book", "appointment", "schedule", "reserve", "slot"],
        response: `📅 **Book Your Service**\n\n**QUICK BOOKING:**\n\n1️⃣ **Call:**\n${CONTACT.phones[0]}\nGet confirmed in 2 mins\n\n2️⃣ **WhatsApp:**\n${CONTACT.whatsapp}\nShare your requirements\n\n3️⃣ **Walk-in:**\nDirect visit welcome\n(Booking recommended)\n\n**AVAILABLE SLOTS:**\n• Morning: 9AM-12PM\n• Afternoon: 12PM-3PM\n• Evening: 3PM-7PM\n\n**BOOKING BENEFITS:**\n✓ Guaranteed slot\n✓ No waiting\n✓ Priority service\n✓ Special discounts\n✓ Free pickup/drop\n\n✅ Same-day booking available!`,
        quickActions: false
    },

    default: {
        response: `I can help you with:\n\n🔧 Car Services & Repairs\n🛡️ Insurance & Claims\n✨ Detailing & Protection\n🚗 Used Cars\n💰 Pricing & Offers\n📞 Contact Info\n🚨 Emergency Help\n\nWhat would you like to know?\n\n📞 Quick call: ${CONTACT.phones[0]}`,
        quickActions: true
    }
};

function findBestMatch(input) {
    input = input.toLowerCase().trim();

    // Spell corrections
    const corrections = {
        'servise': 'service', 'servis': 'service',
        'insurence': 'insurance', 'insur': 'insurance',
        'detaling': 'detailing', 'detal': 'detail',
        'contect': 'contact', 'prise': 'price',
        'ofr': 'offer', 'emergancy': 'emergency'
    };

    Object.keys(corrections).forEach(wrong => {
        input = input.replace(wrong, corrections[wrong]);
    });

    // Find best match
    let bestMatch = null;
    let maxScore = 0;

    for (const [key, data] of Object.entries(chatbotKnowledge)) {
        if (key === 'default') continue;

        const patterns = data.patterns || [];
        const score = patterns.filter(p => input.includes(p)).length;

        if (score > maxScore) {
            maxScore = score;
            bestMatch = key;
        }
    }

    return bestMatch || 'default';
}

function getBotResponse(userInput) {
    if (!userInput || !userInput.trim()) {
        return chatbotKnowledge.default.response;
    }

    const category = findBestMatch(userInput);
    const response = chatbotKnowledge[category];

    return {
        text: response.response,
        showQuickActions: response.quickActions
    };
}

function getQuickActions() {
    return Object.entries(quickReplies).map(([key, label]) => ({
        key,
        label
    }));
}
