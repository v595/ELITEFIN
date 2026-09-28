// ============================================================================
// EliteFin — Demo Lead Data (CRM Prototype)
// ----------------------------------------------------------------------------
// All names, phone numbers and details below are FICTIONAL, generated for
// demonstration purposes only. Do not treat as real customer information.
// ============================================================================

import type { Lead } from "../types";

const now = new Date();
function daysAgo(n: number): string {
  const d = new Date(now);
  d.setDate(d.getDate() - n);
  return d.toISOString();
}
function daysFromNow(n: number): string {
  const d = new Date(now);
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

export const demoLeads: Lead[] = [
  {
    id: crypto.randomUUID(), leadId: "EF-1001", name: "Rohan Mehta", mobile: "9876543201", email: "rohan.mehta@example.com",
    city: "Mumbai", employmentType: "Salaried", carType: "New Car", carModel: "Hyundai Creta", carPrice: 1450000,
    loanAmount: 1200000, tenure: "5 Years", preferredContact: "Call", status: "New", quality: "Hot",
    assignedTo: "Priya Sharma", createdAt: daysAgo(1), updatedAt: daysAgo(1), nextFollowUp: daysFromNow(0),
    notes: [{ id: crypto.randomUUID(), text: "Sample demo lead — interested in Creta SX variant.", createdAt: daysAgo(1) }],
  },
  {
    id: crypto.randomUUID(), leadId: "EF-1002", name: "Ananya Iyer", mobile: "9876543202", email: "ananya.iyer@example.com",
    city: "Bengaluru", employmentType: "Self Employed", carType: "Used Car", carModel: "Maruti Baleno (2021)", carPrice: 650000,
    loanAmount: 500000, tenure: "3 Years", preferredContact: "WhatsApp", status: "Contacted", quality: "Warm",
    assignedTo: "Arjun Nair", createdAt: daysAgo(2), updatedAt: daysAgo(1), lastCall: daysAgo(1), lastCallDuration: 184,
    nextFollowUp: daysFromNow(1),
    notes: [{ id: crypto.randomUUID(), text: "Sample demo lead — needs used car eligibility details.", createdAt: daysAgo(2) }],
  },
  {
    id: crypto.randomUUID(), leadId: "EF-1003", name: "Vikram Singh", mobile: "9876543203", email: "vikram.singh@example.com",
    city: "Delhi", employmentType: "Business Owner", carType: "New Car", carModel: "Tata Nexon EV", carPrice: 1650000,
    loanAmount: 1400000, tenure: "6 Years", preferredContact: "Call", status: "Interested", quality: "Hot",
    assignedTo: "Priya Sharma", createdAt: daysAgo(3), updatedAt: daysAgo(1), lastCall: daysAgo(1), lastCallDuration: 320,
    nextFollowUp: daysFromNow(0),
    notes: [{ id: crypto.randomUUID(), text: "Sample demo lead — comparing EV financing options.", createdAt: daysAgo(3) }],
  },
  {
    id: crypto.randomUUID(), leadId: "EF-1004", name: "Sneha Reddy", mobile: "9876543204", email: "sneha.reddy@example.com",
    city: "Hyderabad", employmentType: "Salaried", carType: "New Car", carModel: "Kia Seltos", carPrice: 1550000,
    loanAmount: 1300000, tenure: "5 Years", preferredContact: "Email", status: "Documents Pending", quality: "Warm",
    assignedTo: "Arjun Nair", createdAt: daysAgo(5), updatedAt: daysAgo(2), lastCall: daysAgo(2), lastCallDuration: 210,
    nextFollowUp: daysFromNow(2),
    notes: [{ id: crypto.randomUUID(), text: "Sample demo lead — awaiting income proof documents.", createdAt: daysAgo(5) }],
  },
  {
    id: crypto.randomUUID(), leadId: "EF-1005", name: "Karan Malhotra", mobile: "9876543205", email: "karan.m@example.com",
    city: "Chandigarh", employmentType: "Salaried", carType: "New Car", carModel: "Mahindra XUV700", carPrice: 2100000,
    loanAmount: 1800000, tenure: "7 Years", preferredContact: "Call", status: "Application In Progress", quality: "Hot",
    assignedTo: "Priya Sharma", createdAt: daysAgo(7), updatedAt: daysAgo(1), lastCall: daysAgo(1), lastCallDuration: 275,
    nextFollowUp: daysFromNow(1),
    notes: [{ id: crypto.randomUUID(), text: "Sample demo lead — lender application submitted.", createdAt: daysAgo(7) }],
  },
  {
    id: crypto.randomUUID(), leadId: "EF-1006", name: "Priyanka Das", mobile: "9876543206", email: "priyanka.das@example.com",
    city: "Kolkata", employmentType: "Self Employed", carType: "Used Car", carModel: "Honda City (2020)", carPrice: 850000,
    loanAmount: 650000, tenure: "4 Years", preferredContact: "WhatsApp", status: "Approved", quality: "Better",
    assignedTo: "Arjun Nair", createdAt: daysAgo(10), updatedAt: daysAgo(3), lastCall: daysAgo(3), lastCallDuration: 155,
    nextFollowUp: daysFromNow(3),
    notes: [{ id: crypto.randomUUID(), text: "Sample demo lead — approved, awaiting disbursal.", createdAt: daysAgo(10) }],
  },
  {
    id: crypto.randomUUID(), leadId: "EF-1007", name: "Arjun Kapoor", mobile: "9876543207", email: "arjun.kapoor@example.com",
    city: "Pune", employmentType: "Salaried", carType: "New Car", carModel: "Toyota Innova Crysta", carPrice: 2400000,
    loanAmount: 2000000, tenure: "6 Years", preferredContact: "Call", status: "Disbursed", quality: "Hot",
    assignedTo: "Priya Sharma", createdAt: daysAgo(15), updatedAt: daysAgo(5), lastCall: daysAgo(5), lastCallDuration: 410,
    notes: [{ id: crypto.randomUUID(), text: "Sample demo lead — loan disbursed successfully.", createdAt: daysAgo(15) }],
  },
  {
    id: crypto.randomUUID(), leadId: "EF-1008", name: "Meera Nair", mobile: "9876543208", email: "meera.nair@example.com",
    city: "Kochi", employmentType: "Salaried", carType: "Used Car", carModel: "Hyundai Venue (2022)", carPrice: 950000,
    loanAmount: 750000, tenure: "4 Years", preferredContact: "WhatsApp", status: "Follow-Up", quality: "Warm",
    assignedTo: "Arjun Nair", createdAt: daysAgo(4), updatedAt: daysAgo(2), lastCall: daysAgo(2), lastCallDuration: 90,
    nextFollowUp: daysFromNow(0),
    notes: [{ id: crypto.randomUUID(), text: "Sample demo lead — asked to call back next week.", createdAt: daysAgo(4) }],
  },
  {
    id: crypto.randomUUID(), leadId: "EF-1009", name: "Rahul Verma", mobile: "9876543209", email: "rahul.verma@example.com",
    city: "Jaipur", employmentType: "Business Owner", carType: "New Car", carModel: "MG Astor", carPrice: 1350000,
    loanAmount: 1100000, tenure: "5 Years", preferredContact: "Call", status: "Not Interested", quality: "Poor",
    assignedTo: "Priya Sharma", createdAt: daysAgo(12), updatedAt: daysAgo(8), lastCall: daysAgo(8), lastCallDuration: 45,
    notes: [{ id: crypto.randomUUID(), text: "Sample demo lead — decided to pay cash instead.", createdAt: daysAgo(12) }],
  },
  {
    id: crypto.randomUUID(), leadId: "EF-1010", name: "Divya Krishnan", mobile: "9876543210", email: "divya.k@example.com",
    city: "Chennai", employmentType: "Salaried", carType: "New Car", carModel: "Honda Elevate", carPrice: 1600000,
    loanAmount: 1350000, tenure: "5 Years", preferredContact: "Email", status: "Not Eligible", quality: "Poor",
    assignedTo: "Arjun Nair", createdAt: daysAgo(9), updatedAt: daysAgo(6), lastCall: daysAgo(6), lastCallDuration: 130,
    notes: [{ id: crypto.randomUUID(), text: "Sample demo lead — did not meet lender income criteria.", createdAt: daysAgo(9) }],
  },
  {
    id: crypto.randomUUID(), leadId: "EF-1011", name: "Aditya Joshi", mobile: "9876543211", email: "aditya.joshi@example.com",
    city: "Ahmedabad", employmentType: "Salaried", carType: "New Car", carModel: "Skoda Kushaq", carPrice: 1500000,
    loanAmount: 1250000, tenure: "5 Years", preferredContact: "Call", status: "Lost", quality: "Cold",
    assignedTo: "Priya Sharma", createdAt: daysAgo(20), updatedAt: daysAgo(15), lastCall: daysAgo(15), lastCallDuration: 60,
    notes: [{ id: crypto.randomUUID(), text: "Sample demo lead — went with another provider.", createdAt: daysAgo(20) }],
  },
  {
    id: crypto.randomUUID(), leadId: "EF-1012", name: "Ishita Bose", mobile: "9876543212", email: "ishita.bose@example.com",
    city: "Kolkata", employmentType: "Salaried", carType: "New Car", carModel: "Hyundai Venue", carPrice: 1150000,
    loanAmount: 950000, tenure: "4 Years", preferredContact: "WhatsApp", status: "New", quality: "Warm",
    assignedTo: "Arjun Nair", createdAt: daysAgo(0), updatedAt: daysAgo(0), nextFollowUp: daysFromNow(1),
    notes: [{ id: crypto.randomUUID(), text: "Sample demo lead — submitted enquiry via website.", createdAt: daysAgo(0) }],
  },
  {
    id: crypto.randomUUID(), leadId: "EF-1013", name: "Nikhil Rao", mobile: "9876543213", email: "nikhil.rao@example.com",
    city: "Bengaluru", employmentType: "Self Employed", carType: "Used Car", carModel: "Maruti Swift (2020)", carPrice: 550000,
    loanAmount: 420000, tenure: "3 Years", preferredContact: "Call", status: "Contacted", quality: "Warm",
    assignedTo: "Priya Sharma", createdAt: daysAgo(2), updatedAt: daysAgo(0), lastCall: daysAgo(0), lastCallDuration: 145,
    nextFollowUp: daysFromNow(2),
    notes: [{ id: crypto.randomUUID(), text: "Sample demo lead — comparing used car loan rates.", createdAt: daysAgo(2) }],
  },
  {
    id: crypto.randomUUID(), leadId: "EF-1014", name: "Pooja Agarwal", mobile: "9876543214", email: "pooja.agarwal@example.com",
    city: "Indore", employmentType: "Business Owner", carType: "New Car", carModel: "Tata Punch", carPrice: 950000,
    loanAmount: 800000, tenure: "4 Years", preferredContact: "WhatsApp", status: "Interested", quality: "Hot",
    assignedTo: "Arjun Nair", createdAt: daysAgo(1), updatedAt: daysAgo(0), lastCall: daysAgo(0), lastCallDuration: 200,
    nextFollowUp: daysFromNow(0),
    notes: [{ id: crypto.randomUUID(), text: "Sample demo lead — very keen, wants quick processing.", createdAt: daysAgo(1) }],
  },
  {
    id: crypto.randomUUID(), leadId: "EF-1015", name: "Siddharth Chatterjee", mobile: "9876543215", email: "sid.c@example.com",
    city: "Kolkata", employmentType: "Salaried", carType: "New Car", carModel: "Volkswagen Taigun", carPrice: 1700000,
    loanAmount: 1450000, tenure: "6 Years", preferredContact: "Call", status: "Documents Pending", quality: "Warm",
    assignedTo: "Priya Sharma", createdAt: daysAgo(6), updatedAt: daysAgo(2), lastCall: daysAgo(2), lastCallDuration: 165,
    nextFollowUp: daysFromNow(1),
    notes: [{ id: crypto.randomUUID(), text: "Sample demo lead — needs bank statements.", createdAt: daysAgo(6) }],
  },
  {
    id: crypto.randomUUID(), leadId: "EF-1016", name: "Neha Kulkarni", mobile: "9876543216", email: "neha.k@example.com",
    city: "Pune", employmentType: "Salaried", carType: "Used Car", carModel: "Hyundai i20 (2021)", carPrice: 700000,
    loanAmount: 550000, tenure: "3 Years", preferredContact: "Email", status: "Follow-Up", quality: "Cold",
    assignedTo: "Arjun Nair", createdAt: daysAgo(8), updatedAt: daysAgo(4), lastCall: daysAgo(4), lastCallDuration: 75,
    nextFollowUp: daysFromNow(4),
    notes: [{ id: crypto.randomUUID(), text: "Sample demo lead — asked to follow up next month.", createdAt: daysAgo(8) }],
  },
  {
    id: crypto.randomUUID(), leadId: "EF-1017", name: "Varun Thakur", mobile: "9876543217", email: "varun.thakur@example.com",
    city: "Lucknow", employmentType: "Salaried", carType: "New Car", carModel: "Maruti Grand Vitara", carPrice: 1350000,
    loanAmount: 1150000, tenure: "5 Years", preferredContact: "Call", status: "New", quality: "Hot",
    assignedTo: "Priya Sharma", createdAt: daysAgo(0), updatedAt: daysAgo(0), nextFollowUp: daysFromNow(0),
    notes: [{ id: crypto.randomUUID(), text: "Sample demo lead — urgent requirement, wants callback today.", createdAt: daysAgo(0) }],
  },
  {
    id: crypto.randomUUID(), leadId: "EF-1018", name: "Kavya Menon", mobile: "9876543218", email: "kavya.menon@example.com",
    city: "Kochi", employmentType: "Self Employed", carType: "New Car", carModel: "Kia Sonet", carPrice: 1050000,
    loanAmount: 850000, tenure: "4 Years", preferredContact: "WhatsApp", status: "Application In Progress", quality: "Warm",
    assignedTo: "Arjun Nair", createdAt: daysAgo(4), updatedAt: daysAgo(1), lastCall: daysAgo(1), lastCallDuration: 240,
    nextFollowUp: daysFromNow(2),
    notes: [{ id: crypto.randomUUID(), text: "Sample demo lead — self-employed income docs under review.", createdAt: daysAgo(4) }],
  },
  {
    id: crypto.randomUUID(), leadId: "EF-1019", name: "Manish Gupta", mobile: "9876543219", email: "manish.gupta@example.com",
    city: "Delhi", employmentType: "Salaried", carType: "Used Car", carModel: "Toyota Glanza (2021)", carPrice: 750000,
    loanAmount: 600000, tenure: "3 Years", preferredContact: "Call", status: "Approved", quality: "Better",
    assignedTo: "Priya Sharma", createdAt: daysAgo(11), updatedAt: daysAgo(4), lastCall: daysAgo(4), lastCallDuration: 190,
    nextFollowUp: daysFromNow(3),
    notes: [{ id: crypto.randomUUID(), text: "Sample demo lead — approved, scheduling disbursal call.", createdAt: daysAgo(11) }],
  },
  {
    id: crypto.randomUUID(), leadId: "EF-1020", name: "Tanvi Shah", mobile: "9876543220", email: "tanvi.shah@example.com",
    city: "Surat", employmentType: "Business Owner", carType: "New Car", carModel: "Jeep Compass", carPrice: 2200000,
    loanAmount: 1850000, tenure: "7 Years", preferredContact: "Call", status: "Interested", quality: "Hot",
    assignedTo: "Arjun Nair", createdAt: daysAgo(2), updatedAt: daysAgo(0), lastCall: daysAgo(0), lastCallDuration: 300,
    nextFollowUp: daysFromNow(1),
    notes: [{ id: crypto.randomUUID(), text: "Sample demo lead — comparing SUV financing tenure options.", createdAt: daysAgo(2) }],
  },
];
