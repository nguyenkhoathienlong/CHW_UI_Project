"use client";
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const TRAINING_UNITS = [
  'Trường Đại học Y Hà Nội',
  'Trường Đại học Y Dược TP.HCM',
  'Bệnh viện Bạch Mai',
  'Bệnh viện Chợ Rẫy',
];
const CERT_TYPES = [
  'Chứng chỉ hành nghề Y',
  'Chứng chỉ tiêm chủng',
  'Chứng chỉ xét nghiệm',
  'Chứng chỉ cấp cứu',
];
const TRAINING_METHODS = [
  'Trực tiếp',
  'Trực tuyến',
  'Kết hợp',
];

interface CertificateModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    unit: string;
    method: string;
    certType: string;
    dateFrom: string;
    dateTo: string;
    duration: string;
    file: File | null;
  }) => void;
}

const CertificateModal: React.FC<CertificateModalProps> = ({ open, onClose, onSubmit }) => {
  const [unit, setUnit] = useState('');
  const [method, setMethod] = useState('');
  const [certType, setCertType] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [duration, setDuration] = useState('');
  const [file, setFile] = useState<File | null>(null);

  if (!open) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.18)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 12, width: 480, maxWidth: '95vw', boxShadow: '0 4px 32px #0002', padding: 24, position: 'relative' }}>
        <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 16, color: '#222' }}>Thêm chứng chỉ</div>
        <div style={{ height: 1, background: '#e5e7eb', marginBottom: 16 }} />
        <form onSubmit={e => { e.preventDefault(); onSubmit({ unit, method, certType, dateFrom, dateTo, duration, file }); }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 600, color: '#222', marginBottom: 6, display: 'block', fontSize: 14 }}>Đơn vị đào tạo</label>
            <select value={unit} onChange={e => setUnit(e.target.value)} style={{ width: '100%', height: 40, borderRadius: 5, border: '1px solid #e5e7eb', padding: '0 12px', color: '#222', fontSize: 14, background: '#fff', outline: 'none', marginBottom: 0, transition: 'border 0.2s' }}
              onFocus={e => e.target.style.border = '1.5px solid #2563eb'}
              onBlur={e => e.target.style.border = '1px solid #e5e7eb'}
            >
              <option value="">Chọn đơn vị đào tạo</option>
              {TRAINING_UNITS.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 600, color: '#222', marginBottom: 6, display: 'block', fontSize: 14 }}>Phương thức đào tạo</label>
            <select value={method} onChange={e => setMethod(e.target.value)} style={{ width: '100%', height: 40, borderRadius: 5, border: '1px solid #e5e7eb', padding: '0 12px', color: '#222', fontSize: 14, background: '#fff', outline: 'none', marginBottom: 0, transition: 'border 0.2s' }}
              onFocus={e => e.target.style.border = '1.5px solid #2563eb'}
              onBlur={e => e.target.style.border = '1px solid #e5e7eb'}
            >
              <option value="">Chọn phương thức đào tạo</option>
              {TRAINING_METHODS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 600, color: '#222', marginBottom: 6, display: 'block', fontSize: 14 }}>Loại chứng chỉ</label>
            <select value={certType} onChange={e => setCertType(e.target.value)} style={{ width: '100%', height: 40, borderRadius: 5, border: '1px solid #e5e7eb', padding: '0 12px', color: '#222', fontSize: 14, background: '#fff', outline: 'none', marginBottom: 0, transition: 'border 0.2s' }}
              onFocus={e => e.target.style.border = '1.5px solid #2563eb'}
              onBlur={e => e.target.style.border = '1px solid #e5e7eb'}
            >
              <option value="">Chọn loại chứng chỉ</option>
              {CERT_TYPES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 16, display: 'flex', alignItems: 'end', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontWeight: 600, color: '#222', marginBottom: 6, display: 'block', fontSize: 14 }}>Từ ngày</label>
              <Input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} placeholder="Từ ngày" style={{ background: '#fff', color: '#222', fontSize: 14, height: 40 }} />
            </div>
            <div style={{ fontSize: 18, color: '#64748b', marginBottom: 8, marginLeft: 2, marginRight: 2 }}>-</div>
            <div style={{ flex: 1 }}>
              <label style={{ fontWeight: 600, color: '#222', marginBottom: 6, display: 'block', fontSize: 14 }}>Đến ngày</label>
              <Input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} placeholder="Đến ngày" style={{ background: '#fff', color: '#222', fontSize: 14, height: 40 }} />
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 600, color: '#222', marginBottom: 6, display: 'block', fontSize: 14 }}>Thời lượng đào tạo (ngày)</label>
            <Input type="number" min="1" value={duration} onChange={e => setDuration(e.target.value)} placeholder="Nhập số ngày" style={{ background: '#fff', color: '#222', fontSize: 14, height: 40 }} />
          </div>
          <div style={{ marginBottom: 20, border: '1px dashed #e5e7eb', borderRadius: 8, padding: 16, background: '#fafbfc' }}>
            <div style={{ fontWeight: 600, color: '#64748b', marginBottom: 6, fontSize: 14 }}>Tải chứng chỉ lên</div>
            <label htmlFor="file-upload" style={{ color: '#2563eb', fontWeight: 600, cursor: 'pointer', display: 'block', marginBottom: 4, fontSize: 14 }}>
              Nhấn để tải lên từ thiết bị
            </label>
            <input id="file-upload" type="file" accept=".pdf,.jpg,.png,.jpeg" style={{ display: 'none' }} onChange={e => setFile(e.target.files?.[0] || null)} />
            <div style={{ color: '#64748b', fontSize: 13 }}>hoặc kéo và thả vào đây</div>
            <div style={{ color: '#64748b', fontSize: 12, marginTop: 2 }}>Chỉ chấp nhận 1 tệp (PDF, ảnh) — tối đa 25MB</div>
            {file && <div style={{ color: '#2563eb', fontSize: 13, marginTop: 6 }}>Đã chọn: {file.name}</div>}
          </div>
          <Button type="submit" style={{ width: '100%', height: 40, fontWeight: 700, fontSize: 14, marginTop: 8 }}>Thêm mới</Button>
        </form>
        <button onClick={onClose} style={{ position: 'absolute', top: 18, right: 18, background: 'none', border: 'none', fontSize: 20, color: '#222', cursor: 'pointer' }}>&times;</button>
      </div>
    </div>
  );
};

export default CertificateModal; 