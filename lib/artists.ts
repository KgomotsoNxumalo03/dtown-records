export type Artist = {
  name: string;
  slug: string;
  code: string;
  note: string;
  tone: string;
  image?: string;
  statement: string;
};

export const artists: Artist[] = [
  { name: "ItzGazz", slug: "itzgazz", code: "01", note: "RHYTHM / PRESENCE", tone: "tone-a", image: "/artists/itzgazz.webp", statement: "A distinct D.Town voice built around rhythm, presence and collaborative energy." },
  { name: "DreyEGO", slug: "dreyego", code: "02", note: "EDGE / ENERGY", tone: "tone-b", image: "/artists/dreyego.webp", statement: "Focused energy, direct delivery and a performance made to connect with the room." },
  { name: "Priest Pope", slug: "priest-pope", code: "03", note: "VOICE / VISION", tone: "tone-c", image: "/artists/priest-pope.webp", statement: "A voice-led creative presence shaped by perspective, character and intent." },
  { name: "Kory", slug: "kory", code: "04", note: "SOUL / MOTION", tone: "tone-d", statement: "Soul, movement and an evolving sound with space to move in unexpected directions." },
  { name: "PediSkyWalker", slug: "pediskywalker", code: "05", note: "FUTURE / ROOTS", tone: "tone-e", image: "/artists/pediskywalker.webp", statement: "A forward-facing performer bringing roots, momentum and live intensity together." },
  { name: "LaCASA", slug: "lacasa", code: "06", note: "LIVE / LIMITLESS", tone: "tone-f", image: "/artists/lacasa.webp", statement: "An open, expressive presence with a limitless approach to sound and performance." },
];

export const INSTAGRAM_URL = "https://www.instagram.com/d.townrecords/";
export const YOUTUBE_URL = "https://youtube.com/@dtownrecords1.0";
