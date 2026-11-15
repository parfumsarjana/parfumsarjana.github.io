// QRIS dinamis via Midtrans Core API (asumsi gateway; sandbox dulu).
const { onCall, onRequest, HttpsError } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");
const crypto = require("crypto");
admin.initializeApp();

const KEY = defineSecret("MIDTRANS_SERVER_KEY");
const BASE = "https://api.sandbox.midtrans.com"; // produksi: https://api.midtrans.com

exports.createQris = onCall({ secrets: [KEY] }, async () => {
  const db = admin.firestore();
  const s = (await db.doc("settings/main").get()).data() || {};
  const price = Number(s.price) || 20000;
  const ref = db.collection("orders").doc();
  const r = await fetch(BASE + "/v2/charge", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", Accept: "application/json",
      Authorization: "Basic " + Buffer.from(KEY.value() + ":").toString("base64"),
    },
    body: JSON.stringify({
      payment_type: "qris",
      transaction_details: { order_id: ref.id, gross_amount: price },
      qris: { acquirer: "gopay" },
    }),
  });
  const d = await r.json();
  const qr = (d.actions || []).find((a) => a.name === "generate-qr-code");
  if (!qr) throw new HttpsError("internal", d.status_message || "Gagal membuat QRIS");
  await ref.set({ status: "pending", amount: price, created: Date.now() });
  return { orderId: ref.id, qrUrl: qr.url };
});

// Isi URL function ini di Midtrans: Settings → Configuration → Payment Notification URL
exports.midtransWebhook = onRequest({ secrets: [KEY] }, async (req, res) => {
  const b = req.body || {};
  const sig = crypto.createHash("sha512")
    .update(String(b.order_id) + b.status_code + b.gross_amount + KEY.value()).digest("hex");
  if (sig !== b.signature_key) return res.status(403).end();
  if (["settlement", "capture"].includes(b.transaction_status)) {
    await admin.firestore().doc("orders/" + b.order_id).update({ status: "paid" });
  }
  res.send("ok");
});
