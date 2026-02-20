import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import { useAuth } from "../context/AuthContext";
import { LayoutDashboard, Info, LogOut, X, User, MessageSquare, HelpCircle } from "lucide-react";

const Sidebar = ({ isOpen, closeSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate(); // Initialize navigation

  // New async logout handler to ensure navigation happens AFTER state is cleared
  const handleLogout = async () => {
    try {
      await logout(); // Executes the backend cookie clearing and state reset
      closeSidebar(); // Closes sidebar on mobile
      navigate("/login"); // Forces redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
      // Fallback: move user anyway if API fails
      navigate("/login");
    }
  };

  const sidebarStyles = {
    width: "240px",
    backgroundColor: "#1e293b",
    color: "white",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)", 
    zIndex: 1000,
    position: "fixed",
    height: "100vh",
    transform: isOpen ? "translateX(0)" : "translateX(-100%)",
    left: 0,
    top: 0,
    boxShadow: isOpen ? "4px 0 15px rgba(0,0,0,0.3)" : "none",
  };

  const linkStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    color: "white",
    textDecoration: "none",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "10px",
    fontSize: "1.1rem",
    transition: "background-color 0.2s",
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={closeSidebar}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 999,
          }}
        />
      )}

      <aside style={sidebarStyles}>
        <div
          style={{
            padding: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #334155",
          }}
        >
          <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: "bold" }}>
            EduFlow
          </h2>
          <button
            onClick={closeSidebar}
            style={{
              background: "none",
              border: "none",
              color: "white",
              cursor: "pointer",
            }}
          >
            <X size={24} />
          </button>
        </div>

        <nav style={{ flex: 1, padding: "20px" }}>
          <Link to="/" style={linkStyle} onClick={closeSidebar} className="hover:bg-slate-700">
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
          <Link to="/about" style={linkStyle} onClick={closeSidebar} className="hover:bg-slate-700">
            <Info size={20} />
            About
          </Link>
          <Link to="/faq" style={linkStyle} onClick={closeSidebar} className="hover:bg-slate-700">
            <HelpCircle size={20} />
            FAQ
          </Link>
          <Link to="/contact" style={linkStyle} onClick={closeSidebar} className="hover:bg-slate-700/50">
            <MessageSquare size={20} />
            Contact Support
          </Link>
        </nav>

        <div style={{ padding: "20px", borderTop: "1px solid #334155", backgroundColor: "#1a2232" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "15px" }}>
            <div style={{
                width: "40px", height: "40px", borderRadius: "50%",
                backgroundColor: "#4f46e5", display: "flex",
                justifyContent: "center", alignItems: "center", flexShrink: 0
            }}>
              {user?.name ? user.name.charAt(0).toUpperCase() : <User size={20} />}
            </div>
            <div style={{ overflow: "hidden" }}>
              <p style={{ margin: 0, fontWeight: "bold", fontSize: "0.9rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {user?.name || "Guest"}
              </p>
              <p style={{ margin: 0, fontSize: "0.75rem", color: "#94a3b8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {user?.email || "No email"}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout} // Changed from logout to handleLogout
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              width: "100%",
              padding: "10px",
              backgroundColor: "#ef4444",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;