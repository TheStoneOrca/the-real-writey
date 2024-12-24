export default function Button(props: {
  text: string;
  onClick: () => void;
  fixed: boolean;
}) {
  return (
    <button
      className={
        props.fixed
          ? "bg-[#F3F308] text-black w-20 rounded-sm hover:bg-yellow-300"
          : "bg-[#F3F308] text-black rounded-sm hover:bg-yellow-300"
      }
      onClick={() => props.onClick()}
    >
      {props.text}
    </button>
  );
}
