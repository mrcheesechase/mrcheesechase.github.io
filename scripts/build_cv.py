"""Build the general CV (cv.pdf) for the portfolio site.

Run:  python3 scripts/build_cv.py
Edit the CONTENT section below, then re-run. Contact details are kept to what is
safe to publish on a public website (no phone number or home address).
"""
from pathlib import Path
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, KeepTogether

OUT = Path(__file__).resolve().parent.parent / "cv.pdf"

# ── CONTENT ──────────────────────────────────────────────────────────────────
NAME = "ADAM OMER"
CONTACT = ('Dublin, Ireland · <a href="mailto:adam.omer0403@gmail.com">adam.omer0403@gmail.com</a> · '
           '<a href="https://github.com/mrcheesechase">github.com/mrcheesechase</a> · '
           '<a href="https://linkedin.com/in/adam-omer-0aab76373">linkedin.com/in/adam-omer-0aab76373</a>')
SUBLINE = "BSc Computer Science, University College Dublin · Expected graduation June 2029"

PROFILE = ("Stage 2 Computer Science student at UCD who likes building things end to end — from backend services and "
           "AI-powered tools to repairing and reselling cars. Co-founder of a two-person cybersecurity + AI startup, "
           "where I build backends and cloud infrastructure on Google Cloud. Hackathon builder, comfortable picking up "
           "unfamiliar APIs and codebases quickly, and backed by over a year in target-driven sales and customer-facing "
           "roles. Interested in startups, AI and automotive engineering.")

EDUCATION = [
    ("University College Dublin — BSc Computer Science", "Sep 2025 – Present", [
        "Software: Object-Oriented Programming (Java: interfaces, unit testing, exceptions, concurrency); Programming I &amp; II (C); "
        "Algorithmic Problem Solving (Python); Functional Programming (Scheme); Databases &amp; Information Systems (SQL)",
        "Systems &amp; theory: Computer Networking (TCP/IP, OSI stack, routing, congestion control); Computer Architecture; "
        "Digital Systems; Formal Foundations 1 &amp; 2 (logic, proof, finite automata); Matrix Algebra",
    ]),
    ("Carndonagh Community School, Co. Donegal — Leaving Certificate", "2021 – 2024", []),
]

EXPERIENCE = [
    ("Co-Founder — Cyber Supplies", "2026 – Present", [
        "Co-founded a two-person student startup working at the intersection of cybersecurity and AI.",
        "Build and run backend services on Google Cloud (Cloud Run, Cloud SQL / PostgreSQL): a token-authenticated API "
        "gateway, storage and notes services, a web-crawling service and a command-line client.",
    ]),
    ("Hackathon Participant — Stripe Hackathon", "Sep 2026", []),
    ("Outbound Sales Advisor — Forward Emphasis International", "Jun – Jul 2026", [
        "Converted free-trial members to paid subscriptions over high-volume outbound calls, consistently exceeding monthly conversion targets.",
    ]),
    ("Co-Developer &amp; Marketer — Boltun (boltun.io)", "2025", [
        "Co-developed, tested and marketed an autonomous outbound-calling product: AI voice agents that design a cold-call "
        "script, dial a contact list and rewrite the script from real call transcripts.",
    ]),
    ("Customer Service Representative — Forward Emphasis, Malin Head", "Sep 2024 – Aug 2025", [
        "Resolved a high volume of motor-insurance queries under tight deadlines, cross-checking details from policyholders and third parties and explaining cover clearly.",
    ]),
    ("Founder — Vehicle Repair &amp; Resale", "2024 – 2025", [
        "Ran my own small business buying, repairing, respraying and reselling used cars, and parting out non-runners to sell working parts.",
        "Handled sourcing, valuation, mechanical diagnosis and repair, bodywork prep, negotiation and sales end to end.",
    ]),
]

PROJECTS = [
    ("OutSpoken — AI speaking coach · HackUCD 2026 · Team of 4", "2026", [
        "Owned the backend architecture of a web app that records a spoken take on a prompt, transcribes it and returns "
        "AI feedback on filler words, pauses, pace and delivery, with timestamped “try instead” rewrites.",
        "Designed the API layer connecting the frontend to the OpenRouter API (LLM analysis) and the Stripe API "
        "(freemium Pro plan with free trial); deployed on Google Cloud Run.",
    ]),
    ("Nutri-tracker — AI nutrition &amp; weight coach on Telegram", "2026", [
        "Python bot that turns plain-English meal descriptions into full nutrient breakdowns via the Claude API, with "
        "personalised calorie, macro and RDA targets (Mifflin–St Jeor BMR, TDEE).",
        "SQLite storage and matplotlib charts for weight progress, calorie history and micronutrient intake; documented and published at github.com/mrcheesechase/Nutri-tracker.",
    ]),
]

SKILLS = [
    ("Languages", "Python, Java, C, C#, SQL, Scheme"),
    ("Tools &amp; platforms", "Git, GitHub, Linux command line, Google Cloud Run, PostgreSQL, SQLite, VS Code"),
    ("AI &amp; APIs", "Claude API, OpenRouter (LLMs), Stripe, Telegram Bot API"),
    ("Hands-on", "Mechanical diagnosis and repair, bodywork and spray painting, hand and power tools, full B driving licence"),
    ("Spoken", "English (native), Romanian (native)"),
]

# ── LAYOUT ───────────────────────────────────────────────────────────────────
INK, MUTED, ACCENT, RULE = HexColor("#111111"), HexColor("#555555"), HexColor("#15803d"), HexColor("#cfcfcf")
base = dict(fontName="Helvetica", fontSize=9, leading=11.6, textColor=INK)
S = {
    "name": ParagraphStyle("name", fontName="Helvetica-Bold", fontSize=20, leading=23, alignment=TA_CENTER, textColor=INK),
    "contact": ParagraphStyle("contact", **{**base, "fontSize": 8.8, "alignment": TA_CENTER, "textColor": MUTED}),
    "h": ParagraphStyle("h", fontName="Helvetica-Bold", fontSize=10, leading=12, textColor=ACCENT, spaceBefore=5, spaceAfter=1),
    "body": ParagraphStyle("body", **base),
    "role": ParagraphStyle("role", **{**base, "fontName": "Helvetica-Bold"}),
    "date": ParagraphStyle("date", **{**base, "textColor": MUTED, "alignment": 2}),
    "bullet": ParagraphStyle("bullet", **{**base, "leftIndent": 10, "bulletIndent": 2}),
}
LINK = '<font color="#111111">'

def section(title):
    return [Paragraph(title.upper(), S["h"]), HRFlowable(width="100%", thickness=0.6, color=RULE, spaceAfter=4)]

def entry(title, date, bullets):
    head = Table([[Paragraph(title, S["role"]), Paragraph(date, S["date"])]], colWidths=["78%", "22%"])
    head.setStyle(TableStyle([("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                              ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
                              ("VALIGN", (0, 0), (-1, -1), "TOP")]))
    return KeepTogether([head] + [Paragraph(b, S["bullet"], bulletText="•") for b in bullets] + [Spacer(1, 3)])

story = [Paragraph(NAME, S["name"]), Spacer(1, 3), Paragraph(CONTACT, S["contact"]),
         Paragraph(SUBLINE, S["contact"]), Spacer(1, 4)]
story += section("Profile") + [Paragraph(PROFILE, S["body"])]
story += section("Education") + [entry(*e) for e in EDUCATION]
story += section("Experience") + [entry(*e) for e in EXPERIENCE]
story += section("Projects") + [entry(*e) for e in PROJECTS]
story += section("Skills") + [Paragraph(f"<b>{k}:</b> {v}", S["bullet"], bulletText="•") for k, v in SKILLS]

doc = SimpleDocTemplate(str(OUT), pagesize=A4, leftMargin=15*mm, rightMargin=15*mm, topMargin=10*mm, bottomMargin=9*mm,
                        title="Adam Omer — CV", author="Adam Omer", subject="Curriculum vitae")
doc.build(story)
print("wrote", OUT)
