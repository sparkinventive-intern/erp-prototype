export const HOSTEL_OCCUPANCY = [
  { name: 'Boys Hostel A', capacity: 480, occupied: 442, fill: '#10B981' },
  { name: 'Boys Hostel B', capacity: 640, occupied: 563, fill: '#10B981' },
  { name: 'Girls Hostel A', capacity: 420, occupied: 399, fill: '#10B981' },
  { name: 'Girls Hostel B', capacity: 360, occupied: 302, fill: '#10B981' },
]

export const ALLOCATIONS = [
  { id: '22CS101', name: 'Arjun Kumar', hostel: 'Boys A', room: 'A-203', bed: 'B2' },
  { id: '22AI045', name: 'Priya S', hostel: 'Girls A', room: 'G-112', bed: 'B1' },
  { id: '23EC092', name: 'Rahul V', hostel: 'Boys B', room: 'B-305', bed: 'B4' },
  { id: '24ME112', name: 'Karan M', hostel: 'Boys A', room: 'A-108', bed: 'B1' },
]

export const ROOMS = [
  { room: 'A-101', floor: 1, capacity: 4, occupied: 4 },
  { room: 'A-102', floor: 1, capacity: 4, occupied: 3 },
  { room: 'A-103', floor: 1, capacity: 4, occupied: 2 },
  { room: 'A-104', floor: 1, capacity: 2, occupied: 2 },
]

export const HOSTEL_FEES = [
  { student: 'Arjun Kumar', amount: '₹45,000', paid: '₹45,000', due: '₹0' },
  { student: 'Rahul V', amount: '₹45,000', paid: '₹20,000', due: '₹25,000' },
  { student: 'Priya S', amount: '₹55,000', paid: '₹55,000', due: '₹0' },
]

export const COMPLAINTS = [
  { id: 'CMP001', student: 'Arjun Kumar', category: 'Water Issue', status: 'Open' },
  { id: 'CMP002', student: 'Rahul V', category: 'WiFi Issue', status: 'Resolved' },
  { id: 'CMP003', student: 'Priya S', category: 'Electricity', status: 'In Progress' },
]

export const CHART_TOOLTIP = {
  contentStyle: { borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' },
  itemStyle: { fontSize: '12px', fontWeight: 600 },
  labelStyle: { fontSize: '11px', color: '#64748B', marginBottom: '4px' },
}
