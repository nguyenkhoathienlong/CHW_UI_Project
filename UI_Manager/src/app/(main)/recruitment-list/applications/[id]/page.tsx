"use client";
import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Upload,
  FileText,
  Award,
  CheckCircle,
  AlertCircle,
  Briefcase,
  Building,
  MapPin,
  DollarSign,
  Clock,
  X,
  Calendar,
  Download,
  User,
  Mail,
  Phone,
  Check,
  XCircle
} from 'lucide-react';

// Mock data cho ứng viên
const mockCandidates = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "nguyenvana@email.com",
    phone: "0123456789",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    appliedDate: "20/12/2024",
    education: "Cử nhân"
  },
  {
    id: 2,
    name: "Trần Thị B",
    email: "tranthib@email.com",
    phone: "0987654321",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    appliedDate: "18/12/2024",
    education: "Đại học"
  },
  {
    id: 3,
    name: "Lê Văn C",
    email: "levanc@email.com",
    phone: "0369852147",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    appliedDate: "15/12/2024",
    education: "Thạc sĩ"
  },
  {
    id: 4,
    name: "Phạm Thị D",
    email: "phamthid@email.com",
    phone: "0523698741",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    appliedDate: "12/12/2024",
    education: "Tiến sĩ"
  }
];

// Mock data cho đơn ứng tuyển
const mockApplications = [
  {
    id: 1,
    candidateId: 1,
    jobTitle: 'Cộng tác viên y tế cộng đồng',
    company: 'Bệnh viện Đa khoa Hà Nội',
    location: 'Hà Nội',
    appliedDate: '20/12/2024',
    status: 'Đang xem xét',
    statusColor: 'yellow',
    salary: '8.000.000 - 12.000.000',
    form: 'Toàn thời gian',
    level: 'Cộng tác viên',
    deadline: '30/12/2024',
    cv: 'CV_NguyenVanA.pdf',
    certificates: [
      'Chứng chỉ đào tạo cơ bản',
      'Chứng chỉ sơ cấp cứu'
    ],
    coverLetter: 'Tôi rất quan tâm đến vị trí này và tin rằng kinh nghiệm của tôi phù hợp với yêu cầu công việc. Với 3 năm kinh nghiệm trong lĩnh vực y tế cộng đồng, tôi đã có cơ hội làm việc với nhiều đối tượng khác nhau và hiểu rõ nhu cầu của cộng đồng.'
  },
  {
    id: 2,
    candidateId: 2,
    jobTitle: 'Nhân viên chăm sóc sức khỏe',
    company: 'Trung tâm Y tế Quận 1',
    location: 'TP.HCM',
    appliedDate: '18/12/2024',
    status: 'Đã duyệt',
    statusColor: 'green',
    salary: '7.000.000 - 10.000.000',
    form: 'Bán thời gian',
    level: 'Cộng tác viên',
    deadline: '25/12/2024',
    cv: 'CV_TranThiB_Updated.pdf',
    certificates: [
      'Chứng chỉ đào tạo cơ bản',
      'Chứng chỉ đào tạo nâng cao',
      'Chứng chỉ kỹ năng giao tiếp'
    ],
    coverLetter: 'Với kinh nghiệm trong lĩnh vực y tế và đam mê chăm sóc sức khỏe cộng đồng, tôi tin rằng mình có thể đóng góp tích cực cho tổ chức. Tôi có khả năng làm việc nhóm tốt và luôn sẵn sàng học hỏi để phát triển bản thân.'
  },
  {
    id: 3,
    candidateId: 3,
    jobTitle: 'Cộng tác viên tuyên truyền y tế',
    company: 'Sở Y tế Đà Nẵng',
    location: 'Đà Nẵng',
    appliedDate: '15/12/2024',
    status: 'Từ chối',
    statusColor: 'red',
    salary: '6.000.000 - 9.000.000',
    deadline: '20/12/2024',
    cv: 'CV_LeVanC.pdf',
    certificates: [
      'Chứng chỉ đào tạo cơ bản'
    ],
    coverLetter: 'Tôi mong muốn được đóng góp vào công tác tuyên truyền y tế và nâng cao nhận thức cộng đồng về sức khỏe. Với kiến thức chuyên môn và kỹ năng giao tiếp, tôi tin rằng mình có thể thực hiện tốt vai trò này.'
  },
  {
    id: 4,
    candidateId: 4,
    jobTitle: 'Nhân viên hỗ trợ y tế dự phòng',
    company: 'Trung tâm Kiểm soát Bệnh tật',
    location: 'Hà Nội',
    appliedDate: '12/12/2024',
    status: 'Đang xem xét',
    statusColor: 'yellow',
    salary: '9.000.000 - 13.000.000',
    deadline: '28/12/2024',
    cv: 'CV_PhamThiD_Specialized.pdf',
    certificates: [
      'Chứng chỉ đào tạo cơ bản',
      'Chứng chỉ đào tạo nâng cao',
      'Chứng chỉ sơ cấp cứu'
    ],
    coverLetter: 'Tôi có kiến thức về dịch tễ học và mong muốn được tham gia vào công tác phòng chống dịch bệnh. Với kinh nghiệm thực tế và tinh thần trách nhiệm cao, tôi tin rằng mình có thể đóng góp hiệu quả cho tổ chức.'
  }
];

export default function ApplicationDetailPage() {
  const router = useRouter();
  const params = useParams();
  const applicationId = Number(params.id);
  const application = mockApplications.find(app => app.id === applicationId);
  const candidate = application ? mockCandidates.find(c => c.id === application.candidateId) : null;

  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  if (!application || !candidate) return <div className="text-center text-red-500 py-10">Không tìm thấy đơn ứng tuyển</div>;

  const handleApprove = () => {
    setIsApproving(true);
    // Simulate API call
    setTimeout(() => {
      setIsApproving(false);
      alert('Đã duyệt đơn ứng tuyển thành công!');
      router.push('/recruitment-list');
    }, 1000);
  };

  const handleReject = () => {
    setIsRejecting(true);
    // Simulate API call
    setTimeout(() => {
      setIsRejecting(false);
      alert('Đã từ chối đơn ứng tuyển!');
      router.push('/recruitment-list');
    }, 1000);
  };

  const handleDownloadCV = () => {
    // Simulate download
    const link = document.createElement('a');
    link.href = '#';
    link.download = application.cv;
    link.click();
  };

  const handleDownloadCertificate = (certName: string) => {
    // Simulate download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${certName}.pdf`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center gap-4 mb-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => router.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Quay lại
            </Button>
          </div>
        </div>
        {/* Tiêu đề và trạng thái ngang hàng */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ fontWeight: 700, fontSize: 26, color: "#222", marginBottom: 3, letterSpacing: -1 }}>Đơn ứng tuyển</h1>
            <div style={{ color: '#64748b', fontSize: 15 }}>Thông tin chi tiết đơn ứng tuyển của ứng viên</div>
          </div>
          <div style={{ 
            display: "inline-flex", 
            alignItems: "center", 
            padding: "4px 12px", 
            borderRadius: "9999px", 
            fontSize: 14, 
            fontWeight: 600, 
            border: "1px solid",
            ...(application.statusColor === 'green' ? { background: "#d1fae5", color: "#059669", borderColor: "#a7f3d0" } :
                 application.statusColor === 'yellow' ? { background: "#fef9c3", color: "#b45309", borderColor: "#fde68a" } :
                 { background: "#fee2e2", color: "#dc2626", borderColor: "#fca5a5" })
          }}>
            {application.status}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 12, marginTop: 24 }}>
          {/* Main Content */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {/* Job Information */}
            <Card style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px #0001", border: "1px solid #e5e7eb" }}>
              <div style={{ padding: "20px 24px 16px 24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 18, fontWeight: 700, color: "#222" }}>
                  <Briefcase size={20} style={{ color: "#2563eb" }} />
                  Thông tin công việc
                </div>
              </div>
              <div style={{ padding: "0 24px 24px 24px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Briefcase size={16} style={{ color: "#2563eb" }} />
                    <span style={{ fontSize: 14 }}><strong>Vị trí:</strong> {application.jobTitle}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Building size={16} style={{ color: "#2563eb" }} />
                    <span style={{ fontSize: 14 }}><strong>Công ty:</strong> {application.company}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <MapPin size={16} style={{ color: "#2563eb" }} />
                    <span style={{ fontSize: 14 }}><strong>Địa điểm:</strong> {application.location}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <DollarSign size={16} style={{ color: "#2563eb" }} />
                    <span style={{ fontSize: 14 }}><strong>Mức lương:</strong> {application.salary}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Clock size={16} style={{ color: "#2563eb" }} />
                    <span style={{ fontSize: 14 }}><strong>Hạn nộp hồ sơ:</strong> {application.deadline}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Calendar size={16} style={{ color: "#2563eb" }} />
                    <span style={{ fontSize: 14 }}><strong>Ngày ứng tuyển:</strong> {application.appliedDate}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* CV Upload */}
            <Card style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px #0001", border: "1px solid #e5e7eb" }}>
              <div style={{ padding: "20px 24px 16px 24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 18, fontWeight: 700, color: "#222" }}>
                  <Upload size={20} style={{ color: "#2563eb" }} />
                  CV/Resume
                </div>
              </div>
              <div style={{ padding: "0 24px 24px 24px" }}>
                <div style={{ border: "2px dashed #d1d5db", borderRadius: 12, padding: 24, textAlign: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                    <FileText size={32} style={{ color: "#2563eb" }} />
                    <div style={{ textAlign: "left" }}>
                      <p style={{ fontWeight: 600, fontSize: 16, color: "#222", marginBottom: 4 }}>{application.cv}</p>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <Button
                          variant="outline"
                          size="sm"
                          style={{ fontSize: 12, padding: "4px 12px", borderRadius: 6, fontWeight: 600 }}
                          onClick={handleDownloadCV}
                        >
                          <Download size={14} style={{ marginRight: 4 }} />
                          Tải về
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Certificate Selection */}
            <Card style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px #0001", border: "1px solid #e5e7eb" }}>
              <div style={{ padding: "20px 24px 16px 24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 18, fontWeight: 700, color: "#222" }}>
                  <Award size={20} style={{ color: "#2563eb" }} />
                  Chứng chỉ đính kèm
                </div>
              </div>
              <div style={{ padding: "0 24px 24px 24px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <p style={{ fontSize: 14, color: "#64748b" }}>
                    Các chứng chỉ được ứng viên đính kèm trong hồ sơ:
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {application.certificates.map((cert, idx) => (
                      <div key={idx} style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: 12, 
                        padding: 12, 
                        border: "1px solid #e5e7eb", 
                        borderRadius: 8, 
                        background: "#f8fafc" 
                      }}>
                        <input
                          type="checkbox"
                          id={`cert-${idx}`}
                          checked
                          disabled
                          onChange={() => {}}
                          style={{ width: 16, height: 16, margin: 0 }}
                        />
                        <div style={{ flex: 1 }}>
                          <label htmlFor={`cert-${idx}`} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                            <span style={{ fontWeight: 600, fontSize: 14, color: "#222" }}>{cert}</span>
                            <span style={{ 
                              display: "inline-flex", 
                              alignItems: "center", 
                              padding: "2px 8px", 
                              borderRadius: "9999px", 
                              fontSize: 12, 
                              fontWeight: 600, 
                              background: "#d1fae5", 
                              color: "#059669" 
                            }}>
                              Có hiệu lực
                            </span>
                          </label>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          style={{ fontSize: 12, padding: "4px 8px", borderRadius: 6, fontWeight: 600 }}
                          onClick={() => handleDownloadCertificate(cert)}
                        >
                          <Download size={12} style={{ marginRight: 4 }} />
                          Tải
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Cover Letter */}
            <Card style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px #0001", border: "1px solid #e5e7eb" }}>
              <div style={{ padding: "20px 24px 16px 24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 18, fontWeight: 700, color: "#222" }}>
                  <FileText size={20} style={{ color: "#2563eb" }} />
                  Thư xin việc
                </div>
              </div>
              <div style={{ padding: "0 24px 24px 24px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <p style={{ fontSize: 14, color: "#64748b" }}>
                    Nội dung thư xin việc của ứng viên:
                  </p>
                  <textarea
                    value={application.coverLetter}
                    disabled
                    placeholder="Viết thư xin việc của bạn ở đây..."
                    style={{ 
                      width: "100%", 
                      padding: 12, 
                      border: "1px solid #d1d5db", 
                      borderRadius: 8, 
                      resize: "none", 
                      background: "#f9fafb",
                      fontSize: 14,
                      lineHeight: 1.5,
                      minHeight: 120
                    }}
                    rows={6}
                  />
                  <p style={{ fontSize: 12, color: "#9ca3af" }}>
                    Tối đa 1000 ký tự. Hiện tại: {application.coverLetter.length}/1000
                  </p>
                </div>
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
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
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
                      {candidate.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </div>
                    <h3 style={{ fontWeight: 700, fontSize: 16, color: "#222", marginBottom: 0 }}>{candidate.name}</h3>
                  </div>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "#f8fafc", borderRadius: 6, border: "1px solid #e2e8f0" }}>
                      <Mail size={14} style={{ color: "#2563eb" }} />
                      <span style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>{candidate.email}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "#f8fafc", borderRadius: 6, border: "1px solid #e2e8f0" }}>
                      <Phone size={14} style={{ color: "#2563eb" }} />
                      <span style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>{candidate.phone}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "#f8fafc", borderRadius: 6, border: "1px solid #e2e8f0" }}>
                      <Award size={14} style={{ color: "#2563eb" }} />
                      <span style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>{candidate.education}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Application Summary */}
            <Card style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px #0001", border: "1px solid #e5e7eb" }}>
              <div style={{ padding: "20px 24px 16px 24px" }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#222" }}>Tóm tắt đơn ứng tuyển</div>
              </div>
              <div style={{ padding: "0 24px 24px 24px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div>
                    <h4 style={{ fontWeight: 600, fontSize: 14, color: "#222", marginBottom: 8 }}>Thông tin công việc</h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13 }}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "#64748b" }}>Vị trí:</span>
                        <span style={{ fontWeight: 600 }}>{application.jobTitle}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "#64748b" }}>Công ty:</span>
                        <span style={{ fontWeight: 600 }}>{application.company}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "#64748b" }}>Địa điểm:</span>
                        <span style={{ fontWeight: 600 }}>{application.location}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "#64748b" }}>Mức lương:</span>
                        <span style={{ fontWeight: 600 }}>{application.salary}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#64748b]">Hình thức:</span>
                        <span style={{ fontWeight: 600 }}>{application.form}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#64748b]">Cấp bậc:</span>
                        <span style={{ fontWeight: 600 }}>{application.level}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "#64748b" }}>Ngày ứng tuyển:</span>
                        <span style={{ fontWeight: 600 }}>{application.appliedDate}</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 16 }}>
                    <h4 style={{ fontWeight: 600, fontSize: 14, color: "#222", marginBottom: 8 }}>Hồ sơ đính kèm</h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13 }}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "#64748b" }}>CV/Resume:</span>
                        <span style={{ color: "#059669", fontWeight: 600 }}>
                          ✓ Đã chọn
                        </span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "#64748b" }}>Chứng chỉ:</span>
                        <span style={{ fontWeight: 600 }}>{application.certificates.length} chứng chỉ</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "#64748b" }}>Thư xin việc:</span>
                        <span style={{ color: "#059669", fontWeight: 600 }}>
                          ✓ Có
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <Card style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px #0001", border: "1px solid #e5e7eb" }}>
              <div style={{ padding: "20px 24px 16px 24px" }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#222" }}>Thao tác</div>
              </div>
              <div style={{ padding: "0 24px 24px 24px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {application.status === "Đã duyệt" ? (
                    <Button
                      style={{ 
                        width: "100%", 
                        background: "#2563eb", 
                        color: "white", 
                        border: "none", 
                        borderRadius: 8, 
                        padding: "12px 16px", 
                        fontWeight: 600, 
                        fontSize: 14,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        cursor: "pointer"
                      }}
                      onClick={() => {
                        // Handle contract creation
                        router.push(`/recruitment-list/applications/${applicationId}/contract`);
                      }}
                    >
                      <FileText size={16} />
                      Tạo hợp đồng
                    </Button>
                  ) : (
                    <>
                      <Button
                        style={{ 
                          width: "100%", 
                          background: "#059669", 
                          color: "white", 
                          border: "none", 
                          borderRadius: 8, 
                          padding: "12px 16px", 
                          fontWeight: 600, 
                          fontSize: 14,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 8,
                          cursor: "pointer",
                          opacity: isApproving ? 0.7 : 1
                        }}
                        onClick={handleApprove}
                        disabled={isApproving}
                      >
                        <Check size={16} />
                        {isApproving ? "Đang duyệt..." : "Duyệt đơn"}
                      </Button>
                      <Button
                        variant="outline"
                        style={{ 
                          width: "100%", 
                          border: "1px solid #dc2626", 
                          color: "#dc2626", 
                          background: "white", 
                          borderRadius: 8, 
                          padding: "12px 16px", 
                          fontWeight: 600, 
                          fontSize: 14,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 8,
                          cursor: "pointer",
                          opacity: isRejecting ? 0.7 : 1
                        }}
                        onClick={handleReject}
                        disabled={isRejecting}
                      >
                        <XCircle size={16} />
                        {isRejecting ? "Đang từ chối..." : "Từ chối đơn"}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 