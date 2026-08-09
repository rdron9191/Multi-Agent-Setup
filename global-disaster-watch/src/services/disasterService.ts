import { DisasterEvent, DisasterCategory, DisasterSeverity } from '../types/disaster';

const USGS_API_URL = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&minmagnitude=2.5&orderby=time&limit=60';
const NASA_EONET_URL = 'https://eonet.gsfc.nasa.gov/api/v3/events?status=open&limit=40';

export async function fetchAllDisasters(): Promise<DisasterEvent[]> {
  const events: DisasterEvent[] = [];

  try {
    const [usgsRes, eonetRes] = await Promise.allSettled([
      fetch(USGS_API_URL).then(res => res.json()),
      fetch(NASA_EONET_URL).then(res => res.json())
    ]);

    if (usgsRes.status === 'fulfilled' && usgsRes.value?.features) {
      const usgsEvents: DisasterEvent[] = usgsRes.value.features.map((item: any) => {
        const props = item.properties || {};
        const coords = item.geometry?.coordinates || [0, 0, 0];
        const mag = props.mag || 3.0;
        const tsunami = props.tsunami === 1;

        let severity: DisasterSeverity = 'minor';
        if (mag >= 7.0 || tsunami) severity = 'critical';
        else if (mag >= 5.5) severity = 'high';
        else if (mag >= 4.0) severity = 'moderate';

        return {
          id: `usgs-${item.id || Math.random()}`,
          title: props.title || `M ${mag} Earthquake`,
          category: 'earthquake',
          severity,
          latitude: coords[1],
          longitude: coords[0],
          locationName: props.place || 'Unknown Epicenter',
          timestamp: new Date(props.time || Date.now()).toISOString(),
          magnitude: mag,
          depthKm: Math.round(coords[2] || 10),
          tsunamiAlert: tsunami,
          source: 'USGS',
          url: props.url,
          affectedRadiusKm: Math.round(Math.pow(10, 0.43 * mag)),
          safetyAdvice: [
            'DROP, COVER, and HOLD ON under sturdy furniture.',
            'Stay away from glass, windows, and exterior walls.',
            tsunami ? 'TSUNAMI WARNING: Move inland and to higher ground immediately!' : 'Be prepared for potential aftershocks.'
          ]
        };
      });
      events.push(...usgsEvents);
    }

    if (eonetRes.status === 'fulfilled' && eonetRes.value?.events) {
      const eonetEvents: DisasterEvent[] = eonetRes.value.events.map((item: any) => {
        const catTitle = (item.categories?.[0]?.title || '').toLowerCase();
        let category: DisasterCategory = 'wildfire';
        if (catTitle.includes('wildfire') || catTitle.includes('fire')) category = 'wildfire';
        else if (catTitle.includes('storm') || catTitle.includes('cyclone') || catTitle.includes('hurricane')) category = 'storm';
        else if (catTitle.includes('flood')) category = 'flood';
        else if (catTitle.includes('volcano')) category = 'volcano';

        const geom = item.geometry?.[item.geometry.length - 1];
        const coords = geom?.coordinates || [0, 0];
        const lat = Array.isArray(coords) && typeof coords[1] === 'number' ? coords[1] : 0;
        const lng = Array.isArray(coords) && typeof coords[0] === 'number' ? coords[0] : 0;

        let severity: DisasterSeverity = 'moderate';
        if (category === 'wildfire') severity = 'high';
        if (category === 'storm') severity = 'critical';

        return {
          id: `eonet-${item.id}`,
          title: item.title || 'Natural Hazard Alert',
          category,
          severity,
          latitude: lat,
          longitude: lng,
          locationName: item.title || 'Global Incident Region',
          timestamp: geom?.date || new Date().toISOString(),
          source: 'NASA_EONET',
          description: item.description || `Active ${category} tracked by NASA Earth Observatory.`,
          url: item.sources?.[0]?.url,
          affectedRadiusKm: category === 'storm' ? 350 : 80,
          safetyAdvice: [
            'Monitor official local emergency broadcasts.',
            'Ensure evacuation routes and emergency supplies are ready.',
            'Follow instructions from local authorities.'
          ]
        };
      });
      events.push(...eonetEvents);
    }
  } catch (err) {
    console.warn('Network error fetching live API data, resorting to fallback dataset:', err);
  }

  if (events.length === 0) {
    events.push(...getMockDisasters());
  }

  return events;
}

function getMockDisasters(): DisasterEvent[] {
  const now = Date.now();
  return [
    {
      id: 'mock-1',
      title: 'M 7.2 Major Earthquake',
      category: 'earthquake',
      severity: 'critical',
      latitude: 35.6762,
      longitude: 139.6503,
      locationName: 'Tokyo Offshore Region, Japan',
      timestamp: new Date(now - 1000 * 60 * 35).toISOString(),
      magnitude: 7.2,
      depthKm: 24,
      tsunamiAlert: true,
      source: 'USGS',
      affectedRadiusKm: 280,
      safetyAdvice: [
        'TSUNAMI WARNING ACTIVE: Evacuate coastal areas immediately.',
        'Drop, Cover, and Hold On.',
        'Expect strong aftershocks over the next 24 hours.'
      ]
    },
    {
      id: 'mock-2',
      title: 'Category 4 Super Typhoon "Mawar"',
      category: 'storm',
      severity: 'critical',
      latitude: 13.4443,
      longitude: 144.7937,
      locationName: 'Guam & Western Pacific Ocean',
      timestamp: new Date(now - 1000 * 60 * 180).toISOString(),
      source: 'NASA_EONET',
      affectedRadiusKm: 450,
      description: 'Sustained winds over 230 km/h heading northwest with catastrophic storm surge risk.',
      safetyAdvice: [
        'Seek shelter in reinforced storm shelters.',
        'Board up windows and secure loose outdoor objects.',
        'Avoid low-lying flood-prone coastal regions.'
      ]
    },
    {
      id: 'mock-3',
      title: 'Wildfire Complex "Park Fire"',
      category: 'wildfire',
      severity: 'high',
      latitude: 39.7596,
      longitude: -121.6219,
      locationName: 'Butte County, California, USA',
      timestamp: new Date(now - 1000 * 60 * 420).toISOString(),
      source: 'NASA_EONET',
      affectedRadiusKm: 120,
      description: 'Spreading rapidly across dry timber terrain due to high gusting winds.',
      safetyAdvice: [
        'Evacuation orders active for northern zones.',
        'Keep N95 masks ready for toxic smoke inhalation.',
        'Prepare emergency go-bags immediately.'
      ]
    },
    {
      id: 'mock-4',
      title: 'Extreme Heatwave Alert (44°C Peak)',
      category: 'heatwave',
      severity: 'high',
      latitude: 37.9838,
      longitude: 23.7275,
      locationName: 'Attica Region, Athens, Greece',
      timestamp: new Date(now - 1000 * 60 * 720).toISOString(),
      source: 'OPEN_METEO',
      affectedRadiusKm: 200,
      description: 'Prolonged heat dome causing power grid strain and severe health risks.',
      safetyAdvice: [
        'Stay indoors during peak sunlight hours (11am - 4pm).',
        'Drink plenty of water and electrolyte fluids.',
        'Check on elderly neighbors and outdoor workers.'
      ]
    },
    {
      id: 'mock-5',
      title: 'Severe Riverine Flash Flooding',
      category: 'flood',
      severity: 'moderate',
      latitude: 27.7172,
      longitude: 85.3240,
      locationName: 'Bagmati Basin, Nepal',
      timestamp: new Date(now - 1000 * 60 * 960).toISOString(),
      source: 'NASA_EONET',
      affectedRadiusKm: 90,
      safetyAdvice: [
        'Never drive or walk through moving flood waters.',
        'Move to higher floors if trapped by rising waters.',
        'Boil drinking water before consumption.'
      ]
    }
  ];
}
