import crypto from "crypto";

export function newCsrfToken() {
  return crypto.randomBytes(32).toString("hex");
}

// Frågan är om vi ska lägga till Signed Double-Submit Cookie (HMAC) (RECOMMENDED) på owasp
// https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html?utm_source=chatgpt.com#naive-double-submit-cookie-pattern-discouraged

export function csrfDoubleSubmitCookie() {
  return (req, res, next) => {
    if (!/^(POST|PUT|PATCH|DELETE)$/i.test(req.method)) return next();

    const cookieToken = req.cookies?.csrf_token;
    const headerToken = req.get("x-csrf-token");

    if (!cookieToken || !headerToken || cookieToken !== headerToken) {
      return res.status(403).json({ error: "CSRF validation failed" });
    }
    next();
  };
}
