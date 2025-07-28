"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  // Custom breadcrumb cho chi tiết đơn ứng tuyển và tạo hợp đồng
  if (
    (segments[0] === "recruitment-list" && segments[1] === "applications" && segments.length === 3) ||
    (segments[0] === "recruitment-list" && segments[1] === "applications" && segments.length === 4 && segments[3] === "contract")
  ) {
    return (
      <nav style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: 24 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <ChevronRight size={14} style={{ color: '#2563eb' }} />
          <Link href="/recruitment-list/applications" style={{ color: '#64748b', fontWeight: 500, textDecoration: "none", fontSize: 12 }}>
            Quản lý đơn ứng tuyển
          </Link>
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <ChevronRight size={14} style={{ color: '#2563eb' }} />
          <span style={{ color: '#2563eb', fontWeight: 700, fontSize: 12 }}>Chi tiết đơn ứng tuyển</span>
        </span>
      </nav>
    );
  }

  let crumbs = [
    { label: "Trang chủ", href: "/" },
    ...segments.map((seg, idx) => {
      let label = seg;
      // Ẩn các id động: mã CTV, mã hợp đồng, id số, id động dạng [id], [contractId]
      if (/^CTV\d+$/i.test(seg)) return null;
      if (/^HD-\d{4}-\d{3,}$/i.test(seg)) return null;
      if (/^\d+$/.test(seg)) return null;
      if (/^\[.*\]$/.test(seg)) return null;
      // Các label tĩnh
      if (seg === "collaborators") label = "Cộng tác viên";
      if (seg === "pending") label = "Mới đăng ký";
      if (seg === "approved") label = "Đã tuyển chọn";
      if (seg === "recruited") label = "Được tuyển dụng";
      if (seg === "create") label = "Tuyển chọn";
      if (seg === "employees") label = "Nhân viên";
      if (seg === "recruitment") label = "Tin tuyển dụng";
      if (seg === "recruitment-list") label = "Quản lý đơn ứng tuyển";
      if (seg === "projects") label = "Chương trình/dự án";
      if (seg === "detail") label = "Chi tiết";
      if (seg === "evaluate") label = "Đánh giá";
      if (seg === "applications") label = "Chi tiết đơn ứng tuyển";
      if (seg === "contract") label = "Hợp đồng";
      if (seg === "training") label = "Đào tạo";
      if (seg === "complete-training") label = "Sẵn sàng huy động";
      if (seg === "profile") label = "Hồ sơ cộng tác viên";
      if (seg === "review") label = "Đánh giá";
      return {
        label,
        href: "/" + segments.slice(0, idx + 1).join("/"),
      };
    })
  ];
  const filteredCrumbs = crumbs.filter((c): c is { label: string; href: string } => !!c);

  return (
    <nav style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: 24 }}>
      {filteredCrumbs.map((crumb, idx) => (
        <span key={crumb.href} style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {idx === 0
            ? <Home size={15} style={{ marginRight: 2, color: pathname === '/' ? '#2563eb' : '#64748b' }} />
            : <ChevronRight size={14} style={{ color: '#2563eb' }} />}
          <Link href={crumb.href} style={{ color: idx === filteredCrumbs.length - 1 ? "#2563eb" : "#64748b", fontWeight: idx === filteredCrumbs.length - 1 ? 700 : 500, textDecoration: "none", fontSize: 12 }}>
            {crumb.label}
          </Link>
        </span>
      ))}
    </nav>
  );
} 