"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  // Map segment to label
  const labelMap: Record<string, string> = {
    dashboard: "Dashboard",
    profile: "Hồ sơ cá nhân",
    jobs: "Tin tuyển dụng",
    applications: "Ứng tuyển của tôi",
    job: "Chi tiết tin tuyển dụng",
    apply: "Đăng ký ứng tuyển",
    application: "Chi tiết đơn ứng tuyển",
    review: "Đánh giá",
    contract: "Hợp đồng",
    programs: "Chương trình tham gia",
    // Thêm các mapping khác nếu cần
  };

  // Mock data for program names
  const programNames: Record<string, string> = {
    "uctc-829102": "Chương trình tầm soát ung thư cổ tử cung",
    // Thêm các chương trình khác nếu cần
  };

  const crumbs = [
    { label: "Trang chủ", href: "/dashboard" },
    ...segments.slice(1).map((seg, idx) => {
      // Nếu là id (số hoặc mã) ở cuối thì bỏ qua
      const isLast = idx === segments.slice(1).length - 1;
      if (isLast && (/^HD-\d+$/i.test(seg) || /^\d+$/.test(seg))) return null;
      
      // Nếu là id sau programs => hiển thị tên chương trình
      if (segments[1] === 'programs' && idx === 1) {
        const programName = programNames[seg] || seg;
        return {
          label: programName,
          href: "/" + segments.slice(0, idx + 2).join("/"),
        };
      }
      
      // Nếu là id (số) sau jobs => chi tiết tin tuyển dụng
      if (segments[1] === 'jobs' && idx === 1 && /^\d+$/.test(seg)) {
        return {
          label: 'Chi tiết tin tuyển dụng',
          href: "/" + segments.slice(0, idx + 2).join("/"),
        };
      }
      // Nếu là apply
      if (seg === 'apply') {
        return {
          label: 'Đăng ký ứng tuyển',
          href: "/" + segments.slice(0, idx + 2).join("/"),
        };
      }
      const label = labelMap[seg] || seg;
      return {
        label,
        href: "/" + segments.slice(0, idx + 2).join("/"),
      };
    }).filter(Boolean),
  ];

  return (
    <nav
      className="flex items-center gap-2 md:gap-3 overflow-x-auto whitespace-nowrap pl-2 md:pl-6 py-2"
      style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'thin' }}
    >
      {crumbs.map((crumb, idx) => {
        const c = crumb!;
        return (
          <span key={c.href} className="flex items-center gap-1 md:gap-2">
            {idx === 0
              ? <Home size={15} className="mr-1 text-blue-600 min-w-[15px]" />
              : <ChevronRight size={13} className="text-blue-400 min-w-[13px]" />}
            <Link
              href={c.href}
              className={`text-xs md:text-[13px] ${idx === crumbs.length - 1 ? 'text-blue-700 font-bold' : 'text-gray-500 font-medium'} truncate max-w-[90px] md:max-w-none`}
              style={{ textDecoration: 'none' }}
            >
              {c.label}
            </Link>
          </span>
        );
      })}
    </nav>
  );
} 