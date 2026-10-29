"use client";

import { ArrowUpRight, MessageCircle, Phone, MapPin, Clock } from "lucide-react";

export default function AtelierConcierge() {
  return (
    <section id="contact" className="w-full bg-obsidian-deep text-ivory py-32 px-6 md:px-12 border-t border-champagne/15">
      <div className="max-w-5xl mx-auto">
        <div className="border border-champagne/30 rounded-3xl p-8 sm:p-14 md:p-20 bg-gradient-to-b from-obsidian to-obsidian-deep shadow-2xl relative overflow-hidden">
          {/* Subtle gold ambient glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-champagne/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7 space-y-6">
              <span className="text-[10px] uppercase tracking-ultra-wide text-champagne font-medium block">
                Private Client Services
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-ivory tracking-luxury uppercase leading-tight">
                Request a Private Consultation
              </h2>
              <p className="text-xs sm:text-sm text-ivory/70 font-light leading-relaxed max-w-lg">
                Whether commissioning a bespoke creation, tailoring an existing piece, or arranging a discreet viewing in Dubai, our private client directors are at your service.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <a
                  href="https://wa.me/971552315658?text=Hello%20Lumeire%20Jewellery%2C%20I%20would%20like%20to%20arrange%20a%20private%20consultation%20with%20your%20Dubai%20atelier."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-3 bg-champagne hover:bg-champagne-light text-obsidian text-xs font-medium tracking-luxury uppercase py-3.5 px-8 rounded-full transition-all duration-300 shadow-lg group"
                >
                  <MessageCircle className="w-4 h-4 text-obsidian" />
                  <span>Enquire via WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <a
                  href="tel:+971552315658"
                  className="inline-flex items-center justify-center space-x-2 border border-champagne/30 hover:border-champagne text-ivory hover:text-champagne text-xs font-light tracking-luxury uppercase py-3.5 px-6 rounded-full transition-all duration-300"
                >
                  <Phone className="w-3.5 h-3.5 text-champagne" />
                  <span>+971 55 231 5658</span>
                </a>
              </div>
            </div>

            {/* Atelier Details Column */}
            <div className="md:col-span-5 md:border-l md:border-champagne/20 md:pl-10 space-y-6 text-xs text-ivory/70 font-light">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
                <div>
                  <span className="text-ivory block font-medium uppercase tracking-wider text-[11px]">
                    Location
                  </span>
                  <span>Downtown Dubai / Private Atelier Viewings by Appointment</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
                <div>
                  <span className="text-ivory block font-medium uppercase tracking-wider text-[11px]">
                    Atelier Hours
                  </span>
                  <span>Monday – Saturday · 10:00 to 20:00 GST</span>
                </div>
              </div>

              <div className="pt-2 text-[10px] text-champagne/80 tracking-widest uppercase">
                Direct Courier Delivery across UAE, GCC & Worldwide
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
