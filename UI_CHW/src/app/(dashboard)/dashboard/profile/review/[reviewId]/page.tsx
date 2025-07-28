"use client";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, BadgeCheck, Calendar } from "lucide-react";
import React from "react";

// Mock dữ liệu đánh giá
const reviewDetail = {
  org: "Trung tâm Y tế A",
  date: "10/06/2024",
  criteria: [
    { label: "Chuyên môn", value: 5 },
    { label: "Thái độ", value: 5 },
    { label: "Kỹ năng giao tiếp", value: 4 },
    { label: "Đóng góp", value: 5 },
    { label: "Tính chủ động", value: 5 },
    { label: "Kỹ năng làm việc nhóm", value: 4 },
    { label: "Khả năng thích nghi", value: 5 },
    { label: "Tuân thủ quy định", value: 5 },
    { label: "Sáng tạo", value: 4 },
    { label: "Khả năng giải quyết vấn đề", value: 5 },
  ],
  comment: "Cộng tác viên làm việc rất tốt, chủ động và hợp tác. Rất hài lòng với sự đóng góp của cộng tác viên.",
};

export default function ReviewDetailPage() {
  const router = useRouter();
  // Không lấy id động, chỉ dùng mock data
  const collaborator = {
    id: "CTV101",
    name: "Nguyễn Văn A",
    avatar: "/public/avatar-default.png",
    username: "nguyenvana",
    role: "Cộng tác viên",
    email: "nguyenvana@gmail.com",
    phone: "0912345678",
    status: "Đang tham gia",
  };
  const project = {
    name: "Tầm soát ung thư cổ tử cung 2024",
    type: "Miễn phí cho người thụ hưởng",
    logo: "",
    startDate: "01-05-2024",
    endDate: "31-12-2024",
    description: "Chương trình nâng cao sức khỏe cộng đồng, tập trung vào phòng chống dịch bệnh và nâng cao nhận thức y tế.",
    id: 1,
  };
  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => router.back()}
          className="flex items-center gap-2 mb-3"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại
        </Button>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Chi tiết đánh giá cộng tác viên</h1>
        <p className="text-gray-600 mb-4">Đánh giá của đơn vị <b>{reviewDetail.org}</b> ngày {reviewDetail.date}</p>
        {/* Thông tin CTV & chương trình */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Card Ứng viên */}
          <Card className="flex flex-row items-center bg-white rounded-xl shadow-md pl-6 gap-4">
          <div className="flex-1 flex flex-col justify-center gap-1">
            <div className="flex items-center gap-3">
              <span className="font-bold text-base text-[#2563eb]">{collaborator.name}</span>
              <span className="text-green-600 font-semibold text-xs flex items-center">
                <BadgeCheck size={14} className="mr-1" /> {collaborator.status}
              </span>
            </div>
            <div className="text-slate-500 text-xs flex items-center gap-2 mt-1">
              <User size={13} className="mr-1" />{collaborator.role}
              <span className="ml-2">@{collaborator.username}</span>
            </div>
            <div className="text-slate-500 text-xs mt-1">{collaborator.email} | {collaborator.phone}</div>
          </div>
        </Card>
          {/* Card Chương trình */}
          <Card className="flex flex-row items-center bg-white rounded-xl shadow-md p-3 gap-4">
          <div className="w-30 h-30 rounded-lg bg-gray-100 border border-[#e5e7eb] flex-shrink-0" />
          <div className="flex-1 flex flex-col justify-center gap-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-base text-[#2563eb]">{project.name}</span>
            </div>
            <span className="text-slate-500 text-xs">Loại chương trình: {project.type}</span>
            <div className="text-slate-500 text-xs flex items-center gap-2 mt-1">
              <Calendar className="w-4 h-4" />
              Thời gian diễn ra: Từ {project.startDate} - {project.endDate}
            </div>
            <Button
              variant="outline"
              className="mt-2 w-fit font-semibold text-xs px-3 py-1"
              onClick={() => {}}
            >
              Xem thông tin chương trình
            </Button>
          </div>
        </Card>
        </div>
        <Card className="p-6 w-full mb-6">
          <div className="font-semibold text-lg mb-2">Đánh giá cộng tác viên</div>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg text-sm mb-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-3 py-2 text-left font-semibold">Tiêu chí</th>
                  <th className="px-3 py-2 text-center font-semibold">Rất tốt</th>
                  <th className="px-3 py-2 text-center font-semibold">Tốt</th>
                  <th className="px-3 py-2 text-center font-semibold">Trung bình</th>
                  <th className="px-3 py-2 text-center font-semibold">Kém</th>
                  <th className="px-3 py-2 text-center font-semibold">Rất kém</th>
                </tr>
              </thead>
              <tbody>
                {reviewDetail.criteria.map((c, idx) => (
                  <tr key={idx} className="border-b last:border-b-0">
                    <td className="px-3 py-2 whitespace-nowrap font-medium text-[#2563eb]">{c.label}</td>
                    {[5,4,3,2,1].map(val => (
                      <td key={val} className="px-3 py-2 text-center">
                        <input type="radio" checked={c.value === val} disabled className="accent-blue-600 w-4 h-4" />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <textarea
            value={reviewDetail.comment}
            disabled
            className="min-h-[60px] text-base mb-3 w-full rounded-lg border border-[#e5e7eb] p-3 resize-y bg-gray-100 text-gray-700"
          />
        </Card>
      <div className="text-center text-slate-500 text-sm mt-8">
        <div>Đánh giá chỉ dành cho đơn vị quản lý. Mọi thông tin sẽ được bảo mật.</div>
        <div className="mt-1 italic">Nếu có thắc mắc, vui lòng liên hệ bộ phận quản trị hệ thống.</div>
      </div>
      </div>
    </div>
  );
} 