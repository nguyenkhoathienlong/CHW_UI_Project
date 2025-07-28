import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, PlusCircle, Info } from "lucide-react";

export default function CollaboratorsOverview() {
  return (
    <div className="w-full px-2 md:px-4 mt-6">
      <Card className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl shadow bg-gradient-to-br from-blue-50 to-white border-0 relative">
        <div className="flex items-center gap-4">
          <Sparkles className="w-12 h-12 text-blue-400 drop-shadow" />
          <div>
            <div className="text-xl md:text-2xl font-bold text-blue-700 mb-1">
              Cộng tác viên - Cầu nối vì sức khỏe cộng đồng!
            </div>
            <div className="text-sm text-gray-600">
              Quản lý, đào tạo và phát triển mạng lưới cộng tác viên hiệu quả, đồng hành cùng sức khỏe toàn dân.
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 mt-4 md:mt-0">
          <Button className="flex items-center gap-2" size="sm" onClick={() => window.location.href='/collaborators/create'}>
            <PlusCircle className="w-4 h-4" /> Thêm cộng tác viên
          </Button>
          <Button variant="outline" className="flex items-center gap-2" size="sm">
            <Info className="w-4 h-4" /> Hướng dẫn sử dụng
          </Button>
          <div className="mt-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-1 text-xs text-blue-700 shadow-sm">
            <b>Mẹo:</b> Sử dụng bộ lọc, tìm kiếm hoặc các tab để quản lý cộng tác viên hiệu quả.
          </div>
        </div>
      </Card>
    </div>
  );
} 