import '../../styles/Honeypot.css';
import sessionsPerDay from '../../charts/honeypot/sessions-per-day.png';
import ipsByCountry from '../../charts/honeypot/ips-by-country.png';
import postLogin from '../../charts/honeypot/post-login-behavior.png';
import newBehavior from '../../charts/honeypot/new-behavior-per-day.png';
import botGroups from '../../charts/honeypot/bot-groups.png';
import fingerprints from '../../charts/honeypot/fingerprints-vs-families.png';

// Findings snapshot — aggregates only, computed locally from the full honeypot
// archive (Oct 4–11, 2026). Update by hand until the live stats.json pipeline exists.
const SNAPSHOT = {
  asOf: "Oct 11, 2026",
  window: "first week online",
};

const HEADLINE_STATS = [
  { value: "92,276", label: "SSH break-in attempts" },
  { value: "1,273", label: "unique attacking IPs" },
  { value: "101", label: "countries of origin" },
  { value: "~2.6s", label: "between attempts on the busiest day" },
];

const TOP_PASSWORDS = [
  { pw: "123456" },
  { pw: "P@ssw0rd" },
  { pw: "345gs5662d34", note: "hardcoded botnet credential" },
  { pw: "3245gs5662d34", note: "variant of the same credential" },
  { pw: "admin" },
  { pw: "12345678" },
];

const FINDINGS = [
  <><strong>~90,000 login attempts</strong> using 3,414 different usernames
    and 33,876 different passwords; <code>root</code> was the target in 69% of
    them, mostly from a single bot.</>,
  <><strong>One IP produced 66% of all traffic:</strong> a Singapore server that
    logged in 60,000+ times just to run <code>echo "ok"</code>, confirming which
    guessed passwords work.</>,
  <><strong>92% of all other commands</strong> were <code>uname</code> system
    checks — bots fingerprint the machine before deciding what to do with it.</>,
  <><strong>287 sessions</strong> from the <code>mdrfckr</code> worm, which wipes the
    account's SSH keys and plants its own for permanent backdoor access.</>,
  <><strong>951 files captured</strong> (downloads, uploads and files bots wrote)
    across 27 unique files, including RedTail cryptominer and Mirai-family
    builds — stored on the honeypot, never executed.</>,
  <><strong>98% of clients</strong> identify as <code>SSH-2.0-Go</code>: automated
    tooling, not people at keyboards.</>,
  <><strong>Roughly half residential:</strong> ~51% of attacking IPs look like
    home connections (likely compromised machines), ~44% datacenter, ~6% proxy/VPN
    or mobile. The US has the most attacking IPs.</>,
];

// Charts rendered from the honeypot archive (aggregates only). Regenerate by hand
// until the live pipeline exists.
const CHARTS_AS_OF = "Oct 11, 2026";

const CHARTS = [
  { src: sessionsPerDay, alt: "Stacked bar chart of SSH sessions per day, Oct 4 to 11, 2026, split into one Singapore validator bot and all other sources; the bot makes up most of the peak of 33,751 sessions on Oct 8.",
    caption: <>One IP in Singapore drives the spike: from Oct 7 it logged in tens of thousands of times just to confirm each guessed root password works.</> },
  { src: ipsByCountry, alt: "Bar chart of attacking IPs by country: United States 272, China 114, the Netherlands 78, then Argentina, Russia, Vietnam, India, France, Indonesia, South Korea, Germany and Hong Kong.",
    caption: <>Where connections come from, not where operators sit — most of these are rented cloud servers or compromised machines.</> },
  { src: postLogin, alt: "Bar chart on a log scale of what bots did after logging in: 27,320 sessions fingerprinted the system and left, 608 fetched or dropped malware, 367 requested a TCP tunnel, 295 planted an SSH key.",
    caption: <>Most bots only check what kind of machine they reached. A few hundred sessions try to install malware or a permanent SSH backdoor.</> },
  { src: newBehavior, alt: "Line chart of things seen for the first time each day: new commands peaked at 27 on Oct 9, new client fingerprints rose to 13 on Oct 10, and new malware payloads stayed between 0 and 8.",
    caption: <>New commands, client fingerprints and payloads keep appearing every day, so the honeypot is still worth running.</> },
  { src: botGroups, alt: "Bar chart on a log scale of 77 bot groups; the largest are a credential validator with 60,309 sessions and generic Go scanners, and evidence-labeled groups include the mdrfckr key-plant, RedTail cryptominer and a Mirai-style loader.",
    caption: <>Sessions grouped into bot families by shared evidence — the same payload, planted SSH key, download host or tunnel target. Orange groups are identified from that evidence.</> },
  { src: fingerprints, alt: "Dot plot of the 8 SSH client fingerprints shared by the most bot groups; one Go fingerprint is shared by RedTail, a Mirai-style loader and an embedded-key dropper, while the mdrfckr key-plant appears under two different fingerprints.",
    caption: <>An SSH client fingerprint identifies the toolkit, not the author: Go's default fingerprint is shared by unrelated malware families.</> },
];

export default function HoneypotCard() {
  return (
    <div className="hp-card-root">
      <div className="hp-card">
        <div className="hp-topper" />

        <div className="hp-header">
          <div className="hp-eyebrow">Security Research · Work in Progress</div>
          <h2 className="hp-title">Cowrie SSH/Telnet Honeypot</h2>
          <p className="hp-subtitle">
            A VPS running Cowrie, with SSH and Telnet ports
            redirected into it, isolated from administrative access —
            built to capture and analyze real-world intrusion attempts safely.
          </p>
        </div>

        <div className="hp-body">
          <p>
            Logs are pulled off the VPS one-way, deduplicated into an
            archive, and enriched with IP geolocation, ASN, and
            datacenter-vs-residential data. Only aggregate findings will be
            published — no raw attacker data, and never the VPS's
            address or its administrative access point.
          </p>
        </div>

        <div className="hp-findings">
          <div className="hp-section-label">
            Findings · {SNAPSHOT.window}
          </div>

          <div className="hp-stats">
            {HEADLINE_STATS.map((s) => (
              <div className="hp-stat" key={s.label}>
                <div className="hp-stat-value">{s.value}</div>
                <div className="hp-stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="hp-columns">
            <div className="hp-passwords">
              <div className="hp-subhead">Most-tried passwords</div>
              <ol>
                {TOP_PASSWORDS.map((p) => (
                  <li key={p.pw}>
                    <code>{p.pw}</code>
                    {p.note && <span className="hp-pw-note">{p.note}</span>}
                  </li>
                ))}
              </ol>
            </div>

            <div className="hp-notes">
              <div className="hp-subhead">What the bots did</div>
              <ul>
                {FINDINGS.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </div>
          </div>

          <p className="hp-placeholder-note">
            Snapshot as of {SNAPSHOT.asOf} — full dataset so far, still collecting.
            Full write-up and live metrics coming soon.
          </p>
        </div>

        <div className="hp-charts">
          <div className="hp-section-label">The data · first week online</div>
          {CHARTS.map((c) => (
            <figure className="hp-figure" key={c.src}>
              <a href={c.src} target="_blank" rel="noopener noreferrer" title="Open full size">
                <img src={c.src} alt={c.alt} loading="lazy" />
              </a>
              <figcaption>{c.caption}</figcaption>
            </figure>
          ))}
          <p className="hp-placeholder-note">
            Charts as of {CHARTS_AS_OF} (last day partial) — aggregates only.
            Click a chart to open it full size.
          </p>
        </div>
      </div>
    </div>
  );
}
