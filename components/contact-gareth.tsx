import { MessageCircle, Phone } from "lucide-react";
import { GARETH_PHONE_DISPLAY, GARETH_PHONE_TEL, GARETH_WHATSAPP_URL } from "../lib/contact";

export function ContactGareth() {
  return <aside className="gareth-contact" aria-label="Contact Gareth"><div className="gareth-contact-name"><strong>Gareth</strong><span>{GARETH_PHONE_DISPLAY}</span></div><a className="whatsapp" href={GARETH_WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label={`Message Gareth on WhatsApp at ${GARETH_PHONE_DISPLAY}`}><MessageCircle aria-hidden="true"/><span>WhatsApp</span></a><a href={`tel:${GARETH_PHONE_TEL}`} aria-label={`Call Gareth at ${GARETH_PHONE_DISPLAY}`}><Phone aria-hidden="true"/><span>Call</span></a></aside>;
}
