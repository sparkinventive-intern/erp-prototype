// Staff / Faculty portal data — Dr. Priya Nair · FAC-CSE-0214 · CSE · SCET

export const ME = {
  name: 'Dr. Priya Nair',
  empId: 'FAC-CSE-0214',
  designation: 'Assistant Professor',
  dept: 'Computer Science & Engineering',
  joining: '12 Aug 2018',
  experience: '8 Years',
  ug: 'B.E. Computer Science — Anna University, 2011',
  pg: 'M.E. Computer Science — NIT Trichy, 2013',
  phd: 'Ph.D. (Machine Learning) — IIT Madras, 2017',
  specialization: 'Machine Learning, Distributed Systems, Data Science',
  research: 'Federated Learning for Privacy-Preserving Healthcare AI',
  email: 'priya.nair@scet.ac.in',
  phone: '+91 98402 71340',
  cabin: 'AB Block, Room 214',
  cabin_hours: 'Mon & Wed  2:00–4:00 PM',
  publications: 14,
  projects: 2,
  mentees: 12,
  totalStudents: 186,
}

export const MY_COURSES = [
  { code:'CS8591',  name:'Computer Networks',            short:'CN',       year:'III', section:'C1', students:62, hrs:3, type:'Theory', credits:3,   room:'LH 204',    progress:68, syllabusDone:68 },
  { code:'CS8591P', name:'Computer Networks Laboratory', short:'CN Lab',   year:'III', section:'C1', students:62, hrs:3, type:'Lab',    credits:1.5, room:'Net Lab',   progress:62, syllabusDone:62 },
  { code:'CS8492',  name:'Database Management Systems',  short:'DBMS',     year:'II',  section:'C2', students:68, hrs:3, type:'Theory', credits:3,   room:'LH 301',   progress:74, syllabusDone:74 },
  { code:'CS8492P', name:'DBMS Laboratory',              short:'DBMS Lab', year:'II',  section:'C2', students:68, hrs:3, type:'Lab',    credits:1.5, room:'CSE Lab 1', progress:71, syllabusDone:71 },
  { code:'CS8493',  name:'Operating Systems',            short:'OS',       year:'III', section:'A1', students:56, hrs:3, type:'Theory', credits:3,   room:'LH 108',   progress:60, syllabusDone:60 },
]

// Periods (7 per day, lunch excluded)
export const PERIODS = [
  { p:1, time:'8:00–8:50' },
  { p:2, time:'9:00–9:50' },
  { p:3, time:'10:00–10:50' },
  { p:4, time:'11:00–11:50' },
  { p:5, time:'1:00–1:50' },
  { p:6, time:'2:00–2:50' },
  { p:7, time:'3:00–3:50' },
]

export const TT_DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat']

// TT_SLOTS[day][period] = {s, type:'T'|'P'|'M', room, sec} | null
export const TT_SLOTS = {
  Mon: { 1:{s:'CN',       type:'T',room:'LH 204',   sec:'III C1'}, 3:{s:'DBMS',    type:'T',room:'LH 301',    sec:'II C2'},  4:{s:'OS',       type:'T',room:'LH 108',   sec:'III A1'}, 6:{s:'DBMS Lab',type:'P',room:'CSE Lab 1',sec:'II C2'},  7:{s:'DBMS Lab',type:'P',room:'CSE Lab 1',sec:'II C2'} },
  Tue: { 2:{s:'CN',       type:'T',room:'LH 204',   sec:'III C1'}, 3:{s:'OS',      type:'T',room:'LH 108',   sec:'III A1'}, 5:{s:'CN Lab',   type:'P',room:'Net Lab',   sec:'III C1'}, 6:{s:'CN Lab',  type:'P',room:'Net Lab',   sec:'III C1'} },
  Wed: { 1:{s:'DBMS',     type:'T',room:'LH 301',   sec:'II C2'},  2:{s:'CN',      type:'T',room:'LH 204',   sec:'III C1'}, 6:{s:'Tutorial', type:'T',room:'LH 204',   sec:'III C1'} },
  Thu: { 2:{s:'OS',       type:'T',room:'LH 108',   sec:'III A1'}, 3:{s:'DBMS',    type:'T',room:'LH 301',   sec:'II C2'},  4:{s:'CN',       type:'T',room:'LH 204',   sec:'III C1'} },
  Fri: { 1:{s:'OS',       type:'T',room:'LH 108',   sec:'III A1'}, 4:{s:'DBMS',    type:'T',room:'LH 301',   sec:'II C2'},  6:{s:'Meeting',  type:'M',room:'CSE Conf.', sec:'Dept'},   7:{s:'Mentoring',type:'M',room:'Cabin 214',sec:'Mentees'} },
  Sat: { 1:{s:'CN Lab',   type:'P',room:'Net Lab',  sec:'III C1'}, 2:{s:'CN Lab',  type:'P',room:'Net Lab',  sec:'III C1'}, 3:{s:'OS Lab',   type:'P',room:'Net Lab',   sec:'III A1'}, 4:{s:'OS Lab',  type:'P',room:'Net Lab',   sec:'III A1'} },
}

export const STU_CN = [
  {rollNo:'22CSE1C001',name:'Aakash R',       att:92,cia1:23,cia2:22,risk:'low'},
  {rollNo:'22CSE1C002',name:'Anitha S',        att:88,cia1:20,cia2:21,risk:'low'},
  {rollNo:'22CSE1C003',name:'Arjun K',         att:71,cia1:14,cia2:15,risk:'medium'},
  {rollNo:'22CSE1C004',name:'Bhavani R',       att:95,cia1:25,cia2:24,risk:'low'},
  {rollNo:'22CSE1C005',name:'Deepak M',        att:62,cia1:11,cia2:12,risk:'high'},
  {rollNo:'22CSE1C006',name:'Divya K',         att:84,cia1:19,cia2:20,risk:'low'},
  {rollNo:'22CSE1C007',name:'Ganesh V',        att:79,cia1:17,cia2:16,risk:'medium'},
  {rollNo:'22CSE1C008',name:'Kaviya S',        att:90,cia1:22,cia2:23,risk:'low'},
  {rollNo:'22CSE1C009',name:'Karthik R',       att:68,cia1:13,cia2:12,risk:'high'},
  {rollNo:'22CSE1C010',name:'Kiruthiga R',     att:93,cia1:24,cia2:24,risk:'low'},
  {rollNo:'22CSE1C011',name:'Manoj S',         att:77,cia1:16,cia2:17,risk:'medium'},
  {rollNo:'22CSE1C012',name:'Meena K',         att:86,cia1:21,cia2:20,risk:'low'},
  {rollNo:'22CSE1C013',name:'Naveen K',        att:58,cia1:10,cia2:11,risk:'high'},
  {rollNo:'22CSE1C014',name:'Nithya P',        att:91,cia1:23,cia2:22,risk:'low'},
  {rollNo:'22CSE1C015',name:'Praveen S',       att:74,cia1:15,cia2:15,risk:'medium'},
  {rollNo:'22CSE1C016',name:'Pooja R',         att:88,cia1:20,cia2:21,risk:'low'},
  {rollNo:'22CSE1C017',name:'Selvam G',        att:65,cia1:12,cia2:13,risk:'high'},
  {rollNo:'22CSE1C018',name:'Sangeetha M',     att:82,cia1:19,cia2:18,risk:'low'},
  {rollNo:'22CSE1C019',name:'Vignesh P',       att:76,cia1:16,cia2:16,risk:'medium'},
  {rollNo:'22CSE1C020',name:'Suganya V',       att:94,cia1:24,cia2:25,risk:'low'},
]

export const STU_DBMS = [
  {rollNo:'23CSE2C001',name:'Abishek S',       att:85,cia1:20,cia2:21,risk:'low'},
  {rollNo:'23CSE2C002',name:'Akshaya R',       att:91,cia1:22,cia2:23,risk:'low'},
  {rollNo:'23CSE2C003',name:'Bala M',          att:69,cia1:13,cia2:12,risk:'high'},
  {rollNo:'23CSE2C004',name:'Charanya P',      att:96,cia1:25,cia2:25,risk:'low'},
  {rollNo:'23CSE2C005',name:'Dhanush K',       att:73,cia1:15,cia2:14,risk:'medium'},
  {rollNo:'23CSE2C006',name:'Eswari S',        att:88,cia1:21,cia2:21,risk:'low'},
  {rollNo:'23CSE2C007',name:'Gowtham R',       att:60,cia1:11,cia2:10,risk:'high'},
  {rollNo:'23CSE2C008',name:'Harini M',        att:93,cia1:23,cia2:24,risk:'low'},
  {rollNo:'23CSE2C009',name:'Ilakkiya S',      att:80,cia1:18,cia2:19,risk:'low'},
  {rollNo:'23CSE2C010',name:'Jeyapriya R',     att:76,cia1:17,cia2:16,risk:'medium'},
  {rollNo:'23CSE2C011',name:'Kanagaraj V',     att:64,cia1:12,cia2:11,risk:'high'},
  {rollNo:'23CSE2C012',name:'Lavanya S',       att:90,cia1:22,cia2:22,risk:'low'},
  {rollNo:'23CSE2C013',name:'Mithun K',        att:83,cia1:19,cia2:20,risk:'low'},
  {rollNo:'23CSE2C014',name:'Nandhini P',      att:87,cia1:21,cia2:20,risk:'low'},
  {rollNo:'23CSE2C015',name:'Oviya R',         att:71,cia1:14,cia2:14,risk:'medium'},
  {rollNo:'23CSE2C016',name:'Pradeep S',       att:92,cia1:23,cia2:23,risk:'low'},
  {rollNo:'23CSE2C017',name:'Rajeshwari K',    att:67,cia1:12,cia2:13,risk:'high'},
  {rollNo:'23CSE2C018',name:'Santhosh M',      att:84,cia1:19,cia2:19,risk:'low'},
  {rollNo:'23CSE2C019',name:'Tamilarasi S',    att:77,cia1:17,cia2:16,risk:'medium'},
  {rollNo:'23CSE2C020',name:'Udhayakumar R',   att:89,cia1:21,cia2:22,risk:'low'},
]

export const STU_OS = [
  {rollNo:'22CSE1A001',name:'Aadhithya K',     att:89,cia1:22,cia2:21,risk:'low'},
  {rollNo:'22CSE1A002',name:'Abinaya S',       att:76,cia1:16,cia2:17,risk:'medium'},
  {rollNo:'22CSE1A003',name:'Chandrakumar R',  att:63,cia1:11,cia2:12,risk:'high'},
  {rollNo:'22CSE1A004',name:'Dharani P',       att:91,cia1:23,cia2:22,risk:'low'},
  {rollNo:'22CSE1A005',name:'Elango S',        att:84,cia1:19,cia2:20,risk:'low'},
  {rollNo:'22CSE1A006',name:'Fathima N',       att:70,cia1:14,cia2:13,risk:'medium'},
  {rollNo:'22CSE1A007',name:'Gokul M',         att:93,cia1:24,cia2:24,risk:'low'},
  {rollNo:'22CSE1A008',name:'Hemalatha S',     att:58,cia1:10,cia2:10,risk:'high'},
  {rollNo:'22CSE1A009',name:'Indhu R',         att:87,cia1:21,cia2:21,risk:'low'},
  {rollNo:'22CSE1A010',name:'Jayaganesh V',    att:74,cia1:15,cia2:15,risk:'medium'},
  {rollNo:'22CSE1A011',name:'Kamalesh P',      att:95,cia1:25,cia2:25,risk:'low'},
  {rollNo:'22CSE1A012',name:'Lekha S',         att:82,cia1:19,cia2:19,risk:'low'},
  {rollNo:'22CSE1A013',name:'Madhavan R',      att:66,cia1:12,cia2:12,risk:'high'},
  {rollNo:'22CSE1A014',name:'Nandha K',        att:88,cia1:21,cia2:22,risk:'low'},
  {rollNo:'22CSE1A015',name:'Oviya M',         att:79,cia1:18,cia2:17,risk:'medium'},
  {rollNo:'22CSE1A016',name:'Pavithra S',      att:92,cia1:23,cia2:23,risk:'low'},
  {rollNo:'22CSE1A017',name:'Ragavendran K',   att:61,cia1:11,cia2:10,risk:'high'},
  {rollNo:'22CSE1A018',name:'Saravanan M',     att:85,cia1:20,cia2:20,risk:'low'},
  {rollNo:'22CSE1A019',name:'Tharaniya P',     att:72,cia1:15,cia2:15,risk:'medium'},
  {rollNo:'22CSE1A020',name:'Vasantha S',      att:90,cia1:22,cia2:23,risk:'low'},
]

export const ALL_STUDENTS = [
  ...STU_CN.map(s=>({...s, course:'CN',   section:'III C1'})),
  ...STU_DBMS.map(s=>({...s, course:'DBMS', section:'II C2'})),
  ...STU_OS.map(s=>({...s, course:'OS',   section:'III A1'})),
]

export const ASSIGNMENTS = [
  {id:'ASN-CN-01', title:'TCP/IP Protocol Analysis',        course:'CN',   section:'III C1', due:'10 Jun 2025', submitted:58, evaluated:45, maxMarks:10},
  {id:'ASN-CN-02', title:'Network Security Case Study',     course:'CN',   section:'III C1', due:'24 Jun 2025', submitted:40, evaluated:12, maxMarks:10},
  {id:'ASN-DB-01', title:'SQL Query Optimisation Report',   course:'DBMS', section:'II C2',  due:'12 Jun 2025', submitted:65, evaluated:60, maxMarks:10},
  {id:'ASN-DB-02', title:'NoSQL vs RDBMS Comparison',      course:'DBMS', section:'II C2',  due:'26 Jun 2025', submitted:28, evaluated:0,  maxMarks:10},
  {id:'ASN-OS-01', title:'Process Scheduling Simulation',   course:'OS',   section:'III A1', due:'08 Jun 2025', submitted:54, evaluated:54, maxMarks:10},
  {id:'ASN-OS-02', title:'Memory Management Analysis',      course:'OS',   section:'III A1', due:'22 Jun 2025', submitted:18, evaluated:0,  maxMarks:10},
]

export const RESEARCH_PROJECTS = [
  {id:'RP-01', title:'Federated Learning for Medical Image Segmentation', funding:'DST SERB',     amount:'₹18.5 L', status:'Active',    period:'2023–2025', progress:65, pi:'Self', co_pi:'Dr. K. Ramesh, ECE'},
  {id:'RP-02', title:'AI-Driven Student Performance Prediction System',  funding:'SCET Internal', amount:'₹3.2 L',  status:'Active',    period:'2024–2025', progress:80, pi:'Self', co_pi:'—'},
  {id:'RP-03', title:'Blockchain-Based Academic Certificate Verification',funding:'AICTE RPS',     amount:'₹8.0 L',  status:'Completed', period:'2021–2023', progress:100, pi:'Self', co_pi:'Dr. S. Venkatesh, CSE'},
]

export const PUBLICATIONS = [
  {id:'PUB-01', title:'Privacy-Preserving FL in Healthcare: A Survey',   journal:'IEEE Trans. Big Data',    year:2024, type:'Journal',    impact:4.2, status:'Published'},
  {id:'PUB-02', title:'Adaptive Federated Learning for Non-IID Data',    journal:'Elsevier Pattern Recog.', year:2024, type:'Journal',    impact:8.5, status:'Published'},
  {id:'PUB-03', title:'Blockchain-Verified Academic Credentials',        journal:'IEEE Access',             year:2023, type:'Journal',    impact:3.9, status:'Published'},
  {id:'PUB-04', title:'Student Dropout Prediction via Ensemble Learning',journal:'ICAET 2023',              year:2023, type:'Conference', impact:null,status:'Published'},
  {id:'PUB-05', title:'CNN Compression for Edge Healthcare Devices',     journal:'MDPI Electronics',        year:2023, type:'Journal',    impact:2.6, status:'Published'},
  {id:'PUB-06', title:'Explainable AI for Academic Risk Assessment',     journal:'IEEE TLT',                year:2025, type:'Journal',    impact:4.7, status:'Under Review'},
  {id:'PUB-07', title:'FL with Differential Privacy: Implementation',    journal:'ACM CCS 2025',            year:2025, type:'Conference', impact:null,status:'Accepted'},
  {id:'PUB-08', title:'Homomorphic Encryption in Distributed ML',        journal:'Elsevier Neurocomputing', year:2025, type:'Journal',    impact:6.0, status:'Under Review'},
]

export const MENTEES = [
  {rollNo:'22CSE1C005',name:'Deepak M',       section:'III C1',att:62,risk:'high',  lastMeeting:'10 Jun 2025',topic:'Attendance Warning',   nextMeeting:'18 Jun 2025',notes:'Parents informed. Action plan set.'},
  {rollNo:'22CSE1C009',name:'Karthik R',      section:'III C1',att:68,risk:'high',  lastMeeting:'08 Jun 2025',topic:'Academic Stress',       nextMeeting:'20 Jun 2025',notes:'Referred to counseling cell.'},
  {rollNo:'22CSE1C013',name:'Naveen K',       section:'III C1',att:58,risk:'high',  lastMeeting:'05 Jun 2025',topic:'Attendance + Marks',    nextMeeting:'15 Jun 2025',notes:'Parents called. Strict monitoring.'},
  {rollNo:'22CSE1C017',name:'Selvam G',       section:'III C1',att:65,risk:'high',  lastMeeting:'12 Jun 2025',topic:'Career Guidance',       nextMeeting:'22 Jun 2025',notes:'Interested in govt services.'},
  {rollNo:'22CSE1A003',name:'Chandrakumar R', section:'III A1',att:63,risk:'high',  lastMeeting:'09 Jun 2025',topic:'Attendance',            nextMeeting:'19 Jun 2025',notes:'Medical issue — condonation initiated.'},
  {rollNo:'22CSE1A008',name:'Hemalatha S',    section:'III A1',att:58,risk:'high',  lastMeeting:'11 Jun 2025',topic:'Personal Issues',       nextMeeting:'21 Jun 2025',notes:'Referred to HoD counseling.'},
  {rollNo:'22CSE1C003',name:'Arjun K',        section:'III C1',att:71,risk:'medium',lastMeeting:'03 Jun 2025',topic:'Performance Dip',       nextMeeting:'17 Jun 2025',notes:'Motivation talk, study plan shared.'},
  {rollNo:'22CSE1C011',name:'Manoj S',        section:'III C1',att:77,risk:'medium',lastMeeting:'02 Jun 2025',topic:'Project Guidance',      nextMeeting:'16 Jun 2025',notes:'Good progress — needs focus.'},
  {rollNo:'22CSE1A006',name:'Fathima N',      section:'III A1',att:70,risk:'medium',lastMeeting:'06 Jun 2025',topic:'Elective Selection',    nextMeeting:'18 Jun 2025',notes:'Guided towards ML specialization.'},
  {rollNo:'23CSE2C003',name:'Bala M',         section:'II C2', att:69,risk:'high',  lastMeeting:'07 Jun 2025',topic:'DBMS Lab Performance',  nextMeeting:'17 Jun 2025',notes:'Extra lab practice scheduled.'},
  {rollNo:'23CSE2C007',name:'Gowtham R',      section:'II C2', att:60,risk:'high',  lastMeeting:'04 Jun 2025',topic:'Attendance',            nextMeeting:'14 Jun 2025',notes:'Parents notified via ERP.'},
  {rollNo:'23CSE2C011',name:'Kanagaraj V',    section:'II C2', att:64,risk:'high',  lastMeeting:'13 Jun 2025',topic:'Study Habits',          nextMeeting:'23 Jun 2025',notes:'Peer study group formed.'},
]

export const EXAM_DUTIES = [
  {id:'ED-01', date:'18 Jun 2025', time:'9:00 AM–12:00 PM', venue:'Block A – Hall 4', subject:'CS8501 – Artificial Intelligence', year:'IV CSE',  strength:65, role:'Invigilator'},
  {id:'ED-02', date:'19 Jun 2025', time:'2:00 PM–5:00 PM',  venue:'Block B – Hall 2', subject:'CS8503 – Internet of Things',     year:'IV CSE',  strength:58, role:'Invigilator'},
  {id:'ED-03', date:'21 Jun 2025', time:'9:00 AM–12:00 PM', venue:'Block A – Hall 7', subject:'CS8493 – Operating Systems',      year:'III CSE', strength:62, role:'Sr. Invigilator'},
]

export const DEPT_FACULTY = [
  {name:'Dr. S. Kumaresan',  designation:'Professor & HoD',    specialization:'VLSI Design',         exp:'22 yrs',status:'Active'},
  {name:'Dr. A. Selvakumar', designation:'Professor',           specialization:'Cloud Computing',     exp:'18 yrs',status:'Active'},
  {name:'Dr. R. Lakshmi',    designation:'Associate Professor', specialization:'Big Data Analytics',  exp:'14 yrs',status:'Active'},
  {name:'Dr. P. Venkatesh',  designation:'Associate Professor', specialization:'Network Security',    exp:'12 yrs',status:'Active'},
  {name:'Dr. Priya Nair',    designation:'Assistant Professor', specialization:'Machine Learning',    exp:'8 yrs', status:'Active'},
  {name:'Mr. K. Anand',      designation:'Assistant Professor', specialization:'Web Technologies',   exp:'6 yrs', status:'Active'},
  {name:'Ms. V. Deepika',    designation:'Assistant Professor', specialization:'Data Structures',     exp:'5 yrs', status:'Active'},
  {name:'Mr. M. Sriram',     designation:'Assistant Professor', specialization:'Python & ML',         exp:'4 yrs', status:'Active'},
  {name:'Ms. S. Kavitha',    designation:'Assistant Professor', specialization:'IoT & Embedded Sys',  exp:'4 yrs', status:'Active'},
  {name:'Mr. R. Dinesh',     designation:'Assistant Professor', specialization:'Compiler Design',     exp:'3 yrs', status:'Active'},
]

export const LAB_GROUPS = [
  {id:'LG-CN-A', subject:'Computer Networks Lab', section:'III C1',batch:'Batch A',students:21,day:'Tuesday',  time:'1:00–3:50 PM',  room:'Net Lab'},
  {id:'LG-CN-B', subject:'Computer Networks Lab', section:'III C1',batch:'Batch B',students:21,day:'Saturday', time:'8:00–10:50 AM', room:'Net Lab'},
  {id:'LG-CN-C', subject:'Computer Networks Lab', section:'III C1',batch:'Batch C',students:20,day:'Wednesday',time:'1:00–3:50 PM',  room:'Net Lab'},
  {id:'LG-DB-A', subject:'DBMS Laboratory',       section:'II C2', batch:'Batch A',students:23,day:'Monday',   time:'1:00–3:50 PM',  room:'CSE Lab 1'},
  {id:'LG-DB-B', subject:'DBMS Laboratory',       section:'II C2', batch:'Batch B',students:23,day:'Thursday', time:'1:00–3:50 PM',  room:'CSE Lab 1'},
  {id:'LG-DB-C', subject:'DBMS Laboratory',       section:'II C2', batch:'Batch C',students:22,day:'Friday',   time:'8:00–10:50 AM', room:'CSE Lab 1'},
]

export const PROJECTS = [
  {id:'PRJ-01',title:'Smart Waste Management using IoT & ML',        team:'Aakash R, Bhavani R, Kaviya S, Nithya P',          section:'III C1',phase:'Phase 2 – Prototype Build',      nextReview:'20 Jun 2025',progress:60},
  {id:'PRJ-02',title:'Fake News Detection using BERT & GAN',         team:'Karthik R, Meena K, Sangeetha M, Vignesh P',       section:'III C1',phase:'Phase 1 – Literature Survey',    nextReview:'18 Jun 2025',progress:35},
  {id:'PRJ-03',title:'Real-Time Sign Language Recognition via CV',   team:'Chandrakumar R, Dharani P, Gokul M, Pavithra S',   section:'III A1',phase:'Phase 2 – Dataset Collection',   nextReview:'22 Jun 2025',progress:45},
  {id:'PRJ-04',title:'Online Exam Anti-Cheating System (CV-Based)',  team:'Aadhithya K, Elango S, Indhu R, Nandha K',         section:'III A1',phase:'Phase 3 – Testing & Evaluation', nextReview:'17 Jun 2025',progress:78},
  {id:'PRJ-05',title:'Student Performance Prediction Dashboard',     team:'Akshaya R, Harini M, Nandhini P, Pradeep S',       section:'II C2', phase:'Phase 1 – Requirement Analysis',nextReview:'25 Jun 2025',progress:20},
]

export const REVALUATION_REQS = [
  {id:'REV-001',rollNo:'22CSE1C009',name:'Karthik R',      subject:'CS8591 – CN',   paper:'CIA-I',obtained:12,requested:15,status:'Pending',  date:'12 Jun 2025'},
  {id:'REV-002',rollNo:'22CSE1A008',name:'Hemalatha S',    subject:'CS8493 – OS',   paper:'CIA-I',obtained:10,requested:14,status:'Pending',  date:'11 Jun 2025'},
  {id:'REV-003',rollNo:'23CSE2C003',name:'Bala M',         subject:'CS8492 – DBMS', paper:'CIA-I',obtained:11,requested:13,status:'Reviewed', date:'08 Jun 2025'},
  {id:'REV-004',rollNo:'22CSE1C013',name:'Naveen K',       subject:'CS8591 – CN',   paper:'CIA-I',obtained:10,requested:12,status:'Rejected', date:'05 Jun 2025'},
]

export const CIRCULARS = [
  {id:'C-001',title:'End Semester Examination Schedule – July 2025',       from:'Controller of Examinations', date:'14 Jun 2025',urgent:true, body:'End semester exams for all batches commence from 18 July 2025. All faculty must submit final marks and attendance by 10 July 2025 via ERP.'},
  {id:'C-002',title:'NBA Accreditation Documentation – Deadline Extended',  from:'IQAC Cell',                  date:'13 Jun 2025',urgent:true, body:'NBA documentation deadline extended to 25 June 2025. All departments must compile course outcomes and CO-PO attainment mapping without fail.'},
  {id:'C-003',title:'Faculty Development Programme – NPTEL Certifications', from:'HoD – CSE Department',       date:'11 Jun 2025',urgent:false,body:'Faculty are encouraged to complete at least one NPTEL online certification per semester. Registration deadline: 20 June 2025. Share certificates to IQAC.'},
  {id:'C-004',title:'Student Feedback – Online Window Open (10–20 Jun)',    from:'Academic Section',            date:'10 Jun 2025',urgent:false,body:'Online student feedback for all subjects is open from 10–20 June 2025. Faculty must NOT influence student responses in any manner.'},
  {id:'C-005',title:'Research Grant Application – DST SERB Call 2025–26',  from:'R&D Cell',                    date:'08 Jun 2025',urgent:false,body:'SERB CRG and SRG grant applications are now open. Internal submission deadline: 25 June 2025. Contact R&D Cell for proposal templates.'},
  {id:'C-006',title:'Monthly Academic Review Meeting – 20 June 2025',      from:'HoD – CSE Department',       date:'06 Jun 2025',urgent:false,body:'Monthly department academic review meeting on Friday 20 June at 3:00 PM in CSE Conference Room, AB Block 1st floor. All faculty attendance is mandatory.'},
]

export const ATT_MONTHLY = [
  {month:'Jul',CN:88,DBMS:91,OS:85},{month:'Aug',CN:84,DBMS:87,OS:82},
  {month:'Sep',CN:86,DBMS:89,OS:84},{month:'Oct',CN:80,DBMS:85,OS:79},
  {month:'Nov',CN:83,DBMS:88,OS:81},{month:'Dec',CN:79,DBMS:84,OS:77},
  {month:'Jan',CN:85,DBMS:90,OS:83},{month:'Feb',CN:87,DBMS:92,OS:86},
  {month:'Mar',CN:82,DBMS:88,OS:80},{month:'Apr',CN:84,DBMS:89,OS:82},
  {month:'May',CN:86,DBMS:91,OS:84},{month:'Jun',CN:83,DBMS:87,OS:81},
]

export const PERF_TREND = [
  {month:'Jul',CN:68,DBMS:72,OS:65},{month:'Aug',CN:72,DBMS:75,OS:68},
  {month:'Sep',CN:69,DBMS:78,OS:66},{month:'Oct',CN:74,DBMS:80,OS:71},
  {month:'Nov',CN:76,DBMS:82,OS:73},{month:'Dec',CN:78,DBMS:81,OS:75},
  {month:'Jan',CN:80,DBMS:83,OS:77},{month:'Feb',CN:79,DBMS:85,OS:76},
  {month:'Mar',CN:82,DBMS:87,OS:79},{month:'Apr',CN:84,DBMS:88,OS:81},
  {month:'May',CN:83,DBMS:86,OS:80},{month:'Jun',CN:85,DBMS:89,OS:82},
]

export const FEEDBACK_SUMMARY = {avg:4.3, total:182, breakdown:{5:94,4:56,3:22,2:8,1:2}}
export const FEEDBACK_COMMENTS = [
  {course:'CN',  rating:5,comment:'Concepts explained with real-world examples. The YouTube links shared for each topic were very helpful.',           date:'10 Jun 2025'},
  {course:'DBMS',rating:5,comment:'Dr. Priya Nair is very approachable and explains doubts patiently. One of the best professors in the department.',  date:'09 Jun 2025'},
  {course:'OS',  rating:4,comment:'Good teaching style. More practice problems in class would help for exam preparation.',                              date:'08 Jun 2025'},
  {course:'CN',  rating:3,comment:'Speed of teaching is slightly fast. Recorded lectures would help students who miss class.',                          date:'08 Jun 2025'},
  {course:'DBMS',rating:4,comment:'Lab sessions are well-structured. Faculty helps debug queries step by step.',                                        date:'07 Jun 2025'},
  {course:'CN',  rating:5,comment:'The protocol comparison tables are excellent. The unit-wise notes shared on ERP are very clear.',                    date:'06 Jun 2025'},
]

export const APPROVALS = [
  {id:'APW-01',type:'Leave Application',    desc:'On-duty leave – NIT Trichy Alumni Association Meet',       date:'20–21 Jun 2025',    submittedOn:'13 Jun 2025',status:'Pending HoD',      urgent:false},
  {id:'APW-02',type:'Material Upload',      desc:'CN Lab Manual – Experiment 8 (Revised)',                   date:'14 Jun 2025',       submittedOn:'13 Jun 2025',status:'Pending HoD',      urgent:false},
  {id:'APW-03',type:'Research Travel Grant',desc:'ACM CCS 2025 – Paper Presentation, San Francisco, USA',   date:'14–18 Oct 2025',    submittedOn:'10 Jun 2025',status:'Pending Registrar', urgent:true},
  {id:'APW-04',type:'Condonation Request',  desc:'22CSE1A003 Chandrakumar R – Medical Condonation (6 days)',date:'06 Jun 2025',       submittedOn:'08 Jun 2025',status:'Approved',          urgent:false},
  {id:'APW-05',type:'Question Paper',       desc:'CS8591 CN – Unit IV Question Bank (50 Qs)',               date:'16 Jun 2025',       submittedOn:'12 Jun 2025',status:'Approved',          urgent:false},
]

export const TASKS = [
  {id:'T-01',title:'Submit CN CIA-II marks to Academic Section',     due:'18 Jun 2025',priority:'high',  done:false},
  {id:'T-02',title:'Upload OS Unit 4 notes to ERP',                  due:'16 Jun 2025',priority:'medium',done:false},
  {id:'T-03',title:'Review PRJ-04 (Anti-Cheating System) demo',      due:'17 Jun 2025',priority:'high',  done:false},
  {id:'T-04',title:'Evaluate CN Assignment 1 – remaining 13 scripts',due:'19 Jun 2025',priority:'high',  done:false},
  {id:'T-05',title:'Prepare NBA CO-PO attainment report for CN',     due:'25 Jun 2025',priority:'medium',done:false},
  {id:'T-06',title:'Register for NPTEL course – Sem 2 certification',due:'20 Jun 2025',priority:'low',   done:false},
  {id:'T-07',title:'Send parent communication for Naveen K (C013)',   due:'15 Jun 2025',priority:'high',  done:true},
  {id:'T-08',title:'Submit research travel grant application to R&D', due:'25 Jun 2025',priority:'medium',done:false},
]

export const SHARED_DOCS = [
  {id:'DOC-01',name:'CN Unit 1-3 Notes (Complete).pdf',          sharedWith:'III C1',        size:'4.2 MB',  date:'05 Jun 2025',type:'pdf'},
  {id:'DOC-02',name:'DBMS Lab Manual 2024-25.pdf',               sharedWith:'II C2',         size:'2.8 MB',  date:'02 Jun 2025',type:'pdf'},
  {id:'DOC-03',name:'OS Scheduling Algorithms – Practice Qs.docx',sharedWith:'III A1',       size:'890 KB',  date:'01 Jun 2025',type:'docx'},
  {id:'DOC-04',name:'CN Protocol Comparison Table.xlsx',          sharedWith:'III C1',        size:'320 KB',  date:'28 May 2025',type:'xlsx'},
  {id:'DOC-05',name:'DBMS CIA-II Question Bank.pdf',              sharedWith:'II C2',         size:'1.1 MB',  date:'24 May 2025',type:'pdf'},
  {id:'DOC-06',name:'Project Review Guidelines 2024-25.pdf',      sharedWith:'III C1, III A1',size:'560 KB',  date:'20 May 2025',type:'pdf'},
]

export const PARENT_COMMS = [
  {id:'PC-01',student:'Naveen K',    rollNo:'22CSE1C013',parent:'Mr. K. Suresh',    phone:'+91 98421 33002',date:'05 Jun 2025',mode:'Phone Call',topic:'Attendance shortfall (58%) – immediate improvement required',outcome:'Parent acknowledged — student to report daily'},
  {id:'PC-02',student:'Deepak M',    rollNo:'22CSE1C005',parent:'Mrs. M. Shanthi',  phone:'+91 98432 55011',date:'10 Jun 2025',mode:'ERP Message',topic:'Attendance warning (62%) and CIA performance',outcome:'Parent replied — will monitor from home'},
  {id:'PC-03',student:'Hemalatha S', rollNo:'22CSE1A008',parent:'Mr. S. Balamurugan',phone:'+91 94872 10034',date:'11 Jun 2025',mode:'Phone Call',topic:'Personal issues affecting attendance',outcome:'Referred to counseling cell with parent consent'},
  {id:'PC-04',student:'Gowtham R',   rollNo:'23CSE2C007',parent:'Mrs. R. Vasantha', phone:'+91 97899 22103',date:'04 Jun 2025',mode:'ERP Message',topic:'Low attendance (60%) in DBMS',outcome:'Parent informed — action pending'},
  {id:'PC-05',student:'Chandrakumar R',rollNo:'22CSE1A003',parent:'Mr. R. Chandran',phone:'+91 99421 87654',date:'09 Jun 2025',mode:'Phone Call',topic:'Medical condonation for 6 days absence',outcome:'Medical certificate collected — condonation approved'},
]
