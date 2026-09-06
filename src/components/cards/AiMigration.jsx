import '../../styles/AiMigration.css';

export default function AiMigrationCard() {
  return (
    <div className="mig-card-root">
      <div className="mig-card">
        <div className="mig-topper" />

        <div className="mig-header">
          <div className="mig-eyebrow">Tooling Evaluation · Retrospective</div>
          <h2 className="mig-title">Migrating This Site: Create React App → Vite</h2>
          <p className="mig-subtitle">
            A working evaluation of an AI coding agent (Claude Code) on a real
            production migration — I set the plan and the guardrails, directed the
            work, and reviewed and validated every change.
          </p>
        </div>

        {/* ── Then vs. now ── */}
        <div className="mig-compare">
          <div className="mig-col">
            <div className="mig-col-label mig-col-label--muted">Earlier projects</div>
            <div className="mig-col-heading">Chat-assisted, manual</div>
            <p className="mig-col-text">
              I used ChatGPT, and later Claude in a chat window, as a sounding
              board — talk through options, get a snippet. I did the integration
              myself: adapting suggestions to the codebase, trying alternative
              approaches, tearing things apart to see how they worked, and debugging
              what broke. Every edit passed through my hands, so I understood each
              line — but I also carried the whole mechanical loop.
            </p>
          </div>
          <div className="mig-col">
            <div className="mig-col-label mig-col-label--accent">This migration</div>
            <div className="mig-col-heading">Agent-assisted, developer-directed</div>
            <p className="mig-col-text">
              I used Claude Code — an agent that reads the repo, edits files, and
              runs commands directly. I owned the shape of the work: approved the
              migration plan, made the calls on the <code>.jsx</code> renames and the
              build-output path, and signed off on every commit. The agent handled
              execution — CRA removal, Vite config, the Jest → Vitest swap,
              dependency cleanup, CloudFront fixes — and I read each diff before it
              landed.
            </p>
          </div>
        </div>

        <div className="mig-divider"><span>What I didn't hand off — the guardrails</span></div>

        <div className="mig-steps">
          <div className="mig-step">
            <div className="mig-node">01</div>
            <div className="mig-step-body">
              <div className="mig-step-title">Staged check-ins</div>
              <div className="mig-step-desc">
                The agent paused at every stage boundary for explicit sign-off before
                committing. I read each change rather than rubber-stamping it.
              </div>
            </div>
          </div>
          <div className="mig-step">
            <div className="mig-node">02</div>
            <div className="mig-step-body">
              <div className="mig-step-title">Version control</div>
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
                I deploy to the real site and test it myself before anything merges to{' '}
                <code>main</code> — same rule for this card.
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
          CRA to Vite is a well-worn path; the point of running it this way was to
          learn where a coding agent is genuinely useful on a real migration, and
          where a developer still has to step in. The mechanical loop — apply a
          change, hit the typo, go back — collapsed. The decision-making didn't.
        </p>
        <p>
          Every "rename the files or configure around it?", every "this touches
          production — are you sure?", every dependency-version call still needed a
          person who knew the codebase. The version-control and validation habits I
          built doing this work manually mattered <em>more</em> with an agent moving
          quickly, not less: fast execution is only safe with a clean rollback path
          and a real review step in front of it.
        </p>
        <p>
          Net result: build tooling off a deprecated dependency, a security
          audit from 62 findings to zero, a test suite that runs again, and a
          markedly lighter first load. This card was built with the same workflow
          it describes — on its own branch, pending a live check before it ships.
        </p>
      </div>
    </div>
  );
}
