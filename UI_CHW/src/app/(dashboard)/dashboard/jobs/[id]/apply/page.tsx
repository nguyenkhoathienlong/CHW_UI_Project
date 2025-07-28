"use client";
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
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
  X
} from 'lucide-react';
import { jobs } from '@/constants/jobsData';

export default function JobApplyPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = Number(params.id);
  const job = jobs.find(j => j.id === jobId);
  if (!job) return <div className="text-center text-red-500 py-10">Không tìm thấy tin tuyển dụng</div>;

  const [selectedCV, setSelectedCV] = useState<File | null>(null);
  const [selectedCertificates, setSelectedCertificates] = useState<string[]>([]);
  const [coverLetter, setCoverLetter] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data - trong thực tế sẽ lấy từ API
  const availableCertificates = [
    {
      id: 'cert1',
      name: 'Chứng chỉ đào tạo cơ bản về y tế cộng đồng',
      date: '15/03/2024',
      status: 'Có hiệu lực',
      description: 'Chứng chỉ hoàn thành khóa đào tạo cơ bản về y tế cộng đồng'
    },
    {
      id: 'cert2',
      name: 'Chứng chỉ đào tạo nâng cao',
      date: '20/06/2024',
      status: 'Có hiệu lực',
      description: 'Chứng chỉ hoàn thành khóa đào tạo nâng cao về chăm sóc sức khỏe'
    },
    {
      id: 'cert3',
      name: 'Chứng chỉ sơ cấp cứu',
      date: '10/09/2024',
      status: 'Có hiệu lực',
      description: 'Chứng chỉ sơ cấp cứu cơ bản'
    },
    {
      id: 'cert4',
      name: 'Chứng chỉ kỹ năng giao tiếp',
      date: '05/11/2024',
      status: 'Có hiệu lực',
      description: 'Chứng chỉ kỹ năng giao tiếp và thuyết trình'
    }
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedCV(file);
    }
  };

  const handleCertificateToggle = (certId: string) => {
    setSelectedCertificates(prev => 
      prev.includes(certId) 
        ? prev.filter(id => id !== certId)
        : [...prev, certId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    // Redirect to applications page
    router.push('/dashboard/applications');
  };

  const removeFile = () => {
    setSelectedCV(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-4">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => router.back()}
          className="flex items-center gap-2 mb-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại
        </Button>
        <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-1">Ứng tuyển công việc</h1>
        <p className="text-gray-600 text-base">Hoàn thành thông tin ứng tuyển</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Job Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-blue-600" />
                  Thông tin công việc
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-blue-600" />
                    <span className="text-sm"><strong>Vị trí:</strong> {job.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-blue-600" />
                    <span className="text-sm"><strong>Công ty:</strong> {job.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    <span className="text-sm"><strong>Địa điểm:</strong> {job.locationProvince}, {job.locationWard}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-blue-600" />
                    <span className="text-sm"><strong>Mức lương:</strong> {job.salary}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span className="text-sm"><strong>Hình thức tuyển dụng:</strong> {job.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-blue-600" />
                    <span className="text-sm"><strong>Kinh nghiệm:</strong> {job.experience}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-blue-600" />
                    <span className="text-sm"><strong>Vị trí tuyển:</strong> {job.position}</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-blue-800">
                      <strong>Hạn nộp hồ sơ:</strong> {job.deadline}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CV Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-blue-600" />
                  Upload CV/Resume
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    {selectedCV ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-center gap-2">
                          <FileText className="h-8 w-8 text-blue-500" />
                          <div className="text-left">
                            <p className="font-medium text-gray-900">{selectedCV.name}</p>
                            <p className="text-sm text-gray-500">
                              {(selectedCV.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={removeFile}
                            className="ml-2"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload className="h-12 w-12 mx-auto text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">
                            Kéo thả file CV vào đây hoặc click để chọn file
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Hỗ trợ: PDF, DOC, DOCX (Tối đa 5MB)
                          </p>
                        </div>
                        <Input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="hidden"
                          id="cv-upload"
                        />
                        <label htmlFor="cv-upload">
                          <Button variant="outline" asChild>
                            <span>Chọn file</span>
                          </Button>
                        </label>
                      </div>
                    )}
                  </div>
                  
                  {!selectedCV && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-blue-800">
                          Vui lòng upload CV/Resume của bạn để hoàn tất đơn ứng tuyển
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Certificate Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  Chọn chứng chỉ phù hợp
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Chọn các chứng chỉ phù hợp với yêu cầu công việc để tăng cơ hội được tuyển chọn:
                  </p>
                  
                  <div className="space-y-3">
                    {availableCertificates.map((cert) => (
                      <div key={cert.id} className="flex items-start gap-3 p-4 border rounded-lg hover:bg-gray-50">
                        <Checkbox
                          id={cert.id}
                          checked={selectedCertificates.includes(cert.id)}
                          onChange={() => handleCertificateToggle(cert.id)}
                        />
                        <div className="flex-1">
                          <label htmlFor={cert.id} className="flex items-center gap-2 cursor-pointer">
                            <span className="font-medium text-gray-900">{cert.name}</span>
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {cert.status}
                            </span>
                          </label>
                          <p className="text-sm text-gray-600 mt-1">{cert.description}</p>
                          <p className="text-xs text-gray-500 mt-1">Ngày cấp: {cert.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedCertificates.length === 0 && (
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                        <span className="text-sm text-yellow-800">
                          Bạn chưa chọn chứng chỉ nào. Việc chọn chứng chỉ phù hợp sẽ tăng cơ hội được tuyển chọn.
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Cover Letter */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Thư xin việc (Tùy chọn)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Viết thư xin việc để giới thiệu bản thân và lý do bạn phù hợp với vị trí này:
                  </p>
                  <textarea
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    placeholder="Viết thư xin việc của bạn ở đây..."
                    className="w-full p-3 border border-gray-300 rounded-md resize-none"
                    rows={6}
                  />
                  <p className="text-xs text-gray-500">
                    Tối đa 1000 ký tự. Hiện tại: {coverLetter.length}/1000
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={!selectedCV || isSubmitting}
                className="min-w-[120px] bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Đang gửi...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Gửi đơn ứng tuyển
                  </div>
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Application Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Tóm tắt đơn ứng tuyển</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Thông tin công việc</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vị trí:</span>
                    <span className="font-medium">{job.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Công ty:</span>
                    <span className="font-medium">{job.company}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Địa điểm:</span>
                    <span className="font-medium">{job.locationProvince}, {job.locationWard}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mức lương:</span>
                    <span className="font-medium">{job.salary}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hình thức tuyển dụng:</span>
                    <span className="font-medium">{job.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Kinh nghiệm:</span>
                    <span className="font-medium">{job.experience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vị trí tuyển:</span>
                    <span className="font-medium">{job.position}</span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-2">Hồ sơ đính kèm</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">CV/Resume:</span>
                    <span className={selectedCV ? "text-green-600 font-medium" : "text-red-600"}>
                      {selectedCV ? "✓ Đã chọn" : "✗ Chưa chọn"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Chứng chỉ:</span>
                    <span className="font-medium">{selectedCertificates.length} chứng chỉ</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Thư xin việc:</span>
                    <span className={coverLetter ? "text-green-600 font-medium" : "text-gray-500"}>
                      {coverLetter ? "✓ Có" : "Tùy chọn"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Lưu ý quan trọng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>Đảm bảo CV của bạn cập nhật và phù hợp với vị trí ứng tuyển</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>Chọn các chứng chỉ phù hợp để tăng cơ hội được tuyển chọn</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>Viết thư xin việc ngắn gọn, súc tích và thể hiện động lực</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>Kiểm tra kỹ thông tin trước khi gửi đơn ứng tuyển</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Thông tin liên hệ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p className="text-gray-600">
                  Nếu bạn gặp vấn đề trong quá trình ứng tuyển, vui lòng liên hệ:
                </p>
                <div className="space-y-1">
                  <p><strong>Email:</strong> support@chw-portal.vn</p>
                  <p><strong>Hotline:</strong> 1900-1234</p>
                  <p><strong>Thời gian:</strong> 8:00 - 18:00 (T2-T6)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 