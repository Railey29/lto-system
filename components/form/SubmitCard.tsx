interface SubmitCardProps {
  isSubmitting: boolean;
  onSubmit: () => Promise<unknown> | void;
}
export function SubmitCard({ isSubmitting, onSubmit }: SubmitCardProps) {
  return (
    <div className="card">
      <div className="card-body">
        <div className="info-note">
          <span className="icon">📋</span>
          <span>
            By submitting, your request will be routed for approval. You will be
            notified via email once fully approved.
          </span>
        </div>
        <button
          type="button"
          className="btn-submit"
          onClick={onSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting…" : "Submit Request for Approval →"}
        </button>
      </div>
    </div>
  );
}
