export function authorizeModification(req, res, next) {
  const isParent = req.user?.role === "parent";
  const isSelfChild =
    req.user?.role === "child" &&
    Number(req.params.userId) === Number(req.user?.id);

  if (!isParent && !isSelfChild) {
    return res.status(403).json({ error: "Access denied" });
  }

  next();
}