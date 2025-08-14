import { Card } from '@/components/ui/card';
import { FileText, DollarSign, Briefcase, User, Mail, Phone, Award } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';

interface ContractEditFormProps {
  editForm: {
    contractTitle: string;
    contractType: string;
    level: string;
    probationPeriod: string;
    startDate: string;
    endDate: string;
    signDate: string;
    salary: string;
    workLocation: string;
    workSchedule: string;
    benefits: string;
    responsibilities: string;
  };
  setEditForm: React.Dispatch<React.SetStateAction<{
    contractTitle: string;
    contractType: string;
    level: string;
    probationPeriod: string;
    startDate: string;
    endDate: string;
    signDate: string;
    salary: string;
    workLocation: string;
    workSchedule: string;
    benefits: string;
    responsibilities: string;
  }>>;
  contractStatus: string;
  onSave: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function ContractEditForm({ editForm, setEditForm, contractStatus, onSave, onCancel, isLoading = false }: ContractEditFormProps) {
  const isChờHiệuLực = contractStatus === "Chờ hiệu lực";
  const isTạmNgưng = contractStatus === "Tạm ngưng";

  return (
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
                <div style={{ width: "100%", padding: "7px 12px", border: "1px solid #d1d5db", borderRadius: 5, fontSize: 14, background: "#f9fafb", color: "#222", fontWeight: 500 }}>
                  HD-CTV-2024-001
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                  Tiêu đề hợp đồng
                </label>
                <input
                  type="text"
                  value={editForm.contractTitle}
                  onChange={(e) => setEditForm({ ...editForm, contractTitle: e.target.value })}
                  style={{ width: "100%", padding: "7px 12px", border: "1px solid #d1d5db", borderRadius: 5, fontSize: 14, background: "#fff", color: "#222" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                  Loại hợp đồng
                </label>
                <select
                  value={editForm.contractType}
                  onChange={(e) => setEditForm({ ...editForm, contractType: e.target.value })}
                  style={{ width: "100%", padding: "7px 12px", border: "1px solid #d1d5db", borderRadius: 5, fontSize: 14, background: "#fff", color: "#222" }}
                >
                  <option value="">Chọn loại hợp đồng</option>
                  <option value="Toàn thời gian">Toàn thời gian</option>
                  <option value="Bán thời gian">Bán thời gian</option>
                  <option value="Thời vụ">Thời vụ</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                  Cấp bậc
                </label>
                <select
                  value={editForm.level}
                  onChange={(e) => setEditForm({ ...editForm, level: e.target.value })}
                  style={{ width: "100%", padding: "7px 12px", border: "1px solid #d1d5db", borderRadius: 5, fontSize: 14, background: "#fff", color: "#222" }}
                >
                  <option value="">Chọn cấp bậc</option>
                  <option value="Cộng tác viên">Cộng tác viên</option>
                  <option value="Nhân viên">Nhân viên</option>
                  <option value="Trưởng nhóm">Trưởng nhóm</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                  Thời gian thử việc (tháng)
                </label>
                <input
                  type="number"
                  value={editForm.probationPeriod}
                  onChange={(e) => setEditForm({ ...editForm, probationPeriod: e.target.value })}
                  style={{ width: "100%", padding: "7px 12px", border: "1px solid #d1d5db", borderRadius: 5, fontSize: 14, background: "#fff", color: "#222" }}
                  min="0"
                  max="6"
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                  Ngày bắt đầu hợp đồng
                </label>
                <input
                  type="date"
                  value={editForm.startDate}
                  onChange={(e) => setEditForm({ ...editForm, startDate: e.target.value })}
                  style={{ width: "100%", padding: "7px 12px", border: "1px solid #d1d5db", borderRadius: 5, fontSize: 14, background: isTạmNgưng ? "#f9fafb" : "#fff", color: isTạmNgưng ? "#6b7280" : "#222" }}
                  disabled={isTạmNgưng}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                  Ngày kết thúc hợp đồng
                </label>
                <input
                  type="date"
                  value={editForm.endDate}
                  onChange={(e) => setEditForm({ ...editForm, endDate: e.target.value })}
                  style={{ width: "100%", padding: "7px 12px", border: "1px solid #d1d5db", borderRadius: 5, fontSize: 14, background: isTạmNgưng ? "#f9fafb" : "#fff", color: isTạmNgưng ? "#6b7280" : "#222" }}
                  disabled={isTạmNgưng}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                  Ngày ký hợp đồng
                </label>
                <input
                  type="date"
                  value={editForm.signDate}
                  onChange={(e) => setEditForm({ ...editForm, signDate: e.target.value })}
                  style={{ width: "100%", padding: "7px 12px", border: "1px solid #d1d5db", borderRadius: 5, fontSize: 14, background: "#fff", color: "#222" }}
                />
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
                <input
                  type="text"
                  value={editForm.salary}
                  onChange={(e) => setEditForm({ ...editForm, salary: e.target.value })}
                  placeholder="VD: 8.000.000 - 12.000.000"
                  style={{ width: "100%", padding: "7px 12px", border: "1px solid #d1d5db", borderRadius: 5, fontSize: 14, background: "#fff", color: "#222" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                  Địa điểm làm việc
                </label>
                <input
                  type="text"
                  value={editForm.workLocation}
                  onChange={(e) => setEditForm({ ...editForm, workLocation: e.target.value })}
                  style={{ width: "100%", padding: "7px 12px", border: "1px solid #d1d5db", borderRadius: 5, fontSize: 14, background: "#fff", color: "#222" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                  Thời gian làm việc
                </label>
                <input
                  type="text"
                  value={editForm.workSchedule}
                  onChange={(e) => setEditForm({ ...editForm, workSchedule: e.target.value })}
                  placeholder="VD: 8:00 - 17:00"
                  style={{ width: "100%", padding: "7px 12px", border: "1px solid #d1d5db", borderRadius: 5, fontSize: 14, background: "#fff", color: "#222" }}
                />
              </div>
            </div>
            <div style={{ marginTop: 16 }}>
              <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                Phúc lợi và đãi ngộ
              </label>
              <textarea
                value={editForm.benefits}
                onChange={(e) => setEditForm({ ...editForm, benefits: e.target.value })}
                style={{ width: "100%", padding: "12px", border: "1px solid #d1d5db", borderRadius: 5, fontSize: 14, background: "#fff", color: "#222", minHeight: 80, resize: "vertical" }}
                placeholder="Nhập phúc lợi và đãi ngộ..."
              />
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
            <textarea
              value={editForm.responsibilities}
              onChange={(e) => setEditForm({ ...editForm, responsibilities: e.target.value })}
              style={{ width: "100%", padding: "12px", border: "1px solid #d1d5db", borderRadius: 5, fontSize: 14, background: "#fff", color: "#222", minHeight: 120, resize: "vertical" }}
              placeholder="Nhập trách nhiệm công việc..."
            />
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
                  NV
                </div>
                <h3 style={{ fontWeight: 700, fontSize: 16, color: "#222", marginBottom: 0 }}>Nguyễn Văn A</h3>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "#f8fafc", borderRadius: 6, border: "1px solid #e2e8f0" }}>
                  <Mail size={14} style={{ color: "#2563eb" }} />
                  <span style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>nguyenvana@email.com</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "#f8fafc", borderRadius: 6, border: "1px solid #e2e8f0" }}>
                  <Phone size={14} style={{ color: "#2563eb" }} />
                  <span style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>0123456789</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "#f8fafc", borderRadius: 6, border: "1px solid #e2e8f0" }}>
                  <Award size={14} style={{ color: "#2563eb" }} />
                  <span style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>Cử nhân</span>
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
                <span style={{ fontWeight: 600 }}>Cộng tác viên y tế cộng đồng</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#64748b" }}>Công ty:</span>
                <span style={{ fontWeight: 600 }}>Bệnh viện Đa khoa Hà Nội</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#64748b" }}>Địa điểm:</span>
                <span style={{ fontWeight: 600 }}>Hà Nội</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#64748b" }}>Mức lương đề xuất:</span>
                <span style={{ fontWeight: 600 }}>8.000.000 - 12.000.000</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#64748b" }}>Hình thức:</span>
                <span style={{ fontWeight: 600 }}>Toàn thời gian</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#64748b" }}>Cấp bậc:</span>
                <span style={{ fontWeight: 600 }}>Cộng tác viên</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#64748b" }}>Ngày ứng tuyển:</span>
                <span style={{ fontWeight: 600 }}>10-01-2024</span>
              </div>
            </div>
          </div>
        </Card>
        {/* Thông tin chương trình/dự án */}
        <Card style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px #0001", border: "1px solid #e5e7eb", padding: 0, maxWidth: 400 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 16, fontWeight: 700, color: '#222', padding: '22px 24px 0 24px', letterSpacing: -0.5 }}>
            <Briefcase size={18} style={{ color: '#2563eb' }} />
            Tuyển dụng cho chương trình
          </div>
          <div style={{ position: 'relative', padding: '20px 10px 18px 20px' }}>
            <div style={{ position: 'absolute', top: 10, left: 20, background: '#f1f5f9', color: '#64748b', fontWeight: 300, fontSize: 12, borderRadius: 5, padding: '2px 12px', letterSpacing: 0.5 }}>HD-CTV-2024-001</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 18 }}>
              <div style={{ width: 64, height: 64, background: '#f1f5f9', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#94a3b8', fontSize: 20, border: '1px solid #e5e7eb' }}>
                Logo
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#222', marginBottom: 2, letterSpacing: -0.5 }}>Chương trình tầm soát ung thư cổ tử cung</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 10, marginTop: 18 }}>
              <div style={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
                Loại chương trình/dự án:
              </div>
              <div style={{ color: '#222', fontWeight: 600, fontSize: 13 }}>Chương trình</div>
              <div style={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
                Thời gian diễn ra:
              </div>
              <div style={{ color: '#222', fontWeight: 600, fontSize: 13 }}>15-01-2024 - 15-01-2025</div>
            </div>
          </div>
        </Card>
        {/* Action Buttons */}
        <Card style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px #0001", border: "1px solid #e5e7eb" }}>
          <div style={{ padding: "20px 24px 16px 24px" }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#222" }}>Thao tác</div>
          </div>
          <div style={{ padding: "0 24px 24px 24px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Button
                onClick={onSave}
                style={{
                  gap: 8
                }}
                disabled={isLoading}
              >
                <span style={{ fontSize: 14 }}>✓</span>
                {isLoading ? "Đang lưu..." : "Lưu thông tin"}
              </Button>
              <Button
                onClick={onCancel}
                style={{
                  border: "1px solid #d1d5db",
                  borderRadius: 5,
                  background: "#fff",
                  color: "#374151",
                }}
                disabled={isLoading}
              >
                Hủy
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
