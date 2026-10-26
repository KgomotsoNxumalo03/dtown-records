import { getDb } from "../../../db";
import { studioBookings } from "../../../db/schema";

function clean(value: unknown, max = 500) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    if (clean(body.website, 100)) return Response.json({ ok: true }, { status: 201 });
    if (clean(body.consent, 10) !== "yes") return Response.json({ error: "Please confirm that we may use your details to respond." }, { status: 400 });
    const payload = {
      name: clean(body.name, 120), email: clean(body.email, 160), phone: clean(body.phone, 40),
      sessionType: clean(body.sessionType, 100), preferredDate: clean(body.preferredDate, 30),
      duration: clean(body.duration, 40), genre: clean(body.genre, 100),
      projectStage: clean(body.projectStage, 120), message: clean(body.message, 1200),
    };
    if (!payload.name || !payload.email || !payload.sessionType || !payload.preferredDate || !payload.duration) {
      return Response.json({ error: "Please complete all required fields." }, { status: 400 });
    }
    if (!/^\S+@\S+\.\S+$/.test(payload.email)) {
      return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    const db = getDb();
    const [saved] = await db.insert(studioBookings).values(payload).returning({ id: studioBookings.id });
    return Response.json({ ok: true, reference: `ST-${String(saved.id).padStart(4, "0")}` }, { status: 201 });
  } catch (error) {
    console.error("Studio booking failed", error);
    return Response.json({ error: "We could not save your studio request. Please try again." }, { status: 500 });
  }
}
