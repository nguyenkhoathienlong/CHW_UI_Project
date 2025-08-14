import { Card } from '@/components/ui/card';
import { ArrowLeft, FileText, User, Calendar, DollarSign, MapPin, Briefcase, Mail, Phone, Award, CheckCircle, Clock, XCircle, StopCircle } from 'lucide-react';
import React from 'react';

export interface ContractDetailData {
  contractCode: string;
  contractTitle: string;
  contractType: string;
  startDate: string;
  endDate: string;
  probationPeriod: string;
  salary: string;
  workLocation: string;
  workSchedule: string;
  benefits: string;
  responsibilities: string;
  signDate: string;
  level: string;
  form: string;
  status?: string;
  candidate: {
    name: string;
    email: string;
    phone: string;
    education: string;
  };
  application: {
    jobTitle: string;
    company: string;
    location: string;
    salary: string;
    appliedDate: string;
    form: string;
    level: string;
  };
  projectInfo?: {
    code: string;
    name: string;
    type: string;
    duration: string;
    logo?: string;
  };
}

function getStatusStyle(status: string) {
  let style = {};
  let icon = null;
  
  if (status === "Đang hiệu lực") { 
    style = { background: "#d1fae5", color: "#059669" }; 
    icon = <CheckCircle size={15} style={{marginRight:5, color:'#059669'}}/>; 
  }
  else if (status === "Tạm ngưng") { 
    style = { background: "#fef9c3", color: "#b45309" }; 
    icon = <Clock size={15} style={{marginRight:5, color:'#b45309'}}/>; 
  }
  else if (status === "Hết hiệu lực") { 
    style = { background: "#f3f4f6", color: "#6b7280" }; 
    icon = <XCircle size={15} style={{marginRight:5, color:'#6b7280'}}/>; 
  }
  else if (status === "Đã hủy") { 
    style = { background: "#fee2e2", color: "#dc2626" }; 
    icon = <XCircle size={15} style={{marginRight:5, color:'#dc2626'}}/>; 
  }
  else if (status === "Đã kết thúc sớm") { 
    style = { background: "#e0e7ff", color: "#7c3aed" }; 
    icon = <StopCircle size={15} style={{marginRight:5, color:'#7c3aed'}}/>; 
  }
  else if (status === "Chờ hiệu lực") { 
    style = { background: "#dbeafe", color: "#2563eb" }; 
    icon = <Clock size={15} style={{marginRight:5, color:'#2563eb'}}/>; 
  }
  else { 
    style = { background: "#f3f4f6", color: "#6b7280" }; 
    icon = <XCircle size={15} style={{marginRight:5, color:'#6b7280'}}/>; 
  }
  
  return { style, icon };
}

export default function ContractDetailView({ data, onBack, actionsSlot }: { data: ContractDetailData, onBack: () => void, actionsSlot?: React.ReactNode }) {
  const statusStyle = data.status ? getStatusStyle(data.status) : null;
  
  return (
    <div style={{ maxWidth: 1500, margin: "0 auto", padding: '10px 10px 0 10px', minHeight: "100vh", borderRadius: 18 }}>
      {/* Tiêu đề + Badge trạng thái */}
      <div style={{ marginBottom: 20, position: 'relative' }}>
        <h1 style={{ fontWeight: 700, fontSize: 26, color: "#222", marginBottom: 5, letterSpacing: -1 }}>Hợp đồng tuyển dụng cộng tác viên</h1>
        <div style={{ color: '#64748b', fontSize: 15 }}>Xem chi tiết hợp đồng lao động cho cộng tác viên đã được tuyển dụng</div>
        {data.status && statusStyle && (
          <span style={{
            position: 'absolute',
            top: 0,
            right: 0,
            padding: '4px 12px',
            borderRadius: 10,
            fontWeight: 600,
            fontSize: 13,
            display: "inline-flex",
            alignItems: 'center',
            minWidth: 100,
            textAlign: "center",
            marginLeft: 12,
            ...statusStyle.style
          }}>
            {statusStyle.icon}{data.status}
          </span>
        )}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 12 }}>
        {/* Main Content - Contract Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Basic Information */}
          <Card style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px #0001", border: "1px solid #e5e7eb" }}>
            <div style={{ padding: "20px 24px 16px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 18, fontWeight: 700, color: "#222" }}>
                <FileText size={20} style={{ color: "#2563eb" }} />
                Thông tin cơ bản
              </div>
            </div>
            <div style={{ padding: "0 24px 24px 24px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
                <div>
                  <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                    Mã hợp đồng
                  </label>
                  <div style={{ width: "100%", padding: "7px 12px", border: "1px solid #d1d5db", borderRadius: 5, fontSize: 14, background: "#f9fafb", color: "#222", fontWeight: 500 }}>{data.contractCode}</div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                    Tiêu đề hợp đồng
                  </label>
                  <div style={{ width: "100%", padding: "7px 12px", border: "1px solid #d1d5db", borderRadius: 5, fontSize: 14, background: "#f9fafb", color: "#222", fontWeight: 500 }}>{data.contractTitle}</div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                    Loại hợp đồng
                  </label>
                  <div style={{ width: "100%", padding: "7px 12px", border: "1px solid #d1d5db", borderRadius: 5, fontSize: 14, background: "#f9fafb", color: "#222", fontWeight: 500 }}>{data.contractType}</div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                    Cấp bậc
                  </label>
                  <div style={{ width: "100%", padding: "7px 12px", border: "1px solid #d1d5db", borderRadius: 5, fontSize: 14, background: "#f9fafb", color: "#222", fontWeight: 500 }}>{data.level}</div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                    Thời gian thử việc (tháng)
                  </label>
                  <div style={{ width: "100%", padding: "7px 12px", border: "1px solid #d1d5db", borderRadius: 5, fontSize: 14, background: "#f9fafb", color: "#222", fontWeight: 500 }}>{data.probationPeriod}</div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                    Ngày bắt đầu hợp đồng
                  </label>
                  <div style={{ width: "100%", padding: "7px 12px", border: "1px solid #d1d5db", borderRadius: 5, fontSize: 14, background: "#f9fafb", color: "#222", fontWeight: 500 }}>{data.startDate}</div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                    Ngày kết thúc hợp đồng
                  </label>
                  <div style={{ width: "100%", padding: "7px 12px", border: "1px solid #d1d5db", borderRadius: 5, fontSize: 14, background: "#f9fafb", color: "#222", fontWeight: 500 }}>{data.endDate}</div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                    Ngày ký hợp đồng
                  </label>
                  <div style={{ width: "100%", padding: "7px 12px", border: "1px solid #d1d5db", borderRadius: 5, fontSize: 14, background: "#f9fafb", color: "#222", fontWeight: 500 }}>{data.signDate}</div>
                </div>
              </div>
            </div>
          </Card>
          {/* Salary and Benefits */}
          <Card style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px #0001", border: "1px solid #e5e7eb" }}>
            <div style={{ padding: "20px 24px 16px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 18, fontWeight: 700, color: "#222" }}>
                <DollarSign size={20} style={{ color: "#2563eb" }} />
                Lương và phúc lợi
              </div>
            </div>
            <div style={{ padding: "0 24px 24px 24px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                    Mức lương (VNĐ/tháng)
                  </label>
                  <div style={{ width: "100%", padding: "7px 12px", border: "1px solid #d1d5db", borderRadius: 5, fontSize: 14, background: "#f9fafb", color: "#222", fontWeight: 500 }}>{data.salary}</div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                    Địa điểm làm việc
                  </label>
                  <div style={{ width: "100%", padding: "7px 12px", border: "1px solid #d1d5db", borderRadius: 5, fontSize: 14, background: "#f9fafb", color: "#222", fontWeight: 500 }}>{data.workLocation}</div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                    Thời gian làm việc
                  </label>
                  <div style={{ width: "100%", padding: "7px 12px", border: "1px solid #d1d5db", borderRadius: 5, fontSize: 14, background: "#f9fafb", color: "#222", fontWeight: 500 }}>{data.workSchedule}</div>
                </div>
              </div>
              <div style={{ marginTop: 16 }}>
                <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                  Phúc lợi và đãi ngộ
                </label>
                <div style={{ width: "100%", padding: "12px", border: "1px solid #d1d5db", borderRadius: 5, fontSize: 14, background: "#f9fafb", color: "#222", fontWeight: 500, minHeight: 80, whiteSpace: 'pre-line' }}>{data.benefits}</div>
              </div>
            </div>
          </Card>
          {/* Job Responsibilities */}
          <Card style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px #0001", border: "1px solid #e5e7eb" }}>
            <div style={{ padding: "20px 24px 16px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 18, fontWeight: 700, color: "#222" }}>
                <Briefcase size={20} style={{ color: "#2563eb" }} />
                Trách nhiệm công việc
              </div>
            </div>
            <div style={{ padding: "0 24px 24px 24px" }}>
              <div style={{ width: "100%", padding: "12px", border: "1px solid #d1d5db", borderRadius: 5, fontSize: 14, background: "#f9fafb", color: "#222", fontWeight: 500, minHeight: 120, whiteSpace: 'pre-line' }}>{data.responsibilities}</div>
            </div>
          </Card>
        </div>
        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Candidate Information */}
          <Card style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px #0001", border: "1px solid #e5e7eb" }}>
            <div style={{ padding: "16px 20px 12px 20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 16, fontWeight: 700, color: "#222" }}>
                <User size={18} style={{ color: "#2563eb" }} />
                Thông tin ứng viên
              </div>
            </div>
            <div style={{ padding: "0 20px 20px 20px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ textAlign: "center", padding: "12px 0" }}>
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 8px auto",
                    color: "white",
                    fontWeight: 700,
                    fontSize: 16
                  }}>
                    {data.candidate.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: 16, color: "#222", marginBottom: 0 }}>{data.candidate.name}</h3>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "#f8fafc", borderRadius: 6, border: "1px solid #e2e8f0" }}>
                    <Mail size={14} style={{ color: "#2563eb" }} />
                    <span style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>{data.candidate.email}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "#f8fafc", borderRadius: 6, border: "1px solid #e2e8f0" }}>
                    <Phone size={14} style={{ color: "#2563eb" }} />
                    <span style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>{data.candidate.phone}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "#f8fafc", borderRadius: 6, border: "1px solid #e2e8f0" }}>
                    <Award size={14} style={{ color: "#2563eb" }} />
                    <span style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>{data.candidate.education}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          {/* Job Information */}
          <Card style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px #0001", border: "1px solid #e5e7eb" }}>
            <div style={{ padding: "16px 20px 12px 20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 16, fontWeight: 700, color: "#222" }}>
                <Briefcase size={18} style={{ color: "#2563eb" }} />
                Tóm tắt thông tin công việc
              </div>
            </div>
            <div style={{ padding: "0 20px 20px 20px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#64748b" }}>Vị trí:</span>
                  <span style={{ fontWeight: 600 }}>{data.application.jobTitle}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#64748b" }}>Công ty:</span>
                  <span style={{ fontWeight: 600 }}>{data.application.company}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#64748b" }}>Địa điểm:</span>
                  <span style={{ fontWeight: 600 }}>{data.application.location}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#64748b" }}>Mức lương đề xuất:</span>
                  <span style={{ fontWeight: 600 }}>{data.application.salary}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#64748b" }}>Hình thức:</span>
                  <span style={{ fontWeight: 600 }}>{data.application.form}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#64748b" }}>Cấp bậc:</span>
                  <span style={{ fontWeight: 600 }}>{data.application.level}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#64748b" }}>Ngày ứng tuyển:</span>
                  <span style={{ fontWeight: 600 }}>{data.application.appliedDate}</span>
                </div>
              </div>
            </div>
          </Card>
          {/* Thông tin chương trình/dự án */}
          {data.projectInfo && (
            <Card style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px #0001", border: "1px solid #e5e7eb", padding: 0, maxWidth: 400 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 16, fontWeight: 700, color: '#222', padding: '22px 24px 0 24px', letterSpacing: -0.5 }}>
                <Briefcase size={18} style={{ color: '#2563eb' }} />
                Tuyển dụng cho chương trình
              </div>
              <div style={{ position: 'relative', padding: '20px 10px 18px 20px' }}>
                <div style={{ position: 'absolute', top: 10, left: 20, background: '#f1f5f9', color: '#64748b', fontWeight: 300, fontSize: 12, borderRadius: 5, padding: '2px 12px', letterSpacing: 0.5 }}>{data.projectInfo.code}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 18 }}>
                  <div style={{ width: 64, height: 64, background: '#f1f5f9', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#94a3b8', fontSize: 20, border: '1px solid #e5e7eb' }}>
                    {data.projectInfo.logo ? (
                      <img src={data.projectInfo.logo} alt="logo" style={{ width: 45, height: 45, objectFit: 'contain', borderRadius: 5 }} />
                    ) : (
                      'Logo'
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: '#222', marginBottom: 2, letterSpacing: -0.5 }}>{data.projectInfo.name}</div>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 10, marginTop: 18 }}>
                  <div style={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
                    Loại chương trình/dự án:
                  </div>
                  <div style={{ color: '#222', fontWeight: 600, fontSize: 13 }}>{data.projectInfo.type}</div>
                  <div style={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
                    Thời gian diễn ra:
                  </div>
                  <div style={{ color: '#222', fontWeight: 600, fontSize: 13 }}>{data.projectInfo.duration}</div>
                </div>
              </div>
            </Card>
          )}
          {actionsSlot && (
            <Card style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px #0001", border: "1px solid #e5e7eb" }}>
              <div style={{ padding: "20px 24px 16px 24px" }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#222" }}>Thao tác</div>
              </div>
              <div style={{ padding: "0 24px 24px 24px" }}>
                {actionsSlot}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
} 