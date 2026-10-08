"use client";
import Link from "next/link";
import Image from "next/image";
import Reveal from "./Reveal";
import styles from "./EventCard.module.css";

/**
 * Props: href, glyph, iconLabel, name, desc, tags, accent, big
 *        day       -> "5–6" or "7"
 *        month     -> "Nov"
 *        time      -> "11:00 AM → 11:00 AM" or "Starts 10:30 AM"
 *        dateNote  -> optional small text, e.g. "24 hours"
 *        image     -> path in /public, e.g. "/events/hackathon.jpg"
 */
export default function EventCard({
  href,
  glyph,
  iconLabel,
  name,
  desc,
  tags = [],
  accent,
  big,
  day,
  month,
  time,
  dateNote,
  image,
}) {
  const cardStyle = {};
  if (accent) cardStyle.borderColor = accent;

  return (
    <Reveal as={Link} href={href} className={styles.wrap}>
      <div className={`${styles.card} ${big ? styles.big : ""}`} style={cardStyle}>
        <div className={styles.top}>
          {image && (
            <div className={styles.media} aria-hidden="true">
              <Image
                src={image}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 480px"
                className={styles.photo}
              />
              <div className={styles.shade} />
            </div>
          )}

          <div className={styles.tab} />

          <div className={styles.tabRow}>
            <span className={styles.tabLabel}>{iconLabel}</span>
            {dateNote && <span className={styles.dateNote}>{dateNote}</span>}
          </div>

          <div className={styles.ghostClip} aria-hidden="true">
            <span className={styles.ghost}>{glyph}</span>
          </div>

          {(day || time) && (
            <div className={styles.meta}>
              {day && (
                <div className={styles.date}>
                  <span className={styles.day}>{day}</span>
                  <span className={styles.month}>{month}</span>
                </div>
              )}
              {time && (
                <div className={styles.time}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                  {time}
                </div>
              )}
            </div>
          )}
        </div>

        <div className={styles.bottom}>
          <span className={styles.name}>{name}</span>
          <p className={styles.desc}>{desc}</p>

          {tags.length > 0 && (
            <div className={styles.row}>
              {tags.slice(0, 3).map((t) => (
                <div key={t} className={styles.item}>
                  {t}
                </div>
              ))}
            </div>
          )}

          <div className={styles.cta}>
            View Event <span className={styles.arrow}>→</span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}