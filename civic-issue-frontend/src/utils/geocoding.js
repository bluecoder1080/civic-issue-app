// Geocoding utilities for converting coordinates to readable addresses

/**
 * Reverse geocode coordinates to readable address using free Nominatim service
 * @param {number} latitude 
 * @param {number} longitude 
 * @returns {Promise<string|null>} Formatted address or null if failed
 */
export const reverseGeocode = async (latitude, longitude) => {
  try {
    // Using higher zoom level for more precision
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1&extratags=1`,
      {
        headers: {
          'User-Agent': 'CivicEye-App/1.0'
        }
      }
    );
    
    if (response.ok) {
      const data = await response.json();
      if (data && data.address) {
        // Extract meaningful location components with higher precision
        const address = data.address;
        const locationParts = [];
        
        // Add building/landmark information first for precision
        if (address.building) locationParts.push(address.building);
        else if (address.amenity) locationParts.push(address.amenity);
        else if (address.shop) locationParts.push(address.shop);
        else if (address.office) locationParts.push(address.office);
        
        // Add house number and road for street-level precision
        let streetInfo = '';
        if (address.house_number && address.road) {
          streetInfo = `${address.house_number} ${address.road}`;
        } else if (address.road) {
          streetInfo = address.road;
        }
        if (streetInfo) locationParts.push(streetInfo);
        
        // Add area/locality information
        if (address.suburb) locationParts.push(address.suburb);
        else if (address.neighbourhood) locationParts.push(address.neighbourhood);
        else if (address.residential) locationParts.push(address.residential);
        else if (address.quarter) locationParts.push(address.quarter);
        
        // Add city information
        if (address.city) locationParts.push(address.city);
        else if (address.town) locationParts.push(address.town);
        else if (address.village) locationParts.push(address.village);
        else if (address.municipality) locationParts.push(address.municipality);
        
        // Add state for context
        if (address.state) locationParts.push(address.state);
        
        // Return formatted location with better precision
        if (locationParts.length > 0) {
          // Limit to most relevant parts to avoid overly long addresses
          return locationParts.slice(0, 4).join(', ');
        } else {
          // Fallback to display_name but with better parsing
          const displayParts = data.display_name.split(',').map(part => part.trim());
          return displayParts.slice(0, 4).join(', ');
        }
      }
    }
  } catch (error) {
    console.log('Reverse geocoding failed:', error);
  }
  
  return null;
};

/**
 * Check if a location string appears to be coordinates
 * @param {string} location 
 * @returns {boolean}
 */
export const isCoordinateString = (location) => {
  if (!location) return false;
  
  // Check if string matches coordinate pattern (lat, lng)
  const coordinatePattern = /^-?\d+\.\d+,\s*-?\d+\.\d+$/;
  return coordinatePattern.test(location);
};

/**
 * Parse coordinate string to lat/lng object
 * @param {string} coordString 
 * @returns {object|null} {lat, lng} or null if invalid
 */
export const parseCoordinates = (coordString) => {
  if (!isCoordinateString(coordString)) return null;
  
  const [lat, lng] = coordString.split(',').map(coord => parseFloat(coord.trim()));
  return { lat, lng };
};

/**
 * Get precise location using multiple geocoding attempts
 * @param {number} latitude 
 * @param {number} longitude 
 * @returns {Promise<string|null>} Most precise address available
 */
export const getPreciseLocation = async (latitude, longitude) => {
  // Try multiple zoom levels for best precision
  const zoomLevels = [18, 16, 14]; // From most precise to less precise
  
  for (const zoom of zoomLevels) {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=${zoom}&addressdetails=1&extratags=1&namedetails=1`,
        {
          headers: {
            'User-Agent': 'CivicEye-App/1.0'
          }
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        if (data && data.address) {
          const preciseName = formatPreciseAddress(data.address, data.namedetails);
          if (preciseName && preciseName.length > 10) { // Ensure we got meaningful data
            return preciseName;
          }
        }
      }
    } catch (error) {
      console.log(`Geocoding failed at zoom ${zoom}:`, error);
      continue;
    }
  }
  
  return null;
};

/**
 * Format address with maximum precision
 * @param {object} address 
 * @param {object} namedetails 
 * @returns {string} Formatted precise address
 */
const formatPreciseAddress = (address, namedetails = {}) => {
  const parts = [];
  
  // Building/POI name with local language support
  if (namedetails?.name) parts.push(namedetails.name);
  else if (address.building) parts.push(address.building);
  else if (address.amenity) parts.push(address.amenity);
  else if (address.shop) parts.push(address.shop);
  else if (address.office) parts.push(address.office);
  
  // Precise street address
  if (address.house_number && address.road) {
    parts.push(`${address.house_number} ${address.road}`);
  } else if (address.road) {
    parts.push(address.road);
  }
  
  // Area/locality with preference for more specific
  if (address.suburb) parts.push(address.suburb);
  else if (address.neighbourhood) parts.push(address.neighbourhood);
  else if (address.residential) parts.push(address.residential);
  else if (address.quarter) parts.push(address.quarter);
  else if (address.hamlet) parts.push(address.hamlet);
  
  // City/town
  if (address.city) parts.push(address.city);
  else if (address.town) parts.push(address.town);
  else if (address.village) parts.push(address.village);
  
  // State for context
  if (address.state && !parts.some(part => part.includes(address.state))) {
    parts.push(address.state);
  }
  
  return parts.slice(0, 4).join(', ');
};

/**
 * Convert coordinate-based location to readable address
 * @param {string} location 
 * @returns {Promise<string>} Readable address or original location
 */
export const convertLocationToReadable = async (location) => {
  if (!location || !isCoordinateString(location)) {
    return location;
  }
  
  const coords = parseCoordinates(location);
  if (!coords) return location;
  
  // Try precise location first, fallback to regular geocoding
  let readableLocation = await getPreciseLocation(coords.lat, coords.lng);
  if (!readableLocation) {
    readableLocation = await reverseGeocode(coords.lat, coords.lng);
  }
  
  return readableLocation || location;
};
