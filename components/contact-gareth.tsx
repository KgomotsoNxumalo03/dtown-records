import { Phone } from "lucide-react";
import { GARETH_PHONE_DISPLAY, GARETH_PHONE_TEL, GARETH_WHATSAPP_URL } from "../lib/contact";

function WhatsAppIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2a9.84 9.84 0 0 0-8.52 14.77L2 22l5.38-1.41A9.96 9.96 0 0 0 12.04 22 10 10 0 0 0 12.04 2Zm0 18.31a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.2.84.85-3.12-.2-.32a8.16 8.16 0 1 1 7.03 3.92Zm4.48-6.12c-.25-.12-1.45-.72-1.68-.8-.22-.08-.39-.12-.55.13-.16.24-.63.8-.77.96-.14.17-.28.19-.53.07-.24-.13-1.03-.38-1.96-1.21a7.3 7.3 0 0 1-1.36-1.7c-.14-.25-.01-.38.11-.5.1-.1.24-.28.36-.42.12-.14.16-.24.24-.41.08-.16.04-.3-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.3-.23.25-.86.85-.86 2.06 0 1.22.88 2.39 1 2.55.13.16 1.74 2.66 4.22 3.73.59.25 1.05.4 1.41.52.6.19 1.13.16 1.56.1.47-.07 1.45-.6 1.66-1.17.2-.57.2-1.06.14-1.17-.06-.1-.22-.16-.47-.28Z"/></svg>;
}

export function ContactGareth() {
  return <aside className="gareth-contact" aria-label="Contact Gareth"><div className="gareth-contact-name"><strong>Gareth</strong><span>{GARETH_PHONE_DISPLAY}</span></div><a className="whatsapp" href={GARETH_WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label={`Message Gareth on WhatsApp at ${GARETH_PHONE_DISPLAY}`}><WhatsAppIcon/><span>WhatsApp</span></a><a href={`tel:${GARETH_PHONE_TEL}`} aria-label={`Call Gareth at ${GARETH_PHONE_DISPLAY}`}><Phone aria-hidden="true"/><span>Call</span></a></aside>;
}
