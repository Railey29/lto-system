interface LoadingOverlayProps {
  visible?: boolean;
}

export function LoadingOverlay({ visible = false }: LoadingOverlayProps) {
  return (
    <div className={visible ? "loading-overlay show" : "loading-overlay"}>
      <div className="spinner" />
      <p>Submitting your request…</p>
    </div>
  );
}
