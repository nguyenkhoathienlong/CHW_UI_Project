"use client";
import { useRouter, useParams } from "next/navigation";
import ContractDetailView, { ContractDetailData } from "@/components/contracts/ContractDetailView";
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';

// Nếu không import được contractListMock, copy lại mockData từ profile/page.tsx:
const contractListMock = [
  {
    id: 'HD-001',
    contractTitle: 'Hợp đồng cộng tác viên',
    form: 'Toàn thời gian',
    startDate: '01/06/2024',
    endDate: '31/12/2024',
    salary: '10.000.000',
    workLocation: 'Hà Nội',
    signDate: '01/06/2024',
    level: 'Cộng tác viên',
    status: 'Đang hiệu lực',
    code: 'PRJ-001',
    project: 'Chương trình tầm soát ung thư cổ tử cung',
    type: 'Chương trình y tế',
    duration: '01/06/2024 - 31/12/2024',
    logo: '/logo-cervical.png'
  },
  {
    id: 'HD-002',
    contractTitle: 'Hợp đồng thử việc',
    form: 'Bán thời gian',
    startDate: '01/01/2024',
    endDate: '30/03/2024',
    salary: '5.000.000',
    workLocation: 'TP.HCM',
    signDate: '01/01/2024',
    level: 'Thử việc',
    status: 'Hết hiệu lực',
    code: 'PRJ-002',
    project: 'Chương trình tiêm chủng mở rộng',
    type: 'Chương trình y tế',
    duration: '01/01/2024 - 30/03/2024',
    logo: '/logo-vaccine.png'
  }
];

export default function ContractDetailPage() {
  const { id, contractId } = useParams();
  const router = useRouter();
  // Lấy hợp đồng theo contractId
  const contract = contractListMock.find(c => c.id === contractId);

  if (!contract) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">Không tìm thấy hợp đồng</div>
    );
  }

  // Chuyển đổi dữ liệu sang shape cho ContractDetailView
  const data: ContractDetailData = {
    contractCode: contract.id,
    contractTitle: (contract as any).contractTitle || 'Hợp đồng cộng tác viên',
    contractType: contract.form,
    startDate: contract.startDate,
    endDate: contract.endDate,
    probationPeriod: "2", // hoặc lấy từ contract nếu có
    salary: contract.salary,
    workLocation: contract.workLocation,
    workSchedule: "8:00 - 17:00", // hoặc lấy từ contract nếu có
    benefits: "Bảo hiểm xã hội, thưởng lễ tết, nghỉ phép năm", // hoặc lấy từ contract nếu có
    responsibilities: "Thực hiện công việc theo phân công của quản lý. Báo cáo định kỳ về hoạt động", // hoặc lấy từ contract nếu có
    signDate: contract.signDate,
    level: contract.level,
    form: contract.form,
    status: contract.status,
    candidate: {
      name: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      phone: "0123456789",
      education: "Cử nhân"
    },
    application: {
      jobTitle: "Cộng tác viên y tế cộng đồng",
      company: "Bệnh viện Đa khoa Hà Nội",
      location: "Hà Nội",
      salary: "8.000.000 - 12.000.000",
      appliedDate: "20/12/2024",
      form: "Toàn thời gian",
      level: "Cộng tác viên"
    },
    projectInfo: (contract as any).projectInfo || {
      code: contract.code,
      name: contract.project,
      type: contract.type,
      duration: contract.duration,
      logo: contract.logo
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-4">
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
          <ContractDetailView
            data={data}
            onBack={() => router.push(`/collaborators/training/detail/${id}?tab=contract`)}
          />
        </div>
      </div>
    </div>
  );
} 