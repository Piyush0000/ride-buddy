// src/utils/mapUtils.js

// Mock function to simulate getting coordinates from an address
export const geocodeAddress = async (address) => {
  // In a real app, this would call a geocoding API like Google Maps Geocoding API
  // Return mock coordinates for Delhi area
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        lat: 28.613939, // Latitude for Delhi
        lng: 77.209021  // Longitude for Delhi
      });
    }, 500);
  });
};

// Mock function to simulate getting address from coordinates
export const reverseGeocode = async (lat, lng) => {
  // In a real app, this would call a reverse geocoding API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('New Delhi, India');
    }, 500);
  });
};

// Mock function to simulate calculating distance between two points
export const calculateDistance = (point1, point2) => {
  // In a real app, this would use the Haversine formula or call a distance API
  // Return mock distance in kilometers
  return 15.5;
};

// Mock function to simulate getting directions
export const getDirections = async (origin, destination) => {
  // In a real app, this would call a directions API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        distance: '15.5 km',
        duration: '35 mins',
        steps: [
          'Head northeast on XYZ Road',
          'Turn left onto ABC Street',
          'Continue straight for 2 km',
          'Arrive at destination'
        ]
      });
    }, 1000);
  });
};

// Mock popular pickup locations for colleges in Delhi
export const popularPickupLocations = [
  'Delhi University North Campus',
  'Delhi University South Campus',
  'Jamia Millia Islamia',
  'Netaji Subhas University of Technology (NSUT)',
  'Indraprastha Institute of Information Technology (IIIT-D)',
  'Alliance University',
  'Ambedkar University Delhi',
  'Guru Gobind Singh Indraprastha University'
];

// Mock popular dropoff locations in Delhi
export const popularDropoffLocations = [
  'Connaught Place',
  'Saket',
  'Karol Bagh',
  'South Extension',
  'DLF Cyber City',
  'Nehru Place',
  'Lajpat Nagar',
  'Greater Kailash',
  'Defence Colony',
  'East of Kailash'
];