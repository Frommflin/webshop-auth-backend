import crypto from "crypto";

export function newCsrfToken() {
  return crypto.randomBytes(32).toString("hex");
}

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
