"use client";

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
    if (requested && artists.some((artist) => artist.name === requested)) setSelectedArtist(requested);
  }, []);

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
      setStatus({ type: "success", message: `Enquiry received. Your reference is ${result.reference}.` });
      form.reset(); setSelectedArtist("ItzGazz");
    } catch (error) {
      setStatus({ type: "error", message: error instanceof Error ? error.message : "Please try again." });
    }
  }

  return (
    <main id="top">
      <nav className="nav shell">
        <Mark />
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#artists" onClick={() => setMenuOpen(false)}>Artists</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#latest" onClick={() => setMenuOpen(false)}>Latest</a>
          <a href="/studio" onClick={() => setMenuOpen(false)}>Studio</a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram</a>
          <a className="nav-cta" href="#book" onClick={() => setMenuOpen(false)}>Book an artist <ArrowRight size={16}/></a>
        </div>
        <button className="menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X/> : <Menu/>}</button>
      </nav>

      <section className="hero shell">
        <div className="eyebrow"><span>Independent record label</span><span>South Africa</span></div>
        <h1><span>OWN YOUR</span><span className="outline">SOUND.</span></h1>
        <div className="hero-bottom">
          <p>We back artists with the freedom, structure and stage to build careers on their own terms.</p>
          <a href="#artists" className="circle-link" aria-label="Meet the artists"><ArrowDown/></a>
        </div>
        <div className="record" aria-hidden="true"><div className="record-ring"><div className="record-label official-logo"><img src="/dtown-records-logo.png" alt="" /></div></div></div>
      </section>

      <div className="ticker" aria-hidden="true"><div>ARTISTS FIRST ★ MUSIC WITH PURPOSE ★ BUILT INDEPENDENTLY ★ ARTISTS FIRST ★ MUSIC WITH PURPOSE ★ BUILT INDEPENDENTLY ★</div></div>

      <section id="artists" className="artists-section shell">
        <div className="section-head"><span>01 / Roster</span><h2>THE<br/>ARTISTS</h2><p>Six voices. Six worlds. One home built to amplify what makes each artist unmistakable.</p></div>
        <div className="artist-grid">
          {artists.map((artist) => (
            <article className="artist-card" key={artist.name}>
              <div className={`artist-visual ${artist.tone} ${artist.image ? "has-photo" : ""}`}>
                {artist.image && <img src={artist.image} alt={`${artist.name}, D.Town Records artist`} />}
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
          <div><span className="section-no">02 / Our ethos</span><div className="signal"><i/><i/><i/><i/><i/><i/><i/></div></div>
          <div><p className="kicker">More than a label.</p><h2>THE ARTIST<br/>KEEPS THE <em>POWER.</em></h2><p className="body-copy">D.Town Records is built around artist development, creative control and long-term growth. We create the room for distinct voices to become lasting careers—on stage, in studio and beyond.</p>
            <div className="principles"><div><b>01</b><span>Creative freedom</span></div><div><b>02</b><span>Career development</span></div><div><b>03</b><span>Live opportunities</span></div></div>
          </div>
        </div>
      </section>

      <section id="about" className="about shell">
        <div><span className="section-no">03 / About D.Town</span><p className="kicker">Independent by design.</p></div>
        <div><h2>A HOME FOR<br/>DISTINCT <i>VOICES.</i></h2><p>D.Town Records is a South African independent record label focused on artist development, creative control and meaningful collaboration. We connect the work made in the studio with audiences, venues and opportunities beyond it.</p><div className="about-facts"><span>South Africa</span><span>Artist bookings</span><span>Studio sessions</span></div></div>
      </section>

      <section id="latest" className="latest">
        <div className="shell"><div className="latest-head"><span>04 / Latest from D.Town</span><h2>STAY CLOSE<br/>TO THE <i>WORK.</i></h2></div><div className="latest-grid"><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer"><Camera/><b>From the roster</b><p>New visuals, sessions and artist updates from the official D.Town feed.</p><span>Open Instagram <ArrowRight/></span></a><a href={YOUTUBE_URL} target="_blank" rel="noreferrer"><Play/><b>Watch & listen</b><p>Music and video from D.Town Records on the label’s YouTube channel.</p><span>Open YouTube <ArrowRight/></span></a><a href="/studio"><Disc3/><b>Inside the studio</b><p>Meet Gareth and request a recording, production or mixing session.</p><span>Explore studio <ArrowRight/></span></a></div></div>
      </section>

      <section id="book" className="booking shell">
        <div className="booking-intro"><span>05 / Book the sound</span><h2>BRING<br/>D.TOWN<br/><i>LIVE.</i></h2><p>Planning a festival, club night, campus event, brand activation or private show? Tell us what you’re building and who you want on the stage.</p><p className="response-time">You’ll receive an on-screen reference immediately. The team aims to respond within 1–2 business days.</p></div>
        <form onSubmit={submit}>
          <div className="hp-field" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off"/></div>
          <div className="field full"><label htmlFor="artist">Artist *</label><select id="artist" name="artist" value={selectedArtist} onChange={e => setSelectedArtist(e.target.value)}>{artists.map(a => <option key={a.name}>{a.name}</option>)}<option>Multiple artists</option></select></div>
          <div className="field"><label htmlFor="name">Your name *</label><input id="name" name="name" required placeholder="Full name"/></div>
          <div className="field"><label htmlFor="email">Email *</label><input id="email" name="email" type="email" required placeholder="you@email.com"/></div>
          <div className="field"><label htmlFor="phone">Phone</label><input id="phone" name="phone" placeholder="+27 ..."/></div>
          <div className="field"><label htmlFor="organisation">Organisation</label><input id="organisation" name="organisation" placeholder="Venue, brand or promoter"/></div>
          <div className="field"><label htmlFor="eventType">Event type *</label><select id="eventType" name="eventType" required defaultValue=""><option value="" disabled>Select event type</option><option>Festival</option><option>Club / venue</option><option>Campus event</option><option>Brand activation</option><option>Private event</option><option>Other</option></select></div>
          <div className="field"><label htmlFor="eventDate">Event date *</label><input id="eventDate" name="eventDate" type="date" required/></div>
          <div className="field"><label htmlFor="venue">Venue *</label><input id="venue" name="venue" required placeholder="Venue name"/></div>
          <div className="field"><label htmlFor="city">City *</label><input id="city" name="city" required placeholder="City / province"/></div>
          <div className="field full"><label htmlFor="budget">Estimated budget</label><select id="budget" name="budget" defaultValue=""><option value="">Prefer not to say</option><option>Under R10,000</option><option>R10,000 – R25,000</option><option>R25,000 – R50,000</option><option>R50,000+</option></select></div>
          <div className="field full"><label htmlFor="message">Tell us about the event</label><textarea id="message" name="message" rows={4} placeholder="Audience, set length, production and anything else we should know..."/></div>
          <label className="consent"><input type="checkbox" name="consent" value="yes" required/><span>I agree that D.Town Records may use these details to assess and respond to my enquiry. See the <a href="/privacy">privacy notice</a>.</span></label>
          <button className="submit" disabled={status.type === "sending"}>{status.type === "sending" ? "Sending enquiry..." : <>Send booking enquiry <ArrowRight/></>}</button>
          {status.type !== "idle" && status.type !== "sending" && <div className={`form-status ${status.type}`} role="status">{status.type === "success" && <Check/>}{status.message}</div>}
        </form>
      </section>

      <footer>
        <div className="shell footer-top"><div><Mark/><p>Independent. Artist-first. Always moving.</p><small>Serving artists, venues and collaborators across South Africa.</small></div><div><span>Follow the movement</span><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer"><Camera/> @d.townrecords</a><a href={YOUTUBE_URL} target="_blank" rel="noreferrer"><Disc3/> D.Town Records</a></div><div><span>Explore</span><a href="#artists">Artists</a><a href="#about">About</a><a href="#latest">Latest</a><a href="/studio">Studio</a><a href="#book">Bookings</a></div></div>
        <div className="shell footer-bottom"><span>© {new Date().getFullYear()} D.Town Records</span><a href="/privacy">Privacy</a><span>Artists first, from day one.</span></div>
      </footer>
    </main>
  );
}
