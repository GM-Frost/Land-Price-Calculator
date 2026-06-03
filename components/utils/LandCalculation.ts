export const LAND_UNITS = {
  ROPANI: {
    label: 'Ropani',
    system: 'HILL',
    squareFeet: 5476,
    squareMeter: 508.73704704,
  },

  AANA: {
    label: 'Aana',
    system: 'HILL',
    squareFeet: 342.25,
    squareMeter: 31.79606544,
  },

  PAISA: {
    label: 'Paisa',
    system: 'HILL',
    squareFeet: 85.5625,
    squareMeter: 7.94901636,
  },

  DAAM: {
    label: 'Daam',
    system: 'HILL',
    squareFeet: 21.390625,
    squareMeter: 1.98725409,
  },

  BIGHA: {
    label: 'Bigha',
    system: 'TERAI',
    squareFeet: 72900,
    squareMeter: 6772.631616,
  },

  KATTHA: {
    label: 'Kattha',
    system: 'TERAI',
    squareFeet: 3645,
    squareMeter: 338.6315808,
  },

  DHUR: {
    label: 'Dhur',
    system: 'TERAI',
    squareFeet: 182.25,
    squareMeter: 16.93157904,
  },

  ACRE: {
    label: 'Acre',
    system: 'INTERNATIONAL',
    squareFeet: 43560,
    squareMeter: 4046.8564224,
  },

  HECTARE: {
    label: 'Hectare',
    system: 'INTERNATIONAL',
    squareFeet: 107639.1041671,
    squareMeter: 10000,
  },

  SQUARE_FEET: {
    label: 'Square Feet',
    system: 'BASE',
    squareFeet: 1,
    squareMeter: 0.09290304,
  },

  SQUARE_METER: {
    label: 'Square Meter',
    system: 'BASE',
    squareFeet: 10.76391041671,
    squareMeter: 1,
  },
} as const;

export const LAND_HIERARCHY = {
  ROPANI: {
    AANA: 16,
    PAISA: 64,
    DAAM: 256,
  },

  AANA: {
    PAISA: 4,
    DAAM: 16,
  },

  PAISA: {
    DAAM: 4,
  },

  BIGHA: {
    KATTHA: 20,
    DHUR: 400,
  },

  KATTHA: {
    DHUR: 20,
  },
};

export type LandUnitKey = keyof typeof LAND_UNITS;

export function convertLandUnit(
  value: number,
  fromUnit: LandUnitKey,
  toUnit: LandUnitKey
) {
  if (!Number.isFinite(value)) return 0;

  const sqft = value * LAND_UNITS[fromUnit].squareFeet;
  return sqft / LAND_UNITS[toUnit].squareFeet;
}

export function toSquareFeet(value: number, unit: LandUnitKey) {
  return convertLandUnit(value, unit, 'SQUARE_FEET');
}

export function toSquareMeter(value: number, unit: LandUnitKey) {
  return convertLandUnit(value, unit, 'SQUARE_METER');
}

export function calculateLandPrice(
  value: number,
  unit: LandUnitKey,
  pricePerUnit: number,
  priceUnit: LandUnitKey
) {
  const convertedValue = convertLandUnit(value, unit, priceUnit);
  return convertedValue * pricePerUnit;
}
