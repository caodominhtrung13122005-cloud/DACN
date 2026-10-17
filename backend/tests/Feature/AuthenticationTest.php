<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;
use Laravel\Sanctum\Sanctum;
use Tests\CreatesApplication;

class AuthenticationTest extends BaseTestCase
{
    use CreatesApplication;

    protected function setUp(): void
    {
        parent::setUp();
        RateLimiter::clear('0911112222|127.0.0.1');
        RateLimiter::clear('0933445566|127.0.0.1');
        $this->cleanupDatabase();
    }

    protected function tearDown(): void
    {
        $this->cleanupDatabase();
        parent::tearDown();
    }

    private function cleanupDatabase(): void
    {
        DB::table('moderation_logs')->delete();
        DB::table('contact_access_logs')->delete();
        DB::table('procurement_agreements')->delete();
        DB::table('purchase_proposals')->delete();
        DB::table('farming_log_photos')->delete();
        DB::table('farming_logs')->delete();
        DB::table('harvest_listings')->delete();
        DB::table('crop_seasons')->delete();
        DB::table('production_area_documents')->delete();
        DB::table('production_areas')->delete();
        DB::table('farmer_profiles')->delete();
        DB::table('buyer_profiles')->delete();
        DB::table('administrative_units')->whereNotNull('parent_code')->delete();
        DB::table('administrative_units')->delete();
        DB::table('users')->delete();
    }

    // ==========================================
    // 1. REGISTRATION TESTS
    // ==========================================

    public function test_farmer_individual_registration_successful(): void
    {
        $payload = [
            'phone' => '0912345678',
            'email' => 'farmer@mekagreen.test',
            'password' => 'SecurePass123!',
            'full_name' => 'Nguyễn Văn Nông',
            'role' => 'FARMER',
            'account_type' => 'INDIVIDUAL',
        ];

        $response = $this->postJson('/api/register', $payload);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'message',
                'user' => [
                    'id',
                    'phone',
                    'email',
                    'role',
                    'account_type',
                    'full_name',
                    'status',
                    'created_at',
                    'updated_at',
                ],
            ])
            ->assertJson([
                'user' => [
                    'phone' => '0912345678',
                    'email' => 'farmer@mekagreen.test',
                    'role' => 'FARMER',
                    'account_type' => 'INDIVIDUAL',
                    'full_name' => 'Nguyễn Văn Nông',
                    'status' => 'ACTIVE',
                ],
            ]);

        // Ensure password and remember_token are not exposed
        $this->assertArrayNotHasKey('password', $response->json('user'));
        $this->assertArrayNotHasKey('remember_token', $response->json('user'));

        // Verify database state
        $this->assertDatabaseHas('users', [
            'phone' => '0912345678',
            'role' => 'FARMER',
            'account_type' => 'INDIVIDUAL',
            'status' => 'ACTIVE',
        ]);

        // Verify profile onboarding is separated (no fabricated farmer_profiles)
        $this->assertDatabaseMissing('farmer_profiles', [
            'user_id' => $response->json('user.id'),
        ]);

        // Verify session authentication on registration
        $this->assertAuthenticated();
    }

    public function test_farmer_cooperative_registration_successful(): void
    {
        $payload = [
            'phone' => '0987654321',
            'password' => 'SecurePass123!',
            'full_name' => 'HTX Nông Nghiệp Cái Bè',
            'role' => 'FARMER',
            'account_type' => 'COOPERATIVE',
        ];

        $response = $this->postJson('/api/register', $payload);

        $response->assertStatus(201)
            ->assertJson([
                'user' => [
                    'phone' => '0987654321',
                    'role' => 'FARMER',
                    'account_type' => 'COOPERATIVE',
                    'email' => null,
                ],
            ]);

        $this->assertDatabaseHas('users', [
            'phone' => '0987654321',
            'role' => 'FARMER',
            'account_type' => 'COOPERATIVE',
        ]);
    }

    public function test_farmer_registration_requires_account_type(): void
    {
        $payload = [
            'phone' => '0912345678',
            'password' => 'SecurePass123!',
            'full_name' => 'Nông Dân Không Chọn Loại',
            'role' => 'FARMER',
        ];

        $response = $this->postJson('/api/register', $payload);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['account_type']);
    }

    public function test_buyer_registration_successful_and_forces_null_account_type(): void
    {
        $payload = [
            'phone' => '0977889900',
            'password' => 'SecurePass123!',
            'full_name' => 'Vựa Thu Mua Mỹ Tho',
            'role' => 'BUYER',
            'account_type' => 'INDIVIDUAL', // Client attempted to send account_type
        ];

        $response = $this->postJson('/api/register', $payload);

        $response->assertStatus(201)
            ->assertJson([
                'user' => [
                    'phone' => '0977889900',
                    'role' => 'BUYER',
                    'account_type' => null,
                ],
            ]);

        // Ensure database stores NULL for BUYER account_type
        $this->assertDatabaseHas('users', [
            'phone' => '0977889900',
            'role' => 'BUYER',
            'account_type' => null,
        ]);

        // Verify no fabricated buyer_profiles
        $this->assertDatabaseMissing('buyer_profiles', [
            'user_id' => $response->json('user.id'),
        ]);
    }

    public function test_rejects_admin_role_registration(): void
    {
        $payload = [
            'phone' => '0901234567',
            'password' => 'SecurePass123!',
            'full_name' => 'Kẻ Giả Mạo Quản Trị',
            'role' => 'ADMIN',
        ];

        $response = $this->postJson('/api/register', $payload);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['role']);

        $this->assertDatabaseMissing('users', [
            'phone' => '0901234567',
        ]);
    }

    public function test_rejects_duplicate_phone_registration(): void
    {
        User::factory()->create([
            'phone' => '0912345678',
        ]);

        $payload = [
            'phone' => '0912345678',
            'password' => 'AnotherPass123!',
            'full_name' => 'Người Dùng Trùng Số',
            'role' => 'BUYER',
        ];

        $response = $this->postJson('/api/register', $payload);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['phone']);
    }

    public function test_rejects_invalid_phone_formats(): void
    {
        $invalidPhones = ['1234567890', '0212345678', '09123456', '091234567890', 'abcdefghij'];

        foreach ($invalidPhones as $phone) {
            $response = $this->postJson('/api/register', [
                'phone' => $phone,
                'password' => 'SecurePass123!',
                'full_name' => 'Test Phone Format',
                'role' => 'BUYER',
            ]);

            $response->assertStatus(422)
                ->assertJsonValidationErrors(['phone']);
        }
    }

    public function test_password_is_securely_hashed_in_database(): void
    {
        $plainPassword = 'MySecretPlainPassword2026!';

        $response = $this->postJson('/api/register', [
            'phone' => '0933445566',
            'password' => $plainPassword,
            'full_name' => 'Nguyễn Bảo Mật',
            'role' => 'BUYER',
        ]);

        $response->assertStatus(201);

        $user = User::where('phone', '0933445566')->firstOrFail();

        $this->assertNotEquals($plainPassword, $user->password);
        $this->assertTrue(Hash::check($plainPassword, $user->password));
    }

    public function test_registration_forces_active_status_ignoring_client_input(): void
    {
        $response = $this->postJson('/api/register', [
            'phone' => '0944556677',
            'password' => 'SecurePass123!',
            'full_name' => 'Học Viên',
            'role' => 'BUYER',
            'status' => 'SUSPENDED', // Client attempted to set status
        ]);

        $response->assertStatus(201);

        $this->assertDatabaseHas('users', [
            'phone' => '0944556677',
            'status' => 'ACTIVE',
        ]);
    }

    // ==========================================
    // 2. LOGIN TESTS
    // ==========================================

    public function test_successful_login_with_phone_and_password(): void
    {
        $user = User::factory()->create([
            'phone' => '0933445566',
            'password' => Hash::make('CorrectPassword123!'),
            'role' => 'FARMER',
            'account_type' => 'INDIVIDUAL',
            'status' => 'ACTIVE',
        ]);

        $response = $this->postJson('/api/login', [
            'phone' => '0933445566',
            'password' => 'CorrectPassword123!',
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Đăng nhập thành công.',
                'user' => [
                    'id' => $user->id,
                    'phone' => '0933445566',
                    'role' => 'FARMER',
                ],
            ]);

        $this->assertAuthenticatedAs($user);
    }

    public function test_successful_login_with_email_and_password(): void
    {
        $user = User::factory()->create([
            'phone' => '0933445588',
            'email' => 'farmer.email@mekagreen.vn',
            'password' => Hash::make('CorrectPassword123!'),
            'role' => 'FARMER',
            'account_type' => 'INDIVIDUAL',
            'status' => 'ACTIVE',
        ]);

        $response = $this->postJson('/api/login', [
            'phone' => 'farmer.email@mekagreen.vn',
            'password' => 'CorrectPassword123!',
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Đăng nhập thành công.',
                'user' => [
                    'id' => $user->id,
                    'email' => 'farmer.email@mekagreen.vn',
                    'role' => 'FARMER',
                ],
            ]);

        $this->assertAuthenticatedAs($user);
    }

    public function test_failed_login_with_incorrect_password(): void
    {
        User::factory()->create([
            'phone' => '0933445566',
            'password' => Hash::make('CorrectPassword123!'),
            'status' => 'ACTIVE',
        ]);

        $response = $this->postJson('/api/login', [
            'phone' => '0933445566',
            'password' => 'WrongPassword123!',
        ]);

        $response->assertStatus(422)
            ->assertJson([
                'message' => 'Thông tin đăng nhập không chính xác.',
            ]);

        $this->assertGuest();
    }

    public function test_failed_login_with_non_existent_phone(): void
    {
        $response = $this->postJson('/api/login', [
            'phone' => '0999999999',
            'password' => 'SomePassword123!',
        ]);

        $response->assertStatus(422)
            ->assertJson([
                'message' => 'Thông tin đăng nhập không chính xác.',
            ]);

        $this->assertGuest();
    }

    public function test_suspended_user_is_rejected_on_login(): void
    {
        User::factory()->suspended()->create([
            'phone' => '0933445566',
            'password' => Hash::make('CorrectPassword123!'),
        ]);

        $response = $this->postJson('/api/login', [
            'phone' => '0933445566',
            'password' => 'CorrectPassword123!',
        ]);

        $response->assertStatus(403)
            ->assertJson([
                'message' => 'Tài khoản của bạn đã bị tạm khóa. Vui lòng liên hệ quản trị viên.',
            ]);

        $this->assertGuest();
    }

    public function test_login_rate_limiting_triggers_after_max_attempts(): void
    {
        $phone = '0911112222';
        RateLimiter::clear($phone . '|127.0.0.1');

        for ($i = 0; $i < 5; $i++) {
            $response = $this->postJson('/api/login', [
                'phone' => $phone,
                'password' => 'WrongPassword!',
            ]);
            $response->assertStatus(422);
        }

        // 6th attempt should be blocked by rate limiter
        $blockedResponse = $this->postJson('/api/login', [
            'phone' => $phone,
            'password' => 'WrongPassword!',
        ]);

        $blockedResponse->assertStatus(429)
            ->assertJsonStructure(['message', 'retry_after']);
    }

    // ==========================================
    // 3. LOGOUT & CURRENT USER (ME) TESTS
    // ==========================================

    public function test_authenticated_user_can_logout_and_session_is_invalidated(): void
    {
        $user = User::factory()->create([
            'phone' => '0933445566',
            'password' => 'Secret123!',
        ]);

        $headers = [
            'HTTP_ORIGIN' => 'http://localhost:5173',
            'HTTP_REFERER' => 'http://localhost:5173/',
            'HTTP_ACCEPT' => 'application/json',
        ];

        // 1. Login with stateful SPA headers
        $loginResponse = $this->call(
            'POST',
            '/api/login',
            ['phone' => '0933445566', 'password' => 'Secret123!'],
            [],
            [],
            $headers
        );

        $loginResponse->assertStatus(200);

        $cookies = [];
        foreach ($loginResponse->headers->getCookies() as $cookie) {
            $cookies[$cookie->getName()] = $cookie->getValue();
        }

        // 2. Call logout with session cookies and SPA headers
        $logoutResponse = $this->call(
            'POST',
            '/api/logout',
            [],
            $cookies,
            [],
            $headers
        );

        $logoutResponse->assertStatus(200)
            ->assertJson([
                'message' => 'Đăng xuất thành công.',
            ]);

        $postLogoutCookies = [];
        foreach ($logoutResponse->headers->getCookies() as $cookie) {
            $postLogoutCookies[$cookie->getName()] = $cookie->getValue();
        }

        // 3. Subsequent /api/me call with updated post-logout cookies should be 401 Unauthenticated
        $meResponse = $this->call(
            'GET',
            '/api/me',
            [],
            $postLogoutCookies,
            [],
            $headers
        );

        $meResponse->assertStatus(401);
    }

    public function test_unauthenticated_request_to_me_returns_401(): void
    {
        $response = $this->getJson('/api/me');

        $response->assertStatus(401)
            ->assertJson([
                'message' => 'Unauthenticated.',
            ]);
    }

    public function test_authenticated_user_can_access_me(): void
    {
        $user = User::factory()->farmer()->create([
            'phone' => '0933445566',
            'full_name' => 'Trần Văn Nông',
        ]);

        Sanctum::actingAs($user);

        $response = $this->getJson('/api/me');

        $response->assertStatus(200)
            ->assertJson([
                'user' => [
                    'id' => $user->id,
                    'phone' => '0933445566',
                    'full_name' => 'Trần Văn Nông',
                    'role' => 'FARMER',
                ],
            ]);
    }

    // ==========================================
    // 4. ROLE MIDDLEWARE & AUTHORIZATION TESTS
    // ==========================================

    public function test_unauthenticated_requests_to_role_routes_return_401(): void
    {
        $this->getJson('/api/test/farmer-only')->assertStatus(401);
        $this->getJson('/api/test/buyer-only')->assertStatus(401);
        $this->getJson('/api/test/admin-only')->assertStatus(401);
    }

    public function test_farmer_role_access_matrix(): void
    {
        $farmer = User::factory()->farmer()->create();
        Sanctum::actingAs($farmer);

        $this->getJson('/api/test/farmer-only')->assertStatus(200);
        $this->getJson('/api/test/buyer-only')->assertStatus(403);
        $this->getJson('/api/test/admin-only')->assertStatus(403);
    }

    public function test_buyer_role_access_matrix(): void
    {
        $buyer = User::factory()->buyer()->create();
        Sanctum::actingAs($buyer);

        $this->getJson('/api/test/farmer-only')->assertStatus(403);
        $this->getJson('/api/test/buyer-only')->assertStatus(200);
        $this->getJson('/api/test/admin-only')->assertStatus(403);
    }

    public function test_admin_role_access_matrix(): void
    {
        $admin = User::factory()->admin()->create();
        Sanctum::actingAs($admin);

        $this->getJson('/api/test/farmer-only')->assertStatus(403);
        $this->getJson('/api/test/buyer-only')->assertStatus(403);
        $this->getJson('/api/test/admin-only')->assertStatus(200);
    }

    public function test_role_cannot_be_spoofed_via_client_input(): void
    {
        $buyer = User::factory()->buyer()->create();
        Sanctum::actingAs($buyer);

        // Attempt to pass spoofed role headers or query parameters
        $response = $this->withHeaders([
            'X-Role' => 'ADMIN',
            'X-User-Role' => 'ADMIN',
        ])->getJson('/api/test/admin-only?role=ADMIN');

        $response->assertStatus(403);
    }

    // ==========================================
    // 5. SESSION SECURITY, CORS & CSRF TESTS
    // ==========================================

    public function test_cors_preflight_returns_credentials_and_explicit_origin_without_wildcard(): void
    {
        $response = $this->call(
            'OPTIONS',
            '/api/login',
            [],
            [],
            [],
            [
                'HTTP_ORIGIN' => 'http://localhost:5173',
                'HTTP_ACCESS_CONTROL_REQUEST_METHOD' => 'POST',
                'HTTP_ACCESS_CONTROL_REQUEST_HEADERS' => 'content-type,x-xsrf-token',
            ]
        );

        $response->assertStatus(204);
        $response->assertHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
        $response->assertHeader('Access-Control-Allow-Credentials', 'true');

        // Confirm wildcard is NOT used with credentials
        $this->assertNotEquals('*', $response->headers->get('Access-Control-Allow-Origin'));
    }

    public function test_sanctum_csrf_cookie_endpoint_sets_cookie(): void
    {
        $response = $this->call(
            'GET',
            '/sanctum/csrf-cookie',
            [],
            [],
            [],
            [
                'HTTP_ORIGIN' => 'http://localhost:5173',
            ]
        );

        $response->assertStatus(204);
        $response->assertCookie('XSRF-TOKEN');
    }

    public function test_stateful_post_request_requires_csrf_token(): void
    {
        app()->instance('enforce.csrf', true);

        // Calling stateful request from SPA origin without CSRF token must trigger 419
        $response = $this->call(
            'POST',
            '/api/login',
            ['phone' => '0912345678', 'password' => 'secret'],
            [],
            [],
            [
                'HTTP_ORIGIN' => 'http://localhost:5173',
                'HTTP_REFERER' => 'http://localhost:5173/',
                'HTTP_ACCEPT' => 'application/json',
            ]
        );

        $response->assertStatus(419);
    }

    public function test_stateful_post_request_with_valid_csrf_token_passes_csrf_filter(): void
    {
        app()->instance('enforce.csrf', true);

        // 1. Request CSRF cookie
        $cookieResponse = $this->call(
            'GET',
            '/sanctum/csrf-cookie',
            [],
            [],
            [],
            [
                'HTTP_ORIGIN' => 'http://localhost:5173',
                'HTTP_REFERER' => 'http://localhost:5173/',
            ]
        );

        $cookieResponse->assertStatus(204);

        $cookies = $cookieResponse->headers->getCookies();
        $xsrfToken = null;
        $sessionCookie = null;

        foreach ($cookies as $cookie) {
            if ($cookie->getName() === 'XSRF-TOKEN') {
                $xsrfToken = $cookie->getValue();
            }
            if ($cookie->getName() === config('session.cookie')) {
                $sessionCookie = $cookie->getValue();
            }
        }

        $this->assertNotNull($xsrfToken, 'XSRF-TOKEN cookie was not set');

        // 2. Perform stateful POST with the CSRF token and session cookie
        $response = $this->call(
            'POST',
            '/api/login',
            ['phone' => '0999999999', 'password' => 'WrongPass'],
            [
                'XSRF-TOKEN' => $xsrfToken,
                config('session.cookie') => $sessionCookie,
            ],
            [],
            [
                'HTTP_ORIGIN' => 'http://localhost:5173',
                'HTTP_REFERER' => 'http://localhost:5173/',
                'HTTP_ACCEPT' => 'application/json',
                'HTTP_X_XSRF_TOKEN' => $xsrfToken,
            ]
        );

        // Since CSRF passed, it enters controller validation -> 422 (not 419)
        $response->assertStatus(422)
            ->assertJson([
                'message' => 'Thông tin đăng nhập không chính xác.',
            ]);
    }
}
