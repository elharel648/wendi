export function CinematicStatement() {
  return (
    <div className="cin-outer" id="cin-statement">
      <div className="cin-sticky">
        <div className="cin-vignette-top" />
        <div className="cin-vignette-bot" />
        <div className="cin-ghost" aria-hidden="true">
          <span className="cin-ghost-word">פלטפורמה</span>
        </div>
        <div className="cin-stage">
          <span className="cin-l1">
            פלטפורמה <span className="cin-accent">אחת.</span>
          </span>
          <div className="cin-rule" />
          <span className="cin-l2">כל מה שהעובד צריך.</span>
        </div>
      </div>
    </div>
  );
}
