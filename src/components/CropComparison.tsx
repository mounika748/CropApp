import React, { useState } from 'react';
import { Layers, Trash2 } from 'lucide-react';
import { Crop, LanguageCode } from '../types';
import { CROPS_DATA } from '../data/crops';
import { getLocalizedCrop } from '../utils/cropLocalization';

interface CropComparisonProps {
  language: LanguageCode;
  initialCrops?: Crop[];
}

export const CropComparison: React.FC<CropComparisonProps> = ({ language, initialCrops }) => {
  const [selectedCropIds, setSelectedCropIds] = useState<string[]>(
    initialCrops && initialCrops.length >= 2
      ? initialCrops.slice(0, 3).map(c => c.id)
      : ['rice', 'wheat', 'cotton']
  );

  const availableCrops = CROPS_DATA;

  const handleAddCrop = (id: string) => {
    if (!selectedCropIds.includes(id) && selectedCropIds.length < 3) {
      setSelectedCropIds([...selectedCropIds, id]);
    }
  };

  const handleRemoveCrop = (id: string) => {
    if (selectedCropIds.length > 1) {
      setSelectedCropIds(selectedCropIds.filter(i => i !== id));
    }
  };

  const comparedCrops = selectedCropIds
    .map(id => availableCrops.find(c => c.id === id))
    .filter(Boolean) as Crop[];

  const labels = language === 'te' ? {
    title: 'పంటల సరిపోలిక పట్టిక',
    subtitle: 'పంటల పోషకాల అవసరాలు, నీటి లభ్యత, పంట కాలం మరియు వాతావరణ పరిస్థితులను పక్కపక్కనే సరిపోల్చుకోండి.',
    addToCompare: 'మరొక పంటను ఎంచుకోండి:',
    selectPlaceholder: 'పంటను ఎంచుకోండి...',
    metricHeader: 'వ్యవసాయ ప్రమాణాలు',
    category: 'వర్గం',
    season: 'సాగు కాలం',
    duration: 'పంట కాలం',
    waterDemand: 'నీటి అవసరం',
    optimalNpk: 'అనుకూల N-P-K (మి.గ్రా/కి.గ్రా)',
    optimalPh: 'అనుకూల పిహెచ్ పరిధి',
    temperature: 'ఉష్ణోగ్రత పరిధి',
    rainfall: 'వర్షపాతం సహనశీలత',
    soilTypes: 'అనుకూల నేలలు',
    majorStates: 'ప్రధాన సాగు రాష్ట్రాలు',
    nutrientStrategy: 'ఎరువుల వ్యూహం'
  } : language === 'hi' ? {
    title: 'फसल तुलना मैट्रिक्स',
    subtitle: 'पोषक तत्वों की मांग, जल स्तर, फसल अवधि एवं मौसमी दशाओं की परस्पर तुलना करें।',
    addToCompare: 'तुलना हेतु जोड़ें:',
    selectPlaceholder: 'फसल चुनें...',
    metricHeader: 'कृषि मानक',
    category: 'श्रेणी',
    season: 'बुवाई मौसम',
    duration: 'फसल चक्र अवधि',
    waterDemand: 'जल आवश्यकता',
    optimalNpk: 'आदर्श N-P-K (मि.ग्रा./किग्रा)',
    optimalPh: 'उपयुक्त पीएच स्तर',
    temperature: 'तापमान सीमा',
    rainfall: 'वर्षा सहनशीलता',
    soilTypes: 'उपयुक्त मिट्टी',
    majorStates: 'प्रमुख उत्पादक राज्य',
    nutrientStrategy: 'पोषक तत्व रणनीति'
  } : {
    title: 'Crop Comparison Matrix',
    subtitle: 'Compare nutrient requirements, moisture profiles, duration and climatic thresholds side-by-side.',
    addToCompare: 'Add to Compare:',
    selectPlaceholder: 'Select a crop...',
    metricHeader: 'Agronomic Metric',
    category: 'Category',
    season: 'Sowing Season',
    duration: 'Growing Cycle',
    waterDemand: 'Water Demand',
    optimalNpk: 'Optimal N-P-K (mg/kg)',
    optimalPh: 'Optimal pH Window',
    temperature: 'Temperature Range',
    rainfall: 'Rainfall Tolerance',
    soilTypes: 'Suitable Topsoils',
    majorStates: 'Key Producing States',
    nutrientStrategy: 'Nutrient Strategy'
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <Layers className="w-6 h-6 text-emerald-700" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-neutral-900 font-serif">
                {labels.title}
              </h2>
              <p className="text-xs text-neutral-600 mt-0.5">
                {labels.subtitle}
              </p>
            </div>
          </div>

          {/* Add Crop Dropdown if < 3 */}
          {selectedCropIds.length < 3 && (
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-neutral-600">{labels.addToCompare}</label>
              <select
                onChange={e => {
                  if (e.target.value) handleAddCrop(e.target.value);
                  e.target.value = '';
                }}
                className="px-3 py-1.5 rounded-lg border border-neutral-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="">{labels.selectPlaceholder}</option>
                {availableCrops
                  .filter(c => !selectedCropIds.includes(c.id))
                  .map(c => {
                    const loc = getLocalizedCrop(c.id, language);
                    return (
                      <option key={c.id} value={c.id}>
                        {loc.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[650px]">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50/80">
              <th className="p-4 text-xs font-bold text-neutral-500 uppercase tracking-wider w-1/4">
                {labels.metricHeader}
              </th>
              {comparedCrops.map(crop => {
                const loc = getLocalizedCrop(crop.id, language);

                return (
                  <th key={crop.id} className="p-4 text-left align-top">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-base font-black text-neutral-900 font-serif">
                          {loc.name}
                        </h3>
                        <p className="text-[11px] italic text-neutral-500 mt-0.5">{crop.scientificName}</p>
                      </div>
                      {comparedCrops.length > 1 && (
                        <button
                          onClick={() => handleRemoveCrop(crop.id)}
                          className="p-1 rounded text-neutral-400 hover:text-red-600 transition-colors"
                          title="Remove"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 text-xs text-neutral-800">
            <tr>
              <td className="p-4 font-bold text-neutral-700 bg-neutral-50/40">{labels.category}</td>
              {comparedCrops.map(crop => {
                const loc = getLocalizedCrop(crop.id, language);
                return (
                  <td key={crop.id} className="p-4 font-semibold">{loc.category}</td>
                );
              })}
            </tr>
            <tr>
              <td className="p-4 font-bold text-neutral-700 bg-neutral-50/40">{labels.season}</td>
              {comparedCrops.map(crop => {
                const loc = getLocalizedCrop(crop.id, language);
                return (
                  <td key={crop.id} className="p-4 font-semibold">{loc.season}</td>
                );
              })}
            </tr>
            <tr>
              <td className="p-4 font-bold text-neutral-700 bg-neutral-50/40">{labels.duration}</td>
              {comparedCrops.map(crop => (
                <td key={crop.id} className="p-4 font-semibold tabular-nums">{crop.durationDays}</td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-bold text-neutral-700 bg-neutral-50/40">{labels.waterDemand}</td>
              {comparedCrops.map(crop => {
                const loc = getLocalizedCrop(crop.id, language);
                return (
                  <td key={crop.id} className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      crop.waterRequirement === 'High' ? 'bg-sky-100 text-sky-800' :
                      crop.waterRequirement === 'Medium' ? 'bg-emerald-100 text-emerald-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {loc.waterRequirement}
                    </span>
                  </td>
                );
              })}
            </tr>
            <tr>
              <td className="p-4 font-bold text-neutral-700 bg-neutral-50/40">{labels.optimalNpk}</td>
              {comparedCrops.map(crop => (
                <td key={crop.id} className="p-4 font-semibold tabular-nums">
                  {crop.optimalN} : {crop.optimalP} : {crop.optimalK}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-bold text-neutral-700 bg-neutral-50/40">{labels.optimalPh}</td>
              {comparedCrops.map(crop => (
                <td key={crop.id} className="p-4 font-semibold tabular-nums">
                  {crop.optimalPh} ({crop.minPh} - {crop.maxPh})
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-bold text-neutral-700 bg-neutral-50/40">{labels.temperature}</td>
              {comparedCrops.map(crop => (
                <td key={crop.id} className="p-4 tabular-nums">
                  {crop.minTemp}°C - {crop.maxTemp}°C
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-bold text-neutral-700 bg-neutral-50/40">{labels.rainfall}</td>
              {comparedCrops.map(crop => (
                <td key={crop.id} className="p-4 tabular-nums">
                  {crop.minRainfall} - {crop.maxRainfall} mm
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-bold text-neutral-700 bg-neutral-50/40">{labels.soilTypes}</td>
              {comparedCrops.map(crop => (
                <td key={crop.id} className="p-4 text-xs text-neutral-700">
                  {crop.soilTypes.join(', ')}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-bold text-neutral-700 bg-neutral-50/40">{labels.majorStates}</td>
              {comparedCrops.map(crop => (
                <td key={crop.id} className="p-4 text-xs text-neutral-700">
                  {crop.majorStates.join(', ')}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-bold text-neutral-700 bg-neutral-50/40">{labels.nutrientStrategy}</td>
              {comparedCrops.map(crop => (
                <td key={crop.id} className="p-4 text-xs leading-relaxed text-neutral-600">
                  {crop.fertilizerNeeds}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
