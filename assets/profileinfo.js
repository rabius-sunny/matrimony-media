const _type = ['পাত্রের বায়োডাটা', 'পাত্রীর বায়োডাটা']
const _malecondition = ['অবিবাহিত', 'বিবাহিত', 'ডিভোর্সড', 'বিপত্মীক']
const _femalecondition = ['অবিবাহিত', 'ডিভোর্সড', 'বিধবা']
const _conditions = ['অবিবাহিত', 'বিবাহিত', 'ডিভোর্সড', 'বিপত্মীক', 'বিধবা']
const _madhabs = [
  'সালাফি/আহলেহাদীস',
  'হানাফি',
  'শাফেয়ী',
  'মালেকি',
  'হাম্বালি',
  'অন্যান্য'
]
const _address_jilla = [
  'বরগুনা',
  'বরিশাল',
  'ভোলা',
  'ঝালকাঠি',
  'পটুয়াখালী',
  'পিরোজপুর',
  'বান্দরবান',
  'ব্রাহ্মণবাড়িয়া',
  'চাঁদপুর',
  'চট্টগ্রাম',
  'কুমিল্লা',
  'কক্সবাজার',
  'ফেনী',
  'খাগড়াছড়ি',
  'লক্ষ্মীপুর',
  'নোয়াখালী',
  'রাঙ্গামাটি',
  'ঢাকা',
  'ফরিদপুর',
  'গাজীপুর',
  'গোপালগঞ্জ',
  'কিশোরগঞ্জ',
  'মাদারীপুর',
  'মানিকগঞ্জ',
  'মুন্সীগঞ্জ',
  'নারায়ণগঞ্জ',
  'নরসিংদী',
  'রাজবাড়ী',
  'শরীয়তপুর',
  'টাঙ্গাইল',
  'বাগেরহাট',
  'চুয়াডাঙ্গা',
  'যশোর',
  'ঝিনাইদহ',
  'খুলনা',
  'কুষ্টিয়া',
  'মাগুরা',
  'মেহেরপুর',
  'নড়াইল',
  'সাতক্ষীরা',
  'জামালপুর',
  'ময়মনসিংহ',
  'নেত্রকোণা',
  'শেরপুর',
  'বগুড়া',
  'জয়পুরহাট',
  'নওগাঁ',
  'নাটোর',
  'চাঁপাইনবাবগঞ্জ',
  'পাবনা',
  'রাজশাহী',
  'সিরাজগঞ্জ',
  'দিনাজপুর',
  'গাইবান্ধা',
  'কুড়িগ্রাম',
  'লালমনিরহাট',
  'নীলফামারী',
  'পঞ্চগড়',
  'রংপুর',
  'ঠাকুরগাঁও',
  'হবিগঞ্জ',
  'মৌলভীবাজার',
  'সুনামগঞ্জ',
  'সিলেট'
]
const _address_division = [
  'ঢাকা',
  'রাজশাহী',
  'ময়মনসিংহ',
  'চট্টগ্রাম',
  'খুলনা',
  'বরিশাল',
  'সিলেট',
  'রংপুর'
]
const _birthYear = [
  '1970',
  '1971',
  '1972',
  '1973',
  '1974',
  '1975',
  '1976',
  '1977',
  '1978',
  '1979',
  '1980',
  '1981',
  '1982',
  '1983',
  '1984',
  '1985',
  '1986',
  '1987',
  '1988',
  '1989',
  '1990',
  '1991',
  '1992',
  '1993',
  '1994',
  '1995',
  '1996',
  '1997',
  '1998',
  '1999',
  '2000',
  '2001',
  '2002',
  '2003',
  '2004',
  '2005',
  '2006',
  '2007',
  '2008',
  '2009',
  '2010',
  '2011',
  '2012',
  '2013',
  '2014',
  '2015',
  '2016',
  '2017',
  '2018',
  '2019',
  '2020'
]
const _complexion = [
  'অনুজ্জ্বল শ্যামলা',
  'শ্যামলা',
  'উজ্জ্বল শ্যামলা',
  'ফর্সা',
  'উজ্জ্বল ফর্সা'
]
const _height = [
  `4'1`,
  `4'2`,
  `4'3`,
  `4'4`,
  `4'5`,
  `4'6`,
  `4'7`,
  `4'8`,
  `4'9`,
  `4'10`,
  `4'11`,
  `4'12`,
  `5'1`,
  `5'2`,
  `5'3`,
  `5'4`,
  `5'5`,
  `5'6`,
  `5'7`,
  `5'8`,
  `5'9`,
  `5'10`,
  `5'11`,
  `5'12`,
  `6'1`,
  `6'2`,
  `6'3`,
  `6'4`,
  `6'5`,
  `6'6`,
  `6'7`,
  `6'8`,
  `6'9`,
  `6'10`,
  `6'11`,
  `6'12`
]
const _weight = [
  '30 কেজি',
  '31 কেজি',
  '32 কেজি',
  '33 কেজি',
  '34 কেজি',
  '35 কেজি',
  '36 কেজি',
  '37 কেজি',
  '38 কেজি',
  '39 কেজি',
  '40 কেজি',
  '41 কেজি',
  '42 কেজি',
  '43 কেজি',
  '44 কেজি',
  '45 কেজি',
  '46 কেজি',
  '47 কেজি',
  '48 কেজি',
  '49 কেজি',
  '50 কেজি',
  '51 কেজি',
  '52 কেজি',
  '53 কেজি',
  '54 কেজি',
  '55 কেজি',
  '56 কেজি',
  '57 কেজি',
  '58 কেজি',
  '59 কেজি',
  '60 কেজি',
  '61 কেজি',
  '62 কেজি',
  '63 কেজি',
  '64 কেজি',
  '65 কেজি',
  '66 কেজি',
  '67 কেজি',
  '68 কেজি',
  '69 কেজি',
  '70 কেজি',
  '71 কেজি',
  '72 কেজি',
  '73 কেজি',
  '74 কেজি',
  '75 কেজি',
  '76 কেজি',
  '77 কেজি',
  '78 কেজি',
  '79 কেজি',
  '80 কেজি',
  '81 কেজি',
  '82 কেজি',
  '83 কেজি',
  '84 কেজি',
  '85 কেজি',
  '86 কেজি',
  '87 কেজি',
  '88 কেজি',
  '89 কেজি',
  '90 কেজি',
  '91 কেজি',
  '92 কেজি',
  '93 কেজি',
  '94 কেজি',
  '95 কেজি',
  '96 কেজি',
  '97 কেজি',
  '98 কেজি',
  '99 কেজি',
  '100 কেজি',
  '101 কেজি',
  '102 কেজি',
  '103 কেজি',
  '104 কেজি',
  '105 কেজি',
  '106 কেজি',
  '107 কেজি',
  '108 কেজি',
  '109 কেজি',
  '110 কেজি',
  '111 কেজি',
  '112 কেজি',
  '113 কেজি',
  '114 কেজি',
  '115 কেজি',
  '116 কেজি',
  '117 কেজি',
  '118 কেজি',
  '119 কেজি',
  '120 কেজি'
]
const _bloodGroup = [
  'জানা নেই',
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-'
]
const _brothers = ['১', '২', '৩', '৪', '৫', '৬']
export {
  _type,
  _malecondition,
  _femalecondition,
  _madhabs,
  _address_jilla,
  _address_division,
  _birthYear,
  _complexion,
  _height,
  _weight,
  _bloodGroup,
  _brothers,
  _conditions
}
