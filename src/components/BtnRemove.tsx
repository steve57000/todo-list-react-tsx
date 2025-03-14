interface BtnRemoveProps {
  onClick: () => void;
  contentTxt: string;
  addClass : string
}

export function BtnRemove({onClick, contentTxt, addClass}: BtnRemoveProps ) {
  return (
    <button
      onClick={onClick}
      className={addClass}
    >
      {contentTxt}
    </button>
  );
}