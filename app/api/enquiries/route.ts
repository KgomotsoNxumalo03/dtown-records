import { getDb } from "../../../db";
import { enquiries } from "../../../db/schema";

const artists = ["ItzGazz", "DreyEGO", "Priest Pope", "Kory", "PediSkyWalker", "LaCASA", "Multiple artists"];

function clean(value: unknown, max = 500) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const payload = {
      name: clean(body.name, 120), email: clean(body.email, 160), phone: clean(body.phone, 40),
      organisation: clean(body.organisation, 160), artist: clean(body.artist, 80), eventType: clean(body.eventType, 80),
      eventDate: clean(body.eventDate, 30), venue: clean(body.venue, 180), city: clean(body.city, 120),
      budget: clean(body.budget, 80), message: clean(body.message, 1200),
    };
    if (!payload.name || !payload.email || !payload.artist || !payload.eventType || !payload.eventDate || !payload.venue || !payload.city) {
      return Response.json({ error: "Please complete all required fields." }, { status: 400 });
    }
    if (!/^\S+@\S+\.\S+$/.test(payload.email)) return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
    if (!artists.includes(payload.artist)) return Response.json({ error: "Please select an artist from the roster." }, { status: 400 });
    const db = getDb();
    const [saved] = await db.insert(enquiries).values(payload).returning({ id: enquiries.id });
    return Response.json({ ok: true, reference: `DT-${String(saved.id).padStart(4, "0")}` }, { status: 201 });
  } catch (error) {
    console.error("Booking enquiry failed", error);
    return Response.json({ error: "We could not save your enquiry. Please try again." }, { status: 500 });
  }
}
