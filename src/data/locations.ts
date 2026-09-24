export interface DistrictData {
  name: string;
  defaultSoil: string;
  defaultWater: 'High' | 'Medium' | 'Low';
  latitude: number;
  longitude: number;
  benchmarkN: number;
  benchmarkP: number;
  benchmarkK: number;
  benchmarkPh: number;
}

export interface StateData {
  name: string;
  type: 'State' | 'UT';
  districts: DistrictData[];
}

export const INDIA_LOCATIONS: Record<string, StateData> = {
  "Andhra Pradesh": {
    name: "Andhra Pradesh",
    type: "State",
    districts: [
      { name: "Krishna", defaultSoil: "Alluvial", defaultWater: "High", latitude: 16.18, longitude: 81.13, benchmarkN: 85, benchmarkP: 45, benchmarkK: 48, benchmarkPh: 6.8 },
      { name: "Guntur", defaultSoil: "Black Soil", defaultWater: "High", latitude: 16.30, longitude: 80.44, benchmarkN: 75, benchmarkP: 42, benchmarkK: 55, benchmarkPh: 7.2 },
      { name: "Kurnool", defaultSoil: "Black Soil", defaultWater: "Medium", latitude: 15.82, longitude: 78.03, benchmarkN: 60, benchmarkP: 35, benchmarkK: 50, benchmarkPh: 7.4 },
      { name: "Anantapur", defaultSoil: "Red Soil", defaultWater: "Low", latitude: 14.68, longitude: 77.60, benchmarkN: 42, benchmarkP: 28, benchmarkK: 38, benchmarkPh: 6.4 },
      { name: "East Godavari", defaultSoil: "Alluvial", defaultWater: "High", latitude: 17.00, longitude: 82.23, benchmarkN: 90, benchmarkP: 48, benchmarkK: 45, benchmarkPh: 6.6 },
      { name: "West Godavari", defaultSoil: "Alluvial", defaultWater: "High", latitude: 16.71, longitude: 81.12, benchmarkN: 88, benchmarkP: 46, benchmarkK: 46, benchmarkPh: 6.7 },
      { name: "Chittoor", defaultSoil: "Red Soil", defaultWater: "Medium", latitude: 13.21, longitude: 79.10, benchmarkN: 50, benchmarkP: 32, benchmarkK: 42, benchmarkPh: 6.5 },
      { name: "Visakhapatnam", defaultSoil: "Red Loam", defaultWater: "Medium", latitude: 17.68, longitude: 83.21, benchmarkN: 55, benchmarkP: 36, benchmarkK: 40, benchmarkPh: 6.3 },
      { name: "Prakasam", defaultSoil: "Black Soil", defaultWater: "Medium", latitude: 15.50, longitude: 80.05, benchmarkN: 65, benchmarkP: 38, benchmarkK: 52, benchmarkPh: 7.1 },
      { name: "Nellore", defaultSoil: "Coastal Alluvial", defaultWater: "High", latitude: 14.44, longitude: 79.98, benchmarkN: 70, benchmarkP: 40, benchmarkK: 45, benchmarkPh: 6.9 }
    ]
  },
  "Arunachal Pradesh": {
    name: "Arunachal Pradesh",
    type: "State",
    districts: [
      { name: "Papum Pare", defaultSoil: "Forest Loam", defaultWater: "High", latitude: 27.12, longitude: 93.61, benchmarkN: 65, benchmarkP: 32, benchmarkK: 40, benchmarkPh: 5.8 },
      { name: "Changlang", defaultSoil: "Red Loam", defaultWater: "High", latitude: 27.15, longitude: 95.73, benchmarkN: 58, benchmarkP: 30, benchmarkK: 38, benchmarkPh: 5.6 },
      { name: "West Kameng", defaultSoil: "Mountain Soil", defaultWater: "Medium", latitude: 27.25, longitude: 92.42, benchmarkN: 52, benchmarkP: 28, benchmarkK: 36, benchmarkPh: 5.5 },
      { name: "East Siang", defaultSoil: "Alluvial", defaultWater: "High", latitude: 28.06, longitude: 95.33, benchmarkN: 72, benchmarkP: 38, benchmarkK: 42, benchmarkPh: 6.1 }
    ]
  },
  "Assam": {
    name: "Assam",
    type: "State",
    districts: [
      { name: "Kamrup", defaultSoil: "Alluvial", defaultWater: "High", latitude: 26.31, longitude: 91.59, benchmarkN: 82, benchmarkP: 40, benchmarkK: 44, benchmarkPh: 6.0 },
      { name: "Nagaon", defaultSoil: "Alluvial", defaultWater: "High", latitude: 26.34, longitude: 92.68, benchmarkN: 84, benchmarkP: 42, benchmarkK: 45, benchmarkPh: 6.2 },
      { name: "Jorhat", defaultSoil: "Acidic Alluvial", defaultWater: "High", latitude: 26.75, longitude: 94.22, benchmarkN: 70, benchmarkP: 35, benchmarkK: 48, benchmarkPh: 5.4 },
      { name: "Dibrugarh", defaultSoil: "Alluvial", defaultWater: "High", latitude: 27.47, longitude: 94.91, benchmarkN: 75, benchmarkP: 38, benchmarkK: 50, benchmarkPh: 5.5 },
      { name: "Cachar", defaultSoil: "Clayey Alluvial", defaultWater: "High", latitude: 24.83, longitude: 92.77, benchmarkN: 78, benchmarkP: 36, benchmarkK: 42, benchmarkPh: 5.7 }
    ]
  },
  "Bihar": {
    name: "Bihar",
    type: "State",
    districts: [
      { name: "Patna", defaultSoil: "Alluvial", defaultWater: "High", latitude: 25.60, longitude: 85.13, benchmarkN: 85, benchmarkP: 45, benchmarkK: 46, benchmarkPh: 7.2 },
      { name: "Gaya", defaultSoil: "Sandy Loam", defaultWater: "Medium", latitude: 24.79, longitude: 85.00, benchmarkN: 60, benchmarkP: 36, benchmarkK: 42, benchmarkPh: 6.9 },
      { name: "Muzaffarpur", defaultSoil: "Calcareous Alluvial", defaultWater: "High", latitude: 26.12, longitude: 85.39, benchmarkN: 80, benchmarkP: 42, benchmarkK: 45, benchmarkPh: 7.6 },
      { name: "Bhagalpur", defaultSoil: "Alluvial", defaultWater: "High", latitude: 25.24, longitude: 86.98, benchmarkN: 78, benchmarkP: 40, benchmarkK: 44, benchmarkPh: 7.1 },
      { name: "Rohtas", defaultSoil: "Heavy Clay Alluvial", defaultWater: "High", latitude: 24.95, longitude: 84.01, benchmarkN: 88, benchmarkP: 44, benchmarkK: 48, benchmarkPh: 7.0 }
    ]
  },
  "Chhattisgarh": {
    name: "Chhattisgarh",
    type: "State",
    districts: [
      { name: "Raipur", defaultSoil: "Red & Yellow (Matasi)", defaultWater: "Medium", latitude: 21.25, longitude: 81.63, benchmarkN: 62, benchmarkP: 34, benchmarkK: 40, benchmarkPh: 6.5 },
      { name: "Durg", defaultSoil: "Clay Loam (Kanhar)", defaultWater: "High", latitude: 21.19, longitude: 81.28, benchmarkN: 70, benchmarkP: 38, benchmarkK: 46, benchmarkPh: 7.0 },
      { name: "Bilaspur", defaultSoil: "Loamy Alluvial", defaultWater: "Medium", latitude: 22.08, longitude: 82.15, benchmarkN: 68, benchmarkP: 36, benchmarkK: 44, benchmarkPh: 6.7 },
      { name: "Bastar", defaultSoil: "Red Sandy", defaultWater: "Medium", latitude: 19.10, longitude: 81.95, benchmarkN: 48, benchmarkP: 26, benchmarkK: 36, benchmarkPh: 5.9 }
    ]
  },
  "Goa": {
    name: "Goa",
    type: "State",
    districts: [
      { name: "North Goa", defaultSoil: "Laterite", defaultWater: "High", latitude: 15.49, longitude: 73.82, benchmarkN: 55, benchmarkP: 28, benchmarkK: 38, benchmarkPh: 5.6 },
      { name: "South Goa", defaultSoil: "Laterite", defaultWater: "High", latitude: 15.28, longitude: 74.02, benchmarkN: 58, benchmarkP: 30, benchmarkK: 40, benchmarkPh: 5.5 }
    ]
  },
  "Gujarat": {
    name: "Gujarat",
    type: "State",
    districts: [
      { name: "Ahmedabad", defaultSoil: "Goradu (Sandy Loam)", defaultWater: "Medium", latitude: 23.02, longitude: 72.57, benchmarkN: 65, benchmarkP: 40, benchmarkK: 55, benchmarkPh: 7.6 },
      { name: "Surat", defaultSoil: "Deep Black Soil", defaultWater: "High", latitude: 21.17, longitude: 72.83, benchmarkN: 80, benchmarkP: 45, benchmarkK: 65, benchmarkPh: 7.8 },
      { name: "Rajkot", defaultSoil: "Medium Black Soil", defaultWater: "Low", latitude: 22.30, longitude: 70.80, benchmarkN: 52, benchmarkP: 32, benchmarkK: 58, benchmarkPh: 7.7 },
      { name: "Junagadh", defaultSoil: "Medium Black Soil", defaultWater: "Medium", latitude: 21.52, longitude: 70.45, benchmarkN: 60, benchmarkP: 38, benchmarkK: 60, benchmarkPh: 7.5 },
      { name: "Banaskantha", defaultSoil: "Sandy Loam", defaultWater: "Low", latitude: 24.17, longitude: 72.43, benchmarkN: 45, benchmarkP: 28, benchmarkK: 48, benchmarkPh: 7.9 }
    ]
  },
  "Haryana": {
    name: "Haryana",
    type: "State",
    districts: [
      { name: "Karnal", defaultSoil: "Alluvial Loam", defaultWater: "High", latitude: 29.68, longitude: 76.99, benchmarkN: 88, benchmarkP: 46, benchmarkK: 48, benchmarkPh: 7.5 },
      { name: "Hisar", defaultSoil: "Sandy Loam", defaultWater: "Medium", latitude: 29.15, longitude: 75.72, benchmarkN: 60, benchmarkP: 35, benchmarkK: 52, benchmarkPh: 7.8 },
      { name: "Ambala", defaultSoil: "Alluvial Clay Loam", defaultWater: "High", latitude: 30.37, longitude: 76.78, benchmarkN: 82, benchmarkP: 44, benchmarkK: 46, benchmarkPh: 7.3 },
      { name: "Sirsa", defaultSoil: "Sandy Loam", defaultWater: "Medium", latitude: 29.53, longitude: 75.03, benchmarkN: 55, benchmarkP: 32, benchmarkK: 50, benchmarkPh: 8.0 },
      { name: "Rohtak", defaultSoil: "Alluvial", defaultWater: "Medium", latitude: 28.89, longitude: 76.60, benchmarkN: 70, benchmarkP: 38, benchmarkK: 48, benchmarkPh: 7.6 }
    ]
  },
  "Himachal Pradesh": {
    name: "Himachal Pradesh",
    type: "State",
    districts: [
      { name: "Shimla", defaultSoil: "Brown Hill Soil", defaultWater: "Medium", latitude: 31.10, longitude: 77.17, benchmarkN: 48, benchmarkP: 35, benchmarkK: 45, benchmarkPh: 6.2 },
      { name: "Kangra", defaultSoil: "Sub-Montane Loam", defaultWater: "High", latitude: 32.10, longitude: 76.27, benchmarkN: 62, benchmarkP: 38, benchmarkK: 40, benchmarkPh: 6.0 },
      { name: "Kullu", defaultSoil: "Mountain Loam", defaultWater: "Medium", latitude: 31.95, longitude: 77.10, benchmarkN: 50, benchmarkP: 32, benchmarkK: 42, benchmarkPh: 6.1 },
      { name: "Mandi", defaultSoil: "Hill Soil", defaultWater: "Medium", latitude: 31.70, longitude: 76.93, benchmarkN: 56, benchmarkP: 34, benchmarkK: 40, benchmarkPh: 6.3 }
    ]
  },
  "Jharkhand": {
    name: "Jharkhand",
    type: "State",
    districts: [
      { name: "Ranchi", defaultSoil: "Red & Lateritic", defaultWater: "Medium", latitude: 23.34, longitude: 85.30, benchmarkN: 50, benchmarkP: 28, benchmarkK: 38, benchmarkPh: 5.8 },
      { name: "Hazaribagh", defaultSoil: "Red Sandy Loam", defaultWater: "Medium", latitude: 23.99, longitude: 85.36, benchmarkN: 48, benchmarkP: 26, benchmarkK: 36, benchmarkPh: 5.7 },
      { name: "East Singhbhum", defaultSoil: "Red Gravelly", defaultWater: "Medium", latitude: 22.80, longitude: 86.20, benchmarkN: 52, benchmarkP: 30, benchmarkK: 35, benchmarkPh: 5.6 }
    ]
  },
  "Karnataka": {
    name: "Karnataka",
    type: "State",
    districts: [
      { name: "Mysuru", defaultSoil: "Red Sandy Loam", defaultWater: "Medium", latitude: 12.29, longitude: 76.63, benchmarkN: 58, benchmarkP: 36, benchmarkK: 45, benchmarkPh: 6.6 },
      { name: "Mandya", defaultSoil: "Red Alluvial Loam", defaultWater: "High", latitude: 12.52, longitude: 76.89, benchmarkN: 82, benchmarkP: 45, benchmarkK: 48, benchmarkPh: 6.7 },
      { name: "Belagavi", defaultSoil: "Deep Black Soil", defaultWater: "Medium", latitude: 15.84, longitude: 74.49, benchmarkN: 72, benchmarkP: 42, benchmarkK: 58, benchmarkPh: 7.4 },
      { name: "Ballari", defaultSoil: "Black & Red Soil", defaultWater: "Low", latitude: 15.13, longitude: 76.92, benchmarkN: 54, benchmarkP: 30, benchmarkK: 52, benchmarkPh: 7.7 },
      { name: "Shivamogga", defaultSoil: "Lateritic Red", defaultWater: "High", latitude: 13.92, longitude: 75.56, benchmarkN: 65, benchmarkP: 35, benchmarkK: 44, benchmarkPh: 5.9 }
    ]
  },
  "Kerala": {
    name: "Kerala",
    type: "State",
    districts: [
      { name: "Palakkad", defaultSoil: "Black Alluvial", defaultWater: "High", latitude: 10.78, longitude: 76.65, benchmarkN: 80, benchmarkP: 42, benchmarkK: 46, benchmarkPh: 6.3 },
      { name: "Thrissur", defaultSoil: "Coastal Laterite", defaultWater: "High", latitude: 10.52, longitude: 76.21, benchmarkN: 70, benchmarkP: 35, benchmarkK: 44, benchmarkPh: 5.5 },
      { name: "Alappuzha", defaultSoil: "Coastal Sand & Peat", defaultWater: "High", latitude: 9.49, longitude: 76.33, benchmarkN: 75, benchmarkP: 38, benchmarkK: 42, benchmarkPh: 5.2 },
      { name: "Wayanad", defaultSoil: "Forest Laterite Loam", defaultWater: "High", latitude: 11.68, longitude: 76.13, benchmarkN: 60, benchmarkP: 32, benchmarkK: 48, benchmarkPh: 5.4 }
    ]
  },
  "Madhya Pradesh": {
    name: "Madhya Pradesh",
    type: "State",
    districts: [
      { name: "Indore", defaultSoil: "Medium Black Soil", defaultWater: "Medium", latitude: 22.71, longitude: 75.85, benchmarkN: 68, benchmarkP: 38, benchmarkK: 56, benchmarkPh: 7.5 },
      { name: "Bhopal", defaultSoil: "Deep Black Soil", defaultWater: "Medium", latitude: 23.25, longitude: 77.41, benchmarkN: 70, benchmarkP: 40, benchmarkK: 55, benchmarkPh: 7.4 },
      { name: "Ujjain", defaultSoil: "Black Cotton Soil", defaultWater: "Medium", latitude: 23.17, longitude: 75.78, benchmarkN: 72, benchmarkP: 42, benchmarkK: 58, benchmarkPh: 7.6 },
      { name: "Hoshangabad", defaultSoil: "Rich Alluvial Black", defaultWater: "High", latitude: 22.75, longitude: 77.72, benchmarkN: 85, benchmarkP: 46, benchmarkK: 52, benchmarkPh: 7.2 }
    ]
  },
  "Maharashtra": {
    name: "Maharashtra",
    type: "State",
    districts: [
      { name: "Nashik", defaultSoil: "Medium Black Soil", defaultWater: "Medium", latitude: 19.99, longitude: 73.78, benchmarkN: 65, benchmarkP: 42, benchmarkK: 58, benchmarkPh: 7.3 },
      { name: "Pune", defaultSoil: "Medium Black Loam", defaultWater: "Medium", latitude: 18.52, longitude: 73.85, benchmarkN: 62, benchmarkP: 40, benchmarkK: 54, benchmarkPh: 7.2 },
      { name: "Nagpur", defaultSoil: "Deep Black Cotton", defaultWater: "Medium", latitude: 21.14, longitude: 79.08, benchmarkN: 70, benchmarkP: 44, benchmarkK: 62, benchmarkPh: 7.6 },
      { name: "Ahmednagar", defaultSoil: "Medium Black Soil", defaultWater: "Low", latitude: 19.09, longitude: 74.74, benchmarkN: 54, benchmarkP: 34, benchmarkK: 56, benchmarkPh: 7.8 },
      { name: "Kolhapur", defaultSoil: "Reddish Brown Black", defaultWater: "High", latitude: 16.70, longitude: 74.24, benchmarkN: 82, benchmarkP: 48, benchmarkK: 50, benchmarkPh: 6.8 }
    ]
  },
  "Manipur": {
    name: "Manipur",
    type: "State",
    districts: [
      { name: "Imphal West", defaultSoil: "Alluvial Clay Loam", defaultWater: "High", latitude: 24.81, longitude: 93.93, benchmarkN: 70, benchmarkP: 35, benchmarkK: 40, benchmarkPh: 5.8 },
      { name: "Bishnupur", defaultSoil: "Peaty Alluvial", defaultWater: "High", latitude: 24.63, longitude: 93.75, benchmarkN: 75, benchmarkP: 36, benchmarkK: 42, benchmarkPh: 5.6 }
    ]
  },
  "Meghalaya": {
    name: "Meghalaya",
    type: "State",
    districts: [
      { name: "East Khasi Hills", defaultSoil: "Red Lateritic Loam", defaultWater: "High", latitude: 25.57, longitude: 91.88, benchmarkN: 60, benchmarkP: 30, benchmarkK: 42, benchmarkPh: 5.2 },
      { name: "Ri-Bhoi", defaultSoil: "Red Loam", defaultWater: "High", latitude: 25.90, longitude: 91.88, benchmarkN: 65, benchmarkP: 34, benchmarkK: 40, benchmarkPh: 5.5 }
    ]
  },
  "Mizoram": {
    name: "Mizoram",
    type: "State",
    districts: [
      { name: "Aizawl", defaultSoil: "Red & Yellow Hill Soil", defaultWater: "High", latitude: 23.72, longitude: 92.71, benchmarkN: 55, benchmarkP: 28, benchmarkK: 38, benchmarkPh: 5.4 },
      { name: "Lunglei", defaultSoil: "Hill Loam", defaultWater: "High", latitude: 22.88, longitude: 92.73, benchmarkN: 52, benchmarkP: 26, benchmarkK: 36, benchmarkPh: 5.3 }
    ]
  },
  "Nagaland": {
    name: "Nagaland",
    type: "State",
    districts: [
      { name: "Kohima", defaultSoil: "Forest Loam", defaultWater: "High", latitude: 25.67, longitude: 94.10, benchmarkN: 60, benchmarkP: 30, benchmarkK: 40, benchmarkPh: 5.6 },
      { name: "Dimapur", defaultSoil: "Alluvial Loam", defaultWater: "High", latitude: 25.90, longitude: 93.72, benchmarkN: 72, benchmarkP: 38, benchmarkK: 42, benchmarkPh: 6.0 }
    ]
  },
  "Odisha": {
    name: "Odisha",
    type: "State",
    districts: [
      { name: "Cuttack", defaultSoil: "Deltaic Alluvial", defaultWater: "High", latitude: 20.46, longitude: 85.87, benchmarkN: 82, benchmarkP: 42, benchmarkK: 44, benchmarkPh: 6.6 },
      { name: "Bargarh", defaultSoil: "Red & Black Loam", defaultWater: "High", latitude: 21.33, longitude: 83.61, benchmarkN: 84, benchmarkP: 44, benchmarkK: 48, benchmarkPh: 6.8 },
      { name: "Ganjam", defaultSoil: "Coastal Sand & Red Loam", defaultWater: "Medium", latitude: 19.38, longitude: 85.05, benchmarkN: 65, benchmarkP: 35, benchmarkK: 42, benchmarkPh: 6.5 },
      { name: "Sambalpur", defaultSoil: "Mixed Red & Black", defaultWater: "High", latitude: 21.46, longitude: 83.98, benchmarkN: 76, benchmarkP: 40, benchmarkK: 46, benchmarkPh: 6.7 }
    ]
  },
  "Punjab": {
    name: "Punjab",
    type: "State",
    districts: [
      { name: "Ludhiana", defaultSoil: "Alluvial Loam", defaultWater: "High", latitude: 30.90, longitude: 75.85, benchmarkN: 92, benchmarkP: 48, benchmarkK: 50, benchmarkPh: 7.4 },
      { name: "Amritsar", defaultSoil: "Coarse Alluvial", defaultWater: "High", latitude: 31.63, longitude: 74.87, benchmarkN: 88, benchmarkP: 45, benchmarkK: 48, benchmarkPh: 7.5 },
      { name: "Bathinda", defaultSoil: "Sandy Loam", defaultWater: "Medium", latitude: 30.21, longitude: 74.94, benchmarkN: 72, benchmarkP: 38, benchmarkK: 55, benchmarkPh: 7.8 },
      { name: "Patiala", defaultSoil: "Alluvial Clay", defaultWater: "High", latitude: 30.33, longitude: 76.38, benchmarkN: 86, benchmarkP: 46, benchmarkK: 48, benchmarkPh: 7.3 }
    ]
  },
  "Rajasthan": {
    name: "Rajasthan",
    type: "State",
    districts: [
      { name: "Jaipur", defaultSoil: "Sandy Loam", defaultWater: "Medium", latitude: 26.91, longitude: 75.78, benchmarkN: 52, benchmarkP: 34, benchmarkK: 48, benchmarkPh: 7.8 },
      { name: "Kota", defaultSoil: "Medium Black Soil", defaultWater: "High", latitude: 25.18, longitude: 75.83, benchmarkN: 75, benchmarkP: 42, benchmarkK: 56, benchmarkPh: 7.5 },
      { name: "Sri Ganganagar", defaultSoil: "Alluvial Sandy Loam", defaultWater: "High", latitude: 29.90, longitude: 73.87, benchmarkN: 78, benchmarkP: 42, benchmarkK: 52, benchmarkPh: 7.9 },
      { name: "Jodhpur", defaultSoil: "Arid Desert Sand", defaultWater: "Low", latitude: 26.23, longitude: 73.02, benchmarkN: 35, benchmarkP: 22, benchmarkK: 45, benchmarkPh: 8.2 },
      { name: "Bikaner", defaultSoil: "Desert Sand", defaultWater: "Low", latitude: 28.02, longitude: 73.31, benchmarkN: 32, benchmarkP: 20, benchmarkK: 42, benchmarkPh: 8.3 }
    ]
  },
  "Sikkim": {
    name: "Sikkim",
    type: "State",
    districts: [
      { name: "East Sikkim", defaultSoil: "Brown Forest Soil", defaultWater: "High", latitude: 27.33, longitude: 88.61, benchmarkN: 60, benchmarkP: 32, benchmarkK: 40, benchmarkPh: 5.6 },
      { name: "South Sikkim", defaultSoil: "Hill Loam", defaultWater: "High", latitude: 27.17, longitude: 88.35, benchmarkN: 58, benchmarkP: 30, benchmarkK: 38, benchmarkPh: 5.5 }
    ]
  },
  "Tamil Nadu": {
    name: "Tamil Nadu",
    type: "State",
    districts: [
      { name: "Thanjavur", defaultSoil: "Alluvial", defaultWater: "High", latitude: 10.78, longitude: 79.13, benchmarkN: 88, benchmarkP: 45, benchmarkK: 46, benchmarkPh: 6.8 },
      { name: "Coimbatore", defaultSoil: "Red Loam", defaultWater: "Medium", latitude: 11.01, longitude: 76.95, benchmarkN: 58, benchmarkP: 36, benchmarkK: 52, benchmarkPh: 7.2 },
      { name: "Madurai", defaultSoil: "Red & Black Soil", defaultWater: "Medium", latitude: 9.92, longitude: 78.11, benchmarkN: 62, benchmarkP: 38, benchmarkK: 48, benchmarkPh: 7.4 },
      { name: "Tiruchirappalli", defaultSoil: "Alluvial Red Loam", defaultWater: "High", latitude: 10.79, longitude: 78.70, benchmarkN: 78, benchmarkP: 42, benchmarkK: 46, benchmarkPh: 7.0 },
      { name: "Erode", defaultSoil: "Red Loam", defaultWater: "Medium", latitude: 11.34, longitude: 77.71, benchmarkN: 60, benchmarkP: 38, benchmarkK: 50, benchmarkPh: 7.1 }
    ]
  },
  "Telangana": {
    name: "Telangana",
    type: "State",
    districts: [
      { name: "Warangal", defaultSoil: "Red Loam (Chalka)", defaultWater: "Medium", latitude: 17.96, longitude: 79.59, benchmarkN: 62, benchmarkP: 36, benchmarkK: 44, benchmarkPh: 6.7 },
      { name: "Nizamabad", defaultSoil: "Deep Black Soil", defaultWater: "High", latitude: 18.67, longitude: 78.09, benchmarkN: 76, benchmarkP: 42, benchmarkK: 54, benchmarkPh: 7.3 },
      { name: "Karimnagar", defaultSoil: "Red & Black Loam", defaultWater: "Medium", latitude: 18.43, longitude: 79.12, benchmarkN: 68, benchmarkP: 38, benchmarkK: 48, benchmarkPh: 6.9 },
      { name: "Nalgonda", defaultSoil: "Red Sandy Loam", defaultWater: "Medium", latitude: 17.05, longitude: 79.26, benchmarkN: 55, benchmarkP: 32, benchmarkK: 42, benchmarkPh: 6.8 },
      { name: "Khammam", defaultSoil: "Black & Alluvial", defaultWater: "High", latitude: 17.24, longitude: 80.15, benchmarkN: 78, benchmarkP: 42, benchmarkK: 46, benchmarkPh: 7.1 }
    ]
  },
  "Tripura": {
    name: "Tripura",
    type: "State",
    districts: [
      { name: "West Tripura", defaultSoil: "Alluvial Loam", defaultWater: "High", latitude: 23.83, longitude: 91.28, benchmarkN: 72, benchmarkP: 35, benchmarkK: 40, benchmarkPh: 5.7 },
      { name: "South Tripura", defaultSoil: "Red Loam", defaultWater: "High", latitude: 23.23, longitude: 91.48, benchmarkN: 68, benchmarkP: 32, benchmarkK: 38, benchmarkPh: 5.5 }
    ]
  },
  "Uttar Pradesh": {
    name: "Uttar Pradesh",
    type: "State",
    districts: [
      { name: "Varanasi", defaultSoil: "Alluvial Loam", defaultWater: "High", latitude: 25.31, longitude: 82.97, benchmarkN: 84, benchmarkP: 44, benchmarkK: 45, benchmarkPh: 7.2 },
      { name: "Prayagraj", defaultSoil: "Alluvial", defaultWater: "High", latitude: 25.43, longitude: 81.84, benchmarkN: 82, benchmarkP: 42, benchmarkK: 44, benchmarkPh: 7.1 },
      { name: "Meerut", defaultSoil: "Sandy Clay Alluvial", defaultWater: "High", latitude: 28.98, longitude: 77.70, benchmarkN: 88, benchmarkP: 46, benchmarkK: 48, benchmarkPh: 7.4 },
      { name: "Gorakhpur", defaultSoil: "Tarai Alluvial", defaultWater: "High", latitude: 26.76, longitude: 83.37, benchmarkN: 85, benchmarkP: 42, benchmarkK: 44, benchmarkPh: 7.0 },
      { name: "Agra", defaultSoil: "Sandy Loam", defaultWater: "Medium", latitude: 27.17, longitude: 78.00, benchmarkN: 62, benchmarkP: 36, benchmarkK: 48, benchmarkPh: 7.7 }
    ]
  },
  "Uttarakhand": {
    name: "Uttarakhand",
    type: "State",
    districts: [
      { name: "Dehradun", defaultSoil: "Valley Alluvial Loam", defaultWater: "High", latitude: 30.31, longitude: 78.03, benchmarkN: 70, benchmarkP: 38, benchmarkK: 42, benchmarkPh: 6.5 },
      { name: "Udham Singh Nagar", defaultSoil: "Tarai Alluvial", defaultWater: "High", latitude: 28.97, longitude: 79.40, benchmarkN: 88, benchmarkP: 46, benchmarkK: 46, benchmarkPh: 7.1 },
      { name: "Nainital", defaultSoil: "Brown Forest Loam", defaultWater: "Medium", latitude: 29.38, longitude: 79.46, benchmarkN: 54, benchmarkP: 32, benchmarkK: 40, benchmarkPh: 6.2 }
    ]
  },
  "West Bengal": {
    name: "West Bengal",
    type: "State",
    districts: [
      { name: "Burdwan (Bardhaman)", defaultSoil: "Gangetic Alluvial", defaultWater: "High", latitude: 23.23, longitude: 87.86, benchmarkN: 90, benchmarkP: 48, benchmarkK: 46, benchmarkPh: 6.5 },
      { name: "Hooghly", defaultSoil: "Alluvial Clay Loam", defaultWater: "High", latitude: 22.89, longitude: 88.39, benchmarkN: 86, benchmarkP: 46, benchmarkK: 45, benchmarkPh: 6.6 },
      { name: "Nadia", defaultSoil: "Alluvial", defaultWater: "High", latitude: 23.47, longitude: 88.55, benchmarkN: 84, benchmarkP: 44, benchmarkK: 46, benchmarkPh: 6.8 },
      { name: "Murshidabad", defaultSoil: "Alluvial Loam", defaultWater: "High", latitude: 24.18, longitude: 88.27, benchmarkN: 82, benchmarkP: 42, benchmarkK: 44, benchmarkPh: 6.9 },
      { name: "North 24 Parganas", defaultSoil: "Coastal Saline Alluvial", defaultWater: "High", latitude: 22.71, longitude: 88.48, benchmarkN: 78, benchmarkP: 40, benchmarkK: 48, benchmarkPh: 7.3 }
    ]
  },
  // 8 UNION TERRITORIES
  "Andaman and Nicobar Islands": {
    name: "Andaman and Nicobar Islands",
    type: "UT",
    districts: [
      { name: "South Andaman", defaultSoil: "Coastal Marine Alluvial", defaultWater: "High", latitude: 11.62, longitude: 92.72, benchmarkN: 68, benchmarkP: 34, benchmarkK: 42, benchmarkPh: 6.0 },
      { name: "North and Middle Andaman", defaultSoil: "Red Loam", defaultWater: "High", latitude: 12.92, longitude: 92.92, benchmarkN: 62, benchmarkP: 32, benchmarkK: 40, benchmarkPh: 5.8 }
    ]
  },
  "Chandigarh": {
    name: "Chandigarh",
    type: "UT",
    districts: [
      { name: "Chandigarh", defaultSoil: "Alluvial Loam", defaultWater: "High", latitude: 30.73, longitude: 76.77, benchmarkN: 75, benchmarkP: 42, benchmarkK: 46, benchmarkPh: 7.3 }
    ]
  },
  "Dadra and Nagar Haveli and Daman and Diu": {
    name: "Dadra and Nagar Haveli and Daman and Diu",
    type: "UT",
    districts: [
      { name: "Dadra and Nagar Haveli", defaultSoil: "Medium Black Soil", defaultWater: "High", latitude: 20.26, longitude: 73.01, benchmarkN: 70, benchmarkP: 38, benchmarkK: 52, benchmarkPh: 7.2 },
      { name: "Daman", defaultSoil: "Coastal Alluvial", defaultWater: "High", latitude: 20.42, longitude: 72.83, benchmarkN: 65, benchmarkP: 36, benchmarkK: 45, benchmarkPh: 7.0 }
    ]
  },
  "Delhi": {
    name: "Delhi",
    type: "UT",
    districts: [
      { name: "North Delhi", defaultSoil: "Yamuna Alluvial", defaultWater: "High", latitude: 28.70, longitude: 77.10, benchmarkN: 76, benchmarkP: 40, benchmarkK: 44, benchmarkPh: 7.4 },
      { name: "South Delhi", defaultSoil: "Sandy Loam", defaultWater: "Medium", latitude: 28.53, longitude: 77.16, benchmarkN: 62, benchmarkP: 35, benchmarkK: 42, benchmarkPh: 7.5 }
    ]
  },
  "Jammu and Kashmir": {
    name: "Jammu and Kashmir",
    type: "UT",
    districts: [
      { name: "Srinagar", defaultSoil: "Karewa (Valley Silt/Loam)", defaultWater: "High", latitude: 34.08, longitude: 74.79, benchmarkN: 62, benchmarkP: 38, benchmarkK: 52, benchmarkPh: 6.5 },
      { name: "Jammu", defaultSoil: "Sub-Montane Alluvial", defaultWater: "High", latitude: 32.72, longitude: 74.85, benchmarkN: 78, benchmarkP: 42, benchmarkK: 46, benchmarkPh: 7.2 },
      { name: "Anantnag", defaultSoil: "Karewa Loam", defaultWater: "High", latitude: 33.73, longitude: 75.14, benchmarkN: 60, benchmarkP: 36, benchmarkK: 50, benchmarkPh: 6.4 },
      { name: "Baramulla", defaultSoil: "Hill & Valley Silt", defaultWater: "High", latitude: 34.19, longitude: 74.36, benchmarkN: 58, benchmarkP: 35, benchmarkK: 48, benchmarkPh: 6.3 }
    ]
  },
  "Ladakh": {
    name: "Ladakh",
    type: "UT",
    districts: [
      { name: "Leh", defaultSoil: "Cold Arid Sandy Loam", defaultWater: "Low", latitude: 34.15, longitude: 77.57, benchmarkN: 35, benchmarkP: 22, benchmarkK: 42, benchmarkPh: 7.9 },
      { name: "Kargil", defaultSoil: "Gravelly Sandy Loam", defaultWater: "Low", latitude: 34.55, longitude: 76.13, benchmarkN: 38, benchmarkP: 24, benchmarkK: 40, benchmarkPh: 7.8 }
    ]
  },
  "Lakshadweep": {
    name: "Lakshadweep",
    type: "UT",
    districts: [
      { name: "Kavaratti", defaultSoil: "Coral Sand & Organic", defaultWater: "High", latitude: 10.56, longitude: 72.64, benchmarkN: 50, benchmarkP: 25, benchmarkK: 35, benchmarkPh: 7.6 }
    ]
  },
  "Puducherry": {
    name: "Puducherry",
    type: "UT",
    districts: [
      { name: "Puducherry", defaultSoil: "Coastal Alluvial", defaultWater: "High", latitude: 11.94, longitude: 79.80, benchmarkN: 75, benchmarkP: 40, benchmarkK: 44, benchmarkPh: 7.0 },
      { name: "Karaikal", defaultSoil: "Deltaic Alluvial", defaultWater: "High", latitude: 10.92, longitude: 79.83, benchmarkN: 82, benchmarkP: 44, benchmarkK: 45, benchmarkPh: 7.1 }
    ]
  }
};
