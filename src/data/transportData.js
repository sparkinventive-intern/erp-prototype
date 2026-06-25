// ─────────────────────────────────────────────────────────────
// Transport Management — Salem College of Engineering and Technology
// ─────────────────────────────────────────────────────────────

export const TRANSPORT_KPI_BASE = {
  totalBuses: 42,
  activeRoutes: 28,
  studentsTransported: 2640,
  maintenanceDue: 5,
  feeCollected: 12000000,
  feePending: 1800000,
}

export const ROUTES = [
  { id: 'RT001', name: 'Tambaram Route',       distance: '28 KM', time: '70 min', stops: 18, students: 96,  busNo: 'TN44AB0001', status: 'Active', fee: 18000,
    stopList: ['Tambaram Bus Stand', 'Perungalathur', 'Vandalur Zoo', 'Urapakkam', 'Guduvanchery', 'Singaperumalkoil', 'Chengalpattu Bypass', 'College Campus'] },
  { id: 'RT002', name: 'Velachery Route',      distance: '15 KM', time: '45 min', stops: 12, students: 84,  busNo: 'TN44AB0002', status: 'Active', fee: 14000,
    stopList: ['Velachery Main Road', 'Pallikaranai', 'Medavakkam', 'Shollinganallur', 'Karapakkam', 'Perumbakkam', 'College Campus'] },
  { id: 'RT003', name: 'Chengalpattu Route',   distance: '35 KM', time: '85 min', stops: 22, students: 102, busNo: 'TN44AB0003', status: 'Active', fee: 22000,
    stopList: ['Chengalpattu Town', 'Madurantakam Bypass', 'Maraimalai Nagar', 'Potheri', 'Kelambakkam', 'College Campus'] },
  { id: 'RT004', name: 'Adyar Route',          distance: '22 KM', time: '60 min', stops: 14, students: 65,  busNo: 'TN44AB0004', status: 'Active', fee: 16000,
    stopList: ['Adyar Signal', 'Thiruvanmiyur', 'Perungudi', 'Sholinganallur', 'OMR Toll Gate', 'College Campus'] },
  { id: 'RT005', name: 'Madipakkam Route',     distance: '18 KM', time: '50 min', stops: 10, students: 78,  busNo: 'TN44AB0005', status: 'Active', fee: 15000,
    stopList: ['Madipakkam Main Road', 'Pammal Junction', 'Chrompet Signal', 'Tambaram West', 'College Campus'] },
  { id: 'RT006', name: 'Porur Route',          distance: '30 KM', time: '75 min', stops: 16, students: 88,  busNo: 'TN44AB0006', status: 'Active', fee: 20000,
    stopList: ['Porur Junction', 'Ramapuram', 'Alapakkam', 'Mugalivakkam', 'Gerugambakkam', 'College Campus'] },
  { id: 'RT007', name: 'Anna Nagar Route',     distance: '24 KM', time: '65 min', stops: 15, students: 72,  busNo: 'TN44AB0007', status: 'Active', fee: 17000,
    stopList: ['Anna Nagar Tower', 'Arumbakkam', 'Vadapalani', 'Guindy', 'Chromepet', 'College Campus'] },
  { id: 'RT008', name: 'Sholinganallur Route', distance: '12 KM', time: '35 min', stops: 8,  students: 55,  busNo: 'TN44AB0008', status: 'Active', fee: 12000,
    stopList: ['Sholinganallur Signal', 'Perungudi IT Park', 'Karapakkam Junction', 'College Campus'] },
]

export const BUSES = [
  { no: 'TN44AB0001', model: 'Ashok Leyland Viking 54',  year: 2019, capacity: 54, driver: 'Kumar R.',       route: 'RT001', status: 'Active',      lastService: '2026-03-10', nextService: '2026-09-10', insurance: '2026-12-31', kmTotal: 148000 },
  { no: 'TN44AB0002', model: 'Tata Starbus Ultra 54',    year: 2020, capacity: 54, driver: 'Rajendran S.',   route: 'RT002', status: 'Active',      lastService: '2026-04-15', nextService: '2026-10-15', insurance: '2027-01-14', kmTotal: 112000 },
  { no: 'TN44AB0003', model: 'Ashok Leyland Viking 54',  year: 2018, capacity: 54, driver: 'Murugesan P.',   route: 'RT003', status: 'Active',      lastService: '2026-02-20', nextService: '2026-08-20', insurance: '2026-08-15', kmTotal: 198000 },
  { no: 'TN44AB0004', model: 'Force Traveller 26-Seater',year: 2021, capacity: 26, driver: 'Selvam A.',      route: 'RT004', status: 'Active',      lastService: '2026-05-01', nextService: '2026-11-01', insurance: '2027-02-28', kmTotal: 76000  },
  { no: 'TN44AB0005', model: 'Tata Starbus Ultra 54',    year: 2022, capacity: 54, driver: 'Senthil M.',     route: 'RT005', status: 'Active',      lastService: '2026-06-01', nextService: '2026-12-01', insurance: '2027-05-31', kmTotal: 48000  },
  { no: 'TN44AB0006', model: 'Ashok Leyland Lynx 45',    year: 2019, capacity: 45, driver: 'Anand K.',       route: 'RT006', status: 'Active',      lastService: '2026-03-25', nextService: '2026-09-25', insurance: '2026-11-30', kmTotal: 136000 },
  { no: 'TN44AB0007', model: 'Tata Starbus Ultra 54',    year: 2017, capacity: 54, driver: 'Ganesan V.',     route: 'RT007', status: 'Maintenance', lastService: '2026-01-10', nextService: '2026-07-10', insurance: '2026-10-31', kmTotal: 228000 },
  { no: 'TN44AB0008', model: 'Force Traveller 26-Seater',year: 2023, capacity: 26, driver: 'Ramesh T.',      route: 'RT008', status: 'Active',      lastService: '2026-05-20', nextService: '2026-11-20', insurance: '2028-01-31', kmTotal: 24000  },
]

export const DRIVERS = [
  { id: 'DRV001', name: 'Kumar R.',       license: 'TN44 20140025892', exp: '12 years', contact: '98765 43210', bus: 'TN44AB0001', route: 'Tambaram',       status: 'Active', address: 'Tambaram, Chennai' },
  { id: 'DRV002', name: 'Rajendran S.',   license: 'TN44 20160031245', exp: '8 years',  contact: '87654 32109', bus: 'TN44AB0002', route: 'Velachery',      status: 'Active', address: 'Velachery, Chennai' },
  { id: 'DRV003', name: 'Murugesan P.',   license: 'TN44 20100018763', exp: '15 years', contact: '76543 21098', bus: 'TN44AB0003', route: 'Chengalpattu',   status: 'Active', address: 'Tambaram, Chennai' },
  { id: 'DRV004', name: 'Selvam A.',      license: 'TN44 20190045621', exp: '6 years',  contact: '95432 10987', bus: 'TN44AB0004', route: 'Adyar',          status: 'Active', address: 'Adyar, Chennai' },
  { id: 'DRV005', name: 'Senthil M.',     license: 'TN44 20210052344', exp: '4 years',  contact: '94321 09876', bus: 'TN44AB0005', route: 'Madipakkam',     status: 'Active', address: 'Chromepet, Chennai' },
  { id: 'DRV006', name: 'Anand K.',       license: 'TN44 20150028934', exp: '10 years', contact: '93210 98765', bus: 'TN44AB0006', route: 'Porur',          status: 'Active', address: 'Porur, Chennai' },
  { id: 'DRV007', name: 'Ganesan V.',     license: 'TN44 20080012456', exp: '18 years', contact: '92109 87654', bus: 'TN44AB0007', route: 'Anna Nagar',     status: 'Leave',  address: 'Anna Nagar, Chennai' },
  { id: 'DRV008', name: 'Ramesh T.',      license: 'TN44 20220058912', exp: '3 years',  contact: '91098 76543', bus: 'TN44AB0008', route: 'Sholinganallur', status: 'Active', address: 'Sholinganallur, Chennai' },
]

export const STUDENT_ALLOCATION = [
  { reg: 'CS21001', name: 'Arjun Kumar',          dept: 'CSE',   route: 'RT001', bus: 'TN44AB0001', stop: 'Tambaram Bus Stand',    fee: 18000, paid: 18000, status: 'Paid'    },
  { reg: 'CS21002', name: 'Priya Rajan',           dept: 'CSE',   route: 'RT002', bus: 'TN44AB0002', stop: 'Velachery Main Road',   fee: 14000, paid: 14000, status: 'Paid'    },
  { reg: 'CS21003', name: 'Rahul Singh',            dept: 'CSE',   route: 'RT003', bus: 'TN44AB0003', stop: 'Chengalpattu Town',     fee: 22000, paid: 0,     status: 'Pending' },
  { reg: 'CS21004', name: 'Ananya Menon',           dept: 'CSE',   route: 'RT004', bus: 'TN44AB0004', stop: 'Adyar Signal',          fee: 16000, paid: 16000, status: 'Paid'    },
  { reg: 'CS21005', name: 'Vikram Nair',            dept: 'CSE',   route: 'RT001', bus: 'TN44AB0001', stop: 'Perungalathur',         fee: 18000, paid: 9000,  status: 'Partial' },
  { reg: 'EC21001', name: 'Muthu Krishnan',         dept: 'ECE',   route: 'RT007', bus: 'TN44AB0007', stop: 'Anna Nagar Tower',      fee: 17000, paid: 17000, status: 'Paid'    },
  { reg: 'AI21001', name: 'Kavya Subramanian',      dept: 'AI&DS', route: 'RT002', bus: 'TN44AB0002', stop: 'Pallikaranai',          fee: 14000, paid: 14000, status: 'Paid'    },
  { reg: 'ME21001', name: 'Dharani Raj',            dept: 'MECH',  route: 'RT005', bus: 'TN44AB0005', stop: 'Madipakkam Main Road',  fee: 15000, paid: 0,     status: 'Pending' },
  { reg: 'EE21001', name: 'Sathish Prabhu',         dept: 'EEE',   route: 'RT006', bus: 'TN44AB0006', stop: 'Porur Junction',        fee: 20000, paid: 20000, status: 'Paid'    },
  { reg: 'IT21001', name: 'Lavanya Mohan',          dept: 'IT',    route: 'RT002', bus: 'TN44AB0002', stop: 'Medavakkam',            fee: 14000, paid: 14000, status: 'Paid'    },
  { reg: 'CE21001', name: 'Boopathi Rajan',         dept: 'CIVIL', route: 'RT001', bus: 'TN44AB0001', stop: 'Vandalur Zoo',          fee: 18000, paid: 9000,  status: 'Partial' },
  { reg: 'AI21002', name: 'Divya Bharathi',         dept: 'AI&DS', route: 'RT008', bus: 'TN44AB0008', stop: 'Sholinganallur Signal', fee: 12000, paid: 12000, status: 'Paid'    },
  { reg: 'ME21003', name: 'Senthil Nathan',         dept: 'MECH',  route: 'RT003', bus: 'TN44AB0003', stop: 'Maraimalai Nagar',      fee: 22000, paid: 0,     status: 'Pending' },
  { reg: 'CS22001', name: 'Renuka Devi',            dept: 'CSE',   route: 'RT005', bus: 'TN44AB0005', stop: 'Chrompet Signal',       fee: 15000, paid: 15000, status: 'Paid'    },
  { reg: 'EC22001', name: 'Kiran Shankar',          dept: 'ECE',   route: 'RT004', bus: 'TN44AB0004', stop: 'Thiruvanmiyur',         fee: 16000, paid: 16000, status: 'Paid'    },
  { reg: 'IT22001', name: 'Pavithra Sundarajan',    dept: 'IT',    route: 'RT007', bus: 'TN44AB0007', stop: 'Vadapalani',            fee: 17000, paid: 8500,  status: 'Partial' },
  { reg: 'AI22001', name: 'Abishek Raja',           dept: 'AI&DS', route: 'RT001', bus: 'TN44AB0001', stop: 'Guduvanchery',          fee: 18000, paid: 18000, status: 'Paid'    },
  { reg: 'CS23001', name: 'Deepika Murugan',        dept: 'CSE',   route: 'RT006', bus: 'TN44AB0006', stop: 'Ramapuram',             fee: 20000, paid: 0,     status: 'Pending' },
  { reg: 'ME22001', name: 'Kalidasan S.',           dept: 'MECH',  route: 'RT003', bus: 'TN44AB0003', stop: 'Kelambakkam',           fee: 22000, paid: 22000, status: 'Paid'    },
  { reg: 'EE22001', name: 'Tamilarasi V.',          dept: 'EEE',   route: 'RT008', bus: 'TN44AB0008', stop: 'Perungudi IT Park',     fee: 12000, paid: 12000, status: 'Paid'    },
  { reg: 'CS21007', name: 'Manikandan P.',          dept: 'CSE',   route: 'RT002', bus: 'TN44AB0002', stop: 'Karapakkam',            fee: 14000, paid: 7000,  status: 'Partial' },
  { reg: 'CE22001', name: 'Saravanan M.',           dept: 'CIVIL', route: 'RT007', bus: 'TN44AB0007', stop: 'Arumbakkam',            fee: 17000, paid: 17000, status: 'Paid'    },
  { reg: 'IT23001', name: 'Bhavani K.',             dept: 'IT',    route: 'RT005', bus: 'TN44AB0005', stop: 'Pammal Junction',       fee: 15000, paid: 15000, status: 'Paid'    },
  { reg: 'EC23001', name: 'Suresh Babu N.',         dept: 'ECE',   route: 'RT006', bus: 'TN44AB0006', stop: 'Gerugambakkam',         fee: 20000, paid: 0,     status: 'Pending' },
  { reg: 'ME23001', name: 'Vignesh Kumar R.',       dept: 'MECH',  route: 'RT004', bus: 'TN44AB0004', stop: 'OMR Toll Gate',         fee: 16000, paid: 16000, status: 'Paid'    },
]

export const MAINTENANCE_RECORDS = [
  { id: 'MNT001', bus: 'TN44AB0001', type: 'Routine Service',       date: '2026-03-10', cost: 8500,  vendor: 'Ashok Leyland Service Centre', nextDue: '2026-09-10', status: 'Done'        },
  { id: 'MNT002', bus: 'TN44AB0002', type: 'Tyre Replacement (×4)', date: '2026-04-15', cost: 22000, vendor: 'MRF Tyres Salem',              nextDue: '2028-04-15', status: 'Done'        },
  { id: 'MNT003', bus: 'TN44AB0003', type: 'Engine Overhaul',        date: '2026-02-20', cost: 85000, vendor: 'Ashok Leyland Service Centre', nextDue: '2028-02-20', status: 'Done'        },
  { id: 'MNT004', bus: 'TN44AB0007', type: 'Brake System Repair',   date: '2026-07-01', cost: 14000, vendor: 'Star Auto Works, Guindy',      nextDue: '2027-01-01', status: 'In Progress' },
  { id: 'MNT005', bus: 'TN44AB0006', type: 'AC Servicing',          date: '2026-05-05', cost: 6500,  vendor: 'Cool Tech Auto Services',      nextDue: '2026-11-05', status: 'Done'        },
  { id: 'MNT006', bus: 'TN44AB0004', type: 'Routine Service',       date: '2026-06-01', cost: 7000,  vendor: 'Tata Motors Authorised Service',nextDue: '2026-12-01', status: 'Done'        },
  { id: 'MNT007', bus: 'TN44AB0005', type: 'Fuel Filter Change',    date: '2026-06-15', cost: 2500,  vendor: 'Star Auto Works, Guindy',      nextDue: '2026-12-15', status: 'Done'        },
  { id: 'MNT008', bus: 'TN44AB0008', type: 'Routine Service',       date: '2026-05-20', cost: 5500,  vendor: 'Force Motors Service Centre',  nextDue: '2026-11-20', status: 'Done'        },
  { id: 'MNT009', bus: 'TN44AB0001', type: 'Battery Replacement',   date: '2026-01-18', cost: 9500,  vendor: 'Amaron Battery, Tambaram',     nextDue: '2029-01-18', status: 'Done'        },
  { id: 'MNT010', bus: 'TN44AB0003', type: 'AC Servicing',          date: '2025-11-20', cost: 6200,  vendor: 'Cool Tech Auto Services',      nextDue: '2026-05-20', status: 'Overdue'     },
  { id: 'MNT011', bus: 'TN44AB0002', type: 'Body Painting & Denting',date: '2026-03-05',cost: 18000, vendor: 'Perfect Auto Body Works',      nextDue: null,          status: 'Done'        },
  { id: 'MNT012', bus: 'TN44AB0006', type: 'Tyre Replacement (×2)', date: '2026-06-20', cost: 11000, vendor: 'Apollo Tyres Dealer',          nextDue: '2028-06-20', status: 'Done'        },
]

export const MONTHLY_FEE_TREND = [
  { month: 'Jul 24', collected: 780000,  pending: 320000 },
  { month: 'Aug 24', collected: 920000,  pending: 280000 },
  { month: 'Sep 24', collected: 860000,  pending: 260000 },
  { month: 'Oct 24', collected: 980000,  pending: 220000 },
  { month: 'Nov 24', collected: 1040000, pending: 200000 },
  { month: 'Dec 24', collected: 1100000, pending: 190000 },
  { month: 'Jan 25', collected: 980000,  pending: 220000 },
  { month: 'Feb 25', collected: 1040000, pending: 190000 },
  { month: 'Mar 25', collected: 1180000, pending: 160000 },
  { month: 'Apr 25', collected: 1200000, pending: 180000 },
  { month: 'May 25', collected: 1150000, pending: 200000 },
  { month: 'Jun 25', collected: 1200000, pending: 180000 },
]

export const ROUTE_UTILIZATION = [
  { route: 'Tambaram',       capacity: 54, occupied: 48, pct: 89 },
  { route: 'Velachery',      capacity: 54, occupied: 42, pct: 78 },
  { route: 'Chengalpattu',   capacity: 54, occupied: 51, pct: 94 },
  { route: 'Adyar',          capacity: 26, occupied: 22, pct: 85 },
  { route: 'Madipakkam',     capacity: 54, occupied: 39, pct: 72 },
  { route: 'Porur',          capacity: 45, occupied: 44, pct: 98 },
  { route: 'Anna Nagar',     capacity: 54, occupied: 36, pct: 67 },
  { route: 'Sholinganallur', capacity: 26, occupied: 20, pct: 77 },
]

export const GPS_POSITIONS = [
  { bus: 'TN44AB0001', lat: 12.9260, lng: 80.1158, speed: 48, status: 'En Route',  lastUpdate: '2 min ago', route: 'Tambaram',       nextStop: 'Vandalur Zoo'        },
  { bus: 'TN44AB0002', lat: 12.9675, lng: 80.2205, speed: 34, status: 'En Route',  lastUpdate: '1 min ago', route: 'Velachery',      nextStop: 'Medavakkam'          },
  { bus: 'TN44AB0003', lat: 12.6928, lng: 80.0023, speed: 62, status: 'En Route',  lastUpdate: '3 min ago', route: 'Chengalpattu',   nextStop: 'Maraimalai Nagar'    },
  { bus: 'TN44AB0004', lat: 13.0012, lng: 80.2565, speed: 0,  status: 'At Stop',   lastUpdate: 'Just now',  route: 'Adyar',          nextStop: 'Thiruvanmiyur'       },
  { bus: 'TN44AB0005', lat: 12.9638, lng: 80.1960, speed: 41, status: 'En Route',  lastUpdate: '2 min ago', route: 'Madipakkam',     nextStop: 'Chrompet Signal'     },
  { bus: 'TN44AB0006', lat: 13.0338, lng: 80.1575, speed: 55, status: 'En Route',  lastUpdate: '4 min ago', route: 'Porur',          nextStop: 'Mugalivakkam'        },
  { bus: 'TN44AB0007', lat: 13.0878, lng: 80.2097, speed: 0,  status: 'Workshop',  lastUpdate: '45 min ago',route: 'Anna Nagar',     nextStop: '—'                   },
  { bus: 'TN44AB0008', lat: 12.9004, lng: 80.2279, speed: 38, status: 'En Route',  lastUpdate: '1 min ago', route: 'Sholinganallur', nextStop: 'Perungudi IT Park'   },
]
