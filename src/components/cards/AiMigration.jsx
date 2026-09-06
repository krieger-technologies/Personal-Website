import '../../styles/AiMigration.css';

export default function AiMigrationCard() {
  return (
    <div className="mig-card-root">
      <div className="mig-card">
        <div className="mig-topper" />

        <div className="mig-header">
          <div className="mig-eyebrow">Dev Process · Retrospective</div>
          <h2 className="mig-title">Migrating This Site: Create React App → Vite</h2>
          <p className="mig-subtitle">
            An experiment in how hands-off I could be — letting an AI agent run a
            full build-tooling migration while I stayed in a review-and-approve seat.
          </p>
        </div>

        {/* ── Then vs. now ── */}
        <div className="mig-compare">
          <div className="mig-col">
            <div className="mig-col-label mig-col-label--muted">Earlier projects</div>
            <div className="mig-col-heading">Hands-on</div>
            <p className="mig-col-text">
              I used ChatGPT, and later Claude in a normal chat window: describe the
              problem, get a snippet, paste it in myself, run it, report back the
              error, repeat. I made every edit and ran every command. The AI was a
              very good second pair of eyes — the hands were always mine.
            </p>
          </div>
          <div className="mig-col">
            <div className="mig-col-label mig-col-label--accent">This migration</div>
            <div className="mig-col-heading">Hands-off</div>
            <p className="mig-col-text">
              I ran it through Claude Code — an agent that reads the repo, edits
              files, and runs commands directly. My job shifted from typing to
              deciding: approve the plan, answer the branching questions, sign off
              on each commit. The agent did the CRA removal, the <code>.jsx</code>{' '}
              renames, the Vite config, the Jest → Vitest swap, dependency cleanup,
              and the CloudFront fixes.
            </p>
          </div>
        </div>

        <div className="mig-divider"><span>What I didn't hand off — the guardrails</span></div>

        <div className="mig-steps">
          <div className="mig-step">
            <div className="mig-node">01</div>
            <div className="mig-step-body">
              <div className="mig-step-title">Check-ins</div>
              <div className="mig-step-desc">
                The agent stopped at every stage boundary and waited for my explicit
                OK before committing. Nothing moved forward on autopilot.
              </div>
            </div>
          </div>
          <div className="mig-step">
            <div className="mig-node">02</div>
            <div className="mig-step-body">
              <div className="mig-step-title">Git discipline</div>
              <div className="mig-step-desc">
                A dedicated feature branch, a <code>pre-vite-migration</code> rollback
                tag pushed <em>before</em> any change, one commit per stage, pushed to
                GitHub each time. A known-good state was always one command away.
              </div>
            </div>
          </div>
          <div className="mig-step mig-step--last">
            <div className="mig-node">03</div>
            <div className="mig-step-body">
              <div className="mig-step-title">Live validation</div>
              <div className="mig-step-desc">
                I deploy to the real site and click through it myself before anything
                merges to <code>main</code>. Same rule for this card.
              </div>
            </div>
          </div>
        </div>

        <div className="mig-divider"><span>Outcome</span></div>

        <div className="mig-metrics">
          <div className="mig-metric">
            <div className="mig-metric-val">react-scripts → Vite</div>
            <div className="mig-metric-lbl">Build tooling</div>
          </div>
          <div className="mig-metric">
            <div className="mig-metric-val">62 → 0</div>
            <div className="mig-metric-lbl">Vulnerabilities</div>
          </div>
          <div className="mig-metric">
            <div className="mig-metric-val">~1.5 MB → ~103 KB</div>
            <div className="mig-metric-lbl">Initial JS (gzip)</div>
          </div>
          <div className="mig-metric">
            <div className="mig-metric-val">broken → passing</div>
            <div className="mig-metric-lbl">Test suite</div>
          </div>
        </div>
      </div>

      <div className="mig-text">
        <p>
          The interesting part wasn't the migration itself — CRA to Vite is a
          well-worn path — it was watching how little I needed to touch the keyboard.
          On earlier projects the bottleneck was me: reading the suggestion, applying
          it, finding the typo, going back. Handing the mechanical work to an agent
          collapsed that loop.
        </p>
        <p>
          What it didn't remove was judgment. Every "rename the files or configure
          around it?", every "this touches production — are you sure?", every commit
          message still went through me. The habits I built doing this the manual way
          — branch first, tag a rollback point, verify live — mattered <em>more</em>{' '}
          with an agent moving quickly, not less.
        </p>
        <p>
          This card is itself part of the experiment: drafted by the agent, on its
          own branch, waiting on my live check before it ships.
        </p>
      </div>
    </div>
  );
}
