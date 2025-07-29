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
    status: "Chờ xử lý",
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
    status: "Chờ xử lý",
    statusColor: "yellow",
  },
  {
    id: 5,
    candidateName: "Hoàng Văn E",
    position: "Cộng tác viên y tế cộng đồng",
    appliedDate: "2024-06-05",
    status: "Đang tuyển dụng",
    statusColor: "blue",
  },
];

function getStatusBadge(status: string, color: string) {
  let style = {};
  let icon = null;
  if (color === "green") { style = { background: "#d1fae5", color: "#059669" }; icon = <CheckCircle size={15} style={{marginRight:5, color:'#059669'}}/>; }
  if (color === "yellow") { style = { background: "#fef9c3", color: "#b45309" }; icon = <Clock size={15} style={{marginRight:5, color:'#b45309'}}/>; }
  if (color === "red") { style = { background: "#fee2e2", color: "#dc2626" }; icon = <AlertCircle size={15} style={{marginRight:5, color:'#dc2626'}}/>; }
  if (color === "blue") { style = { background: "#dbeafe", color: "#2563eb" }; icon = <Clock size={15} style={{marginRight:5, color:'#2563eb'}}/>; }
  return (
    <span style={{ ...style, fontWeight: 600, borderRadius: 10, padding: "2px 12px 2px 6px", fontSize: 13, display: "inline-flex", alignItems:'center', minWidth: 90, textAlign: "center" }}>{icon}{status}</span>
  );
}

export default function ApplicationsListPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Tính toán số lượng theo trạng thái
  const total = mockApplications.length;
  const pending = mockApplications.filter(a => a.status === "Chờ xử lý").length;
  const recruiting = mockApplications.filter(a => a.status === "Đang tuyển dụng").length;
  const expired = mockApplications.filter(a => a.status === "Từ chối").length;

  // Lọc dữ liệu theo tab đang chọn
  const filtered = useMemo(() => {
    let filteredData = mockApplications.filter(app => {
      const matchSearch =
        search === "" ||
        app.candidateName.toLowerCase().includes(search.toLowerCase()) ||
        app.position.toLowerCase().includes(search.toLowerCase());
      return matchSearch;
    });

    // Lọc theo tab
    if (activeTab === "pending") {
      filteredData = filteredData.filter(app => app.status === "Chờ xử lý");
    } else if (activeTab === "recruiting") {
      filteredData = filteredData.filter(app => app.status === "Đang tuyển dụng");
    } else if (activeTab === "expired") {
      filteredData = filteredData.filter(app => app.status === "Từ chối");
    }
    // "all" tab hiển thị tất cả

    return filteredData;
  }, [search, activeTab]);

  return (
    <div style={{ maxWidth: 1500, margin: "0 auto", padding: '20px 20px 0 80px', background: "#f4f6fb", minHeight: "100vh", borderRadius: 18 }}>
      <h1 style={{ fontWeight: 700, fontSize: 26, color: "#222", marginBottom: 5, letterSpacing: -1 }}>Quản lý đơn ứng tuyển</h1>
      <div style={{ color: '#64748b', fontSize: 15, marginBottom: 20 }}>Theo dõi, xét duyệt và quản lý các đơn ứng tuyển vào vị trí của đơn vị bạn.</div>
      
      {/* Horizontal Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: 0, 
        marginBottom: 20, 
        background: '#fff', 
        borderRadius: 16, 
        padding: '0 24px',
        boxShadow: '0 2px 12px #0001',
        border: '1px solid #e5e7eb'
      }}>
        <div 
          onClick={() => setActiveTab("all")}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '16px 24px',
            cursor: 'pointer',
            borderBottom: activeTab === "all" ? '2px solid #2563eb' : '2px solid transparent',
            color: activeTab === "all" ? '#2563eb' : '#64748b',
            fontWeight: activeTab === "all" ? 600 : 500,
            fontSize: 14,
            position: 'relative'
          }}
        >
          <span>Tất cả</span>
          <div style={{
            background: activeTab === "all" ? '#2563eb' : '#e5e7eb',
            color: activeTab === "all" ? '#fff' : '#64748b',
            borderRadius: '50%',
            width: 20,
            height: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            fontWeight: 600
          }}>
            {total}
          </div>
        </div>
        
        <div 
          onClick={() => setActiveTab("pending")}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '16px 24px',
            cursor: 'pointer',
            borderBottom: activeTab === "pending" ? '2px solid #f59e0b' : '2px solid transparent',
            color: activeTab === "pending" ? '#f59e0b' : '#64748b',
            fontWeight: activeTab === "pending" ? 600 : 500,
            fontSize: 14,
            position: 'relative'
          }}
        >
          <span>Chờ xử lý</span>
          <div style={{
            background: activeTab === "pending" ? '#f59e0b' : '#e5e7eb',
            color: activeTab === "pending" ? '#fff' : '#64748b',
            borderRadius: '50%',
            width: 20,
            height: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            fontWeight: 600
          }}>
            {pending}
          </div>
        </div>
        
        <div 
          onClick={() => setActiveTab("recruiting")}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '16px 24px',
            cursor: 'pointer',
            borderBottom: activeTab === "recruiting" ? '2px solid #2563eb' : '2px solid transparent',
            color: activeTab === "recruiting" ? '#2563eb' : '#64748b',
            fontWeight: activeTab === "recruiting" ? 600 : 500,
            fontSize: 14,
            position: 'relative'
          }}
        >
          <span>Đang tuyển dụng</span>
          <div style={{
            background: activeTab === "recruiting" ? '#2563eb' : '#e5e7eb',
            color: activeTab === "recruiting" ? '#fff' : '#64748b',
            borderRadius: '50%',
            width: 20,
            height: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            fontWeight: 600
          }}>
            {recruiting}
          </div>
        </div>
        
        <div 
          onClick={() => setActiveTab("expired")}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '16px 24px',
            cursor: 'pointer',
            borderBottom: activeTab === "expired" ? '2px solid #9ca3af' : '2px solid transparent',
            color: activeTab === "expired" ? '#9ca3af' : '#64748b',
            fontWeight: activeTab === "expired" ? 600 : 500,
            fontSize: 14,
            position: 'relative'
          }}
        >
          <span>Tin hết hạn</span>
          <div style={{
            background: activeTab === "expired" ? '#9ca3af' : '#e5e7eb',
            color: activeTab === "expired" ? '#fff' : '#64748b',
            borderRadius: '50%',
            width: 20,
            height: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            fontWeight: 600
          }}>
            {expired}
          </div>
        </div>
      </div>

      {/* Search Box */}
      <div style={{ marginBottom: 20 }}>
        <Input
          placeholder="Tìm kiếm ứng viên, vị trí..."
          style={{ 
            maxWidth: 320, 
            fontSize: 13, 
            height: 40, 
            padding: "8px 16px", 
            background: "#fff", 
            border: "1px solid #e5e7eb",
            borderRadius: 8
          }}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Statistics Cards */}
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
            <div style={{ fontWeight: 700, fontSize: 18, color: '#b45309' }}>{pending}</div>
            <div style={{ color: '#b45309', fontSize: 13 }}>Chờ xử lý</div>
          </div>
        </Card>
        <Card style={{ flex: 1, background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px #0001', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: 12, padding: '18px 24px' }}>
          <CheckCircle size={32} style={{ color: '#059669', background: '#d1fae5', borderRadius: 8, padding: 4 }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 18, color: '#059669' }}>{recruiting}</div>
            <div style={{ color: '#059669', fontSize: 13 }}>Đang tuyển dụng</div>
          </div>
        </Card>
        <Card style={{ flex: 1, background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px #0001', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: 12, padding: '18px 24px' }}>
          <AlertCircle size={32} style={{ color: '#9ca3af', background: '#f3f4f6', borderRadius: 8, padding: 4 }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 18, color: '#9ca3af' }}>{expired}</div>
            <div style={{ color: '#9ca3af', fontSize: 13 }}>Tin hết hạn</div>
          </div>
        </Card>
      </div>

      {/* Table Card */}
      <Card style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px #0001", border: "1px solid #e5e7eb", overflow: "hidden", width: "100%", minHeight: 500, marginBottom: 18 }}>
        <div style={{ padding: "18px", overflowX: "auto" }}>
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