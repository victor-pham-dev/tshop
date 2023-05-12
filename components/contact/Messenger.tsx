import Link from "next/link";

export default function Messenger() {
  return (
    <div
      style={{
        position: "fixed",
        right: "5px",
        zIndex: 3,
        margin: "auto",
      }}
    >
      <Link href="https://www.messenger.com/t/495457770664511" target="_blank">
        <img
          className="messenger-icon"
          src="/messenger.ico"
          alt="contact msg"
          width={46}
          height={46}
        />
      </Link>
    </div>
  );
}
