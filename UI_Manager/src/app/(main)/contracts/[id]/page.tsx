"use client";
import { useRouter, useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import ContractDetailView, { ContractDetailData } from "@/components/contracts/ContractDetailView";
import ContractEditForm from "@/components/contracts/ContractEditForm";
import { ArrowLeft, CheckCircle, Pause, Play, RefreshCw, StopCircle, XCircle, Edit, X } from "lucide-react";

// Mock data đầy đủ trạng thái (giữ nguyên như trước nhưng lược đơn mô tả để ngắn gọn)
const mockContracts = [
  {
    id: 1,
    title: "Hợp đồng cộng tác viên y tế cộng đồng",
    contractNumber: "HD-CTV-2024-001",
    collaboratorName: "Nguyễn Văn A",
    collaboratorId: "CTV001",
    collaboratorEmail: "nguyenvana@email.com",
    collaboratorPhone: "0123456789",
    collaboratorAddress: "123 Đường ABC, Quận 1, TP.HCM",
    collaboratorIdCard: "123456789012",
    form: "Toàn thời gian",
    level: "Cộng tác viên",
    salary: "8.000.000 - 12.000.000",
    createDate: "10-01-2024",
    signDate: "10-01-2024",
    startDate: "15-01-2024",
    endDate: "15-01-2025",
    status: "Đang hiệu lực",
    statusColor: "green",
    project: "Chương trình tầm soát ung thư cổ tử cung",
    company: "Bệnh viện Đa khoa Hà Nội",
    location: "Hà Nội",
  },
  {
    id: 2,
    title: "Hợp đồng cộng tác viên chăm sóc sức khỏe",
    contractNumber: "HD-CTV-2024-002",
    collaboratorName: "Trần Thị B",
    collaboratorId: "CTV002",
    collaboratorEmail: "tranthib@email.com",
    collaboratorPhone: "0987654321",
    collaboratorAddress: "456 Đường XYZ, Quận 2, TP.HCM",
    collaboratorIdCard: "987654321098",
    form: "Bán thời gian",
    level: "Cộng tác viên",
    salary: "7.000.000 - 10.000.000",
    createDate: "05-03-2024",
    signDate: "05-03-2024",
    startDate: "10-03-2024",
    endDate: "10-03-2025",
    status: "Hết hiệu lực",
    statusColor: "gray",
    project: "Chương trình chăm sóc sức khỏe cộng đồng",
    company: "Trung tâm Y tế Quận 1",
    location: "TP.HCM",
  },
  {
    id: 3,
    title: "Hợp đồng cộng tác viên tuyên truyền y tế",
    contractNumber: "HD-CTV-2024-003",
    collaboratorName: "Lê Văn C",
    collaboratorId: "CTV003",
    collaboratorEmail: "levanc@email.com",
    collaboratorPhone: "0369852147",
    collaboratorAddress: "789 Đường DEF, Quận 3, TP.HCM",
    collaboratorIdCard: "456789123456",
    form: "Toàn thời gian",
    level: "Cộng tác viên",
    salary: "9.000.000 - 13.000.000",
    createDate: "20-04-2024",
    signDate: "20-04-2024",
    startDate: "25-04-2024",
    endDate: "25-04-2025",
    status: "Tạm ngưng",
    statusColor: "yellow",
    project: "Chương trình phòng chống sốt xuất huyết",
    company: "Sở Y tế Đà Nẵng",
    location: "Đà Nẵng",
  },
  {
    id: 4,
    title: "Hợp đồng cộng tác viên hỗ trợ y tế dự phòng",
    contractNumber: "HD-CTV-2024-004",
    collaboratorName: "Phạm Thị D",
    collaboratorId: "CTV004",
    collaboratorEmail: "phamthid@email.com",
    collaboratorPhone: "0523698741",
    collaboratorAddress: "321 Đường GHI, Quận 4, TP.HCM",
    collaboratorIdCard: "789123456789",
    form: "Bán thời gian",
    level: "Cộng tác viên",
    salary: "6.000.000 - 9.000.000",
    createDate: "15-05-2024",
    signDate: "15-05-2024",
    startDate: "20-05-2024",
    endDate: "20-05-2025",
    status: "Đã hủy",
    statusColor: "red",
    project: "Chương trình tiêm chủng mở rộng",
    company: "Trung tâm Kiểm soát Bệnh tật",
    location: "Hà Nội",
  },
  {
    id: 5,
    title: "Hợp đồng cộng tác viên y tế cộng đồng",
    contractNumber: "HD-CTV-2024-005",
    collaboratorName: "Hoàng Văn E",
    collaboratorId: "CTV005",
    collaboratorEmail: "hoangvane@email.com",
    collaboratorPhone: "0147258369",
    collaboratorAddress: "654 Đường JKL, Quận 5, TP.HCM",
    collaboratorIdCard: "321654987321",
    form: "Toàn thời gian",
    level: "Cộng tác viên",
    salary: "8.500.000 - 12.500.000",
    createDate: "01-06-2024",
    signDate: "01-06-2024",
    startDate: "05-06-2024",
    endDate: "05-06-2025",
    status: "Đã kết thúc sớm",
    statusColor: "purple",
    project: "Chương trình phòng chống dịch bệnh",
    company: "Bệnh viện Đa khoa Hà Nội",
    location: "Hà Nội",
  },
  {
    id: 6,
    title: "Hợp đồng cộng tác viên khám sức khỏe định kỳ",
    contractNumber: "HD-CTV-2024-006",
    collaboratorName: "Vũ Thị F",
    collaboratorId: "CTV006",
    collaboratorEmail: "vuthif@email.com",
    collaboratorPhone: "0369852147",
    collaboratorAddress: "987 Đường MNO, Quận 6, TP.HCM",
    collaboratorIdCard: "147258369147",
    form: "Toàn thời gian",
    level: "Cộng tác viên",
    salary: "7.500.000 - 11.000.000",
    createDate: "15-12-2024",
    signDate: "15-12-2024",
    startDate: "01-01-2025",
    endDate: "01-01-2026",
    status: "Chờ hiệu lực",
    statusColor: "blue",
    project: "Chương trình khám sức khỏe định kỳ cho người cao tuổi",
    company: "Trung tâm Y tế Dự phòng",
    location: "TP.HCM",
  },
] as const;

type Contract = (typeof mockContracts)[number];

export default function ContractDetailPage() {
  const router = useRouter();
  const params = useParams();
  const contractId = Number(params.id);
  const contract: Contract | undefined = mockContracts.find((c) => c.id === contractId);
  const [isLoading, setIsLoading] = useState(false);
  const [showRenewModal, setShowRenewModal] = useState(false);
  const [showTerminateModal, setShowTerminateModal] = useState(false);
  const [showSuspendConfirm, setShowSuspendConfirm] = useState(false);
  const [showResumeConfirm, setShowResumeConfirm] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [terminateForm, setTerminateForm] = useState({ mode: "now", endDate: "" });
  const [renewForm, setRenewForm] = useState({
    oldEndDate: contract?.endDate ?? "",
    newEndDate: "",
    signDate: new Date().toISOString().split("T")[0],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    contractTitle: contract?.title ?? "",
    contractType: contract?.form ?? "",
    level: contract?.level ?? "",
    probationPeriod: "2",
    startDate: contract?.startDate ?? "",
    endDate: contract?.endDate ?? "",
    signDate: contract?.signDate ?? "",
    salary: contract?.salary ?? "",
    workLocation: contract?.location ?? "",
    workSchedule: "8:00 - 17:00",
    benefits: "Bảo hiểm y tế, phụ cấp, nghỉ phép năm",
    responsibilities: "Thực hiện công việc theo phân công; Báo cáo định kỳ",
  });

  const data: ContractDetailData | null = useMemo(() => {
    if (!contract) return null;
    return {
      contractCode: contract.contractNumber,
      contractTitle: contract.title,
      contractType: contract.form,
      startDate: contract.startDate,
      endDate: contract.endDate,
      probationPeriod: "2",
      salary: contract.salary,
      workLocation: contract.location,
      workSchedule: "8:00 - 17:00",
      benefits: "Bảo hiểm y tế, phụ cấp, nghỉ phép năm",
      responsibilities: "Thực hiện công việc theo phân công; Báo cáo định kỳ",
      signDate: contract.signDate,
      level: contract.level,
      form: contract.form,
      status: contract.status,
      candidate: {
        name: contract.collaboratorName,
        email: contract.collaboratorEmail,
        phone: contract.collaboratorPhone,
        education: "Cử nhân",
      },
      application: {
        jobTitle: "Cộng tác viên y tế cộng đồng",
        company: contract.company,
        location: contract.location,
        salary: contract.salary,
        appliedDate: contract.signDate,
        form: contract.form,
        level: contract.level,
      },
      projectInfo: {
        code: contract.contractNumber,
        name: contract.project,
        type: "Chương trình",
        duration: `${contract.startDate} - ${contract.endDate}`,
      },
    };
  }, [contract]);

  if (!contract || !data) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">Không tìm thấy hợp đồng</div>;
  }

  const withLoading = (fn: () => void) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      fn();
    }, 800);
  };

  const handleRenew = () => setShowRenewModal(true);
  const openTerminateModal = () => setShowTerminateModal(true);
  const handleSubmitTerminate = (e: React.FormEvent) => {
    e.preventDefault();
    if (terminateForm.mode === "date" && !terminateForm.endDate) {
      return; // yêu cầu chọn ngày
    }
    setShowTerminateModal(false);
    withLoading(() => {
      const message =
        terminateForm.mode === "now"
          ? "Đã kết thúc hợp đồng ngay lập tức!"
          : `Đã cập nhật kết thúc hợp đồng vào ngày ${terminateForm.endDate}!`;
      alert(message);
    });
  };
  const openSuspendConfirm = () => setShowSuspendConfirm(true);
  const confirmSuspend = () => {
    setShowSuspendConfirm(false);
    withLoading(() => alert("Đã tạm ngưng hợp đồng!"));
  };

  const openResumeConfirm = () => setShowResumeConfirm(true);
  const confirmResume = () => {
    setShowResumeConfirm(false);
    withLoading(() => alert("Đã khôi phục hợp đồng!"));
  };
  
  const openCancelConfirm = () => setShowCancelConfirm(true);
  const confirmCancel = () => {
    setShowCancelConfirm(false);
    withLoading(() => alert("Đã hủy hợp đồng!"));
  };
  const handleSign = () => withLoading(() => alert("Đã ký hợp đồng!"));
  const handleUpdate = () => {
    setIsEditing(true);
    setEditForm({
      contractTitle: contract?.title ?? "",
      contractType: contract?.form ?? "",
      level: contract?.level ?? "",
      probationPeriod: "2",
      startDate: contract?.startDate ?? "",
      endDate: contract?.endDate ?? "",
      signDate: contract?.signDate ?? "",
      salary: contract?.salary ?? "",
      workLocation: contract?.location ?? "",
      workSchedule: "8:00 - 17:00",
      benefits: "Bảo hiểm y tế, phụ cấp, nghỉ phép năm",
      responsibilities: "Thực hiện công việc theo phân công; Báo cáo định kỳ",
    });
  };

  const handleSave = () => {
    withLoading(() => {
      alert("Đã lưu thông tin hợp đồng!");
      setIsEditing(false);
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSubmitRenew = (e: React.FormEvent) => {
    e.preventDefault();
    setShowRenewModal(false);
    withLoading(() => {
      alert(
        `Đã gia hạn hợp đồng!\nNgày kết thúc cũ: ${renewForm.oldEndDate}\nNgày gia hạn: ${renewForm.newEndDate}\nNgày ký: ${renewForm.signDate}`
      );
    });
  };

  const renderActions = () => {
    switch (contract.status) {
      case "Đang hiệu lực":
        return (
          <div className="flex flex-wrap gap-2">
            <Button className="bg-red-600 hover:bg-red-700 text-white" size="sm" onClick={openTerminateModal} disabled={isLoading}>
              <StopCircle size={14} className="mr-2" /> Kết thúc
            </Button>
            <Button className="bg-orange-600 hover:bg-orange-700 text-white" size="sm" onClick={handleRenew} disabled={isLoading}>
              <RefreshCw size={14} className="mr-2" /> Gia hạn
            </Button>
            <Button className="bg-yellow-600 hover:bg-yellow-700 text-white" size="sm" onClick={openSuspendConfirm} disabled={isLoading}>
              <Pause size={14} className="mr-2" /> Tạm ngưng
            </Button>
          </div>
        );
      case "Hết hiệu lực":
        return (
          <Button className="bg-orange-600 hover:bg-orange-700 text-white" size="sm" onClick={handleRenew} disabled={isLoading}>
            <RefreshCw size={14} className="mr-2" /> Gia hạn
          </Button>
        );
      case "Tạm ngưng":
        return (
          <div className="flex flex-wrap gap-2">
            <Button className="bg-green-600 hover:bg-green-700 text-white" size="sm" onClick={openResumeConfirm} disabled={isLoading}>
              <Play size={14} className="mr-2" /> Khôi phục
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white" size="sm" onClick={openTerminateModal} disabled={isLoading}>
              <StopCircle size={14} className="mr-2" /> Kết thúc
            </Button>
          </div>
        );
      case "Đã hủy":
        return (
          <div className="text-gray-500 text-sm">Hợp đồng đã bị hủy - không thể thực hiện thao tác</div>
        );
      case "Đã kết thúc sớm":
        return (
          <div className="text-gray-500 text-sm">Hợp đồng đã kết thúc sớm - không thể thực hiện thao tác</div>
        );
      case "Chờ hiệu lực":
        return (
          <div className="flex flex-wrap gap-2">
            <Button className="bg-red-600 hover:bg-red-700 text-white" size="sm" onClick={openCancelConfirm} disabled={isLoading}>
              <XCircle size={14} className="mr-2" /> Hủy hợp đồng
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => router.back()} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" /> Quay lại
              </Button>
            </div>
          </div>
          {isEditing ? (
            <div style={{ maxWidth: 1500, margin: "0 auto", padding: '10px 10px 0 10px', minHeight: "100vh", borderRadius: 18 }}>
              {/* Header */}
              <div style={{ marginBottom: 20, position: 'relative' }}>
                <h1 style={{ fontWeight: 700, fontSize: 26, color: "#222", marginBottom: 5, letterSpacing: -1 }}>Chỉnh sửa hợp đồng tuyển dụng cộng tác viên</h1>
                <div style={{ color: '#64748b', fontSize: 15 }}>Cập nhật thông tin hợp đồng lao động cho cộng tác viên</div>
              </div>
                             <ContractEditForm 
                 editForm={editForm}
                 setEditForm={setEditForm}
                 contractStatus={contract.status}
                 onSave={handleSave}
                 onCancel={handleCancelEdit}
                 isLoading={isLoading}
               />
            </div>
          ) : (
            <ContractDetailView 
              data={data} 
              onBack={() => router.push("/contracts")} 
              actionsSlot={
                <div className="flex flex-col gap-2">
                  {/* Cập nhật hợp đồng - chỉ hiển thị cho một số trạng thái */}
                  {!["Đã hủy", "Hết hiệu lực", "Đã kết thúc sớm", "Đang hiệu lực"].includes(contract.status) && (
                    <Button variant="outline" size="sm" onClick={handleUpdate} className="border-blue-200 text-blue-600 hover:bg-blue-50 w-full justify-center">
                      <Edit size={14} className="mr-2" /> Cập nhật hợp đồng
                    </Button>
                  )}
                  {/* Theo trạng thái */}
                  {contract.status === "Đang hiệu lực" && (
                    <>
                      <Button className="bg-red-600 hover:bg-red-700 text-white w-full justify-center" size="sm" onClick={openTerminateModal} disabled={isLoading}>
                        <StopCircle size={14} className="mr-2" /> Kết thúc
                      </Button>
                      <Button className="bg-orange-600 hover:bg-orange-700 text-white w-full justify-center" size="sm" onClick={handleRenew} disabled={isLoading}>
                        <RefreshCw size={14} className="mr-2" /> Gia hạn
                      </Button>
                      <Button className="bg-yellow-600 hover:bg-yellow-700 text-white w-full justify-center" size="sm" onClick={openSuspendConfirm} disabled={isLoading}>
                        <Pause size={14} className="mr-2" /> Tạm ngưng
                      </Button>
                    </>
                  )}
                  {contract.status === "Hết hiệu lực" && (
                    <Button className="bg-orange-600 hover:bg-orange-700 text-white w-full justify-center" size="sm" onClick={handleRenew} disabled={isLoading}>
                      <RefreshCw size={14} className="mr-2" /> Gia hạn
                    </Button>
                  )}
                  {contract.status === "Tạm ngưng" && (
                    <>
                      <Button className="bg-green-600 hover:bg-green-700 text-white w-full justify-center" size="sm" onClick={openResumeConfirm} disabled={isLoading}>
                        <Play size={14} className="mr-2" /> Khôi phục
                      </Button>
                      <Button className="bg-red-600 hover:bg-red-700 text-white w-full justify-center" size="sm" onClick={openTerminateModal} disabled={isLoading}>
                        <StopCircle size={14} className="mr-2" /> Kết thúc
                      </Button>
                    </>
                  )}
                  {contract.status === "Chờ hiệu lực" && (
                    <Button className="bg-red-600 hover:bg-red-700 text-white w-full justify-center" size="sm" onClick={openCancelConfirm} disabled={isLoading}>
                      <XCircle size={14} className="mr-2" /> Hủy hợp đồng
                    </Button>
                  )}
                  {(contract.status === "Đã hủy" || contract.status === "Đã kết thúc sớm") && (
                    <div className="text-gray-500 text-sm">Không có thao tác khả dụng</div>
                  )}
                </div>
              }
            />
          )}
        </div>
      </div>

      {/* Modal gia hạn hợp đồng - overlay mờ, căn giữa */}
      {showRenewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[1px]">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-orange-600"/> Gia hạn hợp đồng
              </h3>
              <button onClick={() => setShowRenewModal(false)} className="p-1 rounded hover:bg-gray-100">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmitRenew} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ngày kết thúc hợp đồng cũ</label>
                <input
                  type="text"
                  value={renewForm.oldEndDate}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ngày gia hạn hợp đồng <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  required
                  value={renewForm.newEndDate}
                  onChange={(e) => setRenewForm({ ...renewForm, newEndDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ngày ký hợp đồng <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  required
                  value={renewForm.signDate}
                  onChange={(e) => setRenewForm({ ...renewForm, signDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setShowRenewModal(false)} className="flex-1">
                  Hủy
                </Button>
                <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Gia hạn
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal kết thúc hợp đồng - chọn kết thúc ngay hoặc theo ngày */}
      {showTerminateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[1px]">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <StopCircle className="w-5 h-5 text-red-600"/> Kết thúc hợp đồng
              </h3>
              <button onClick={() => setShowTerminateModal(false)} className="p-1 rounded hover:bg-gray-100"><X className="w-5 h-5 text-gray-500"/></button>
            </div>
            <form onSubmit={handleSubmitTerminate} className="space-y-4">
              {terminateForm.mode === "date" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Chọn ngày kết thúc <span className="text-red-500">*</span></label>
                  <input
                    type="date"
                    required
                    value={terminateForm.endDate}
                    onChange={(e) => setTerminateForm({ ...terminateForm, endDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setShowTerminateModal(false)} className="flex-1">Hủy</Button>
                <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">Xác nhận</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal xác nhận Tạm ngưng */}
      {showSuspendConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[1px]">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Pause className="w-5 h-5 text-yellow-600"/> Xác nhận tạm ngưng
              </h3>
              <button onClick={() => setShowSuspendConfirm(false)} className="p-1 rounded hover:bg-gray-100"><X className="w-5 h-5 text-gray-500"/></button>
            </div>
            <p className="text-sm text-gray-600 mb-4">Bạn có chắc chắn muốn tạm ngưng hợp đồng này?</p>
                         <div className="flex gap-3">
               <Button variant="outline" onClick={() => setShowSuspendConfirm(false)} className="flex-1">Hủy</Button>
               <Button onClick={confirmSuspend} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">Xác nhận</Button>
             </div>
          </div>
        </div>
      )}

      {/* Modal xác nhận Khôi phục */}
      {showResumeConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[1px]">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-green-700 flex items-center gap-2"><Play className="w-5 h-5"/> Xác nhận khôi phục</h3>
              <button onClick={() => setShowResumeConfirm(false)} className="p-1 rounded hover:bg-gray-100"><X className="w-5 h-5 text-gray-500"/></button>
            </div>
            <p className="text-sm text-gray-600 mb-4">Bạn có chắc chắn muốn khôi phục hợp đồng này?</p>
                         <div className="flex gap-3">
               <Button variant="outline" onClick={() => setShowResumeConfirm(false)} className="flex-1">Hủy</Button>
               <Button onClick={confirmResume} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">Xác nhận</Button>
             </div>
          </div>
        </div>
      )}

      {/* Modal xác nhận Hủy hợp đồng */}
      {showCancelConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[1px]">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-600"/> Xác nhận hủy hợp đồng
              </h3>
              <button onClick={() => setShowCancelConfirm(false)} className="p-1 rounded hover:bg-gray-100"><X className="w-5 h-5 text-gray-500"/></button>
            </div>
            <p className="text-sm text-gray-600 mb-4">Bạn có chắc chắn muốn hủy hợp đồng này? Hành động này không thể hoàn tác.</p>
                         <div className="flex gap-3">
               <Button variant="outline" onClick={() => setShowCancelConfirm(false)} className="flex-1">Hủy</Button>
               <Button onClick={confirmCancel} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">Xác nhận</Button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
