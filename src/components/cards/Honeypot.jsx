import '../../styles/Honeypot.css';

// Early-findings snapshot — aggregates only, computed locally from the
// honeypot archive. Update by hand until the live stats.json pipeline exists.
const SNAPSHOT = {
  asOf: "Oct 8, 2026",
  window: "first 3 days online",
};

const HEADLINE_STATS = [
  { value: "21,236", label: "SSH break-in attempts" },
  { value: "773", label: "unique attacking IPs" },
  { value: "86", label: "countries of origin" },
  { value: "~11s", label: "between attempts on the busiest day" },
];

const TOP_PASSWORDS = [
  { pw: "P@ssw0rd" },
  { pw: "123456" },
  { pw: "345gs5662d34", note: "hardcoded botnet credential" },
  { pw: "admin" },
  { pw: "12345678" },
  { pw: "password" },
];

const FINDINGS = [
  <><strong>~20,100 login attempts</strong> using 3,141 different usernames
    and 6,874 different passwords; <code>root</code> was the target in 27% of them.</>,
  <><strong>72% of all commands</strong> were <code>uname</code> system checks — bots
    fingerprint the machine before deciding what to do with it.</>,
  <><strong>129 sessions</strong> from the <code>mdrfckr</code> worm, which wipes the
    account's SSH keys and plants its own for permanent backdoor access.</>,
  <><strong>471 malware download attempts</strong> across 11 unique payloads —
    quarantined on the honeypot, never retrieved.</>,
  <><strong>97% of clients</strong> identify as <code>SSH-2.0-Go</code>: automated
    tooling, not people at keyboards.</>,
  <><strong>Heavily lopsided:</strong> one IP produced 21% of all traffic. The US
    has the most attacking IPs, but the Netherlands sent 54% of the volume.</>,
  <><strong>Roughly half residential:</strong> ~51% of attacking IPs look like
    home connections (likely compromised machines), ~43% datacenter, ~6% proxy/VPN
    or mobile.</>,
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
            Logs are pulled off the droplet one-way, deduplicated into an
            archive, and enriched with IP geolocation, ASN, and
            datacenter-vs-residential data. Only aggregate findings will be
            published — no raw attacker data, and never the droplet's
            address or its administrative access point.
          </p>
        </div>

        <div className="hp-findings">
          <div className="hp-section-label">
            Early findings · {SNAPSHOT.window}
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
            Snapshot as of {SNAPSHOT.asOf} — early sample, still collecting.
            Full write-up and live metrics coming soon.
          </p>
        </div>
      </div>
    </div>
  );
}
