import React, { useState } from 'react';
import { CITY_DISPATCH_DATA } from '../data/products';
import { MapPin, Clock, Truck, Building2, Check, ArrowRight } from 'lucide-react';
import { CityDispatch } from '../types';

interface CityLandingMatrixProps {
  onSelectCityFilter?: (cityName: string) => void;
}

export const CityLandingMatrix: React.FC<CityLandingMatrixProps> = ({ onSelectCityFilter }) => {
  const [selectedCity, setSelectedCity] = useState<CityDispatch>(CITY_DISPATCH_DATA[0]);

  return (
    <section id="city-dispatch" className="py-16 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-sky-400 bg-sky-950/40 border border-sky-500/30 px-3 py-1 rounded-full uppercase tracking-wider">
              <Truck className="w-3.5 h-3.5" />
              <span>Australia-Wide Express Studio Network</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white font-mono tracking-tight">
              Fast Capital City Dispatch & Delivery
            </h2>
            <p className="text-sm text-neutral-400">
              Same-day courier dispatch for Sydney, Melbourne, Brisbane, and Perth productions. Never hold up a film set or music video shoot.
            </p>
          </div>

          <div className="text-xs font-mono text-neutral-400 bg-neutral-900 px-4 py-2 rounded-xl border border-neutral-800 shrink-0">
            Current Fulfillment Status: <span className="text-emerald-400 font-bold">● Active Warehouse Dispatch</span>
          </div>
        </div>

        {/* City Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
          {CITY_DISPATCH_DATA.map((cityItem) => {
            const isSelected = selectedCity.city === cityItem.city;
            return (
              <button
                key={cityItem.city}
                type="button"
                onClick={() => setSelectedCity(cityItem)}
                className={`p-4 rounded-xl text-left transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-neutral-900 border-amber-400/80 shadow-lg shadow-amber-500/10'
                    : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-amber-400">
                    {cityItem.state}
                  </span>
                  <span className="text-[9px] font-mono text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30">
                    {cityItem.badge}
                  </span>
                </div>
                <div className="text-sm font-bold text-white font-mono">
                  {cityItem.city}
                </div>
                <div className="text-[11px] text-neutral-400 mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-neutral-500" />
                  <span>Express Transit</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected City Detail Hub Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>{selectedCity.city} Express Prop Logistics Matrix</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800">
                <span className="text-neutral-400 block text-[11px]">Express StarTrack / AusPost:</span>
                <span className="text-emerald-400 font-mono font-bold text-sm">{selectedCity.transitExpress}</span>
              </div>
              <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800">
                <span className="text-neutral-400 block text-[11px]">Primary Dispatch Logistics Hub:</span>
                <span className="text-white font-mono font-semibold">{selectedCity.hub}</span>
              </div>
            </div>
            <p className="text-xs text-neutral-300 italic pt-1">
              🎬 Production Note: {selectedCity.localStudioNote}
            </p>
          </div>

          <div className="shrink-0 w-full lg:w-auto">
            <a
              href="#catalog"
              className="w-full lg:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs font-mono transition-colors shadow-lg cursor-pointer"
            >
              <span>Order for {selectedCity.city} Delivery</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
