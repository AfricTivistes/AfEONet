import { NextResponse } from "next/server"
import { HONEYPOT_FIELD, submissionSchema, toNocoRecord } from "@/lib/submission"
import { routing } from "@/lib/i18n/routing"

// Stores /submit form entries in NocoDB. The token stays server-side.
export async function POST(request: Request) {
  const { NOCODB_URL, NOCODB_TOKEN, NOCODB_SUBMISSIONS_TABLE_ID } = process.env
  if (!NOCODB_URL || !NOCODB_TOKEN || !NOCODB_SUBMISSIONS_TABLE_ID) {
    console.error("submissions: NocoDB env vars are missing")
    return NextResponse.json({ error: "not_configured" }, { status: 503 })
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 })
  }

  // Pretend success so bots don't retry.
  if (typeof body[HONEYPOT_FIELD] === "string" && body[HONEYPOT_FIELD] !== "") {
    return NextResponse.json({ ok: true }, { status: 201 })
  }

  const parsed = submissionSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid", issues: parsed.error.issues }, { status: 400 })
  }

  const locale = routing.locales.includes(body.locale as never) ? String(body.locale) : routing.defaultLocale

  const res = await fetch(
    `${NOCODB_URL.replace(/\/$/, "")}/api/v2/tables/${NOCODB_SUBMISSIONS_TABLE_ID}/records`,
    {
      method: "POST",
      headers: { "xc-token": NOCODB_TOKEN, "Content-Type": "application/json" },
      body: JSON.stringify(toNocoRecord(parsed.data, locale)),
    },
  )
  if (!res.ok) {
    console.error("submissions: NocoDB returned", res.status, await res.text())
    return NextResponse.json({ error: "storage_failed" }, { status: 502 })
  }

  return NextResponse.json({ ok: true }, { status: 201 })
}
