import React from 'react';
import { STUDIO_REVIEWS } from '../data/products';
import { Star, ShieldCheck, Film, Clapperboard, Award, Sparkles } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-16 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
            <Clapperboard className="w-3.5 h-3.5" />
            <span>On-Set Industry Feedback</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white font-mono tracking-tight">
            Trusted by Australian Cinematographers & Art Departments
          </h2>
          <p className="text-sm text-neutral-400">
            From Sydney commercial soundstages to Melbourne underground hip-hop videos and Brisbane independent feature films.
          </p>
        </div>

        {/* 3 Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STUDIO_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between space-y-4 hover:border-neutral-700 transition-colors"
            >
              <div className="space-y-3">
                {/* Rating stars */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500">{rev.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                    <span>{rev.author}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" title="Verified Australian Studio Account" />
                  </div>
                  <div className="text-[11px] text-amber-400 font-mono">
                    {rev.role}
                  </div>
                  <div className="text-[10px] text-neutral-500">
                    {rev.project} • {rev.city}
                  </div>
                </div>

                <div className="w-9 h-9 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center text-neutral-500">
                  <Film className="w-4 h-4 text-amber-400/80" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Studio Production Logos Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-800/80 text-center">
          <span className="text-[11px] font-mono tracking-widest text-neutral-500 uppercase">
            Props Supplied for Major Australian Production Types:
          </span>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 mt-4 text-neutral-400 text-xs font-mono font-bold">
            <span className="hover:text-white transition-colors">FEATURE FILMS</span>
            <span className="text-neutral-700">•</span>
            <span className="hover:text-white transition-colors">STAN & NETFLIX ORIGINALS</span>
            <span className="text-neutral-700">•</span>
            <span className="hover:text-white transition-colors">ARIA-NOMINATED MUSIC VIDEOS</span>
            <span className="text-neutral-700">•</span>
            <span className="hover:text-white transition-colors">SYDNEY THEATRE COMPANY</span>
            <span className="text-neutral-700">•</span>
            <span className="hover:text-white transition-colors">NATIONAL TV COMMERCIALS</span>
          </div>
        </div>

      </div>
    </section>
  );
};
