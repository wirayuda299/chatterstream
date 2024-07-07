'use client'
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BackButton({ styles }: { styles?: string }) {
  const router = useRouter()

  return (
    <div className={cn("mb-5 flex h-20 w-full items-center justify-between p-2", styles)}>
      <button
        title="Back"
        aria-label="Back"
        className="size-8 rounded-full border border-gray-500 bg-main" onClick={() => router.back()}>
        <ArrowLeft size={18} className="mx-auto" />
      </button>
      <h3 className="font-semibold">Thread</h3>
      <button className="size-8 rounded-full border border-gray-500 bg-main">
        <Image src={'/assets/ellipsis.svg'} width={18} height={18} alt="menu" className="mx-auto" />
      </button>
    </div>
  )
}
