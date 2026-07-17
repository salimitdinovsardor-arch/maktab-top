import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Baby,
  BookOpen,
  Building2,
  GraduationCap,
  MapPin,
  Phone,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  Wallet,
} from "lucide-react";

const districts = [
  "Yunusobod",
  "Chilonzor",
  "Mirobod",
  "Mirzo Ulug'bek",
  "Yakkasaroy",
  "Sergeli",
  "Olmazor",
  "Uchtepa",
  "Yashnobod",
  "Shayxontohur",
];
const kindergartenNames = [
  "Quyoshcha Kids Garden",
  "Bilimdon Bolajon",
  "Happy Kids Academy",
  "Little Stars",
  "Zukko Nihol",
  "Rainbow Garden",
  "Smart Baby House",
  "Mitti Genius",
  "Kids Planet",
  "Mehrli Qo'llar",
];
const schoolNames = [
  "Future Leaders School",
  "Cambridge Modern School",
  "Al-Xorazmiy School",
  "Oxford Smart School",
  "Nurli Ziyo School",
  "International STEM School",
  "Temurbeklar Academy",
  "Grand Ta'lim School",
  "Discovery Private School",
  "Ziyo Nur Academy",
];
const kindergartenImages = [
  "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544776193-352d25ca82cd?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1604881991720-f91add269bed?q=80&w=900&auto=format&fit=crop",
];
const schoolImages = [
  "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=900&auto=format&fit=crop",
];
const kindergartenFeatures = [
  ["2-6 yosh", "Ingliz tili", "3 mahal ovqat"],
  ["Logoped", "Raqs", "Shifokor"],
  ["STEAM", "Sport", "Psixolog"],
  ["Montessori", "Suzish", "Rus tili"],
];
const schoolFeatures = [
  ["1-11 sinf", "IELTS", "IT sinflar"],
  ["Cambridge", "Laboratoriya", "Debat"],
  ["Matematika", "Dasturlash", "Olimpiada"],
  ["Kichik sinflar", "Speaking", "Kutubxona"],
];

const places = [
  ...kindergartenNames.map((name, index) => ({
    id: `bogcha-${index + 1}`,
    type: "bogcha",
    name,
    district: districts[index],
    address: `${districts[index]} tumani, ${12 + index}-mavze, ${24 + index * 3}-uy`,
    phone: `+998 9${index % 8} ${110 + index} ${20 + index} ${String(index + 1).padStart(2, "0")}`,
    price: 1300000 + index * 120000,
    rating: (4.5 + (index % 5) * 0.1).toFixed(1),
    image: kindergartenImages[index % kindergartenImages.length],
    features: kindergartenFeatures[index % kindergartenFeatures.length],
  })),
  ...schoolNames.map((name, index) => ({
    id: `maktab-${index + 1}`,
    type: "maktab",
    name,
    district: districts[index],
    address: `${districts[index]} tumani, Ta'lim ko'chasi, ${30 + index * 4}-uy`,
    phone: `+998 9${(index + 2) % 8} ${550 + index} ${30 + index} ${String(index + 11).padStart(2, "0")}`,
    price: 2600000 + index * 210000,
    rating: (4.6 + (index % 4) * 0.1).toFixed(1),
    image: schoolImages[index % schoolImages.length],
    features: schoolFeatures[index % schoolFeatures.length],
  })),
];

const filterButtons = [
  { label: "Barchasi", value: "all", icon: Building2 },
  { label: "Bog'cha", value: "bogcha", icon: Baby },
  { label: "Maktablar", value: "maktab", icon: GraduationCap },
];
const MIN_PRICE = 1000000;
const MAX_PRICE = 10000000;
const PRICE_STEP = 100000;

const formatPrice = (amount) =>
  `${new Intl.NumberFormat("uz-UZ").format(amount)} so'm / oy`;
const formatCompactPrice = (amount) =>
  `${new Intl.NumberFormat("uz-UZ").format(amount)} so'm`;
const clampPrice = (amount) =>
  Math.min(MAX_PRICE, Math.max(MIN_PRICE, Number(amount) || MIN_PRICE));

export default function HomePage() {
  const [activeType, setActiveType] = useState("all");
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState(MIN_PRICE);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);

  const updateMinPrice = (value) => {
    const nextPrice = Math.min(clampPrice(value), maxPrice);
    setMinPrice(nextPrice);
  };

  const updateMaxPrice = (value) => {
    const nextPrice = Math.max(clampPrice(value), minPrice);
    setMaxPrice(nextPrice);
  };

  const resetPriceFilter = () => {
    setMinPrice(MIN_PRICE);
    setMaxPrice(MAX_PRICE);
  };

  const filteredPlaces = useMemo(() => {
    const query = search.trim().toLowerCase();
    return places.filter((place) => {
      const matchesType = activeType === "all" || place.type === activeType;
      const matchesPrice = place.price >= minPrice && place.price <= maxPrice;
      const matchesSearch =
        !query ||
        place.name.toLowerCase().includes(query) ||
        place.district.toLowerCase().includes(query) ||
        place.address.toLowerCase().includes(query);
      return matchesType && matchesPrice && matchesSearch;
    });
  }, [activeType, maxPrice, minPrice, search]);

  return (
    <main className="min-h-screen bg-[#f7f8f3] text-slate-950">
      <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f7f8f3]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-slate-950 text-white">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <p className="text-base font-black leading-none">EduTop</p>
              <p className="text-xs font-semibold text-slate-500">
                Bog'cha va maktablar katalogi
              </p>
            </div>
          </div>
          <a
            href="tel:+998901234567"
            className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold shadow-sm transition hover:border-slate-300 sm:flex"
          >
            <Phone className="h-4 w-4 text-emerald-600" />
            +998 90 123 45 67
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden bg-slate-950 text-white">
        <img
          src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?q=80&w=1600&auto=format&fit=crop"
          alt="Zamonaviy ta'lim maskani"
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/80 to-slate-950/20" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-xs font-bold backdrop-blur">
              <Sparkles className="h-4 w-4 text-amber-300" />
              10 ta bog'cha va 10 ta maktab bir joyda
            </div>
            <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Farzandingiz uchun mos ta'lim maskanini tanlang
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-200">
              Narx, telefon raqami va manzil bilan tayyor katalog. Bog'cha yoki
              maktablarni bitta tugma orqali saralab ko'ring.
            </p>
          </div>
          <div className="grid content-end gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <InfoCard count="20" label="jami ta'lim maskani" />
            <InfoCard count="10" label="bog'chalar" />
            <InfoCard count="10" label="maktablar" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-4 rounded-lg border border-slate-200 bg-white p-3 shadow-sm lg:grid-cols-[1fr_auto]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Nomi, tumani yoki manzili bo'yicha qidiring..."
              className="h-12 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm font-semibold outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {filterButtons.map((button) => {
              const Icon = button.icon;
              const isActive = activeType === button.value;
              return (
                <button
                  key={button.value}
                  onClick={() => setActiveType(button.value)}
                  className={`flex h-12 items-center justify-center gap-2 rounded-lg px-3 text-sm font-black transition ${isActive ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{button.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="mt-4 grid gap-4 rounded-lg border border-slate-200 bg-white p-3 shadow-sm lg:grid-cols-[auto_1fr_auto] lg:items-center">
          <div className="flex items-center gap-2 text-sm font-black text-slate-800">
            <SlidersHorizontal className="h-5 w-5 text-emerald-600" />
            Narx filtri
          </div>
          <div className="grid gap-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold uppercase tracking-wide text-slate-500">
              <span>Minimal: {"1,000,000 so'm"}</span>
              <span>Maksimal: {formatCompactPrice(maxPrice)}</span>
            </div>
            <div className="relative h-8">
              <div className="absolute left-0 right-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-slate-200" />
              <div
                className="absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-emerald-500"
                style={{
                  left: `${((minPrice - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100}%`,
                  right: `${100 - ((maxPrice - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100}%`,
                }}
              />
              <input
                aria-label="Minimal narx"
                type="range"
                min={MIN_PRICE}
                max={MAX_PRICE}
                step={PRICE_STEP}
                value={minPrice}
                onChange={(event) => updateMinPrice(event.target.value)}
                className="price-range price-range-min"
              />
              <input
                aria-label="Maksimal narx"
                type="range"
                min={MIN_PRICE}
                max={MAX_PRICE}
                step={PRICE_STEP}
                value={maxPrice}
                onChange={(event) => updateMaxPrice(event.target.value)}
                className="price-range"
              />
            </div>
            <div className="flex items-center justify-between text-xs font-black text-slate-400">
              <span>{formatCompactPrice(MIN_PRICE)}</span>
              <span>{formatCompactPrice(MAX_PRICE)}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={resetPriceFilter}
            className="h-11 rounded-lg bg-slate-100 px-4 text-sm font-black text-slate-700 transition hover:bg-slate-200"
          >
            Tozalash
          </button>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-2 text-sm font-bold text-slate-600">
          <span className="rounded-lg bg-white px-3 py-2 shadow-sm">
            Barchasi: 20
          </span>
          <span className="rounded-lg bg-white px-3 py-2 shadow-sm">
            Bog'cha: 10
          </span>
          <span className="rounded-lg bg-white px-3 py-2 shadow-sm">
            Maktablar: 10
          </span>
          <span className="rounded-lg bg-amber-100 px-3 py-2 text-amber-900">
            Ko'rsatilmoqda: {filteredPlaces.length}
          </span>
          <span className="rounded-lg bg-emerald-100 px-3 py-2 text-emerald-900">
            Narx: {formatCompactPrice(minPrice)} -{" "}
            {formatCompactPrice(maxPrice)}
          </span>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredPlaces.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        </AnimatePresence>
      </section>
    </main>
  );
}

function InfoCard({ count, label }) {
  return (
    <div className="rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur">
      <p className="text-3xl font-black">{count}</p>
      <p className="text-sm font-semibold text-slate-200">{label}</p>
    </div>
  );
}

function PlaceCard({ place }) {
  const isKindergarten = place.type === "bogcha";
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.22 }}
      className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative h-44 overflow-hidden bg-slate-200">
        <img
          src={place.image}
          alt={place.name}
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
          loading="lazy"
        />
        <div className="absolute left-3 top-3 flex items-center gap-1 rounded-lg bg-white px-2.5 py-1 text-xs font-black text-slate-800 shadow-sm">
          {isKindergarten ? (
            <Baby className="h-3.5 w-3.5 text-pink-600" />
          ) : (
            <GraduationCap className="h-3.5 w-3.5 text-blue-600" />
          )}
          {isKindergarten ? "Bog'cha" : "Maktab"}
        </div>
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-lg bg-amber-400 px-2.5 py-1 text-xs font-black text-amber-950">
          <Star className="h-3.5 w-3.5 fill-amber-950" />
          {place.rating}
        </div>
      </div>
      <div className="p-4">
        <h2 className="line-clamp-1 text-lg font-black">{place.name}</h2>
        <div className="mt-3 space-y-2 text-sm font-semibold text-slate-600">
          <p className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
            <span>
              {place.district}, {place.address}
            </span>
          </p>
          <a
            href={`tel:${place.phone.replace(/\s+/g, "")}`}
            className="flex items-center gap-2 text-slate-800 transition hover:text-emerald-700"
          >
            <Phone className="h-4 w-4 text-emerald-600" />
            {place.phone}
          </a>
          <p className="flex items-center gap-2 text-slate-900">
            <Wallet className="h-4 w-4 text-emerald-600" />
            <span className="font-black">{formatPrice(place.price)}</span>
          </p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {place.features.map((feature) => (
            <span
              key={feature}
              className="rounded-md bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600"
            >
              {feature}
            </span>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-[1fr_auto] gap-2 border-t border-slate-100 pt-4">
          <a
            href={`tel:${place.phone.replace(/\s+/g, "")}`}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-slate-950 px-3 text-sm font-black text-white transition hover:bg-emerald-700"
          >
            <Phone className="h-4 w-4" />
            Qo'ng'iroq
          </a>
          <button className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-100 text-emerald-800">
             <ShieldCheck className="h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
