import { ModeToggle } from "@/components/toggle-theme";
import Link from "next/link";

export default function Header() {
  return (
    <div>
        <ul>
            <li>
                <Link href="/register">Đăng ký</Link>
            </li>
            <li>
                <Link href="/login">Đăng nhập</Link>
            </li>
            <li><ModeToggle></ModeToggle> </li>
        </ul>
    </div>
  )
}
