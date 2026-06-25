// Asset Management — data for Salem College of Engineering & Technology

export const ASSETS_KPI = {
  totalAssets: 4820,
  totalValue: 187500000,    // ₹18.75 Cr
  bookValue: 112400000,     // ₹11.24 Cr (after depreciation)
  maintenanceDue: 48,
  underMaintenance: 12,
  procurementPending: 7,
  disposed: 136,
  newThisAY: 214,
}

export const ASSET_CATEGORIES = [
  { cat: 'IT Equipment',      count: 1842, value: 92100000,  bookValue: 52400000, color: '#1A2E8F', icon: 'Monitor' },
  { cat: 'Lab Instruments',   count:  684, value: 48600000,  bookValue: 31200000, color: '#2540B4', icon: 'FlaskConical' },
  { cat: 'Furniture',         count: 1124, value: 16800000,  bookValue: 10900000, color: '#F5B800', icon: 'Armchair' },
  { cat: 'Electrical',        count:  386, value: 14200000,  bookValue:  8800000, color: '#C99800', icon: 'Zap' },
  { cat: 'CCTV & Security',   count:  312, value:  7400000,  bookValue:  4600000, color: '#3055CC', icon: 'Camera' },
  { cat: 'Sports & Gym',      count:  184, value:  4200000,  bookValue:  2900000, color: '#6690EE', icon: 'Dumbbell' },
  { cat: 'Vehicles',          count:   12, value:  3400000,  bookValue:  1900000, color: '#0F766E', icon: 'Car' },
  { cat: 'Others',            count:  276, value:   800000,  bookValue:   700000, color: '#94A3B8', icon: 'Package' },
]

export const ASSETS = [
  { id: 'AS001', name: 'Dell OptiPlex 7090 Desktop',        cat: 'IT Equipment',    dept: 'CSE Lab 1',   location: 'Block A, Rm 101', status: 'Active',      purchaseDate: '2023-06-15', value: 68000,  bookValue: 45000, vendor: 'Dell India Pvt Ltd',        tag: 'SCET-IT-1001', condition: 'Good'      },
  { id: 'AS002', name: 'HP ProBook 450 G9 Laptop',          cat: 'IT Equipment',    dept: 'CSE Dept',    location: 'Block A, Rm 210', status: 'Active',      purchaseDate: '2023-08-20', value: 72000,  bookValue: 51000, vendor: 'HP India Sales Pvt Ltd',    tag: 'SCET-IT-1002', condition: 'Good'      },
  { id: 'AS003', name: 'Cisco Catalyst 2960 Switch',        cat: 'IT Equipment',    dept: 'Network Lab', location: 'Block B, Rm 204', status: 'Active',      purchaseDate: '2022-11-10', value: 85000,  bookValue: 51000, vendor: 'Cisco Systems India',       tag: 'SCET-IT-1003', condition: 'Good'      },
  { id: 'AS004', name: 'Agilent DSO1004A Oscilloscope',     cat: 'Lab Instruments', dept: 'ECE Lab',     location: 'Block C, Rm 102', status: 'Active',      purchaseDate: '2021-03-12', value: 124000, bookValue: 62000, vendor: 'Keysight Technologies',     tag: 'SCET-LA-2001', condition: 'Good'      },
  { id: 'AS005', name: 'Fluke 87V Industrial Multimeter',   cat: 'Lab Instruments', dept: 'EEE Lab',     location: 'Block C, Rm 104', status: 'Maintenance', purchaseDate: '2020-07-18', value: 38000,  bookValue: 15000, vendor: 'Fluke Networks India',      tag: 'SCET-LA-2002', condition: 'Fair'      },
  { id: 'AS006', name: 'Universal Testing Machine (UTM)',   cat: 'Lab Instruments', dept: 'MECH Lab',    location: 'Block D, Rm 001', status: 'Active',      purchaseDate: '2019-09-05', value: 485000, bookValue: 194000, vendor: 'Blue Star Limited',        tag: 'SCET-LA-2003', condition: 'Good'      },
  { id: 'AS007', name: 'CNC Lathe Machine',                 cat: 'Lab Instruments', dept: 'MECH Lab',    location: 'Block D, Rm 002', status: 'Active',      purchaseDate: '2020-02-14', value: 720000, bookValue: 360000, vendor: 'Ace Designers Ltd',        tag: 'SCET-LA-2004', condition: 'Good'      },
  { id: 'AS008', name: 'Autoclave 25L Capacity',            cat: 'Lab Instruments', dept: 'Civil Lab',   location: 'Block E, Rm 101', status: 'Active',      purchaseDate: '2022-01-08', value: 95000,  bookValue: 62000, vendor: 'Tarsons Products',          tag: 'SCET-LA-2005', condition: 'Good'      },
  { id: 'AS009', name: 'Lecture Hall Chair Set (50)',        cat: 'Furniture',       dept: 'Admin Block', location: 'LH-1',           status: 'Active',      purchaseDate: '2021-05-20', value: 75000,  bookValue: 45000, vendor: 'Godrej Interio',            tag: 'SCET-FU-3001', condition: 'Good'      },
  { id: 'AS010', name: 'Faculty Workstation Desk',          cat: 'Furniture',       dept: 'CSE Dept',    location: 'Block A, Rm 210', status: 'Active',      purchaseDate: '2023-01-15', value: 18000,  bookValue: 14400, vendor: 'Featherlite Office Furn',   tag: 'SCET-FU-3002', condition: 'Good'      },
  { id: 'AS011', name: 'Schneider Electric 60 KVA UPS',     cat: 'Electrical',      dept: 'Server Room', location: 'Block A, Rm B01', status: 'Active',      purchaseDate: '2022-09-30', value: 380000, bookValue: 228000, vendor: 'Schneider Electric India',  tag: 'SCET-EL-4001', condition: 'Good'      },
  { id: 'AS012', name: 'Voltas 2T Split AC',                cat: 'Electrical',      dept: 'CSE Lab 2',   location: 'Block A, Rm 102', status: 'Maintenance', purchaseDate: '2021-04-12', value: 62000,  bookValue: 24800, vendor: 'Voltas Ltd',                tag: 'SCET-EL-4002', condition: 'Fair'      },
  { id: 'AS013', name: 'Kirloskar 75 KVA DG Set',           cat: 'Electrical',      dept: 'Campus',      location: 'Power House',     status: 'Active',      purchaseDate: '2020-06-25', value: 850000, bookValue: 340000, vendor: 'Kirloskar Electric Co',    tag: 'SCET-EL-4003', condition: 'Good'      },
  { id: 'AS014', name: 'Hikvision IP Camera 4MP',           cat: 'CCTV & Security', dept: 'Security',    location: 'Campus-wide',     status: 'Active',      purchaseDate: '2023-03-10', value: 12000,  bookValue:  9600, vendor: 'Hikvision India Pvt Ltd',  tag: 'SCET-CC-5001', condition: 'Good'      },
  { id: 'AS015', name: 'Epson EB-X51 Projector',            cat: 'IT Equipment',    dept: 'Seminar Hall',location: 'Admin Block, SH1', status: 'Active',      purchaseDate: '2022-07-08', value: 48000,  bookValue: 28800, vendor: 'Epson India Pvt Ltd',       tag: 'SCET-IT-1004', condition: 'Good'      },
  { id: 'AS016', name: 'Tata Ace EV (Campus Vehicle)',      cat: 'Vehicles',        dept: 'Admin',       location: 'Vehicle Shed',    status: 'Active',      purchaseDate: '2023-11-20', value: 450000, bookValue: 382500, vendor: 'Tata Motors Ltd',          tag: 'SCET-VH-7001', condition: 'Good'      },
  { id: 'AS017', name: 'Treadmill TechnoGym Run 700',       cat: 'Sports & Gym',    dept: 'Sports',      location: 'Gym Block',       status: 'Active',      purchaseDate: '2022-08-14', value: 95000,  bookValue: 57000, vendor: 'TechnoGym India',           tag: 'SCET-SP-6001', condition: 'Good'      },
  { id: 'AS018', name: 'Compaq Presario (Obsolete)',        cat: 'IT Equipment',    dept: 'Store',       location: 'Storage-02',      status: 'Disposed',    purchaseDate: '2015-06-01', value: 32000,  bookValue:      0, vendor: 'HP India',                  tag: 'SCET-IT-0001', condition: 'Obsolete'  },
  { id: 'AS019', name: 'Raspberry Pi 4 Kit (10 units)',     cat: 'IT Equipment',    dept: 'IoT Lab',     location: 'Block A, Rm 203', status: 'Active',      purchaseDate: '2024-01-12', value: 55000,  bookValue: 49500, vendor: 'Robocraze',                 tag: 'SCET-IT-1005', condition: 'New'       },
  { id: 'AS020', name: 'AutoCAD Workstation PC',            cat: 'IT Equipment',    dept: 'CIVIL Lab',   location: 'Block E, Rm 201', status: 'Active',      purchaseDate: '2023-04-18', value: 110000, bookValue: 82500, vendor: 'Dell India Pvt Ltd',        tag: 'SCET-IT-1006', condition: 'Good'      },
  { id: 'AS021', name: 'MATLAB License (50 users)',         cat: 'IT Equipment',    dept: 'All Depts',   location: 'License Server',  status: 'Active',      purchaseDate: '2024-06-01', value: 480000, bookValue: 432000, vendor: 'MathWorks India',          tag: 'SCET-IT-1007', condition: 'New'       },
  { id: 'AS022', name: 'Bosch Power Drill Set',             cat: 'Lab Instruments', dept: 'Workshop',    location: 'Block D, Workshop',status: 'Active',      purchaseDate: '2022-03-05', value: 28000,  bookValue: 16800, vendor: 'Bosch India Ltd',           tag: 'SCET-LA-2006', condition: 'Good'      },
  { id: 'AS023', name: 'Library Bookshelf Set (20)',        cat: 'Furniture',       dept: 'Library',     location: 'Library Block',   status: 'Active',      purchaseDate: '2021-08-12', value: 180000, bookValue: 108000, vendor: 'Godrej Interio',           tag: 'SCET-FU-3003', condition: 'Good'      },
  { id: 'AS024', name: 'HP Color LaserJet Pro M454',        cat: 'IT Equipment',    dept: 'Admin',       location: 'Admin Block, Rm 3',status: 'Active',      purchaseDate: '2023-09-01', value: 38000,  bookValue: 28500, vendor: 'HP India Sales Pvt Ltd',    tag: 'SCET-IT-1008', condition: 'Good'      },
  { id: 'AS025', name: 'Samsung 85" Interactive Panel',     cat: 'IT Equipment',    dept: 'CSE Dept',    location: 'Block A, Rm 208', status: 'Active',      purchaseDate: '2024-02-10', value: 320000, bookValue: 288000, vendor: 'Samsung India',            tag: 'SCET-IT-1009', condition: 'New'       },
]

export const DEPT_ASSET_SUMMARY = [
  { dept: 'CSE',         count: 824, value: 52400000, bookValue: 34200000 },
  { dept: 'ECE',         count: 612, value: 38600000, bookValue: 22100000 },
  { dept: 'EEE',         count: 484, value: 24800000, bookValue: 14200000 },
  { dept: 'MECH',        count: 542, value: 32100000, bookValue: 18400000 },
  { dept: 'CIVIL',       count: 348, value: 16400000, bookValue:  9200000 },
  { dept: 'IT',          count: 412, value: 18900000, bookValue: 11400000 },
  { dept: 'AIDS/MECT',   count: 286, value: 12600000, bookValue:  7800000 },
  { dept: 'Library',     count: 228, value:  6800000, bookValue:  4200000 },
  { dept: 'Admin',       count: 384, value:  9400000, bookValue:  6100000 },
  { dept: 'Sports/Gym',  count: 184, value:  4200000, bookValue:  2900000 },
  { dept: 'Common/Infra',count: 516, value: 11800000, bookValue:  7800000 },
]

export const PROCUREMENT_REQUESTS = [
  { id: 'PR001', item: 'Dell Vostro 3520 Laptops × 20',     cat: 'IT Equipment',    dept: 'CSE',   estimatedCost: 1200000, requestedBy: 'HOD-CSE Dr. A. Kannan',     status: 'Approved',  priority: 'High',   raisedOn: '2025-06-01' },
  { id: 'PR002', item: 'Oscilloscopes × 5 (100 MHz)',       cat: 'Lab Instruments', dept: 'ECE',   estimatedCost:  350000, requestedBy: 'HOD-ECE Dr. M. Senthil',    status: 'Pending',   priority: 'Medium', raisedOn: '2025-06-10' },
  { id: 'PR003', item: 'UPS 10 KVA Replacement',            cat: 'Electrical',      dept: 'Admin', estimatedCost:  220000, requestedBy: 'Principal – Dr. S. Rajan',  status: 'Approved',  priority: 'High',   raisedOn: '2025-05-28' },
  { id: 'PR004', item: 'Classroom Chairs × 120',            cat: 'Furniture',       dept: 'Admin', estimatedCost:  180000, requestedBy: 'Admin Officer P. Natarajan', status: 'Quotation', priority: 'Low',    raisedOn: '2025-06-12' },
  { id: 'PR005', item: 'CCTV 4MP IP Cameras × 24',         cat: 'CCTV & Security', dept: 'Admin', estimatedCost:  288000, requestedBy: 'Security In-charge',         status: 'Pending',   priority: 'Medium', raisedOn: '2025-06-15' },
  { id: 'PR006', item: 'AutoCAD 2025 Licenses × 10',        cat: 'IT Equipment',    dept: 'CIVIL', estimatedCost:  420000, requestedBy: 'HOD-Civil Dr. N. Prakash',  status: 'Quotation', priority: 'Medium', raisedOn: '2025-06-08' },
  { id: 'PR007', item: 'UTM Load Cell Replacement Kit',     cat: 'Lab Instruments', dept: 'MECH',  estimatedCost:   85000, requestedBy: 'Lab In-charge R. Senthil',  status: 'Approved',  priority: 'High',   raisedOn: '2025-06-18' },
  { id: 'PR008', item: 'Smart Board 75" × 3',               cat: 'IT Equipment',    dept: 'MBA',   estimatedCost:  840000, requestedBy: 'HOD-MBA Dr. V. Rajasekar',  status: 'Pending',   priority: 'Medium', raisedOn: '2025-06-20' },
  { id: 'PR009', item: 'Treadmill Replacement Motor Kit',   cat: 'Sports & Gym',    dept: 'Sports',estimatedCost:   28000, requestedBy: 'Sports Director K. Balu',   status: 'Approved',  priority: 'Low',    raisedOn: '2025-06-14' },
  { id: 'PR010', item: 'Network Server Dell PowerEdge R750',cat: 'IT Equipment',    dept: 'IT',    estimatedCost: 4200000, requestedBy: 'HOD-IT Dr. S. Kalpana',     status: 'Committee', priority: 'High',   raisedOn: '2025-06-05' },
]

export const ASSET_MAINTENANCE = [
  { id: 'AM001', tag: 'SCET-EL-4002', item: 'Voltas 2T Split AC',          dept: 'CSE Lab 2',   issue: 'Cooling failure',            vendor: 'Voltas Service Centre',  cost: 8500,  status: 'In Progress', reportedOn: '2025-06-20', completedOn: null         },
  { id: 'AM002', tag: 'SCET-LA-2002', item: 'Fluke 87V Multimeter',        dept: 'EEE Lab',     issue: 'Display malfunction',        vendor: 'Fluke Networks India',   cost: 4200,  status: 'In Progress', reportedOn: '2025-06-18', completedOn: null         },
  { id: 'AM003', tag: 'SCET-IT-1001', item: 'Dell OptiPlex 7090 × 3',      dept: 'CSE Lab 1',   issue: 'PSU replacement',            vendor: 'Dell India Pvt Ltd',     cost: 12600, status: 'Completed',   reportedOn: '2025-06-10', completedOn: '2025-06-14' },
  { id: 'AM004', tag: 'SCET-EL-4001', item: 'Schneider 60 KVA UPS',        dept: 'Server Room', issue: 'Battery bank replacement',   vendor: 'Schneider Electric',     cost: 85000, status: 'Completed',   reportedOn: '2025-05-28', completedOn: '2025-06-03' },
  { id: 'AM005', tag: 'SCET-VH-7001', item: 'Tata Ace EV Campus Vehicle',  dept: 'Admin',       issue: 'Annual service + tyre',      vendor: 'Tata Motors Salem',      cost: 18500, status: 'Completed',   reportedOn: '2025-06-01', completedOn: '2025-06-04' },
  { id: 'AM006', tag: 'SCET-IT-1004', item: 'Epson EB-X51 Projector',      dept: 'Seminar Hall',issue: 'Lamp replacement',           vendor: 'Epson India Pvt Ltd',    cost: 14000, status: 'Pending',     reportedOn: '2025-06-22', completedOn: null         },
  { id: 'AM007', tag: 'SCET-LA-2003', item: 'Universal Testing Machine',   dept: 'MECH Lab',    issue: 'Hydraulic seal leakage',     vendor: 'Blue Star Limited',      cost: 32000, status: 'Completed',   reportedOn: '2025-05-15', completedOn: '2025-05-24' },
  { id: 'AM008', tag: 'SCET-CC-5001', item: 'Hikvision IP Camera × 4',     dept: 'Campus',      issue: 'NVR connectivity failure',   vendor: 'Hikvision India',        cost: 6800,  status: 'Completed',   reportedOn: '2025-06-05', completedOn: '2025-06-08' },
  { id: 'AM009', tag: 'SCET-SP-6001', item: 'TechnoGym Treadmill',         dept: 'Gym Block',   issue: 'Motor bearing replacement', vendor: 'TechnoGym India',        cost: 12000, status: 'Pending',     reportedOn: '2025-06-24', completedOn: null         },
  { id: 'AM010', tag: 'SCET-IT-1002', item: 'HP ProBook 450 G9 × 2',       dept: 'CSE Dept',    issue: 'Battery swelling',          vendor: 'HP India Sales Pvt Ltd', cost: 9400,  status: 'In Progress', reportedOn: '2025-06-21', completedOn: null         },
  { id: 'AM011', tag: 'SCET-EL-4003', item: 'Kirloskar 75 KVA DG Set',     dept: 'Power House', issue: 'Annual scheduled service',   vendor: 'Kirloskar Electric Co',  cost: 48000, status: 'Scheduled',   reportedOn: '2025-07-01', completedOn: null         },
  { id: 'AM012', tag: 'SCET-LA-2006', item: 'Bosch Power Drill Set',       dept: 'Workshop',    issue: 'Chuck & bit replacement',   vendor: 'Bosch India Ltd',        cost: 3200,  status: 'Completed',   reportedOn: '2025-06-12', completedOn: '2025-06-14' },
]

export const DISPOSAL_LOG = [
  { id: 'DL001', tag: 'SCET-IT-0001', item: 'Compaq Presario Desktops × 8',  cat: 'IT Equipment',    dept: 'Store',   purchaseYear: 2015, originalValue: 256000, scrapValue: 8000,  disposedOn: '2025-04-10', method: 'Auction',  approvedBy: 'Principal' },
  { id: 'DL002', tag: 'SCET-FU-0002', item: 'Wooden Benches × 20',           cat: 'Furniture',       dept: 'Store',   purchaseYear: 2013, originalValue: 120000, scrapValue: 6000,  disposedOn: '2025-03-22', method: 'Scrap',    approvedBy: 'Principal' },
  { id: 'DL003', tag: 'SCET-LA-0003', item: 'CRT Oscilloscope × 4',          cat: 'Lab Instruments', dept: 'ECE Lab', purchaseYear: 2012, originalValue: 180000, scrapValue: 4500,  disposedOn: '2025-05-08', method: 'E-Waste',  approvedBy: 'Principal' },
  { id: 'DL004', tag: 'SCET-IT-0004', item: 'HP LaserJet 1200 × 6',          cat: 'IT Equipment',    dept: 'Admin',   purchaseYear: 2014, originalValue: 114000, scrapValue: 3600,  disposedOn: '2025-02-14', method: 'E-Waste',  approvedBy: 'Principal' },
  { id: 'DL005', tag: 'SCET-EL-0005', item: 'Old 5 KVA UPS × 2',            cat: 'Electrical',      dept: 'Server',  purchaseYear: 2016, originalValue:  80000, scrapValue: 4800,  disposedOn: '2025-01-30', method: 'Scrap',    approvedBy: 'Principal' },
]
