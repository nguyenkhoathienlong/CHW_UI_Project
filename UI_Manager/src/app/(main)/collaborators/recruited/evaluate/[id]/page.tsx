"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, BadgeCheck, Calendar, Info } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const project = {
  name: "Tầm soát ung thư cổ tử cung 2024",
  type: "Miễn phí cho người thụ hưởng",
  logo: "/public/project-logo.png",
  startDate: "01-05-2024",
  endDate: "31-12-2024",
  description: "Chương trình nâng cao sức khỏe cộng đồng, tập trung vào phòng chống dịch bệnh và nâng cao nhận thức y tế.",
  id: 1,
};

const collaborator = {
  id: 1,
  name: "Nguyễn Văn A",
  avatar: "Avatar",
  username: "nguyenvana",
  role: "Cộng tác viên",
  email: "nguyenvana@gmail.com",
  phone: "0912345678",
  status: "Đang tham gia",
};

const ratingCriteria = [
  "Chuyên môn",
  "Thái độ",
  "Kỹ năng giao tiếp",
  "Đóng góp",
  "Tính chủ động",
  "Kỹ năng làm việc nhóm",
  "Khả năng thích nghi",
  "Tuân thủ quy định",
  "Sáng tạo",
  "Khả năng giải quyết vấn đề",
];

const ratingOptions = [
  { value: 5, label: "Rất tốt" },
  { value: 4, label: "Tốt" },
  { value: 3, label: "Trung bình" },
  { value: 2, label: "Kém" },
  { value: 1, label: "Rất kém" },
];

type Ratings = { [criteria: string]: number };

export default function RecruitedCollaboratorDetail() {
  const router = useRouter();
  const [ratings, setRatings] = useState<Ratings>({});
  const [comment, setComment] = useState("");

  const handleRating = (criteria: string, value: number) => {
    setRatings(prev => ({ ...prev, [criteria]: value }));
  };

  const handleClear = () => {
    setRatings({});
    setComment("");
  };
  const isAnyRated = Object.values(ratings).some(v => !!v);
  return (
    <div className="max-w-[1500px] mx-auto p-5 bg-[#f4f6fb] min-h-screen rounded-2xl">
      {/* Header */}
      <div className="mb-2">
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
        <h1 className="font-bold text-3xl text-[#222] mb-1">Đánh giá quá trình hoạt động</h1>
        <div className="text-slate-500 text-base mb-4">
          Xem thông tin, đánh giá cộng tác viên đã được tuyển dụng vào chương trình/dự án của bạn.
        </div>
      </div>
      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
            <Button
              variant="outline"
              size="sm"
              className="mt-2 w-fit font-semibold text-xs px-3 py-1"
              onClick={() => router.push(`/collaborators/profile/${collaborator.id}`)}
            >
              Xem hồ sơ
            </Button>
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
            {/* <div className="text-slate-600 text-xs mt-1">{project.description}</div> */}
            <Button
              variant="outline"
              className="mt-2 w-fit font-semibold text-xs px-3 py-1"
              onClick={() => {/* chuyển sang trang chi tiết dự án */}}
            >
              Xem thông tin chương trình
            </Button>
          </div>
        </Card>
      </div>
      {/* Đánh giá */}
      <Card className="p-6 bg-white rounded-xl shadow-md w-full">
        <div className="flex items-center justify-between">
          <div className="font-bold text-[20px] text-[#222]">Đánh giá cộng tác viên</div>
          <Button type="button" variant="outline" className="font-semibold text-[12px] px-2 py-1" onClick={handleClear}>
            Loại bỏ tất cả đánh giá
          </Button>
        </div>
        <div className="text-slate-500 text-sm mb-4">Chỉ đơn vị quản lý mới có thể đánh giá. Đánh giá sẽ giúp nâng cao chất lượng cộng tác viên.</div>
        <form>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-sm text-sm mb-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-3 py-2 text-left font-semibold">Tiêu chí</th>
                  {ratingOptions.map(opt => (
                    <th key={opt.value} className="px-3 py-2 text-center font-semibold">{opt.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ratingCriteria.map((criteria, idx) => (
                  <tr key={criteria} className="border-b last:border-b-0">
                    <td className="px-3 py-2 whitespace-nowrap font-medium text-[#2563eb]">{criteria}</td>
                    {ratingOptions.map(opt => (
                      <td key={opt.value} className="px-3 py-2 text-center">
                        <input
                          type="radio"
                          name={criteria}
                          value={opt.value}
                          checked={ratings[criteria] === opt.value}
                          onChange={() => handleRating(criteria, opt.value)}
                          className="accent-blue-600 w-4 h-4"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-1">
            <textarea
              placeholder="Nhận xét thêm về cộng tác viên..."
              value={comment}
              onChange={e => {
                if (e.target.value.length <= 500) setComment(e.target.value);
              }}
              maxLength={500}
              className="min-h-[60px] text-base text-[12px] mb-1 w-full rounded-sm border border-[#e5e7eb] p-3 resize-y focus:outline-none"
            />
            <div className="text-right text-xs text-slate-400 mb-2">{comment.length}/500 ký tự</div>
            <div className="flex justify-end">
               <Button variant="default" className="font-semibold w-30" disabled={!isAnyRated}>Lưu đánh giá</Button>
            </div>
          </div>
        </form>
      </Card>
      {/* Footer */}
      <div className="text-center text-slate-500 text-sm mt-8">
        <div>Đánh giá chỉ dành cho đơn vị quản lý. Mọi thông tin sẽ được bảo mật.</div>
        <div className="mt-1 italic">Nếu có thắc mắc, vui lòng liên hệ bộ phận quản trị hệ thống.</div>
      </div>
    </div>
  );
} 