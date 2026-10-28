"use client";

/* eslint-disable @next/next/no-img-element */

import { FormEvent, useEffect, useState } from "react";
import { ArrowDown, ArrowRight, Camera, Check, Disc3, Menu, Play, X } from "lucide-react";
import { artists, INSTAGRAM_URL, YOUTUBE_URL } from "../lib/artists";

function Mark() {
  return <a href="#top" className="mark" aria-label="D.Town Records home"><img src="/dtown-records-logo.png" alt="D.Town Records" /></a>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState("ItzGazz");
  const [status, setStatus] = useState<{type: "idle" | "sending" | "success" | "error"; message?: string}>({ type: "idle" });

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("artist");
    if (requested && artists.some((artist) => artist.name === requested)) queueMicrotask(() => setSelectedArtist(requested));
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", closeOnEscape);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", closeOnEscape); };
  }, [menuOpen]);

  const today = new Date().toLocaleDateString("en-CA");

  function book(name: string) {
    setSelectedArtist(name);
    document.querySelector("#book")?.scrollIntoView({ behavior: "smooth" });
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ type: "sending" });
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch("/api/enquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const result = await response.json() as { error?: string; reference?: string };
      if (!response.ok) throw new Error(result.error || "Something went wrong.");
      setStatus({ type: "success", message: `Enquiry received. Your reference is ${result.reference}. Keep it for follow-up; the team aims to reply within 1–2 business days.` });
      form.reset(); setSelectedArtist("ItzGazz");
    } catch (error) {
      setStatus({ type: "error", message: error instanceof Error ? error.message : "Please try again." });
    }
  }

  return (
    <main id="top">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <nav className="nav shell">
        <Mark />
        <div id="primary-navigation" className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#artists" onClick={() => setMenuOpen(false)}>Artists</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#latest" onClick={() => setMenuOpen(false)}>Latest</a>
          <a href="/studio" onClick={() => setMenuOpen(false)}>Studio</a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram</a>
          <a className="nav-cta" href="#book" onClick={() => setMenuOpen(false)}>Book an artist <ArrowRight size={16}/></a>
        </div>
        <button className="menu" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="primary-navigation">{menuOpen ? <X/> : <Menu/>}</button>
      </nav>

      <div id="main-content" tabIndex={-1}/>
      <section className="hero shell">
        <div className="eyebrow"><span>Independent record label</span><span>South Africa</span></div>
        <h1><span>OWN YOUR</span><span className="outline">SOUND.</span></h1>
        <div className="hero-bottom">
          <div><p>We back artists with the freedom, structure and stage to build careers on their own terms.</p><a className="hero-listen" href={YOUTUBE_URL} target="_blank" rel="noreferrer"><Play/> Listen to D.Town</a></div>
          <a href="#artists" className="circle-link" aria-label="Meet the artists"><ArrowDown/></a>
        </div>
        <div className="record" aria-hidden="true"><div className="record-ring"><div className="record-label official-logo"><img src="/dtown-records-logo.png" alt="" /></div></div></div>
      </section>

      <div className="ticker" aria-hidden="true"><div>ARTISTS FIRST ★ MUSIC WITH PURPOSE ★ BUILT INDEPENDENTLY ★ ARTISTS FIRST ★ MUSIC WITH PURPOSE ★ BUILT INDEPENDENTLY ★</div></div>

      <section className="featured-work shell" aria-labelledby="featured-title">
        <div className="featured-label"><span>01 / The sound</span><p>Artists, sessions and live energy—made independently in South Africa.</p></div>
        <div className="featured-visuals" aria-hidden="true"><img src="/artists/dreyego.webp" alt="" width="1125" height="1406" decoding="async"/><img src="/studio/recording-suite.webp" alt="" width="1125" height="1125" loading="lazy" decoding="async"/><img src="/artists/lacasa.webp" alt="" width="1125" height="1101" loading="lazy" decoding="async"/></div>
        <div className="featured-copy"><h2 id="featured-title">THE ROSTER<br/>IN <i>MOTION.</i></h2><p>Meet the voices shaping D.Town, watch the latest work and bring the sound to your stage.</p><div><a href={YOUTUBE_URL} target="_blank" rel="noreferrer">Watch & listen <ArrowRight/></a><a href="#book">Book the roster <ArrowDown/></a></div></div>
      </section>

      <section id="artists" className="artists-section shell">
        <div className="section-head"><span>02 / Roster</span><h2>THE<br/>ARTISTS</h2><p>Six voices. Six worlds. One home built to amplify what makes each artist unmistakable.</p></div>
        <div className="artist-grid">
          {artists.map((artist) => (
            <article className="artist-card" key={artist.name}>
              <div className={`artist-visual ${artist.tone} ${artist.image ? "has-photo" : ""}`}>
                {artist.image && <img src={artist.image} alt={`${artist.name}, D.Town Records artist`} width="1125" height="1406" loading="lazy" decoding="async" />}
                <span className="artist-initial">{artist.name.slice(0,1)}</span><span className="grain"/>
              </div>
              <div className="artist-meta"><span>{artist.code}</span><span>{artist.note}</span></div>
              <h3>{artist.name}</h3>
              <div className="artist-links"><a href={`/artists/${artist.slug}`}>View profile</a><button onClick={() => book(artist.name)}>Book <ArrowRight size={17}/></button></div>
            </article>
          ))}
        </div>
      </section>

      <section id="ethos" className="ethos">
        <div className="shell ethos-grid">
          <div><span className="section-no">03 / Our ethos</span><div className="signal"><i/><i/><i/><i/><i/><i/><i/></div></div>
          <div><p className="kicker">More than a label.</p><h2>THE ARTIST<br/>KEEPS THE <em>POWER.</em></h2><p className="body-copy">D.Town Records is built around artist development, creative control and long-term growth. We create the room for distinct voices to become lasting careers—on stage, in studio and beyond.</p>
            <div className="principles"><div><b>01</b><span>Creative freedom</span></div><div><b>02</b><span>Career development</span></div><div><b>03</b><span>Live opportunities</span></div></div>
          </div>
        </div>
      </section>

      <section id="about" className="about shell">
        <div><span className="section-no">04 / About D.Town</span><p className="kicker">Independent by design.</p></div>
        <div><h2>A HOME FOR<br/>DISTINCT <i>VOICES.</i></h2><p>D.Town Records is a South African independent record label focused on artist development, creative control and meaningful collaboration. We connect the work made in the studio with audiences, venues and opportunities beyond it.</p><div className="about-facts"><span>South Africa</span><span>Artist bookings</span><span>Studio sessions</span></div></div>
      </section>

      <section id="latest" className="latest">
        <div className="shell"><div className="latest-head"><span>05 / Latest from D.Town</span><h2>STAY CLOSE<br/>TO THE <i>WORK.</i></h2></div><div className="latest-grid"><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer"><Camera/><b>From the roster</b><p>New visuals, sessions and artist updates from the official D.Town feed.</p><span>Open Instagram <ArrowRight/></span></a><a href={YOUTUBE_URL} target="_blank" rel="noreferrer"><Play/><b>Watch & listen</b><p>Music and video from D.Town Records on the label’s YouTube channel.</p><span>Open YouTube <ArrowRight/></span></a><a href="/studio"><Disc3/><b>Inside the studio</b><p>Meet Gareth and request a recording, production or mixing session.</p><span>Explore studio <ArrowRight/></span></a></div></div>
      </section>

      <section className="trust shell" aria-labelledby="trust-title"><div><span>06 / Work with D.Town</span><h2 id="trust-title">CLEAR ROUTES.<br/><i>REAL PEOPLE.</i></h2></div><div className="trust-list"><div><b>Artist bookings</b><p>Use the booking form for festivals, venues, campus events, activations and private shows.</p><a href="#book">Start an enquiry <ArrowRight/></a></div><div><b>Studio sessions</b><p>Recording, production and mixing requests are handled through the dedicated studio page.</p><a href="/studio#studio-booking">Request a session <ArrowRight/></a></div><div><b>Official contact</b><p>For general questions, contact the label through its verified public channel.</p><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">@d.townrecords <ArrowRight/></a></div></div></section>

      <section id="book" className="booking shell">
        <div className="booking-intro"><span>07 / Book the sound</span><h2>BRING<br/>D.TOWN<br/><i>LIVE.</i></h2><p>Planning a festival, club night, campus event, brand activation or private show? Tell us what you’re building and who you want on the stage.</p><p className="response-time">You’ll receive an on-screen reference immediately. The team aims to respond within 1–2 business days.</p></div>
        <form onSubmit={submit}>
          <div className="hp-field" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off"/></div>
          <div className="field full"><label htmlFor="artist">Artist *</label><select id="artist" name="artist" value={selectedArtist} onChange={e => setSelectedArtist(e.target.value)}>{artists.map(a => <option key={a.name}>{a.name}</option>)}<option>Multiple artists</option></select></div>
          <div className="field"><label htmlFor="name">Your name *</label><input id="name" name="name" required placeholder="Full name"/></div>
          <div className="field"><label htmlFor="email">Email *</label><input id="email" name="email" type="email" required placeholder="you@email.com"/></div>
          <div className="field"><label htmlFor="phone">Phone</label><input id="phone" name="phone" type="tel" inputMode="tel" pattern="[0-9+() .-]{7,20}" placeholder="+27 ..." aria-describedby="phone-help"/><small id="phone-help">7–20 digits; spaces and + are accepted.</small></div>
          <div className="field"><label htmlFor="organisation">Organisation</label><input id="organisation" name="organisation" placeholder="Venue, brand or promoter"/></div>
          <div className="field"><label htmlFor="eventType">Event type *</label><select id="eventType" name="eventType" required defaultValue=""><option value="" disabled>Select event type</option><option>Festival</option><option>Club / venue</option><option>Campus event</option><option>Brand activation</option><option>Private event</option><option>Other</option></select></div>
          <div className="field"><label htmlFor="eventDate">Event date *</label><input id="eventDate" name="eventDate" type="date" min={today} required/></div>
          <div className="field"><label htmlFor="venue">Venue *</label><input id="venue" name="venue" required placeholder="Venue name"/></div>
          <div className="field"><label htmlFor="city">City *</label><input id="city" name="city" required placeholder="City / province"/></div>
          <div className="field full"><label htmlFor="budget">Estimated budget</label><select id="budget" name="budget" defaultValue=""><option value="">Prefer not to say</option><option>Under R10,000</option><option>R10,000 – R25,000</option><option>R25,000 – R50,000</option><option>R50,000+</option></select></div>
          <div className="field full"><label htmlFor="message">Tell us about the event</label><textarea id="message" name="message" rows={4} placeholder="Audience, set length, production and anything else we should know..."/></div>
          <div className="field full"><label htmlFor="eventLink">Event brief or reference link</label><input id="eventLink" name="eventLink" type="url" inputMode="url" placeholder="https://..."/><small>Optional: venue page, event brief or reference material.</small></div>
          <label className="consent"><input type="checkbox" name="consent" value="yes" required/><span>I agree that D.Town Records may use these details to assess and respond to my enquiry. See the <a href="/privacy">privacy notice</a>.</span></label>
          <button className="submit" disabled={status.type === "sending"}>{status.type === "sending" ? "Sending enquiry..." : <>Send booking enquiry <ArrowRight/></>}</button>
          {status.type !== "idle" && status.type !== "sending" && <div className={`form-status ${status.type}`} role="status">{status.type === "success" && <Check/>}{status.message}</div>}
        </form>
      </section>

      <footer>
        <div className="shell footer-top"><div><Mark/><p>Independent. Artist-first. Always moving.</p><small>Serving artists, venues and collaborators across South Africa.</small></div><div><span>Follow the movement</span><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer"><Camera/> @d.townrecords</a><a href={YOUTUBE_URL} target="_blank" rel="noreferrer"><Disc3/> D.Town Records</a></div><div><span>Explore</span><a href="#artists">Artists</a><a href="#about">About</a><a href="#latest">Latest</a><a href="/studio">Studio</a><a href="#book">Bookings</a></div></div>
        <div className="shell footer-bottom"><span>© {new Date().getFullYear()} D.Town Records</span><span><a href="/privacy">Privacy</a> · <a href="/terms">Booking terms</a></span><span>Artists first, from day one.</span></div>
      </footer>
    </main>
  );
}
