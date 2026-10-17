import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Mail,
  Sprout,
  Truck,
  User,
} from 'lucide-react'
import { Alert, Button, Card, CardContent, Input, Select } from '../../components/ui'
import { useAuth } from '../../features/auth'
import axios from 'axios'
import type { FarmerAccountType, UserRole } from '../../types/auth'

export function RegisterPage() {
  const navigate = useNavigate()
  const { register } = useAuth()

  // Step state: 1 (Role Selection), 2 (Account Details)
  const [step, setStep] = useState<1 | 2>(1)

  // Step 1 State
  const [selectedRole, setSelectedRole] = useState<UserRole>('FARMER')
  const [farmerType, setFarmerType] = useState<FarmerAccountType>('INDIVIDUAL')
  const [buyerProfileType, setBuyerProfileType] = useState('TRADER')

  // Step 2 State
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [province, setProvince] = useState('DT')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleStep1Submit = (e: FormEvent) => {
    e.preventDefault()
    setStep(2)
  }

  const handleStep2Submit = async (e: FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    const cleanFullName = fullName.trim()
    const cleanPhone = phone.trim()
    const cleanEmail = email.trim()

    if (!cleanFullName || !cleanPhone || !password.trim()) {
      setErrorMessage('Vui lòng điền đầy đủ các trường thông tin bắt buộc (*).')
      return
    }

    // Vietnamese phone validation
    const phoneRegex = /^0[35789][0-9]{8}$/
    if (!phoneRegex.test(cleanPhone)) {
      setErrorMessage('Số điện thoại không đúng định dạng di động Việt Nam (10 chữ số, bắt đầu bằng 03, 05, 07, 08, 09).')
      return
    }

    if (password.length < 8) {
      setErrorMessage('Mật khẩu cần tối thiểu 8 ký tự.')
      return
    }

    if (password !== confirmPassword) {
      setErrorMessage('Mật khẩu xác nhận không khớp.')
      return
    }

    if (!agreeTerms) {
      setErrorMessage('Vui lòng đồng ý với Điều khoản dịch vụ để hoàn tất đăng ký.')
      return
    }

    setLoading(true)
    try {
      const user = await register({
        phone: cleanPhone,
        password,
        full_name: cleanFullName,
        role: selectedRole === 'FARMER' ? 'FARMER' : 'BUYER',
        account_type: selectedRole === 'FARMER' ? farmerType : null,
        email: cleanEmail || null,
      })

      // Redirect to respective dashboard upon successful registration
      if (user.role === 'FARMER') {
        navigate('/farmer', { replace: true })
      } else {
        navigate('/buyer', { replace: true })
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 422) {
          const errors = err.response.data?.errors
          if (errors) {
            const firstError = Object.values(errors).flat()[0] as string
            setErrorMessage(firstError || 'Thông tin đăng ký không hợp lệ.')
          } else {
            setErrorMessage(err.response.data?.message || 'Thông tin đăng ký không hợp lệ.')
          }
        } else {
          setErrorMessage(err.response?.data?.message || 'Đăng ký không thành công. Vui lòng thử lại.')
        }
      } else {
        setErrorMessage('Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại kết nối mạng.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-8">
      {/* Progress Stepper */}
      <div className="space-y-4">
        <div className="text-center space-y-1.5">
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[var(--color-text-primary)]">
            Đăng ký tài khoản MEKAGREEN
          </h1>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Nền tảng số kết nối nguồn cung nông sản Nam Bộ trước thu hoạch
          </p>
        </div>

        {/* 2-Step Indicator */}
        <div className="flex items-center justify-center max-w-sm mx-auto">
          <div className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                step === 1
                  ? 'bg-[var(--color-brand-primary)] text-white'
                  : 'bg-emerald-100 text-emerald-800'
              }`}
            >
              {step > 1 ? <Check className="w-4 h-4" /> : '1'}
            </div>
            <span
              className={`text-xs font-semibold ${
                step === 1 ? 'text-[var(--color-brand-primary)]' : 'text-[var(--color-text-muted)]'
              }`}
            >
              Chọn vai trò
            </span>
          </div>

          <div className="w-12 h-0.5 mx-3 bg-[var(--color-border-subtle)]" />

          <div className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                step === 2
                  ? 'bg-[var(--color-brand-primary)] text-white'
                  : 'bg-slate-100 text-[var(--color-text-muted)]'
              }`}
            >
              2
            </div>
            <span
              className={`text-xs font-semibold ${
                step === 2 ? 'text-[var(--color-brand-primary)]' : 'text-[var(--color-text-muted)]'
              }`}
            >
              Thông tin tài khoản
            </span>
          </div>
        </div>
      </div>

      {/* STEP 1: CHỌN VAI TRÒ (Role Choice) */}
      {step === 1 && (
        <form onSubmit={handleStep1Submit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Role 1: FARMER */}
            <div
              role="radio"
              aria-checked={selectedRole === 'FARMER'}
              tabIndex={0}
              onClick={() => setSelectedRole('FARMER')}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') setSelectedRole('FARMER')
              }}
              className={`cursor-pointer rounded-[var(--radius-lg,12px)] p-6 border-2 transition-all select-none flex flex-col justify-between ${
                selectedRole === 'FARMER'
                  ? 'border-[var(--color-brand-primary)] bg-[var(--color-brand-primary-subtle)] shadow-xs'
                  : 'border-[var(--color-border-default)] bg-white hover:border-slate-400'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-[var(--radius-md,8px)] bg-emerald-100 text-[var(--color-brand-primary)] flex items-center justify-center">
                    <Sprout className="w-7 h-7 stroke-[2]" aria-hidden="true" />
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedRole === 'FARMER'
                        ? 'border-[var(--color-brand-primary)] bg-[var(--color-brand-primary)] text-white'
                        : 'border-slate-300'
                    }`}
                  >
                    {selectedRole === 'FARMER' && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-heading font-bold text-lg text-[var(--color-text-primary)]">
                    Nhà vườn / Hợp tác xã
                  </h3>
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                    Dành cho nông hộ cá thể hoặc hợp tác xã muốn số hóa vùng trồng, ghi nhật ký canh tác và công bố nguồn cung nông sản trước thu hoạch.
                  </p>
                </div>
              </div>

              {/* Sub-type for Farmer (ADR-007) */}
              <div className="mt-5 pt-4 border-t border-emerald-950/10 space-y-2">
                <span className="text-xs font-semibold text-[var(--color-text-secondary)] block">
                  Loại hình tài khoản (Bắt buộc cho Nông dân):
                </span>
                <div className="space-y-1.5 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="farmerType"
                      checked={farmerType === 'INDIVIDUAL'}
                      onChange={() => setFarmerType('INDIVIDUAL')}
                      className="text-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)]"
                    />
                    <span>Nông hộ cá thể (INDIVIDUAL)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="farmerType"
                      checked={farmerType === 'COOPERATIVE'}
                      onChange={() => setFarmerType('COOPERATIVE')}
                      className="text-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)]"
                    />
                    <span>Hợp tác xã nông nghiệp (COOPERATIVE)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Role 2: BUYER */}
            <div
              role="radio"
              aria-checked={selectedRole === 'BUYER'}
              tabIndex={0}
              onClick={() => setSelectedRole('BUYER')}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') setSelectedRole('BUYER')
              }}
              className={`cursor-pointer rounded-[var(--radius-lg,12px)] p-6 border-2 transition-all select-none flex flex-col justify-between ${
                selectedRole === 'BUYER'
                  ? 'border-[var(--color-brand-primary)] bg-[var(--color-brand-primary-subtle)] shadow-xs'
                  : 'border-[var(--color-border-default)] bg-white hover:border-slate-400'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-[var(--radius-md,8px)] bg-sky-100 text-sky-800 flex items-center justify-center">
                    <Truck className="w-7 h-7 stroke-[2]" aria-hidden="true" />
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedRole === 'BUYER'
                        ? 'border-[var(--color-brand-primary)] bg-[var(--color-brand-primary)] text-white'
                        : 'border-slate-300'
                    }`}
                  >
                    {selectedRole === 'BUYER' && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-heading font-bold text-lg text-[var(--color-text-primary)]">
                    Thương lái / Bên mua
                  </h3>
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                    Dành cho thương lái thu mua, nhà vựa, công ty chế biến hoặc doanh nghiệp xuất khẩu tìm kiếm nguồn nguyên liệu nông sản ổn định.
                  </p>
                </div>
              </div>

              {/* Business profile examples (BR-004a: Profile types, NOT separate auth roles) */}
              <div className="mt-5 pt-4 border-t border-emerald-950/10 space-y-2">
                <span className="text-xs font-semibold text-[var(--color-text-secondary)] block">
                  Hồ sơ hoạt động dự kiến:
                </span>
                <select
                  value={buyerProfileType}
                  onChange={(e) => setBuyerProfileType(e.target.value)}
                  className="w-full text-xs rounded border border-[var(--color-border-control)] bg-white p-2 text-[var(--color-text-primary)] focus:border-[var(--color-brand-primary)] focus:outline-none"
                >
                  <option value="TRADER">Thương lái thu mua tự do</option>
                  <option value="ENTERPRISE">Doanh nghiệp thu mua / Xuất khẩu</option>
                  <option value="PROCESSOR">Nhà máy chế biến nông sản</option>
                  <option value="COOP_BUYER">Đơn vị thu mua / Nhà vựa</option>
                </select>
                <p className="text-[10px] text-[var(--color-text-muted)] italic">
                  *Tất cả hồ sơ Bên mua đều sử dụng chung quyền hạn tài khoản BUYER.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button
              id="step1-continue-btn"
              type="submit"
              variant="primary"
              size="lg"
              className="px-8 font-semibold text-base"
              icon={<ArrowRight className="w-5 h-5" aria-hidden="true" />}
              iconPosition="right"
            >
              Tiếp tục sang Bước 2
            </Button>
          </div>
        </form>
      )}

      {/* STEP 2: THÔNG TIN TÀI KHOẢN (Account Details) */}
      {step === 2 && (
        <Card className="border-[var(--color-border-default)] shadow-[var(--shadow-subtle)]">
          <CardContent className="p-6 sm:p-8 space-y-6">
            {/* Role Header Banner */}
            <div className="flex items-center justify-between p-3.5 bg-[var(--color-brand-primary-subtle)] border border-[var(--color-border-subtle)] rounded-[var(--radius-md,8px)]">
              <div className="flex items-center gap-2.5 text-xs text-[var(--color-brand-dark)]">
                {selectedRole === 'FARMER' ? (
                  <Sprout className="w-4 h-4 text-[var(--color-brand-primary)] shrink-0" />
                ) : (
                  <Truck className="w-4 h-4 text-[var(--color-brand-primary)] shrink-0" />
                )}
                <span>
                  Đang đăng ký:{' '}
                  <strong>
                    {selectedRole === 'FARMER'
                      ? farmerType === 'INDIVIDUAL'
                        ? 'Nông hộ cá thể (FARMER - INDIVIDUAL)'
                        : 'Hợp tác xã nông nghiệp (FARMER - COOPERATIVE)'
                      : 'Bên mua / Doanh nghiệp thu mua (BUYER)'}
                  </strong>
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setStep(1)}
                className="text-xs h-7 px-2"
                icon={<ArrowLeft className="w-3.5 h-3.5" />}
              >
                Chọn lại vai trò
              </Button>
            </div>

            {errorMessage && (
              <Alert variant="error" title="Không thể hoàn tất đăng ký">
                {errorMessage}
              </Alert>
            )}

            <form onSubmit={handleStep2Submit} className="space-y-4">
              <Input
                label="Họ và tên người đại diện / Tên chủ tài khoản"
                required
                id="name-input"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="vd: Nguyễn Văn Nông hoặc HTX Nông nghiệp Cao Lãnh"
                icon={<User className="w-4 h-4 text-slate-400" />}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Số điện thoại đăng nhập chính"
                  required
                  id="phone-input"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0912345678"
                  helperText="10 chữ số (bắt đầu bằng 03, 05, 07, 08, 09)"
                />

                <Input
                  label="Email liên hệ (Tùy chọn)"
                  id="email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vd: lienhe@nongsan.vn"
                  icon={<Mail className="w-4 h-4 text-slate-400" />}
                  helperText="Có thể để trống theo PO-001"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Địa bàn hoạt động dự kiến"
                  id="province-select"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  helperText="Thiết lập chi tiết ở bước Hoàn thiện hồ sơ (S1B)"
                >
                  <option value="DT">Đồng Tháp</option>
                  <option value="HCM">Thành phố Hồ Chí Minh</option>
                  <option value="DN">Đồng Nai</option>
                  <option value="TN">Tây Ninh</option>
                  <option value="VL">Vĩnh Long</option>
                  <option value="CT">Thành phố Cần Thơ</option>
                  <option value="AG">An Giang</option>
                  <option value="CM">Cà Mau</option>
                </Select>

                <div className="space-y-1.5">
                  <label htmlFor="reg-pwd" className="block text-sm font-medium text-[var(--color-text-secondary)]">
                    Mật khẩu đăng nhập <span className="text-red-600 font-semibold">*</span>
                  </label>
                  <input
                    id="reg-pwd"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Tối thiểu 8 ký tự"
                    className="w-full rounded-[var(--radius-md,8px)] bg-white text-[var(--color-text-primary)] placeholder:text-[var(--color-text-disabled)] transition-colors text-base md:text-sm px-3.5 py-2 min-h-[44px] md:min-h-[40px] border border-[var(--color-border-control)] focus:border-2 focus:border-[var(--color-brand-primary)] focus:outline-none focus:ring-2 focus:ring-green-100"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="reg-confirm-pwd" className="block text-sm font-medium text-[var(--color-text-secondary)]">
                  Xác nhận mật khẩu <span className="text-red-600 font-semibold">*</span>
                </label>
                <input
                  id="reg-confirm-pwd"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Nhập lại mật khẩu vừa đặt"
                  className="w-full rounded-[var(--radius-md,8px)] bg-white text-[var(--color-text-primary)] placeholder:text-[var(--color-text-disabled)] transition-colors text-base md:text-sm px-3.5 py-2 min-h-[44px] md:min-h-[40px] border border-[var(--color-border-control)] focus:border-2 focus:border-[var(--color-brand-primary)] focus:outline-none focus:ring-2 focus:ring-green-100"
                />
              </div>

              {/* Agreement checkbox */}
              <div className="pt-2">
                <label htmlFor="agree-terms-checkbox" className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    id="agree-terms-checkbox"
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="h-4 w-4 mt-0.5 rounded border-slate-300 text-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] cursor-pointer"
                  />
                  <span className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                    Tôi đồng ý với{' '}
                    <span className="text-[var(--color-brand-primary)] font-semibold underline">
                      Điều khoản sử dụng
                    </span>{' '}
                    và cam kết tính trung thực của thông tin nông sản kê khai trên hệ thống MEKAGREEN.
                  </span>
                </label>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  size="md"
                  onClick={() => setStep(1)}
                  className="w-full sm:w-auto"
                >
                  ← Quay lại Bước 1
                </Button>

                <Button
                  id="register-submit-btn"
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={loading}
                  loadingText="Đang khởi tạo tài khoản..."
                  className="w-full sm:w-auto px-8 font-semibold text-base shadow-xs"
                >
                  Hoàn tất đăng ký
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Footer Switch to Login */}
      <div className="text-center text-sm text-[var(--color-text-secondary)]">
        <span>Đã có tài khoản MEKAGREEN? </span>
        <Link to="/login" className="font-semibold text-[var(--color-brand-primary)] hover:underline">
          Đăng nhập ngay
        </Link>
      </div>
    </div>
  )
}

export default RegisterPage
