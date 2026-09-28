import { Navigate, Outlet } from "react-router-dom";
import { getSession } from "../utils/storage";

/** Redirects to /crm/login if no active demo CRM session exists. */
export default function CrmAuthGuard() {
  const session = getSession();
  if (!session) {
    return <Navigate to="/crm/login" replace />;
  }
  return <Outlet />;
}
