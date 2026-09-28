import { Toaster } from "react-hot-toast";

export default function AppToaster() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3500,
        style: {
          background: "#0B1F3A",
          color: "#fff",
          borderRadius: "12px",
          padding: "12px 16px",
          fontSize: "14px",
          fontWeight: 500,
        },
        success: {
          iconTheme: { primary: "#12B76A", secondary: "#fff" },
        },
        error: {
          iconTheme: { primary: "#F04438", secondary: "#fff" },
        },
      }}
    />
  );
}
