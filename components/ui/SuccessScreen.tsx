interface SuccessScreenProps {
  trackingId: string;
}

export function SuccessScreen({ trackingId }: SuccessScreenProps) {
  return (
    <div id="success-screen">
      <div className="success-icon">✅</div>
      <h2>Request Submitted!</h2>
      <p>
        Your User Access Authorization request has been submitted. Your Chief of
        Office will review it shortly.
      </p>
      <div className="tracking-id">{trackingId}</div>
      <p style={{ marginTop: 16, fontSize: "0.85rem" }}>
        You will be notified via email once fully approved.
      </p>
    </div>
  );
}
