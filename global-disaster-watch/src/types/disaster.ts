export type DisasterCategory = 
  | 'earthquake' 
  | 'tsunami' 
  | 'wildfire' 
  | 'storm' 
  | 'flood' 
  | 'drought' 
  | 'landslide' 
  | 'volcano' 
  | 'heatwave';

export type DisasterSeverity = 'critical' | 'high' | 'moderate' | 'minor';

export interface DisasterEvent {
  id: string;
  title: string;
  category: DisasterCategory;
  severity: DisasterSeverity;
  latitude: number;
  longitude: number;
  locationName: string;
  timestamp: string;
  magnitude?: number;
  depthKm?: number;
  affectedRadiusKm?: number;
  description?: string;
  source: string;
  url?: string;
  tsunamiAlert?: boolean;
  safetyAdvice?: string[];
}
