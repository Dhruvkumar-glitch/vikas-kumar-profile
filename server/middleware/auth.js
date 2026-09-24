// Very simple bearer-token check for a single-admin site.
// The token IS the admin password (set in .env). Good enough for a
// personal profile site with one editor; not meant for multi-user apps.
export function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!process.env.ADMIN_PASSWORD) {
    return res.status(500).json({ message: "ADMIN_PASSWORD not set on server" });
  }

  if (!token || token !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
}
