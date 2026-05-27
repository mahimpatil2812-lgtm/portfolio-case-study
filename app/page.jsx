"use client";

import { useState, useEffect, useRef } from "react";

const sections = [
  {
    id: "01",
    label: "The Project",
    title: "Some projects are complicated.\nThis one was complex.",
    body: `Complicated means a lot of moving parts. Complex means the parts don't just move — they affect each other. Change one thing, and three other things break.

That's what we walked into.

A Corporate Banking Portal. Zero to one. No prior digital product. No regional benchmark mature enough to learn from. Just a BRD that read complete — until you tried to follow it.

The first time we sat down to map the registration flow end to end — and saw how far it went — it was overwhelming. But it was also exciting. Because that's the kind of problem that actually means something to solve.`,
    quote: '"This is the story of how we solved it."',
  },
  {
    id: "02",
    label: "Discovery",
    title: "The BRD read complete.\nUntil you tried to follow it.",
    body: `The flow said: once the corporate registration was complete, the user would receive a registration link via email. But email was never captured anywhere in the registration form.

That single gap opened a chain of questions. Do we pull the email from the bank's core system? Use phone number via SMS instead? Add a new email field?

Each option had different technical dependencies and UX implications — and none of it was addressed in the BRD.

This wasn't an isolated case. It was the pattern. We used FigJam to map every broken flow visually — showing the client the gaps, not listing them. The defensiveness gave way to collaboration.`,
    quote: '"The document felt complete until you tried to follow it."',
    visual: "discovery",
  },
  {
    id: "03",
    label: "Market Research",
    title: "The client was the only bank\nwith no digital presence.",
    body: `84% of all banking services in the region were already conducted through digital channels. Competitors had live corporate portals for over a year.

Trade finance — Letters of Credit, Letters of Guarantee — was 100% walk-in only. A finance manager importing goods from overseas had zero digital visibility into their LC status.

The market had clustered into four tiers of digital maturity. The client sat at Tier 4. The only bank in the peer group with zero corporate digital presence.

The goal: move from Tier 4 to Tier 2 in Phase 1.`,
    quote: '"The window to enter as a credible digital player was narrowing."',
    visual: "competitor",
  },
  {
    id: "04",
    label: "Registration",
    title: "What looked like a form\nwas actually an entire product.",
    body: `The original BRD described registration as five fields and a link. But when we mapped it end to end, we realised registration wasn't a form. It was the foundation of the entire portal.

Every limit, every user role, every approval workflow — all configured here.

A structured 5-step BO process: Corporate Details, Account Details, Authorizer/Admin, Services, Limits Schema. Each step fed the next.

The Limits Schema borrowed the Figma Variables concept — a base rule with variants that inherited approver groups but allowed individual portal limits per sub-transaction type.`,
    quote: '"Get registration wrong and nothing else works."',
    visual: "registration",
  },
  {
    id: "05",
    label: "Roles & Access",
    title: "Building for scale,\nnot just the brief.",
    body: `The BRD defined five roles. What it didn't define was where each role's authority ended — and where another's began.

The rule from the start: no single user should be too powerful. Financial authority and administrative authority were intentionally separated.

The breakthrough came when discussing Company Users. What if the same user needed Maker access on Salaries, Approver on Transfers, and View-only on E-Fawateer?

A portal-level role couldn't express this. A feature-level access matrix could — and it wasn't in the BRD. Getting it approved required storytelling. Putting the client in the user's seat until they felt the problem themselves.`,
    quote: '"Maker on Salaries. Approver on Transfers. View-only on E-Fawateer."',
    visual: "roles",
  },
  {
    id: "06",
    label: "Salary Module",
    title: "Three flows.\nThree duplicate rules.\nOne system.",
    body: `Salary wasn't one workflow. It was three — with completely different logic for each.

The original upload flow rejected invalid rows entirely. The redesigned approach kept users inside the portal with inline error fixing, re-validation flows, and contextual guidance.

146 clean rows were never re-processed. Only the rows that needed fixing were touched again.

And a file naming convention — Feature_Purpose_MMMYYYY — applied across every downloadable template in the entire portal.`,
    quote: '"Same pattern. Three completely different responses."',
    visual: "salary",
  },
  {
    id: "07",
    label: "Workflow Builder",
    title: "Replacing paper\nwith logic.",
    body: `Before the portal: signed mandates, stamped forms, signature cards. Approvals were physical, opaque, and slow.

The workflow builder replaced all of that with a configurable rule engine that any Corporate Admin could own.

AND/OR logic: OR within a level (any one user can approve), AND between levels (all levels must complete in sequence).

Groups were removed entirely — Approver Levels became the groups. One place to build. One place to edit. Maximum 15 levels, validated by RM research.`,
    quote: '"You are not lost. Here is what happens next."',
    visual: "workflow",
  },
  {
    id: "08",
    label: "Back Office",
    title: "One platform.\nEight Plus tenants.\nZero confusion.",
    body: `Rather than a separate corporate BO, the retail BO was re-architected as multi-tenant. Same infrastructure, independent contexts.

Design contribution: a single-hex-code colour theme generator. One input produces a full 50–900 colour scale. Each tenant gets a distinct colour.

Over time, colour becomes context. Muscle memory, not conscious thought. Switching tenants feels different before it registers consciously.

The NTB closed loop: FE submission → request pool → CRM handoff → CIF obtained → RM re-enters → same 5-step process. One continuous journey, two systems, one button.`,
    quote: '"One platform. Multiple ecosystems."',
    visual: "bo",
  },
  {
    id: "09",
    label: "Reflection",
    title: "From designer\nto consultant.",
    body: `This project started as a UX design engagement. It ended as something closer to product consulting.

Identifying gaps in the BRD. Expanding scope to serve new-to-bank customers. Defining the role access matrix that didn't exist in the brief. Pitching the RM-initiated registration flow. Designing the multi-tenant BO colour system.

None of these were in the job description. All of them made the product better.

The process wasn't followed. It was earned — one decision at a time.`,
    quote: '"I don\'t work well in perfect conditions. I work well when the problem is real and the stakes matter."',
    visual: "reflection",
  },
];

const tiers = [
  { num: "T1", label: "Leaders", title: "Full-Suite Enterprise", score: "9/10", desc: "Dedicated portal, ERP integration, trade finance, mobile app.", color: "#1D9E75", glow: "rgba(29,158,117,0.15)", bar: 0.95 },
  { num: "T2", label: "Strong", title: "Dedicated Portal", score: "7.5–8.5", desc: "Multi-user management, salary, digital trade finance.", color: "#378ADD", glow: "rgba(55,138,221,0.12)", bar: 0.78 },
  { num: "T3", label: "Developing", title: "Shared Portal", score: "5–6/10", desc: "Some corporate features, not purpose-built.", color: "#EF9F27", glow: "rgba(239,159,39,0.12)", bar: 0.5 },
  { num: "T4", label: "Client", title: "Branch-Only", score: "1.5/10", desc: "Zero corporate digital presence — the client's position.", color: "#E24B4A", glow: "rgba(226,75,74,0.15)", bar: 0.15 },
];

const roles = [
  { name: "Admin", desc: "Manages users. Zero financial access.", color: "#534AB7" },
  { name: "Authoriser", desc: "Final financial approval. Limits from core.", color: "#1D9E75" },
  { name: "Approver", desc: "Intermediate approval layer.", color: "#378ADD" },
  { name: "Maker", desc: "Initiates. Cannot approve own requests.", color: "#EF9F27" },
  { name: "Company User", desc: "Fully configurable per feature — the most variable role.", color: "#D85A30" },
];

const salaryRules = [
  { title: "Employee Upload", rule: "Duplicate = salary raise", color: "#1D9E75", desc: "Show list. Confirm. Replace. No blocking." },
  { title: "Salary Transfer", rule: "Duplicate = paying twice", color: "#E24B4A", desc: "Force selection. One entry removed." },
  { title: "Bulk Transfer", rule: "Duplicate = often valid", color: "#EF9F27", desc: "Allow both. Warn. User proceeds informed." },
];

function HeroMockup() {
  return (
    <div style={{ position: "relative", minHeight: 680, marginTop: "4rem" }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 48, background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 100%)", border: "0.5px solid rgba(255,255,255,0.06)" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at top right, rgba(95,90,255,0.15), transparent 30%)" }} />
      </div>
      {/* Main dashboard window */}
      <div style={{ position: "absolute", left: 32, top: 32, width: "70%", height: 500, borderRadius: 32, background: "#121212", border: "0.5px solid rgba(255,255,255,0.07)", overflow: "hidden", boxShadow: "0 40px 80px rgba(0,0,0,0.6)" }}>
        <div style={{ height: 56, borderBottom: "0.5px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", padding: "0 24px", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 8 }}>
            {[0.2, 0.1, 0.1].map((o, i) => <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: `rgba(255,255,255,${o})` }} />)}
          </div>
          <div style={{ height: 32, width: 140, borderRadius: 16, background: "rgba(255,255,255,0.04)" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", height: "100%" }}>
          <div style={{ borderRight: "0.5px solid rgba(255,255,255,0.04)", padding: 20, display: "flex", flexDirection: "column", gap: 10 }}>
            {[0.07, 0.04, 0.04, 0.04, 0.04].map((o, i) => <div key={i} style={{ height: 36, borderRadius: 10, background: `rgba(255,255,255,${o})` }} />)}
          </div>
          <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
              {[0.05, 0.04, 0.04].map((o, i) => <div key={i} style={{ height: 100, borderRadius: 20, background: `rgba(255,255,255,${o})`, border: "0.5px solid rgba(255,255,255,0.04)" }} />)}
            </div>
            <div style={{ flex: 1, borderRadius: 24, background: "rgba(255,255,255,0.025)", border: "0.5px solid rgba(255,255,255,0.04)" }} />
          </div>
        </div>
      </div>
      {/* Floating mobile */}
      <div style={{ position: "absolute", right: 24, top: 48, width: 220, height: 440, borderRadius: 36, background: "#101010", border: "0.5px solid rgba(255,255,255,0.07)", transform: "rotate(6deg)", overflow: "hidden", boxShadow: "0 40px 80px rgba(0,0,0,0.5)" }}>
        <div style={{ height: 44, borderBottom: "0.5px solid rgba(255,255,255,0.04)" }} />
        <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
          {[80, 56, 120, 56].map((h, i) => <div key={i} style={{ height: h, borderRadius: 16, background: `rgba(255,255,255,${i === 0 ? 0.05 : 0.03})` }} />)}
        </div>
      </div>
      {/* Floating card */}
      <div style={{ position: "absolute", left: 48, bottom: 24, width: 300, borderRadius: 24, background: "rgba(18,18,18,0.95)", border: "0.5px solid rgba(255,255,255,0.07)", backdropFilter: "blur(20px)", padding: 24 }}>
        <div style={{ fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 16 }}>Enterprise Workflow</div>
        {[["Maker initiates request", "#534AB7"], ["Approver Level 1", "#1D9E75"], ["Authoriser — final approval", "#378ADD"]].map(([label, color], i) => (
          <div key={i}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: `${color}20`, border: `0.5px solid ${color}40`, flexShrink: 0 }} />
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>{label}</div>
            </div>
            {i < 2 && <div style={{ marginLeft: 15, height: 16, borderLeft: "1px dashed rgba(255,255,255,0.08)" }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

function DiscoveryVisual() {
  return (
    <div style={{ borderRadius: 32, background: "linear-gradient(135deg,#121212,#0d0d0d)", border: "0.5px solid rgba(255,255,255,0.06)", padding: "2rem", marginBottom: "2rem" }}>
      <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: "1.25rem" }}>BRD Gap Analysis</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {[
          { step: "Corporate registers", status: "ok", note: "CIF, name, mobile, company" },
          { step: "Request sent to BO", status: "ok", note: "Assigned to RM" },
          { step: "Registration link sent via email", status: "broken", note: "Email was never collected" },
          { step: "User completes registration", status: "blocked", note: "Cannot proceed — link has no destination" },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: item.status === "ok" ? "rgba(29,158,117,0.15)" : item.status === "broken" ? "rgba(226,75,74,0.15)" : "rgba(239,159,39,0.1)", border: `0.5px solid ${item.status === "ok" ? "#1D9E75" : item.status === "broken" ? "#E24B4A" : "#EF9F27"}40`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 12 }}>
              {item.status === "ok" ? "✓" : item.status === "broken" ? "✗" : "?"}
            </div>
            <div style={{ flex: 1, background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>{item.step}</span>
              <span style={{ fontSize: 11, color: item.status === "broken" ? "#E24B4A" : "rgba(255,255,255,0.3)" }}>{item.note}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CompetitorVisual() {
  return (
    <div style={{ borderRadius: 40, background: "linear-gradient(135deg,#121212 0%,#0b0b0b 60%,#101010 100%)", border: "0.5px solid rgba(255,255,255,0.05)", padding: "2.5rem", marginBottom: "2rem", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at top right,rgba(80,80,255,0.1),transparent 30%), radial-gradient(circle at bottom left,rgba(0,180,120,0.07),transparent 30%)", pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: "0.75rem" }}>Competitive Landscape</div>
        <div style={{ fontSize: 28, fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, color: "#fff", marginBottom: "2rem", lineHeight: 1.2 }}>The market had already moved.</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: "1.5rem" }}>
          {tiers.map(t => (
            <div key={t.num} style={{ borderRadius: 20, background: t.num === "T4" ? `linear-gradient(135deg,#181818,#101010)` : `rgba(255,255,255,0.02)`, border: `0.5px solid ${t.num === "T4" ? t.color + "30" : "rgba(255,255,255,0.06)"}`, padding: "1.25rem", position: "relative", overflow: "hidden" }}>
              {t.num === "T4" && <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at top right,${t.glow},transparent 50%)`, pointerEvents: "none" }} />}
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 8 }}>{t.num} · {t.label}</div>
                <div style={{ fontSize: 16, fontWeight: 500, color: "#fff", marginBottom: 6, lineHeight: 1.3 }}>{t.title}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 1.6, marginBottom: 14 }}>{t.desc}</div>
                <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 4, height: 3, overflow: "hidden", marginBottom: 6 }}>
                  <div style={{ width: `${t.bar * 100}%`, height: "100%", background: t.color, borderRadius: 4 }} />
                </div>
                <div style={{ fontSize: 11, color: t.color, fontWeight: 500 }}>{t.score}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderRadius: 20, overflow: "hidden", border: "0.5px solid rgba(255,255,255,0.06)", background: "rgba(19,19,19,0.9)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr", padding: "12px 20px", borderBottom: "0.5px solid rgba(255,255,255,0.05)" }}>
            {["Capability", "Trade Finance", "Bulk Ops", "Approvals", "Mobile"].map(h => (
              <div key={h} style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>{h}</div>
            ))}
          </div>
          {[["T1 Leaders", true, true, true, true], ["T2 Strong", true, true, true, true], ["T3 Developing", "partial", "partial", "partial", false], ["Client (T4)", false, false, false, false]].map(([name, ...vals], i) => (
            <div key={name} style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr", padding: "10px 20px", borderBottom: i < 3 ? "0.5px solid rgba(255,255,255,0.04)" : "none", background: i === 3 ? "rgba(255,255,255,0.02)" : "transparent" }}>
              <div style={{ fontSize: 13, color: i === 3 ? "#E24B4A" : "rgba(255,255,255,0.7)", fontWeight: i === 3 ? 500 : 400 }}>{name}</div>
              {vals.map((v, j) => (
                <div key={j} style={{ fontSize: 13, color: v === true ? "#1D9E75" : v === "partial" ? "#EF9F27" : "#E24B4A", fontWeight: 500 }}>
                  {v === true ? "✓" : v === "partial" ? "~" : "✗"}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RegistrationVisual() {
  const steps = ["Corporate Details", "Account Details", "Authorizer / Admin", "Services", "Limits Schema"];
  return (
    <div style={{ borderRadius: 28, background: "rgba(255,255,255,0.02)", border: "0.5px solid rgba(255,255,255,0.07)", padding: "1.75rem", marginBottom: "2rem" }}>
      <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: "1.25rem" }}>BO Registration — 5-Step Process</div>
      <div style={{ display: "flex", gap: 6 }}>
        {steps.map((s, i) => (
          <div key={s} style={{ flex: 1, borderRadius: 12, background: `rgba(83,74,183,${0.08 + i * 0.04})`, border: `0.5px solid rgba(83,74,183,${0.2 + i * 0.1})`, padding: "12px 10px", textAlign: "center" }}>
            <div style={{ fontSize: 18, fontWeight: 500, color: `rgba(83,74,183,${0.4 + i * 0.15})`, marginBottom: 6 }}>{i + 1}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", lineHeight: 1.4 }}>{s}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16, borderRadius: 12, background: "rgba(83,74,183,0.06)", border: "0.5px solid rgba(83,74,183,0.15)", padding: "12px 16px" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(83,74,183,0.6)", marginBottom: 4 }}>Figma Variables → Limits Schema</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>Base rule inherits approver groups. Variants override portal limits per sub-transaction type. One checkbox mirrors core limits for MNCs.</div>
      </div>
    </div>
  );
}

function RolesVisual() {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8, marginBottom: 12 }}>
        {roles.map(r => (
          <div key={r.name} style={{ borderRadius: 14, background: `${r.color}08`, border: `0.5px solid ${r.color}25`, padding: "1rem 0.875rem" }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: "#fff", marginBottom: 4 }}>{r.name}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>{r.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ borderRadius: 14, background: "rgba(255,255,255,0.02)", border: "0.5px solid rgba(255,255,255,0.07)", padding: "14px 16px" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 8 }}>Feature-Level Access Matrix — Company User</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 6 }}>
          {[["E-Fawateer","View only","rgba(55,138,221,0.6)"],["Transfers","Approver","rgba(29,158,117,0.6)"],["Salaries","Maker","rgba(239,159,39,0.6)"],["CliQ","No access","rgba(226,75,74,0.5)"]].map(([feat,role,c]) => (
            <div key={feat} style={{ borderRadius: 8, background: "rgba(255,255,255,0.03)", padding: "8px 10px" }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 2 }}>{feat}</div>
              <div style={{ fontSize: 12, fontWeight: 500, color: c }}>{role}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SalaryVisual() {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 12 }}>
        {salaryRules.map(r => (
          <div key={r.title} style={{ borderRadius: 16, background: `${r.color}08`, border: `0.5px solid ${r.color}30`, padding: "1.125rem" }}>
            <div style={{ fontSize: 10, fontWeight: 500, color: r.color, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>{r.title}</div>
            <div style={{ fontSize: 13, fontWeight: 500, color: "#fff", marginBottom: 6, lineHeight: 1.4 }}>{r.rule}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>{r.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ borderRadius: 14, background: "rgba(255,255,255,0.02)", border: "0.5px solid rgba(255,255,255,0.07)", padding: "14px 16px" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 6 }}>Inline Error Resolution</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>Invalid rows surface inline — editable within the portal. Re-Validate checks only previously flagged rows. 146 clean rows were never re-processed.</div>
      </div>
    </div>
  );
}

function WorkflowVisual() {
  return (
    <div style={{ borderRadius: 24, background: "rgba(255,255,255,0.02)", border: "0.5px solid rgba(255,255,255,0.07)", padding: "1.75rem", marginBottom: "2rem" }}>
      <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: "1.25rem" }}>AND / OR Approval Logic</div>
      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginBottom: "1rem", fontStyle: "italic" }}>Example: Mahim initiates a salary transfer</div>
      {[
        { level: "Maker", users: ["Mahim"], logic: null, color: "#EF9F27" },
        { level: "Approver Level 1", users: ["Rupam", "Sunita"], logic: "OR", color: "#534AB7" },
        { level: "Approver Level 2", users: ["Gaurav", "Ahmad", "Zaid"], logic: "AND", color: "#534AB7" },
        { level: "Authoriser", users: ["Rafat"], logic: "AND", color: "#1D9E75" },
      ].map((row, i) => (
        <div key={row.level}>
          {row.logic && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0 6px 16px" }}>
              <div style={{ height: 16, borderLeft: "1px dashed rgba(255,255,255,0.1)" }} />
              <div style={{ fontSize: 10, letterSpacing: "0.15em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>{row.logic}</div>
            </div>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ fontSize: 10, letterSpacing: "0.1em", color: "rgba(255,255,255,0.25)", width: 120, flexShrink: 0 }}>{row.level}</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {row.users.map((u, j) => (
                <span key={u}>
                  <span style={{ display: "inline-block", borderRadius: 8, background: `${row.color}12`, border: `0.5px solid ${row.color}35`, padding: "5px 12px", fontSize: 12, color: "rgba(255,255,255,0.75)" }}>{u}</span>
                  {j < row.users.length - 1 && <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", margin: "0 2px" }}>or</span>}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function BOVisual() {
  return (
    <div style={{ borderRadius: 24, background: "rgba(255,255,255,0.02)", border: "0.5px solid rgba(255,255,255,0.07)", padding: "1.75rem", marginBottom: "2rem" }}>
      <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: "1.25rem" }}>Single-Hex Colour Theme System</div>
      <div style={{ display: "flex", gap: 8, marginBottom: "1.5rem" }}>
        {[["Retail", "#534AB7"], ["Corporate", "#1D9E75"], ["Future Tenant", "#D85A30"]].map(([label, hex]) => (
          <div key={label} style={{ flex: 1, borderRadius: 12, overflow: "hidden", border: `0.5px solid ${hex}30` }}>
            <div style={{ display: "flex" }}>
              {[0.15, 0.25, 0.4, 0.6, 0.8, 0.9, 1].map((op, i) => (
                <div key={i} style={{ flex: 1, height: 28, background: hex, opacity: op }} />
              ))}
            </div>
            <div style={{ padding: "8px 10px", background: `${hex}10` }}>
              <div style={{ fontSize: 11, fontWeight: 500, color: "rgba(255,255,255,0.6)" }}>{label}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>One hex → full scale</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ borderRadius: 12, background: "rgba(255,255,255,0.02)", border: "0.5px solid rgba(255,255,255,0.06)", padding: "12px 16px" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 6 }}>NTB Closed Loop</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          {["FE submission", "Request pool", "CRM handoff", "CIF obtained", "RM registers", "Portal live"].map((s, i, arr) => (
            <span key={s} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.04)", borderRadius: 6, padding: "4px 10px" }}>{s}</span>
              {i < arr.length - 1 && <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>→</span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReflectionVisual() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: "2rem" }}>
      {[
        { label: "Started as", value: "UX Designer", sub: "Executing a brief" },
        { label: "Ended as", value: "Consultant", sub: "Shaping the product" },
        { label: "Decisions beyond brief", value: "5+", sub: "All shipped in MVP" },
        { label: "Features designed", value: "12", sub: "FE + BO combined" },
      ].map(item => (
        <div key={item.label} style={{ borderRadius: 16, background: "rgba(255,255,255,0.02)", border: "0.5px solid rgba(255,255,255,0.07)", padding: "1.25rem" }}>
          <div style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 8 }}>{item.label}</div>
          <div style={{ fontSize: 22, fontWeight: 500, color: "#fff", marginBottom: 4 }}>{item.value}</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{item.sub}</div>
        </div>
      ))}
    </div>
  );
}

const visualMap = {
  discovery: DiscoveryVisual,
  competitor: CompetitorVisual,
  registration: RegistrationVisual,
  roles: RolesVisual,
  salary: SalaryVisual,
  workflow: WorkflowVisual,
  bo: BOVisual,
  reflection: ReflectionVisual,
};

export default function PortfolioCaseStudy() {
  return (
    <div style={{ background: "#0B0B0A", color: "#fff", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .serif { font-family: 'DM Serif Display', Georgia, serif; font-weight: 400; }
        .sans { font-family: 'DM Sans', system-ui, sans-serif; }
      `}</style>

      {/* NAV */}
      <nav className="sans" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 2.5rem", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(11,11,10,0.88)", backdropFilter: "blur(24px)", borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.55)", letterSpacing: "0.04em" }}>Corporate Banking Portal</div>
        <div style={{ display: "flex", gap: "2rem" }}>
          {["Project", "Research", "Design", "Reflection"].map(l => (
            <div key={l} style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", cursor: "pointer", letterSpacing: "0.04em" }}>{l}</div>
          ))}
        </div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>MENA · 2024–25</div>
      </nav>

      {/* HERO */}
      <section style={{ position: "relative", overflow: "hidden", borderBottom: "0.5px solid rgba(255,255,255,0.08)", paddingTop: 56 }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at top right,rgba(95,90,255,0.16),transparent 30%), radial-gradient(circle at bottom left,rgba(0,180,120,0.12),transparent 30%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "5rem 2.5rem 4rem" }}>
          <div className="sans" style={{ display: "inline-flex", alignItems: "center", gap: 8, borderRadius: 999, border: "0.5px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", padding: "6px 16px", fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: "2rem", backdropFilter: "blur(10px)" }}>
            Corporate Banking · Enterprise UX · 0→1 Product
          </div>
          <h1 className="serif" style={{ fontSize: "clamp(38px,5.5vw,72px)", lineHeight: 1.05, letterSpacing: "-0.01em", maxWidth: 780, marginBottom: "1.5rem" }}>
            Designing systems where complexity disappears before the user sees it.
          </h1>
          <p className="sans" style={{ fontSize: 17, lineHeight: 1.8, color: "rgba(255,255,255,0.5)", maxWidth: 520, marginBottom: "3rem", fontWeight: 300 }}>
            A premium case study — the design and architecture of a corporate banking ecosystem built from the ground up.
          </p>
          <div className="sans" style={{ display: "flex", flexWrap: "wrap", gap: "2.5rem", paddingTop: "2rem", borderTop: "0.5px solid rgba(255,255,255,0.07)" }}>
            {[["Role","Sole Product Designer"],["Duration","9–10 Months"],["Platforms","FE + Back Office"],["Region","MENA (Confidential)"],["Status","Pre-Launch · UT"]].map(([l,v]) => (
              <div key={l}>
                <div style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 4 }}>{l}</div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>{v}</div>
              </div>
            ))}
          </div>
          <HeroMockup />
        </div>
      </section>

      {/* INTRO QUOTE */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "6rem 2.5rem", borderBottom: "0.5px solid rgba(255,255,255,0.07)" }}>
        <div className="sans" style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: "1.5rem" }}>Opening</div>
        <h2 className="serif" style={{ fontSize: "clamp(28px,4vw,52px)", lineHeight: 1.2, marginBottom: "1.5rem" }}>Some projects are complicated. This one was complex.</h2>
        <p className="sans" style={{ fontSize: 18, lineHeight: 1.9, color: "rgba(255,255,255,0.5)", maxWidth: 640, fontWeight: 300 }}>
          Complex means the parts don't just move — they affect each other. Change one thing, and three other things break.
        </p>
      </section>

      {/* SECTIONS */}
      <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto", padding: "0 2.5rem" }}>
        <div style={{ position: "absolute", left: 220, top: 0, bottom: 0, width: "0.5px", background: "linear-gradient(to bottom,transparent,rgba(255,255,255,0.06) 15%,rgba(255,255,255,0.06) 85%,transparent)" }} />
        {sections.map((sec, i) => {
          const Visual = visualMap[sec.visual];
          return (
            <section key={sec.id} style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "4rem", alignItems: "start", padding: "5rem 0", borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}>
              {/* LEFT */}
              <div style={{ position: "sticky", top: "5rem" }}>
                <div className="sans" style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", marginBottom: "0.75rem" }}>{sec.label}</div>
                <div className="serif" style={{ fontSize: 72, color: "rgba(255,255,255,0.05)", lineHeight: 1, marginBottom: "0.5rem", letterSpacing: "-0.02em" }}>{sec.id}</div>
              </div>
              {/* RIGHT */}
              <div>
                <h2 className="serif" style={{ fontSize: "clamp(22px,3vw,38px)", lineHeight: 1.2, marginBottom: "2rem", whiteSpace: "pre-line" }}>{sec.title}</h2>
                {Visual && <Visual />}
                <p className="sans" style={{ fontSize: 16, lineHeight: 2, color: "rgba(255,255,255,0.52)", fontWeight: 300, whiteSpace: "pre-line", marginBottom: "2.5rem" }}>{sec.body}</p>
                <div style={{ borderLeft: "1.5px solid rgba(255,255,255,0.1)", paddingLeft: "1.5rem" }}>
                  <div className="sans" style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: "0.75rem" }}>Key Insight</div>
                  <p className="serif" style={{ fontSize: "clamp(17px,2vw,24px)", lineHeight: 1.55, color: "rgba(255,255,255,0.88)", fontStyle: "italic" }}>{sec.quote}</p>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* CLOSING QUOTE */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "6rem 2.5rem" }}>
        <div style={{ borderRadius: 32, border: "0.5px solid rgba(255,255,255,0.08)", background: "linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))", padding: "3.5rem 4rem", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at bottom right,rgba(95,90,255,0.1),transparent 40%)", pointerEvents: "none" }} />
          <div className="sans" style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: "1.5rem", position: "relative", zIndex: 1 }}>Closing</div>
          <p className="serif" style={{ fontSize: "clamp(20px,2.8vw,34px)", lineHeight: 1.55, color: "rgba(255,255,255,0.9)", fontStyle: "italic", maxWidth: 680, position: "relative", zIndex: 1 }}>
            "The approval workflow screen shows who the next approver is. That's not a feature. That's reassurance. You are not lost. Here is what happens next."
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "0.5px solid rgba(255,255,255,0.07)", padding: "2.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at bottom right,rgba(95,90,255,0.08),transparent 30%)", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <div className="serif" style={{ fontSize: 22 }}>Mahim Patil</div>
          <div className="sans" style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", marginTop: 4 }}>Product Designer · Systems Thinker · Maker</div>
        </div>
        <div className="sans" style={{ display: "flex", gap: "2rem", fontSize: 13, color: "rgba(255,255,255,0.3)", position: "relative" }}>
          <span>LinkedIn</span><span>Behance</span><span>Email</span>
        </div>
      </footer>
    </div>
  );
}
