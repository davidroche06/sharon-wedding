"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";

const details = {
  engagement: {
    date: "19 November 2026",
    time: "5:00 PM",
    venue: "Jayamahal Palace Golden Lawn, Bangalore",
    map: "https://maps.google.com/?q=Jayamahal+Palace+Golden+Lawn+Bangalore",
  },
  wedding: {
    date: "23 November 2026",
    time: "11:00 AM",
    venue: "The Pentecostal Mission, Tiruvalla",
    map: "https://share.google/vwzbzpMBY4vH0RsbR",
  },
  reception: {
    date: "23 November 2026",
    time: "12:30 PM",
    venue: "Dr. Alexander Mar Thoma Valiya Metropolitan Smaraka Auditorium, Tiruvalla",
    map: "https://maps.google.com/?q=Dr.+Alexander+Mar+Thoma+Valiya+Metropolitan+Smaraka+Auditorium+Tiruvalla",
  },
  brideParents: "MRS & MR BIJU SAMUEL",
  groomParents: "MRS & MR JOSE KURUVILLA AND M",
  whatsapp: "919999999999",
};

const targetDate = new Date("2026-11-23T11:00:00+05:30").getTime();

export default function Home() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [musicOn, setMusicOn] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const update = () => {
      const difference = Math.max(0, targetDate - Date.now());
      setTime({
        days: Math.floor(difference / 86400000),
        hours: Math.floor((difference / 3600000) % 24),
        minutes: Math.floor((difference / 60000) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  function submitRsvp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  const events = [
    { icon: "💍", title: "Engagement", ...details.engagement },
    { icon: "✝", title: "Matrimony", ...details.wedding },
    { icon: "🥂", title: "Reception", ...details.reception },
  ];

  return (
    <main className="invitation-shell min-h-screen">
      <audio id="weddingMusic" loop src="/music/christian-instrumental.mp3" />

      <nav className="sticky top-0 z-30 border-b border-[#d5b36b] bg-[#fbf8f0]/95 px-5 py-4 backdrop-blur-sm" aria-label="Wedding invitation navigation">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <a href="#home" className="font-serif text-2xl font-semibold tracking-wide text-[#142b4b]">S<span className="text-[#ad7c2d]">&amp;</span>J</a>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-semibold uppercase tracking-[.16em] text-[#142b4b]">
            <a href="#home" className="transition-colors hover:text-[#ad7c2d]">Home</a>
            <a href="#events" className="transition-colors hover:text-[#ad7c2d]">Celebrations</a>
            <a href="#families" className="transition-colors hover:text-[#ad7c2d]">Families</a>
            <a href="#rsvp" className="gold-button rounded-full px-4 py-2 transition-opacity hover:opacity-85">RSVP</a>
          </div>
        </div>
      </nav>

      <section id="home" className="ornate-frame relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-20 text-center">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(251,248,240,.88),rgba(251,248,240,.94)),url('/photos/church.jpg')] bg-cover bg-center" />
        <span className="floral-corner floral-top-left" aria-hidden="true" />
        <span className="floral-corner floral-top-right" aria-hidden="true" />
        <span className="floral-corner floral-bottom-left" aria-hidden="true" />
        <span className="floral-corner floral-bottom-right" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-4xl px-10 py-14 md:px-24">
          <p className="gold-label">Praise the Lord</p>
          <div className="rule mt-5"><span className="rule-mark">✦</span></div>
          <p className="save-date-heading mt-9">Save the date</p>
          <div className="logo-flower mt-10">✦ ❈ ✦</div>
          <Image src="/js logo.png" alt="Sharon and Justin SJ monogram" width={500} height={500} className="logo-image mx-auto mt-5" />
          <h1 className="script-name mt-12">Sharon <span className="text-[#ad7c2d]">&amp;</span> Justin</h1>
          <p className="mt-6 font-serif text-xl italic text-[#203b5e]">By God&apos;s Grace, If God Willing</p>
          <div className="rule mt-7"><span className="rule-mark">✦</span></div>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-[#203b5e]">Joyfully invite you to share in the celebration of their engagement and Matrimony.</p>
          <p className="mt-6 font-semibold uppercase tracking-[.18em] text-[#ad7c2d]">23 November 2026 · 11:00 AM · Tiruvalla</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="#events" className="gold-button rounded-full px-7 py-3 font-semibold">View celebrations</a>
            <button onClick={() => {
              const audio = document.getElementById("weddingMusic") as HTMLAudioElement;
              musicOn ? audio.pause() : audio.play().catch(() => undefined);
              setMusicOn(!musicOn);
            }} className="rounded-full border border-[#ad7c2d] bg-white/80 px-7 py-3 font-semibold text-[#142b4b]">
              {musicOn ? "Pause music" : "Play music"}
            </button>
          </div>
          <div className="mt-10 flex flex-col items-center gap-2">
            <a href="#events" aria-label="Click to scroll to celebrations" title="Click to scroll" className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#ad7c2d] text-2xl text-[#142b4b] transition-transform hover:translate-y-1">↓</a>
            <span className="gold-label text-[.6rem]">Click to scroll</span>
          </div>
        </div>
      </section>

      <section className="paper-section px-5 py-20 text-center">
        <p className="gold-label">Counting down</p>
        <h2 className="section-heading mt-3">Until Matrimony</h2>
        <div className="mx-auto mt-9 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
          {Object.entries(time).map(([label, value]) => (
            <div key={label} className="border border-[#d5b36b] bg-white/60 p-6 shadow-sm">
              <div className="font-serif text-5xl font-semibold text-[#142b4b]">{String(value).padStart(2, "0")}</div>
              <div className="gold-label mt-2">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="events" className="paper-section px-5 py-20">
        <div className="mx-auto max-w-6xl text-center">
          <p className="gold-label">Our celebrations</p>
          <h2 className="section-heading mt-3">Save the Dates</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {events.map((item) => (
              <article key={item.title} className="border border-[#d5b36b] bg-white/60 p-8 shadow-sm">
                <div className="text-4xl text-[#ad7c2d]">{item.icon}</div>
                <h3 className="mt-5 font-serif text-3xl text-[#142b4b]">{item.title}</h3>
                <p className="mt-5 font-semibold text-[#142b4b]">{item.date}</p>
                <p className="mt-2">{item.time}</p>
                <p className="mt-2 min-h-12">{item.venue}</p>
                <a href={item.map} target="_blank" rel="noreferrer" className="mt-6 inline-block rounded-full border border-[#ad7c2d] px-5 py-2 font-semibold text-[#142b4b]">Open Google Maps</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="paper-section px-5 py-20">
        <div className="navy-section mx-auto max-w-4xl px-7 py-12 text-center shadow-xl">
          <div className="text-4xl text-[#d5b36b]">✦</div>
          <blockquote className="mt-5 font-serif text-2xl italic leading-10">“The thing proceedeth from the LORD.”</blockquote>
          <p className="mt-4 font-bold text-[#d5b36b]">Genesis 24:50</p>
        </div>
      </section>

      <section id="families" className="paper-section px-5 py-20 text-center">
        <p className="gold-label">With their families</p><h2 className="section-heading mt-3">Our Families</h2>
        <div className="mx-auto mt-8 grid max-w-3xl gap-5 md:grid-cols-2">
          <div className="border border-[#d5b36b] bg-white/60 p-7"><p className="gold-label">Bride&apos;s Parents</p><p className="mt-3 font-serif text-2xl">{details.brideParents}</p></div>
          <div className="border border-[#d5b36b] bg-white/60 p-7"><p className="gold-label">Groom&apos;s Parents</p><p className="mt-3 font-serif text-2xl">{details.groomParents}</p></div>
        </div>
      </section>

      <section id="rsvp" className="paper-section px-5 py-20">
        <div className="mx-auto max-w-2xl border border-[#d5b36b] bg-white/60 p-7 shadow-lg md:p-10">
          <div className="text-center"><p className="gold-label">RSVP</p><h2 className="section-heading mt-3">Will you join us?</h2></div>
          {sent ? <div className="py-12 text-center"><div className="text-5xl">✓</div><h3 className="mt-4 font-serif text-3xl text-black">Thank you!</h3></div> : (
            <form onSubmit={submitRsvp} className="mt-8 space-y-5">
              <input required placeholder="Guest name" className="w-full rounded-xl border border-[#d9c98e] bg-white p-4" />
              <input required type="tel" placeholder="Mobile number" className="w-full rounded-xl border border-[#d9c98e] bg-white p-4" />
              <select className="w-full rounded-xl border border-[#d9c98e] bg-white p-4"><option>Attending both events</option><option>Engagement only</option><option>Wedding only</option><option>Unable to attend</option></select>
              <textarea placeholder="Your wishes" className="min-h-28 w-full rounded-xl border border-[#d9c98e] bg-white p-4" />
              <button type="submit" className="gold-button w-full rounded-xl p-4 font-bold">Submit RSVP</button>
            </form>
          )}
          <a href={`https://wa.me/${details.whatsapp}`} target="_blank" rel="noreferrer" className="mt-4 block w-full rounded-xl bg-[#258a4b] p-4 text-center font-bold text-white">RSVP via WhatsApp</a>
        </div>
      </section>

      <footer className="navy-section px-5 py-12 text-center"><Image src="/js logo.png" alt="Sharon and Justin SJ monogram" width={200} height={200} className="logo-image footer-logo mx-auto" /><div className="logo-flower mt-3">✦ ❈ ✦</div><p className="mt-3 font-serif text-2xl">Sharon &amp; Justin</p><p className="mt-2 text-sm text-white/70">Your presence and prayers are our greatest blessing.</p></footer>
    </main>
  );
}
