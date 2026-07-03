import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

export const LANGUAGES = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "mr", label: "Marathi", native: "मराठी" },
  { code: "kn", label: "Kannada", native: "ಕನ್ನಡ" },
  { code: "ta", label: "Tamil", native: "தமிழ்" },
  { code: "te", label: "Telugu", native: "తెలుగు" },
  { code: "gu", label: "Gujarati", native: "ગુજરાતી" },
  { code: "bn", label: "Bengali", native: "বাংলা" },
] as const;

const resources = {
  en: { translation: {
    nav: { menu: "Menu", orders: "Orders", admin: "Admin", login: "Login", signup: "Sign up", cart: "Cart", profile: "Profile", notifications: "Notifications", logout: "Logout" },
    home: {
      badge: "Freshly cooked every morning",
      title1: "Home-style tiffins,", title2: "delivered daily.",
      subtitle: "Wholesome breakfast, lunch and dinner from local kitchens. Customize veg or non-veg, subscribe weekly or monthly, and track every order.",
      viewMenu: "View today's menu", startSub: "Start subscription",
      stats: { customers: "Happy customers", dishes: "Daily dishes", ontime: "On-time delivery" },
      fresh: "100% fresh", lunchBy: "Lunch by 12:30",
      whyTitle: "Why DabbaDaily",
      features: {
        cookTitle: "Home-style cooking", cookText: "Recipes from local cooks, made fresh each morning with quality ingredients.",
        deliveryTitle: "On-time delivery", deliveryText: "Track your tiffin in real time. Breakfast by 8am, lunch by 12:30, dinner by 8pm.",
        hygieneTitle: "Hygiene first", hygieneText: "Sealed boxes, gloved handling, FSSAI-certified kitchens.",
      },
    },
    auth: {
      welcomeBack: "Welcome back", continueOrder: "Sign in to continue ordering.",
      email: "Email", password: "Password", signIn: "Sign in", signingIn: "Signing in…",
      continueWith: "or continue with", google: "Continue with Google", connecting: "Connecting…",
      newHere: "New here?", createAccount: "Create an account",
      createTitle: "Create your account", createSub: "Start your daily tiffin in seconds.",
      fullName: "Full name", phone: "Phone", creating: "Creating…", create: "Create account",
      signupGoogle: "Sign up with Google", orSignupEmail: "or sign up with email",
      already: "Already have an account?", signInLink: "Sign in",
    },
    common: { language: "Language" },
  }},
  hi: { translation: {
    nav: { menu: "मेनू", orders: "ऑर्डर", admin: "एडमिन", login: "लॉगिन", signup: "साइन अप", cart: "कार्ट", profile: "प्रोफ़ाइल", notifications: "सूचनाएँ", logout: "लॉगआउट" },
    home: {
      badge: "हर सुबह ताज़ा बना हुआ",
      title1: "घर जैसा टिफिन,", title2: "रोज़ डिलीवर।",
      subtitle: "स्थानीय रसोई से पौष्टिक नाश्ता, दोपहर और रात का खाना। शाकाहारी या मांसाहारी चुनें, साप्ताहिक या मासिक सब्सक्राइब करें, और हर ऑर्डर ट्रैक करें।",
      viewMenu: "आज का मेनू देखें", startSub: "सब्सक्रिप्शन शुरू करें",
      stats: { customers: "खुश ग्राहक", dishes: "रोज़ाना व्यंजन", ontime: "समय पर डिलीवरी" },
      fresh: "100% ताज़ा", lunchBy: "12:30 तक लंच",
      whyTitle: "DabbaDaily क्यों",
      features: {
        cookTitle: "घर जैसा खाना", cookText: "स्थानीय रसोइयों की रेसिपी, हर सुबह ताज़ी सामग्री से बनी।",
        deliveryTitle: "समय पर डिलीवरी", deliveryText: "अपना टिफिन रीयल टाइम में ट्रैक करें। नाश्ता 8 बजे, लंच 12:30, डिनर 8 बजे।",
        hygieneTitle: "स्वच्छता पहले", hygieneText: "सीलबंद डिब्बे, दस्तानों के साथ हैंडलिंग, FSSAI प्रमाणित रसोई।",
      },
    },
    auth: {
      welcomeBack: "वापसी पर स्वागत है", continueOrder: "ऑर्डर जारी रखने के लिए साइन इन करें।",
      email: "ईमेल", password: "पासवर्ड", signIn: "साइन इन", signingIn: "साइन इन हो रहा है…",
      continueWith: "या इसके साथ जारी रखें", google: "Google से जारी रखें", connecting: "कनेक्ट हो रहा है…",
      newHere: "नए हैं?", createAccount: "खाता बनाएँ",
      createTitle: "अपना खाता बनाएँ", createSub: "कुछ ही सेकंड में टिफिन शुरू करें।",
      fullName: "पूरा नाम", phone: "फ़ोन", creating: "बना रहा है…", create: "खाता बनाएँ",
      signupGoogle: "Google से साइन अप करें", orSignupEmail: "या ईमेल से साइन अप करें",
      already: "पहले से खाता है?", signInLink: "साइन इन करें",
    },
    common: { language: "भाषा" },
  }},
  mr: { translation: {
    nav: { menu: "मेनू", orders: "ऑर्डर्स", admin: "ॲडमिन", login: "लॉगिन", signup: "साइन अप", cart: "कार्ट", profile: "प्रोफाइल", notifications: "सूचना", logout: "लॉगआउट" },
    home: {
      badge: "रोज सकाळी ताजे बनवलेले",
      title1: "घरगुती डबा,", title2: "रोज पोहोचवला जातो.",
      subtitle: "स्थानिक स्वयंपाकघरांतून पौष्टिक नाश्ता, जेवण आणि रात्रीचे जेवण. शाकाहारी किंवा मांसाहारी निवडा, साप्ताहिक किंवा मासिक सबस्क्राइब करा.",
      viewMenu: "आजचा मेनू पहा", startSub: "सबस्क्रिप्शन सुरू करा",
      stats: { customers: "आनंदी ग्राहक", dishes: "दररोजचे पदार्थ", ontime: "वेळेवर डिलिव्हरी" },
      fresh: "100% ताजे", lunchBy: "12:30 पर्यंत जेवण",
      whyTitle: "DabbaDaily का",
      features: {
        cookTitle: "घरगुती स्वयंपाक", cookText: "स्थानिक स्वयंपाक्यांच्या पाककृती, रोज सकाळी ताज्या साहित्यातून बनवलेल्या.",
        deliveryTitle: "वेळेवर डिलिव्हरी", deliveryText: "तुमचा डबा रिअल टाइममध्ये ट्रॅक करा. नाश्ता 8 ला, जेवण 12:30, रात्रीचे 8 ला.",
        hygieneTitle: "स्वच्छता प्रथम", hygieneText: "सीलबंद डबे, हातमोजे, FSSAI प्रमाणित स्वयंपाकघरे.",
      },
    },
    auth: {
      welcomeBack: "पुन्हा स्वागत आहे", continueOrder: "ऑर्डर सुरू ठेवण्यासाठी साइन इन करा.",
      email: "ईमेल", password: "पासवर्ड", signIn: "साइन इन", signingIn: "साइन इन होत आहे…",
      continueWith: "किंवा यासह सुरू ठेवा", google: "Google ने सुरू ठेवा", connecting: "कनेक्ट होत आहे…",
      newHere: "नवीन आहात?", createAccount: "खाते तयार करा",
      createTitle: "तुमचे खाते तयार करा", createSub: "काही सेकंदात डबा सुरू करा.",
      fullName: "पूर्ण नाव", phone: "फोन", creating: "तयार होत आहे…", create: "खाते तयार करा",
      signupGoogle: "Google ने साइन अप करा", orSignupEmail: "किंवा ईमेलने साइन अप करा",
      already: "आधीच खाते आहे?", signInLink: "साइन इन करा",
    },
    common: { language: "भाषा" },
  }},
  kn: { translation: {
    nav: { menu: "ಮೆನು", orders: "ಆರ್ಡರ್‌ಗಳು", admin: "ಅಡ್ಮಿನ್", login: "ಲಾಗಿನ್", signup: "ಸೈನ್ ಅಪ್", cart: "ಕಾರ್ಟ್", profile: "ಪ್ರೊಫೈಲ್", notifications: "ಸೂಚನೆಗಳು", logout: "ಲಾಗ್‌ಔಟ್" },
    home: {
      badge: "ಪ್ರತಿದಿನ ಬೆಳಿಗ್ಗೆ ತಾಜಾವಾಗಿ ತಯಾರಿಸಲಾಗಿದೆ",
      title1: "ಮನೆಯ ಶೈಲಿಯ ಟಿಫಿನ್,", title2: "ಪ್ರತಿದಿನ ತಲುಪಿಸಲಾಗಿದೆ.",
      subtitle: "ಸ್ಥಳೀಯ ಅಡುಗೆಮನೆಗಳಿಂದ ಪೌಷ್ಟಿಕ ಬೆಳಗಿನ ಉಪಾಹಾರ, ಮಧ್ಯಾಹ್ನ ಮತ್ತು ರಾತ್ರಿ ಊಟ. ಶಾಕಾಹಾರಿ ಅಥವಾ ಮಾಂಸಾಹಾರಿ ಆಯ್ಕೆಮಾಡಿ.",
      viewMenu: "ಇಂದಿನ ಮೆನು ನೋಡಿ", startSub: "ಚಂದಾದಾರಿಕೆ ಪ್ರಾರಂಭಿಸಿ",
      stats: { customers: "ಸಂತೋಷ ಗ್ರಾಹಕರು", dishes: "ದೈನಂದಿನ ಭಕ್ಷ್ಯಗಳು", ontime: "ಸಮಯಕ್ಕೆ ತಲುಪಿಸುವಿಕೆ" },
      fresh: "100% ತಾಜಾ", lunchBy: "12:30 ಗೆ ಊಟ",
      whyTitle: "DabbaDaily ಏಕೆ",
      features: {
        cookTitle: "ಮನೆಯ ಶೈಲಿಯ ಅಡುಗೆ", cookText: "ಸ್ಥಳೀಯ ಅಡುಗೆಯವರ ಪಾಕವಿಧಾನಗಳು, ಪ್ರತಿದಿನ ಬೆಳಿಗ್ಗೆ ತಾಜಾ ಪದಾರ್ಥಗಳಿಂದ.",
        deliveryTitle: "ಸಮಯಕ್ಕೆ ತಲುಪಿಸುವಿಕೆ", deliveryText: "ನಿಮ್ಮ ಟಿಫಿನ್ ಅನ್ನು ರಿಯಲ್ ಟೈಮ್‌ನಲ್ಲಿ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.",
        hygieneTitle: "ಶುಚಿತ್ವ ಮೊದಲು", hygieneText: "ಮುಚ್ಚಿದ ಡಬ್ಬಗಳು, ಗ್ಲೌಸ್ ಬಳಸಿ ನಿರ್ವಹಣೆ, FSSAI ಪ್ರಮಾಣೀಕೃತ ಅಡುಗೆಮನೆಗಳು.",
      },
    },
    auth: {
      welcomeBack: "ಮರಳಿ ಸ್ವಾಗತ", continueOrder: "ಆರ್ಡರ್ ಮುಂದುವರಿಸಲು ಸೈನ್ ಇನ್ ಮಾಡಿ.",
      email: "ಇಮೇಲ್", password: "ಪಾಸ್‌ವರ್ಡ್", signIn: "ಸೈನ್ ಇನ್", signingIn: "ಸೈನ್ ಇನ್ ಆಗುತ್ತಿದೆ…",
      continueWith: "ಅಥವಾ ಇದರೊಂದಿಗೆ ಮುಂದುವರಿಸಿ", google: "Google ನೊಂದಿಗೆ ಮುಂದುವರಿಸಿ", connecting: "ಸಂಪರ್ಕಿಸುತ್ತಿದೆ…",
      newHere: "ಹೊಸಬರೇ?", createAccount: "ಖಾತೆ ರಚಿಸಿ",
      createTitle: "ನಿಮ್ಮ ಖಾತೆಯನ್ನು ರಚಿಸಿ", createSub: "ಕೆಲವೇ ಸೆಕೆಂಡುಗಳಲ್ಲಿ ಪ್ರಾರಂಭಿಸಿ.",
      fullName: "ಪೂರ್ಣ ಹೆಸರು", phone: "ಫೋನ್", creating: "ರಚಿಸಲಾಗುತ್ತಿದೆ…", create: "ಖಾತೆ ರಚಿಸಿ",
      signupGoogle: "Google ನೊಂದಿಗೆ ಸೈನ್ ಅಪ್", orSignupEmail: "ಅಥವಾ ಇಮೇಲ್‌ನೊಂದಿಗೆ ಸೈನ್ ಅಪ್",
      already: "ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ?", signInLink: "ಸೈನ್ ಇನ್",
    },
    common: { language: "ಭಾಷೆ" },
  }},
  ta: { translation: {
    nav: { menu: "மெனு", orders: "ஆர்டர்கள்", admin: "நிர்வாகி", login: "உள்நுழைக", signup: "பதிவு", cart: "கார்ட்", profile: "சுயவிவரம்", notifications: "அறிவிப்புகள்", logout: "வெளியேறு" },
    home: { badge: "தினமும் காலை புதியதாக", title1: "வீட்டுச்சாப்பாடு டிஃபின்,", title2: "தினமும் வழங்கப்படுகிறது.", subtitle: "உள்ளூர் சமையலறைகளில் இருந்து சத்தான காலை, மதிய மற்றும் இரவு உணவு.", viewMenu: "இன்றைய மெனு", startSub: "சந்தா தொடங்கு", stats: { customers: "மகிழ்ச்சியான வாடிக்கையாளர்கள்", dishes: "தினசரி உணவுகள்", ontime: "சரியான நேரத்தில்" }, fresh: "100% புதியது", lunchBy: "12:30 க்குள் மதிய உணவு", whyTitle: "ஏன் DabbaDaily", features: { cookTitle: "வீட்டு சமையல்", cookText: "உள்ளூர் சமையல்காரர்களின் ரெசிபிகள்.", deliveryTitle: "சரியான நேரத்தில் டெலிவரி", deliveryText: "உங்கள் டிஃபினை நேரலையில் கண்காணிக்கவும்.", hygieneTitle: "சுகாதாரம் முதலில்", hygieneText: "மூடப்பட்ட பெட்டிகள், FSSAI சான்றளிக்கப்பட்ட சமையலறைகள்." } },
    auth: { welcomeBack: "மீண்டும் வரவேற்கிறோம்", continueOrder: "தொடர உள்நுழையவும்.", email: "மின்னஞ்சல்", password: "கடவுச்சொல்", signIn: "உள்நுழை", signingIn: "உள்நுழைகிறது…", continueWith: "அல்லது இதன் மூலம் தொடரவும்", google: "Google உடன் தொடரவும்", connecting: "இணைக்கிறது…", newHere: "புதியவரா?", createAccount: "கணக்கை உருவாக்கு", createTitle: "உங்கள் கணக்கை உருவாக்கவும்", createSub: "சில வினாடிகளில் தொடங்கவும்.", fullName: "முழு பெயர்", phone: "தொலைபேசி", creating: "உருவாக்குகிறது…", create: "கணக்கை உருவாக்கு", signupGoogle: "Google உடன் பதிவு செய்க", orSignupEmail: "அல்லது மின்னஞ்சல் மூலம் பதிவு", already: "ஏற்கனவே கணக்கு உள்ளதா?", signInLink: "உள்நுழை" },
    common: { language: "மொழி" },
  }},
  te: { translation: {
    nav: { menu: "మెను", orders: "ఆర్డర్లు", admin: "అడ్మిన్", login: "లాగిన్", signup: "సైన్ అప్", cart: "కార్ట్", profile: "ప్రొఫైల్", notifications: "నోటిఫికేషన్లు", logout: "లాగౌట్" },
    home: { badge: "ప్రతిరోజూ ఉదయం తాజాగా", title1: "ఇంటి శైలి టిఫిన్,", title2: "ప్రతిరోజూ డెలివరీ.", subtitle: "స్థానిక వంటశాలల నుండి పౌష్టికమైన అల్పాహారం, మధ్యాహ్నం మరియు రాత్రి భోజనం.", viewMenu: "నేటి మెను చూడండి", startSub: "సబ్‌స్క్రిప్షన్ ప్రారంభించండి", stats: { customers: "సంతోషంగా ఉన్న వినియోగదారులు", dishes: "రోజువారీ వంటకాలు", ontime: "సమయానికి డెలివరీ" }, fresh: "100% తాజా", lunchBy: "12:30 లోపు భోజనం", whyTitle: "DabbaDaily ఎందుకు", features: { cookTitle: "ఇంటి శైలి వంట", cookText: "స్థానిక వంటవారి వంటకాలు, తాజా పదార్థాలతో.", deliveryTitle: "సమయానికి డెలివరీ", deliveryText: "మీ టిఫిన్‌ను రియల్ టైమ్‌లో ట్రాక్ చేయండి.", hygieneTitle: "పరిశుభ్రత మొదట", hygieneText: "మూసివేసిన పెట్టెలు, FSSAI ధృవీకృత వంటశాలలు." } },
    auth: { welcomeBack: "తిరిగి స్వాగతం", continueOrder: "కొనసాగించడానికి సైన్ ఇన్ చేయండి.", email: "ఇమెయిల్", password: "పాస్‌వర్డ్", signIn: "సైన్ ఇన్", signingIn: "సైన్ ఇన్ అవుతోంది…", continueWith: "లేదా దీనితో కొనసాగించండి", google: "Google తో కొనసాగించండి", connecting: "కనెక్ట్ అవుతోంది…", newHere: "కొత్తవారా?", createAccount: "ఖాతా సృష్టించండి", createTitle: "మీ ఖాతాను సృష్టించండి", createSub: "కొన్ని సెకన్లలో ప్రారంభించండి.", fullName: "పూర్తి పేరు", phone: "ఫోన్", creating: "సృష్టిస్తోంది…", create: "ఖాతా సృష్టించండి", signupGoogle: "Google తో సైన్ అప్", orSignupEmail: "లేదా ఇమెయిల్‌తో సైన్ అప్", already: "ఇప్పటికే ఖాతా ఉందా?", signInLink: "సైన్ ఇన్" },
    common: { language: "భాష" },
  }},
  gu: { translation: {
    nav: { menu: "મેનુ", orders: "ઓર્ડર્સ", admin: "એડમિન", login: "લોગિન", signup: "સાઇન અપ", cart: "કાર્ટ", profile: "પ્રોફાઇલ", notifications: "સૂચનાઓ", logout: "લોગઆઉટ" },
    home: { badge: "દરરોજ સવારે તાજું બનાવેલું", title1: "ઘર જેવું ટિફિન,", title2: "દરરોજ ડિલિવર.", subtitle: "સ્થાનિક રસોડામાંથી પૌષ્ટિક નાસ્તો, બપોરનું અને રાત્રિ ભોજન.", viewMenu: "આજનું મેનુ", startSub: "સબ્સ્ક્રિપ્શન શરૂ કરો", stats: { customers: "ખુશ ગ્રાહકો", dishes: "દૈનિક વાનગીઓ", ontime: "સમયસર ડિલિવરી" }, fresh: "100% તાજું", lunchBy: "12:30 સુધી લંચ", whyTitle: "શા માટે DabbaDaily", features: { cookTitle: "ઘરેલું રસોઈ", cookText: "સ્થાનિક રસોઇયાઓની રેસિપી, તાજી સામગ્રીમાંથી.", deliveryTitle: "સમયસર ડિલિવરી", deliveryText: "તમારું ટિફિન રિયલ ટાઇમમાં ટ્રેક કરો.", hygieneTitle: "સ્વચ્છતા પ્રથમ", hygieneText: "સીલબંધ ડબ્બા, FSSAI પ્રમાણિત રસોડું." } },
    auth: { welcomeBack: "પાછા સ્વાગત છે", continueOrder: "ઓર્ડર ચાલુ રાખવા સાઇન ઇન કરો.", email: "ઇમેઇલ", password: "પાસવર્ડ", signIn: "સાઇન ઇન", signingIn: "સાઇન ઇન થઇ રહ્યું છે…", continueWith: "અથવા આ સાથે ચાલુ રાખો", google: "Google સાથે ચાલુ રાખો", connecting: "કનેક્ટ થઇ રહ્યું છે…", newHere: "નવા છો?", createAccount: "ખાતું બનાવો", createTitle: "તમારું ખાતું બનાવો", createSub: "થોડી સેકન્ડમાં શરૂ કરો.", fullName: "પૂરું નામ", phone: "ફોન", creating: "બની રહ્યું છે…", create: "ખાતું બનાવો", signupGoogle: "Google થી સાઇન અપ", orSignupEmail: "અથવા ઇમેઇલથી સાઇન અપ", already: "પહેલેથી ખાતું છે?", signInLink: "સાઇન ઇન" },
    common: { language: "ભાષા" },
  }},
  bn: { translation: {
    nav: { menu: "মেনু", orders: "অর্ডার", admin: "অ্যাডমিন", login: "লগইন", signup: "সাইন আপ", cart: "কার্ট", profile: "প্রোফাইল", notifications: "বিজ্ঞপ্তি", logout: "লগআউট" },
    home: { badge: "প্রতিদিন সকালে টাটকা", title1: "ঘরোয়া টিফিন,", title2: "প্রতিদিন ডেলিভারি.", subtitle: "স্থানীয় রান্নাঘর থেকে পুষ্টিকর সকালের নাস্তা, দুপুর এবং রাতের খাবার.", viewMenu: "আজকের মেনু", startSub: "সাবস্ক্রিপশন শুরু করুন", stats: { customers: "খুশি গ্রাহক", dishes: "দৈনিক খাবার", ontime: "সময়মতো ডেলিভারি" }, fresh: "100% টাটকা", lunchBy: "12:30 মধ্যে লাঞ্চ", whyTitle: "কেন DabbaDaily", features: { cookTitle: "ঘরোয়া রান্না", cookText: "স্থানীয় রাঁধুনিদের রেসিপি, টাটকা উপাদান দিয়ে.", deliveryTitle: "সময়মতো ডেলিভারি", deliveryText: "আপনার টিফিন রিয়েল টাইমে ট্র্যাক করুন.", hygieneTitle: "স্বাস্থ্যবিধি প্রথম", hygieneText: "সিল করা বাক্স, FSSAI সার্টিফাইড রান্নাঘর." } },
    auth: { welcomeBack: "আবার স্বাগতম", continueOrder: "অর্ডার চালিয়ে যেতে সাইন ইন করুন.", email: "ইমেইল", password: "পাসওয়ার্ড", signIn: "সাইন ইন", signingIn: "সাইন ইন হচ্ছে…", continueWith: "অথবা এর সাথে চালিয়ে যান", google: "Google দিয়ে চালিয়ে যান", connecting: "কানেক্ট হচ্ছে…", newHere: "নতুন?", createAccount: "অ্যাকাউন্ট তৈরি করুন", createTitle: "আপনার অ্যাকাউন্ট তৈরি করুন", createSub: "কয়েক সেকেন্ডে শুরু করুন.", fullName: "পুরো নাম", phone: "ফোন", creating: "তৈরি হচ্ছে…", create: "অ্যাকাউন্ট তৈরি", signupGoogle: "Google দিয়ে সাইন আপ", orSignupEmail: "অথবা ইমেইল দিয়ে সাইন আপ", already: "ইতিমধ্যে অ্যাকাউন্ট আছে?", signInLink: "সাইন ইন" },
    common: { language: "ভাষা" },
  }},
};

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: "en",
      supportedLngs: LANGUAGES.map(l => l.code),
      interpolation: { escapeValue: false },
      detection: { order: ["localStorage", "navigator"], caches: ["localStorage"], lookupLocalStorage: "tiffin.lang" },
    });
}

export default i18n;
