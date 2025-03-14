interface BtnRemoveProps {
  onClick: () => void
}

export function BtnRemove({onClick}: BtnRemoveProps) {
  return (
    <button
      onClick={onClick}
      className="btn btn-error btn-outline btn-xs ml-4"
    >
      X
    </button>
  );
}