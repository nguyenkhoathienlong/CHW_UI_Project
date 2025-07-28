"use client";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, CheckCircle, AlertCircle, Clock } from "lucide-react";

const mockApplications = [
  {
    id: 1,
    candidateName: "Nguyễn Văn A",
    position: "Cộng tác viên y tế cộng đồng",
    appliedDate: "2024-06-01",
    status: "Đang xem xét",
    statusColor: "yellow",
  },
  {
    id: 2,
    candidateName: "Trần Thị B",
    position: "Nhân viên chăm sóc sức khỏe",
    appliedDate: "2024-06-02",
    status: "Đã duyệt",
    statusColor: "green",
  },
  {
    id: 3,
    candidateName: "Lê Văn C",
    position: "Cộng tác viên tuyên truyền y tế",
    appliedDate: "2024-06-03",
    status: "Từ chối",
    statusColor: "red",
  },
  {
    id: 4,
    candidateName: "Phạm Thị D",
    position: "Nhân viên hỗ trợ y tế dự phòng",
    appliedDate: "2024-06-04",
    status: "Đang xem xét",
    statusColor: "yellow",
  },
];

const statusOptions = [
  { value: "", label: "Tất cả trạng thái" },
  { value: "Đang xem xét", label: "Đang xem xét" },
  { value: "Đã duyệt", label: "Đã duyệt" },
  { value: "Từ chối", label: "Từ chối" },
];

function getStatusBadge(status: string, color: string) {
  let style = {};
  let icon = null;
  if (color === "green") { style = { background: "#d1fae5", color: "#059669" }; icon = <CheckCircle size={15} style={{marginRight:5, color:'#059669'}}/>; }
  if (color === "yellow") { style = { background: "#fef9c3", color: "#b45309" }; icon = <Clock size={15} style={{marginRight:5, color:'#b45309'}}/>; }
  if (color === "red") { style = { background: "#fee2e2", color: "#dc2626" }; icon = <AlertCircle size={15} style={{marginRight:5, color:'#dc2626'}}/>; }
  return (
    <span style={{ ...style, fontWeight: 600, borderRadius: 10, padding: "2px 12px 2px 6px", fontSize: 13, display: "inline-flex", alignItems:'center', minWidth: 90, textAlign: "center" }}>{icon}{status}</span>
  );
}

export default function ApplicationsListPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filtered = useMemo(() => {
    return mockApplications.filter(app => {
      const matchSearch =
        search === "" ||
        app.candidateName.toLowerCase().includes(search.toLowerCase()) ||
        app.position.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "" || app.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [search, statusFilter]);

  // Tổng hợp số lượng theo trạng thái
  const total = mockApplications.length;
  const reviewing = mockApplications.filter(a => a.status === "Đang xem xét").length;
  const approved = mockApplications.filter(a => a.status === "Đã duyệt").length;
  const rejected = mockApplications.filter(a => a.status === "Từ chối").length;

  return (
    <div style={{ maxWidth: 1500, margin: "0 auto", padding: '20px 20px 0 80px', background: "#f4f6fb", minHeight: "100vh", borderRadius: 18 }}>
      <h1 style={{ fontWeight: 700, fontSize: 26, color: "#222", marginBottom: 5, letterSpacing: -1 }}>Quản lý đơn ứng tuyển</h1>
      <div style={{ color: '#64748b', fontSize: 15, marginBottom: 20 }}>Theo dõi, xét duyệt và quản lý các đơn ứng tuyển vào vị trí của đơn vị bạn.</div>
      {/* Card tổng quan */}
      <div style={{ display: 'flex', gap: 18, marginBottom: 20 }}>
        <Card style={{ flex: 1, background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px #0001', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: 12, padding: '18px 24px' }}>
          <Users size={32} style={{ color: '#2563eb', background: '#e0e7ef', borderRadius: 8, padding: 4 }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 18, color: '#222' }}>{total}</div>
            <div style={{ color: '#64748b', fontSize: 13 }}>Tổng đơn ứng tuyển</div>
          </div>
        </Card>
        <Card style={{ flex: 1, background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px #0001', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: 12, padding: '18px 24px' }}>
          <Clock size={32} style={{ color: '#b45309', background: '#fef9c3', borderRadius: 8, padding: 4 }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 18, color: '#b45309' }}>{reviewing}</div>
            <div style={{ color: '#b45309', fontSize: 13 }}>Đang xem xét</div>
          </div>
        </Card>
        <Card style={{ flex: 1, background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px #0001', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: 12, padding: '18px 24px' }}>
          <CheckCircle size={32} style={{ color: '#059669', background: '#d1fae5', borderRadius: 8, padding: 4 }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 18, color: '#059669' }}>{approved}</div>
            <div style={{ color: '#059669', fontSize: 13 }}>Đã duyệt</div>
          </div>
        </Card>
        <Card style={{ flex: 1, background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px #0001', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: 12, padding: '18px 24px' }}>
          <AlertCircle size={32} style={{ color: '#dc2626', background: '#fee2e2', borderRadius: 8, padding: 4 }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 18, color: '#dc2626' }}>{rejected}</div>
            <div style={{ color: '#dc2626', fontSize: 13 }}>Từ chối</div>
          </div>
        </Card>
      </div>
      {/* Bộ lọc & tìm kiếm */}
      <Card style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px #0001", border: "1px solid #e5e7eb", overflow: "hidden", width: "100%", minHeight: 500, marginBottom: 18 }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center", padding: "18px 18px 10px 18px" }}>
          <Input
            placeholder="Tìm kiếm ứng viên, vị trí..."
            style={{ maxWidth: 320, fontSize: 13, height: 32, padding: "2px 10px", background: "#fff", border: "1px solid #e5e7eb" }}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            style={{ fontSize: 13, height: 32, border: "1px solid #e5e7eb", borderRadius: 8, padding: "2px 12px", background: "#fff", color: statusFilter ? "#2563eb" : "#222", fontWeight: 500 }}
          >
            {statusOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div style={{ padding: "0 18px 18px 18px", overflowX: "auto" }}>
          <Table style={{ minWidth: 900, width: "100%" }}>
            <TableHeader>
              <TableRow style={{ background: "#f8fafc" }}>
                <TableHead style={{ padding: "8px 10px", fontWeight: 700, fontSize: 14, color: "#222", borderBottom: "2px solid #e5e7eb" }}>Ứng viên</TableHead>
                <TableHead style={{ padding: "8px 10px", fontWeight: 700, fontSize: 14, color: "#222", borderBottom: "2px solid #e5e7eb" }}>Vị trí</TableHead>
                <TableHead style={{ padding: "8px 10px", fontWeight: 700, fontSize: 14, color: "#222", borderBottom: "2px solid #e5e7eb" }}>Ngày ứng tuyển</TableHead>
                <TableHead style={{ padding: "8px 10px", fontWeight: 700, fontSize: 14, color: "#222", borderBottom: "2px solid #e5e7eb" }}>Trạng thái</TableHead>
                <TableHead style={{ padding: "8px 10px", fontWeight: 700, fontSize: 14, color: "#222", borderBottom: "2px solid #e5e7eb" }}>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(app => (
                <TableRow key={app.id} style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", fontSize: 14 }}>
                  <TableCell style={{ padding: "8px 10px", fontSize: 14, color: "#222" }}>{app.candidateName}</TableCell>
                  <TableCell style={{ padding: "8px 10px", fontSize: 14, color: "#222" }}>{app.position}</TableCell>
                  <TableCell style={{ padding: "8px 10px", fontSize: 14, color: "#222" }}>{app.appliedDate}</TableCell>
                  <TableCell style={{ padding: "8px 10px", fontSize: 14 }}>{getStatusBadge(app.status, app.statusColor)}</TableCell>
                  <TableCell style={{ padding: "8px 10px" }}>
                    <Button
                      variant="outline"
                      style={{ fontSize: 14, padding: "4px 18px", borderRadius: 8, fontWeight: 600 }}
                      onClick={() => router.push(`/recruitment-list/applications/${app.id}`)}
                    >
                      Xem chi tiết
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} style={{ textAlign: "center", color: "#64748b", padding: 24, fontSize: 15 }}>
                    Không có đơn ứng tuyển nào phù hợp.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
} 