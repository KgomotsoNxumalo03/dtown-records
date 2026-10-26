"use client";

import { FormEvent, useState } from "react";
import { ArrowDown, ArrowRight, Camera, Check, Disc3, Menu, X } from "lucide-react";

const artists = [
  { name: "ItzGazz", code: "01", note: "RHYTHM / PRESENCE", tone: "tone-a", image: "/artists/itzgazz.png" },
  { name: "DreyEGO", code: "02", note: "EDGE / ENERGY", tone: "tone-b", image: "/artists/dreyego.png" },
  { name: "Priest Pope", code: "03", note: "VOICE / VISION", tone: "tone-c", image: "/artists/priest-pope.png" },
  { name: "Kory", code: "04", note: "SOUL / MOTION", tone: "tone-d" },
  { name: "PediSkyWalker", code: "05", note: "FUTURE / ROOTS", tone: "tone-e", image: "/artists/pediskywalker.png" },
  { name: "LaCASA", code: "06", note: "LIVE / LIMITLESS", tone: "tone-f", image: "/artists/lacasa.png" },
];

function Mark() {
  return <a href="#top" className="mark" aria-label="D.Town Records home"><img src="/dtown-records-logo.png" alt="D.Town Records" /></a>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState("ItzGazz");
  const [status, setStatus] = useState<{type: "idle" | "sending" | "success" | "error"; message?: string}>({ type: "idle" });

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
          <a href="#ethos" onClick={() => setMenuOpen(false)}>Our ethos</a>
          <a href="/studio">Studio</a>
          <a href="https://www.instagram.com/d.townrecords/" target="_blank" rel="noreferrer">Instagram</a>
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
              <button onClick={() => book(artist.name)}>Booking enquiry <ArrowRight size={17}/></button>
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

      <section id="book" className="booking shell">
        <div className="booking-intro"><span>03 / Book the sound</span><h2>BRING<br/>D.TOWN<br/><i>LIVE.</i></h2><p>Planning a festival, club night, campus event, brand activation or private show? Tell us what you’re building and who you want on the stage.</p></div>
        <form onSubmit={submit}>
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
          <button className="submit" disabled={status.type === "sending"}>{status.type === "sending" ? "Sending enquiry..." : <>Send booking enquiry <ArrowRight/></>}</button>
          {status.type !== "idle" && status.type !== "sending" && <div className={`form-status ${status.type}`} role="status">{status.type === "success" && <Check/>}{status.message}</div>}
        </form>
      </section>

      <footer>
        <div className="shell footer-top"><div><Mark/><p>Independent. Artist-first. Always moving.</p></div><div><span>Follow the movement</span><a href="https://www.instagram.com/d.townrecords/" target="_blank" rel="noreferrer"><Camera/> @d.townrecords</a><a href="https://youtube.com/@dtownrecords1.0" target="_blank" rel="noreferrer"><Disc3/> D.Town Records</a></div><div><span>Explore</span><a href="#artists">Artists</a><a href="#ethos">Our ethos</a><a href="#book">Bookings</a></div></div>
        <div className="shell footer-bottom"><span>© {new Date().getFullYear()} D.Town Records</span><span>Artists first, from day one.</span></div>
      </footer>
    </main>
  );
}
