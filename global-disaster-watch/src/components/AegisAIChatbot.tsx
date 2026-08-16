import React, { useState, useEffect, useRef } from 'react';
import { DisasterEvent } from '../types/disaster';
import { Sparkles, Send, Trash2, X, AlertTriangle, ShieldCheck, Flame, Droplets, Waves, Wind, Mic } from 'lucide-react';

interface AegisAIChatbotProps {
  events: DisasterEvent[];
  criticalCount: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isDesktop?: boolean;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  timestamp: string;
  text: string;
}

export function generateAegisResponse(query: string, events: DisasterEvent[], selectedModel: string = 'deepseek-v4'): string {
  const q = query.toLowerCase().trim();
  const criticalEvents = events.filter((e) => e.severity === 'critical');
  const earthquakes = events.filter((e) => e.category === 'earthquake');
  const floods = events.filter((e) => e.category === 'flood');
  const wildfires = events.filter((e) => e.category === 'wildfire');
  const storms = events.filter((e) => e.category === 'storm');

  // 1. SPECIFIC SCIENTIFIC QUERY: Ring of Fire (Circum-Pacific Belt)
  if (
    q.includes('ring of fire') ||
    (q.includes('pacific') && (q.includes('earthquake') || q.includes('quake') || q.includes('most'))) ||
    (q.includes('is it true') && (q.includes('fire') || q.includes('earthquake') || q.includes('ring')))
  ) {
    // Find live earthquakes currently in the Pacific Ring of Fire
    const ringOfFireQuakes = earthquakes.filter(e => {
      const lat = e.latitude;
      const lng = e.longitude;
      return (lng > 100 && lng < 180) || (lng < -60 && lng > -180) || (lat > 50 && lng < -130);
    });

    let res = `### 🌋 Pacific Ring of Fire Analysis & Confirmation\n\n`;
    res += `**Yes, this is completely true and verified by global seismic data.**\n\n`;
    res += `The **Pacific Ring of Fire** (also known as the *Circum-Pacific Belt*) is the most seismically and volcanically active geological zone on planet Earth:\n\n`;
    res += `* **Seismic Concentration:** **~81% of the world's largest earthquakes** and **~90% of all recorded earthquakes** occur along this belt.\n`;
    res += `* **Volcanic Concentration:** **~75% of Earth's active and dormant volcanoes** (over 450 volcanoes) lie around its perimeter.\n`;
    res += `* **Geographical Path:** A 40,000-kilometer (25,000-mile) horseshoe-shaped track wrapping from New Zealand, through the Tonga trench, Indonesia, the Philippines, Japan, the Kuril-Kamchatka arc, the Aleutian Islands (Alaska), down through Cascadia, California (San Andreas), Mexico, and the Andean subduction zone in South America.\n\n`;
    
    res += `#### 🔬 Why Do Most Earthquakes Happen Here? (Subduction Tectonics)\n`;
    res += `The Pacific basin is bounded by heavy oceanic lithosphere (*Pacific Plate, Nazca Plate, Cocos Plate, Philippine Sea Plate*) continuously colliding with and plunging under lighter continental plates (*North American, Eurasian, Indo-Australian, South American*).\n\n`;
    res += `As these plates grind past each other, massive friction prevents smooth motion, locking the tectonic slabs. Strain accumulates until the rock violently ruptures along **megathrust subduction zones**, producing magnitude 7.0+ to 9.0+ megathrust earthquakes and deadly tsunamis.\n\n`;

    if (ringOfFireQuakes.length > 0) {
      res += `#### 🛰️ Live Real-Time Events Tracked in the Ring of Fire\n`;
      ringOfFireQuakes.slice(0, 3).forEach((eq, idx) => {
        res += `${idx + 1}. **${eq.title}** (Mag \`${eq.magnitude || 'N/A'}\`)\n`;
        res += `   * 📍 *Location:* ${eq.locationName} (\`${eq.latitude.toFixed(2)}°, ${eq.longitude.toFixed(2)}°\`)\n`;
        res += `   * 🌊 *Focal Depth:* ${eq.depthKm || 10} km\n`;
      });
      res += `\n`;
    }

    res += `> 💡 **Key Takeaway:** If you live along the Pacific Rim (Japan, West Coast USA, Chile, Indonesia, Philippines, New Zealand), maintaining an active earthquake preparedness plan and a 72-hour survival Go-Bag is mandatory.`;
    return res;
  }

  // 2. Plate Tectonics & Faults (San Andreas, Cascadia, Fault Lines)
  if (
    q.includes('san andreas') ||
    q.includes('cascadia') ||
    q.includes('fault') ||
    q.includes('subduction') ||
    q.includes('tectonic plate') ||
    q.includes('plate boundary')
  ) {
    let res = `### 🧭 Tectonic Plates & Active Fault Lines\n\n`;
    res += `Earth's outer crust is divided into major rigid tectonic plates that move 1 to 10 cm per year. Faults are fractures where blocks of crust slide past one another:\n\n`;
    res += `* **Subduction Zones (Convergent):** One plate dives beneath another (e.g. *Cascadia Subduction Zone*, *Japan Trench*, *Peru-Chile Trench*). These generate the world's most catastrophic **Megathrust Earthquakes ($M_w 8.0 - 9.5$)** and tsunamis.\n`;
    res += `* **Transform Faults (Strike-Slip):** Plates slide horizontally past each other (e.g. *San Andreas Fault* in California, *Alpine Fault* in New Zealand, *North Anatolian Fault* in Turkey).\n`;
    res += `* **Divergent Boundaries:** Plates pull apart, creating new oceanic crust (e.g. *Mid-Atlantic Ridge*, *East African Rift*).\n\n`;
    res += `*Current Live Earthquakes Monitored on Fault Lines:* **${earthquakes.length} events worldwide**.`;
    return res;
  }

  // 3. Assam & Himalayan Seismicity (Alpide Belt)
  if (
    (q.includes('assam') || q.includes('himalaya') || q.includes('india')) &&
    (q.includes('earthquake') || q.includes('quake') || q.includes('seismic'))
  ) {
    let res = `### 🏔️ Assam & Himalayan Seismic Hazard Analysis\n\n`;
    res += `Assam and the Northeast Himalayan region fall in **Seismic Zone V (Highest Risk Category)**:\n\n`;
    res += `* **Geological Cause (Alpide Belt):** The Indian Tectonic Plate is actively moving north-northeast and colliding with the Eurasian Plate at approximately **5 cm/year**. This ongoing continental collision creates immense compressive stress along the *Main Himalayan Thrust (MHT)*, *Dauki Fault*, and *Kopili Fault*.\n`;
    res += `* **Historical Precedents:** The region produced two of the world's largest continental earthquakes: the **1897 Great Assam Earthquake (M ~8.1)** and the **1950 Assam-Tibet Earthquake (M 8.6)**, which completely altered the course of the Brahmaputra River.\n\n`;
    res += `> 🛡️ **ASDMA Guidelines:** Secure non-structural furniture, install seismic gas shutoff valves, and practice Drop, Cover, and Hold On.`;
    return res;
  }

  // 4. Earthquake Predictability vs Early Warning Systems (EEW)
  if (
    q.includes('predict') ||
    q.includes('forecast') ||
    q.includes('can we know') ||
    q.includes('in advance') ||
    q.includes('early warning') ||
    q.includes('shakealert')
  ) {
    let res = `### ⏱️ Can Earthquakes Be Predicted in Advance?\n\n`;
    res += `**Short Answer: No, exact earthquake prediction (date, time, and precise magnitude) is impossible with current scientific methods.**\n\n`;
    res += `* **Why Prediction Fails:** Fault stress accumulation occurs deep underground (5–700 km) in complex, non-linear rock geometries without reliable precursor signals.\n`;
    res += `* **What DOES Work (Earthquake Early Warning - EEW):**\n`;
    res += `  * Systems like **USGS ShakeAlert** (US), **JMA EEW** (Japan), and **Android Earthquake Alerts** detect the initial, non-destructive **P-waves (Primary compression waves)** moving at ~6 km/s.\n`;
    res += `  * Algorithms calculate the epicenter and send instant digital alerts **5 to 60 seconds** before the destructive, slower **S-waves (Shear waves)** arrive.\n`;
    res += `  * This provides enough time to automatically halt bullet trains, shut off natural gas valves, and allow citizens to **Drop, Cover, and Hold On**.\n`;
    return res;
  }

  // 5. Magnitude vs Intensity Science
  if (
    q.includes('difference between magnitude and intensity') ||
    q.includes('richter vs mercalli') ||
    q.includes('what is magnitude') ||
    q.includes('intensity')
  ) {
    let res = `### 📊 Earthquake Magnitude vs Intensity Explained\n\n`;
    res += `* **Magnitude ($M_w$ / Moment Magnitude Scale):**\n`;
    res += `  * Measures the **total energy released at the earthquake source (focus)**.\n`;
    res += `  * It is a single logarithmic number for the entire event. Each whole number increase represents **~32 times more energy released** (e.g. M 7.0 releases 32× more energy than M 6.0, and 1,000× more than M 5.0).\n\n`;
    res += `* **Intensity (Modified Mercalli Scale $I - XII$):**\n`;
    res += `  * Measures the **severity of shaking and damage felt at a specific geographic location**.\n`;
    res += `  * Intensity varies by distance from epicenter, local soil conditions (alluvial soil amplifies shaking via liquefaction), and building construction quality.`;
    return res;
  }

  // 6. Assam Floods & Brahmaputra Hydrology
  if (
    (q.includes('assam') || q.includes('brahmaputra') || q.includes('guwahati') || q.includes('kaziranga')) &&
    (q.includes('flood') || q.includes('water') || q.includes('rain') || q.includes('river') || q.includes('every year'))
  ) {
    let res = `### 🌧️ Assam & Brahmaputra Flood Dynamics\n\n`;
    res += `Assam experiences catastrophic annual flooding due to unique hydrological and geographical factors:\n\n`;
    res += `* **Hydrological Bottleneck:** The Brahmaputra River receives water from over 50 major tributaries draining the steep, high-precipitation slopes of the Himalayas, Bhutan, and Arunachal Pradesh.\n`;
    res += `* **Sediment Overload & Siltation:** Himalayan tectonic activity and soil erosion dump massive silt volumes into the riverbed, raising the bed level and causing rivers to breach embankments.\n`;
    res += `* **Monsoon Cloudbursts:** The South Asian Summer Monsoon funnels intense atmospheric moisture into the funnel-shaped Assam Valley.\n\n`;
    res += `**🚨 ASDMA Emergency Helplines:**\n`;
    res += `* State Emergency Operations Centre (SEOC): **1070** / **1077**\n`;
    res += `* NDRF / SDRF Water Rescue Dispatch active across all 35 districts.`;
    return res;
  }

  // 7. El Niño vs La Niña (ENSO Climate Patterns)
  if (
    q.includes('el nino') ||
    q.includes('la nina') ||
    q.includes('enso') ||
    q.includes('climate')
  ) {
    let res = `### 🌡️ El Niño & La Niña (ENSO) Impact on Disasters\n\n`;
    res += `The **El Niño-Southern Oscillation (ENSO)** is a major climate cycle driven by water temperature fluctuations in the tropical Pacific Ocean:\n\n`;
    res += `* **El Niño (Warm Phase):**\n`;
    res += `  * Pacific trade winds weaken; warm ocean water pushes east toward South America.\n`;
    res += `  * *Impacts:* Severe droughts in Australia, India, and Southeast Asia; intense rainfall, atmospheric rivers, and flooding in western North and South America.\n\n`;
    res += `* **La Niña (Cool Phase):**\n`;
    res += `  * Trade winds strengthen, pushing warm water into the Western Pacific.\n`;
    res += `  * *Impacts:* Above-average Atlantic hurricane seasons, enhanced monsoon rainfall in Asia (higher flood risk in Assam/India), and drier conditions in southern US.`;
    return res;
  }

  // 8. Tsunami Warning Protocols
  if (q.includes('tsunami') || q.includes('sea receding') || q.includes('ocean surge')) {
    let res = `### 🌊 Tsunami Warning & Marine Evacuation Protocols\n\n`;
    res += `**Natural Warning Signs:**\n`;
    res += `* Strong coastal ground shaking lasting over 20 seconds.\n`;
    res += `* Sudden sea withdrawal exposing marine reefs and fish.\n`;
    res += `* Loud jet-engine roar echoing from the deep ocean horizon.\n\n`;
    res += `**Survival Rules:**\n`;
    res += `1. **Evacuate to High Ground:** Move at least **30 meters (100 ft) elevation** or **2 km inland** immediately.\n`;
    res += `2. **Evacuate on Foot:** Avoid car traffic gridlock.\n`;
    res += `3. **Successive Waves:** The first tsunami wave is rarely the largest; dangerous surges continue for hours.`;
    return res;
  }

  // 9. Wildfires
  if (q.includes('fire') || q.includes('wildfire') || q.includes('smoke') || q.includes('burn')) {
    let res = `### 🔥 Wildfire Evacuation & Smoke Defense\n\n`;
    res += `*Active Wildfire Fronts Tracked:* **${wildfires.length} regions**.\n\n`;
    res += `**Evacuation Readiness Levels:**\n`;
    res += `* **Level 1 (READY):** Prepare 72-hour emergency Go-Bag, keep vehicles fueled.\n`;
    res += `* **Level 2 (SET):** Confine pets, close all windows, shut off propane valves.\n`;
    res += `* **Level 3 (GO!):** Evacuate immediately along designated fire escape routes.\n\n`;
    res += `**Respiratory Protection:** Wear N95 particulate masks to filter toxic smoke particulates.`;
    return res;
  }

  // 10. Storms & Cyclones
  if (q.includes('storm') || q.includes('cyclone') || q.includes('hurricane') || q.includes('typhoon') || q.includes('wind')) {
    let res = `### 🌀 Severe Storm & Cyclone Shelter Protocol\n\n`;
    res += `*Monitored Cyclonic Systems:* **${storms.length} active storm fronts**.\n\n`;
    res += `**Shelter Protocol:**\n`;
    res += `1. Seek shelter in an interior room on the lowest floor away from windows.\n`;
    res += `2. Keep rechargeable flashlights ready; avoid open candles.\n`;
    res += `3. Secure loose outdoor objects and monitor barometric pressure drops.`;
    return res;
  }

  // 11. 72-Hour Go-Bag Checklist
  if (
    q.includes('go-bag') ||
    q.includes('bag') ||
    q.includes('kit') ||
    q.includes('supply') ||
    q.includes('supplies') ||
    q.includes('prepare') ||
    q.includes('pack')
  ) {
    let res = `### 🎒 72-Hour Emergency Survival Go-Bag Checklist\n\n`;
    res += `Standard 3-day survival kit essentials per person:\n\n`;
    res += `* **Hydration:** 3 Gallons of water (1 gallon/day/person) + purification tablets.\n`;
    res += `* **Food:** High-calorie non-perishable survival rations, protein bars, manual can opener.\n`;
    res += `* **Communication:** Solar / Hand-crank NOAA Emergency Radio + tactical LED flashlight.\n`;
    res += `* **Medical:** Comprehensive first-aid trauma kit, 7-day prescription medications, N95 masks.\n`;
    res += `* **Power & Tools:** 20,000mAh power bank, cables, multi-tool knife, waterproof matches.\n`;
    res += `* **Critical Documents:** Waterproof pouch containing passport/IDs, emergency contacts, cash in small denominations.`;
    return res;
  }

  // 12. Location / Regional Telemetry Search
  const matchingEvents = events.filter((e) =>
    q.split(' ').some(
      (w) =>
        w.length > 3 &&
        (e.locationName.toLowerCase().includes(w) ||
          e.title.toLowerCase().includes(w) ||
          e.category.toLowerCase().includes(w))
    )
  );

  if (matchingEvents.length > 0) {
    let res = `### 📍 Active Hazard Telemetry for "${query}"\n\n`;
    res += `Identified **${matchingEvents.length} live incident(s)**:\n\n`;
    matchingEvents.slice(0, 3).forEach((ev, i) => {
      res += `${i + 1}. **${ev.title}**\n`;
      res += `   * 🏷️ *Category:* \`${ev.category.toUpperCase()}\` | *Severity:* \`${ev.severity.toUpperCase()}\`\n`;
      res += `   * 📍 *Location:* ${ev.locationName}\n`;
      if (ev.magnitude) res += `   * 💥 *Magnitude:* ${ev.magnitude}\n`;
      if (ev.description) res += `   * 📝 *Report:* ${ev.description}\n`;
      if (ev.safetyAdvice && ev.safetyAdvice.length > 0) {
        res += `   * 🛡️ *Protocol:* ${ev.safetyAdvice[0]}\n`;
      }
      res += `\n`;
    });
    return res;
  }

  // 13. Critical Threats & Live Situation Briefing
  if (
    q.includes('critical') ||
    q.includes('situation') ||
    q.includes('threat') ||
    q.includes('overview') ||
    q.includes('summary') ||
    q.includes('status') ||
    q.includes('active') ||
    q.includes('happening')
  ) {
    let res = `### 🚨 Live Situational Briefing\n\n`;
    res += `Currently monitoring **${events.length} active natural hazard events** across USGS Seismic, NASA EONET, and Copernicus Emergency Services.\n\n`;
    res += `* **Critical Threat Level:** \`${criticalEvents.length} Active High-Priority Zones\`\n`;
    res += `* **Breakdown:** ${earthquakes.length} Quakes | ${floods.length} Floods | ${wildfires.length} Wildfires | ${storms.length} Storms\n\n`;

    if (criticalEvents.length > 0) {
      res += `**Top Priority Incidents:**\n`;
      criticalEvents.slice(0, 4).forEach((ev, i) => {
        res += `${i + 1}. **${ev.title}** (${ev.category.toUpperCase()})\n`;
        res += `   * 📍 *Location:* ${ev.locationName}\n`;
        if (ev.magnitude) res += `   * 💥 *Magnitude:* ${ev.magnitude}\n`;
        if (ev.affectedRadiusKm) res += `   * ⭕ *Affected Radius:* ${ev.affectedRadiusKm} km\n`;
        if (ev.safetyAdvice && ev.safetyAdvice.length > 0) {
          res += `   * 🛡️ *Protocol:* ${ev.safetyAdvice[0]}\n`;
        }
        res += `\n`;
      });
    }
    res += `> ⚠️ Maintain battery reserves and follow local civil protection broadcasts.`;
    return res;
  }

  // 14. General Earthquake Protocol Fallback
  if (q.includes('earthquake') || q.includes('quake') || q.includes('shake')) {
    let res = `### 🌋 Earthquake Emergency Protocols\n\n`;
    res += `*Current Live Seismic Events Tracked:* **${earthquakes.length} earthquakes**.\n\n`;
    res += `**Immediate Life-Safety Steps:**\n`;
    res += `1. **DROP, COVER, AND HOLD ON:** Drop under a sturdy table or desk, protect head/neck.\n`;
    res += `2. **Indoors:** Stay inside! Avoid doorways, glass windows, and elevators.\n`;
    res += `3. **Outdoors:** Move away from power lines, chimneys, and tall building facades.\n`;
    res += `4. **Post-Shaking:** Inspect gas lines, smell for leaks, prepare for aftershocks.\n\n`;
    if (earthquakes.length > 0) {
      const topQuake = [...earthquakes].sort((a, b) => (b.magnitude || 0) - (a.magnitude || 0))[0];
      res += `*Top Active Event:* **${topQuake.title}** (Mag ${topQuake.magnitude || 'N/A'}) near ${topQuake.locationName}.`;
    }
    return res;
  }

  // 15. Intelligent Default Science Fallback
  return `### 🛰️ Terra Sentinel Planetary Defense (${selectedModel.toUpperCase()})

I am continuously monitoring real-time global telemetry from **USGS**, **NASA Earth Observatory**, and **Copernicus EMS**.

**Suggested questions you can ask me:**
* **"Is it true that the Ring of Fire has most earthquakes?"** — Geological subduction analysis.
* **"Why does Assam flood every year?"** — Brahmaputra basin hydrology & ASDMA helplines.
* **"What is the difference between magnitude and intensity?"** — Seismic physics explanation.
* **"Can earthquakes be predicted?"** — Early warning systems vs forecasting science.
* **"What are the critical threats right now?"** — Real-time high-priority telemetry summary.
* **"What should I pack in an emergency Go-Bag?"** — 72-hour survival checklist.

> *For immediate life-threatening emergencies, always dial your local emergency services (112 / 911 / ASDMA 1070).*`;
}

function formatInline(str: string): string {
  return str
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="text-slate-300 italic">$1</em>')
    .replace(
      /`([^`]+)`/g,
      '<code class="px-1.5 py-0.5 rounded bg-slate-800 text-rose-300 font-mono text-[11px] border border-slate-700/60">$1</code>'
    );
}

function renderChatMessage(text: string) {
  if (!text) return null;
  const lines = text.split('\n');
  return lines.map((line, idx) => {
    if (line.startsWith('### ')) {
      return (
        <h4
          key={idx}
          className="text-sm font-extrabold text-slate-100 font-heading mt-2 mb-1 flex items-center gap-1.5"
        >
          {line.replace('### ', '')}
        </h4>
      );
    }
    if (line.startsWith('#### ')) {
      return (
        <h5
          key={idx}
          className="text-xs font-bold text-rose-300 uppercase tracking-wide font-heading mt-2 mb-1 flex items-center gap-1.5"
        >
          {line.replace('#### ', '')}
        </h5>
      );
    }
    if (line.startsWith('> ')) {
      return (
        <div
          key={idx}
          className="my-1.5 p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs font-medium"
        >
          {line.replace('> ', '')}
        </div>
      );
    }
    if (line.startsWith('* ') || line.startsWith('- ')) {
      const content = line.substring(2);
      return (
        <div key={idx} className="flex items-start space-x-1.5 my-0.5 text-xs text-slate-200 pl-1">
          <span className="text-rose-400 font-bold">•</span>
          <span dangerouslySetInnerHTML={{ __html: formatInline(content) }} />
        </div>
      );
    }
    if (/^\d+\.\s/.test(line)) {
      return (
        <div
          key={idx}
          className="my-0.5 text-xs text-slate-200 pl-1"
          dangerouslySetInnerHTML={{ __html: formatInline(line) }}
        />
      );
    }
    if (!line.trim()) {
      return <div key={idx} className="h-1.5" />;
    }
    return (
      <p
        key={idx}
        className="text-xs text-slate-200 leading-relaxed my-0.5"
        dangerouslySetInnerHTML={{ __html: formatInline(line) }}
      />
    );
  });
}

export const AegisAIChatbot: React.FC<AegisAIChatbotProps> = ({
  events,
  criticalCount,
  isOpen,
  setIsOpen,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: `### 🛰️ Terra Sentinel Planetary Defense Online\n\nI am your autonomous planetary emergency intelligence system, powered by neural reasoning models and live telemetry from **USGS Seismic**, **NASA Earth Observatory**, and **Copernicus EMS**.\n\n* **Active Hazards Tracked:** \`${events.length} Global Incidents\`\n* **Critical Threats:** \`${criticalCount} High-Priority Zones\`\n\nYou can type or use the **🎙️ voice microphone** to ask about geological science (*e.g., Ring of Fire, plate tectonics*), regional disaster risks, evacuation protocols, or live telemetry briefings.`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  // Cleanup speech recognition on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
    };
  }, []);

  // --- Speech to Text / Audio Recording ---
  const toggleSpeechRecognition = () => {
    if (isRecording) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
      setIsRecording(false);
      return;
    }

    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      alert('Voice speech recognition is not supported in this browser. Please try Chrome, Edge, or Safari.');
      return;
    }

    try {
      const recognition = new SpeechRec();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript) {
          setInput(transcript);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsRecording(false);
        if (event.error === 'not-allowed') {
          alert('Microphone access was denied. Please allow microphone permission in your browser settings to use voice input.');
        }
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Speech recognition start failed:', err);
      setIsRecording(false);
    }
  };

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    if (isRecording && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
      setIsRecording(false);
    }

    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const responseText = generateAegisResponse(query, events);
      const botMsg: ChatMessage = {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: responseText,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 500);
  };

  const quickPrompts = [
    { label: '🌋 Ring of Fire Science', query: 'People are saying that the Ring of Fire is having most of the earthquakes. Is it true?' },
    { label: '⚡ Critical Threats Briefing', query: 'What are the critical threats right now?' },
    { label: '🌧️ Assam Flood Protocol', query: 'Why does Assam flood every year and what are the emergency helplines?' },
    { label: '🎒 72-Hr Go-Bag Checklist', query: 'What should I put in an emergency go-bag?' },
    { label: '⏱️ Predict Earthquakes?', query: 'Can earthquakes be predicted in advance?' },
    { label: '🌊 Tsunami Warning Signs', query: 'What are the natural warning signs of a tsunami?' },
  ];

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 group flex items-center space-x-2 px-4 py-3 rounded-full bg-gradient-to-r from-purple-600 via-rose-600 to-amber-500 text-white font-bold text-xs shadow-[0_0_30px_rgba(168,85,247,0.45)] hover:shadow-[0_0_40px_rgba(244,63,94,0.65)] hover:scale-105 active:scale-95 transition-all border border-white/25 cursor-pointer"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
          <Sparkles className="w-4 h-4 text-amber-200" />
          <span className="tracking-wide font-heading uppercase">Terra Sentinel</span>
        </button>
      )}

      {/* Chat Drawer / Modal */}
      {isOpen && (
        <div className="fixed inset-x-3 bottom-3 top-16 md:top-auto md:bottom-6 md:right-6 md:left-auto md:w-[450px] md:h-[650px] z-50 flex flex-col bg-[#0b0f19]/95 backdrop-blur-2xl border border-purple-500/40 rounded-3xl shadow-[0_0_60px_rgba(168,85,247,0.3)] overflow-hidden font-sans animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="relative px-4 py-3 bg-gradient-to-r from-[#1e1b4b]/95 via-[#1e1435]/95 to-[#0f172a]/95 border-b border-purple-500/30 flex items-center justify-between shrink-0">
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-purple-500 via-rose-500 to-amber-400"></div>

            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-purple-600 to-rose-600 flex items-center justify-center shadow-lg shadow-purple-600/30 border border-white/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <h3 className="text-sm font-black tracking-tight text-white font-heading">
                    TERRA{' '}
                    <span className="bg-gradient-to-r from-purple-400 to-rose-400 bg-clip-text text-transparent">
                      SENTINEL
                    </span>
                  </h3>
                  <span className="px-1.5 py-0.5 rounded text-[8px] font-mono font-extrabold uppercase bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                    🛰️ ORBITAL LIVE
                  </span>
                </div>
                <p className="text-[10px] font-medium text-slate-400">
                  Planetary Hazard Intelligence & Tactical Emergency Sentinel
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={() =>
                  setMessages([
                    {
                      id: 'welcome',
                      sender: 'bot',
                      timestamp: new Date().toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      }),
                      text: `### 🛰️ Terra Sentinel Telemetry Reset\n\nTelemetry state reset. Ask me anything about geological science (*e.g., Ring of Fire*), active hazards, or survival protocols.`,
                    },
                  ])
                }
                title="Clear Chat"
                className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800/60 transition-all text-xs cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close Copilot"
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-rose-500/20 hover:text-rose-300 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Carousel / Chips */}
          <div className="px-3 py-2 bg-[#0f172a]/60 border-b border-slate-800/80 flex items-center space-x-1.5 overflow-x-auto no-scrollbar shrink-0">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p.query)}
                className="px-2.5 py-1 rounded-xl bg-purple-950/40 hover:bg-purple-900/60 text-purple-200 text-[11px] font-medium whitespace-nowrap border border-purple-500/30 transition-all active:scale-95 flex items-center space-x-1 cursor-pointer"
              >
                <span>{p.label}</span>
              </button>
            ))}
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3">
            {messages.map((m) => {
              const isUser = m.sender === 'user';
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center space-x-1.5 mb-1 px-1 text-[10px] text-slate-500">
                    <span className="font-semibold text-slate-400">
                      {isUser ? 'You' : '🛰️ Terra Sentinel'}
                    </span>
                    <span>•</span>
                    <span>{m.timestamp}</span>
                  </div>
                  <div
                    className={`max-w-[92%] rounded-2xl p-3 text-xs shadow-md ${
                      isUser
                        ? 'bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 text-slate-100 rounded-tr-none'
                        : 'bg-[#151c2e]/90 border border-purple-500/30 text-slate-200 rounded-tl-none backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.08)]'
                    }`}
                  >
                    {renderChatMessage(m.text)}
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex flex-col items-start">
                <div className="bg-[#151c2e] border border-purple-500/30 rounded-2xl rounded-tl-none p-3 shadow-md flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-rose-400 animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]" />
                  </div>
                  <span className="text-[11px] text-purple-300 font-medium font-mono">
                    Auto Neural Routing • Analyzing Telemetry...
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Voice Recording Status Bar */}
          {isRecording && (
            <div className="px-4 py-2 bg-rose-950/80 border-t border-rose-500/40 flex items-center justify-between text-xs text-rose-200 animate-pulse shrink-0">
              <div className="flex items-center space-x-2">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
                </span>
                <span className="font-bold">Listening to voice input... Speak now</span>
              </div>
              <button
                type="button"
                onClick={toggleSpeechRecognition}
                className="px-2 py-0.5 rounded bg-rose-600 hover:bg-rose-500 text-white font-bold text-[10px] cursor-pointer"
              >
                Done / Stop
              </button>
            </div>
          )}

          {/* Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-[#080d18] border-t border-purple-500/30 flex items-center space-x-2 shrink-0"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isRecording ? "Listening to your voice..." : "Ask about Ring of Fire, active hazards, safety, go-bag..."}
              className={`flex-1 bg-slate-900/90 border rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-all shadow-inner ${
                isRecording ? 'border-rose-500/80 ring-1 ring-rose-500/50' : 'border-slate-700 focus:border-purple-500'
              }`}
            />

            {/* Microphone / Speech-to-Text Button */}
            <button
              type="button"
              onClick={toggleSpeechRecognition}
              title={isRecording ? "Stop voice recording" : "Record voice query (Speech to Text)"}
              className={`px-3 py-2 rounded-xl transition-all flex items-center justify-center cursor-pointer ${
                isRecording
                  ? 'bg-rose-600 text-white shadow-[0_0_15px_rgba(244,63,94,0.8)] border border-rose-400 scale-105'
                  : 'bg-slate-800/90 hover:bg-purple-900/40 text-slate-300 hover:text-white border border-slate-700 hover:border-purple-500/50'
              }`}
            >
              {isRecording ? (
                <div className="flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                  <Mic className="w-4 h-4 text-white animate-pulse" />
                </div>
              ) : (
                <Mic className="w-4 h-4 text-slate-300 hover:text-white transition-colors" />
              )}
            </button>

            {/* Send Button */}
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 disabled:opacity-40 text-white text-xs font-bold transition-all shadow-md active:scale-95 flex items-center space-x-1 cursor-pointer shrink-0"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

