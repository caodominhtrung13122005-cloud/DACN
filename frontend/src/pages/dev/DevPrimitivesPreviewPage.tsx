import { useState } from 'react'
import {
  AgreementStatusBadge,
  Alert,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Drawer,
  EmptyState,
  Input,
  ListingStatusBadge,
  Modal,
  Pagination,
  ProposalStatusBadge,
  QuantityStatus,
  Select,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  useToast,
} from '../../components/ui'
import type {
  AgreementStatus,
  ListingStatus,
  ProposalStatus,
} from '../../types/status'

export function DevPrimitivesPreviewPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('listings')
  const [currentPage, setCurrentPage] = useState(2)
  const toast = useToast()

  const listingStatuses: ListingStatus[] = [
    'AVAILABLE',
    'PARTIALLY_COMMITTED',
    'FULLY_COMMITTED',
    'CLOSED',
    'CANCELLED',
  ]

  const proposalStatuses: ProposalStatus[] = [
    'PENDING',
    'ACCEPTED',
    'REJECTED',
    'WITHDRAWN',
    'EXPIRED',
  ]

  const agreementStatuses: AgreementStatus[] = [
    'PENDING_CONFIRMATION',
    'CONFIRMED',
    'CANCELLED',
  ]

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-12">
      <div className="p-4 border border-amber-300 bg-amber-50 rounded-lg text-amber-900 font-semibold text-sm">
        ⚠️ DEV PREVIEW ONLY — Trang kiểm thử nội bộ cho UI Primitives (10B.1), Container & Feedback (10B.2), Data Display & Navigation (10B.3). Không thuộc luồng sản phẩm chính thức.
      </div>

      {/* 1. Buttons */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold border-b pb-2">1. Button Variants & Sizes</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary" size="sm">Primary Sm</Button>
          <Button variant="primary" size="md">Primary Md</Button>
          <Button variant="primary" size="lg">Primary Lg</Button>
          <Button variant="secondary" size="md">Secondary</Button>
          <Button variant="ghost" size="md">Ghost</Button>
          <Button variant="destructive" size="md">Destructive</Button>
          <Button variant="primary" size="md" loading loadingText="Đang xử lý...">Submit</Button>
          <Button variant="primary" size="md" disabled>Disabled</Button>
        </div>
      </section>

      {/* 2. Inputs */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold border-b pb-2">2. Input</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Tên người dùng" required placeholder="vd: Nguyễn Văn A" helperText="Nhập họ và tên đầy đủ" />
          <Input label="Số điện thoại" required placeholder="0901234567" error="Số điện thoại không hợp lệ" />
          <Input label="Tài khoản bị khóa" disabled placeholder="Không thể chỉnh sửa" />
        </div>
      </section>

      {/* 3. Textarea */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold border-b pb-2">3. Textarea</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Textarea label="Ghi chú canh tác" placeholder="Nhập chi tiết chăm sóc..." helperText="Tối đa 500 ký tự" />
          <Textarea label="Lý do từ chối" required error="Vui lòng nêu rõ lý do hủy hoặc từ chối" />
        </div>
      </section>

      {/* 4. Select */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold border-b pb-2">4. Select</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select label="Tỉnh / Thành phố" required placeholder="-- Chọn tỉnh / thành --">
            <option value="AG">An Giang</option>
            <option value="DT">Đồng Tháp</option>
            <option value="CT">Cần Thơ</option>
          </Select>
          <Select label="Đơn vị tính" error="Vui lòng chọn đơn vị chuẩn">
            <option value="tan">Tấn</option>
            <option value="kg">Kilogram</option>
          </Select>
        </div>
      </section>

      {/* 5. Badge */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold border-b pb-2">5. Badge (Semantic)</h2>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="neutral">Trung tính</Badge>
          <Badge variant="success">Thành công</Badge>
          <Badge variant="warning">Cảnh báo / Giữ chỗ</Badge>
          <Badge variant="error">Lỗi / Hủy bỏ</Badge>
          <Badge variant="info">Thông tin</Badge>
          <Badge variant="success" size="sm">Nhỏ (sm)</Badge>
        </div>
      </section>

      {/* 6. Alert */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold border-b pb-2">6. Alert</h2>
        <div className="space-y-3">
          <Alert variant="info" title="Lưu ý mùa vụ">
            Khuyến nghị công bố nguồn cung trước ngày thu hoạch dự kiến từ 15 đến 30 ngày.
          </Alert>
          <Alert variant="success" title="Xác nhận thành công">
            Thỏa thuận thu mua đã được hai bên ghi nhận trên hệ thống.
          </Alert>
          <Alert variant="warning" title="Tạm hết sản lượng khả dụng">
            Toàn bộ sản lượng hiện đang được giữ chỗ trong các thỏa thuận chờ xác nhận.
          </Alert>
          <Alert variant="error" title="Thỏa thuận đã hủy">
            Thỏa thuận này đã bị hủy bởi nhà vườn với lý do: Hết mùa vụ đột xuất.
          </Alert>
        </div>
      </section>

      {/* 7. Card */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold border-b pb-2">7. Card Container</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Khối Thông Tin Canh Tác</CardTitle>
              <CardDescription>Bố cục thẻ viền sắc nét, bề mặt trắng trên nền kem.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Nội dung thẻ sử dụng khoảng cách chuẩn restrained, không bóng mờ dày đặc hay hiệu ứng kính mờ (glassmorphism).
              </p>
            </CardContent>
            <CardFooter>
              <span className="text-xs text-[var(--color-text-muted)]">Cập nhật 2 giờ trước</span>
              <Button variant="ghost" size="sm">Chi tiết →</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardContent className="space-y-3">
              <h4 className="font-semibold text-[var(--color-text-primary)]">Thẻ Đơn Giản (Chỉ Content)</h4>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Có thể sử dụng Card trực tiếp mà không bắt buộc phải có Header hoặc Footer nếu không cần phân đoạn.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 8. Modal & Drawer */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold border-b pb-2">8. Modal & Drawer Dialogs</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            Mở Modal Xác Nhận
          </Button>
          <Button variant="secondary" onClick={() => setIsDrawerOpen(true)}>
            Mở Side Drawer
          </Button>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Xác nhận thao tác"
          description="Hộp thoại chuẩn ngữ nghĩa accessibility, hỗ trợ phím ESC và bắt nét tiêu điểm."
          footer={
            <>
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                Hủy bỏ
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  toast.success('Thao tác đã được xác nhận thành công')
                  setIsModalOpen(false)
                }}
              >
                Xác nhận
              </Button>
            </>
          }
        >
          <div className="space-y-3 text-sm text-[var(--color-text-secondary)]">
            <p>Đây là nội dung thân hộp thoại. Nền trang bên dưới đã bị khóa cuộn để tránh tương tác ngoài ý muốn.</p>
            <Input label="Lý do xác nhận" placeholder="Nhập ghi chú tùy chọn..." />
          </div>
        </Modal>

        <Drawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          title="Ngăn trượt cạnh bên (Drawer)"
          description="Hỗ trợ trượt từ bên phải màn hình, phù hợp cho bộ lọc hoặc form phụ."
          footer={
            <Button variant="secondary" onClick={() => setIsDrawerOpen(false)}>
              Đóng ngăn trượt
            </Button>
          }
        >
          <div className="space-y-4 text-sm text-[var(--color-text-secondary)]">
            <p>Nội dung trong ngăn trượt có thanh cuộn độc lập khi tràn chiều dài.</p>
            <Input label="Từ khóa lọc" placeholder="Nhập từ khóa..." />
            <Select label="Trạng thái">
              <option value="all">Tất cả</option>
              <option value="active">Đang mở</option>
            </Select>
          </div>
        </Drawer>
      </section>

      {/* 9. Toast Notifications */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold border-b pb-2">9. Toast Notifications</h2>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="secondary"
            onClick={() => toast.success('Đã gửi đề nghị thu mua thành công!', 'Thành công')}
          >
            Toast Success
          </Button>
          <Button
            variant="secondary"
            onClick={() => toast.info('Có 2 nguồn cung mới tại Đồng Tháp.', 'Thông tin')}
          >
            Toast Info
          </Button>
          <Button
            variant="secondary"
            onClick={() => toast.warning('Sản lượng sắp hết khả dụng.', 'Cảnh báo')}
          >
            Toast Warning
          </Button>
          <Button
            variant="secondary"
            onClick={() => toast.error('Không thể kết nối đến máy chủ.', 'Lỗi hệ thống')}
          >
            Toast Error
          </Button>
        </div>
      </section>

      {/* 10. Skeleton */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold border-b pb-2">10. Skeleton Loading</h2>
        <div className="p-4 border rounded-[var(--radius-md,8px)] bg-white space-y-4 max-w-md">
          <div className="flex items-center gap-3">
            <Skeleton variant="circular" width={44} height={44} />
            <div className="flex-1 space-y-2">
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="40%" />
            </div>
          </div>
          <Skeleton variant="rectangular" height={100} />
          <div className="space-y-2">
            <Skeleton variant="text" />
            <Skeleton variant="text" width="80%" />
          </div>
        </div>
      </section>

      {/* 11. Empty State */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold border-b pb-2">11. Empty State</h2>
        <EmptyState
          title="Chưa có đề nghị thu mua nào"
          description="Hiện tại danh sách đề nghị của bạn đang trống. Các đề nghị gửi đến sẽ xuất hiện tại đây."
          action={<Button variant="primary" size="sm">Khám phá nguồn cung</Button>}
        />
      </section>

      {/* 12. Table (10B.3) */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold border-b pb-2">12. Table (Desktop-oriented)</h2>
        <p className="text-xs text-[var(--color-text-muted)] italic">
          *Lưu ý Responsive: Bảng dữ liệu tối ưu trên Desktop. Trên Mobile sẽ tự động thích ứng dạng thẻ xếp chồng (Stacked Cards).
        </p>
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã / Nông sản</TableHead>
                <TableHead>Vùng trồng</TableHead>
                <TableHead>Sản lượng</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold">Xoài Cát Hòa Lộc</TableCell>
                <TableCell>Vườn Cái Bè, Tiền Giang</TableCell>
                <TableCell>5.0 tấn</TableCell>
                <TableCell>
                  <ListingStatusBadge status="AVAILABLE" size="sm" />
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">Xem</Button>
                </TableCell>
              </TableRow>
              <TableRow selected>
                <TableCell className="font-semibold">Sầu riêng Ri6 (Đang chọn)</TableCell>
                <TableCell>Chợ Lách, Bến Tre</TableCell>
                <TableCell>12.0 tấn</TableCell>
                <TableCell>
                  <ListingStatusBadge status="PARTIALLY_COMMITTED" size="sm" />
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">Xem</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Bưởi Da Xanh</TableCell>
                <TableCell>Mỏ Cày Bắc, Bến Tre</TableCell>
                <TableCell>3.5 tấn</TableCell>
                <TableCell>
                  <ListingStatusBadge status="CLOSED" size="sm" />
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">Xem</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </section>

      {/* 13. Tabs (10B.3) */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold border-b pb-2">13. Tabs (Accessible & Keyboard-Navigable)</h2>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="listings" badge={<Badge variant="neutral" size="sm">12</Badge>}>
              Nguồn cung thu hoạch
            </TabsTrigger>
            <TabsTrigger value="proposals" badge={<Badge variant="warning" size="sm">3</Badge>}>
              Đề nghị thu mua
            </TabsTrigger>
            <TabsTrigger value="agreements" badge={<Badge variant="success" size="sm">5</Badge>}>
              Thỏa thuận hai bên
            </TabsTrigger>
            <TabsTrigger value="archived" disabled>
              Lưu trữ (Vô hiệu hóa)
            </TabsTrigger>
          </TabsList>
          <TabsContent value="listings">
            <div className="p-4 bg-white border border-[var(--color-border-subtle)] rounded-b-[var(--radius-md,8px)] text-sm">
              Nội dung Tab Nguồn cung thu hoạch: Hỗ trợ phím mũi tên Trái/Phải để chuyển tab theo chuẩn WAI-ARIA.
            </div>
          </TabsContent>
          <TabsContent value="proposals">
            <div className="p-4 bg-white border border-[var(--color-border-subtle)] rounded-b-[var(--radius-md,8px)] text-sm">
              Nội dung Tab Đề nghị thu mua: 3 đề nghị đang chờ phản hồi từ nhà vườn.
            </div>
          </TabsContent>
          <TabsContent value="agreements">
            <div className="p-4 bg-white border border-[var(--color-border-subtle)] rounded-b-[var(--radius-md,8px)] text-sm">
              Nội dung Tab Thỏa thuận: 5 thỏa thuận đã xác nhận cam kết hai bên trên hệ thống.
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* 14. Pagination (10B.3) */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold border-b pb-2">14. Pagination</h2>
        <div className="p-4 bg-white border border-[var(--color-border-default)] rounded-[var(--radius-md,8px)]">
          <Pagination
            currentPage={currentPage}
            totalPages={6}
            onPageChange={setCurrentPage}
          />
        </div>
      </section>

      {/* 15. StatusBadge Mapping Layer (10B.3) */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold border-b pb-2">15. StatusBadge Mapping Layer</h2>
        
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-[var(--color-text-secondary)]">Harvest Listing Statuses:</h4>
          <div className="flex flex-wrap gap-2">
            {listingStatuses.map((st) => (
              <ListingStatusBadge key={st} status={st} />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-[var(--color-text-secondary)]">Purchase Proposal Statuses:</h4>
          <div className="flex flex-wrap gap-2">
            {proposalStatuses.map((st) => (
              <ProposalStatusBadge key={st} status={st} />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-[var(--color-text-secondary)]">Procurement Agreement Statuses:</h4>
          <div className="flex flex-wrap gap-2">
            {agreementStatuses.map((st) => (
              <AgreementStatusBadge key={st} status={st} />
            ))}
          </div>
        </div>
      </section>

      {/* 16. QuantityStatus Presenter (10B.3) */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold border-b pb-2">16. QuantityStatus Presenter</h2>
        
        <div className="space-y-3 p-4 bg-white border border-[var(--color-border-default)] rounded-[var(--radius-md,8px)]">
          <QuantityStatus
            state="available"
            remainingText="Còn lại: 10 tấn (100%)"
            totalText="Tổng dự kiến: 10 tấn"
          />
          <QuantityStatus
            state="partially_committed"
            remainingText="Còn lại: 4 tấn (40%)"
            totalText="Đã cam kết: 6 tấn / 10 tấn"
          />
          <QuantityStatus
            state="temporarily_unavailable"
            remainingText="Còn lại: 0 tấn (Tạm giữ 100%)"
            totalText="Tổng dự kiến: 10 tấn"
          />
          <QuantityStatus
            state="fully_committed"
            remainingText="Còn lại: 0 tấn (Đã chốt 100%)"
            totalText="Tổng: 10 tấn"
          />
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-[var(--color-text-secondary)]">Dạng thu gọn trên Mobile:</h4>
          <div className="flex flex-col gap-2 p-4 bg-white border border-[var(--color-border-default)] rounded-[var(--radius-md,8px)]">
            <QuantityStatus state="available" remainingText="Còn lại: 10 tấn (100%)" compact />
            <QuantityStatus state="partially_committed" remainingText="Còn lại: 4 tấn (40%)" compact />
            <QuantityStatus state="temporarily_unavailable" remainingText="Tạm hết sản lượng" compact />
            <QuantityStatus state="fully_committed" remainingText="Đã chốt toàn bộ" compact />
          </div>
        </div>
      </section>
    </div>
  )
}

export default DevPrimitivesPreviewPage
