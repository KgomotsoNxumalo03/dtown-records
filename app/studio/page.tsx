"use client";

import { FormEvent, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Headphones, Mic2, SlidersHorizontal, Waves } from "lucide-react";

export default function StudioPage() {
  const [status, setStatus] = useState<{type:"idle"|"sending"|"success"|"error";message?:string}>({type:"idle"});

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus({type:"sending"});
    const form = event.currentTarget;
    try {
      const response = await fetch("/api/studio-bookings", {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Object.fromEntries(new FormData(form)))});
      const result = await response.json() as {error?:string;reference?:string};
      if (!response.ok) throw new Error(result.error || "Something went wrong.");
      setStatus({type:"success",message:`Studio request received. Your reference is ${result.reference}.`}); form.reset();
    } catch (error) {
      setStatus({type:"error",message:error instanceof Error ? error.message : "Please try again."});
    }
  }

  return <main className="studio-page">
    <nav className="studio-nav shell"><a href="/" className="mark"><img src="/dtown-records-logo.png" alt="D.Town Records"/></a><a href="/" className="back-link"><ArrowLeft size={16}/> Back to D.Town Records</a></nav>

    <header className="studio-hero shell">
      <div className="studio-tag"><span>Studio sessions</span><span>Production / Recording / Mixing</span></div>
      <div className="studio-title"><p>Turn the idea into the record.</p><h1>MAKE<br/><i>NOISE.</i></h1></div>
      <div className="studio-wave" aria-hidden="true">{Array.from({length:28}).map((_,i)=><span key={i} style={{height:`${18 + ((i*37)%82)}%`}}/>)}</div>
    </header>

    <section className="producer shell">
      <div className="producer-index"><span>01 / Your collaborator</span><div className="producer-disc"><Headphones/></div></div>
      <div className="producer-copy"><p className="role">Gareth Van Den Aardweg · Producer / Sound Engineer</p><h2>MUSIC IS A<br/><em>CONVERSATION.</em></h2><div className="quote-grid"><p>I’m Gareth Van Den Aardweg, and I thrive on collaboration. I believe in the power of bringing different perspectives together—of creating something greater than the sum of its parts.</p><p>I’m not just a producer. I’m a collaborator, a facilitator, a catalyst. I love working with artists who are passionate, willing to push boundaries, and ready to create something extraordinary. It’s about the connection, the synergy, the shared vision.</p></div></div>
    </section>

    <section className="studio-gallery shell" id="gallery" aria-label="Inside D.Town Records studio">
      <div className="gallery-title"><span>02 / In the room</span><p>From first idea to final playback—the work happens in the room, together.</p></div>
      <figure className="gallery-main"><img src="/studio/gareth-portrait.png" alt="Gareth Van Den Aardweg"/><figcaption>Gareth Van Den Aardweg · Producer / Sound Engineer</figcaption></figure>
      <figure className="gallery-detail"><img src="/studio/recording-suite.png" alt="D.Town Records recording session workspace"/><figcaption>Session in progress</figcaption></figure>
      <figure className="gallery-live"><img src="/studio/gareth-live-enhanced.png" alt="Gareth performing live behind his production setup"/><figcaption>Live energy. Studio precision.</figcaption></figure>
    </section>

    <section className="studio-services">
      <div className="shell"><span className="studio-kicker">03 / What we can build</span><div className="service-grid">
        <article><Mic2/><b>Recording</b><p>Capture vocals and instruments with a session shaped around your sound.</p></article>
        <article><SlidersHorizontal/><b>Production</b><p>Develop the arrangement, energy and sonic identity from first idea to full record.</p></article>
        <article><Waves/><b>Mixing</b><p>Bring clarity, depth and impact to every element of your track.</p></article>
      </div></div>
    </section>

    <section className="studio-book shell" id="studio-booking">
      <div className="studio-book-intro"><span>04 / Request a session</span><h2>LET’S MAKE<br/>SOMETHING<br/><i>EXTRAORDINARY.</i></h2><p>Tell us where your project is now and what you want to achieve. This request helps Gareth prepare the right session for you.</p></div>
      <form onSubmit={submit}>
        <div className="field"><label htmlFor="studio-name">Your name *</label><input id="studio-name" name="name" required placeholder="Full name"/></div>
        <div className="field"><label htmlFor="studio-email">Email *</label><input id="studio-email" name="email" type="email" required placeholder="you@email.com"/></div>
        <div className="field"><label htmlFor="studio-phone">Phone</label><input id="studio-phone" name="phone" placeholder="+27 ..."/></div>
        <div className="field"><label htmlFor="session-type">Session type *</label><select id="session-type" name="sessionType" required defaultValue=""><option value="" disabled>Select a service</option><option>Recording</option><option>Production</option><option>Mixing</option><option>Recording + Production</option><option>Full project consultation</option></select></div>
        <div className="field"><label htmlFor="studio-date">Preferred date *</label><input id="studio-date" name="preferredDate" type="date" required/></div>
        <div className="field"><label htmlFor="duration">Session length *</label><select id="duration" name="duration" required defaultValue=""><option value="" disabled>Select duration</option><option>2 hours</option><option>4 hours</option><option>Full day</option><option>Multi-day project</option><option>Not sure yet</option></select></div>
        <div className="field"><label htmlFor="genre">Genre / sound</label><input id="genre" name="genre" placeholder="e.g. hip-hop, amapiano, R&B"/></div>
        <div className="field"><label htmlFor="stage">Project stage</label><select id="stage" name="projectStage" defaultValue=""><option value="">Select current stage</option><option>Idea / early concept</option><option>Lyrics or demo ready</option><option>Instrumental ready</option><option>Recorded — needs mixing</option><option>Existing project consultation</option></select></div>
        <div className="field full"><label htmlFor="studio-message">Tell Gareth about your project</label><textarea id="studio-message" name="message" rows={5} placeholder="What are you making, what references inspire you, and what would make this session a success?"/></div>
        <button className="submit" disabled={status.type==="sending"}>{status.type==="sending"?"Sending request...":<>Request studio session <ArrowRight/></>}</button>
        {status.type!=="idle"&&status.type!=="sending"&&<div className={`form-status ${status.type}`} role="status">{status.type==="success"&&<Check/>}{status.message}</div>}
      </form>
    </section>
    <footer className="studio-footer shell"><span>D.Town Records Studio</span><span>Connection. Synergy. Shared vision.</span></footer>
  </main>;
}
