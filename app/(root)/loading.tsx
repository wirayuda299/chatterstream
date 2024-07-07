import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex size-full max-h-screen min-h-screen items-center justify-center bg-black">
      <Image
        src={"/logo.svg"}
        width={130}
        sizes="130px"
        height={130}
        className=" aspect-auto size-28 rounded-full object-contain sm:block"
        alt="logo"
      />
    </div>
  );
}
