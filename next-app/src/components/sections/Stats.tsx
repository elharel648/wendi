export function Stats() {
  return (
    <section className="st-stats" dir="rtl">
      <div className="st-stats-inner">
        <div className="st-stat">
          <div className="st-stat-num">
            <span className="st-count" data-to="98">0</span>
            <span className="st-stat-suf">%</span>
          </div>
          <div className="st-stat-lbl">שביעות רצון</div>
          <div className="st-stat-bar" />
        </div>
        <div className="st-stat">
          <div className="st-stat-num">
            +<span className="st-count" data-to="300">0</span>
            <span className="st-stat-suf">K</span>
          </div>
          <div className="st-stat-lbl">עובדים</div>
          <div className="st-stat-bar" />
        </div>
        <div className="st-stat">
          <div className="st-stat-num">
            +<span className="st-count" data-to="16">0</span>
          </div>
          <div className="st-stat-lbl">אפליקציות</div>
          <div className="st-stat-bar" />
        </div>
      </div>
    </section>
  );
}
