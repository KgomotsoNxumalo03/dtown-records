"use client";

/* eslint-disable @next/next/no-img-element */

import { FormEvent, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Headphones, Mic2, Pause, Play, SlidersHorizontal, Waves } from "lucide-react";
import Link from "next/link";

const STUDIO_SOUND_URL = "/audio/ctrl-the-stacks.mp3";

function formatTime(value: number) {
  if (!Number.isFinite(value)) return "0:00";
  const minutes = Math.floor(value / 60);
  return `${minutes}:${Math.floor(value % 60).toString().padStart(2, "0")}`;
}

export default function StudioPage() {
  const [status, setStatus] = useState<{type:"idle"|"sending"|"success"|"error";message?:string}>({type:"idle"});
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const today = new Date().toLocaleDateString("en-CA");

  async function toggleAudio() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) await audio.play(); else audio.pause();
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus({type:"sending"});
    const form = event.currentTarget;
    try {
      const response = await fetch("/api/studio-bookings", {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Object.fromEntries(new FormData(form)))});
      const result = await response.json() as {error?:string;reference?:string};
      if (!response.ok) throw new Error(result.error || "Something went wrong.");
      setStatus({type:"success",message:`Studio request received. Your reference is ${result.reference}. Keep it for follow-up; the team aims to reply within 1–2 business days.`}); form.reset();
    } catch (error) {
      setStatus({type:"error",message:error instanceof Error ? error.message : "Please try again."});
    }
  }

  return <main className="studio-page">
    <a className="skip-link" href="#studio-content">Skip to main content</a>
    <nav className="studio-nav shell"><Link href="/" className="mark"><img src="/dtown-records-logo.png" alt="D.Town Records"/></Link><Link href="/" className="back-link"><ArrowLeft size={16}/> Back to D.Town Records</Link></nav>

    <header className="studio-hero shell" id="studio-content" tabIndex={-1}>
      <div className="studio-tag"><span>Studio sessions</span><span>Production / Recording / Mixing</span></div>
      <div className="studio-title"><p>Turn the idea into the record.</p><h1>MAKE<br/><i>NOISE.</i></h1></div>
      <div className="studio-sound" aria-label="On-site music player">
        <audio ref={audioRef} src={STUDIO_SOUND_URL} preload="metadata" onPlay={()=>setIsPlaying(true)} onPause={()=>setIsPlaying(false)} onEnded={()=>setIsPlaying(false)} onLoadedMetadata={(event)=>setDuration(event.currentTarget.duration)} onTimeUpdate={(event)=>setCurrentTime(event.currentTarget.currentTime)}/>
        <button className="studio-sound-play" type="button" onClick={toggleAudio} aria-label={isPlaying?"Pause CTRL The Stacks":"Play CTRL The Stacks"}>{isPlaying?<Pause fill="currentColor"/>:<Play fill="currentColor"/>}</button>
        <span className="studio-sound-copy"><small>Now playing</small><strong>CTRL The Stacks</strong><em>Pexo &amp; Dreyego</em></span>
        <span className="studio-sound-time" aria-hidden="true">{formatTime(currentTime)} / {formatTime(duration)}</span>
        <input className="studio-sound-progress" type="range" min="0" max={duration||0} step="0.1" value={currentTime} onChange={(event)=>{const next=Number(event.target.value);if(audioRef.current)audioRef.current.currentTime=next;setCurrentTime(next)}} aria-label="Audio playback position"/>
      </div>
      <div className="studio-wave" aria-hidden="true">{Array.from({length:28}).map((_,i)=><span key={i} style={{height:`${18 + ((i*37)%82)}%`}}/>)}</div>
    </header>

    <section className="producer shell">
      <div className="producer-index"><span>01 / Your collaborator</span><div className="producer-disc"><Headphones/></div></div>
      <div className="producer-copy"><p className="role">Gareth Van Den Aardweg · Producer / Sound Engineer</p><h2>MUSIC IS A<br/><em>CONVERSATION.</em></h2><div className="quote-grid"><p>I’m Gareth Van Den Aardweg, and I thrive on collaboration. I believe in the power of bringing different perspectives together—of creating something greater than the sum of its parts.</p><p>I’m not just a producer. I’m a collaborator, a facilitator, a catalyst. I love working with artists who are passionate, willing to push boundaries, and ready to create something extraordinary. It’s about the connection, the synergy, the shared vision.</p></div></div>
    </section>

    <section className="studio-gallery shell" id="gallery" aria-label="Inside D.Town Records studio">
      <div className="gallery-title"><span>02 / In the room</span><p>From first idea to final playback—the work happens in the room, together.</p></div>
      <figure className="gallery-main"><img src="/studio/gareth-portrait.webp" alt="Gareth Van Den Aardweg" width="1407" height="1760" decoding="async"/><figcaption>Gareth Van Den Aardweg · Producer / Sound Engineer</figcaption></figure>
      <figure className="gallery-detail"><img src="/studio/recording-suite.webp" alt="D.Town Records recording session workspace" width="1125" height="1125" loading="lazy" decoding="async"/><figcaption>Session in progress</figcaption></figure>
      <figure className="gallery-live"><img src="/studio/gareth-live-enhanced.webp" alt="Gareth performing live behind his production setup" width="1536" height="1024" loading="lazy" decoding="async"/><figcaption>Live energy. Studio precision.</figcaption></figure>
    </section>

    <section className="studio-services">
      <div className="shell"><span className="studio-kicker">03 / What we can build</span><div className="service-grid">
        <article><Mic2/><b>Recording</b><p>Capture vocals and instruments with a session shaped around your sound.</p></article>
        <article><SlidersHorizontal/><b>Production</b><p>Develop the arrangement, energy and sonic identity from first idea to full record.</p></article>
        <article><Waves/><b>Mixing</b><p>Bring clarity, depth and impact to every element of your track.</p></article>
      </div></div>
    </section>

    <section className="session-guide shell" aria-labelledby="session-guide-title"><div className="session-guide-head"><span>04 / Before you book</span><h2 id="session-guide-title">COME READY.<br/><i>LEAVE WITH DIRECTION.</i></h2></div><div className="session-guide-grid"><article><span>01</span><b>Rates</b><p>Rates are quoted after the project and session requirements are understood. There is no charge for submitting a request.</p></article><article><span>02</span><b>Location</b><p>D.Town serves artists in South Africa. Exact studio details are shared when a session is confirmed.</p></article><article><span>03</span><b>What to bring</b><p>Bring lyrics, demos, instrumentals, reference tracks and a clear idea of what a successful session should achieve.</p></article><article><span>04</span><b>Confirmation</b><p>A request is not a confirmed booking. Dates, rates, deliverables and payment terms are agreed before the session.</p></article></div><div className="studio-faq"><details><summary>Can I book if my song is still an idea?</summary><p>Yes. Choose Production or Full project consultation and describe the direction you want to explore.</p></details><details><summary>Can I request recording and production together?</summary><p>Yes. Select Recording + Production so Gareth can plan the session around both needs.</p></details><details><summary>What happens if I need to reschedule?</summary><p>Rescheduling and cancellation terms are confirmed with the quote before any booking is finalised.</p></details></div></section>

    <section className="studio-book shell" id="studio-booking">
      <div className="studio-book-intro"><span>05 / Request a session</span><h2>LET’S MAKE<br/>SOMETHING<br/><i>EXTRAORDINARY.</i></h2><p>Tell us where your project is now and what you want to achieve. This request helps Gareth prepare the right session for you.</p><p className="response-time">You’ll receive an on-screen reference immediately. The team aims to respond within 1–2 business days.</p></div>
      <form onSubmit={submit}>
        <div className="hp-field" aria-hidden="true"><label htmlFor="studio-website">Website</label><input id="studio-website" name="website" tabIndex={-1} autoComplete="off"/></div>
        <div className="field"><label htmlFor="studio-name">Your name *</label><input id="studio-name" name="name" required placeholder="Full name"/></div>
        <div className="field"><label htmlFor="studio-email">Email *</label><input id="studio-email" name="email" type="email" required placeholder="you@email.com"/></div>
        <div className="field"><label htmlFor="studio-phone">Phone</label><input id="studio-phone" name="phone" type="tel" inputMode="tel" pattern="[0-9+() .-]{7,20}" placeholder="+27 ..." aria-describedby="studio-phone-help"/><small id="studio-phone-help">7–20 digits; spaces and + are accepted.</small></div>
        <div className="field"><label htmlFor="session-type">Session type *</label><select id="session-type" name="sessionType" required defaultValue=""><option value="" disabled>Select a service</option><option>Recording</option><option>Production</option><option>Mixing</option><option>Recording + Production</option><option>Full project consultation</option></select></div>
        <div className="field"><label htmlFor="studio-date">Preferred date *</label><input id="studio-date" name="preferredDate" type="date" min={today} required/></div>
        <div className="field"><label htmlFor="duration">Session length *</label><select id="duration" name="duration" required defaultValue=""><option value="" disabled>Select duration</option><option>2 hours</option><option>4 hours</option><option>Full day</option><option>Multi-day project</option><option>Not sure yet</option></select></div>
        <div className="field"><label htmlFor="genre">Genre / sound</label><input id="genre" name="genre" placeholder="e.g. hip-hop, amapiano, R&B"/></div>
        <div className="field"><label htmlFor="stage">Project stage</label><select id="stage" name="projectStage" defaultValue=""><option value="">Select current stage</option><option>Idea / early concept</option><option>Lyrics or demo ready</option><option>Instrumental ready</option><option>Recorded — needs mixing</option><option>Existing project consultation</option></select></div>
        <div className="field full"><label htmlFor="studio-message">Tell Gareth about your project</label><textarea id="studio-message" name="message" rows={5} placeholder="What are you making, what references inspire you, and what would make this session a success?"/></div>
        <div className="field full"><label htmlFor="demo-link">Demo or reference link</label><input id="demo-link" name="demoLink" type="url" inputMode="url" placeholder="https://..."/><small>Optional: a private or public link to a demo, beat or reference playlist.</small></div>
        <label className="consent"><input type="checkbox" name="consent" value="yes" required/><span>I agree that D.Town Records may use these details to assess and respond to my studio request. See the <Link href="/privacy">privacy notice</Link>.</span></label>
        <button className="submit" disabled={status.type==="sending"}>{status.type==="sending"?"Sending request...":<>Request studio session <ArrowRight/></>}</button>
        {status.type!=="idle"&&status.type!=="sending"&&<div className={`form-status ${status.type}`} role="status">{status.type==="success"&&<Check/>}{status.message}</div>}
      </form>
    </section>
    <footer className="studio-footer shell"><span>D.Town Records Studio</span><span><Link href="/privacy">Privacy</Link> · <Link href="/terms">Booking terms</Link></span><span>Connection. Synergy. Shared vision.</span></footer>
  </main>;
}
