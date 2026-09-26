"use client";

import Image from "next/image";
import { FormEvent, MouseEvent, useEffect, useRef, useState } from "react";

const details = {
  engagement: {
    date: "19 November 2026",
    time: "5:00 PM",
    venue: "Jayamahal Palace Golden Lawn, Bangalore",
    map: "https://www.google.com/maps/place/Jayamahal+Palace+Hotel/@12.9972052,77.5953612,17z/data=!3m1!4b1!4m9!3m8!1s0x3bae16657964177f:0x8fdb84948377d2be!5m2!4m1!1i2!8m2!3d12.9972!4d77.5979361!16s%2Fg%2F11dxggy4gm?entry=ttu&g_ep=EgoyMDI2MDkyMy4wIKXMDSoASAFQAw%3D%3D",
  },
  wedding: {
    date: "23 November 2026",
    time: "11:00 AM",
    venue: "The Pentecostal Mission, Tiruvalla",
    map: "https://www.google.com/maps/place/The+Pentecost+Mission+(TPM),+Thiruvalla+Centre/@9.3823716,76.5769507,17z/data=!3m1!4b1!4m6!3m5!1s0x3b0624713e829daf:0x43ee5e28f69ddc7e!8m2!3d9.3823663!4d76.5795256!16s%2Fg%2F11bx5pwjjc?entry=ttu&g_ep=EgoyMDI2MDkyMy4wIKXMDSoASAFQAw%3D%3D",
  },
  reception: {
    date: "23 November 2026",
    time: "12:30 PM",
    venue: "Dr. Alexander Mar Thoma Valiya Metropolitan Smaraka Auditorium, Tiruvalla",
    map: "https://maps.google.com/?q=Dr.+Alexander+Mar+Thoma+Valiya+Metropolitan+Smaraka+Auditorium+Tiruvalla",
  },
  brideParents: "Mr Biju Samuel & Mrs Rini Biju",
  groomParents: "Mr Jose Oommen & Mrs Jasmine Jose",
  whatsapp: "919611288344",
  phoneDisplay: "+91 9611288344",
  rsvpEmail: "sharon.biju13@outlook.com",
};

const targetDate = new Date("2026-11-23T11:00:00+05:30").getTime();

export default function Home() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [sent, setSent] = useState(false);
  const [attendance, setAttendance] = useState("");
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("Home");
  const musicRef = useRef<HTMLAudioElement>(null);

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

    const audio = musicRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.muted = false;
    }

    const stopMusic = () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) stopMusic();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", stopMusic);
    window.addEventListener("beforeunload", stopMusic);

    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", stopMusic);
      window.removeEventListener("beforeunload", stopMusic);
    };
  }, []);

  function submitRsvp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const subject = "Wedding RSVP - Sharon & Justin";
    const body = [
      `Guest name: ${formData.get("guestName") ?? ""}`,
      `Mobile number: ${formData.get("mobileNumber") ?? ""}`,
      `Attendance: ${formData.get("attendance") ?? ""}`,
      `Number of attendees: ${formData.get("attendeeCount") ?? ""}`,
      `Wishes: ${formData.get("wishes") ?? ""}`,
    ].join("\n");
    window.location.href = `mailto:${details.rsvpEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  function closeDropdown(event: MouseEvent<HTMLAnchorElement>, item: string) {
    const dropdown = event.currentTarget.closest("details");
    if (dropdown) dropdown.open = false;
    setActiveMenuItem(item);
    const target = event.currentTarget.hash;
    window.history.pushState(null, "", target);
    window.requestAnimationFrame(() => {
      document.getElementById(target.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function sendRsvpWhatsApp(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const form = document.getElementById("rsvpForm") as HTMLFormElement | null;
    if (!form || !form.reportValidity()) return;
    const formData = new FormData(form);
    const message = [
      "Wedding RSVP - Sharon & Justin",
      `Guest name: ${formData.get("guestName") ?? ""}`,
      `Mobile number: ${formData.get("mobileNumber") ?? ""}`,
      `Attendance: ${formData.get("attendance") ?? ""}`,
      `Number of attendees: ${formData.get("attendeeCount") ?? ""}`,
      `Wishes: ${formData.get("wishes") ?? ""}`,
    ].join("\n");
    window.open(`https://wa.me/${details.whatsapp}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  function openInvitation() {
    const audio = musicRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.volume = 1;
      audio.play().then(() => undefined).catch((error) => console.error("Music playback was blocked:", error));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
    setEnvelopeOpen(true);
  }

  const events = [
    { icon: "💍", title: "Engagement", ...details.engagement },
    { icon: "✝", title: "Wedding", ...details.wedding },
    { icon: "🥂", title: "Reception", ...details.reception },
  ];

  return (
    <main className="invitation-shell min-h-screen">
      <div className={`envelope-overlay ${envelopeOpen ? "is-open" : ""}`} aria-hidden={envelopeOpen}>
        <div className="envelope-card">
          <span className="envelope-sheet">
            <span className="envelope-logo-reveal">Sharon <b>&amp;</b> Justin</span>
            <span className="envelope-verse-reveal">“The thing proceedeth from the LORD.”<b>Genesis 24:50</b></span>
          </span>
          <span className="envelope-front">
            <button
              type="button"
              className="envelope-seal"
              onClick={openInvitation}
              onPointerDown={openInvitation}
              aria-label="Open wedding invitation and play music"
            >
              <Image src="/js logo.png" alt="" width={90} height={90} className="envelope-logo" />
            </button>
          </span>
        </div>
      </div>
      <audio ref={musicRef} id="weddingMusic" loop preload="auto" playsInline src="/music/christian-intrumental.mp3" />

      <nav className="sticky top-0 z-30 border-b border-[#d5b36b] bg-[#fbf8f0]/95 px-5 py-4 backdrop-blur-sm" aria-label="Wedding invitation navigation">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <a href="#home" onClick={() => setActiveMenuItem("Home")} className="font-serif text-2xl font-semibold tracking-wide text-[#142b4b]">S<span className="text-[#ad7c2d]">&amp;</span>J</a>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-semibold uppercase tracking-[.16em] text-[#142b4b]">
            <a href="#home" onClick={() => setActiveMenuItem("Home")} className={`menu-link ${activeMenuItem === "Home" ? "menu-link-active" : ""}`}>Home</a>
            <details className="menu-dropdown">
              <summary>Celebrations <span aria-hidden="true">⌄</span></summary>
              <div className="menu-dropdown-panel">
                <a href="#engagement" className={activeMenuItem === "Engagement" ? "menu-dropdown-item-active" : ""} onClick={(event) => closeDropdown(event, "Engagement")}>Engagement</a>
                <a href="#wedding" className={activeMenuItem === "Wedding" ? "menu-dropdown-item-active" : ""} onClick={(event) => closeDropdown(event, "Wedding")}>Wedding</a>
                <a href="#reception" className={activeMenuItem === "Reception" ? "menu-dropdown-item-active" : ""} onClick={(event) => closeDropdown(event, "Reception")}>Reception</a>
              </div>
            </details>
            <details className="menu-dropdown">
              <summary>Families <span aria-hidden="true">⌄</span></summary>
              <div className="menu-dropdown-panel">
                <a href="#families" className={activeMenuItem === "Bride&apos;s Parents" ? "menu-dropdown-item-active" : ""} onClick={(event) => closeDropdown(event, "Bride&apos;s Parents")}>Bride&apos;s Parents</a>
                <a href="#families" className={activeMenuItem === "Groom&apos;s Parents" ? "menu-dropdown-item-active" : ""} onClick={(event) => closeDropdown(event, "Groom&apos;s Parents")}>Groom&apos;s Parents</a>
                <a href="#best-wishes" className={activeMenuItem === "Best Wishes" ? "menu-dropdown-item-active" : ""} onClick={(event) => closeDropdown(event, "Best Wishes")}>Best Wishes</a>
              </div>
            </details>
            <a href="#rsvp" onClick={() => setActiveMenuItem("RSVP")} className={`gold-button rounded-full px-4 py-2 transition-opacity hover:opacity-85 ${activeMenuItem === "RSVP" ? "menu-link-active" : ""}`}>RSVP</a>
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
          <p className="gold-label hero-praise">Praise the Lord</p>
          <div className="rule mt-5"><span className="rule-mark">✦</span></div>
          <div className="logo-flower mt-10">✦ ❈ ✦</div>
          <Image src="/js logo.png" alt="Sharon and Justin SJ monogram" width={500} height={500} className="logo-image mx-auto mt-5" />
          <h1 className="script-name mt-12">Sharon <span className="text-[#ad7c2d]">&amp;</span> Justin</h1>
          <p className="mt-6 font-serif text-xl italic text-[#203b5e]">By God&apos;s Grace, If God Willing</p>
          <div className="rule mt-7"><span className="rule-mark">✦</span></div>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-[#203b5e]">Joyfully invite you to share in the celebration of their engagement and Wedding.</p>
          <p className="mt-5 font-semibold uppercase tracking-[.14em] text-[#ad7c2d]">Engagement · 19 November 2026 · 5:00 PM · Bangalore</p>
          <p className="mt-6 font-semibold uppercase tracking-[.18em] text-[#ad7c2d]">Wedding · 23 November 2026 · 11:00 AM · Tiruvalla</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="#events" className="gold-button rounded-full px-7 py-3 font-semibold">View celebrations</a>
          </div>
          <a href="#countdown" className="scroll-more-button mt-10 inline-flex">Scroll down for more information ↓</a>
        </div>
      </section>

      <section id="countdown" className="paper-section px-5 py-20 text-center">
        <p className="gold-label">Counting down</p>
        <h2 className="section-heading mt-3">Until Wedding</h2>
        <div className="mx-auto mt-9 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
          {Object.entries(time).map(([label, value]) => (
            <div key={label} className="border border-[#d5b36b] bg-white/60 p-6 shadow-sm">
              <div className="font-serif text-5xl font-semibold text-[#142b4b]">{String(value).padStart(2, "0")}</div>
              <div className="gold-label mt-2">{label}</div>
            </div>
          ))}
        </div>
        <a href="#events" className="scroll-more-button mt-10 inline-flex">Scroll down for more information ↓</a>
      </section>

      <section id="events" className="paper-section px-5 py-20">
        <div className="mx-auto max-w-6xl text-center">
          <p className="gold-label">Our celebrations</p>
          <h2 className="section-heading mt-3">Save the Dates</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {events.map((item) => (
              <article id={item.title.toLowerCase()} key={item.title} className={`event-card border border-[#d5b36b] bg-white/60 p-8 shadow-sm ${activeMenuItem === item.title ? "event-card-active" : ""}`}>
                <h3 className="font-serif text-3xl text-[#142b4b]">{item.title}</h3>
                <p className="mt-5 font-semibold text-[#142b4b]">{item.date}</p>
                <p className="mt-2">{item.time}</p>
                <p className="mt-2 min-h-12">{item.venue}</p>
                <a href={item.map} target="_blank" rel="noreferrer" className="mt-6 inline-block rounded-full border border-[#ad7c2d] px-5 py-2 font-semibold text-[#142b4b]">Open Google Maps</a>
              </article>
            ))}
          </div>
          <a href="#verse" className="scroll-more-button mt-10 inline-flex">Scroll down for more information ↓</a>
        </div>
      </section>

      <section id="verse" className="paper-section px-5 py-20">
        <div className="navy-section mx-auto max-w-4xl px-7 py-12 text-center shadow-xl">
          <div className="text-4xl text-[#d5b36b]">✦</div>
          <blockquote className="mt-5 font-serif text-2xl italic leading-10">“The thing proceedeth from the LORD.”</blockquote>
          <p className="mt-4 font-bold text-[#d5b36b]">Genesis 24:50</p>
        </div>
        <div className="text-center"><a href="#families" className="scroll-more-button mt-10 inline-flex">Scroll down for more information ↓</a></div>
      </section>

      <section id="families" className="paper-section px-5 py-20 text-center">
        <p className="gold-label">With their families</p><h2 className="section-heading mt-3">Our Families</h2>
        <div className="mx-auto mt-8 grid max-w-3xl gap-5 md:grid-cols-2">
          <div className={`family-card border border-[#d5b36b] bg-white/60 p-7 ${activeMenuItem === "Bride&apos;s Parents" ? "family-card-active" : ""}`}><p className="gold-label">Bride&apos;s Parents</p><p className="mt-3 font-serif text-2xl">{details.brideParents}</p></div>
          <div className={`family-card border border-[#d5b36b] bg-white/60 p-7 ${activeMenuItem === "Groom&apos;s Parents" ? "family-card-active" : ""}`}><p className="gold-label">Groom&apos;s Parents</p><p className="mt-3 font-serif text-2xl">{details.groomParents}</p></div>
        </div>
      </section>

      <section id="rsvp" className="paper-section px-5 py-20">
        <div className="mx-auto max-w-2xl border border-[#d5b36b] bg-white/60 p-7 shadow-lg md:p-10">
          <div className="text-center"><p className="gold-label">RSVP</p><h2 className="section-heading mt-3">Will you join us?</h2></div>
          <p className="mt-4 text-center text-[#203b5e]">Please confirm your attendance, or call/WhatsApp us at <a href={`tel:+${details.whatsapp}`} className="font-semibold text-[#ad7c2d] underline underline-offset-4">{details.phoneDisplay}</a>.</p>
          {sent ? <div className="py-12 text-center"><div className="text-5xl">✓</div><h3 className="mt-4 font-serif text-3xl text-black">Thank you!</h3></div> : (
            <form id="rsvpForm" onSubmit={submitRsvp} className="mt-8 space-y-5">
              <input required name="guestName" placeholder="Guest name" className="w-full rounded-xl border border-[#d9c98e] bg-white p-4" />
              <label className="block text-left"><span className="mb-2 block text-sm font-semibold text-[#203b5e]">Phone number</span><input required name="mobileNumber" type="tel" placeholder="Enter your phone number" className="w-full rounded-xl border border-[#d9c98e] bg-white p-4" /></label>
              <select required name="attendance" value={attendance} onChange={(event) => setAttendance(event.target.value)} className="w-full rounded-xl border border-[#d9c98e] bg-white p-4"><option value="" disabled>Select attendance</option><option>Attending both events</option><option>Engagement only</option><option>Wedding only</option><option>Unable to attend</option></select>
              {(attendance === "Attending both events" || attendance === "Wedding only") && <input required name="attendeeCount" type="number" min="1" placeholder="Number of attendees" className="w-full rounded-xl border border-[#d9c98e] bg-white p-4" />}
              <textarea name="wishes" placeholder="Your wishes" className="min-h-28 w-full rounded-xl border border-[#d9c98e] bg-white p-4" />
              <button type="submit" className="gold-button w-full rounded-xl p-4 font-bold">Submit RSVP</button>
            </form>
          )}
          <a href={`https://wa.me/${details.whatsapp}`} onClick={sendRsvpWhatsApp} className="mt-4 block w-full rounded-xl bg-[#258a4b] p-4 text-center font-bold text-white">RSVP via WhatsApp</a>
        </div>
      </section>

      <footer className="navy-section px-5 py-12 text-center"><div className="footer-logo-plate"><Image src="/js logo.png" alt="Sharon and Justin SJ monogram" width={200} height={200} className="logo-image footer-logo" /></div><div className="logo-flower mt-3">✦ ❈ ✦</div><p className="mt-3 font-serif text-2xl">Sharon &amp; Justin</p><p className="mt-2 text-sm text-white/70">Your presence and prayers are our greatest blessing.</p><div id="best-wishes" className={`best-wishes-block mt-7 border-t border-[#d5b36b]/50 pt-5 ${activeMenuItem === "Best Wishes" ? "family-card-active" : ""}`}><p className="gold-label text-[#d5b36b]">With best wishes from</p><p className="mt-2 font-serif text-xl">Mrs LEELAMA SAMUEL</p><p className="mt-1 text-sm text-white/70">Grandmother</p><p className="mt-4 font-serif text-xl">MR LAWERNCE &amp; MRS PHILOMINA</p><p className="mt-1 text-sm text-white/70">Grandparents</p><p className="mt-4 font-serif text-xl">Miss SANDRA BIJU</p></div><a href="#home" className="scroll-more-button mt-8 inline-flex">Scroll to more ↑</a></footer>
    </main>
  );
}
