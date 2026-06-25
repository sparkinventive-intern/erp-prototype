// ─────────────────────────────────────────────────────────────
// Library Management — Salem College of Engineering and Technology
// ─────────────────────────────────────────────────────────────

export const LIBRARY_KPI_BASE = {
  totalBooks: 48520,
  issued: 6842,
  available: 41678,
  overdue: 326,
  members: 5412,
  fineCollected: 48200,
}

export const BOOKS = [
  // Computer Science
  { id: 'BK001', title: 'Database System Concepts',                   author: 'Silberschatz, Korth & Sudarshan', isbn: '978-0-07-352332-3', cat: 'Computer Science', dept: 'CSE',   copies: 12, available: 4,  year: 2019, publisher: 'McGraw Hill'       },
  { id: 'BK002', title: 'Operating System Concepts',                   author: 'Abraham Silberschatz',            isbn: '978-1-119-32091-3', cat: 'Computer Science', dept: 'CSE',   copies: 10, available: 2,  year: 2018, publisher: 'Wiley'             },
  { id: 'BK003', title: 'Introduction to Algorithms',                  author: 'Cormen, Leiserson, Rivest',       isbn: '978-0-262-04630-5', cat: 'Computer Science', dept: 'CSE',   copies: 15, available: 7,  year: 2022, publisher: 'MIT Press'         },
  { id: 'BK004', title: 'Computer Networks',                           author: 'Andrew S. Tanenbaum',             isbn: '978-0-13-212695-3', cat: 'Computer Science', dept: 'CSE',   copies: 8,  available: 3,  year: 2021, publisher: 'Pearson'           },
  { id: 'BK005', title: 'Compiler Design',                             author: 'Alfred V. Aho, Monica Lam',       isbn: '978-0-13-136067-4', cat: 'Computer Science', dept: 'CSE',   copies: 10, available: 5,  year: 2006, publisher: 'Pearson'           },
  { id: 'BK006', title: 'Software Engineering',                        author: 'Ian Sommerville',                 isbn: '978-0-13-705346-9', cat: 'Computer Science', dept: 'CSE',   copies: 8,  available: 4,  year: 2015, publisher: 'Pearson'           },
  { id: 'BK007', title: 'Python Crash Course',                         author: 'Eric Matthes',                    isbn: '978-1-59327-928-8', cat: 'Computer Science', dept: 'CSE',   copies: 6,  available: 3,  year: 2023, publisher: 'No Starch Press'  },
  { id: 'BK008', title: 'Clean Code',                                  author: 'Robert C. Martin',                isbn: '978-0-13-235088-4', cat: 'Computer Science', dept: 'CSE',   copies: 5,  available: 2,  year: 2008, publisher: 'Pearson'           },
  { id: 'BK009', title: 'Discrete Mathematics & Its Applications',     author: 'Kenneth H. Rosen',                isbn: '978-0-07-338309-5', cat: 'Mathematics',      dept: 'CSE',   copies: 10, available: 6,  year: 2019, publisher: 'McGraw Hill'       },
  { id: 'BK010', title: 'Design Patterns: Elements of Reusable OO',   author: 'Gang of Four (GoF)',              isbn: '978-0-20-163361-5', cat: 'Computer Science', dept: 'CSE',   copies: 4,  available: 2,  year: 1994, publisher: 'Addison-Wesley'   },

  // AI & Data Science
  { id: 'BK011', title: 'Artificial Intelligence: A Modern Approach', author: 'Russell & Norvig',                isbn: '978-0-13-604259-4', cat: 'AI & ML',          dept: 'AI&DS', copies: 6,  available: 1,  year: 2020, publisher: 'Pearson'           },
  { id: 'BK012', title: 'Deep Learning',                               author: 'Ian Goodfellow et al.',           isbn: '978-0-262-03561-3', cat: 'AI & ML',          dept: 'AI&DS', copies: 4,  available: 2,  year: 2016, publisher: 'MIT Press'         },
  { id: 'BK013', title: 'Pattern Recognition and Machine Learning',    author: 'Christopher Bishop',              isbn: '978-0-38-731073-2', cat: 'AI & ML',          dept: 'AI&DS', copies: 4,  available: 1,  year: 2006, publisher: 'Springer'          },
  { id: 'BK014', title: 'Python for Data Analysis',                    author: 'Wes McKinney',                    isbn: '978-1-09-181063-6', cat: 'AI & ML',          dept: 'AI&DS', copies: 5,  available: 3,  year: 2022, publisher: 'O\'Reilly'         },
  { id: 'BK015', title: 'Hands-On Machine Learning (Scikit-Learn)',    author: 'Aurélien Géron',                  isbn: '978-1-09-812597-4', cat: 'AI & ML',          dept: 'AI&DS', copies: 4,  available: 2,  year: 2022, publisher: 'O\'Reilly'         },

  // Electronics
  { id: 'BK016', title: 'Electronic Devices and Circuits',             author: 'David A. Bell',                   isbn: '978-0-19-808517-8', cat: 'Electronics',      dept: 'ECE',   copies: 12, available: 6,  year: 2017, publisher: 'Oxford'           },
  { id: 'BK017', title: 'Signals and Systems',                         author: 'Oppenheim & Willsky',             isbn: '978-0-13-814757-0', cat: 'Electronics',      dept: 'ECE',   copies: 10, available: 5,  year: 2015, publisher: 'Pearson'           },
  { id: 'BK018', title: 'Digital Communications',                      author: 'John G. Proakis',                 isbn: '978-0-07-295716-7', cat: 'Electronics',      dept: 'ECE',   copies: 8,  available: 4,  year: 2007, publisher: 'McGraw Hill'       },
  { id: 'BK019', title: 'VLSI Design',                                 author: 'Weste & Harris',                  isbn: '978-0-13-224389-6', cat: 'Electronics',      dept: 'ECE',   copies: 6,  available: 3,  year: 2010, publisher: 'Pearson'           },
  { id: 'BK020', title: 'Microcontrollers and Embedded Systems',       author: 'Muhammad Ali Mazidi',             isbn: '978-0-13-605008-7', cat: 'Electronics',      dept: 'ECE',   copies: 8,  available: 4,  year: 2011, publisher: 'Pearson'           },

  // Electrical
  { id: 'BK021', title: 'Power System Analysis',                       author: 'Nagrath & Kothari',               isbn: '978-0-07-053673-7', cat: 'Electrical',       dept: 'EEE',   copies: 8,  available: 5,  year: 2017, publisher: 'Tata McGraw Hill' },
  { id: 'BK022', title: 'Electrical Machines',                         author: 'I.J. Nagrath & D.P. Kothari',    isbn: '978-0-07-460436-5', cat: 'Electrical',       dept: 'EEE',   copies: 10, available: 4,  year: 2010, publisher: 'Tata McGraw Hill' },
  { id: 'BK023', title: 'Fundamentals of Electric Circuits',           author: 'Alexander & Sadiku',              isbn: '978-0-07-338057-5', cat: 'Electrical',       dept: 'EEE',   copies: 8,  available: 3,  year: 2016, publisher: 'McGraw Hill'       },

  // Mechanical
  { id: 'BK024', title: 'Thermodynamics: An Engineering Approach',    author: 'Cengel & Boles',                  isbn: '978-0-07-352921-9', cat: 'Mechanical',       dept: 'MECH',  copies: 10, available: 4,  year: 2018, publisher: 'McGraw Hill'       },
  { id: 'BK025', title: 'Theory of Machines',                          author: 'S.S. Rattan',                     isbn: '978-93-5267-265-3', cat: 'Mechanical',       dept: 'MECH',  copies: 8,  available: 3,  year: 2019, publisher: 'S. Chand'         },
  { id: 'BK026', title: 'Fluid Mechanics and Hydraulic Machines',     author: 'R.K. Bansal',                     isbn: '978-81-317-0166-5', cat: 'Mechanical',       dept: 'MECH',  copies: 8,  available: 4,  year: 2017, publisher: 'Laxmi Publications'},
  { id: 'BK027', title: 'Manufacturing Science',                       author: 'Ghosh & Mallik',                  isbn: '978-81-7319-195-9', cat: 'Mechanical',       dept: 'MECH',  copies: 6,  available: 2,  year: 2010, publisher: 'Affiliated East'  },

  // Mathematics & Science
  { id: 'BK028', title: 'Engineering Mathematics Vol. 1',              author: 'H.K. Dass',                       isbn: '978-81-219-0265-2', cat: 'Mathematics',      dept: 'All',   copies: 20, available: 12, year: 2020, publisher: 'S. Chand'         },
  { id: 'BK029', title: 'Advanced Engineering Mathematics',            author: 'Erwin Kreyszig',                  isbn: '978-1-11-851765-2', cat: 'Mathematics',      dept: 'All',   copies: 10, available: 6,  year: 2011, publisher: 'Wiley'            },
  { id: 'BK030', title: 'Engineering Physics',                         author: 'Gaur & Gupta',                    isbn: '978-81-7031-453-4', cat: 'Physics',          dept: 'All',   copies: 18, available: 9,  year: 2019, publisher: 'Dhanpat Rai'      },
  { id: 'BK031', title: 'Engineering Chemistry',                       author: 'P.C. Jain & M. Jain',             isbn: '978-81-219-0456-4', cat: 'Chemistry',        dept: 'All',   copies: 16, available: 8,  year: 2020, publisher: 'Dhanpat Rai'      },

  // General / Management
  { id: 'BK032', title: 'Wings of Fire',                               author: 'A.P.J. Abdul Kalam',              isbn: '978-81-7371-146-6', cat: 'Biography',        dept: 'Gen',   copies: 5,  available: 3,  year: 2015, publisher: 'Universities Press'},
  { id: 'BK033', title: 'The Lean Startup',                            author: 'Eric Ries',                       isbn: '978-0-30-788789-4', cat: 'Management',       dept: 'MBA',   copies: 4,  available: 2,  year: 2011, publisher: 'Crown Business'   },
  { id: 'BK034', title: 'Principles of Marketing',                     author: 'Philip Kotler & Armstrong',       isbn: '978-0-13-449251-3', cat: 'Management',       dept: 'MBA',   copies: 6,  available: 4,  year: 2020, publisher: 'Pearson'          },
  { id: 'BK035', title: 'Financial Management',                        author: 'I.M. Pandey',                     isbn: '978-93-86395-04-0', cat: 'Finance',          dept: 'MBA',   copies: 6,  available: 3,  year: 2021, publisher: 'Vikas Publishing' },
]

export const MEMBERS = [
  // Students
  { id: 'MEM001', name: 'Arjun Kumar',          reg: 'CS21001', type: 'Student', dept: 'CSE',   booksIssued: 2, fine: 0,  status: 'Active',    expiry: '2026-05-31' },
  { id: 'MEM002', name: 'Priya Rajan',           reg: 'CS21002', type: 'Student', dept: 'CSE',   booksIssued: 1, fine: 20, status: 'Active',    expiry: '2026-05-31' },
  { id: 'MEM003', name: 'Vikram Nair',           reg: 'CS21005', type: 'Student', dept: 'CSE',   booksIssued: 3, fine: 0,  status: 'Active',    expiry: '2026-05-31' },
  { id: 'MEM004', name: 'Ananya Menon',          reg: 'CS21004', type: 'Student', dept: 'CSE',   booksIssued: 0, fine: 40, status: 'Suspended', expiry: '2026-05-31' },
  { id: 'MEM005', name: 'Kavya Subramanian',     reg: 'AI21001', type: 'Student', dept: 'AI&DS', booksIssued: 2, fine: 0,  status: 'Active',    expiry: '2026-05-31' },
  { id: 'MEM006', name: 'Muthu Krishnan',        reg: 'EC21001', type: 'Student', dept: 'ECE',   booksIssued: 1, fine: 0,  status: 'Active',    expiry: '2026-05-31' },
  { id: 'MEM007', name: 'Dharani Raj',           reg: 'ME21001', type: 'Student', dept: 'MECH',  booksIssued: 1, fine: 60, status: 'Active',    expiry: '2026-05-31' },
  { id: 'MEM008', name: 'Nithya Prakash',        reg: 'CS21006', type: 'Student', dept: 'CSE',   booksIssued: 2, fine: 0,  status: 'Active',    expiry: '2026-05-31' },
  { id: 'MEM009', name: 'Sathish Prabhu',        reg: 'EE21002', type: 'Student', dept: 'EEE',   booksIssued: 1, fine: 0,  status: 'Active',    expiry: '2026-05-31' },
  { id: 'MEM010', name: 'Lavanya Mohan',         reg: 'IT21001', type: 'Student', dept: 'IT',    booksIssued: 2, fine: 0,  status: 'Active',    expiry: '2026-05-31' },
  { id: 'MEM011', name: 'Boopathi Rajan',        reg: 'CE21001', type: 'Student', dept: 'CIVIL', booksIssued: 0, fine: 0,  status: 'Active',    expiry: '2026-05-31' },
  { id: 'MEM012', name: 'Divya Bharathi',        reg: 'AI21002', type: 'Student', dept: 'AI&DS', booksIssued: 3, fine: 0,  status: 'Active',    expiry: '2026-05-31' },
  { id: 'MEM013', name: 'Senthil Nathan',        reg: 'ME21003', type: 'Student', dept: 'MECH',  booksIssued: 1, fine: 30, status: 'Active',    expiry: '2026-05-31' },
  { id: 'MEM014', name: 'Renuka Devi',           reg: 'CS22001', type: 'Student', dept: 'CSE',   booksIssued: 2, fine: 0,  status: 'Active',    expiry: '2027-05-31' },
  { id: 'MEM015', name: 'Kiran Shankar',         reg: 'EC22001', type: 'Student', dept: 'ECE',   booksIssued: 1, fine: 0,  status: 'Active',    expiry: '2027-05-31' },
  { id: 'MEM016', name: 'Pavithra Sundarajan',   reg: 'IT22001', type: 'Student', dept: 'IT',    booksIssued: 0, fine: 10, status: 'Active',    expiry: '2027-05-31' },
  { id: 'MEM017', name: 'Abishek Raja',          reg: 'AI22001', type: 'Student', dept: 'AI&DS', booksIssued: 2, fine: 0,  status: 'Active',    expiry: '2027-05-31' },
  { id: 'MEM018', name: 'Deepika Murugan',       reg: 'CS23001', type: 'Student', dept: 'CSE',   booksIssued: 1, fine: 0,  status: 'Active',    expiry: '2028-05-31' },

  // Faculty
  { id: 'MEM019', name: 'Dr. S. Ramalingam',     reg: 'EMP001', type: 'Faculty', dept: 'CSE',   booksIssued: 4, fine: 0,  status: 'Active',    expiry: '2027-03-31' },
  { id: 'MEM020', name: 'Dr. K. Meenakshi',      reg: 'EMP002', type: 'Faculty', dept: 'CSE',   booksIssued: 2, fine: 0,  status: 'Active',    expiry: '2027-03-31' },
  { id: 'MEM021', name: 'Dr. R. Vijayakumar',    reg: 'EMP003', type: 'Faculty', dept: 'ECE',   booksIssued: 3, fine: 0,  status: 'Active',    expiry: '2027-03-31' },
  { id: 'MEM022', name: 'Dr. P. Anantharaman',   reg: 'EMP004', type: 'Faculty', dept: 'MECH',  booksIssued: 5, fine: 0,  status: 'Active',    expiry: '2027-03-31' },
  { id: 'MEM023', name: 'Dr. A. Lakshmi',        reg: 'EMP006', type: 'Faculty', dept: 'AI&DS', booksIssued: 6, fine: 0,  status: 'Active',    expiry: '2027-03-31' },
  { id: 'MEM024', name: 'Mr. N. Karthikeyan',    reg: 'EMP018', type: 'Faculty', dept: 'CSE',   booksIssued: 2, fine: 0,  status: 'Active',    expiry: '2027-03-31' },
  { id: 'MEM025', name: 'Mr. A. Murugesan',      reg: 'EMP032', type: 'Staff',   dept: 'Lib',   booksIssued: 1, fine: 0,  status: 'Active',    expiry: '2027-03-31' },
]

export const TRANSACTIONS = [
  { id: 'TXN001', bookId: 'BK001', bookTitle: 'Database System Concepts',            member: 'Arjun Kumar',       memberId: 'CS21001', issueDate: '2026-06-01', dueDate: '2026-06-22', returnDate: null,         status: 'Issued',  fine: 0  },
  { id: 'TXN002', bookId: 'BK003', bookTitle: 'Introduction to Algorithms',           member: 'Arjun Kumar',       memberId: 'CS21001', issueDate: '2026-06-10', dueDate: '2026-07-01', returnDate: null,         status: 'Issued',  fine: 0  },
  { id: 'TXN003', bookId: 'BK011', bookTitle: 'Artificial Intelligence',              member: 'Kavya Subramanian', memberId: 'AI21001', issueDate: '2026-06-05', dueDate: '2026-06-26', returnDate: null,         status: 'Issued',  fine: 0  },
  { id: 'TXN004', bookId: 'BK016', bookTitle: 'Electronic Devices and Circuits',      member: 'Muthu Krishnan',    memberId: 'EC21001', issueDate: '2026-06-08', dueDate: '2026-06-29', returnDate: null,         status: 'Issued',  fine: 0  },
  { id: 'TXN005', bookId: 'BK002', bookTitle: 'Operating System Concepts',            member: 'Vikram Nair',       memberId: 'CS21005', issueDate: '2026-05-20', dueDate: '2026-06-10', returnDate: null,         status: 'Overdue', fine: 70 },
  { id: 'TXN006', bookId: 'BK028', bookTitle: 'Engineering Mathematics Vol. 1',       member: 'Priya Rajan',       memberId: 'CS21002', issueDate: '2026-06-01', dueDate: '2026-06-22', returnDate: null,         status: 'Overdue', fine: 20 },
  { id: 'TXN007', bookId: 'BK024', bookTitle: 'Thermodynamics: An Engineering Approach', member: 'Dharani Raj',   memberId: 'ME21001', issueDate: '2026-05-15', dueDate: '2026-06-05', returnDate: null,         status: 'Overdue', fine: 60 },
  { id: 'TXN008', bookId: 'BK001', bookTitle: 'Database System Concepts',             member: 'Dr. S. Ramalingam', memberId: 'EMP001',  issueDate: '2026-06-01', dueDate: '2026-07-31', returnDate: null,         status: 'Issued',  fine: 0  },
  { id: 'TXN009', bookId: 'BK017', bookTitle: 'Signals and Systems',                  member: 'Dr. R. Vijayakumar',memberId: 'EMP003',  issueDate: '2026-05-28', dueDate: '2026-07-28', returnDate: null,         status: 'Issued',  fine: 0  },
  { id: 'TXN010', bookId: 'BK007', bookTitle: 'Python Crash Course',                  member: 'Ananya Menon',      memberId: 'CS21004', issueDate: '2026-05-10', dueDate: '2026-05-31', returnDate: null,         status: 'Overdue', fine: 40 },
  { id: 'TXN011', bookId: 'BK004', bookTitle: 'Computer Networks',                    member: 'Nithya Prakash',    memberId: 'CS21006', issueDate: '2026-06-14', dueDate: '2026-07-05', returnDate: null,         status: 'Issued',  fine: 0  },
  { id: 'TXN012', bookId: 'BK009', bookTitle: 'Discrete Mathematics',                 member: 'Vikram Nair',       memberId: 'CS21005', issueDate: '2026-06-12', dueDate: '2026-07-03', returnDate: null,         status: 'Issued',  fine: 0  },
  { id: 'TXN013', bookId: 'BK012', bookTitle: 'Deep Learning',                        member: 'Divya Bharathi',    memberId: 'AI21002', issueDate: '2026-06-10', dueDate: '2026-07-01', returnDate: null,         status: 'Issued',  fine: 0  },
  { id: 'TXN014', bookId: 'BK021', bookTitle: 'Power System Analysis',                member: 'Sathish Prabhu',    memberId: 'EE21002', issueDate: '2026-06-05', dueDate: '2026-06-26', returnDate: null,         status: 'Issued',  fine: 0  },
  { id: 'TXN015', bookId: 'BK015', bookTitle: 'Hands-On Machine Learning',            member: 'Abishek Raja',      memberId: 'AI22001', issueDate: '2026-06-08', dueDate: '2026-06-29', returnDate: null,         status: 'Issued',  fine: 0  },
  { id: 'TXN016', bookId: 'BK030', bookTitle: 'Engineering Physics',                  member: 'Renuka Devi',       memberId: 'CS22001', issueDate: '2026-06-01', dueDate: '2026-06-22', returnDate: null,         status: 'Overdue', fine: 10 },
  { id: 'TXN017', bookId: 'BK025', bookTitle: 'Theory of Machines',                   member: 'Senthil Nathan',    memberId: 'ME21003', issueDate: '2026-05-20', dueDate: '2026-06-10', returnDate: null,         status: 'Overdue', fine: 30 },
  { id: 'TXN018', bookId: 'BK033', bookTitle: 'The Lean Startup',                     member: 'Dr. T. Sundaramurthy', memberId: 'EMP009', issueDate: '2026-06-03', dueDate: '2026-08-03', returnDate: null,      status: 'Issued',  fine: 0  },
  { id: 'TXN019', bookId: 'BK006', bookTitle: 'Software Engineering',                 member: 'Lavanya Mohan',     memberId: 'IT21001', issueDate: '2026-06-12', dueDate: '2026-07-03', returnDate: null,         status: 'Issued',  fine: 0  },
  { id: 'TXN020', bookId: 'BK010', bookTitle: 'Design Patterns (GoF)',                member: 'Dr. K. Selvakumar', memberId: 'EMP011', issueDate: '2026-06-08', dueDate: '2026-08-08', returnDate: null,          status: 'Issued',  fine: 0  },
  { id: 'TXN021', bookId: 'BK005', bookTitle: 'Compiler Design',                      member: 'Kiran Shankar',     memberId: 'EC22001', issueDate: '2026-05-25', dueDate: '2026-06-15', returnDate: '2026-06-14', status: 'Returned',fine: 0  },
  { id: 'TXN022', bookId: 'BK013', bookTitle: 'Pattern Recognition and Machine Learning', member: 'Dr. A. Lakshmi', memberId: 'EMP006', issueDate: '2026-05-10', dueDate: '2026-07-10', returnDate: null,       status: 'Issued',  fine: 0  },
  { id: 'TXN023', bookId: 'BK022', bookTitle: 'Electrical Machines',                  member: 'Dr. G. Subramaniam',memberId: 'EMP005', issueDate: '2026-06-01', dueDate: '2026-08-01', returnDate: null,          status: 'Issued',  fine: 0  },
  { id: 'TXN024', bookId: 'BK031', bookTitle: 'Engineering Chemistry',                member: 'Deepika Murugan',   memberId: 'CS23001', issueDate: '2026-06-14', dueDate: '2026-07-05', returnDate: null,         status: 'Issued',  fine: 0  },
  { id: 'TXN025', bookId: 'BK008', bookTitle: 'Clean Code',                           member: 'Pavithra Sundarajan', memberId: 'IT22001', issueDate: '2026-06-05', dueDate: '2026-06-26', returnDate: null,     status: 'Overdue', fine: 10 },
]

export const RESERVATIONS = [
  { id: 'RES001', bookId: 'BK011', bookTitle: 'Artificial Intelligence: A Modern Approach', member: 'Vikram Nair',     dept: 'CSE',   requestDate: '2026-06-20', status: 'Queued', position: 1 },
  { id: 'RES002', bookId: 'BK002', bookTitle: 'Operating System Concepts',                  member: 'Dharani Raj',     dept: 'MECH',  requestDate: '2026-06-19', status: 'Queued', position: 1 },
  { id: 'RES003', bookId: 'BK003', bookTitle: 'Introduction to Algorithms',                  member: 'Kavya Subramanian', dept: 'AI&DS', requestDate: '2026-06-21', status: 'Ready', position: 0 },
  { id: 'RES004', bookId: 'BK012', bookTitle: 'Deep Learning',                               member: 'Priya Rajan',     dept: 'CSE',   requestDate: '2026-06-22', status: 'Queued', position: 1 },
  { id: 'RES005', bookId: 'BK008', bookTitle: 'Clean Code',                                  member: 'Arjun Kumar',     dept: 'CSE',   requestDate: '2026-06-23', status: 'Queued', position: 2 },
  { id: 'RES006', bookId: 'BK013', bookTitle: 'Pattern Recognition and Machine Learning',   member: 'Abishek Raja',    dept: 'AI&DS', requestDate: '2026-06-23', status: 'Queued', position: 1 },
  { id: 'RES007', bookId: 'BK019', bookTitle: 'VLSI Design',                                 member: 'Kiran Shankar',   dept: 'ECE',   requestDate: '2026-06-22', status: 'Queued', position: 1 },
]

export const DIGITAL_RESOURCES = [
  { id: 'DIG001', title: 'IEEE Xplore Digital Library',   type: 'Database',  category: 'Engineering',      access: 'Institutional', papers: 5200000 },
  { id: 'DIG002', title: 'Springer Link',                 type: 'Database',  category: 'Science & Tech',   access: 'Institutional', papers: 3800000 },
  { id: 'DIG003', title: 'ACM Digital Library',           type: 'Database',  category: 'Computer Science', access: 'Institutional', papers: 2100000 },
  { id: 'DIG004', title: 'NPTEL Video Lectures',          type: 'Video',     category: 'Engineering',      access: 'Free',          papers: 28000   },
  { id: 'DIG005', title: 'ScienceDirect (Elsevier)',      type: 'Journal',   category: 'Multi-Disciplinary',access:'Institutional', papers: 4400000 },
  { id: 'DIG006', title: 'MathSciNet (AMS)',              type: 'Database',  category: 'Mathematics',      access: 'Institutional', papers: 3500000 },
  { id: 'DIG007', title: 'Project Gutenberg',             type: 'E-Library', category: 'General / Arts',   access: 'Free',          papers: 60000   },
  { id: 'DIG008', title: 'Anna University e-Resources',  type: 'Portal',    category: 'University',       access: 'Institutional', papers: 12000   },
  { id: 'DIG009', title: 'Taylor & Francis Online',       type: 'Journal',   category: 'Multi-Disciplinary',access:'Institutional', papers: 2800000 },
  { id: 'DIG010', title: 'JSTOR',                         type: 'Database',  category: 'Humanities / Mgmt',access: 'Institutional', papers: 12000000},
]

export const ACQUISITION_REQUESTS = [
  { id: 'ACQ001', title: 'Machine Learning: A Probabilistic Perspective', author: 'Kevin P. Murphy',    requestedBy: 'Dr. A. Lakshmi',      dept: 'AI&DS', cost: 4500, qty: 3, status: 'Approved' },
  { id: 'ACQ002', title: 'Microcontrollers and Embedded Systems',         author: 'Muhammad Ali Mazidi', requestedBy: 'Dr. R. Vijayakumar',  dept: 'ECE',   cost: 800,  qty: 8, status: 'Ordered'  },
  { id: 'ACQ003', title: 'VLSI Design by Weste & Harris (5th Ed.)',       author: 'Neil H.E. Weste',     requestedBy: 'Mr. R. Suresh Kumar', dept: 'ECE',   cost: 950,  qty: 5, status: 'Pending'  },
  { id: 'ACQ004', title: 'Advanced Engineering Mathematics (10th Ed.)',   author: 'Erwin Kreyszig',      requestedBy: 'Dr. P. Anantharaman', dept: 'MECH',  cost: 1200, qty: 6, status: 'Pending'  },
  { id: 'ACQ005', title: 'Python for Data Analysis (3rd Ed.)',            author: 'Wes McKinney',        requestedBy: 'Ms. D. Premalatha',   dept: 'CSE',   cost: 2200, qty: 4, status: 'Approved' },
  { id: 'ACQ006', title: 'Hands-On Machine Learning (3rd Ed.)',           author: 'Aurélien Géron',      requestedBy: 'Dr. M. Geetha',       dept: 'AI&DS', cost: 3500, qty: 3, status: 'Pending'  },
  { id: 'ACQ007', title: 'Financial Management (14th Ed.)',               author: 'I.M. Pandey',         requestedBy: 'Dr. T. Sundaramurthy',dept: 'MBA',   cost: 1800, qty: 5, status: 'Approved' },
]

export const CATEGORY_STATS = [
  { cat: 'Computer Science', books: 14820, issued: 2640, color: '#1A2E8F' },
  { cat: 'Electronics',      books: 8200,  issued: 1120, color: '#2540B4' },
  { cat: 'Mathematics',      books: 6400,  issued: 980,  color: '#F5B800' },
  { cat: 'Mechanical',       books: 5800,  issued: 740,  color: '#C99800' },
  { cat: 'Electrical',       books: 4200,  issued: 540,  color: '#3055CC' },
  { cat: 'General / Others', books: 9100,  issued: 822,  color: '#6690EE' },
]

export const MONTHLY_ISSUE_TREND = [
  { month: 'Jul',  issued: 420, returned: 390 },
  { month: 'Aug',  issued: 560, returned: 530 },
  { month: 'Sep',  issued: 680, returned: 650 },
  { month: 'Oct',  issued: 720, returned: 700 },
  { month: 'Nov',  issued: 840, returned: 800 },
  { month: 'Dec',  issued: 480, returned: 460 },
  { month: 'Jan',  issued: 520, returned: 490 },
  { month: 'Feb',  issued: 480, returned: 510 },
  { month: 'Mar',  issued: 610, returned: 580 },
  { month: 'Apr',  issued: 720, returned: 690 },
  { month: 'May',  issued: 840, returned: 800 },
  { month: 'Jun',  issued: 680, returned: 620 },
]
