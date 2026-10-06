import '../../styles/Honeypot.css';

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
            published — not raw attacker data, and never the droplet's
            address or its real administrative access point.
          </p>
          <p className="hp-placeholder-note">
            Placeholder card — full write-up and live metrics coming soon.
          </p>
        </div>
      </div>
    </div>
  );
}
