import { ArrowLeft, ArrowRight, Camera, ExternalLink, Play } from "lucide-react";
import { artists, INSTAGRAM_URL, YOUTUBE_URL } from "../../../lib/artists";

export function generateStaticParams() {
  return artists.map(({ slug }) => ({ slug }));
}

export default async function ArtistPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const artist = artists.find((item) => item.slug === slug);
  if (!artist) return <main className="profile-missing"><h1>Artist not found.</h1><a href="/">Return to D.Town Records</a></main>;

  return <main className="artist-profile">
    <nav className="studio-nav shell"><a href="/" className="mark"><img src="/dtown-records-logo.png" alt="D.Town Records"/></a><a href="/#artists" className="back-link"><ArrowLeft size={16}/> Back to roster</a></nav>
    <section className="profile-hero shell">
      <div className="profile-copy"><span>{artist.code} / D.Town roster</span><h1>{artist.name}</h1><p>{artist.statement}</p><div className="profile-actions"><a className="primary-link" href={`/?artist=${encodeURIComponent(artist.name)}#book`}>Book {artist.name} <ArrowRight/></a><a href={YOUTUBE_URL} target="_blank" rel="noreferrer"><Play/> Hear D.Town releases</a></div></div>
      <div className={`profile-visual ${artist.tone} ${artist.image ? "has-photo" : ""}`}>{artist.image ? <img src={artist.image} alt={`${artist.name}, D.Town Records artist`}/> : <span>{artist.name.slice(0,1)}</span>}<i className="grain"/></div>
    </section>
    <section className="profile-band"><div className="shell"><span>Artist-first development</span><p>D.Town creates room for distinct voices to grow through creative collaboration, live opportunity and long-term direction.</p></div></section>
    <section className="profile-connect shell"><div><span>Follow the movement</span><h2>SEE WHAT’S<br/>HAPPENING NOW.</h2></div><div className="profile-socials"><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer"><Camera/> D.Town on Instagram <ExternalLink/></a><a href={YOUTUBE_URL} target="_blank" rel="noreferrer"><Play/> D.Town on YouTube <ExternalLink/></a></div></section>
  </main>;
}
