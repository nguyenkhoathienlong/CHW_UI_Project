"use client";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { createPortal } from 'react-dom';
import { Input } from "@/components/ui/input";
import { Card } from '@/components/ui/card';
import { 
  User, 
  GraduationCap, 
  ArrowLeft, 
  CheckCircle, 
  XCircle, 
  AlertCircle
} from 'lucide-react';
import CertificateModal from '@/components/collaborators/CertificateModal';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock data cho tất cả ứng viên pending
const pendingCandidates = [
  {
    id: "CTV1",
    name: "Tran Van A",
    cccd: "12312312312312",
    phone: "0967291123",
    email: "a@gmail.com",
    status: "Chờ tuyển chọn",
    province: "Thành phố Hồ Chí Minh",
    ward: "Phường 1",
    residenceTime: "3",
    birthDate: "01/01/2000",
    gender: "Nam",
    education: "Đại học",
    source: "Từ tin tuyển dụng",
  },
  {
    id: "CTV2",
    name: "Tran Van B",
    cccd: "12312312312312",
    phone: "0967291124",
    email: "b@gmail.com",
    status: "Chờ tuyển chọn",
    province: "Thành phố Hồ Chí Minh",
    ward: "Phường 2",
    residenceTime: "5",
    birthDate: "15/03/1995",
    gender: "Nữ",
    education: "Cao đẳng",
    source: "Tự nguyện đăng ký",
  },
  {
    id: "CTV3",
    name: "Tran Van C",
    cccd: "12312312312312",
    phone: "0967291125",
    email: "c@gmail.com",
    status: "Chờ tuyển chọn",
    province: "Thành phố Hồ Chí Minh",
    ward: "Phường 3",
    residenceTime: "2",
    birthDate: "20/07/1998",
    gender: "Nam",
    education: "Đại học",
    source: "Đơn vị đăng ký",
  },
];

function renderSourceBadge(source: string) {
  if (source === 'Từ tin tuyển dụng') {
    return <span style={{ background: '#dbeafe', color: '#2563eb', fontWeight: 700, borderRadius: 16, padding: '4px 10px', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, marginLeft: 8 }}><span role="img" aria-label="tin">📢</span> {source}</span>;
  }
  if (source === 'Tự nguyện đăng ký') {
    return <span style={{ background: '#d1fae5', color: '#059669', fontWeight: 700, borderRadius: 16, padding: '4px 10px', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, marginLeft: 8 }}><span role="img" aria-label="volunteer">🙋‍♂️</span> {source}</span>;
  }
  if (source === 'Đơn vị đăng ký') {
    return <span style={{ background: '#fef9c3', color: '#b45309', fontWeight: 700, borderRadius: 16, padding: '4px 10px', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, marginLeft: 8 }}><span role="img" aria-label="org">🏢</span> {source}</span>;
  }
  return <span style={{ marginLeft: 8 }}>{source}</span>;
}

// Thêm hàm getStatusColor dùng chung cho badge trạng thái
const getStatusColor = (status: string) => {
  switch (status) {
    case 'Đã tuyển chọn':
      return 'bg-green-100 text-green-800';
    case 'Chờ tuyển chọn':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export default function PendingDetailPage() {
  const { id } = useParams();
  const [tab, setTab] = useState('info');
  const router = useRouter();
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  type ManagerAssessmentKey = 'practicalTraining' | 'communityReputation';

  const [managerAssessment, setManagerAssessment] = useState<Record<ManagerAssessmentKey, boolean>>({
    practicalTraining: false,
    communityReputation: false,
  });
  const [isApproving, setIsApproving] = useState(false);
  const [isAssessmentSaved, setIsAssessmentSaved] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  // Tìm ứng viên dựa trên ID từ URL
  const candidateInfo = pendingCandidates.find(candidate => candidate.id === id) || pendingCandidates[0];

  const tabs = [
    { id: 'info', name: 'Thông tin cá nhân', icon: User },
    { id: 'training', name: 'Đào tạo', icon: GraduationCap },
  ];

  const inputCriteria = [
    { label: 'Tự nguyện đăng ký tham gia mạng lưới cộng tác viên địa phương', self: true },
    { label: 'Có sức khỏe', self: true },
    { label: 'Có hiểu biết về cộng đồng mình đăng ký làm cộng tác viên và có điều kiện để gắn bó và phục vụ cho cộng đồng.', self: true },
    { label: 'Có uy tín trong cộng đồng', self: false },
  ];

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      {/* Thông tin cá nhân */}
      <div>
        <div className="mb-2 mt-4">
          <h3 className="text-lg font-semibold text-blue-700">Thông tin cá nhân</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mã CTV</label>
            <Input value={candidateInfo.id} disabled className="bg-gray-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Số CC/CCCD</label>
            <Input value={candidateInfo.cccd} disabled className="bg-gray-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
            <Input value={candidateInfo.name} disabled className="bg-gray-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Trình độ học vấn</label>
            <Input value={candidateInfo.education} disabled className="bg-gray-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ngày sinh</label>
            <Input value={candidateInfo.birthDate} disabled className="bg-gray-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Giới tính</label>
            <Input value={candidateInfo.gender} disabled className="bg-gray-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
            <Input value={candidateInfo.phone} disabled className="bg-gray-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <Input value={candidateInfo.email} disabled className="bg-gray-50" />
          </div>
        </div>
      </div>
      {/* Nơi cư trú */}
      <div>
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-blue-700">Nơi cư trú</h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Thành phố/Tỉnh</label>
            <Input value={candidateInfo.province} disabled className="bg-gray-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phường/Xã</label>
            <Input value={candidateInfo.ward} disabled className="bg-gray-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Thời gian cư trú (Năm)</label>
            <Input value={candidateInfo.residenceTime} disabled className="bg-gray-50" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderTrainingInfo = () => (
    <div className="space-y-6 mt-4">
      <Card>
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-base font-semibold">1. Tiêu chí tuyển chọn</h3>
          <div className="text-xs font-normal text-gray-500 mt-1">Ứng viên tự đánh giá</div>
        </div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Box 1: Ứng viên tự đánh giá */}
            <div className="flex-1">
              <ul className="space-y-3">
                {inputCriteria.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    {item.self
                      ? <CheckCircle className="h-4 w-4 text-green-600" />
                      : <XCircle className="h-4 w-4 text-red-500" />}
                    <span className="text-sm">{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Card>
        <div className="flex gap-3 mt-4 justify-end">
          <Button variant="default" onClick={() => setShowApproveModal(true)}>Tuyển chọn</Button>
          <Button variant="destructive" onClick={() => setShowRejectModal(true)}>Từ chối</Button>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-4 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Hồ sơ cộng tác viên đăng ký</h1>
              <p className="text-gray-600 mt-1">Xem thông tin chi tiết cộng tác viên đăng ký</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(candidateInfo.status)}`}>{candidateInfo.status}</span>
              {/* Tag nguồn tuyển */}
              {renderSourceBadge(candidateInfo.source)}
            </div>
          </div>
        </div>
        {/* Tabs dọc + Nội dung giữ style cũ */}
        <div className="flex gap-6 min-h-[500px] w-full">
          {/* Tabs dọc */}
          <nav className="flex flex-col w-50 min-w-[180px] bg-transparent">
            {tabs.map((tabItem) => (
              <button
                key={tabItem.id}
                onClick={() => setTab(tabItem.id)}
                className={`flex items-center gap-2 px-3 py-3 border-l-2 font-medium text-sm transition-all
                  ${tab === tabItem.id
                    ? 'border-blue-500 text-blue-600 bg-white rounded-tr-[5px] rounded-br-[5px]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'}
                `}
              >
                <tabItem.icon className="h-4 w-4" />
                {tabItem.name}
              </button>
            ))}
          </nav>
          {/* Nội dung tab */}
          <div className="flex-1 w-full max-w-full p-0">
            {tab === 'info' && renderPersonalInfo()}
            {tab === 'training' && renderTrainingInfo()}
          </div>
        </div>
      </div>
      {/* Certificate Modal */}
      {showCertificateModal && (
        <CertificateModal
          open={showCertificateModal}
          onClose={() => setShowCertificateModal(false)}
          onSubmit={(data) => {
            console.log('Certificate data:', data);
            setShowCertificateModal(false);
          }}
        />
      )}
      {showApproveModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded border shadow max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Xác nhận tuyển chọn</h3>
            <p>Bạn có chắc chắn muốn tuyển chọn cộng tác viên này không?</p>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setShowApproveModal(false)}>Không</Button>
              <Button variant="default" onClick={() => {
                setShowApproveModal(false);
                router.push(`/collaborators/approved/detail/${candidateInfo.id}?tab=account`);
              }}>Có</Button>
            </div>
          </div>
        </div>
      )}
      {showRejectModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded border shadow max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Xác nhận từ chối</h3>
            <p>Bạn có chắc chắn muốn từ chối cộng tác viên này không?</p>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setShowRejectModal(false)}>Không</Button>
              <Button variant="destructive" onClick={() => { setShowRejectModal(false); }}>Có</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 